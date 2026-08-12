import os from 'node:os';
import path from 'node:path';

export type Product = 'windchime' | 'lichtspiel';

/**
 * Source repos live as siblings under this root. Resolved from $HOME at runtime,
 * so no machine-specific absolute path (or username) is ever committed.
 * Override with `PL_REPOS_ROOT=/some/where`.
 */
const ROOT = process.env.PL_REPOS_ROOT ?? os.homedir();

export interface RepoSource {
  label: string;
  product: Product;
  dir: string; // stable key: names the snapshot file
  /**
   * Where the repo actually lives, relative to ROOT, when it differs from `dir`.
   * Several services are developed as submodules of the umbrella, and the
   * standalone sibling clones lag behind. Always read the authoritative copy,
   * or the cadence silently undercounts the busiest repos.
   */
  path?: string;
  githubRepo?: string; // "owner/name", if you want GitHub metadata too
}

/** The private repos this showcase draws sanitized evidence from. */
export const REPOS: RepoSource[] = [
  {
    label: 'windchime (umbrella)',
    product: 'windchime',
    dir: 'windchime-full',
    githubRepo: 'Grashopr-888/windchime',
  },
  { label: 'windchime-retrieval', product: 'windchime', dir: 'windchime-retrieval' },
  {
    label: 'windchime-livecode',
    product: 'windchime',
    dir: 'windchime-livecode',
    path: 'windchime-full/services/livecode',
  },
  {
    label: 'windchime-animation',
    product: 'windchime',
    dir: 'windchime-animation',
    path: 'windchime-full/services/animation',
  },
  {
    label: 'windchime-eval',
    product: 'windchime',
    dir: 'windchime-eval',
    path: 'windchime-full/services/eval',
  },
  { label: 'windchime-soak', product: 'windchime', dir: 'windchime-soak' },
  {
    label: 'lichtspiel',
    product: 'lichtspiel',
    dir: 'lichtspiel_github_trent',
    githubRepo: 'Grashopr-888/lichtspiel',
  },
];

export function repoPath(src: RepoSource): string {
  return path.join(ROOT, src.path ?? src.dir);
}

export const PATHS = {
  /** RAW, unsanitized pulls — MUST stay gitignored (.private/ is in .gitignore). */
  raw: '.private/ingest',
  /** Sanitized, committable aggregates the site may read. */
  snapshots: 'src/data/snapshots',
  /** Research-note candidates for human review before promotion into src/content. */
  researchCandidates: '.private/research-candidates',
};

/** Emails that are intentionally public (won't be redacted from ingested text). */
export const PUBLIC_EMAILS: string[] = [];
