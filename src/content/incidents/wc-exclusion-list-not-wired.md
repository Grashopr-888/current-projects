---
title: The stem exclusion list was never wired up
product: windchime
date: 2026-08-04
severity: sev2
status: open
summary: >-
  Editing the list changed nothing.
impact: >-
  Corpus judgements that assumed exclusions used the unfiltered library.
detection: >-
  A call site search during the corpus audit.
response: >-
  Tracked the list into version control so its intended contents are recorded, and
  filed the wiring as open work rather than quietly patching it during an audit.
root_cause: >-
  Unit tested in isolation and never called; passing tests is why nothing flagged them.
fix: >-
  Not yet fixed; wiring it into selection is scheduled.
followup_actions:
  - action: Wire in, verify with a real generation
    status: open
blameless_note: >-
  A test proves a function works, never that anything calls it.
tags: [corpus, retrieval, process]
---
