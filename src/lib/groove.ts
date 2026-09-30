/**
 * Probing the World for Groove: facts, links and assets for the thesis pages under
 * /projects/groove/. Ported from the thesis site (github.com/Grashopr-888/probing-the-world-for-groove),
 * whose docs/content-provenance.md traces every number here. Rendered copy follows this
 * site's style rules; titles, the abstract, citations and references stay verbatim.
 */
import { url } from './url';

/** Thesis assets (PDFs, audio, figures, embeddings) live under public/groove/. */
export const gasset = (path: string): string =>
  url(`/groove${path.startsWith('/') ? '' : '/'}${path}`);

/** A page of the thesis section, relative to /projects/groove. */
export const gpage = (path = '/'): string => url(`/projects/groove${path === '/' ? '/' : path}`);

export const GROOVE = {
  title: 'Probing the World for Groove',
  question: 'Can a model trained on general audio understand drum style?',
  tagline:
    'A comparison of a drum specific CNN and frozen PaSST transfer learning across 18,264 two bar grooves and 74 style labels.',
  description:
    'A controlled comparison of a task specific CNN and a pretrained PaSST audio transformer for drum pattern style classification from two bar audio, for the MSc thesis and ISMIR 2025 Late-Breaking Demo by Trent Eriksen.',
  authors: ['Trent Eriksen', 'Edwin van der Heide', 'Robert Saunders'],
} as const;

/** Section tabs. Paths keep the thesis site's slugs so old links map one to one. */
export const SUBNAV = [
  { label: 'Overview', path: '/' },
  { label: 'Method', path: '/method' },
  { label: 'Experiments', path: '/experiments' },
  { label: 'Representations', path: '/representations' },
  { label: 'ISMIR 2025', path: '/publication' },
  { label: 'Resources', path: '/resources' },
] as const;

/** Headline figures. Provenance #1 to #5. */
export const KEY_FACTS = [
  { value: '18,264', label: 'two bar clips', note: 'Groove MIDI Dataset, rendered to audio' },
  { value: '74', label: 'style classes', note: 'primary ⊕ secondary annotations' },
  { value: '34', label: 'experiments', note: 'across 11 rounds' },
  { value: '11', label: 'rounds', note: 'in 4 thematic categories' },
] as const;

/** The two comparable headline results. Provenance #6 and #8. */
export const HEADLINE = {
  cnn: { f1: 0.908, exp: '10.1', config: '7 conv CNN · Gaussian noise + room simulation' },
  passt: { f1: 0.8752, exp: '11.2', config: 'frozen PaSST · 4 layer MLP · reflection padding' },
} as const;

/** The low data reversal. Provenance #10 and #11. */
export const LOWDATA = {
  cnn: 0.3267,
  passt: 0.3911,
  scope: 'GMD-mini (≈10% subset)',
} as const;

export const LINKS = {
  // Curated notebook archive with reconstructed commit history (canonical for notebook links)
  archiveRepo: 'https://github.com/Grashopr-888/drum-style-thesis-notebooks',
  repo: 'https://github.com/Grashopr-888/A-comparative-study-of-Transfer-Learning-for-Drum-audio-Style-Classification-',
  ismir: 'https://ismir2025program.ismir.net/lbd_456.html',
  scholar: 'https://scholar.google.com/citations?user=mUE3lGAAAAAJ',
  video: 'https://youtu.be/f_nIl5qMxlY',
  videoId: 'f_nIl5qMxlY',
  gmd: 'https://www.tensorflow.org/datasets/catalog/groove',
  passt: 'https://github.com/kkoutini/passt_hear21',
  drumClassification: 'https://github.com/khiner/DrumClassification',
  audiomentations: 'https://github.com/iver56/audiomentations',
} as const;

export const notebookUrl = (nb: string): string => `${LINKS.archiveRepo}/blob/main/notebooks/${nb}`;

export const ASSETS = {
  thesisPdf: gasset('/papers/probing-the-world-for-groove-thesis.pdf'),
  lbdPdf: gasset('/papers/ismir2025-lbd-eriksen.pdf'),
  posterPdf: gasset('/poster/ismir2025-poster-eriksen.pdf'),
  workbook: gasset('/data/thesis-experiment-results.xlsx'),
} as const;

export const PUBLICATION = {
  thesisTitle:
    'Probing the World for Groove: A Comparative Study of Transfer Learning for Drum Audio Style Classification',
  lbdTitle: 'A Comparative Study of Transfer Learning for Drum Audio Style Classification',
  degree:
    'MSc Media Technology, Leiden Institute of Advanced Computer Science (LIACS), Leiden University',
  thesisDate: '30 June 2025',
  supervisors: ['Edwin van der Heide', 'Dr. Robert Saunders'],
  venue:
    'Late-Breaking / Demo Session, 26th International Society for Music Information Retrieval Conference (ISMIR 2025)',
  venueLocation: 'Daejeon, South Korea',
  license: 'CC BY 4.0',
} as const;

export type Model = 'cnn' | 'passt';
export const MODEL_LABEL: Record<Model, string> = { cnn: 'CNN', passt: 'PaSST' };
export const f1fmt = (v: number): string => v.toFixed(4);
