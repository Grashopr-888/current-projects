---
title: Umbrella repo that unifies the four service branches
product: windchime
version_or_label: 'v0.1'
date: 2026-05-23
status: shipped
summary: >-
  The first umbrella repo binding the retrieval, livecode, animation, and eval
  siblings as submodules behind one launcher, a shared dev UI shell, and a real
  control bus.
customer_value: >-
  One command brings the whole installation up on a laptop, so the piece can be
  built, demoed, and tested as a single system instead of four repositories wired
  together by hand each time.
included_work:
  - Submodule layout unifying the four sibling services
  - A unified launcher that starts all four services together
  - A dev UI shell plus an end-to-end smoke target
  - A control bus so livecode publishes and animation consumes
notable_risks:
  - Localhost-only trust model; state-changing endpoints still needed an Origin allowlist before any wider exposure
followups:
  - Layer operator demo and unattended visitor flows on top of the scaffold
tags: [architecture, tooling, scaffold]
---

The umbrella turned four independently useful repos into one runnable installation.
Everything that followed, from demo mode to the unattended kiosk lifecycle, was
built on this seam of a single launcher, a shared UI, and a typed control bus.
