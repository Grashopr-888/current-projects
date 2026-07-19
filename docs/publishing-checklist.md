# Publishing checklist — private → public

Run this before enabling GitHub Pages or making the repo public, and again before any release
that adds content derived from private work. The automated gate is necessary but **not
sufficient** — a human must read every content change.

## 1. Automated gates (must all pass)

```bash
npm run check          # types + cross-references resolve
npm run build          # production build succeeds
npm run format:check   # formatting is clean
npm run redact:check   # no secrets, hosts, emails, or large code blocks in src/content
```

Also confirm nothing sensitive rode into the sanitized snapshots:

```bash
npm run redact:check src/data/snapshots
```

## 2. Human sanitization review

Read every added/changed entry and confirm it exposes **none** of:

- [ ] Source code, or architecture detail specific enough to reconstruct it
- [ ] Secrets, tokens, API keys, internal hostnames, ports, or env values
- [ ] Proprietary corpus, sample libraries, or model weights
- [ ] In-progress academic results, a paper's claims, or a blind-review venue
- [ ] A collaborator's name or identity without their explicit consent
- [ ] Personal data (transcripts, user records) from studies or runtime logs

## 3. Staging hygiene

- [ ] `.private/` is gitignored and contains no committed files (`git status` is clean of it)
- [ ] No `.env` or `*.raw.json` is staged
- [ ] Screenshots/diagrams are at the system-boundary level; no sensitive UI or data visible

## 4. Framing & accuracy

- [ ] Project names, venues, and collaborators are stated accurately
- [ ] Numbers are safe to publish (ops/engineering metrics, not confidential results)
- [ ] Copy reads in register — calm, specific, not self-congratulatory
- [ ] The owner's real name is set in `src/config.ts` (or intentionally left as handle)

## 5. Platform

- [ ] You understand a Pages site is public by default (see [admin.md](admin.md))
- [ ] `site` / `base` in `astro.config.mjs` match the deploy target
- [ ] Branch protection requires the CI check before merge to `main`

Only when every box is checked: enable Pages / flip the repo public.
