---
title: Audio silently stayed suspended between trials
product: windchime
date: 2026-05-24
severity: sev2
status: resolved
summary: >-
  Audio went silent between participant trials and never came back: the
  AudioContext was suspended on every stop cycle and the resume ran from a server
  event with no user gesture, so the browser silently refused it.
impact: >-
  Trial-blocking during the first participant tests. Every session after the
  first stop played nothing, with no error anywhere.
detection: >-
  Manual participant runs the same day; the transcript and visuals advanced while
  the room stayed silent.
response: >-
  Reproduced the suspend/resume cycle, confirmed the browser's autoplay policy
  was rejecting the gesture-less resume, and reworked the lifecycle the same day.
root_cause: >-
  Each stop-and-replace cycle suspended and resumed the AudioContext, and the
  resume was issued from an SSE handler where no user gesture exists, so the
  context stayed suspended; a cross-origin unlock gap compounded it.
fix: >-
  Removed the suspend/resume cycle entirely so the context stays running for the
  whole session, eagerly loaded the audio engine, and added a prominent unlock
  banner that verifies the resume actually took effect.
blameless_note: >-
  Browser autoplay policy is part of the runtime contract. Any audio lifecycle
  design that requires a resume must prove it holds a user gesture at that
  moment, and the fix that survives is the one that stops needing the resume.
tags: [audio, browser, lifecycle]
---
