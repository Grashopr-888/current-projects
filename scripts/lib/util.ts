import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

export function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

export function writeJson(file: string, data: unknown): void {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

export function writeText(file: string, text: string): void {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, text);
}

export function exists(p: string): boolean {
  return fs.existsSync(p);
}

export function isGitRepo(dir: string): boolean {
  return fs.existsSync(path.join(dir, '.git'));
}

/** Run git in a repo and return trimmed stdout. Throws on failure. */
export function git(repo: string, args: string[]): string {
  return execFileSync('git', ['-C', repo, ...args], {
    encoding: 'utf8',
    maxBuffer: 128 * 1024 * 1024,
  }).trim();
}

/** Run a command; return stdout, or null if it fails (for optional tools like gh). */
export function trySh(cmd: string, args: string[]): string | null {
  try {
    return execFileSync(cmd, args, { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 }).trim();
  } catch {
    return null;
  }
}

/** Recursively list files under `dir` matching one of `exts`, skipping noise dirs. */
export function walk(
  dir: string,
  exts: string[],
  skip = new Set(['node_modules', '.git', 'dist'])
): string[] {
  const out: string[] = [];
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop()!;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const full = path.join(cur, e.name);
      if (e.isDirectory()) {
        if (!skip.has(e.name) && !e.name.startsWith('.')) stack.push(full);
      } else if (exts.some((x) => e.name.toLowerCase().endsWith(x))) {
        out.push(full);
      }
    }
  }
  return out;
}

export const log = (...a: unknown[]): void => console.log('   ', ...a);
export const header = (s: string): void => console.log(`\n▸ ${s}`);
export const warn = (s: string): void => console.log(`   ! ${s}`);

/** Turn a string into a filesystem-safe slug. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}
