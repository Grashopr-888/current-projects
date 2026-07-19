---
title: Exchangeable retrieval backends with an offline audit harness
product: windchime
version_or_label: retrieval-backends
date: 2026-06-28
status: shipped
summary: >-
  Retrieval moved behind a single embedding-backend interface over a
  model-independent corpus database, with several audio-language model
  configurations selectable at runtime, a multilingual configuration added, and an
  offline harness that measures how each one behaves over a fixed corpus and
  prompt set.
customer_value: >-
  The installation can run identically while the audio-language model is changed as
  a controlled variable, which keeps the piece stable for visitors and makes the
  model itself something that can be studied.
included_work:
  - An embedding-backend interface over one shared, model-independent corpus DB
  - Audio embedded offline once per configuration; heavy models behind a text-only sidecar
  - A runtime backend toggle with a liveness probe and auto-revert
  - A multilingual configuration plus an offline distributional-audit harness
notable_risks:
  - One model carries a research-evaluation licence and stays restricted to offline, audit-only use
  - Keeping several backends warm for instant switching costs some memory
followups:
  - Reuse the same seam to run the backend as a hidden, logged study condition
tags: [retrieval, architecture, research]
---

Making the audio-language model exchangeable turned an implementation detail into a
first-class experimental variable, without disturbing the installation around it.
The same interface that lets an operator toggle retrieval backends also powers an
offline harness for characterising each configuration.
