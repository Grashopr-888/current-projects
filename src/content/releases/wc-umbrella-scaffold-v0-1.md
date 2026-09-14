---
title: Umbrella repo unifying four service branches
product: windchime
version_or_label: 'v0.1'
date: 2026-05-23
status: shipped
summary: >-
  The first umbrella.
customer_value: >-
  One command runs it all on a laptop.
included_work:
  - Four services as submodules
  - One launcher for all four
  - Dev UI shell
  - End to end smoke target
  - Control bus, livecode to animation
notable_risks:
  - Localhost only trust; needed an Origin allowlist
followups:
  - Layer operator demo and unattended visitor flows on top of the scaffold
tags: [architecture, tooling, scaffold]
---

The umbrella turned four independently useful repos into one runnable installation.
Everything that followed, from demo mode to the unattended kiosk lifecycle, was
built on this seam of a single launcher, a shared UI, and a typed control bus.
