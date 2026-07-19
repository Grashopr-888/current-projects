---
title: Auditing audio-language models as a controlled variable
product: windchime
date: 2026-06-28
source_type: experiment
summary: >-
  The research method holds the whole installation constant and varies only the
  audio-language model that matches a voice to sound, then measures how differently
  each configuration behaves over the same corpus and the same prompts.
questions:
  - Does the choice of audio-language model change which stems a voice can reach?
  - Are some configurations more stable under paraphrase, or across languages?
  - How evenly does each model cover the catalogue versus concentrating on a few stems?
insights:
  - A single embedding interface plus a model-independent corpus DB makes "which model" a clean toggle
  - Embedding audio offline, once per configuration, keeps the runtime light and the comparison fair
  - Distributional metrics (catalog coverage, selection concentration, dispersion, ranking overlap) describe behaviour without needing ground-truth labels
implications:
  - The same seam that enables the science also hardens the product (liveness probe, auto-revert)
  - Provenance matters. Every measurement must be attributable to the exact index epoch it ran against
evidence_links:
  - label: 'Decision: the audio-language model as an exchangeable variable'
    note: See the linked decision record
tags: [research, retrieval, methodology]
redaction_status: sanitized
provenance: Distilled to process only. No results, figures, or venue are published while the work is under review.
---

This note describes **method, not results.** The contribution is the experimental design:
treat the audio-language model as a controlled variable, measure distributional behaviour
over a fixed, artist-authored corpus, and keep every artifact attributable to the index
epoch it was computed on. Findings and write-ups remain private while under review.
