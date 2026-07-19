---
title: Sound modes and a content-aware re-embed
product: windchime
version_or_label: sound-modes-reembed
date: 2026-07-07
status: shipped
summary: >-
  A family of retrieval-and-playback presets (soundscape, focused, responsive, plus
  an immediacy set that seeks late-entry stems to where their audio actually begins)
  landed alongside a surgical re-embed that repairs stems whose index window was
  silent or unrepresentative, with index-epoch provenance recorded in the corpus.
customer_value: >-
  The operator can shape how the audio behaves, from an ambient wash to a tighter,
  more immediate response, and a spoken phrase now reliably reaches stems by their
  real content rather than by dead air at the start of a file.
included_work:
  - Sound-mode presets bundling retrieval and playback settings, toggle-able live
  - A loudness sidecar precompute (has-audio flag, per-clip gain, best window)
  - A content-aware re-embed of only the compromised rows, per backend
  - Append-only index-epoch provenance stamped into every audit record
notable_risks:
  - Per-clip normalization gain is computed and broadcast but not yet applied per sample in the pattern
followups:
  - Apply per-sample gain once templates support per-sample rather than per-voice gain
tags: [audio, retrieval, provenance]
---

The sound modes gave the audio a set of legible characters an operator can choose
between. The re-embed fixed a quieter problem underneath: some stems had been
indexed from silence, so they were effectively unreachable until repaired from a
more representative window.
