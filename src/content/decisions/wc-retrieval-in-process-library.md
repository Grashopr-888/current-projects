---
title: Retrieval as an in process library, not a service
product: windchime
date: 2026-05-16
status: accepted
context: >-
  Every utterance needs retrieval, via a service or an in process library.
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
  Built once in process, shared read only across worker threads; only dependency conflicting
  heavy backends run in a minimal text only sidecar.
rationale: >-
  No network hop or extra supervised process on the visitor hot path.
consequences: >-
  Thread safety work surfaced a real bringup bug; normally one process runs, plus the active
  heavy backend's sidecar.
tags: [architecture, retrieval, deployment]
---

The default path is a library call, not a service call, which keeps the hot path
short and supervised by one process. Networked sidecars exist only where a model's
dependency stack forces them, not as the general pattern.
