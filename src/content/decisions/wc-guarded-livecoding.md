---
title: 'A schema guard: the model never emits raw code'
product: windchime
date: 2026-05-16
status: accepted
context: >-
  Generated audio code near live speakers: one bad output plays noise or silence.
options_considered:
  - option: Model emits Strudel/audio code directly
    tradeoffs: Most flexible; unbounded and unsafe; hard to validate before it plays
  - option: Model fills a validated JSON schema; a compiler renders code
    tradeoffs: Slightly less expressive; every output is inspectable and safe by construction
  - option: No model (fully deterministic templates only)
    tradeoffs: Perfectly safe; loses the responsiveness that makes the piece feel alive
decision: >-
  The model fills a validated schema from curated template families; a compiler renders it, so
  raw code never plays.
rationale: >-
  Unattended, inspectable safety beats expressiveness: a schema is a contract.
consequences: >-
  Bounded, reviewable output that enabled three tier failover, at the cost of hand authored
  template families.
tags: [safety, architecture, llm]
---

This is the decision the rest of Windchime's reliability rests on. Because the model
can only fill a schema, the system can validate, fall back, and reason about output
without ever trusting generated code.
