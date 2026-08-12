---
title: Self-describing study sessions
product: windchime
version_or_label: study-readiness
date: 2026-07-11
status: shipped
summary: >-
  Every captured session now records its full condition: variant, model, sound mode, and layer
  cap.
customer_value: >-
  Every captured session now carries its own experimental conditions, so analysis
  never has to reconstruct what the system was doing from timestamps and logs.
included_work:
  - Session-condition capture (variant, model, sound mode, cap) in the eval app
  - Backend-aware session recap for the experimenter
  - Balanced, versioned coverage prompt set for the retrieval audit
tags: [research, evaluation]
---

Small on the surface, this is the release that makes the research reproducible:
conditions travel with the data instead of living in a lab notebook.
