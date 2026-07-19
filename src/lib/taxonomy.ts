/** Maps enum values from the content model to visual tones + human labels,
 *  so a status string renders consistently wherever it appears. */

export type Tone = 'neutral' | 'positive' | 'warn' | 'danger' | 'info';

export const STATUS_TONE: Record<string, Tone> = {
  // project
  exploring: 'info',
  active: 'positive',
  shipped: 'positive',
  maintained: 'neutral',
  archived: 'neutral',
  // release / milestone
  planned: 'neutral',
  'in-progress': 'warn',
  'rolled-back': 'danger',
  paused: 'warn',
  dropped: 'neutral',
  // decision
  proposed: 'info',
  accepted: 'positive',
  superseded: 'neutral',
  deprecated: 'neutral',
  rejected: 'danger',
  // incident
  resolved: 'positive',
  monitoring: 'warn',
  open: 'danger',
};

export const SEVERITY_TONE: Record<string, Tone> = {
  sev1: 'danger',
  sev2: 'danger',
  sev3: 'warn',
  minor: 'neutral',
};

export const CATEGORY_LABEL: Record<string, string> = {
  feature: 'Feature',
  improvement: 'Improvement',
  fix: 'Fix',
  research: 'Research',
  ops: 'Ops',
  docs: 'Docs',
  performance: 'Performance',
};

export const HORIZON_LABEL: Record<string, string> = {
  now: 'Now',
  next: 'Next',
  later: 'Later',
  shipped: 'Shipped',
};

/** "in-progress" → "In progress", "sev1" → "Sev1". */
export function label(value: string): string {
  return value.replace(/[-_]/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

export function toneFor(kind: 'status' | 'severity', value: string): Tone {
  const map = kind === 'severity' ? SEVERITY_TONE : STATUS_TONE;
  return map[value] ?? 'neutral';
}
