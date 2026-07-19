/**
 * SITE CONFIG — identity, links, and navigation.
 */
export const SITE = {
  wordmark: 'Current Projects',
  author: 'Trent Eriksen',
  role: 'Technical Product Manager / Product Engineer',
  description:
    'Current projects by Trent Eriksen. Windchime and Lichtspiel: ML audio research meeting ' +
    'interactive AV prototyping, documented in depth.',
  handle: 'Grashopr-888',
  githubUrl: 'https://github.com/Grashopr-888',
  repoUrl: 'https://github.com/Grashopr-888/current-projects',
  // Personal email kept here but not rendered publicly by default.
  email: 'starduststereo@gmail.com',
} as const;

export const SHOW_EMAIL = false;

/** Top navigation. Projects lead as their own tabs; supporting views follow.
 *  `accent` colors a tab in its project hue so the project tabs stand out. */
export const NAV: ReadonlyArray<{
  label: string;
  href: string;
  accent?: 'windchime' | 'lichtspiel';
}> = [
  { label: 'Overview', href: '/' },
  { label: 'Windchime', href: '/projects/windchime', accent: 'windchime' },
  { label: 'Lichtspiel', href: '/projects/lichtspiel', accent: 'lichtspiel' },
  { label: 'How I Work', href: '/how-i-work' },
  { label: 'Releases', href: '/releases' },
  { label: 'Research', href: '/research' },
  { label: 'Incidents', href: '/incidents' },
  { label: 'About', href: '/about' },
  { label: 'Splice', href: '/splice' },
];

/** Canonical per-project metadata shared across surfaces. */
export const PROJECT_META = {
  windchime: {
    label: 'Windchime',
    kind: 'Voice-conditioned audiovisual installation',
    accent: 'var(--wc)',
    logo: '/img/windchime-mark.svg',
    art: '/img/windchime-rider.jpg',
    artAlt: 'Windchime technical rider: installation render with labeled components',
  },
  lichtspiel: {
    label: 'Lichtspiel',
    kind: 'Live audiovisual assistant for Ableton',
    accent: 'var(--ls)',
    logo: '/img/lichtspiel-mark.svg',
    art: '/img/lichtspiel-hero.jpg',
    artAlt: 'Lichtspiel prism mark over a dark low-poly landscape',
  },
} as const;
