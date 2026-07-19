---
title: 'Guard the model behind a schema: never let it emit raw code'
product: windchime
date: 2026-05-16
status: accepted
context: >-
  The installation live-codes music from a language model. Letting the model write
  executable audio code directly is fast to prototype but unaccountable and unsafe
  in a room full of speakers. A single bad generation can produce noise or silence.
options_considered:
  - option: Model emits Strudel/audio code directly
    tradeoffs: Most flexible; unbounded and unsafe; hard to validate before it plays
  - option: Model fills a validated JSON schema; a compiler renders code
    tradeoffs: Slightly less expressive; every output is inspectable and safe by construction
  - option: No model (fully deterministic templates only)
    tradeoffs: Perfectly safe; loses the responsiveness that makes the piece feel alive
decision: >-
  The model selects from curated template families and fills a validated schema. A
  validator and compiler render approved patterns; raw model code never reaches the
  audio engine.
rationale: >-
  In an unattended installation, safety and inspectability outrank raw expressiveness.
  A schema is a contract the whole system can reason about.
consequences: >-
  Every musical result is bounded and reviewable, and the same guard enabled the
  three-tier planner failover. The cost is a curation burden: the template families
  are hand-authored.
tags: [safety, architecture, llm]
---

This is the decision the rest of Windchime's reliability rests on. Because the model
can only fill a schema, the system can validate, fall back, and reason about output
without ever trusting generated code.
