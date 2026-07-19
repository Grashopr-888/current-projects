---
title: Make the audio-language model an exchangeable variable
product: windchime
date: 2026-06-28
status: accepted
context: >-
  Windchime retrieves sound by matching a voice to audio embeddings. Which
  audio-language model does the matching is a research question in its own right,
  but the installation around it must stay identical to compare fairly.
options_considered:
  - option: Hard-code one audio-language model
    tradeoffs: Simplest; makes the model impossible to study as a variable
  - option: Abstract retrieval behind one interface + a model-independent corpus DB
    tradeoffs: More upfront design; turns "which model" into a controlled experiment
decision: >-
  Route every audio-language model through a single embedding-backend interface and
  a model-independent corpus database, with audio embedded offline once per
  configuration. Heavy models sit behind a lightweight text-only sidecar. The
  backend hot-swaps at runtime with a liveness probe and auto-revert.
rationale: >-
  Holding the whole installation constant and varying only the model is the only
  way to attribute a difference to the model rather than the plumbing.
consequences: >-
  Six deployable configurations became possible, and the same seam powers an offline
  audit harness. It also imposed discipline: nothing about the corpus format may leak
  a model's assumptions.
tags: [architecture, research, retrieval]
---

Turning "which model" into a config toggle is what made the research tractable, and
it kept the installation shippable while the science continued underneath it.
