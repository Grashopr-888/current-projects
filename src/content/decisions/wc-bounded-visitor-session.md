---
title: A bounded turn per visitor, not an endless loop
product: windchime
date: 2026-07-05
status: accepted
context: >-
  Unattended, the piece must orient a stranger in seconds; free play never ends or resets.
options_considered:
  - option: Endless free-play loop
    tradeoffs: >-
      Simplest to build, but there is no natural handoff, one visitor can camp
      indefinitely, and the piece never resets its state or volume for the next person.
  - option: Fixed wall-clock timer per visitor
    tradeoffs: >-
      Predictable length, but it can cut someone off mid-thought or leave dead time
      when they finish early.
  - option: A bounded, staged turn with a set number of spoken prompts, a recap, and an automatic reset
    tradeoffs: >-
      More states to build and test, but it gives a clear arc and a clean handoff
      back to a resting state.
decision: >-
  A staged turn: explicit start, a set number of spoken prompts, a recap, then automatic reset.
rationale: >-
  An arc visitors feel, a clean next start, a testable lifecycle.
consequences: >-
  Install mode's spine and the soak's target: four states to harden (attract, onboarding, live,
  recap).
tags: [installation, lifecycle, ux]
---

Treating a visit as a bounded turn rather than a loop is what made the piece
exhibitable without an operator. The bounded prompt count and the recap are not just
pacing, they are the mechanism that resets the piece for the next stranger.
