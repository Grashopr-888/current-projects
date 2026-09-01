---
title: Play real grains instead of running a decoder
product: hrnsxtn
date: 2026-08-25
status: accepted
context: >-
  The laptop instrument decodes substituted latent frames back to audio through
  music2latent's decoder — the single most expensive stage, and the one that
  synthesizes sound. On the pedal, a neural decoder at audio rate is the part of
  the design the hardware most clearly refuses.
options_considered:
  - option: A small neural decoder (RAVE-class, shrunk)
    tradeoffs: >-
      Every published embedded run of that family needs a core 4–10× this one.
      Keeps morph — true interpolation between recordings — but does not fit.
  - option: A DSP-style decoder (DDSP-like oscillator bank)
    tradeoffs: >-
      Fits the budget (~10–20% of a core) but is a quality risk on textural,
      polyphonic corpora. Kept as a stretch experiment, not the foundation.
  - option: Delete the decoder — play back the original audio grains the matcher chose
    tradeoffs: >-
      Zero neural cost at audio rate and every sound is a real recording. The
      cost is explicit: morph, depth, and smooth — the controls that synthesize
      sounds existing between recordings — leave the minimum viable instrument.
decision: >-
  Delete the decoder. Matching happens in the learned latent space; playback is
  int16 corpus audio with equal-power crossfades from precomputed margins.
rationale: >-
  The instrument's mosaic character — real grains, intelligently chosen — is the
  half audiences respond to, and it survives intact. Intelligence in the choosing,
  not the manufacturing, is also the honest version of the piece: nothing you hear
  was invented by a network.
consequences: >-
  The audio thread mixes and windows; that is all. Morph is a scoped-out feature
  with a named path back (the DDSP-style stretch decoder in the roadmap), not a
  silent omission. The corpus pack format stores audio grains with crossfade
  margins so playback quality is a data-preparation problem, solved offline.
tags: [granular, real-time, scope]
---

The trade is written into the minimum viable instrument's definition of done: mix-mode
mosaic, matching-family controls, one-bar-late clock — and no promise the hardware
cannot keep.
