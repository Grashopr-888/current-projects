<!-- Keep this honest — the repo's whole point is disciplined, sanitized process. -->

## What & why

<!-- One or two sentences. What changed, and what it improves. -->

## Type

- [ ] Content (new/edited project, decision, release, incident, research, milestone)
- [ ] Site (components, layout, styles)
- [ ] Pipeline (ingestion / redaction scripts)
- [ ] Ops (CI, deploy, config, docs)

## Sanitization check (required for any content or pipeline change)

- [ ] No private source code, secrets, tokens, or internal hostnames
- [ ] No proprietary corpus, model weights, or in-progress paper results
- [ ] No collaborator identified without their consent
- [ ] `npm run redact:check` is clean
- [ ] Anything sensitive is summarized a level up, not pasted verbatim

## Quality

- [ ] `npm run check` (type-check) passes
- [ ] `npm run build` passes
- [ ] `npm run format` applied
- [ ] Reads in the site's register: calm, specific, not self-congratulatory
