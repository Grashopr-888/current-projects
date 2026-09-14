---
title: The microphone goes deaf midsession
product: windchime
date: 2026-08-04
severity: sev1
status: monitoring
summary: >-
  Capture silently dies: two software faults.
impact: >-
  An unattended piece faces visitors it cannot hear.
detection: >-
  Operator reports, then a device versus stream diagnostic.
response: >-
  Separated the single reported symptom into two independent faults, then shipped
  detection and recovery for the one that could be fixed in software.
root_cause: >-
  A cached device list lets a hotplug silently repoint capture at the internal mic; a
  lock order inversion can deadlock the stop path, hanging every mic endpoint.
fix: >-
  Reenumeration revives a dead input without a replug; a device guard holds the chosen one. The
  open deadlock clears on restart (per process audio context).
followup_actions:
  - action: Work around the stop path deadlock
    status: open
  - action: Test silent capture detection deliberately
    status: open
blameless_note: >-
  Watchdogs guarded output, not capture; a health endpoint must never take the lock it reports
  on.
tags: [audio, hardware, reliability]
---
