---
title: Loaded fine, averaged 6.8%, peaked at 1302%
product: hrnsxtn
date: 2026-08-22
severity: sev2
summary: >-
  At the hackathon, the team's plugin cross-compiled, loaded on the Elk Stomp, and
  showed all thirteen parameters live — then overloaded the 1.333 ms audio deadline
  the moment its DSP engaged. The demo plan changed to desktop for the weekend.
impact: >-
  No on-device demo at the event itself. The board's own telemetry told the story:
  average load 6.8% of the callback budget, peak 1302% — roughly 13× over.
detection: >-
  Audible glitching under load; confirmed after the event from the engine's timing
  statistics file recovered off the board, which records average, minimum, and peak
  per processor.
response: >-
  During the event the team optimized (shared analysis across voices, a 1.85×
  reduction), then staggered work across callbacks to reach ~53% of budget — but
  one analysis pass alone still ran 2–3× over, and the honest call was to demo on
  desktop. Afterwards, the failure was written up from telemetry rather than
  memory, with a ranked hypothesis table built before the evidence arrived.
root_cause: >-
  Frame-based DSP designed around 512-sample hops concentrates its work into one
  64-sample callback in every eight. A plugin can be comfortable on average and
  catastrophically late at its peak — and the deadline is per-callback peak, not
  average.
fix: >-
  Two fixes, one per instrument. The team replaced the spectral pitch shifter with
  time-domain PSOLA (~50× cheaper per voice, and it follows the player's intonation),
  landing five voices at 0.59× of the deadline with headroom. For this instrument,
  the rule became architecture: analysis lives on a worker at 10.7 Hz, the audio
  thread only mixes, and an allocation guard traps violations in debug builds.
followup_actions:
  - action: Fold "peak, not average" into the real-time review checklist, with per-callback timing as the gate
    status: done
  - action: Verify no involuntary mode switches on the pedal under the async worker (board session)
    status: open
status: resolved
blameless_note: >-
  Nothing here was carelessness — desktop plugin conventions simply assume block
  sizes this platform does not offer. The measurement that explains the failure is
  also the one worth keeping: it became a design rule, a review gate, and a slide
  in the public talk.
tags: [real-time, embedded, postmortem]
---

The recovered telemetry (average / minimum / peak per processor, 100% = 1333 µs) is the
project's most-quoted exhibit — proof that on hard-real-time hardware, averages flatter
and peaks decide.
