---
title: LLM bypass, and a measured latency profile
product: windchime
version_or_label: llm-bypass
date: 2026-07-31
status: shipped
summary: >-
  A second reading: retrieval straight to playback, no model or pattern, with a measured
  latency profile.
customer_value: >-
  A visitor hears their words answered in a fraction of a second instead of several,
  and the installation gains a path that keeps working when no model is reachable at
  all.
included_work:
  - Retrieval-only playback path, selectable from the planner dropdown
  - Bypass routed through the existing master gain, so the limiter and watchdog still apply
  - Explicit teardown points so a stop always severs it
  - Measured latency profile across planner backends and sound modes
notable_risks:
  - Retrieval returns more stems than the pattern templates played, so the bypass is denser
  - The latency difference makes bypass and planner hard to compare blind
followups:
  - Decide which reading an exhibition day should run
tags: [audio, retrieval, latency]
---

The profile is what justified the feature: the language model accounted for the
overwhelming majority of the wait, while the retrieval model itself varied by a
margin a visitor would never notice. Removing the planner was the only change that
moved the number.
