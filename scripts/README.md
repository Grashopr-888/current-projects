# Ingestion &amp; redaction pipeline

These scripts pull **sanitized evidence** from the private product repos into the public
showcase. The governing rule: raw pulls are quarantined and never committed; only redacted
aggregates reach `src/data/snapshots/`, and the site reads only from there.

```
private repos ──▶ ingest-*  ──┬──▶ .private/ingest/**        RAW, gitignored
                              └──▶ src/data/snapshots/**     SANITIZED, committable
                                        ▲
                          every string passes through lib/redact.ts
```

## Commands

| Command                                                                            | What it does                                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run ingest:git`                                                               | Reads local git history for each repo in `scripts/config.ts`. Writes sanitized activity (commit counts, monthly cadence, release tags — **no commit subjects**) to `src/data/snapshots/git/`. Raw commit lists go to `.private/ingest/git/`. |
| `npm run ingest:github`                                                            | Via the `gh` CLI, pulls issue/PR/label/milestone/release **metadata** (never bodies). Degrades gracefully if `gh` is missing or unauthenticated.                                                                                             |
| `npm run ingest:research -- --src <dir> [--product windchime\|lichtspiel\|shared]` | Scans a notes directory, redacts aggressively, and writes review-required **candidates** to `.private/research-candidates/`. Nothing is auto-published — a human promotes the good ones into `src/content/research/`.                        |
| `npm run ingest`                                                                   | Runs `ingest:git` then `ingest:github`.                                                                                                                                                                                                      |
| `npm run redact:check [dir]`                                                       | Scans a tree (default `src/content`) for secrets, internal hosts, emails, and large code blocks. Exits non-zero if anything is found — use it as a pre-publish gate. Add `--write` to emit redacted copies under `.private/redacted/`.       |

## Configuration

`scripts/config.ts` lists the source repos. Paths resolve from `$HOME` at runtime (override
with `PL_REPOS_ROOT`), so no machine-specific path or username is committed. Add a project by
adding one entry.

## The redaction engine (`scripts/lib/redact.ts`)

A single function every ingested string flows through. It removes, and logs, high-confidence
secrets (API keys, tokens, private-key blocks, `KEY=value` assignments), and optionally
internal hostnames/IPs, emails, and code blocks over a line threshold. It **defaults to
redaction when uncertain** — over-redacting a sanitized aggregate is cheap; leaking is not.

Tune it in one place: `SECRET_RULES` / `HOST_RULES` for patterns, `PUBLIC_EMAILS` in
`config.ts` for intentional exceptions.

## What is safe to commit

- ✅ `src/data/snapshots/**` — sanitized aggregates.
- ❌ `.private/**` — raw pulls, research candidates, redacted dumps. Gitignored; never commit.

Run `npm run redact:check` before publishing.
