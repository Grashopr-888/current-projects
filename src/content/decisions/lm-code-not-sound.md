---
title: "Let the models write code, and keep the music the artist's own"
product: livemuse
date: 2024-12-15
status: accepted
context: >-
  Live.Muse wants a performer to change mappings and behaviors mid set by asking for them,
  without the output falling below the quality of finished compositions.
options_considered:
  - option: Generate the audio with a music model
    tradeoffs: New material every time, but the sound is the model's, and quality and timing are hard to hold live
  - option: Generate code that drives the visuals and the MIDI
    tradeoffs: Every change stays inside tools that already hold up on stage, and the music stays the artist's own
decision: >-
  Two assistants answer prompts with code: one updates the Processing visuals, the other the
  Sonic Pi MIDI sent to Ableton Live. The sound comes from original compositions and the
  artist's audio assets.
rationale: >-
  Code is inspectable and runs in the same live coding stack the performer already plays, so a
  bad answer can be undone, and the compositions keep the output quality high.
consequences: >-
  The framework moves easily between performance, installation and composition. Windchime later
  kept the principle, a model in the loop fenced by structure, and swapped generation for
  retrieval.
tags: [architecture, generation, performance]
---

The models change how the piece behaves; they never become the piece.
