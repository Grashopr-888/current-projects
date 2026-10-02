/**
 * SITE CONFIG — identity, links, and navigation.
 */
export const SITE = {
  wordmark: 'Current Projects',
  author: 'Trent Eriksen',
  role: 'Technical Product Manager / Product Engineer',
  description:
    'Current projects by Trent Eriksen. Windchime, Lichtspiel, HRNSXTN x RDMSXN and Probing the ' +
    'World for Groove: ML audio research meeting interactive AV prototyping, documented in depth.',
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
  accent?: 'windchime' | 'lichtspiel' | 'hrnsxtn' | 'groove';
}> = [
  { label: 'Overview', href: '/' },
  { label: 'Windchime', href: '/projects/windchime', accent: 'windchime' },
  { label: 'HRNSXTN x RDMSXN', href: '/projects/hrnsxtn', accent: 'hrnsxtn' },
  { label: 'Lichtspiel', href: '/projects/lichtspiel', accent: 'lichtspiel' },
  { label: 'Probing the World for Groove', href: '/projects/groove', accent: 'groove' },
  // How I Work and Incidents live as collapsed sections on Releases; About sits in the footer.
  { label: 'Releases', href: '/releases' },
  { label: 'Research', href: '/research' },
];

/** Canonical per-project metadata shared across surfaces. */
export const PROJECT_META = {
  windchime: {
    label: 'Windchime',
    kind: 'Voice conditioned audiovisual installation',
    // One line credit: project hero and project card.
    credit: 'Shown at Gray Area, San Francisco; accepted to NeurIPS 2026 Creative AI, Sydney',
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
    // `scale` sets a mark's height within its tile, so bold and thin wordmarks read at a similar weight.
    // Venue and affiliation marks in the hero credit strip and on the project card (attribution,
    // not endorsement). Sources: Gray Area media kit; NeurIPS press page (viewBox added so it
    // scales, artwork unchanged); CCRMA site header; Stanford Block S from identity.stanford.edu
    // (margin trimmed, mark unchanged). Owner decisions 2026-09-25 (log D13, D14).
    partners: [
      { img: '/img/logo-grayarea.svg', alt: 'Gray Area', scale: 0.8 },
      { img: '/img/logo-neurips.svg', alt: 'NeurIPS' },
      {
        img: '/img/logo-ccrma.png',
        alt: 'CCRMA, Center for Computer Research in Music and Acoustics',
        scale: 0.62,
      },
      { img: '/img/logo-stanford-block-s.png', alt: 'Stanford University' },
    ],
    partnersNote: 'Paper coauthored with Celeste Betancur, CCRMA, Stanford University.',
  },
  lichtspiel: {
    label: 'Lichtspiel',
    kind: 'Live audiovisual assistant for Ableton',
    credit: 'Built at a Music Hackspace hackathon, Berklee College of Music',
    accent: 'var(--ls)',
    logo: '/img/lichtspiel-mark.svg',
    art: '/img/lichtspiel-hero.jpg',
    artAlt: 'Lichtspiel prism mark over a dark low-poly landscape',
    // Hackathon demo. Privacy-enhanced (nocookie) embed of youtu.be/wW3QNNuzD9M.
    demoVideoId: 'wW3QNNuzD9M',
    demoVideoTitle: 'Lichtspiel hackathon demo',
    // Event and host marks (attribution, not endorsement). Berklee logo from berklee.edu's site
    // header; Music Hackspace logo as used on HRNSXTN. Owner decision 2026-09-25 (log D13).
    partners: [
      { img: '/img/logo-musichackspace.png', alt: 'Music Hackspace' },
      { img: '/img/logo-berklee.svg', alt: 'Berklee College of Music', scale: 0.5 },
    ],
  },
  hrnsxtn: {
    label: 'HRNSXTN x RDMSXN',
    kind: 'Neural audio instruments for a screenless pedal',
    credit:
      'Music Hackspace × MUTEK hackathon: 1st, Elk Audio Challenge; 2nd, Roland Future Design Lab; presented at MUTEK Forum, Montréal 2026; ISMIR 2026 Late-Breaking Demo, Abu Dhabi',
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
      // ISMIR 2026 conference mark from ismir2026.ismir.net (artwork unchanged) and the society
      // wordmark, as on the thesis project. Owner request 2026-09-30.
      { img: '/img/logo-ismir2026.png', alt: 'ISMIR 2026, Abu Dhabi' },
      {
        img: '/img/logo-ismir.png',
        alt: 'ISMIR, International Society for Music Information Retrieval',
        scale: 0.55,
      },
    ],
  },
  groove: {
    label: 'Probing the World for Groove',
    kind: 'Transfer learning for drum audio style classification',
    credit:
      'ISMIR 2025 Late-Breaking Demo, KAIST, Daejeon; MSc thesis, LIACS, Leiden University, defended at Kunstinstituut Melly, Rotterdam',
    accent: 'var(--gr)',
    logo: '/img/groove-mark.svg',
    // Both models' t-SNE maps of the same test clips (CNN left, PaSST right), drawn from
    // public/groove/data/embeddings-*.json on the site's dark ground.
    art: '/img/groove-hero.svg',
    artAlt:
      'Two t-SNE maps of the same two bar drum clips, coloured by primary style: the CNN on the left, frozen PaSST on the right',
    // The ISMIR 2025 talk. Privacy-enhanced (nocookie) embed of youtu.be/f_nIl5qMxlY.
    demoVideoId: 'f_nIl5qMxlY',
    demoVideoTitle: 'ISMIR 2025 LBD: Drum Audio Style Classification',
    // Venue and institution marks (attribution, not endorsement): ISMIR 2025 (ismir2025.ismir.net,
    // resized) and the society wordmark (ismir.net); KAIST, the ISMIR 2025 host (kaist.ac.kr UI
    // page); Leiden University (official brand portal SVG) and LIACS (edu.liacs.nl); Kunstinstituut
    // Melly, where the thesis was defended (its official social mark). Owner request 2026-10-02.
    partners: [
      { img: '/img/logo-ismir2025.png', alt: 'ISMIR 2025, Daejeon' },
      { img: '/img/logo-kaist.png', alt: 'KAIST', scale: 0.55 },
      {
        img: '/img/logo-ismir.png',
        alt: 'ISMIR, International Society for Music Information Retrieval',
        scale: 0.55,
      },
      { img: '/img/logo-leiden.svg', alt: 'Universiteit Leiden', scale: 1.3 },
      { img: '/img/logo-liacs.jpg', alt: 'LIACS, Leiden Institute of Advanced Computer Science' },
      { img: '/img/logo-melly.png', alt: 'Kunstinstituut Melly' },
    ],
  },
} as const;

export type ProjectSlug = keyof typeof PROJECT_META;

/** Reading order for the "Next project" link at the foot of every project page. */
const PROJECT_ORDER: ProjectSlug[] = ['windchime', 'hrnsxtn', 'lichtspiel', 'groove'];
export function nextProject(slug: ProjectSlug): ProjectSlug {
  return PROJECT_ORDER[(PROJECT_ORDER.indexOf(slug) + 1) % PROJECT_ORDER.length];
}
