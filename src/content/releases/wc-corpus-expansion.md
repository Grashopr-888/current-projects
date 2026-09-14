---
title: Corpus growth through repeatable studio batches
product: windchime
version_or_label: corpus-batches
date: 2026-07-17
status: shipped
summary: >-
  Repeatable and auditable.
customer_value: >-
  More varied, better labelled material.
included_work:
  - Batches sorted by category
  - Idempotent reingest via skip sentinel
  - Reembed runbook, every backend
  - Index history per reindex
notable_risks:
  - Fair comparison means reembedding every backend
followups:
  - Fold staged attract-only stems into the retrieval corpus in a future batch
tags: [corpus, retrieval, data]
---

Corpus growth is a recurring operational act, not a one-off, so it was built to be
safe to repeat. The skip sentinel and the per-backend re-embed runbook are what let
the library expand without silently desyncing the indexes the retrieval study
depends on.
