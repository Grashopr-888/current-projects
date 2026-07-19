---
title: Animation corpus and the monome idiom layer
product: lichtspiel
version_or_label: phase-4.5-idioms
date: 2026-06-02
status: shipped
summary: >-
  A reusable control layer (faderBank, arcMacros, stepSequencer, cellPaint) that lets a
  scene declare its control intent once and adapt to any monome combination.
customer_value: >-
  Crafted sketches keep their hand-tuned control feel on any hardware, so the performer
  never loses reach of a control when moving between a small and a large device.
included_work:
  - Four capability-aware idioms plus a compose function, as a pure control and LED layer
  - Faithful ports of nine sketch families plus a hand-built hero scene
  - Folding so a large-hardware sketch couples down onto a smaller device, nothing dropped
  - Adapt-up so a small-hardware sketch lights bonus controls on a larger device
  - A gestural panel and variant browser, with a headless idiom smoke suite
notable_risks:
  - Closing the full round trip (folding the extended set back down) is left as future work
followups:
  - Grid 128 and Arc 4 hot-swap verification pass still outstanding
tags: [monome, idioms, corpus, adaptation, variants]
---

The idiom layer is Lichtspiel's underlying representation for control. By separating a sketch's control intent from any specific hardware, it removed the need for per-sketch, per-device branches and made every future scene inherit hardware adaptation for free.
