---
title: Audio stayed suspended between trials
product: windchime
date: 2026-05-24
severity: sev2
status: resolved
summary: >-
  Silence after the first stop.
impact: >-
  Blocked the first participant trials, with no error.
detection: >-
  Same day runs: transcript and visuals moved in a silent room.
response: >-
  Reproduced the suspend/resume cycle, confirmed the browser's autoplay policy
  was rejecting the gesture-less resume, and reworked the lifecycle the same day.
root_cause: >-
  Each stop suspended the AudioContext, resumed from an SSE handler without a user gesture; a
  cross origin unlock gap compounded it.
fix: >-
  The context now runs all session, the engine loads eagerly, and an unlock banner verifies the
  resume.
blameless_note: >-
  Autoplay policy is part of the runtime contract; the durable fix needs no resume.
tags: [audio, browser, lifecycle]
---
