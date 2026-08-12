---
title: The tutorial's first line was silent on every later round
product: windchime
date: 2026-08-02
severity: sev3
status: resolved
summary: >-
  The narrated tour lost its opening line for every visitor after the first; the rest played
  normally.
impact: >-
  Each visitor after the first was greeted by a tour that began mid-thought, in the
  one moment the piece is trying to orient a stranger.
detection: >-
  Heard while cycling sessions during install rehearsal, after the round-one path had
  been assumed correct for weeks.
response: >-
  Traced the narration gain path across a full stop-and-restart cycle rather than
  reading its reported state at one instant.
root_cause: >-
  A gain value cannot be trusted while an automated ramp is still pending. Stopping
  schedules a fade toward silence, and mid-fade the value still reads as its
  pre-ramp level, so a guard checking whether narration was already audible saw the
  stale reading and skipped the restore.
fix: >-
  Cancel any pending automation and assert the value outright rather than deciding
  from a read. The race had two orderings, so the fix needed both halves.
blameless_note: >-
  This hid for weeks because round one always worked: a settled value reads
  correctly, so the bug only appeared once automation was in flight. A partial fix
  that changes a symptom's shape can disguise a second cause.
tags: [audio, narration, timing]
---
