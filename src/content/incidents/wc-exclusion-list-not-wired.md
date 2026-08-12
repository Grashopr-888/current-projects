---
title: The stem exclusion list was never wired to anything
product: windchime
date: 2026-08-04
severity: sev2
status: open
summary: >-
  The stem exclusion list had complete, working functions and no call sites. Editing it
  changed nothing.
impact: >-
  An operator control that silently did nothing. Any judgement made about the corpus
  while assuming an exclusion was active was made against the unfiltered library.
detection: >-
  Found while auditing the corpus, by searching for the functions' call sites rather
  than testing the functions themselves.
response: >-
  Tracked the list into version control so its intended contents are recorded, and
  filed the wiring as open work rather than quietly patching it during an audit.
root_cause: >-
  The exclusion helpers were written and unit-tested in isolation and then never
  called. They pass their own tests perfectly, which is exactly why nothing flagged
  them.
fix: >-
  Not yet fixed. The list is now tracked, and wiring it into the selection path is
  scheduled work.
followup_actions:
  - action: Wire the exclusion list into the selection path and verify with a real generation
    status: open
blameless_note: >-
  Verifying a helper is not verifying a feature. A test that exercises a function
  proves the function works, never that anything calls it; the check that would have
  caught this is a search for call sites.
tags: [corpus, retrieval, process]
---
