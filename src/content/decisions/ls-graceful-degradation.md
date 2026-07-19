---
title: Graceful degradation to a browser-only runtime
product: lichtspiel
date: 2026-05-30
status: accepted
context: >-
  A live audiovisual system stacks several fragile dependencies (Ableton, a Max device, a
  Node bridge, a Python service, and monome hardware). Any of them can be missing or drop
  mid-show, and a hard dependency on all of them would make the instrument undemonstrable.
options_considered:
  - option: Require the full stack to be present for the runtime to start
    tradeoffs: Simplest assumptions; a single missing piece takes the whole demo down
  - option: Make each layer optional and reduce it to a safe control message
    tradeoffs: More care at each boundary; the runtime always has something safe to play
decision: >-
  The p5 runtime runs fully browser-only with no Ableton, bridge, or model service. Every
  experimental layer reduces to a safe control message (a scene id, a parameter vector, or a
  morph target). If the bridge appears the runtime auto-connects, and if it drops it reconnects.
rationale: >-
  For a live instrument, staying up is worth more than any single feature. Reducing every layer
  to the same small control vocabulary means an absent or failed layer degrades the experience
  rather than ending it.
consequences: >-
  The demo can start from nothing but a browser and gain capability as layers come online. This
  shaped the whole architecture toward optional, reconnecting layers rather than a monolith, and
  made testing each layer in isolation straightforward.
tags: [reliability, architecture, degradation, runtime]
---

Graceful degradation is the companion rule to runtime purity: purity keeps models off the stage, degradation keeps missing layers from taking the show down. Together they are why the instrument is dependable enough to actually perform on.
