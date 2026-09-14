---
title: LLM bypass, and a measured latency profile
product: windchime
version_or_label: llm-bypass
date: 2026-07-31
status: shipped
summary: >-
  Retrieval straight to playback.
customer_value: >-
  A fraction of a second, not several, with no model needed.
included_work:
  - Planner dropdown option
  - Limiter and watchdog still apply
  - Teardown on stop
  - Latency by backend and mode
notable_risks:
  - Bypass plays denser than templates
  - Latency gap hinders blind comparison
followups:
  - Decide which reading an exhibition day should run
tags: [audio, retrieval, latency]
---

The profile is what justified the feature: the language model accounted for the
overwhelming majority of the wait, while the retrieval model itself varied by a
margin a visitor would never notice. Removing the planner was the only change that
moved the number.
