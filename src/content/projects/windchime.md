---
title: Windchime
summary: >-
  A voice-conditioned audiovisual installation in which audio-language models
  retrieve real stems from a closed, artist-authored corpus and render them as
  live-coded sound, generative visuals, and monome light.
status: active
timeframe: May 2026 to present
role: Solo (product, engineering, and research)
collaborators: []
thesis: >-
  Retrieval, not generation, is the honest interface between a voice and a sound
  library: reflect what a person actually said back to them through real material,
  in real time, and never go silent.
problem: >-
  Windchime uses audio-language models as retrieval curators. A visitor's words are
  embedded and matched against a closed, artist-authored corpus of stems, and each
  model surfaces combinations of real recordings that neither the artist nor the
  visitor would have specified. Nothing in the audio path is synthesized, so agency
  stays distributed by design: the artist authors the corpus and its mappings, the
  visitor initiates every retrieval, and the model orders access to the material.
  The hard problem is making that three-way split legible and rewarding to an
  untrained visitor within seconds, in a system reliable enough to run unattended
  for a full exhibition day.
audience: >-
  Gallery visitors (untrained, one interaction each) and the operator running an
  unattended installation.
constraints:
  - Unattended 6 to 8 hour exhibition runs, with automatic recovery at every layer and no operator present
  - Audio may never stop. The planner degrades from a hosted LLM to a local model to a deterministic template, and a persistent watchdog rescues the sound engine in place
  - 'One-shot visitors: the first spoken prompt must produce a legible audible and visible change, with no instructions'
  - Physical hardware on the control path (a monome Grid and Arc over serialosc), including hot-plug recovery
  - 'Retrieval only: a closed, artist-authored stem corpus. Nothing in the audio path is synthesized'
  - Speech is transcribed on-device and never recorded
outcomes:
  - '6-hour unattended soak: 879 synthetic visitors, zero wedges, zero crashes'
  - Audio runaway that peaked at 2.8× full-scale brought down to 0.36 after a three-layer safety fix
  - Corpus grown from 130 to 406 stems across eleven instrument roles
  - The audio-language model made an exchangeable variable, with six deployable configurations behind one model-agnostic embedding interface
  - A visual corpus of 135 scene families, 63 of them selected for the live rig
  - Runs offline end to end, so a venue with no usable internet is the default-safe case
public_visibility_note: >-
  Source code, the audio corpus, and in-progress research write-ups stay private.
  What's shown here is process (decisions, releases, incidents, and the shape of
  the research), not implementation.
featured: true
order: 1
tech:
  - Python
  - FastAPI
  - faster-whisper ASR
  - Audio-language models (CLAP family, CLaMP 3)
  - FAISS
  - Strudel live-coding
  - p5.js
  - Three.js
  - monome (serialosc)
languages:
  - Python
  - TypeScript
  - JavaScript
  - p5.js
  - Three.js
  - Strudel (pattern DSL)
  - HTML/CSS
  - Shell
---

## The opportunity

Most installations treat a visitor as a trigger for fixed rules. Windchime asks whether an
untrained person can shape music and its visual world by speaking, with the reply drawn
entirely from real recorded material: retrieval over an artist-authored corpus, which is more
accountable and more surprising than generation. Exhibited at **Gray Area** (San Francisco,
2026); built on **Live Muse**, an earlier, distinct installation shown at **Mutaciones**,
Barcelona.

## How it works, at the boundary

A visitor speaks. faster-whisper transcribes on-device and nothing is recorded; the active
audio-language model embeds it; cosine similarity over a FAISS exact index returns candidates
that a **one-per-role selection policy** cuts to one stem per instrument role. A **guarded
planner** fills a validated schema that compiles to a Strudel pattern, so the model never
emits raw code, and a failover chain (hosted model, local, deterministic template) keeps
sound playing offline. The same selection drives the p5.js and Three.js runtimes and the
monome LEDs, inside **bounded, staged sessions**.

## What I chose, and why

Descriptive language retrieves tightly, imagistic language loosely; that drift became a
reward for play. A visitor gives you seconds, so legibility must come from the system's
response. Three calls follow, each a decision record below: retrieval over generation, to keep
the audio path authored and deterministic; bounded sessions over an endless jam; a guarded
schema over raw model output, because generated code near live speakers is a safety liability.

## Built for the room, and proven there

A mic meter proves the system hears you, a computing cascade makes the wait read as intent,
an LED flash marks the moment sound lands. The hard part is hour six with no operator: an
**audio watchdog** rescues the sound engine in place, the vendored runtime makes no internet
the default-safe case, a device guard catches a deaf mic, and a filter keeps profanity off
the attract screen. Reliability is proven by a harness that drove hundreds of
synthetic visitors through the full session lifecycle. The experience is studied with standardised
instruments, and audits of the models and the corpus (406 stems, retrieval frequency joined
to loudness) keep turning suspicions into fixable findings. Method is in the Research
archive; results stay private while under review.
