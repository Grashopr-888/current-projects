---
title: 'Distillation judged by regret, not agreement'
product: hrnsxtn
date: 2026-08-25
source_type: experiment
summary: >-
  Can a 103k-parameter student stand in for a 58M-parameter codec at the instrument's
  front end? Four conditions, four corpora, held-out queries — and a metric correction.
questions:
  - Does a distilled encoder pick the grains the full codec would?
  - What is honest measurement when the reference is deliberately stochastic?
insights:
  - The oracle agrees with itself on only 2.6% of picks at live settings — regret is the honest lens, not agreement
  - The student lands in the oracle's top 4–7% (ρ .84); a raw-MFCC baseline fails at 15–18%
  - A recurrent variant tied the simple MLP everywhere; the stateless model shipped
implications:
  - Compute is no longer the port's risk — the student costs 1–2% of one core
  - Known weak spot is onsets; the device clamps randomness up or ties variety on
evidence_links:
  - label: Student vs teacher
    note: 102,976 vs 58M parameters — 560× smaller, 0.1 M MACs per frame
tags: [distillation, evaluation, embedded-ml]
provenance: Distilled from the A/B study's metrics and memo in the project repository
redaction_status: sanitized
---

Method over vibes: train on held-out material, evaluate per corpus character, sweep the
performer's actual temperature, and render every condition through identical playback.
The blind listening verdict is the one gate still open.
