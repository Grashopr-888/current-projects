---
title: Generated scenes can pass while leaving the controller half-dead
product: lichtspiel
date: 2026-06-12
severity: minor
status: monitoring
summary: >-
  The playability gate checks that monome control idioms are present, not that they
  cover the surface, so a thin mapping (six faders on an eight-column grid) passes and
  leaves dead columns and idle encoders.
impact: >-
  A generated scene can be technically valid but underwhelming to play. Part of the
  instrument sits unused. A quality gap, not a crash.
detection: >-
  Found in live testing while playing generated scenes and noticing unmapped hardware.
response: >-
  Logged with a concrete fix direction (require full lane and encoder coverage) rather
  than a vague "improve generation."
root_cause: >-
  The gate was written to confirm idioms exist, which is necessary but not sufficient for
  a satisfying instrument mapping.
fix: >-
  Proposed: extend the gate to require coverage of all grid lanes and encoders. Not yet
  implemented, tracked as the next roadmap item.
followup_actions:
  - action: Extend the playability gate to assert coverage
    status: open
  - action: Confirm the related concurrent-generation mitigations on a live rig
    status: open
blameless_note: >-
  A good gate that turned out to be too permissive is a normal iteration of a quality bar,
  not a defect in judgment.
linked_release: ls-generative-track
tags: [generation, quality, known-issue]
---

Kept deliberately open and honest: this is a known limitation with a clear fix path, and
showing it is more credible than pretending the generation gate is already perfect.
