---
title: Consolidate three forks onto the newest tree, and restore the dropped rigor
product: lichtspiel
date: 2026-06-11
status: accepted
context: >-
  Collaboration had forked the project into three lines: the team's pre-AI base, a
  rigorous solo generator with real validation and curation, and a newer tree with a
  much better UX and a new generative pipeline, but whose validation had been stubbed out.
options_considered:
  - option: Ship the newest tree as-is (best UX)
    tradeoffs: Fastest; silently loses the validation and curation that keep generation safe
  - option: Ship the rigorous fork (best safety)
    tradeoffs: Safe; throws away the superior UX and the new pipeline
  - option: Base on the newest tree, restore the dropped rigor commit by commit
    tradeoffs: Most work; keeps the best of both and leaves an auditable trail
decision: >-
  Base the consolidation on the newest tree and restore the validation and curation from
  the rigorous fork, each restoration as its own reviewable commit.
rationale: >-
  The best UX and the best safety came from different forks. Merging judgment, not just
  code, was the only way to keep both, and doing it in discrete commits kept it auditable.
consequences: >-
  A single coherent build across 43 commits in four days. It immediately surfaced a
  regression (stubbed validation gates), which was then fixed. See the linked incident.
tags: [process, judgment, consolidation]
---

The consolidation is the clearest evidence of product judgment in either project: three
diverging lines, a decision about which qualities to keep, and a disciplined, reviewable
path to one build.
