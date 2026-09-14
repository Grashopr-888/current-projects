---
title: Make the ALM an exchangeable variable
product: windchime
date: 2026-06-28
status: accepted
context: >-
  Which ALM matches best is a research question; a fair comparison needs an identical
  installation.
options_considered:
  - option: Hard-code one audio-language model
    tradeoffs: Simplest; makes the model impossible to study as a variable
  - option: Abstract retrieval behind one interface + a model-independent corpus DB
    tradeoffs: More upfront design; turns "which model" into a controlled experiment
decision: >-
  One embedding backend interface over a model independent corpus database; audio embedded
  offline per configuration; heavy models in a text only sidecar.
rationale: >-
  Only a constant installation lets a difference be attributed to the model, not the plumbing.
consequences: >-
  Six deployable ALM configurations and an offline audit harness; the corpus format stays
  model neutral.
tags: [architecture, research, retrieval]
---

Turning "which model" into a config toggle is what made the research tractable, and
it kept the installation shippable while the science continued underneath it.
