---
title: Monome integration with capability-adaptive folding
product: lichtspiel
version_or_label: phase-4-monome
date: 2026-05-31
status: shipped
summary: >-
  Grid and arc control of the visuals over serialosc, with the surface detecting which
  device is connected and adapting between a Grid 64 or 128 and an Arc 2 or 4.
customer_value: >-
  A performer plays the visuals on whatever monome hardware they own, and the LEDs mirror
  the performance so the controller reads as an instrument, not a remote.
included_work:
  - A pure-Node serialosc layer with device discovery and hot-plug recovery
  - A capability matrix per device (cells, quads, varibright, tilt, encoders, push)
  - Profile-aware column-fader mapping that adapts to grid width and encoder count
  - A digital-twin dashboard that mirrors LEDs and runs diagnostic sweeps
  - Rate-limiting so a fast encoder spin cannot flood or freeze the browser
notable_risks:
  - Self-healing recovery restarts the daemon, which briefly blips every attached device
followups:
  - Grid 128 and Arc 4 hot-swap still to be eyeballed on hardware at this stage
tags: [monome, hardware, serialosc, adaptation]
---

Hardware-verified on the real Grid 64 and Arc 2, this is where the controller became central to the concept. The capability matrix meant one codebase could drive four different device classes instead of hard-coding a single layout.
