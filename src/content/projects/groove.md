---
title: Probing the World for Groove
summary: >-
  A comparison of a drum specific CNN and frozen PaSST transfer learning across
  18,264 two bar grooves and 74 style labels.
status: published
# Its own pages live under src/pages/projects/groove/; this entry supplies the card.
layout: research
timeframe: Thesis June 2025; ISMIR September 2025
role: Author of the MSc thesis; first author of the ISMIR 2025 Late-Breaking Demo
collaborators:
  - Edwin van der Heide
  - Robert Saunders
thesis: Can a model trained on general audio understand drum style?
problem: >-
  Drum classification research mostly names single hits or transcribes onsets
  into MIDI. Naming the style of a whole two bar performance from audio is a
  higher level task, and it was open whether general audio embeddings from
  AudioSet help with it or a drum specific network trained from scratch does
  better.
audience: >-
  Music information retrieval researchers, and audio ML practitioners choosing
  between a pretrained general audio model and a small task specific network.
public_visibility_note: >-
  The thesis, the paper, the poster, the experiment workbook and the notebooks
  are public. Every number on these pages comes from saved notebook outputs and
  the workbook; no model was retrained for the site.
featured: true
order: 4
tech:
  - PaSST (frozen, pretrained on AudioSet)
  - VGG style CNN
  - audiomentations
  - TensorFlow Datasets
  - Google Colab (A100 / L4)
languages:
  - Python
---
