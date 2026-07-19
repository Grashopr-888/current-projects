---
title: State-changing endpoints accepted cross-site requests
product: windchime
date: 2026-05-23
severity: sev3
summary: >-
  The livecode server's state-changing endpoints had permissive cross-origin settings,
  so a page open in the same browser could have triggered recording or generation
  without the operator's intent.
impact: >-
  While the stack runs on a developer machine, a malicious page visited in the same
  browser could have started the microphone or spent model-API budget. No exploit was
  observed; this was a latent exposure.
detection: >-
  Found during a security review of the endpoints while unifying the services under
  the umbrella.
response: >-
  Threat-modelled the state-changing endpoints and added an Origin check rather than
  relying on permissive cross-origin response rules.
root_cause: >-
  Open cross-origin settings block reading a response but do not stop a simple
  cross-site POST from being sent. With no Origin check, the state-changing endpoints
  trusted any caller.
fix: >-
  Every state-changing endpoint now checks the browser Origin against an allowlist of
  the installation's own service URLs. Non-browser callers, which send no Origin, still
  pass, so command-line scripts and the microphone runtime are unaffected.
followup_actions:
  - action: Keep the launcher port list and the Origin allowlist in sync whenever a service port changes
    status: open
  - action: Add a bearer token or an authenticating proxy before any non-loopback exposure
    status: open
status: resolved
blameless_note: >-
  A permissive default is common for a localhost dev tool. Adding the Origin check is a
  proportionate mitigation for the current trust model, and it is documented so it gets
  revisited before any wider exposure.
tags: [security, csrf, endpoints]
---

A defensive fix for a piece that lives on a developer machine but points a microphone
at a room. The Origin allowlist closes the cross-site path while deliberately leaving
non-browser tooling, which sends no Origin, free to work.
