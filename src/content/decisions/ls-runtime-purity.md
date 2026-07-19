---
title: 'Runtime purity: no model or network calls on the performance path'
product: lichtspiel
date: 2026-06-08
status: accepted
context: >-
  Lichtspiel generates visuals with a language model, but it is played live on stage.
  A model call mid-performance means unpredictable latency and a hard dependency on a
  network that hackathon venues rarely provide reliably.
options_considered:
  - option: Call the model live to react to the performance
    tradeoffs: Most responsive on paper; unpredictable latency; fails without a network
  - option: All generation at authoring time; runtime plays only validated artifacts
    tradeoffs: Requires a curation step; runtime is deterministic, fast, and offline-safe
decision: >-
  Draw a hard line: the performance runtime never calls a model or the network. Every
  generative step happens at authoring time and produces a validated artifact the
  runtime can play deterministically.
rationale: >-
  On stage, predictability beats cleverness. A visual that renders every frame with no
  external dependency is worth more than one that occasionally stutters waiting on a model.
consequences: >-
  The runtime degrades gracefully to browser-only with no Ableton, bridge, or model
  service. It also forced a clean split between an authoring pipeline and a play pipeline,
  which made validation and curation natural rather than bolted-on.
tags: [architecture, performance, reliability]
---

"Runtime purity" is the constraint that most shaped Lichtspiel. It is the reason the
instrument is dependable enough to play live, and the reason the AI complexity all lives
safely behind the stage rather than on it.
