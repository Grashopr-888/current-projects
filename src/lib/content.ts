import { getCollection, type CollectionEntry } from 'astro:content';
import { SEVERITY_TONE, STATUS_TONE, type Tone } from './taxonomy';

export type Product = 'windchime' | 'lichtspiel';

export interface TimelineEvent {
  date: Date;
  kind: string;
  tone?: Tone;
  title: string;
  summary?: string;
  href?: string;
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

/** Merge releases, incidents, and shipped milestones into one reverse-chronological stream. */
export function toTimeline(b: ProjectBundle): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  for (const r of b.releases) {
    events.push({
      date: r.data.date,
      kind: 'Release',
      tone: STATUS_TONE[r.data.status] ?? 'positive',
      title: r.data.title,
      summary: r.data.summary,
    });
  }
  for (const i of b.incidents) {
    events.push({
      date: i.data.date,
      kind: `Incident · ${i.data.severity}`,
      tone: SEVERITY_TONE[i.data.severity] ?? 'warn',
      title: i.data.title,
      summary: i.data.summary,
    });
  }
  for (const m of b.milestones) {
    if (m.data.horizon === 'shipped' && m.data.date) {
      events.push({
        date: m.data.date,
        kind: 'Milestone',
        tone: 'positive',
        title: m.data.title,
        summary: m.data.summary,
      });
    }
  }
  events.sort((a, b) => b.date.getTime() - a.date.getTime());
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
