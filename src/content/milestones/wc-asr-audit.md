---
title: Audit the transcription stage with live speech
product: windchime
horizon: next
status: planned
target: Next
theme: Research
confidence: medium
summary: >-
  The retrieval audit runs on synthetic text prompts, which bypasses ASR entirely.
  In the room, recognition variation interacts with accent and dialect before the
  embedding stage ever sees a word, so the next audit pass feeds live spoken input
  through faster-whisper and measures how transcription shifts what each visitor
  can reach.
order: 5
---
