---
title: Operator tuning stage and corpus-driven levelling
product: windchime
version_or_label: audio-levelling
date: 2026-08-04
status: shipped
summary: >-
  An operator tuning stage with a live spectrum feed, and beds levelled from measured corpus
  loudness.
customer_value: >-
  The room can be balanced at the venue in minutes rather than by editing code, and
  sustained textures stop swamping the percussive material a visitor actually
  reacts to.
included_work:
  - Operator tuning stage with a live spectrum feed and install defaults
  - Every non-generated bed levelled from measured corpus loudness
  - Measured gain exposed on the corpus endpoint so sequence beds can be levelled
  - Presence trim for continuous stems
notable_risks:
  - Level correction depends on a measurement that a portion of the corpus lacks
followups:
  - Measure the stems that carry no usable loudness reading
tags: [audio, install, tooling]
---

Normalising loudness made every stem the same size but not the same weight. A field
recording that measures identically to a drum loop still fills the room differently,
which is what the presence trim exists to correct.
