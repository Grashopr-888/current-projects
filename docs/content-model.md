# Content model

Everything on the site is typed data, defined in
[`src/content.config.ts`](../src/content.config.ts) and stored as Markdown under
`src/content/`. Cross-references are validated at build time — a dangling link fails the
build, so the narrative can't drift from the data.

`product` is one of `windchime`, `lichtspiel`, `shared`. Add a project by adding its slug to
`PRODUCTS`.

## Collections

| Collection   | One entry is…                  | Notable fields                                                                                               |
| ------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `projects`   | A product hub                  | `thesis`, `problem`, `audience`, `constraints[]`, `outcomes[]`, `tech[]`, `status`, `public_visibility_note` |
| `decisions`  | An ADR                         | `context`, `options_considered[]`, `decision`, `rationale`, `consequences`, `status`                         |
| `releases`   | A shipped (or planned) release | `version_or_label`, `customer_value`, `included_work[]`, `notable_risks[]`, `linked_incidents[]`             |
| `incidents`  | A blameless postmortem         | `severity`, `impact`, `detection`, `root_cause`, `fix`, `followup_actions[]`, `blameless_note`               |
| `milestones` | A roadmap item                 | `horizon` (now/next/later/shipped), `theme`, `status`, `confidence`, `linked_releases[]`                     |
| `research`   | A sanitized research note      | `source_type`, `questions[]`, `insights[]`, `implications[]`, `redaction_status`                             |
| `changelog`  | A changelog line               | `category`, `linked_release`, `linked_project`                                                               |
| `artifacts`  | A screenshot/diagram/doc       | `type`, `media`, `alt`, `caption`, `redaction_status`                                                        |
| `glossary`   | A term                         | `term`, `definition`, `related[]`                                                                            |

## Cross-references

`reference('<collection>')` fields (e.g. `linked_release`, `linked_incidents`,
`related_decisions`) must resolve to an entry `id` (its filename without extension). Example:

```yaml
# in a release
linked_incidents:
  - wc-audio-runaway # → src/content/incidents/wc-audio-runaway.md must exist
```

## Provenance & redaction fields

`research` and `artifacts` carry `provenance` and `redaction_status`
(`clean` | `sanitized` | `needs-review` | `placeholder`). The ingestion pipeline writes
`needs-review` candidates; a human clears them before promotion.

## How pages consume it

Project pages query by `product`; the aggregate pages (Roadmap, Releases, Research,
Incidents) query across products. Query helpers live in
[`src/lib/content.ts`](../src/lib/content.ts); the sanitized git activity is read by
[`src/lib/signals.ts`](../src/lib/signals.ts).
