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
  - Corpus grown from 130 to ~369 stems across eleven instrument roles
  - The audio-language model made an exchangeable variable, with six deployable configurations behind one model-agnostic embedding interface
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

Most interactive installations treat a visitor as a trigger for fixed rules. Windchime
asks whether an untrained person can shape a piece of music and its visual world by
speaking, with the reply drawn entirely from **real recorded material**: the bet is that
retrieval over an artist-authored corpus is a more accountable and more surprising
interface than generation. Windchime is exhibited at **Gray Area** (San Francisco, 2026)
and builds on **Live Muse**, an earlier, distinct installation shown at **Mutaciones** in
Barcelona, adapting parts of its stem library and code.

## How it works, at the boundary

A visitor speaks; faster-whisper transcribes on-device (no audio is recorded), the active
audio-language model embeds the transcript, and cosine similarity over a FAISS exact index
returns candidates that a **one-per-role selection policy** narrows to at most one stem per
instrument role. A **guarded planner** fills a validated schema that compiles to a Strudel
pattern, so the language model never emits raw code, and a failover chain (hosted LLM, then
local model, then deterministic template) keeps sound playing fully offline. The same
selection drives parameterized p5.js sketch families, a Three.js runtime, and the LEDs of a
monome Grid and Arc, all inside **bounded, staged sessions** with an explicit beginning and
end.

## Discovery

Descriptive language retrieves tightly while imagistic language retrieves loosely, so the
drift became an intentional reward for playful input rather than a defect to fight. A
visitor gives the piece seconds, which means legibility has to come from the system's
response, not from instructions. And the corpus is the instrument: it is hand-built from my
own studio stems and field recordings, its character is the product's character, and that
is why it stays private.

## Options I weighed

Retrieve rather than generate: retrieval reflects real authored material, is inspectable,
and keeps the audio path deterministic, so generation stayed out of the critical path
entirely. Bounded, staged sessions beat an always-on jam because they give a stranger a
beginning, a middle, and an end. And the planner fills a guarded schema instead of writing
code, because raw model output in a room full of speakers is a reliability and safety
liability. Each of these is documented as a decision record below.

## UX choices, tested in the room

Every visitor-facing choice answers the same constraint: a stranger gives the piece seconds.
The interface explains itself through response rather than instruction: a microphone VU
meter proves the system is hearing you, a full-screen computing cascade covers retrieval
latency so the wait reads as intent, an arrival flash on the monome LEDs marks the moment
sound lands, and two collapsible rails (a live digital twin of the hardware and a
three-dimensional corpus map) let a curious visitor see what the system is doing without
being required to.

Testing kept rewriting the design. The first participant sessions silenced the audio
between trials, which produced the always-running AudioContext lifecycle, stuck-microphone
auto-recovery, and an unlock banner that verifies sound is actually flowing. Study sessions
with standardised instruments and interviews shaped the six-prompt bounded session and its
recap, and the narrated onboarding tour with its side-chained tutorial bed came directly
from watching people walk up cold during install rehearsals. The remaining open question
that testing surfaced (which sound mode an exhibition day should run) is on the roadmap as
its own decision.

## Building for the room, not the demo

The hard part of an installation is hour six with no operator in sight, not the first
minute. The runtime is built around the planner failover chain and a persistent **audio
watchdog** that rescues the sound engine in place, with no page refresh and no new visitor
gesture required, and the whole visitor lifecycle is exercised by a synthetic-visitor soak
harness before it faces a real room.

## Validation

Reliability is proven, not asserted: a purpose-built browser harness drove hundreds of
synthetic gallery visitors through the entire session lifecycle without touching the
installation code or polluting real study data. The experience itself is studied with
standardised instruments (usability scales, per-trial ratings, and interviews) run as a
proper protocol, and a systematic audit measures how ALM choice conditions access to the
corpus. Method is summarised in the Research archive; results stay private while under
review.
