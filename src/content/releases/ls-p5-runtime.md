---
title: The p5 visual runtime (browser-only engine)
product: lichtspiel
version_or_label: phase-1-p5-runtime
date: 2026-05-30
status: shipped
summary: >-
  A standalone p5.js visual engine that renders scenes in the browser with no Ableton,
  no bridge, and no model service required.
customer_value: >-
  The performer can open a page and immediately see and play visuals, so the system is
  usable and demonstrable even when nothing else in the stack is running.
included_work:
  - Template registry, message bus, and smoothed parameter interpolation
  - Seeded RNG so any visual is reproducible from a seed
  - Keyboard fallback for scene switching, distance, mutation, and lock
  - Five initial scenes ported from the Processing corpus, verified at 60 fps
  - A diagnostics panel (frame rate, active template, live parameter readout)
notable_risks:
  - A template that throws mid-frame must not kill the host loop
followups:
  - Add a screenshot and frame-rate smoke test to replace the structural smoke
tags: [runtime, p5, rendering, browser-only]
---

The p5 runtime is the heart of the demo and the one layer that always runs. Because it degrades to browser-only, every later capability (bridge, Ableton, monome, generation) arrived as an enhancement rather than a dependency.
