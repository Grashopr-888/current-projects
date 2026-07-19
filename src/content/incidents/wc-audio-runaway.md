---
title: 'Audio runaway: the installation got louder, then went silent'
product: windchime
date: 2026-07-03
severity: sev2
status: resolved
summary: >-
  During testing the sound occasionally built up "like a feedback loop," then quit
  entirely, recoverable only by a hard page refresh. It was not feedback but
  unbounded voice accumulation.
impact: >-
  In a gallery this would mean a jarring loud build-up followed by dead speakers until
  someone reloaded the page, unacceptable for an unattended piece.
detection: >-
  Caught in extended manual testing before exhibition, then reproduced deterministically
  by replaying the exact sequence of generated patterns.
response: >-
  Reproduced under instrumentation, measured the voice count and output peak over time,
  and traced the mechanism rather than treating the symptom.
root_cause: >-
  Full-length multi-minute stems were retriggered every pattern cycle with no duration
  bound. Voices stacked to roughly 870 simultaneous source nodes after about 18 minutes;
  the audio render clock degraded to a few percent of real time while the context still
  reported "running," so output effectively died. Peaks reached about 2.8× full scale.
  The "roar" was hard clipping.
fix: >-
  A three-layer defence, shipped as the audio-safety release: an always-on master limiter
  (a NaN-proof ceiling), apply-time clamps bounding each voice's ring-out, and a 1 Hz
  watchdog that rescues the engine in place on NaN, clock collapse, or prolonged silence.
followup_actions:
  - action: Verify by replaying the exact incident post-fix
    status: done
  - action: Preserve the runaway texture as an opt-in "wild mode" (speakers still protected)
    status: done
  - action: Extend the long-duration soak harness to the audio path itself
    status: open
blameless_note: >-
  The bug was a reasonable default (play the whole stem) meeting an unreasonable rate
  (every cycle). The lesson is about bounding resources under repetition, not about blame.
linked_release: wc-audio-safety
tags: [audio, reliability, postmortem]
---

**Verification.** Replaying the same plans after the fix capped live voices at about 12
(down from 872) and the master peak at about 0.36 (down from 2.8). An injected-NaN test
confirmed the watchdog restores sound with no refresh and no new user gesture.

The most product-minded part of the resolution: the runaway texture was genuinely
interesting, so rather than delete it, it was preserved as a deliberate, speaker-safe
"wild mode", and the pre-fix behaviour was tagged in git so it can be studied bit-for-bit.
