---
title: Move the decisions, not the model
product: hrnsxtn
date: 2026-08-25
status: accepted
context: >-
  The instrument depends on a 58M-parameter codec that is slower than real time even on a
  laptop CPU. The target is two 800 MHz cores, no NPU — and no PyTorch runtime exists for
  its 32-bit architecture at all.
options_considered:
  - option: Quantize and prune until it fits
    tradeoffs: Int8 buys 2–3×, not the needed 30–100× — and there is still no runtime.
  - option: Keep inference on a laptop, stream to the pedal
    tradeoffs: Violates the challenge's premise and borrows someone's Wi-Fi for reliability.
  - option: Precompute offline, distill the encoder, decide at 10.7 Hz
    tradeoffs: Compute stops being the risk; embedding fidelity becomes it.
decision: >-
  Restructure. The codec embeds the corpus once, offline; a distilled 103k-parameter
  student embeds live input at 10.7 Hz on a worker thread. The audio thread never runs a
  network.
rationale: >-
  At audio rate the board affords ~2,000 multiply-accumulates per sample; at the decision
  rate, millions per frame. Same silicon, three orders of magnitude apart.
consequences: >-
  Student inference costs 1–2% of one core; the audio thread measures 0.09%. The quality
  question moved somewhere measurable — the regret study — and the recipe generalizes to
  any latency-critical system with intermittent decisions.
tags: [distillation, embedded-ml, architecture]
---
