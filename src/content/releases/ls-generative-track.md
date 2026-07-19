---
title: 'Constrained p5 code generation: Sync, Dream, Fuse'
product: lichtspiel
version_or_label: generative-track
date: 2026-06-14
status: shipped
summary: >-
  Three authoring modes that turn the live set into new visual scenes: Sync (the audio's
  "vibe" becomes a scene), Dream (a text prompt becomes a scene), and Fuse.
customer_value: >-
  A performer can conjure a fresh, playable visual scene conditioned on what they're
  actually playing, without writing code and without risking a broken scene on stage.
included_work:
  - Audio "vibe" extraction (CLAP + librosa features) feeding generation
  - Text-prompt generation conditioned on the live set
  - Five-gate validation chain with a bounded self-repair loop
  - Keep / Promote curation tiers for generated scenes
notable_risks:
  - The playability gate checks that controls exist, not that they cover the surface
followups:
  - Extend the gate to require full grid and encoder coverage
linked_incidents:
  - ls-grid-coverage
tags: [generation, authoring, validation]
---

The generative track is what makes Lichtspiel feel alive to author, but it only shipped
because generation is fenced by validation and curation, never trusted by default.
