---
title: Scene then arrangement generated the same template
product: lichtspiel
date: 2026-06-12
severity: sev3
status: monitoring
summary: >-
  Capturing a Session scene and generating, then capturing an Arrangement region and
  generating with auto-generate on, produced the same visual template instead of a new one
  conditioned on the latest capture.
impact: >-
  A performer expecting fresh imagery from the newest capture got a repeat, which undermines
  trust in the generate-on-capture flow during a play session.
detection: >-
  Found during a live play session while exercising the capture-then-generate path back to
  back, comparing the scene result against the arrangement result.
response: >-
  Rather than guess a single cause, three plausible causes were instrumented and two guards
  were landed, with a live reproduction planned to confirm which cause was real.
root_cause: >-
  Not yet confirmed. Three hypotheses are open: the capture source not switching to the newest
  file, two generations colliding with no in-flight guard, and near-identical audio yielding a
  near-identical brief. A missing context-set call was also found on the auto path.
fix: >-
  Request-source instrumentation logs the path each generation actually used, a latest-wins
  queue serializes concurrent generations so a stale run cannot shadow a newer one, and the
  missing context-set call was folded into the auto-generate path.
followup_actions:
  - action: Run the live reproduction and confirm the second generation names the newest capture
    status: open
  - action: If sources are correct but results still match, compare the two provenance banners and vibe logs
    status: open
blameless_note: >-
  Concurrent long-running generations without a guard is an easy gap to leave under time
  pressure. Instrumenting first and confirming with a live repro, rather than assuming a fix,
  is the right way to close an intermittent issue like this.
tags: [generation, capture, concurrency, monitoring]
---

This stays in monitoring because the guards landed but the live reproduction has not yet confirmed the root cause. The instrumentation is the real win: the next occurrence will name the capture each generation used, turning a vague "it repeated" into a precise diagnosis.
