---
title: Windchime
summary: >-
  Audio language models retrieve real stems from a closed, artist authored corpus and render
  them as live coded sound, generative visuals and monome light.
status: active
timeframe: May 2026 to present
role: Built solo (product, engineering and research); the NeurIPS paper is coauthored
collaborators:
  - Celeste Betancur (CCRMA, Stanford University), coauthor of the NeurIPS 2026 paper
thesis: >-
  Retrieval, not generation, is the honest interface between a voice and a sound library:
  answer with real material, in real time, and never go silent.
problem: >-
  Audio language models act as retrieval curators over a closed, artist authored corpus; nothing
  is synthesized. The artist authors, the visitor initiates, the model orders access. That split
  must be legible within seconds, unattended, all day.
audience: >-
  Untrained gallery visitors, once each; the unattended install's operator.
constraints:
  - 6 to 8 hour unattended runs, self recovering
  - 'Audio never stops: failover planner, in place watchdog'
  - 'Visitors get one try: the first prompt must land'
  - monome Grid and Arc over serialosc, hotplug safe
  - Speech transcribed on device, never recorded
outcomes:
  - '6 hour unattended soak: 879 synthetic visitors, zero wedges, zero crashes'
  - Audio runaway cut from 2.8× full scale to 0.36 (three layer fix)
  - Corpus grown from 130 to 406 stems, eleven roles
  - Six deployable ALM configurations behind one interface
  - 135 visual scene families, 63 on the live rig
  - Runs fully offline, no venue internet
public_visibility_note: >-
  Source code, the audio corpus, and in-progress research write-ups stay private.
  What's shown here is process (decisions, releases, incidents, and the shape of
  the research), not implementation.
featured: true
order: 1
tech:
  - Audio language models (CLAP family, CLaMP 3)
  - Python
  - FastAPI
  - faster-whisper ASR
  - FAISS
  - Strudel live coding
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
skills:
  - Audio language models (CLAP, CLaMP 3)
  - Speech recognition (faster-whisper)
  - Vector retrieval (FAISS)
  - Live coded audio (Strudel)
  - Generative visuals (p5.js, Three.js)
  - Hardware control (monome)
  - Offline, unattended deployment
---

## The idea

Speech shapes music and visuals, answered from real recordings rather than fixed rules. It builds
on **Live Muse**, a separate earlier installation shown at **Mutaciones**, Barcelona.

## The pipeline

A visitor speaks; faster-whisper transcribes on device, recording nothing. The active ALM embeds
the words; cosine similarity over a FAISS exact index and **one per role selection** pick one stem
per role. A **guarded planner** fills a validated schema compiled to Strudel, never raw code, with
a failover chain for offline sound.

## Built for the room

Imagistic words retrieve more loosely than descriptive ones; that drift became a reward for play.
A mic meter, computing cascade and LED flash make the machine legible; an **audio watchdog**,
offline runtime, device guard and profanity filter carry it through hour six, proven by soak.
