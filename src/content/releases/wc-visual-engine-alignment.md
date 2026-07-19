---
title: Visual engine alignment across the shared lineage
product: windchime
version_or_label: visuals-alignment
date: 2026-06-23
status: shipped
summary: >-
  A seven-phase, two-day overhaul that ported the sibling project's mature visual
  engine into Windchime: a param-model bridge (one shared visual parameter vector
  with layered-target smoothing), a device-adaptive on-screen hardware twin, a
  corpus migration adding roughly 30 audio-reactive scene families, a hands-free
  takeover auto-performer, and a latent-space corpus map.
customer_value: >-
  The visuals stopped being a fixed sketch and became a corpus: dozens of scene
  families driven by one parameter contract, playable by hand, by audio, or by
  the auto-performer, with a map that shows a visitor where they are in the
  corpus.
included_work:
  - Param-model bridge with a shared visual parameter vector and layered-target smoothing
  - Device-adaptive on-screen twin of the connected monome hardware
  - Corpus migration adding ~30 audio-reactive scene families (24 net new)
  - Takeover auto-performer with Off / Auto / Listen modes
  - Latent-space corpus map (UMAP / PCA / t-SNE) with sketch upload
  - Responsive canvas and per-mode theming
tags: [visuals, architecture, platform]
---

This is the largest single block in Windchime's visual history and the direct
foundation of demo mode, which shipped the following day on top of it.
