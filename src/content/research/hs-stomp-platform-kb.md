---
title: 'What actually fits on a pedal with no NPU'
product: hrnsxtn
date: 2026-08-25
source_type: synthesis
summary: >-
  An eight-chapter, cited knowledge base of the Elk Stomp platform — hardware, OS, host
  internals, and the real budget for machine learning — verified claim by claim.
questions:
  - Where does marketing end and measured capability begin?
  - What are the real budgets per sample, per frame, per callback?
insights:
  - 'The budget gap is categorical: ~2,000 MACs per sample at audio rate, millions per frame at 10.7 Hz'
  - No PyTorch runtime exists for the board's 32-bit architecture; inference compiles into the plugin
  - Two latent host defects found by reading its source — both now design constraints
implications:
  - Every port decision traces to a cited chapter rather than a hunch
  - The knowledge base doubles as the mentorship agenda with the platform's engineers
evidence_links:
  - label: Recovered board telemetry
    note: Average 6.8% of the callback budget, peak 1302% — the "peak, not average" rule
tags: [platform, embedded, knowledge-base]
provenance: Distilled from the project repository's cited platform chapters
redaction_status: sanitized
---

Built in a day by four parallel research agents sweeping docs, vendor source, literature,
and failure reports — then re-verified against source or hardware, with unverifiable
items marked rather than smoothed over.
