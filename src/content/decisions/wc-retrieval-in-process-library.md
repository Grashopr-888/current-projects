---
title: Import retrieval as a library, not a network service
product: windchime
date: 2026-05-16
status: accepted
context: >-
  The livecode server needs semantic retrieval on every utterance. Retrieval could be
  its own networked microservice or an in-process library constructed inside the
  server that already handles the request.
options_considered:
  - option: A separate retrieval microservice over HTTP
    tradeoffs: >-
      Clean process isolation, but an extra network hop, another process to supervise,
      and network failure modes sitting on the visitor hot path.
  - option: An in-process library shared across the server's worker threads
    tradeoffs: >-
      One fewer moving part and no hop, but the engine must be thread-safe and stay
      read-only after it is built.
decision: >-
  Retrieval is installed as a package and constructed once in-process, shared
  read-only across the server's worker threads. The exception is a small set of
  dependency-conflicting heavy backends, which run as a minimal text-only sidecar
  because they genuinely cannot share the process.
rationale: >-
  Keeping the default retrieval in-process removes a network hop and a supervised
  process from the visitor hot path, which matters for both latency and reliability in
  an unattended piece. Sidecars are reserved only for models that cannot coexist in
  one environment.
consequences: >-
  The shared engine had to be made safe to use across threads, which surfaced a real
  bug during bring-up. In the common case the piece stays a single process, and only
  the active heavy backend needs its sidecar running.
tags: [architecture, retrieval, deployment]
---

The default path is a library call, not a service call, which keeps the hot path
short and supervised by one process. Networked sidecars exist only where a model's
dependency stack forces them, not as the general pattern.
