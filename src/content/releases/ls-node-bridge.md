---
title: The Node bridge between Max and p5
product: lichtspiel
version_or_label: phase-2-node-bridge
date: 2026-05-30
status: shipped
summary: >-
  A Node WebSocket hub that carries validated messages between Max for Live, the p5
  runtime, and a CLI, rejecting malformed payloads before they reach the visuals.
customer_value: >-
  The visual runtime only ever receives well-formed control messages, so a bad input
  upstream cannot corrupt or crash the performance.
included_work:
  - Loopback WebSocket server with a p5 client and reconnect-with-backoff
  - JSON validation against shared schemas, with readable rejection errors
  - Message logging and an HTTP status route
  - A CLI sender for scenes, parameters, state, and retrieval, for testing without Ableton
notable_risks:
  - A silently dropped invalid message could hide an upstream formatting bug
followups:
  - OSC route stubs left in place for the Max and monome phases
tags: [bridge, websocket, validation, node]
---

The bridge is where the system's contracts are enforced. Making it validate every message and reject bad ones (rather than forwarding them) meant later layers could be trusted to speak the same protocol or be cleanly rejected.
