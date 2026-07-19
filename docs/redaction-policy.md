# Redaction policy

**Expose the _why_, the decision trail, and the operational evidence. Summarize the
implementation-sensitive _how_. When uncertain, redact.**

If a detail would let someone reconstruct protected code, internal architecture, a security
posture, a private corpus, or unreleased/under-review work, describe it a level up instead of
publishing it verbatim. If a detail helps a reader understand thinking, prioritization,
communication, or shipping discipline, it belongs on the site.

## Public vs private

| Public (belongs here)                         | Private (never here)                             |
| --------------------------------------------- | ------------------------------------------------ |
| Problems, theses, trade-offs, decisions       | Source code and internal architecture detail     |
| Roadmaps, release notes, outcomes             | Proprietary audio corpus, model weights          |
| Bugs, postmortems, follow-through             | In-progress academic write-ups and their results |
| Research **method** and provenance            | Secrets, tokens, internal hostnames, env dumps   |
| Screenshots, diagrams (system-boundary level) | A collaborator's identity, absent consent        |

## The trust boundary

The ingestion pipeline enforces this structurally:

```
private repos ──▶ ingest-*  ──┬──▶ .private/**            RAW, gitignored — never committed
                              └──▶ src/data/snapshots/**  SANITIZED — committable
                                        ▲
                          every string passes through scripts/lib/redact.ts
```

- **Raw pulls** (full commit subjects, issue bodies, notes) land in `.private/` and are
  gitignored. They exist only for local inspection.
- **Sanitized aggregates** (counts, cadence, redacted tag/release names) are the only thing
  the site reads and the only thing committed.

## The redaction engine

[`scripts/lib/redact.ts`](../scripts/lib/redact.ts) removes and logs high-confidence secrets
(API keys, tokens, private-key blocks, `KEY=value` assignments) always, and optionally
internal hosts/IPs, emails, and code blocks over a line threshold. It **defaults to
redaction** — over-redacting a sanitized aggregate is cheap; leaking is not.

## The gate

`npm run redact:check` scans `src/content` (or any path) and exits non-zero on any finding.
It runs in CI and must be clean before publishing. It is a backstop, not a substitute for a
human sanitization review.
