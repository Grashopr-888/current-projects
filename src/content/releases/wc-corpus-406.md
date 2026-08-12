---
title: Corpus to 406 stems, with a size-aware audit
product: windchime
version_or_label: corpus-406
date: 2026-07-25
status: shipped
summary: >-
  A studio batch took the corpus from 369 to 406 stems; the audit now reads its size from the
  DB.
customer_value: >-
  More material for a visitor's words to reach, and an audit that stays honest as
  the corpus grows rather than quietly measuring the wrong thing.
included_work:
  - Studio batch ingested and re-embedded per configuration, 369 to 406 stems
  - Audit reads corpus size from the database instead of a hardcoded constant
  - Index epoch recorded so results stay attributable to the exact index
  - Notebook refreshed for the larger corpus, with a projection explorer
notable_risks:
  - Stems added late have had fewer chances to be drawn, so all-time counts favour older material
followups:
  - Report retrieval rates over the full-corpus era only, never all-time
tags: [corpus, retrieval, research]
---

The hardcoded corpus size is the interesting part: the audit had been dividing by a
number that stopped being true three batches earlier. Reading it from the database
turned a slowly rotting metric into one that cannot drift.
