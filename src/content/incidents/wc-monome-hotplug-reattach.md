---
title: Monome went silent after an unplug and would not recover
product: windchime
date: 2026-05-24
severity: sev2
summary: >-
  Unplugging and replugging a monome controller during a session left it detached and
  unresponsive, recoverable only by restarting the hardware bridge.
impact: >-
  In a live setting a bumped or reseated cable would drop the controller for the rest
  of the show unless someone restarted the bridge, which is not acceptable for an
  unattended piece.
detection: >-
  Reproduced during hardware testing. After a device detach and reattach, the bridge
  kept reporting the device lost and no input or LED output resumed.
response: >-
  Inspected the device-discovery handshake to see why a returning device was never
  re-adopted.
root_cause: >-
  The bridge armed its device-notification subscription once and deduplicated
  advertisements, so after a detach it never re-armed the subscription or re-pointed a
  returning device back at itself.
fix: >-
  The bridge now re-arms its device-notification subscription after every attach and
  detach and runs a short periodic re-poll as a backup, so a replugged device
  re-attaches within a few seconds with no restart. Redundant device chatter is
  suppressed by deduplicating only the attach event, not the re-pointing.
followup_actions:
  - action: Make input matching tolerant of a foreign address prefix left behind by another monome app
    status: done
  - action: Recover the host-side audio input path after a USB re-enumeration
    status: done
status: resolved
blameless_note: >-
  Hot-plug recovery is easy to miss when the first plug works cleanly. The fix makes
  the bridge self-healing, which is the right posture for hardware that will get
  bumped in a gallery.
tags: [hardware, monome, reliability]
---

Hardware in a gallery gets touched, so the bridge had to treat a mid-session unplug as
normal rather than fatal. Re-arming discovery on every device event, plus a periodic
re-poll, turned a restart-only failure into an automatic few-second recovery.
