/**
 * ingest-research — scan a local notes directory, redact aggressively, and emit
 * research-note *candidates* for human review. Nothing is auto-published.
 *
 * Usage:
 *   tsx scripts/ingest-research.ts --src <dir> [--product windchime|lichtspiel|shared]
 *
 * Output: .private/research-candidates/*.md  [gitignored]
 * A human reviews each candidate, tightens it, and moves the good ones into
 * src/content/research/ — the promotion step is deliberately manual.
 */
import fs from 'node:fs';
import path from 'node:path';
import { PATHS, PUBLIC_EMAILS } from './config';
import { walk, writeText, slugify, header, log, warn, exists } from './lib/util';
import { redact, summarize } from './lib/redact';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

function firstHeading(md: string): string | null {
  const m = md.match(/^#{1,3}\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

function firstParagraph(md: string): string {
  const body = md.replace(/^---[\s\S]*?---/, ''); // drop any frontmatter
  for (const block of body.split(/\n\s*\n/)) {
    const t = block.trim();
    if (t && !t.startsWith('#') && !t.startsWith('```')) return t.replace(/\s+/g, ' ');
  }
  return '';
}

function main(): void {
  const src = arg('src');
  const product = (arg('product') ?? 'shared') as 'windchime' | 'lichtspiel' | 'shared';
  if (!src) {
    warn('required: --src <dir>   (no default — research folders are sensitive)');
    process.exitCode = 2;
    return;
  }
  if (!exists(src)) {
    warn(`source directory not found: ${src}`);
    process.exitCode = 2;
    return;
  }

  const files = walk(src, ['.md', '.txt', '.markdown']);
  header(`scanning ${files.length} file(s) under ${src}`);
  const totalFindings: Record<string, number> = {};
  let written = 0;

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const { text, findings } = redact(raw, {
      hosts: true,
      emails: true,
      maxCodeLines: 4,
      allowEmails: PUBLIC_EMAILS,
    });
    for (const [k, v] of Object.entries(summarize(findings)))
      totalFindings[k] = (totalFindings[k] ?? 0) + v;

    const title = firstHeading(raw) ?? path.basename(file).replace(/\.[^.]+$/, '');
    const date = fs.statSync(file).mtime.toISOString().slice(0, 10);
    const summary = redact(firstParagraph(raw), { allowEmails: PUBLIC_EMAILS }).text.slice(0, 280);
    const slug = slugify(`${product}-${title}`);

    const frontmatter = [
      '---',
      `title: ${JSON.stringify(title)}`,
      `product: ${product}`,
      `date: ${date}`,
      'source_type: field-notes',
      `summary: ${JSON.stringify(summary || 'TODO: write a one-line synthesis.')}`,
      'insights: []',
      'implications: []',
      `provenance: ${JSON.stringify(`ingested from ${path.basename(file)} (${findings.length} redaction(s))`)}`,
      'redaction_status: needs-review',
      '---',
      '',
      `> CANDIDATE — review, tighten, and remove this banner before promoting to src/content/research.`,
      `> ${findings.length} item(s) were redacted during ingestion.`,
      '',
      text.replace(/^---[\s\S]*?---/, '').trim(),
      '',
    ].join('\n');

    writeText(path.join(PATHS.researchCandidates, `${slug}.md`), frontmatter);
    written++;
    log(`${path.basename(file)} → ${slug}.md  (${findings.length} redaction(s))`);
  }

  header('done');
  log(
    `wrote ${written} candidate(s) to ${PATHS.researchCandidates} — NOT published; review before promoting.`
  );
  if (Object.keys(totalFindings).length) log('redactions:', JSON.stringify(totalFindings));
}

main();
