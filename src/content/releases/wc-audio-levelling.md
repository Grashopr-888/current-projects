---
title: Operator tuning stage and corpus driven levelling
product: windchime
version_or_label: audio-levelling
date: 2026-08-04
status: shipped
summary: >-
  With a live spectrum feed.
customer_value: >-
  Balance the room in minutes; textures stop swamping percussion.
included_work:
  - Install defaults
  - Nongenerated beds loudness levelled
  - Endpoint gain levels sequence beds
  - Presence trim for continuous stems
notable_risks:
  - Some stems lack a loudness measurement
followups:
  - Measure the stems that carry no usable loudness reading
tags: [audio, install, tooling]
---

Normalising loudness made every stem the same size but not the same weight. A field
recording that measures identically to a drum loop still fills the room differently,
which is what the presence trim exists to correct.
