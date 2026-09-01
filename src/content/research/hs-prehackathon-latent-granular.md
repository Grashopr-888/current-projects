---
title: 'Pre-hackathon: a folder of recordings becomes an instrument'
product: hrnsxtn
date: 2026-08-18
source_type: experiment
summary: >-
  The week before the hackathon, the latent granular idea was built and gated on a laptop:
  encode a corpus, match live playing grain-by-grain in the latent space, answer a bar late.
questions:
  - Does latent matching over real recordings feel like an instrument?
  - How few controls can carry the piece?
insights:
  - The latency became the identity — one block ahead reads as an answer, not a lag
  - Anti-hub and stickiness penalties matter as much as similarity (worst corpus, 88% of picks from five grains)
  - Five shaping controls were enough; presets mattered more than a sixth
implications:
  - The control set maps almost one-to-one onto a pedal's eight pots
  - Matching is numpy-cheap at 10.7 Hz; only the codec is expensive — which set up distillation
evidence_links:
  - label: Studio view with the live latent map (screenshot)
    href: /current-projects/img/hs-ui-studio.jpg
    note: Two voices over one corpus map — 16,945 grains from 38 files
tags: [granular, latent-space, prototyping]
provenance: Distilled from the build repository's session logs and experiment protocols
redaction_status: sanitized
---

Thirteen documented sessions, four formal experiments, 95 tests. Built for the Roland
Future Design Lab challenge (2nd place); the sponsor API was unpublished, so every claim
carried an evidence tier and the integration layer was written with explicit holes —
which is what let the instrument pivot to Elk afterwards without rework.
