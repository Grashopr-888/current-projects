---
title: Consolidation re-exposed a stubbed validation path
product: lichtspiel
date: 2026-06-11
severity: sev3
status: resolved
summary: >-
  The newer fork chosen as the consolidation base had its code-generation validation
  gates stubbed out with TODOs. Basing on it meant generated visuals could ship unchecked.
impact: >-
  Without real gates, a generated scene could reach the stage without passing type,
  lint, playability, or render checks, the exact failure the rigor was meant to prevent.
detection: >-
  Found during the consolidation itself, by comparing the two forks' generation paths
  rather than assuming the newer one was complete.
response: >-
  Treated it as a first-class restoration task in the consolidation plan rather than a
  footnote: a real validator, wired into the generation flow, with a bounded self-repair loop.
root_cause: >-
  The fork had prioritised UX and a new pipeline and left validation as a stub; the gap
  only mattered once that fork became the base everything else built on.
fix: >-
  A real validation script (strict type-check, an allow-list lint, a playability marker
  check, and a headless render smoke test) shelled from the generator with up to three
  self-repair passes before failing.
followup_actions:
  - action: Prove the rebuilt path end-to-end with a first generated scene
    status: done
  - action: Strengthen the playability gate to check coverage, not just presence
    status: open
blameless_note: >-
  Stubbing validation to move fast in a hackathon fork is a reasonable local choice; the
  risk only appeared at integration. Catching it there is the system working as intended.
linked_release: ls-consolidation-v1
tags: [validation, consolidation, postmortem]
---

**Verification.** The first scene through the rebuilt pipeline passed every gate at 60 fps,
the proof that the restored rigor was real and not just re-declared.
