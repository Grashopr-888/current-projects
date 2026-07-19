---
title: Three-tier failover for the code planner
product: windchime
date: 2026-05-16
status: accepted
context: >-
  The planner turns a voice into a chosen template family and its parameters using a
  language model. In an unattended installation a single hosted model is a single
  point of failure, and a dropped network must never strand a visitor mid-turn.
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
  The planner tries a hosted model first with prompt caching, falls back to a local
  model in JSON mode, and finally to a deterministic in-code template fill. Every
  output is validated before a compiler renders it.
rationale: >-
  Degrading through progressively more local options keeps the installation
  responsive and always able to answer, even fully offline. The validate-then-compile
  boundary means no tier can emit unapproved output, whichever one produced the plan.
consequences: >-
  The piece keeps running through a network outage, and each run records which tier
  planned it. A later operator selector exposed the same chain in the UI, so a dead
  host degrades to the next tier instead of stranding a visitor.
tags: [architecture, reliability, planner]
---

The failover chain is a reliability decision dressed as an LLM detail. What it buys
is a piece that never goes silent because a remote service did, and a guarantee that
every tier still passes through the same validation gate.
