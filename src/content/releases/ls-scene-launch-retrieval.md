---
title: Scene-launch and locator auto-retrieval, live in Ableton
product: lichtspiel
version_or_label: phase-5a-auto-retrieval
date: 2026-06-04
status: shipped
summary: >-
  The first on-the-fly audiovisual trigger: launching a Session scene or crossing an
  Arrangement locator auto-loads a fresh, immediately playable visual variant.
customer_value: >-
  Visuals hot-swap per song section as the set plays, so the imagery follows the
  arrangement on its own while the performer keeps playing music.
included_work:
  - Max outlets emitting scene-launch and locator-crossing events, forward-only with a seek guard
  - Bridge decoding of both events into wire messages broadcast to the runtime
  - Runtime template picking that respects the on-screen lock, with mapped or random modes
  - A live and simulated event-source toggle so the flow demos without Ableton
notable_risks:
  - On a heavy 24-track set, detection can lag one to two seconds and Live can get sluggish
followups:
  - Planned move to event-driven Live API observers instead of per-tick polling
tags: [ableton, retrieval, live, triggers]
---

This closed the core loop the whole project was aiming at: the music drives the image without manual intervention. It was verified end-to-end in a real Ableton set, with a known performance refinement (polling latency on large sets) logged as the next target.
