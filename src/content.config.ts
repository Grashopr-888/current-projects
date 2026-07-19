import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * CONTENT MODEL
 * -----------------------------------------------------------------------------
 * The site treats process artifacts as *typed data*, not hand-assembled pages.
 * Every collection below is a first-class product record with a validated shape,
 * and records cross-reference each other with `reference()` so relationships are
 * checked at build time — a dangling "this decision shipped in that release" link
 * fails the build. That is the point: the narrative cannot drift from the data.
 *
 * Adding a new project later = add its slug to PRODUCTS and drop in content.
 */

const PRODUCTS = ['windchime', 'lichtspiel', 'shared'] as const;
const product = z.enum(PRODUCTS);

/** A pointer to evidence — kept abstract so we can cite a PR title, a metric, or a doc
 *  without ever needing to expose the underlying private source. */
const evidenceLink = z.object({
  label: z.string(),
  href: z.string().optional(),
  note: z.string().optional(),
});

/** Redaction posture carried on any record that may originate from private material.
 *  Drives the private→public review checklist and the ingestion/redaction pipeline. */
const redactionStatus = z
  .enum(['clean', 'sanitized', 'needs-review', 'placeholder'])
  .default('clean');

/* ── projects ──────────────────────────────────────────────────────────────── */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      status: z.enum(['exploring', 'active', 'shipped', 'maintained', 'archived']),
      timeframe: z.string(), // e.g. "2025 – present"
      role: z.string(),
      collaborators: z.array(z.string()).default([]),
      thesis: z.string(),
      problem: z.string(),
      audience: z.string(),
      constraints: z.array(z.string()).default([]),
      outcomes: z.array(z.string()).default([]),
      public_visibility_note: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      accent: z.string().optional(), // per-project accent color (hsl/hex)
      tech: z.array(z.string()).default([]),
      languages: z.array(z.string()).default([]), // exhaustive programming-language list
      hero: image().optional(),
      related_research: z.array(reference('research')).default([]),
      related_decisions: z.array(reference('decisions')).default([]),
      related_releases: z.array(reference('releases')).default([]),
      related_incidents: z.array(reference('incidents')).default([]),
    }),
});

/* ── research notes ────────────────────────────────────────────────────────── */
const research = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    product,
    date: z.coerce.date(),
    source_type: z.enum([
      'discovery',
      'interview',
      'market-scan',
      'experiment',
      'literature',
      'usability',
      'field-notes',
      'synthesis',
    ]),
    summary: z.string(),
    questions: z.array(z.string()).default([]),
    insights: z.array(z.string()).default([]),
    implications: z.array(z.string()).default([]),
    evidence_links: z.array(evidenceLink).default([]),
    tags: z.array(z.string()).default([]),
    provenance: z.string().optional(), // where this was distilled from (for ingestion)
    redaction_status: redactionStatus,
  }),
});

/* ── decision records (ADR-style) ──────────────────────────────────────────── */
const decisions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/decisions' }),
  schema: z.object({
    title: z.string(),
    product,
    date: z.coerce.date(),
    status: z.enum(['proposed', 'accepted', 'superseded', 'deprecated', 'rejected']),
    context: z.string(),
    options_considered: z
      .array(z.object({ option: z.string(), tradeoffs: z.string().optional() }))
      .default([]),
    decision: z.string(),
    rationale: z.string(),
    consequences: z.string(),
    linked_milestones: z.array(reference('milestones')).default([]),
    linked_artifacts: z.array(reference('artifacts')).default([]),
    supersedes: reference('decisions').optional(),
    tags: z.array(z.string()).default([]),
  }),
});

/* ── releases ──────────────────────────────────────────────────────────────── */
const releases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/releases' }),
  schema: z.object({
    title: z.string(),
    product,
    version_or_label: z.string(),
    date: z.coerce.date(),
    status: z.enum(['planned', 'in-progress', 'shipped', 'rolled-back']),
    summary: z.string(),
    customer_value: z.string(),
    included_work: z.array(z.string()).default([]),
    notable_risks: z.array(z.string()).default([]),
    followups: z.array(z.string()).default([]),
    linked_incidents: z.array(reference('incidents')).default([]),
    linked_decisions: z.array(reference('decisions')).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

/* ── incidents (blameless postmortems) ─────────────────────────────────────── */
const incidents = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/incidents' }),
  schema: z.object({
    title: z.string(),
    product,
    date: z.coerce.date(),
    severity: z.enum(['sev1', 'sev2', 'sev3', 'minor']),
    summary: z.string(),
    impact: z.string(),
    detection: z.string(),
    response: z.string(),
    root_cause: z.string(),
    fix: z.string(),
    followup_actions: z
      .array(
        z.object({
          action: z.string(),
          owner: z.string().optional(),
          status: z.enum(['open', 'done', 'wontfix']).default('open'),
        })
      )
      .default([]),
    status: z.enum(['resolved', 'monitoring', 'open']),
    blameless_note: z.string().optional(),
    linked_release: reference('releases').optional(),
    tags: z.array(z.string()).default([]),
  }),
});

/* ── changelog entries ─────────────────────────────────────────────────────── */
const changelog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/changelog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    product,
    category: z.enum(['feature', 'improvement', 'fix', 'research', 'ops', 'docs', 'performance']),
    summary: z.string(),
    linked_release: reference('releases').optional(),
    linked_project: reference('projects').optional(),
    tags: z.array(z.string()).default([]),
  }),
});

/* ── milestones (roadmap items) ────────────────────────────────────────────── */
const milestones = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/milestones' }),
  schema: z.object({
    title: z.string(),
    product,
    horizon: z.enum(['now', 'next', 'later', 'shipped']),
    date: z.coerce.date().optional(),
    target: z.string().optional(), // human label e.g. "Q3 2025"
    status: z.enum(['planned', 'in-progress', 'shipped', 'paused', 'dropped']).default('planned'),
    summary: z.string(),
    theme: z.string().optional(), // strategic pillar this ladders up to
    confidence: z.enum(['low', 'medium', 'high']).optional(),
    linked_releases: z.array(reference('releases')).default([]),
    order: z.number().default(0),
  }),
});

/* ── artifacts (screenshots, diagrams, checklists…) ────────────────────────── */
const artifacts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/artifacts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      product,
      date: z.coerce.date().optional(),
      type: z.enum([
        'screenshot',
        'diagram',
        'mockup',
        'checklist',
        'doc',
        'video',
        'render',
        'metric',
      ]),
      summary: z.string(),
      media: image().optional(),
      alt: z.string().optional(),
      caption: z.string().optional(),
      external_href: z.string().optional(),
      redaction_status: redactionStatus,
      tags: z.array(z.string()).default([]),
    }),
});

/* ── glossary ──────────────────────────────────────────────────────────────── */
const glossary = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/glossary' }),
  schema: z.object({
    term: z.string(),
    product: product.optional(),
    definition: z.string(),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = {
  projects,
  research,
  decisions,
  releases,
  incidents,
  changelog,
  milestones,
  artifacts,
  glossary,
};
