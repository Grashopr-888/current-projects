---
title: Give each walk-up visitor a bounded turn, not an endless loop
product: windchime
date: 2026-07-05
status: accepted
context: >-
  For an unattended gallery the piece has to orient a stranger in seconds, give them
  a satisfying turn, and hand off to the next person with no operator present. An
  open-ended free-play loop has no natural end and no reset.
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
  Each visitor gets a staged turn with an explicit start, a set number of spoken prompts, a
  closing recap, and an automatic reset back to an attract state.
rationale: >-
  A bounded turn gives a stranger a beginning, middle, and end they can feel, and the
  automatic reset guarantees the next visitor starts clean. It also makes the whole
  experience testable as a repeatable lifecycle rather than an open session.
consequences: >-
  The lifecycle became the spine of install mode and the target of the reliability
  soak. It also introduced distinct states (attract, onboarding, live, recap) that
  each needed their own robustness handling for an unattended run.
tags: [installation, lifecycle, ux]
---

Treating a visit as a bounded turn rather than a loop is what made the piece
exhibitable without an operator. The bounded prompt count and the recap are not just
pacing, they are the mechanism that resets the piece for the next stranger.
