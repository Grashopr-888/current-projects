---
title: The tour's first line went silent after round one
product: windchime
date: 2026-08-02
severity: sev3
status: resolved
summary: >-
  Later visitors' tours began midthought.
impact: >-
  The one moment meant to orient a stranger broke.
detection: >-
  Heard in rehearsal, weeks after round one was assumed correct.
response: >-
  Traced the narration gain path across a full stop-and-restart cycle rather than
  reading its reported state at one instant.
root_cause: >-
  During a fade, a gain still reads its starting level, so the guard thought narration audible and
  skipped the restore.
fix: >-
  Cancel pending automation and set the value outright; the race had two orderings, both fixed.
blameless_note: >-
  It hid until automation ran, since settled values read correctly; partial fixes can disguise a
  second cause.
tags: [audio, narration, timing]
---
