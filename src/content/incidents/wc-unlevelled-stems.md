---
title: Nearly a quarter of the corpus plays unlevelled
product: windchime
date: 2026-08-05
severity: sev2
status: open
summary: >-
  93 of 406 stems lack a usable loudness measurement.
impact: >-
  Too loud or too quiet, heard as bad mixing, not bad data.
detection: >-
  A full corpus audit, stem by stem.
response: >-
  Documented the finding with its scope, and kept it out of the medians so the rest
  of the audit was not skewed by treating missing measurements as zeros.
root_cause: >-
  A fixed window near each file's start misses later audio, which gets a neutral correction.
fix: >-
  Not yet fixed: prefer the existing full file measurement when the window finds nothing.
followup_actions:
  - action: Fall back to the full file measurement
    status: open
blameless_note: >-
  The embedding side already fixed this bug class; the lesson did not travel.
tags: [corpus, audio, audit]
---
