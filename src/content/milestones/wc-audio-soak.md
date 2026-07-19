---
title: Soak the audio path and watchdog
product: windchime
horizon: next
status: planned
target: Next
theme: Reliability
confidence: medium
summary: >-
  Extend the synthetic-visitor soak harness to exercise the live audio path and
  the watchdog under load: real Strudel playback, stop-and-replace cycles between
  visitors, and forced engine faults that the watchdog must rescue in place. The
  6-hour visitor-lifecycle soak deliberately excluded audio; this closes the top
  remaining reliability gap.
order: 3
---
