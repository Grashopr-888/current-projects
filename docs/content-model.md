# Content model

Everything on the site is typed data, defined in
[`src/content.config.ts`](../src/content.config.ts) and stored as Markdown under
`src/content/`. Cross-references are validated at build time: a dangling link fails the
build, so the narrative can't drift from the data.

`product` is one of `windchime`, `lichtspiel`, `hrnsxtn`, `shared`. Add a project by adding its slug to
`PRODUCTS`.

## Collections

| Collection   | One entry is…                  | Notable fields                                                                                                                                    |
| ------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projects`   | A product hub                  | `thesis`, `problem`, `audience`, `constraints[]`, `outcomes[]`, `tech[]`, `languages[]`, `skills[]`, `status`, `layout`, `public_visibility_note` |
| `decisions`  | An ADR                         | `context`, `options_considered[]`, `decision`, `rationale`, `consequences`, `status`                                                              |
| `releases`   | A shipped (or planned) release | `version_or_label`, `customer_value`, `included_work[]`, `notable_risks[]`, `linked_incidents[]`                                                  |
| `incidents`  | A blameless postmortem         | `severity`, `impact`, `detection`, `root_cause`, `fix`, `followup_actions[]`, `blameless_note`                                                    |
| `milestones` | A roadmap item                 | `horizon` (now/next/later/shipped), `theme`, `status`, `confidence`, `linked_releases[]`                                                          |
| `research`   | A sanitized research note      | `source_type`, `questions[]`, `insights[]`, `implications[]`, `redaction_status`                                                                  |
| `changelog`  | A changelog line               | `category`, `linked_release`, `linked_project`                                                                                                    |
| `artifacts`  | A screenshot/diagram/doc       | `type`, `media`, `alt`, `caption`, `redaction_status`                                                                                             |
| `glossary`   | A term                         | `term`, `definition`, `related[]`                                                                                                                 |

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

Each record renders in full in one place, its project page, and is linked from everywhere else.

- **Research projects** (`layout: research`, today only `groove`) skip `[slug].astro` and have hand built pages under `src/pages/projects/<slug>/`; their entry still supplies the card.
- **Project pages** (`src/pages/projects/[slug].astro`) query by `product`. Releases, incidents
  and research notes merge into one collapsible Timeline whose rows expand into the full record
  (`toTimeline` in [`src/lib/content.ts`](../src/lib/content.ts), `Timeline.astro`,
  `RecordBody.astro`). Decisions have their own section; milestones fill the Roadmap kanban.
- **Aggregate pages** (Releases, Incidents, Research, Roadmap) query across products and list one
  linked row per record, pointing at its anchor on the project page.
- **Anchors** are built from file ids, so renaming a file breaks links: `#rel-<id>`,
  `#inc-<id>`, `#res-<id>` (Timeline cards), `#ms-<id>` (kanban cards), `#rec-<id>` (decisions).

| Field                                                                                                  | Renders on                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| releases: `summary`, `customer_value`, `included_work`, `notable_risks`                                | project Timeline card                                                                                                                                        |
| incidents: `summary`, `impact`, `detection`, `root_cause`, `fix`, `followup_actions`, `blameless_note` | project Timeline card                                                                                                                                        |
| research: `summary`, `insights`                                                                        | project Timeline card                                                                                                                                        |
| decisions: `context`, `decision`, `rationale`, `consequences`                                          | project Decisions section                                                                                                                                    |
| milestones: `summary`, `theme`, `status`, `confidence`                                                 | project Roadmap kanban (`/roadmap` rows show title, status, confidence)                                                                                      |
| projects: `summary`                                                                                    | project hero and the `/projects` card                                                                                                                        |
| projects: `languages`, `skills`                                                                        | project cards (home and `/projects`); `skills` also leads the Groove overview's Model work section                                                           |
| titles, status, severity, dates                                                                        | Timeline rows and aggregate page rows                                                                                                                        |
| not rendered                                                                                           | record bodies, `options_considered`, incident `response`, release `version_or_label` and `followups`, research `questions`, `implications`, `evidence_links` |

The sanitized git activity is read by [`src/lib/signals.ts`](../src/lib/signals.ts).
