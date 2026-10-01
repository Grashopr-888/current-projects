---
title: 'ISMIR 2026: does a distilled student choose as the codec would?'
product: hrnsxtn
date: 2026-09-24
source_type: experiment
summary: >-
  The Late-Breaking Demo accepted at ISMIR 2026 tests whether a 103k parameter student,
  distilled from music2latent, keeps the codec's similarity ordering, and what then limits
  real time operation on the Elk Stomp.
questions:
  - Does the student order corpus grains as the 58M parameter teacher does?
  - What limits real time operation on a pedal with no NPU?
insights:
  - 'Spearman ρ .829 for the student, against .797 for a ridge map and .575 for MFCCs, over 48 query and corpus pairs'
  - Its picks rank near the teacher's own second seed (percentile .945 against .981)
  - 'On the pedal the student takes about 1% of each 93 ms analysis; only the search grows with the corpus, and an 8 bit table speeds it 2.6 to 3.1 times'
implications:
  - For large corpora the search, not the network, sets how short the analysis period can be
  - Onsets are the weakest frames; an ordering term in the loss is the next step
evidence_links:
  - label: Paper, code, board logs and notebooks
    href: https://github.com/Grashopr-888/ISMIR_LBD_2026_submission
tags: [distillation, embedded-ml, ismir]
provenance: The paper as submitted on 24 Sep 2026 and its public repository
redaction_status: clean
---

With Jazz Segovia and Dennison Blackett. Accepted to the ISMIR 2026 Late-Breaking Demo session,
Abu Dhabi, November 8–12.
