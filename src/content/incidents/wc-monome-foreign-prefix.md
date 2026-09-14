---
title: Monome dead after another app used it
product: windchime
date: 2026-06-04
severity: sev3
status: resolved
summary: >-
  serialosc kept the other app's prefix.
impact: >-
  Dead until a manual daemon restart.
detection: >-
  Switching to another monome app and back.
response: >-
  Traced the silent input to the OSC prefix each device was still emitting under,
  then made the bridge tolerant of any prefix instead of documenting a restart
  ritual.
root_cause: >-
  serialosc persists each device's prefix across app exits and daemon restarts, and the bridge's
  literal prefix matcher dropped every message.
fix: >-
  Suffix matching accepts any persisted prefix; a self healing regrab reasserts Windchime's.
blameless_note: >-
  Shared hardware means shared daemon state; assume any prefix.
tags: [monome, serialosc, hardware]
---
