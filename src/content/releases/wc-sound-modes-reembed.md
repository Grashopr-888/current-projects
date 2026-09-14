---
title: Sound modes and a content aware reembed
product: windchime
version_or_label: sound-modes-reembed
date: 2026-07-07
status: shipped
summary: >-
  Repairs stems with a silent index window.
customer_value: >-
  Wash to tight response; phrases reach content, not silence.
included_work:
  - Retrieval and playback presets
  - Live preset toggle
  - Loudness sidecar precompute
  - Has audio flag
  - Clip gain
  - Best window
  - Compromised rows reembedded per backend
  - Append only epoch provenance
notable_risks:
  - Per clip gain not yet applied per sample
followups:
  - Apply per-sample gain once templates support per-sample rather than per-voice gain
tags: [audio, retrieval, provenance]
---

The sound modes gave the audio a set of legible characters an operator can choose
between. The re-embed fixed a quieter problem underneath: some stems had been
indexed from silence, so they were effectively unreachable until repaired from a
more representative window.
