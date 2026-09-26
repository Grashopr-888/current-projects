/**
 * SITE CONFIG — identity, links, and navigation.
 */
export const SITE = {
  wordmark: 'Current Projects',
  author: 'Trent Eriksen',
  role: 'Technical Product Manager / Product Engineer',
  description:
    'Current projects by Trent Eriksen. Windchime, Lichtspiel, and HRNSXTN x RDMSXN: ML audio ' +
    'research meeting interactive AV prototyping, documented in depth.',
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
  accent?: 'windchime' | 'lichtspiel' | 'hrnsxtn';
}> = [
  { label: 'Overview', href: '/' },
  { label: 'Windchime', href: '/projects/windchime', accent: 'windchime' },
  { label: 'Lichtspiel', href: '/projects/lichtspiel', accent: 'lichtspiel' },
  { label: 'HRNSXTN x RDMSXN', href: '/projects/hrnsxtn', accent: 'hrnsxtn' },
  { label: 'How I Work', href: '/how-i-work' },
  { label: 'Releases', href: '/releases' },
  { label: 'Research', href: '/research' },
  { label: 'Incidents', href: '/incidents' },
  { label: 'About', href: '/about' },
];

/** Canonical per-project metadata shared across surfaces. */
export const PROJECT_META = {
  windchime: {
    label: 'Windchime',
    kind: 'Voice conditioned audiovisual installation',
    accent: 'var(--wc)',
    logo: '/img/windchime-mark.svg',
    art: '/img/windchime-hero.jpg',
    artAlt: 'Windchime: a ring of suspended chime tubes rendered against a starfield',
    // Secondary image, shown top-right of the project hero.
    aside: '/img/windchime-rider.jpg',
    asideAlt: 'Windchime technical rider: installation diagram with labeled components',
    asideCaption: 'Technical rider',
    // Installation demo. Privacy-enhanced (nocookie) embed of youtu.be/j3XyW2ynH5Y.
    demoVideoId: 'j3XyW2ynH5Y',
    demoVideoTitle: 'Windchime installation demo',
    // Venue marks in the hero credit strip (attribution, not endorsement). Official NeurIPS logo
    // from https://neurips.cc/FAQ/Press (viewBox added so it scales; artwork unchanged).
    partners: [{ img: '/img/logo-neurips.svg', alt: 'NeurIPS' }],
  },
  lichtspiel: {
    label: 'Lichtspiel',
    kind: 'Live audiovisual assistant for Ableton',
    accent: 'var(--ls)',
    logo: '/img/lichtspiel-mark.svg',
    art: '/img/lichtspiel-hero.jpg',
    artAlt: 'Lichtspiel prism mark over a dark low-poly landscape',
    // Hackathon demo. Privacy-enhanced (nocookie) embed of youtu.be/wW3QNNuzD9M.
    demoVideoId: 'wW3QNNuzD9M',
    demoVideoTitle: 'Lichtspiel hackathon demo',
  },
  hrnsxtn: {
    label: 'HRNSXTN x RDMSXN',
    kind: 'Neural audio instruments for a screenless pedal',
    accent: 'var(--hsx)',
    logo: '/img/hrnsxtn-mark.svg',
    // Project demo. Privacy-enhanced (nocookie) embed of youtu.be/gLobf3o0Qg0.
    demoVideoId: 'gLobf3o0Qg0',
    demoVideoTitle: 'HRNSXTN x RDMSXN demo',
    art: '/img/hrnsxtn-hero.jpg',
    artAlt:
      'The Elk Stomp development board on a dark desk beside an iMac running the desktop devkit',
    // Sponsor and event marks, shown in the hero credit strip (attribution, not endorsement).
    partners: [
      {
        img: '/img/logo-mutek.svg',
        alt: 'MUTEK, international festival of digital creativity and electronic music',
        dark: true,
      },
      { img: '/img/logo-elk.png', alt: 'Elk Audio' },
      { img: '/img/logo-rfdl.jpg', alt: 'Roland Future Design Lab' },
      { img: '/img/logo-musichackspace.png', alt: 'Music Hackspace' },
    ],
  },
} as const;
