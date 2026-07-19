# Contributing / editorial standards

This repo is a **sanitized process showcase**. The bar for a change is not just "does it
build" but "is it safe to publish and does it read well." Most contributions are content.

## Adding or editing content

Content lives as typed Markdown under `src/content/<collection>/`. Each collection has a
schema in [`src/content.config.ts`](src/content.config.ts); see
[`docs/content-model.md`](docs/content-model.md) for every field.

1. Create/edit a Markdown file in the right collection folder.
2. Fill the frontmatter to match the schema. `product` must be one of `windchime`,
   `lichtspiel`, or `shared`.
3. Any `reference()` field (e.g. `linked_release`) must point at an entry that exists —
   otherwise the build fails. That is intentional.
4. Run the checks below.

## The register

Calm, precise, reflective, technically literate, product-minded — **not** self-congratulatory.
Show the problem, the trade-off, what was measured, and what changed. Prefer specifics over
adjectives. Full guidance in [`docs/editorial-guidelines.md`](docs/editorial-guidelines.md).

## Sanitization (non-negotiable)

Before publishing anything derived from private work, confirm it exposes no source code,
secrets, internal hostnames, proprietary corpora/weights, in-progress paper results, or a
collaborator's identity without consent. When in doubt, summarize a level up. Full rules in
[`docs/redaction-policy.md`](docs/redaction-policy.md).

## Before opening a PR

```bash
npm run check          # type-check (a broken cross-link fails here)
npm run build          # production build
npm run format         # prettier
npm run redact:check   # gate: no secrets/hosts in src/content
```

## Review

`CODEOWNERS` requires an owner review. Content and pipeline changes get an explicit
sanitization pass before merge. The PR template's checklist is the minimum.
