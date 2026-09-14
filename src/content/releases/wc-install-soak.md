---
title: Synthetic visitor soak of the install lifecycle
product: windchime
version_or_label: soak-v1
date: 2026-07-06
status: shipped
summary: >-
  Harness retired after one fix.
customer_value: >-
  Reliability, proven on the exact gallery build.
included_work:
  - Playwright synthetic visitors
  - Environment gated data isolation
  - Six hour health and memory telemetry
  - Negative radius bug fixed, reverified
  - Two low severity followups documented
notable_risks:
  - 'Live audio path excluded: the top gap'
linked_incidents:
  - wc-soak-negative-radius
followups:
  - Extend the harness to the audio path and watchdog
tags: [reliability, testing, install]
---

The harness lives in its own repository and treats the installation as a black
box, which is what makes the result honest: nothing in the product was modified
to pass its own test.
