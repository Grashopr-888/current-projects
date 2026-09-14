---
title: 'Venue hardening: offline, guarded devices, public safe text'
product: windchime
version_or_label: venue-hardening
date: 2026-08-05
status: shipped
summary: >-
  For a hostile venue.
customer_value: >-
  Offline, on chosen devices, never showing visitor phrasing.
included_work:
  - Vendored runtime
  - Offline default, supervised guard
  - Guard holds chosen input and output
  - Wedged mic detection, clean exit
  - Word boundary text filter
  - Runbook with no internet path
  - Frequency to loudness audit
notable_risks:
  - Device identifiers can shift on reenumeration
tags: [install, reliability, safety]
---

The text filter's real target was not the live screen but the attract board, which
replays earlier prompts to an empty room. Word boundaries are mandatory there: a
filter that matches inside words censors ordinary language and looks broken.
