---
title: A negative-radius draw call, found by a 6-hour soak
product: windchime
date: 2026-07-06
severity: sev3
status: resolved
summary: >-
  A purpose-built browser harness drove 879 synthetic visitors through the full session
  lifecycle for six hours. It surfaced exactly one real bug, a rare negative-radius
  drawing exception in the "computing" sequence.
impact: >-
  A single-frame render exception during the retrieval wait; visible only under sustained,
  rapid cycling, never yet by a real visitor, but the kind of thing that erodes an
  unattended install over a full day.
detection: >-
  Automated: the soak harness logged every render exception. The negative-radius count
  registered six occurrences across nearly 2,000 synthetic generations.
response: >-
  Traced the exception to sub-frame timing skew between the animation clock and the
  wall clock, and matched the repository's existing guarding idiom rather than inventing a new one.
root_cause: >-
  A radius derived from elapsed time could momentarily go negative when two clocks
  disagreed by a sub-frame amount, producing an invalid arc.
fix: >-
  A one-line lower-bound guard on the radius, consistent with the author's existing style.
  The negative-radius count went from six to zero on the next run.
followup_actions:
  - action: Document the two issues the soak deliberately did NOT patch (a slow memory creep; a rare synthetic-only dropped start)
    status: done
  - action: Extend soaking to the audio and microphone paths
    status: open
blameless_note: >-
  A clean soak that finds one small bug is a success, not a disappointment. The value is
  the confidence that everything else held (zero wedges, zero crashes, flat memory).
linked_release: wc-install-mode-v1
tags: [reliability, soak, testing, postmortem]
---

The headline result was the _absence_ of failures: zero wedges, zero crashes, zero browser
leaks, and byte-perfect separation between synthetic and real study data across roughly
1,900 generations. Finding one guard to add is what a soak is _for_.
