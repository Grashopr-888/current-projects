---
title: Demo mode for operator-run showcases
product: windchime
version_or_label: demo-mode
date: 2026-06-24
status: shipped
summary: >-
  An operator-facing presentation layer over the runtime, with a branded overlay,
  intro and outro visual-memory flashes, a logo reveal, per-section audio beds, and
  a closing recap.
customer_value: >-
  A presenter can run the piece as a polished showcase during a talk or a visit,
  with reachable controls for sound mode, transition, and demo set, and playback
  that keeps going while the screen is being recorded.
included_work:
  - Branded demo overlay with intro and outro flashes and a logo reveal
  - A demo set picker and per-section beds
  - Sound-mode and transition selectors placed in the demo header
  - Operator controls and a presentation theme
notable_risks:
  - A manual operator flow; the unattended visitor lifecycle is a later, separate build
followups:
  - Generalize the showcase machinery into an unattended install mode
tags: [demo, ui, presentation]
---

Demo mode gave the runtime a stage presence for live showings. It also became the
proving ground for the machinery (flashes, beds, recap, set picker) that the
unattended install lifecycle would later inherit and harden.
