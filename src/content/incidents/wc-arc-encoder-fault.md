---
title: An arc encoder switch is dead, confirmed by a paired-marker test
product: windchime
date: 2026-08-03
severity: sev3
status: open
summary: >-
  An arc push switch registers nothing; an absent event is indistinguishable from a mapping
  bug.
impact: >-
  Every gesture bound to that encoder's press is unreachable, across all scenes,
  including a page-flip chord that assumed both encoders.
detection: >-
  A paired-marker diagnostic: press the suspect encoder, then immediately press a
  known-good one as a timestamp. Six evidenced attempts produced twenty-eight turns
  and zero key events from the suspect encoder.
response: >-
  Ruled out software by reading the bridge, which parses press events with no
  per-encoder branching, then confirmed the fault survives a full stack restart and
  a cable reseat.
root_cause: >-
  A hardware fault in the encoder's switch. It cannot be a mapping problem, because
  the code path that would drop it does not distinguish between encoders.
fix: >-
  Not fixed in software by design. Affected gestures were remapped off the dead
  switch; the hardware needs repair or replacement.
followup_actions:
  - action: Repair or replace the affected controller
    status: open
blameless_note: >-
  The reusable trick is the diagnostic, not the finding. When a null result depends
  on an action you cannot observe, pair it with one you can, so silence becomes
  evidence rather than ambiguity.
tags: [monome, hardware, diagnostics]
---
