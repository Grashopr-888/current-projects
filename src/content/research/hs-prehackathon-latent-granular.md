---
title: 'Pre-hackathon: a folder of recordings becomes an instrument'
product: hrnsxtn
date: 2026-08-18
source_type: experiment
summary: >-
  The week before the hackathon, the latent granular idea was built and gated on a
  laptop: encode a corpus with music2latent, match live playing grain-by-grain in
  the latent space, and play the substitution back a bar late. Thirteen documented
  build sessions, four formal experiments, and a studio interface with a live
  three-dimensional map of the corpus.
questions:
  - Does latent-space matching over real recordings feel like an instrument, or like a browser?
  - Which controls does a performer actually reach for — and how few can carry the piece?
  - Can grain substitution stay musical with no model training at all, on an arbitrary folder of audio?
insights:
  - 'The latency became the identity: rendering one block ahead means the system answers rather than accompanies, and "one bar late" reads as intent, not lag'
  - Anti-hub and stickiness penalties matter as much as similarity — without them a few magnetic grains take over (the worst corpus measured 88% of picks from five grains)
  - Five shaping controls (depth, stick, smooth, variety, intensity) were enough; presets mattered more than any sixth control
  - Gain-matching in the latent domain keeps the player's dynamics through substitution
implications:
  - The control set maps almost one-to-one onto a pedal's eight pots — the hardware version was plausible before the hardware existed
  - Matching is numpy-cheap at 10.7 Hz; the codec is the only expensive part, which set up the distillation question
evidence_links:
  - label: Studio interface with the live latent map (screenshot)
    href: /current-projects/img/hs-ui-studio.jpg
    note: Two voices over one corpus map — 16,945 grains from 38 files — with the full shaping-control set
tags: [granular, latent-space, prototyping]
provenance: Distilled from the build repository's session logs and experiment protocols (exp01–exp04)
redaction_status: sanitized
---

The prototype was built for the Roland Future Design Lab challenge — a neural model
treated as something performable — and took second place there. Its hardest lesson was
epistemic, not technical: the sponsor device's API was unpublished during the build, so
every claim in the research inventory carried a tier (confirmed / sponsor intel /
inference / unknown) and the integration layer was written with explicit holes to fill
from day-one captures. That discipline is what let the same instrument pivot to the Elk
platform afterwards without rework.
