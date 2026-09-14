---
title: 'Audio runaway: louder, then silent'
product: windchime
date: 2026-07-03
severity: sev2
status: resolved
summary: >-
  Not feedback: unbounded voice accumulation.
impact: >-
  A loud buildup, then dead speakers until a reload.
detection: >-
  Manual testing, then deterministic replay.
response: >-
  Reproduced under instrumentation, measured the voice count and output peak over time,
  and traced the mechanism rather than treating the symptom.
root_cause: >-
  Multiminute stems retriggered every cycle: about 870 source nodes by 18 minutes, and a render
  clock at a few percent of real time yet "running". The roar was hard clipping.
fix: >-
  NaN proof master limiter, ring out clamps, and a 1 Hz watchdog that rescues NaN, clock
  collapse or silence.
followup_actions:
  - action: Replay after the fix
    status: done
  - action: Optional wild mode keeps the texture
    status: done
  - action: Soak the audio path
    status: open
blameless_note: >-
  A reasonable default met an unreasonable rate: bound resources under repetition.
linked_release: wc-audio-safety
tags: [audio, reliability, postmortem]
---

**Verification.** Replaying the same plans after the fix capped live voices at about 12
(down from 872) and the master peak at about 0.36 (down from 2.8). An injected-NaN test
confirmed the watchdog restores sound with no refresh and no new user gesture.

The most product-minded part of the resolution: the runaway texture was genuinely
interesting, so rather than delete it, it was preserved as a deliberate, speaker-safe
"wild mode", and the pre-fix behaviour was tagged in git so it can be studied bit-for-bit.
