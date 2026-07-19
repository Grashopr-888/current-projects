---
title: Keep and Promote curation tiers for generated scenes
product: lichtspiel
date: 2026-06-11
status: accepted
context: >-
  Generated visual scenes vary in quality and should not silently join the trusted corpus.
  The team needed a way to keep a good generation for the current session and, separately,
  to graduate a proven one into the committed set of scenes.
options_considered:
  - option: Auto-commit every generated scene that passes validation
    tradeoffs: Zero friction; the corpus fills with unproven scenes and quality drifts
  - option: Discard every generation at the end of the session
    tradeoffs: Keeps the corpus clean; loses good scenes and any path to grow the library
  - option: Two tiers, a session Keep and a committed Promote
    tradeoffs: A little more UI and a deliberate human step; clean corpus, nothing good lost
decision: >-
  Generated scenes surface behind a banner with two actions. Keep holds a scene in local
  session state that survives reload, and Promote moves the file into the committed tier
  through an explicit, human-curated step.
rationale: >-
  Validation proves a scene runs; it does not prove a scene is worth keeping. A human taste
  step is the right gate for the corpus, and separating a session keep from a permanent
  promote matches how a performer actually works.
consequences: >-
  The trusted corpus only grows on a deliberate human action, and a session can still hold
  onto promising scenes without polluting it. The first user-approved graduate came from a
  live session, which validated the flow.
tags: [generation, curation, corpus, workflow]
---

Keep and Promote is the human taste gate on top of automated validation. It keeps generation useful without letting it dilute the hand-curated scenes the performance depends on.
