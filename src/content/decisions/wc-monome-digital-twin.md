---
title: An onscreen digital twin of the monome
product: windchime
date: 2026-05-22
status: accepted
context: >-
  Work cannot depend on attached, correctly seated Grid and Arc hardware.
options_considered:
  - option: Hardware-only, with no on-screen representation
    tradeoffs: >-
      Nothing extra to build, but no way to develop or verify LED behaviour without a
      device attached, and no operator view of what the hardware is showing.
  - option: An approximate on-screen visualization
    tradeoffs: >-
      Cheap to draw, but it can drift from what the hardware actually displays, so it
      cannot be trusted for verification.
  - option: A byte-identical on-screen mirror driven by the same LED frame, with trace replay
    tradeoffs: >-
      It has to render exactly what is sent to the device, but it enables
      hardware-free development, regression, and an operator view.
decision: >-
  A virtual monome renders the byte identical LED frame sent to the device, and records or
  replays input traces.
rationale: >-
  Development and regression without hardware, a live operator view, provable sync.
consequences: >-
  Headless CI regression; the twin stands in for hardware and joined the onboarding tour.
tags: [hardware, monome, tooling]
---

Insisting the on-screen mirror be byte-identical, not just illustrative, is what
lets it stand in for the hardware during development and testing. A twin you can
trust is a twin you can regress against.
