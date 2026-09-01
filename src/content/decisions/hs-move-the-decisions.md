---
title: Move the decisions, not the model
product: hrnsxtn
date: 2026-08-25
status: accepted
context: >-
  The instrument depends on music2latent, a 58M-parameter neural codec measured at
  real-time factor 0.61 on an M1 Max CPU — slower than real time on a laptop. The
  target is two 800 MHz Cortex-A7 cores with no NPU, and no PyTorch runtime exists
  for 32-bit armv7 at all. The gap is 30–100×, before the missing runtime.
options_considered:
  - option: Quantize and prune the codec until it fits
    tradeoffs: >-
      Int8 on NEON buys 2–3×, not 30–100×. And with no runtime for the
      architecture, even a small enough model has nowhere to run as PyTorch.
  - option: Keep inference on a laptop and stream to the pedal
    tradeoffs: >-
      Works, but violates the challenge's premise (no laptop) and makes the
      instrument's reliability someone else's Wi-Fi.
  - option: Restructure — precompute offline, distill the encoder, decide at 10.7 Hz
    tradeoffs: >-
      Requires proving that a tiny student preserves the instrument's taste, and
      an honest metric for that. Compute stops being the risk; fidelity becomes it.
decision: >-
  Restructure. The codec embeds the corpus once, offline. A distilled 103k-parameter
  MLP (560× smaller) embeds live input at the 10.7 Hz decision rate on a worker
  thread. The audio thread never runs a network.
rationale: >-
  The budget math is categorical: at audio rate the board affords roughly 2,000
  multiply-accumulates per sample; at the decision rate, millions per frame. Same
  silicon, three orders of magnitude apart. Any design that keeps neural work at
  frame rate fits; none that keeps it at audio rate does.
consequences: >-
  Student inference costs 1–2% of one core; matching ~8–16%; the audio thread
  measures 0.09%. The quality question moved to a measurable place (see the
  regret study) instead of living inside an unrunnable model. The recipe
  generalizes to any latency-critical system with intermittent decisions.
tags: [distillation, embedded-ml, architecture]
---

The full budget arithmetic, the runtime survey for 32-bit ARM, and the A-through-D
architecture ladder live in the project repository's feasibility study; the numbers
quoted here are its measured results, not estimates.
