---
title: Ended sessions rang back to life
product: windchime
date: 2026-07-12
severity: sev3
status: resolved
summary: >-
  Twice: a watchdog rescue, then gain masked voices.
impact: >-
  Trailing audio spoiled the quiet between visitors.
detection: >-
  Session cycling; the second cause surfaced a week later, in the install features pass.
response: >-
  Fixed in two stages a week apart, each verified by cycling sessions and
  listening through the afterglow.
root_cause: >-
  Both assumed silence meant stopped: the watchdog rescued intentional silence, and stop()
  masked gain over voices that returned at volume reset.
fix: >-
  The watchdog honours an intentional silence flag; stop() purges the audio graph.
blameless_note: >-
  Safety systems need "this silence is on purpose"; stops must make the state true, not
  inaudible.
tags: [audio, watchdog, install]
---
