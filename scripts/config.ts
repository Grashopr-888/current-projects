import os from 'node:os';
import path from 'node:path';

export type Product = 'windchime' | 'lichtspiel' | 'hrnsxtn' | 'groove';

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
  /**
   * false: ship day-level counts only, never commit subjects or tag names. For repos that
   * hold research writing still under review, where a subject line could name a venue,
   * a draft or a finding.
   */
  subjects?: boolean;
  /**
   * Ship subjects only for commits on or before this date (YYYY-MM-DD); later commits count
   * without subjects. For a repo whose later work feeds research that is still under review.
   */
  subjectsUntil?: string;
  /**
   * Count only commits on or before this date (YYYY-MM-DD); later commits are left out of the
   * snapshot entirely. For a finished project whose repo kept receiving housekeeping commits.
   */
  until?: string;
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
  {
    label: 'hrnsxtn (elk port + platform)',
    product: 'hrnsxtn',
    dir: 'mutek-hackathon-elkaudio',
    // After the hackathon this repo carries measurements for research under review.
    subjectsUntil: '2026-08-31',
    githubRepo: 'Grashopr-888/elk-mutek',
  },
  { label: 'hrnsxtn (hackathon build)', product: 'hrnsxtn', dir: 'mutek-hackathon' },
  // Research after the hackathon (Elk port study). Counts only: the writing is under review.
  {
    label: 'hrnsxtn (research code)',
    product: 'hrnsxtn',
    dir: 'hrnsxtn-research-code',
    path: 'ISMIR_LBD_2026_submission',
    subjects: false,
  },
  {
    label: 'hrnsxtn (research notes)',
    product: 'hrnsxtn',
    dir: 'hrnsxtn-research-notes',
    path: 'elkaudio-ISMIR26',
    subjects: false,
  },
  // Probing the World for Groove: the 2025 thesis and ISMIR 2025 publication work only.
  // Colab does not sync to git, so the notebook archive's history was rebuilt from Google
  // Drive revision dates, one commit per real edit day (see that repo's README).
  {
    label: 'groove (thesis notebooks)',
    product: 'groove',
    dir: 'groove-thesis-notebooks',
    path: 'thesis-github-pages/drum-style-thesis-notebooks',
    until: '2025-12-31',
    githubRepo: 'Grashopr-888/drum-style-thesis-notebooks',
  },
  // Publication uploads (thesis PDF, slides, notebooks). Counts only: the upload subjects
  // carry file names with a student number. The 2026 restore commit falls after `until`.
  {
    label: 'groove (research repo)',
    product: 'groove',
    dir: 'groove-research',
    path: 'thesis-github-pages/research',
    until: '2025-12-31',
    subjects: false,
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
