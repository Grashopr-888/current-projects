import { getCollection, type CollectionEntry } from 'astro:content';
import { SEVERITY_TONE, STATUS_TONE, label, type Tone } from './taxonomy';

export type Product = 'windchime' | 'lichtspiel' | 'hrnsxtn';

/** One row of a project Timeline. Releases, incidents and research carry their full record,
 *  rendered in place (the project page is the archive); shipped milestones link to their
 *  kanban card on the same page. */
export type TimelineRecord =
  | { type: 'release'; entry: CollectionEntry<'releases'> }
  | { type: 'incident'; entry: CollectionEntry<'incidents'> }
  | { type: 'research'; entry: CollectionEntry<'research'> }
  | { type: 'milestone'; entry: CollectionEntry<'milestones'> };

export type TimelineEvent = TimelineRecord & {
  date: Date;
  kind: string;
  tone?: Tone;
  title: string;
  /** Status label shown beside the kind (releases and incidents). */
  status?: string;
  statusTone?: Tone;
  /** Element id of the full record, or of the kanban card for a milestone. */
  anchor: string;
};

/** Anchor prefixes per record type. File ids never change, so these stay stable. */
const ANCHOR_PREFIX = {
  release: 'rel',
  incident: 'inc',
  research: 'res',
  milestone: 'ms',
} as const;

export function recordAnchor(type: TimelineRecord['type'], id: string): string {
  return `${ANCHOR_PREFIX[type]}-${id}`;
}

/** Where a record renders in full: its project page, at its anchor. Pass through url(). */
export function recordPath(type: TimelineRecord['type'], product: string, id: string): string {
  return `/projects/${product}/#${recordAnchor(type, id)}`;
}

const byDateDesc = (a: { data: { date: Date } }, b: { data: { date: Date } }): number =>
  b.data.date.getTime() - a.data.date.getTime();

const byOrder = (a: { data: { order?: number } }, b: { data: { order?: number } }): number =>
  (a.data.order ?? 0) - (b.data.order ?? 0);

export interface ProjectBundle {
  decisions: CollectionEntry<'decisions'>[];
  releases: CollectionEntry<'releases'>[];
  incidents: CollectionEntry<'incidents'>[];
  research: CollectionEntry<'research'>[];
  milestones: CollectionEntry<'milestones'>[];
}

/** Everything attached to one product, sorted for display. */
export async function projectBundle(product: Product): Promise<ProjectBundle> {
  const [decisions, releases, incidents, research, milestones] = await Promise.all([
    getCollection('decisions', ({ data }) => data.product === product),
    getCollection('releases', ({ data }) => data.product === product),
    getCollection('incidents', ({ data }) => data.product === product),
    getCollection('research', ({ data }) => data.product === product),
    getCollection('milestones', ({ data }) => data.product === product),
  ]);
  decisions.sort(byDateDesc);
  releases.sort(byDateDesc);
  incidents.sort(byDateDesc);
  research.sort(byDateDesc);
  milestones.sort(byOrder);
  return { decisions, releases, incidents, research, milestones };
}

/**
 * Order of two events that share a calendar day. Negative puts `a` first (higher on the page).
 * Returning 0 keeps insertion order: releases, then incidents, then research, then milestones.
 */
function sameDayOrder(a: TimelineEvent, b: TimelineEvent): number {
  // A hook for a deliberate same-day order; for now insertion order stands.
  void a;
  void b;
  return 0;
}

/** Merge releases, incidents, research and shipped milestones into one reverse-chronological stream. */
export function toTimeline(b: ProjectBundle): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  for (const r of b.releases) {
    events.push({
      type: 'release',
      entry: r,
      date: r.data.date,
      kind: 'Release',
      tone: STATUS_TONE[r.data.status] ?? 'positive',
      title: r.data.title,
      // "Shipped" is what a release row already implies; only other states get a badge.
      status: r.data.status === 'shipped' ? undefined : label(r.data.status),
      statusTone: STATUS_TONE[r.data.status] ?? 'neutral',
      anchor: recordAnchor('release', r.id),
    });
  }
  for (const i of b.incidents) {
    events.push({
      type: 'incident',
      entry: i,
      date: i.data.date,
      kind: `Incident · ${label(i.data.severity)}`,
      tone: SEVERITY_TONE[i.data.severity] ?? 'warn',
      title: i.data.title,
      status: label(i.data.status),
      statusTone: STATUS_TONE[i.data.status] ?? 'neutral',
      anchor: recordAnchor('incident', i.id),
    });
  }
  for (const r of b.research) {
    events.push({
      type: 'research',
      entry: r,
      date: r.data.date,
      kind: `Research · ${label(r.data.source_type)}`,
      tone: 'info',
      title: r.data.title,
      anchor: recordAnchor('research', r.id),
    });
  }
  for (const m of b.milestones) {
    if (m.data.horizon === 'shipped' && m.data.date) {
      events.push({
        type: 'milestone',
        entry: m,
        date: m.data.date,
        kind: 'Milestone',
        tone: 'positive',
        title: m.data.title,
        anchor: recordAnchor('milestone', m.id),
      });
    }
  }
  events.sort((a, b) => b.date.getTime() - a.date.getTime() || sameDayOrder(a, b));
  return events;
}

/* ── cross-product collection queries (for the aggregate pages) ────────────── */

export async function allReleases(): Promise<CollectionEntry<'releases'>[]> {
  const r = await getCollection('releases');
  r.sort(byDateDesc);
  return r;
}

export async function allIncidents(): Promise<CollectionEntry<'incidents'>[]> {
  const r = await getCollection('incidents');
  r.sort(byDateDesc);
  return r;
}

export async function allResearch(): Promise<CollectionEntry<'research'>[]> {
  const r = await getCollection('research');
  r.sort(byDateDesc);
  return r;
}

export async function allDecisions(): Promise<CollectionEntry<'decisions'>[]> {
  const r = await getCollection('decisions');
  r.sort(byDateDesc);
  return r;
}

export async function allMilestones(): Promise<CollectionEntry<'milestones'>[]> {
  const r = await getCollection('milestones');
  r.sort(byOrder);
  return r;
}

/** Reverse-chronological changelog stream: one entry per release + explicit changelog items. */
export async function changelogStream(): Promise<
  Array<{
    date: Date;
    product: string;
    category: string;
    title: string;
    summary: string;
    id: string;
  }>
> {
  const [releases, changelog] = await Promise.all([
    getCollection('releases'),
    getCollection('changelog'),
  ]);
  const stream = [
    ...releases.map((r) => ({
      date: r.data.date,
      product: r.data.product,
      category: r.data.status === 'shipped' ? 'release' : r.data.status,
      title: r.data.title,
      summary: r.data.customer_value,
      id: `rel-${r.id}`,
    })),
    ...changelog.map((c) => ({
      date: c.data.date,
      product: c.data.product,
      category: c.data.category,
      title: c.data.title,
      summary: c.data.summary,
      id: `log-${c.id}`,
    })),
  ];
  stream.sort((a, b) => b.date.getTime() - a.date.getTime());
  return stream;
}
