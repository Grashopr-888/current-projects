/**
 * Build-time reader for the sanitized git snapshots produced by `npm run ingest:git`.
 * This is where the ingestion pipeline pays off in the UI: a real, redacted "shipping
 * cadence" the site can render without ever touching private source.
 */
interface GitSnap {
  label: string;
  product: 'windchime' | 'lichtspiel';
  commitCount: number;
  firstDate: string | null;
  lastDate: string | null;
  months: Record<string, number>;
  days?: Record<string, { count: number; subjects: string[] }>;
  tags: Array<{ name: string; date: string }>;
}

const modules = import.meta.glob('../data/snapshots/git/*.json', { eager: true }) as Record<
  string,
  { default: unknown }
>;

const snaps: GitSnap[] = Object.entries(modules)
  .filter(([p]) => !p.endsWith('index.json'))
  .map(([, m]) => m.default as GitSnap)
  .filter((s) => s && typeof s.commitCount === 'number');

export interface MonthSignal {
  month: string;
  count: number;
  windchime: number;
  lichtspiel: number;
}

export interface DayActivity {
  count: number;
  /** Sanitized subject lines (capped); `count` may exceed subjects.length. */
  subjects: string[];
}

export interface GitSignals {
  available: boolean;
  repoCount: number;
  totalCommits: number;
  firstDate: string | null;
  lastDate: string | null;
  months: MonthSignal[];
  byProduct: Record<'windchime' | 'lichtspiel', number>;
  /** Per-product day-level activity, merged across that product's repos. */
  daysByProduct: Record<'windchime' | 'lichtspiel', Record<string, DayActivity>>;
  releaseTags: Array<{ name: string; date: string; product: string }>;
}

const MAX_MERGED_SUBJECTS = 4;

export function gitSignals(): GitSignals {
  const monthMap: Record<string, { windchime: number; lichtspiel: number }> = {};
  const byProduct: Record<'windchime' | 'lichtspiel', number> = { windchime: 0, lichtspiel: 0 };
  const daysByProduct: GitSignals['daysByProduct'] = { windchime: {}, lichtspiel: {} };
  let totalCommits = 0;
  let firstDate: string | null = null;
  let lastDate: string | null = null;
  const releaseTags: Array<{ name: string; date: string; product: string }> = [];

  for (const s of snaps) {
    totalCommits += s.commitCount;
    byProduct[s.product] += s.commitCount;
    for (const [m, c] of Object.entries(s.months)) {
      monthMap[m] ??= { windchime: 0, lichtspiel: 0 };
      monthMap[m][s.product] += c;
    }
    for (const [date, d] of Object.entries(s.days ?? {})) {
      const cell = (daysByProduct[s.product][date] ??= { count: 0, subjects: [] });
      cell.count += d.count;
      for (const subj of d.subjects) {
        if (cell.subjects.length < MAX_MERGED_SUBJECTS) cell.subjects.push(subj);
      }
    }
    if (s.firstDate && (!firstDate || s.firstDate < firstDate)) firstDate = s.firstDate;
    if (s.lastDate && (!lastDate || s.lastDate > lastDate)) lastDate = s.lastDate;
    for (const t of s.tags) releaseTags.push({ ...t, product: s.product });
  }

  const months = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, v]) => ({ month, count: v.windchime + v.lichtspiel, ...v }));
  releaseTags.sort((a, b) => b.date.localeCompare(a.date));

  return {
    available: snaps.length > 0,
    repoCount: snaps.length,
    totalCommits,
    firstDate,
    lastDate,
    months,
    byProduct,
    daysByProduct,
    releaseTags,
  };
}
