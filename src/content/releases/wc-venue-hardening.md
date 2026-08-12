---
title: 'Venue hardening: offline by default, guarded devices, public-safe text'
product: windchime
version_or_label: venue-hardening
date: 2026-08-05
status: shipped
summary: >-
  Assumes a hostile venue: a vendored offline runtime, a device guard, and profanity kept off
  public screens.
customer_value: >-
  The installation opens in a room with no usable network, keeps the sound on the
  devices the operator chose, and never puts a visitor's unfortunate phrasing on a
  wall in front of the next visitor.
included_work:
  - Live-coding runtime vendored so the venue needs no internet
  - Offline made the default-safe case in the launcher, with the guard supervised
  - Device guard holds the chosen input and output, detects a wedged microphone, exits cleanly
  - Word-boundary text filter on the public-facing screens
  - Venue startup runbook, including the no-internet path
  - Corpus audit joining retrieval frequency to measured loudness
notable_risks:
  - The guard latches a device identifier, and identifiers can shift when hardware is re-enumerated
tags: [install, reliability, safety]
---

The text filter's real target was not the live screen but the attract board, which
replays earlier prompts to an empty room. Word boundaries are mandatory there: a
filter that matches inside words censors ordinary language and looks broken.
