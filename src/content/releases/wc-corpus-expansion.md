---
title: Corpus growth through repeatable studio batches
product: windchime
version_or_label: corpus-batches
date: 2026-07-17
status: shipped
summary: >-
  The retrieval corpus grew through successive studio-stem batches, ingested with a
  skip sentinel so re-runs are idempotent, and documented by a full multi-backend
  re-embed runbook.
customer_value: >-
  A larger and better-labelled sound library gives every spoken phrase more and more
  varied material to reach, while the repeatable ingest keeps that growth safe to
  redo and easy to audit.
included_work:
  - Successive batch ingests sorted into the category layout
  - A skip sentinel that makes re-ingesting a batch idempotent
  - A documented re-embed runbook covering every backend
  - Index-history entries recording each corpus-addition re-index
notable_risks:
  - Adding stems means re-embedding every backend to keep cross-backend comparisons fair
followups:
  - Fold staged attract-only stems into the retrieval corpus in a future batch
tags: [corpus, retrieval, data]
---

Corpus growth is a recurring operational act, not a one-off, so it was built to be
safe to repeat. The skip sentinel and the per-backend re-embed runbook are what let
the library expand without silently desyncing the indexes the retrieval study
depends on.
