---
title: Monome silent after an unplug
product: windchime
date: 2026-05-24
severity: sev2
summary: >-
  A replug left it detached until a bridge restart.
impact: >-
  A bumped cable would drop it for the whole show.
detection: >-
  Hardware testing: no input or LEDs after reattaching.
response: >-
  Inspected the device-discovery handshake to see why a returning device was never
  re-adopted.
root_cause: >-
  The bridge armed device notifications once and deduplicated advertisements, so returning
  devices were never repointed.
fix: >-
  It rearms on every attach and detach, with a periodic repoll as backup: replugs reattach
  within seconds.
followup_actions:
  - action: Tolerate another app's prefix
    status: done
  - action: Recover audio input after USB reenumeration
    status: done
status: resolved
blameless_note: >-
  First plugs always work; gallery hardware gets bumped.
tags: [hardware, monome, reliability]
---

Hardware in a gallery gets touched, so the bridge had to treat a mid-session unplug as
normal rather than fatal. Re-arming discovery on every device event, plus a periodic
re-poll, turned a restart-only failure into an automatic few-second recovery.
