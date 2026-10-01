---
title: The instrument runs on the pedal
product: hrnsxtn
version_or_label: board-first-run
date: 2026-09-02
status: shipped
summary: >-
  Cross built for the Elk Stomp's 32 bit ARM cores and loaded under SUSHI without the vendor
  SDK; the answer bar now comes from the pedal's own output jacks.
customer_value: >-
  No laptop on stage: the instrument the challenge asked for, played from the pedal by feel.
included_work:
  - 'Docker cross build: Ubuntu 24.04 armhf, GCC 13, JUCE 8'
  - Checksummed file transfer over the serial console, about 8 KB/s
  - 'On the board: worker p50 93.3 ms, p99 94.9 ms, zero overruns, stalls or drops'
  - All five pot mappings and hold verified by hand
notable_risks:
  - Per stage costs on the board still unmeasured
linked_decisions: [hs-move-the-decisions]
tags: [milestone, embedded]
---
