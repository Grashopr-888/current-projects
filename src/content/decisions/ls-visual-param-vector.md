---
title: The VisualParamVector shared control contract
product: lichtspiel
date: 2026-05-30
status: accepted
context: >-
  Many layers (Max, the bridge, the monome mapping, keyboard input, and every visual scene)
  needed a common language for control. Without a fixed contract, each new input source or
  scene would invent its own parameter shape and the layers would drift apart.
options_considered:
  - option: Let each scene define its own parameter set
    tradeoffs: Maximum expressive freedom per scene; no interchangeable inputs, constant glue code
  - option: A fixed vector of sixteen normalized parameters plus a scene id
    tradeoffs: A shared surface every layer speaks; scenes must map their intent onto it
decision: >-
  Adopt a single VisualParamVector of sixteen normalized parameters plus a scene id as the
  one control surface every template understands, defined in the shared schemas package.
rationale: >-
  A narrow, stable contract lets any input source (hardware, keyboard, generation, or
  automation) drive any scene interchangeably. Normalizing to a fixed range keeps smoothing,
  mapping, and generation simple across the whole system.
consequences: >-
  Inputs and scenes became interchangeable, and generated scenes were constrained to the same
  sixteen keys with no new fields. The ceiling is sixteen parameters, which is a deliberate
  trade of raw expressivity for a dependable shared interface.
tags: [contract, schemas, architecture, parameters]
---

The parameter vector is the quiet spine of the system. Fixing it early is what let hardware, keyboard, and later code generation all drive the same scenes without bespoke adapters.
