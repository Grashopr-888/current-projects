---
title: Monome dead after another app used it
product: windchime
date: 2026-06-04
severity: sev3
status: resolved
summary: >-
  The monome hardware was completely unresponsive in Windchime whenever another
  monome application had used the controllers first, because serialosc persists
  the previous app's message prefix.
impact: >-
  Total controller unresponsiveness (no input, no LEDs) until the daemon was
  restarted by hand, exactly the kind of hidden state that would strand an
  unattended installation.
detection: >-
  Reproduced after switching between Windchime and another monome application on
  the same machine.
response: >-
  Traced the silent input to the OSC prefix each device was still emitting under,
  then made the bridge tolerant of any prefix instead of documenting a restart
  ritual.
root_cause: >-
  serialosc persists each device's message prefix across application exits and
  daemon restarts. Devices kept emitting under the other app's prefix, and the
  bridge's literal-prefix matcher dropped every message.
fix: >-
  Suffix-matched device input so messages flow under any persisted prefix, plus a
  self-healing re-grab that reasserts Windchime's own prefix on the device.
blameless_note: >-
  Shared hardware means shared mutable state in the daemon layer. The bridge now
  assumes any ambient prefix state is possible, which is the only assumption that
  survives a machine other people also use.
tags: [monome, serialosc, hardware]
---
