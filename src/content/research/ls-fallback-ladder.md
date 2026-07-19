---
title: The fallback ladder that keeps a live demo alive
product: lichtspiel
date: 2026-06-05
source_type: discovery
summary: >-
  A synthesis of what actually kept the system demonstrable through a fragile live stack: a
  ladder of fallbacks where every dependency has a safe substitute below it.
questions:
  - Which parts of the stack are most likely to fail during a live demo?
  - What is the minimum that must keep working for the demo to survive a failure?
  - How should each layer behave when the layer above or below it is missing?
insights:
  - The runtime running browser-only means a demo can start with nothing but a page open
  - Every experimental layer reduces to the same safe control message, so a failure degrades rather than ends
  - When a Max outlet path went dead, a feeder path bypassed it and the triggers kept firing
  - An on-screen emulator stands in for absent hardware, emitting the same event shapes
implications:
  - Design each dependency with an explicit substitute one rung down the ladder
  - Prefer reconnecting, optional layers over a monolith that must be fully present to run
  - Reliability work is a feature for a live instrument, not overhead
evidence_links:
  - label: Degradation section of the architecture notes
    note: Every layer reduces to a safe control message and the runtime is browser-only
  - label: Live session where the Max outlet path was dead
    note: The feeder bypassed it so scene and locator triggers still reached the runtime
tags: [reliability, discovery, degradation, live-demo]
redaction_status: clean
provenance: >-
  Synthesized from architecture notes, troubleshooting docs, and observations during live
  sessions. Process-level only, with no code, secrets, or private paths.
---

The discovery was that reliability on a live stack is not one feature but a ladder: for every layer that can fail, there is a defined rung below it that still plays something. Naming the ladder explicitly turned scattered fallbacks into a design principle that shaped how every new layer was added.
