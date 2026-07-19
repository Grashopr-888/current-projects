---
title: Encoder presses switched scenes mid-performance
product: lichtspiel
date: 2026-06-04
severity: sev3
status: resolved
summary: >-
  Monome encoder clicks unpredictably switched the active visual scene during
  play, because a legacy fallback mapping bound encoder presses to template
  navigation.
impact: >-
  Expressive presses doubled as navigation, so a performer leaning into an
  encoder could yank the whole visual world out from under their set.
detection: >-
  Reproduced during rehearsal play-throughs on the physical Arc.
response: >-
  Audited every monome binding, found the legacy fallback that mapped presses to
  random/next-template navigation and a grid region to scene select, and removed
  the whole class of binding.
root_cause: >-
  An early fallback mapping survived into the instrument era: encoder presses and
  a grid region were still bound to template switching from before the idiom
  layer existed.
fix: >-
  Removed all template-switching from the monome mapping. Hardware drives
  parameters only; navigation stays on the keyboard and in Ableton.
blameless_note: >-
  This established a rule the idiom layer inherited: the instrument surface is
  for expression, never for navigation, so no gesture can destroy the context it
  is played in.
tags: [monome, mapping, performance]
---
