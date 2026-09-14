---
title: State changing endpoints accepted cross site requests
product: windchime
date: 2026-05-23
severity: sev3
summary: >-
  Another open page could trigger generation.
impact: >-
  A malicious page could start the mic or spend model API budget; none observed.
detection: >-
  A security review during the umbrella unification.
response: >-
  Threat-modelled the state-changing endpoints and added an Origin check rather than
  relying on permissive cross-origin response rules.
root_cause: >-
  Open cross origin settings block reading, not sending, a cross site POST; nothing checked
  Origin.
fix: >-
  Endpoints check Origin against the installation's own URLs; scripts and the mic runtime send
  none and pass.
followup_actions:
  - action: Sync the port list and Origin allowlist
    status: open
  - action: Token or authenticating proxy before nonloopback exposure
    status: open
status: resolved
blameless_note: >-
  Proportionate for localhost, and documented for review.
tags: [security, csrf, endpoints]
---

A defensive fix for a piece that lives on a developer machine but points a microphone
at a room. The Origin allowlist closes the cross-site path while deliberately leaving
non-browser tooling, which sends no Origin, free to work.
