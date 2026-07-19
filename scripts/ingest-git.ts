/**
 * ingest-git — read local git history for each source repo and emit sanitized
 * activity snapshots the site can publish.
 *
 * Trust boundary:
 *   • RAW  (full commits incl. subjects) → .private/ingest/git/*.raw.json  [gitignored]
 *   • SAFE (counts, cadence, tags only)  → src/data/snapshots/git/*.json   [committable]
 *
 * Commit subjects ship ONLY in day-level form, and only after passing the redact
 * engine plus a conservative scrub (dash normalization, truncation, and a filter
 * that drops anything mentioning people or addresses). Aggregates and (redacted)
 * tag names ship as before.
 */
import path from 'node:path';
import { REPOS, repoPath, PATHS, type Product } from './config';
import { git, isGitRepo, exists, writeJson, header, log, warn } from './lib/util';
import { redact, summarize, type Finding } from './lib/redact';

const US = '\x1f';

interface Commit {
  hash: string;
  date: string;
  author: string;
  subject: string;
}

interface DayActivity {
  count: number;
  /** Up to MAX_DAY_SUBJECTS sanitized subject lines for hover detail. */
  subjects: string[];
}

interface GitSnapshot {
  note: string;
  label: string;
  product: Product;
  dir: string;
  commitCount: number;
  firstDate: string | null;
  lastDate: string | null;
  authors: number;
  months: Record<string, number>;
  days: Record<string, DayActivity>;
  tags: Array<{ name: string; date: string }>;
}

const MAX_DAY_SUBJECTS = 4;
const MAX_SUBJECT_LEN = 72;

/** Sanitize one commit subject for public day-level display, or drop it (null). */
function sanitizeSubject(subject: string, findings: Finding[]): string | null {
  // Anything that might reference a person or an address stays private.
  if (/co-authored|signed-off|merge branch|merge pull|@/i.test(subject)) return null;
  // In-progress research writing stays private: drop anything paper-adjacent.
  if (/submission|camera.?ready|overleaf|neurips|\bpaper\b|\bvenue\b|manuscript/i.test(subject))
    return null;
  const r = redact(subject, { hosts: true, emails: true });
  findings.push(...r.findings);
  let s = r.text
    .replace(/[—–]/g, '-') // site prose style: no em/en dashes anywhere visible
    .replace(/\s+/g, ' ')
    .trim();
  if (!s) return null;
  if (s.length > MAX_SUBJECT_LEN) s = `${s.slice(0, MAX_SUBJECT_LEN - 1)}…`;
  return s;
}

function readCommits(repo: string): Commit[] {
  const out = git(repo, ['log', `--format=%H${US}%ad${US}%an${US}%s`, '--date=short']);
  if (!out) return [];
  return out.split('\n').map((line) => {
    const [hash, date, author, subject] = line.split(US);
    return { hash, date, author, subject: subject ?? '' };
  });
}

function readTags(repo: string): Array<{ name: string; date: string }> {
  const out = git(repo, [
    'tag',
    `--format=%(refname:short)${US}%(creatordate:short)`,
    '--sort=creatordate',
  ]);
  if (!out) return [];
  return out
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [name, date] = line.split(US);
      return { name, date };
    });
}

function main(): void {
  const findings: Finding[] = [];
  const index: Array<
    Pick<GitSnapshot, 'label' | 'product' | 'commitCount' | 'firstDate' | 'lastDate'>
  > = [];

  for (const src of REPOS) {
    const repo = repoPath(src);
    if (!exists(repo) || !isGitRepo(repo)) {
      warn(`skip ${src.label} — not a git repo at ${src.dir}`);
      continue;
    }
    header(`${src.label}`);

    const commits = readCommits(repo);
    const tagsRaw = readTags(repo);

    // RAW (gitignored) — keep everything for local inspection.
    writeJson(path.join(PATHS.raw, 'git', `${src.dir}.raw.json`), {
      repo: src.dir,
      commits,
      tags: tagsRaw,
    });

    // SAFE — aggregates, day-level sanitized activity, + redacted tag names.
    const months: Record<string, number> = {};
    const days: Record<string, DayActivity> = {};
    const authors = new Set<string>();
    for (const c of commits) {
      const ym = c.date.slice(0, 7);
      months[ym] = (months[ym] ?? 0) + 1;
      authors.add(c.author);
      const day = (days[c.date] ??= { count: 0, subjects: [] });
      day.count += 1;
      if (day.subjects.length < MAX_DAY_SUBJECTS) {
        const s = sanitizeSubject(c.subject, findings);
        if (s) day.subjects.push(s);
      }
    }
    const tags = tagsRaw.map((t) => {
      const r = redact(t.name, { hosts: true, emails: true });
      findings.push(...r.findings);
      return { name: r.text, date: t.date };
    });

    const snap: GitSnapshot = {
      note: 'Sanitized aggregate - day-level counts plus redacted, truncated subject lines. Raw pull stays gitignored.',
      label: src.label,
      product: src.product,
      dir: src.dir,
      commitCount: commits.length,
      firstDate: commits.at(-1)?.date ?? null,
      lastDate: commits[0]?.date ?? null,
      authors: authors.size,
      months: Object.fromEntries(Object.entries(months).sort(([a], [b]) => a.localeCompare(b))),
      days: Object.fromEntries(Object.entries(days).sort(([a], [b]) => a.localeCompare(b))),
      tags,
    };
    writeJson(path.join(PATHS.snapshots, 'git', `${src.dir}.json`), snap);
    index.push({
      label: src.label,
      product: src.product,
      commitCount: snap.commitCount,
      firstDate: snap.firstDate,
      lastDate: snap.lastDate,
    });
    log(`${commits.length} commits · ${authors.size} author(s) · ${tags.length} tag(s)`);
  }

  writeJson(path.join(PATHS.snapshots, 'git', 'index.json'), {
    note: 'Per-repo sanitized git activity index.',
    repos: index,
  });

  const summary = summarize(findings);
  header('done');
  log(`wrote ${index.length} snapshot(s) to ${PATHS.snapshots}/git`);
  if (Object.keys(summary).length) log('redactions:', JSON.stringify(summary));
  else log('redactions: none needed in tag names');
}

main();
