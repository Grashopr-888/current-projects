---
title: The consolidated build
product: lichtspiel
version_or_label: consolidation-v1
date: 2026-06-15
status: shipped
summary: >-
  One coherent build reconciling three forks (the newest tree's UX with the rigorous
  fork's validation and curation restored) delivered across 43 commits in four days.
customer_value: >-
  A single instrument that is both pleasant to use and safe to play live, instead of
  three partial versions each missing something the others had.
included_work:
  - Rebase onto the newest tree
  - Restore validation gates and the generated → promoted curation tier
  - Fold the restored rigor into the Python authoring pipeline
notable_risks:
  - Restoring rigor re-exposed a stubbed validation path (fixed, see incident)
followups:
  - Package the instrument as a distributable Max for Live device
linked_decisions:
  - ls-consolidation
linked_incidents:
  - ls-validation-regression
tags: [consolidation, delivery]
---

This release is a delivery story more than a feature story: it is what disciplined
consolidation of divergent work looks like when it has to happen fast and stay auditable.
