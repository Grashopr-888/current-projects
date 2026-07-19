---
title: Ended sessions rang back to life
product: windchime
date: 2026-07-12
severity: sev3
status: resolved
summary: >-
  Deliberately ended sessions came back audibly, twice by different mechanisms:
  first the safety watchdog "rescued" intentional silence by replaying the last
  plan, and later long in-flight voices that stop() had only gain-masked rang
  back when the next visitor's volume reset un-cut the master.
impact: >-
  Broke the install's quiet endings: the afterglow between visitors carried
  trailing audio from the previous session, undermining the bounded-session
  design.
detection: >-
  Heard during install-mode session cycling; the second mechanism surfaced a week
  after the first fix, during the install-features audio pass.
response: >-
  Fixed in two stages a week apart, each verified by cycling sessions and
  listening through the afterglow.
root_cause: >-
  Two designs shared one wrong assumption, that silencing equals stopping. The
  watchdog treated intentional silence as a fault to rescue, and stop() masked
  output gain while long voices kept playing underneath, ready to reappear when
  the master volume reset.
fix: >-
  The watchdog now respects an intentional-silence flag, and stop() purges the
  audio graph, severing already-sounding voices instead of masking them.
blameless_note: >-
  A safety system needs a way to be told "this silence is on purpose," and a stop
  path needs to make the state true rather than inaudible. Both fixes made the
  system's beliefs match the room.
tags: [audio, watchdog, install]
---
