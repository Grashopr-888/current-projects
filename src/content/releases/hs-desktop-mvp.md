---
title: The instrument runs under Elk's engine
product: hrnsxtn
version_or_label: desktop-mvp
date: 2026-08-25
status: shipped
summary: >-
  End to end on desktop, under the same engine the pedal runs: live input → student
  embedding → grain match over a 12,018 grain corpus → the answer, one bar late.
customer_value: >-
  The whole instrument is testable and audible before a single cross compile; configs and
  knob mappings transfer to hardware unchanged.
included_work:
  - 'Corpus pipeline: recordings → one pack file (18.6 min in 18 s, 84× real time)'
  - 'Golden parity: 200/200 identical grain selections vs the Python reference'
  - 'Async worker under the host: p99 cadence <99 ms, zero drops; audio thread 0.09%'
  - Ten knob mapped parameters; bar clock on the plugin's own sample counter
notable_risks:
  - A7 budgets are projected until the board benchmarks run
followups:
  - Cross-compile and first sound on the pedal
linked_incidents: [hs-deadline-overload]
linked_decisions: [hs-move-the-decisions, hs-grain-playback-over-decoder]
tags: [milestone, embedded, granular]
---

The parity harness caught a real divergence (a continuity bonus the reference grants
grain 0 at a bar's first slot) — and the reference won. Compatibility beats local
reasonableness when the reference defines the sound.
