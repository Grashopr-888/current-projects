---
title: The instrument runs under Elk's engine
product: hrnsxtn
version_or_label: desktop-mvp
date: 2026-08-25
status: shipped
summary: >-
  End to end on desktop, under the same audio engine the pedal runs: live input →
  mel frames → distilled student → grain match over a real 12,018-grain corpus →
  the answer bar, one bar late, from real audio.
customer_value: >-
  The whole instrument is testable, tunable, and audible before a single
  cross-compile — and everything platform-facing (configs, knob mappings, the
  control glue) transfers to hardware unchanged.
included_work:
  - 'Corpus pipeline: a folder of recordings → one memory-mappable pack (18.6 min packed in 18 s, 84× real time)'
  - 'Golden parity: 200/200 identical grain selections vs the Python reference, across four penalty configurations'
  - 'Async worker under the host: 694/694 completions, cadence p50 93.3 ms / p99 <99 ms, zero drops'
  - 'Ten knob-mapped parameters; bar clock on the plugin''s own sample counter'
  - Renderable bounces (dry vs the one-bar-late answer) for listening review
notable_risks:
  - The A7 budget is still projected, not measured on the board (benchmarks are the next hardware session)
  - The student's known weak spot is onsets; drones are its best case
followups:
  - Cross-compile and first sound on the pedal
  - Blind listening verdict on the matching conditions
linked_incidents: [hs-deadline-overload]
linked_decisions: [hs-move-the-decisions, hs-grain-playback-over-decoder]
tags: [milestone, embedded, granular]
---

The parity harness earned its keep on day one: it caught a case where the "sane"
reimplementation disagreed with the reference (a continuity bonus the original grants
grain 0 on a bar's first slot, an artifact of prev = −1 arithmetic). The reference
won. Compatibility beats local reasonableness when the reference defines the sound.
