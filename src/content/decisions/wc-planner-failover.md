---
title: Three tier failover for the code planner
product: windchime
date: 2026-05-16
status: accepted
context: >-
  One hosted model is a single point of failure that could strand a visitor midturn.
options_considered:
  - option: Hosted model only
    tradeoffs: >-
      Best planning quality, but a network or API outage stops the piece entirely.
  - option: Local model only
    tradeoffs: >-
      No network dependency, but weaker planning and still a single point of failure
      if the local model misbehaves.
  - option: Hosted model, then a local model, then a deterministic in-code fill
    tradeoffs: >-
      More paths to maintain, but the piece can always produce a valid plan.
decision: >-
  Hosted LLM with prompt caching, then a local model in JSON mode, then a deterministic
  template; every plan validated before compiling.
rationale: >-
  More local tiers still answer offline, and none can skip validation.
consequences: >-
  It survives outages and logs each turn's tier; an operator selector exposes the chain.
tags: [architecture, reliability, planner]
---

The failover chain is a reliability decision dressed as an LLM detail. What it buys
is a piece that never goes silent because a remote service did, and a guarantee that
every tier still passes through the same validation gate.
