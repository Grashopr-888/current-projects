/**
 * redact — CLI over the redaction engine. Two jobs:
 *   1. Pre-publish gate:  `tsx scripts/redact.ts [dir]`  (default: src/content)
 *      Scans text files, reports findings, exits 1 if anything sensitive is found.
 *   2. Sanitize a tree:   `tsx scripts/redact.ts <dir> --write`
 *      Writes redacted copies under .private/redacted/ for inspection.
 */
import fs from 'node:fs';
import path from 'node:path';
import { walk, writeText, header, log, warn } from './lib/util';
import { redact, summarize, type Finding } from './lib/redact';

const TEXT_EXTS = [
  '.md',
  '.mdx',
  '.markdown',
  '.txt',
  '.json',
  '.yml',
  '.yaml',
  '.astro',
  '.ts',
  '.tsx',
  '.js',
];

function main(): void {
  const args = process.argv.slice(2);
  const write = args.includes('--write');
  const target = args.find((a) => !a.startsWith('--')) ?? 'src/content';

  if (!fs.existsSync(target)) {
    warn(`target not found: ${target}`);
    process.exitCode = 2;
    return;
  }

  const files = fs.statSync(target).isDirectory() ? walk(target, TEXT_EXTS) : [target];
  header(`redact:check — ${files.length} file(s) under ${target}`);

  const all: Finding[] = [];
  let flaggedFiles = 0;

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const { text, findings } = redact(raw);
    if (findings.length) {
      flaggedFiles++;
      all.push(...findings);
      log(`⚠ ${path.relative(process.cwd(), file)} — ${JSON.stringify(summarize(findings))}`);
    }
    if (write) {
      const dest = path.join('.private', 'redacted', path.relative(process.cwd(), file));
      writeText(dest, text);
    }
  }

  header('done');
  if (all.length === 0) {
    log('clean — no secrets, hosts, emails, or large code blocks found.');
    return;
  }
  log(
    `found ${all.length} item(s) across ${flaggedFiles} file(s): ${JSON.stringify(summarize(all))}`
  );
  if (write) log('redacted copies written under .private/redacted/');
  // Non-zero exit so this can gate CI / a pre-publish check.
  process.exitCode = 1;
}

main();
