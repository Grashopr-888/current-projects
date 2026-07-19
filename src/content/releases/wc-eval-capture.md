---
title: User-study capture app, protocol to dashboard
product: windchime
version_or_label: eval-v0.1
date: 2026-05-20
status: shipped
summary: >-
  A standalone study-capture application shipped end to end in one day: the study
  protocol, a standardized UX questionnaire plus custom construct-grouped
  instruments, automatic event logging, a participant-facing survey UI, and a
  review dashboard, with synthetic test data to prove the pipeline.
customer_value: >-
  Study sessions capture themselves. The runtime emits events into the capture
  app, so evidence about how visitors actually experience the piece accumulates
  without an experimenter transcribing anything.
included_work:
  - Study protocol and consent flow modelled as data, not documents
  - Standardized usability scale plus custom construct-grouped instruments
  - Automatic session and event logging from the live runtime
  - A participant survey UI and a review dashboard over captured sessions
  - Same-day sibling integration, including a remote stop endpoint for trials
followups:
  - Capture full session conditions so every session is self-describing
tags: [research, evaluation, tooling]
---

The capture app is what makes the research protocol operational: the same
installation a visitor uses becomes the instrument that records the study, with
no manual bookkeeping between a trial and its data.
