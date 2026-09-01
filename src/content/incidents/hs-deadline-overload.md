---
title: Loaded fine, averaged 6.8%, peaked at 1302%
product: hrnsxtn
date: 2026-08-22
severity: sev2
summary: >-
  The team's plugin cross-compiled, loaded on the Elk Stomp with all parameters live —
  then overloaded the 1.333 ms audio deadline the moment its DSP engaged.
impact: >-
  No on-device demo at the event. The board's telemetry: average 6.8% of budget, peak
  1302% — roughly 13× over.
detection: >-
  Audible glitching under load; confirmed post-event from the engine's per-processor
  timing statistics recovered off the board.
response: >-
  Optimized 1.85× during the event, staggered work across callbacks to ~53% of budget —
  one analysis pass still ran 2–3× over alone, so the demo moved to desktop.
root_cause: >-
  Frame-based DSP built around 512-sample hops concentrates work into one callback in
  eight. The deadline is per-callback peak, not average.
fix: >-
  The team replaced the spectral shifter with time-domain PSOLA (~50× cheaper per voice):
  five voices at 0.59× of the deadline. This instrument made the rule architecture —
  analysis on a 10.7 Hz worker, the audio thread only mixes, an allocation guard in debug.
followup_actions:
  - action: Fold "peak, not average" into the real-time review checklist
    status: done
  - action: Verify no involuntary mode switches on the pedal (board session)
    status: open
status: resolved
blameless_note: >-
  Desktop plugin conventions assume block sizes this platform does not offer. The
  measurement became a design rule, a review gate, and a slide in the public talk.
tags: [real-time, embedded, postmortem]
---
