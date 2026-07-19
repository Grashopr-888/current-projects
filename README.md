# Current Projects

A public record of **how** two creative-technology products — **Windchime** and
**Lichtspiel** — are being built: discovery, decisions, roadmap, releases, incidents, and
iteration. It exists to show technical-product-management and product-engineering practice
**without exposing the products' private source code**.

The site treats process as the artifact, and it is a **living site**: the project records
are updated as the work progresses, and new projects will be added here as they start.

> **Live site:** `https://grashopr-888.github.io/current-projects/`
> (Set your host in [`astro.config.mjs`](astro.config.mjs).)

## What this is — and isn't

- **Is:** sanitized evidence — problem framing, trade-offs, roadmaps, release notes, blameless
  postmortems, research method, and outcomes.
- **Isn't:** the products' source code, their private corpora/model weights, in-progress
  academic results, or anything a reader could use to reconstruct protected work.

The rule: **expose the _why_, summarize the sensitive _how_.** See
[`docs/redaction-policy.md`](docs/redaction-policy.md).

## Stack

Astro 5 (static, prerendered) · typed content collections with build-time cross-references ·
TypeScript · self-hosted fonts (Fontsource) · minimal client JS · GitHub Actions → GitHub Pages.

## Structure

```
src/
  content.config.ts     # the typed content model (9 collections)
  content/              # the evidence, as data (projects, decisions, releases, incidents, …)
  data/snapshots/       # sanitized aggregates produced by the ingestion pipeline
  components/  layouts/  pages/  styles/  lib/
scripts/                # ingestion + redaction pipeline (see scripts/README.md)
docs/                   # content model, redaction policy, editorial guidelines, admin
.github/                # CI, Pages deploy, issue/PR templates, CODEOWNERS, dependabot
```

## Local development

```bash
npm install
npm run dev            # http://localhost:4321/current-projects
npm run check          # astro type-check
npm run build          # production build → dist/
npm run format         # prettier
```

## Ingesting new evidence

The pipeline pulls **sanitized** metadata from the private repos; raw pulls stay gitignored,
and only redacted aggregates are committed. See [`scripts/README.md`](scripts/README.md).

```bash
npm run ingest         # git + github metadata → src/data/snapshots/
npm run redact:check   # gate: fail if any secret/host slipped into src/content
```

## Before making anything public

Follow [`docs/publishing-checklist.md`](docs/publishing-checklist.md). At minimum:
`npm run redact:check` is clean, and a human has read every content change for sanitization.

## Documentation

- [Content model](docs/content-model.md) — the nine collections and their fields.
- [Redaction policy](docs/redaction-policy.md) — what's public, what's private, and why.
- [Editorial guidelines](docs/editorial-guidelines.md) — register and style.
- [Admin](docs/admin.md) — branch protection, Pages setup, private→public rollout.

## License

Site code is MIT (see `LICENSE`). The **content** (writing, diagrams, screenshots) is
&copy; the author, all rights reserved — it documents private products and is not for reuse.
