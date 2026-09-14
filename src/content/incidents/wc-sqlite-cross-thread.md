---
title: Retrieval failed on every request after the first
product: windchime
date: 2026-05-16
severity: sev3
summary: >-
  One database connection reused across threads.
impact: >-
  Bringup stalled after one query, blocking browser tests.
detection: >-
  The second generate raised a driver thread ownership error.
response: >-
  Traced the failure to a single shared query engine that was constructed on one
  thread and then called from the server's request threads.
root_cause: >-
  The connection enforces same thread use by default, and one engine was shared across worker
  threads.
fix: >-
  The same thread check is disabled, safe because the engine is read only after construction.
followup_actions:
  - action: Confirm the shared engine stays read only
    status: done
  - action: Keep retrieval in process
    status: done
status: resolved
blameless_note: >-
  Match connection settings to the threading model.
tags: [retrieval, threading, database]
---

A classic backend bug caught the moment the pipeline ran end to end. The fix was one
connection flag, made safe by an invariant that already held: the engine only reads
after it is built, so relaxing the thread check races nothing.
