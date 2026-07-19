---
title: Capability-adaptive monome mapping
product: lichtspiel
date: 2026-06-01
status: accepted
context: >-
  The performer owns two classes of monome hardware (a Grid 64 with an Arc 2 and a Grid
  128 with an Arc 4) that differ in size and capabilities. Sketches were authored against
  specific hardware, and hard-coding any one layout would strand the others.
options_considered:
  - option: Author each sketch for one fixed device size
    tradeoffs: Simplest to write; strands the other hardware and needs per-device forks
  - option: Port each sketch twice, once per device class
    tradeoffs: Full fidelity on both; doubles the work and drifts out of sync over time
  - option: A logical idiom layer that folds down and extends up automatically
    tradeoffs: One port per sketch; requires an abstraction, but every sketch inherits it
decision: >-
  A sketch declares its control intent as logical idioms. The idiom layer maps that intent
  one-to-one when the hardware matches, folds (couples or pages) controls onto smaller
  hardware so nothing becomes unreachable, and lights bonus controls on larger hardware.
rationale: >-
  Adaptation belongs in one shared layer, not in every sketch. Coupling keeps every logical
  control reachable on a smaller device, which matters more for playability than a perfect
  one-to-one layout.
consequences: >-
  New sketches get hardware adaptation for free and never carry per-device branches. The cost
  is a real abstraction to maintain, verified by a headless smoke suite that exercises both a
  small and a large profile.
tags: [monome, hardware, adaptation, architecture]
---

This decision is why Lichtspiel runs on four device classes from one codebase. It came from a play session where a smaller device left some controls unreachable, which made "never drop controllability" the guiding rule.
