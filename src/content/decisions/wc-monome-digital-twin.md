---
title: Mirror the monome hardware with an on-screen digital twin
product: windchime
date: 2026-05-22
status: accepted
context: >-
  The visuals branch drives monome Grid and Arc LEDs over a hardware bridge.
  Developing, testing, and operating the piece cannot depend on the physical
  controllers always being attached and correctly seated.
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
  The app renders a virtual monome whose LED state is byte-identical to the frame sent
  to the physical device, and it records or replays input traces so gestures can be
  exercised with no hardware present.
rationale: >-
  A faithful twin lets sketches be built and regression-tested with no device attached,
  gives operators a live view of device state, and keeps on-screen and on-hardware
  behaviour provably in sync rather than merely similar.
consequences: >-
  Visual and behaviour regression can run headless in CI, and the twin doubles as the
  verification surface when hardware is unavailable. It later became part of the
  onboarding tour, where a visitor watches the twins light up.
tags: [hardware, monome, tooling]
---

Insisting the on-screen mirror be byte-identical, not just illustrative, is what
lets it stand in for the hardware during development and testing. A twin you can
trust is a twin you can regress against.
