---
title: The microphone goes deaf mid-session
product: windchime
date: 2026-08-04
severity: sev1
status: monitoring
summary: >-
  The installation stops hearing visitors with no error shown. Two software faults, not
  hardware.
impact: >-
  The piece's only input silently stops working. Nothing on screen indicates a fault,
  so an unattended installation can face a room of visitors it cannot hear.
detection: >-
  Reported by the operator across multiple sessions, then reproduced deliberately
  with a diagnostic that distinguished a wedged stream from a wrong device.
response: >-
  Separated the single reported symptom into two independent faults, then shipped
  detection and recovery for the one that could be fixed in software.
root_cause: >-
  Two faults wearing one symptom. First, the audio library caches its device list at
  initialisation, so after a hot-plug the system can silently re-point capture at the
  built-in microphone and the stream opens cleanly while recording near-silence.
  Second, a lock-order inversion inside the audio subsystem can deadlock the stop
  path, which hangs every microphone endpoint including the diagnostic built to
  report it.
fix: >-
  Detect a dead input and re-enumerate devices in software instead of requiring a
  physical replug, and hold the operator's chosen input with a device guard. The
  deadlock is documented and unfixed; a process restart clears it, because the audio
  context is per-process.
followup_actions:
  - action: Fix or work around the lock-order inversion in the stop path
    status: open
  - action: Exercise silent-capture detection deliberately rather than waiting for it to fire
    status: open
blameless_note: >-
  Every watchdog in the system guarded output; capture had none, which is why a
  failure this total could stay invisible. The transferable rule: a health endpoint
  must never take the lock it reports on, or the diagnostic dies with the thing it
  was built to diagnose.
tags: [audio, hardware, reliability]
---
