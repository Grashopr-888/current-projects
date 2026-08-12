---
title: Nearly a quarter of the corpus plays with no level correction
product: windchime
date: 2026-08-05
severity: sev2
status: open
summary: >-
  93 of 406 stems carry no usable loudness measurement, so they play at raw level.
impact: >-
  Unpredictable balance. An unmeasured stem can arrive far louder or far quieter than
  everything layered with it, which is heard as the piece being badly mixed rather
  than as a data problem.
detection: >-
  A corpus audit that joined retrieval frequency to measured loudness for every stem,
  rather than sampling the ones that sounded wrong.
response: >-
  Documented the finding with its scope, and kept it out of the medians so the rest
  of the audit was not skewed by treating missing measurements as zeros.
root_cause: >-
  The loudness scan measures a fixed window near the start of each file. Stems whose
  audio begins later than that window measure as having no audio, so they receive a
  neutral correction instead of a real one.
fix: >-
  Not yet fixed. The correct measurement already exists for these stems from a
  full-file pass, so the repair is to prefer that value when the windowed scan finds
  nothing.
followup_actions:
  - action: Fall back to the full-file measurement wherever the windowed scan found no audio
    status: open
blameless_note: >-
  This is the same bug class already fixed on the embedding side, where a fixed
  window sampled silence and the repair was to find the window where the audio
  actually plays. The lesson did not travel from one pipeline to the other.
tags: [corpus, audio, audit]
---
