---
title: A negative radius draw call, found by the soak
product: windchime
date: 2026-07-06
severity: sev3
status: resolved
summary: >-
  The soak's one real bug.
impact: >-
  One frame, under rapid cycling; no visitor saw it.
detection: >-
  Six logged across nearly 2,000 synthetic generations.
response: >-
  Traced the exception to sub-frame timing skew between the animation clock and the
  wall clock, and matched the repository's existing guarding idiom rather than inventing a new one.
root_cause: >-
  An elapsed time radius went briefly negative when two clocks disagreed by under a frame.
fix: >-
  A one line lower bound guard: six to zero on the next run.
followup_actions:
  - action: 'Document what it did NOT patch: memory creep, a rare dropped start'
    status: done
  - action: Soak the audio and mic paths
    status: open
blameless_note: >-
  One small bug in a clean soak is a success; memory stayed flat.
linked_release: wc-install-mode-v1
tags: [reliability, soak, testing, postmortem]
---

The headline result was the _absence_ of failures: zero wedges, zero crashes, zero browser
leaks, and byte-perfect separation between synthetic and real study data across roughly
1,900 generations. Finding one guard to add is what a soak is _for_.
