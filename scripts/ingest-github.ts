/**
 * ingest-github — pull sanitized issue/PR/label/milestone/release *metadata* via the
 * GitHub CLI (`gh`). Bodies and comments are never requested, so private prose and
 * pasted code cannot ride along. Names that could carry detail are redacted.
 *
 *   • RAW  → .private/ingest/github/*.raw.json          [gitignored]
 *   • SAFE → src/data/snapshots/github/*.json           [committable]
 *
 * Degrades gracefully: if `gh` is missing or unauthenticated, it writes a note and
 * exits 0 so the pipeline never hard-fails on an optional dependency.
 */
import path from 'node:path';
import { REPOS, PATHS } from './config';
import { trySh, writeJson, header, log, warn } from './lib/util';
import { redact, summarize, type Finding } from './lib/redact';

function ghJson<T>(args: string[]): T | null {
  const out = trySh('gh', args);
  if (out == null) return null;
  try {
    return JSON.parse(out) as T;
  } catch {
    return null;
  }
}

interface Labeled {
  state?: string;
  labels?: Array<{ name: string }>;
}

function tally(items: Labeled[]) {
  const state = { open: 0, closed: 0, total: items.length };
  const labels: Record<string, number> = {};
  for (const it of items) {
    if (it.state?.toLowerCase() === 'open') state.open++;
    else state.closed++;
    for (const l of it.labels ?? []) labels[l.name] = (labels[l.name] ?? 0) + 1;
  }
  return { state, labels };
}

function main(): void {
  const auth = trySh('gh', ['auth', 'status']);
  if (auth == null) {
    warn('`gh` CLI not available or not authenticated — writing a placeholder and skipping.');
    writeJson(path.join(PATHS.snapshots, 'github', 'index.json'), {
      note: 'GitHub ingestion skipped: `gh` CLI unavailable/unauthenticated at ingest time. Re-run `npm run ingest:github` once authenticated.',
      repos: [],
    });
    return;
  }

  const findings: Finding[] = [];
  const index: Array<{ repo: string; product: string }> = [];

  for (const src of REPOS) {
    if (!src.githubRepo) continue;
    header(`${src.label} (${src.githubRepo})`);
    const R = src.githubRepo;

    const issues = ghJson<Labeled[]>([
      'issue',
      'list',
      '-R',
      R,
      '--state',
      'all',
      '--limit',
      '500',
      '--json',
      'number,state,labels',
    ]);
    const prs = ghJson<Labeled[]>([
      'pr',
      'list',
      '-R',
      R,
      '--state',
      'all',
      '--limit',
      '500',
      '--json',
      'number,state,labels',
    ]);
    const releases = ghJson<Array<{ tagName: string; name: string; publishedAt: string }>>([
      'release',
      'list',
      '-R',
      R,
      '--json',
      'tagName,name,publishedAt',
    ]);

    if (issues == null && prs == null && releases == null) {
      warn(`no access to ${R} (private or not found) — skipping`);
      continue;
    }

    // RAW (gitignored)
    writeJson(path.join(PATHS.raw, 'github', `${src.dir}.raw.json`), {
      repo: R,
      issues,
      prs,
      releases,
    });

    // SAFE — counts, label distribution, redacted release names/dates. No titles, no bodies.
    const relClean = (releases ?? []).map((rel) => {
      const r = redact(rel.name || rel.tagName, { hosts: true, emails: true });
      findings.push(...r.findings);
      return { name: r.text, date: (rel.publishedAt ?? '').slice(0, 10) };
    });

    writeJson(path.join(PATHS.snapshots, 'github', `${src.dir}.json`), {
      note: 'Sanitized GitHub metadata — no titles or bodies, only counts, labels, and redacted release names.',
      label: src.label,
      product: src.product,
      repo: R,
      issues: issues ? tally(issues) : null,
      prs: prs ? tally(prs) : null,
      releases: relClean,
    });
    index.push({ repo: R, product: src.product });
    log(
      `issues:${issues?.length ?? '—'} prs:${prs?.length ?? '—'} releases:${releases?.length ?? '—'}`
    );
  }

  writeJson(path.join(PATHS.snapshots, 'github', 'index.json'), {
    note: 'Per-repo sanitized GitHub metadata index.',
    repos: index,
  });
  const summary = summarize(findings);
  header('done');
  if (Object.keys(summary).length) log('redactions:', JSON.stringify(summary));
}

main();
