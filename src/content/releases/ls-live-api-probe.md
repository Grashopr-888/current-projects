---
title: Max for Live Live API probe
product: lichtspiel
version_or_label: phase-3-live-api-probe
date: 2026-05-30
status: shipped
summary: >-
  A thin Max for Live device that reads the Live Set's transport, selected track, scene,
  and clip and streams them to the runtime, with device dials moving visual parameters.
customer_value: >-
  The visuals start to reflect what is actually happening in the Live Set, and a performer
  can nudge parameters from the Ableton device without leaving Live.
included_work:
  - A Live API helper that emits a stable session-state snapshot, guarded to degrade to defaults
  - An OSC receiver in the bridge for state, scene, and parameter addresses
  - Device dials mapped to visual parameters and buttons mapped to scenes
  - Read paths for the playing clip, clip color, and selected-track device names
notable_risks:
  - Arrangement property names are best-effort and need in-set verification
followups:
  - MIDI content summary deferred to a later phase
tags: [ableton, max-for-live, osc, live-api]
---

This is the layer that makes Lichtspiel Live-native rather than a generic visualizer. It was verified reading real transport and track state from a working Ableton set, which proved the Max shell could stay thin while the heavy logic lived downstream.
