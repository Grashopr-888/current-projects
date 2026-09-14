---
title: Exchangeable retrieval backends and an audit harness
product: windchime
version_or_label: retrieval-backends
date: 2026-06-28
status: shipped
summary: >-
  One interface, many models.
customer_value: >-
  Stable for visitors while the ALM varies.
included_work:
  - Model independent corpus DB
  - Offline audio embedding per configuration
  - Text only sidecar for heavy models
  - Runtime toggle, liveness probe, autorevert
  - Multilingual configuration
  - Offline distributional audit harness
notable_risks:
  - 'Research licensed model: offline audit only'
  - Warm backends cost memory
followups:
  - Reuse the same seam to run the backend as a hidden, logged study condition
tags: [retrieval, architecture, research]
---

Making the audio-language model exchangeable turned an implementation detail into a
first-class experimental variable, without disturbing the installation around it.
The same interface that lets an operator toggle retrieval backends also powers an
offline harness for characterising each configuration.
