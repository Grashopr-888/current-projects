---
title: Synthetic-visitor soak, 879 visitors over six hours
product: windchime
version_or_label: soak-v1
date: 2026-07-06
status: shipped
summary: >-
  879 synthetic visitors through the install lifecycle over six hours: zero wedges, zero
  crashes.
customer_value: >-
  Reliability stopped being a claim. The exact build that faces a gallery was
  demonstrated to survive a full unattended day of visitor traffic, and the one
  bug the run surfaced was fixed and re-verified before the harness was retired.
included_work:
  - Playwright-driven synthetic visitors exercising the entire session lifecycle
  - Environment-gated isolation seams so synthetic traffic never touches real data
  - Health and memory telemetry across the full six-hour window
  - One render bug found, fixed, and re-verified (the negative-radius incident)
  - Two low-severity follow-ups documented rather than patched
notable_risks:
  - The run deliberately excluded the live audio path, which remains the top gap
linked_incidents:
  - wc-soak-negative-radius
followups:
  - Extend the harness to the audio path and watchdog
tags: [reliability, testing, install]
---

The harness lives in its own repository and treats the installation as a black
box, which is what makes the result honest: nothing in the product was modified
to pass its own test.
