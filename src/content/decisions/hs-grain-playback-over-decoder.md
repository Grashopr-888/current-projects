---
title: Play real grains instead of running a decoder
product: hrnsxtn
date: 2026-08-25
status: accepted
context: >-
  The laptop instrument decodes latents back to audio through the codec: the most expensive stage, and the one a pedal with no NPU most clearly refuses.
options_considered:
  - option: A small neural decoder
    tradeoffs: Every published embedded run needs a core 4–10× this one.
  - option: A DSP-style (DDSP-like) decoder
    tradeoffs: Fits the budget; quality risk on textural corpora. Kept as a stretch.
  - option: Delete the decoder — play the original audio grains the matcher chose
    tradeoffs: Zero neural cost at audio rate; morph (sounds between recordings) leaves the MVP.
decision: >-
  Delete the decoder. Match in the learned space; play back int16 corpus audio with
  equal power crossfades from precomputed margins.
rationale: >-
  The mosaic character (real grains, intelligently chosen) is the half audiences respond
  to, and it survives intact. Intelligence in the choosing, not the manufacturing.
consequences: >-
  The audio thread only mixes and windows. Morph is a scoped out feature with a named path
  back, not a silent omission.
tags: [granular, real-time, scope]
---
