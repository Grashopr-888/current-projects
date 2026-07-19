---
title: 'Audio safety: limiter, clamps, and a watchdog'
product: windchime
version_or_label: soundstate-feedback-v1
date: 2026-07-03
status: shipped
summary: >-
  A three-layer defence against audio runaway: an always-on master limiter, apply-time
  safety clamps on every voice, and a 1 Hz watchdog that rescues the engine in place.
customer_value: >-
  The installation can no longer roar or go silent. Speakers are protected and the
  sound recovers itself without a page refresh or a new visitor gesture.
included_work:
  - Master limiter chain (compressor into a NaN-proof ceiling)
  - Per-voice ring-out bounds and effect/gain literal caps
  - Audio watchdog with soft and deep in-place rescue
  - '"Wild mode": the runaway texture preserved as an opt-in, speakers still protected'
notable_risks:
  - The audio path itself is not yet covered by the long-duration soak harness
followups:
  - Soak the audio path and watchdog specifically over 6 to 8 hours
linked_incidents:
  - wc-audio-runaway
tags: [audio, reliability, safety]
---

Shipped directly in response to the audio-runaway incident. The fix was deliberately
layered so that no single failure (a poisoned value, a stuck clock, prolonged silence)
can take the sound down.
