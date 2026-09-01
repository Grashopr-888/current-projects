---
title: 'Distillation judged by regret, not agreement'
product: hrnsxtn
date: 2026-08-25
source_type: experiment
summary: >-
  Can a 103k-parameter student stand in for a 58M-parameter codec at the
  instrument's front end? Four conditions over four corpora and held-out queries,
  scored against the oracle — and a finding that changed what "faithful" means.
questions:
  - Does a distilled encoder pick the grains the full codec would pick?
  - Is a learned mapping even necessary, or would classical audio features do?
  - What is the honest metric when the reference instrument is deliberately stochastic?
insights:
  - At performance settings the oracle agrees with itself on only 2.6% of picks across random seeds — exact-match agreement is dice, so the honest lens is regret
  - The student lands in the oracle's top 4–7% of candidates (rank correlation 0.84) and, past a little temperature, agrees with the oracle more than the oracle agrees with itself
  - The no-learning baseline (raw MFCC cosine) fails outright — top 15–18% — so the learned map is load-bearing, not decoration
  - A recurrent student tied the simple MLP everywhere and beat it nowhere; the stateless model shipped
  - 'Known weak spot: onsets (dense drums worst, drones best); noise is not a failure mode'
implications:
  - Compute stopped being the port's risk — the student costs 1–2% of one core at the 10.7 Hz frame rate
  - Cheap embeddings hub harder at zero temperature, so the device clamps randomness up or ties the variety control on
  - Metrics cannot settle audibility; a blind listening set (rendered with identical playback for every condition) is the final gate, still open
evidence_links:
  - label: Student size vs teacher
    note: 102,976 parameters vs 58M — 560× smaller; 0.102 M multiply-accumulates per frame
tags: [distillation, evaluation, embedded-ml]
provenance: Distilled from the A/B study's metrics tables and memo in the project repository
redaction_status: sanitized
---

The study's shape mattered as much as its result: train on held-out material, evaluate
per corpus character (percussive, tonal, textural), sweep the temperature the performer
actually uses, and render every condition through the same audio-domain playback so
listening comparisons are fair. Negative results — the baseline's failure, the GRU's
non-win — are reported at the same volume as the wins.
