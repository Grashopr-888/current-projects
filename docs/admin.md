# Admin — branch protection, Pages, rollout

## Branch protection (recommended for `main`)

In **Settings → Branches → Add rule** for `main`:

- Require a pull request before merging (1 approval).
- Require status checks to pass: the **CI** workflow (`typecheck · format · build · redact`).
- Require branches to be up to date before merging.
- Require review from Code Owners (enforces `CODEOWNERS`).
- Do not allow bypassing the above.

This makes the redaction gate and the type-check unskippable — you cannot merge content that
leaks a secret or breaks a cross-reference.

## GitHub Pages setup

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Push to `main`. The [`deploy.yml`](../.github/workflows/deploy.yml) workflow builds with
   Astro and publishes.
3. The URL is `https://<owner>.github.io/<repo>/`. Keep `site`/`base` in
   [`astro.config.mjs`](../astro.config.mjs) in sync with it.

### Custom domain

Set `site` to your domain and `base` to `/` in `astro.config.mjs`, add a `public/CNAME`
containing the domain, and configure the domain in **Settings → Pages**.

## Private-first, public-later rollout

A GitHub Pages site is **publicly reachable by default**, even from a private repo — private
Pages access control requires GitHub Enterprise Cloud. So treat "the repo is private" as **not**
equivalent to "the site is private."

Safe rollout:

1. Build and iterate while the repo is private and **Pages is not enabled** (or deploy only to
   a non-public preview).
2. Run the [publishing checklist](publishing-checklist.md) — `redact:check` clean, every
   content change read by a human for sanitization.
3. Only then enable Pages / make the repo public.

Never assume privacy from repo visibility alone.
