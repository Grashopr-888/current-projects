---
title: 'Install mode: the unattended visitor lifecycle'
product: windchime
version_or_label: install-mode-v1
date: 2026-07-05
status: shipped
summary: >-
  A full kiosk lifecycle for an unattended gallery: armed → narrated onboarding →
  live session with a bounded number of spoken prompts → a recap → an idle attract screen.
customer_value: >-
  The piece can run all day with no operator. A stranger walks up, is oriented in
  seconds, has a bounded turn, and the installation resets itself for the next person.
included_work:
  - Staged session states with explicit start and end
  - TTS-narrated onboarding tour
  - Per-visitor volume reset, microphone VU meter, and record gating
  - Idle attract board
notable_risks:
  - A slow server-side memory creep over many hours (multi-day concern, not a single-day one)
followups:
  - Prove a full day of operation with a synthetic-visitor soak
linked_incidents:
  - wc-soak-negative-radius
tags: [installation, lifecycle, ops]
---

Install mode turned a runtime into an exhibitable installation. It is also what made a
disciplined reliability soak both possible and necessary.
