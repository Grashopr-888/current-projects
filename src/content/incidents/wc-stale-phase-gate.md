---
title: A closed kiosk page could latch the audio gate
product: windchime
date: 2026-07-12
severity: sev2
summary: >-
  Audio stranded in the wrong phase.
impact: >-
  No operator would clear it, defeating the self resetting lifecycle.
detection: >-
  The soak's abrupt page exits, which manual tests rarely reach.
response: >-
  Added an explicit reset on the normal exit path and a best-effort reset that still
  fires while the page is being torn down.
root_cause: >-
  Only a graceful showcase exit cleared the gate.
fix: >-
  Exit posts an idle phase, and a pagehide beacon (which survives teardown) hits a reset
  endpoint.
followup_actions:
  - action: Cover future kiosk autoboot paths
    status: open
status: resolved
blameless_note: >-
  Long unattended runs hit abrupt page death; short manual tests miss it.
tags: [reliability, kiosk, lifecycle]
---

A reliability fix the soak paid for. Because a crashed page never runs its normal
cleanup, the recovery had to ride a page-hide beacon, the one signal that still fires
as the page goes away.
