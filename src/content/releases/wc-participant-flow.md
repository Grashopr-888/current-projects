---
title: Participant mode and onboarding flow
product: windchime
version_or_label: participant-flow
date: 2026-05-28
status: shipped
summary: >-
  The dev rig became something a stranger could sit down at: a dev/participant
  mode toggle with one-click trial sessions, a two-stage consent onboarding flow,
  stuck-microphone auto-recovery, a live audio-activity meter, a transcript panel,
  and a six-prompt study configuration.
customer_value: >-
  The earliest release where someone other than the builder could run the piece.
  Everything a participant needs (consent, orientation, recovery from a wedged
  mic) happens in the interface, with no operator standing by.
included_work:
  - Dev / participant mode toggle with a one-click trial session
  - Two-stage consent and onboarding, served same-origin
  - Stuck-microphone detection and automatic recovery
  - Live audio-activity meter, master volume, and a transcript panel
  - Six-prompt study configuration for bounded trial sessions
linked_incidents:
  - wc-participant-audio-suspend
tags: [experience, research, reliability]
---

Participant mode is the hinge between a developer tool and an installation: the
first version of the bounded visitor session that install mode later formalised.
