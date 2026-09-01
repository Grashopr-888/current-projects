---
title: 'What actually fits on a pedal with no NPU'
product: hrnsxtn
date: 2026-08-25
source_type: synthesis
summary: >-
  An eight-chapter, fully cited knowledge base of the Elk Stomp platform —
  hardware, the dual-kernel OS, the plugin host's internals, the developer
  workflow, and the real budget for machine learning — built in one day by
  parallel research agents and verified claim by claim.
questions:
  - Where does the platform's marketing end and its measured capability begin?
  - What are the real budgets — per audio sample, per decision frame, per callback?
  - What has anyone actually run, and what has merely been claimed?
insights:
  - The audio engine's processing chunk is fixed at compile time (64 samples, 1.333 ms) with no negotiation; plugins that assume desktop block sizes concentrate work and miss peaks
  - 'The budget gap is categorical: roughly 2,000 multiply-accumulates per sample at audio rate, millions per frame at 10.7 Hz — same silicon'
  - No PyTorch runtime exists for the board's 32-bit architecture; viable inference means engines compiled into the plugin
  - No published record of ML inference on this board was found; the project's benchmarks appear to be first
  - Two latent defects in the open-source host were found by reading its source — a capability bitmask built with the wrong operator, and an event bus never activated — both now design constraints and upstream reports
implications:
  - Every architectural decision in the port traces to a cited chapter rather than a hunch
  - The knowledge base doubles as the mentorship agenda with the platform's engineers — questions documentation cannot answer
evidence_links:
  - label: Recovered board telemetry
    note: Average 6.8% of the callback budget, peak 1302% — the exhibit behind the "peak, not average" rule
tags: [platform, embedded, knowledge-base]
provenance: Distilled from the project repository's cited platform chapters and raw research notes
redaction_status: sanitized
---

Method note: four research agents swept the official documentation, the vendor's entire
public code, the embedded-ML literature, and the failure space of desktop-plugin ports in
parallel; every load-bearing claim was then re-verified against source or hardware, with
unverifiable items marked as such rather than smoothed over.
