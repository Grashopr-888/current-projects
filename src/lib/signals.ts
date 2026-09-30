/**
 * Build-time reader for the sanitized git snapshots produced by `npm run ingest:git`.
 * This is where the ingestion pipeline pays off in the UI: a real, redacted "shipping
 * cadence" the site can render without ever touching private source.
 */
export const SIGNAL_PRODUCTS = ['windchime', 'lichtspiel', 'hrnsxtn', 'groove'] as const;
export type SignalProduct = (typeof SIGNAL_PRODUCTS)[number];

interface GitSnap {
  label: string;
  product: SignalProduct;
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

export type MonthSignal = { month: string; count: number } & Record<SignalProduct, number>;

export interface DayActivity {
  count: number;
  /** Sanitized subject lines (capped); `count` may exceed subjects.length. */
  subjects: string[];
}

export interface Span {
  first: string | null;
  last: string | null;
}

export interface GitSignals {
  available: boolean;
  repoCount: number;
  totalCommits: number;
  firstDate: string | null;
  lastDate: string | null;
  months: MonthSignal[];
  byProduct: Record<SignalProduct, number>;
  /** First and last commit day per product, so each grid can use its own window. */
  spanByProduct: Record<SignalProduct, Span>;
  /** Per-product day-level activity, merged across that product's repos. */
  daysByProduct: Record<SignalProduct, Record<string, DayActivity>>;
  releaseTags: Array<{ name: string; date: string; product: string }>;
}

const MAX_MERGED_SUBJECTS = 4;

const perProduct = <T>(make: () => T) =>
  Object.fromEntries(SIGNAL_PRODUCTS.map((p) => [p, make()])) as Record<SignalProduct, T>;

/** Widen a span to cover another span. */
export function spanUnion(spans: Span[]): Span {
  let first: string | null = null;
  let last: string | null = null;
  for (const s of spans) {
    if (s.first && (!first || s.first < first)) first = s.first;
    if (s.last && (!last || s.last > last)) last = s.last;
  }
  return { first, last };
}

export function gitSignals(): GitSignals {
  const monthMap: Record<string, Record<SignalProduct, number>> = {};
  const byProduct = perProduct(() => 0);
  const spanByProduct = perProduct<Span>(() => ({ first: null, last: null }));
  const daysByProduct = perProduct<Record<string, DayActivity>>(() => ({}));
  let totalCommits = 0;
  const releaseTags: Array<{ name: string; date: string; product: string }> = [];

  for (const s of snaps) {
    totalCommits += s.commitCount;
    byProduct[s.product] += s.commitCount;
    spanByProduct[s.product] = spanUnion([
      spanByProduct[s.product],
      { first: s.firstDate, last: s.lastDate },
    ]);
    for (const [m, c] of Object.entries(s.months)) {
      monthMap[m] ??= perProduct(() => 0);
      monthMap[m][s.product] += c;
    }
    for (const [date, d] of Object.entries(s.days ?? {})) {
      const cell = (daysByProduct[s.product][date] ??= { count: 0, subjects: [] });
      cell.count += d.count;
      for (const subj of d.subjects) {
        if (cell.subjects.length < MAX_MERGED_SUBJECTS) cell.subjects.push(subj);
      }
    }
    for (const t of s.tags) releaseTags.push({ ...t, product: s.product });
  }

  const months = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, v]) => ({
      month,
      count: SIGNAL_PRODUCTS.reduce((n, p) => n + v[p], 0),
      ...v,
    }));
  releaseTags.sort((a, b) => b.date.localeCompare(a.date));
  const all = spanUnion(Object.values(spanByProduct));

  return {
    available: snaps.length > 0,
    repoCount: snaps.length,
    totalCommits,
    firstDate: all.first,
    lastDate: all.last,
    months,
    byProduct,
    spanByProduct,
    daysByProduct,
    releaseTags,
  };
}
