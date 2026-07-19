---
title: Retrieval failed on every request after the first
product: windchime
date: 2026-05-16
severity: sev3
summary: >-
  The first retrieval query in the pipeline worked, then every request after it
  failed. The corpus database connection was created on one thread and then reused on
  the server's other worker threads.
impact: >-
  During bring-up the end-to-end pipeline was unusable past a single query, which
  blocked browser testing of the whole voice-to-audio path.
detection: >-
  Surfaced immediately in end-to-end browser testing. The first generate succeeded and
  the second raised a thread-ownership error from the database driver.
response: >-
  Traced the failure to a single shared query engine that was constructed on one
  thread and then called from the server's request threads.
root_cause: >-
  The corpus database connection enforces same-thread use by default. One engine
  instance was shared across the server's worker threads, which the driver refuses.
fix: >-
  The engine opens its connection with the same-thread check disabled. This is safe
  here because the engine is read-only after construction, so there are no concurrent
  writes to race.
followup_actions:
  - action: Confirm the shared engine stays read-only after construction so the relaxed check remains safe
    status: done
  - action: Keep retrieval in-process rather than splitting it into a separate service
    status: done
status: resolved
blameless_note: >-
  The same-thread guard is a sensible database default meeting a reasonable server
  pattern of one shared, read-only engine. The lesson is about matching connection
  settings to the threading model, not about blame.
tags: [retrieval, threading, database]
---

A classic backend bug caught the moment the pipeline ran end to end. The fix was one
connection flag, made safe by an invariant that already held: the engine only reads
after it is built, so relaxing the thread check races nothing.
