---
title: 'Audio safety: limiter, clamps and a watchdog'
product: windchime
version_or_label: soundstate-feedback-v1
date: 2026-07-03
status: shipped
summary: >-
  Three layers; a 1 Hz watchdog.
customer_value: >-
  Speakers stay safe; the sound recovers itself.
included_work:
  - Compressor into NaN proof ceiling
  - Voice ring out bounds
  - Effect and gain caps
  - Soft and deep watchdog rescue
  - Optional wild mode texture
notable_risks:
  - The soak harness skips the audio path
followups:
  - Soak the audio path and watchdog specifically over 6 to 8 hours
linked_incidents:
  - wc-audio-runaway
tags: [audio, reliability, safety]
---

Shipped directly in response to the audio-runaway incident. The fix was deliberately
layered so that no single failure (a poisoned value, a stuck clock, prolonged silence)
can take the sound down.
