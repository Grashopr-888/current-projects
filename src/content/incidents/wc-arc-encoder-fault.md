---
title: A dead arc encoder switch, proven by paired markers
product: windchime
date: 2026-08-03
severity: sev3
status: open
summary: >-
  Silent, exactly like a mapping bug.
impact: >-
  Its press gestures, including a two encoder page flip chord, are unreachable.
detection: >-
  Six paired marker attempts: 28 turns, zero key events.
response: >-
  Ruled out software by reading the bridge, which parses press events with no
  per-encoder branching, then confirmed the fault survives a full stack restart and
  a cable reseat.
root_cause: >-
  Hardware: the code path treats both encoders identically.
fix: >-
  No software fix by design: gestures moved off it, and the hardware needs repair.
followup_actions:
  - action: Repair or replace the controller
    status: open
blameless_note: >-
  Pair an unobservable null result with an observable action, so silence becomes evidence.
tags: [monome, hardware, diagnostics]
---
