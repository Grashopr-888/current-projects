---
title: 'Release as free, closed source software, at no cost'
product: meteora
date: 2026-11-05
status: accepted
context: >-
  Meteora is ready to share at ADC 2026, four days away. Its landscape is a UNESCO World
  Heritage Site and a living monastic community, where commercial use of the place raises a
  consent question. The release should cost nothing and keep options open for later.
options_considered:
  - option: Open source and free
    tradeoffs: Transparent and citable, but it fixes the license before the project knows what it becomes
  - option: Pay what you want on a storefront
    tradeoffs: Builds an email list, but every download page shows a price box and money can arrive
  - option: Closed source freeware on a GitHub release page
    tradeoffs: Free to publish, keeps every version, no price box; no notarization, so one Terminal line to install
decision: >-
  Release Meteora 0.3 as free, closed source software under the JUCE Starter license, hosted
  on a public GitHub repository that holds only the release, its README and its notices.
rationale: >-
  It costs nothing and takes no money from anyone, which keeps clear of the consent question,
  and it leaves the license of later versions open.
consequences: >-
  The install needs one Terminal line until notarization in 1.0. The terrain data derived from
  OpenStreetMap stays open under the ODbL inside the plugin, and the notices say so.
tags: [distribution, licensing, ethics]
---

The decision separates the code, which stays private, from the data, which stays open.
