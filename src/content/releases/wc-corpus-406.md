---
title: Corpus to 406 stems, size aware audit
product: windchime
version_or_label: corpus-406
date: 2026-07-25
status: shipped
summary: >-
  One studio batch, up from 369.
customer_value: >-
  More to reach, and an audit honest at any size.
included_work:
  - Batch reembedded per configuration
  - Size read from the DB
  - Index epoch recorded
  - Notebook projection explorer
notable_risks:
  - All time counts favour older stems
followups:
  - Report retrieval rates over the full-corpus era only, never all-time
tags: [corpus, retrieval, research]
---

The hardcoded corpus size is the interesting part: the audit had been dividing by a
number that stopped being true three batches earlier. Reading it from the database
turned a slowly rotting metric into one that cannot drift.
