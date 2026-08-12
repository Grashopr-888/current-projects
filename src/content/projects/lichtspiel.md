---
title: Lichtspiel
summary: >-
  A live audiovisual instrument for Ableton: session-aware p5.js scenes generated
  at authoring time, validated by a five-gate chain, and played from a monome grid
  and arc, with no model call ever on the render path.
status: shipped
timeframe: May to June 2026
role: Product & engineering lead on a hackathon team, then solo consolidation
collaborators:
  - A small hackathon team
thesis: >-
  A performer should not have to learn a second craft to have visuals. Lichtspiel
  derives musical features from the Ableton set itself through an MIR pipeline,
  then uses those features plus natural-language prompts to generate code-based
  p5.js animation, so the set drives set-aware visuals with no node-based tool
  like TouchDesigner to learn and no model call on the performance path.
problem: >-
  Performers in Ableton have no way to drive expressive, code-native visuals that
  understand the structure of their set (clips, scenes, sections) rather than
  just its loudness. Existing VJ tools map an audio envelope; they don't know the
  music.
audience: Live electronic performers and producers working inside Ableton Live.
constraints:
  - Built in a hackathon (a repeatable 3 to 4 minute demo had to work on stage)
  - The performance runtime may never call a model or the network on the render path
  - Degrade gracefully (run browser-only with no Ableton, no bridge, no hardware)
  - Adapt to whatever monome is plugged in (Grid 64 / Arc 2 up to Grid 128 / Arc 4)
  - One person's judgment had to reconcile three diverging forks
outcomes:
  - Shipped a working live instrument at an Ableton hackathon run by Music Hackspace, hosted at Berklee College of Music (Boston, June 2026)
  - Consolidated three diverging forks into one coherent build across 43 commits in four days
  - Generated visuals pass a five-gate validation chain before they can play
  - Reused Windchime's animation core (one lineage, two products)
public_visibility_note: >-
  Source code stays private, and a hackathon collaborator is kept unnamed here.
  What's shown is process (the decisions, the consolidation, and the delivery
  discipline), not implementation.
featured: true
order: 2
tech:
  - TypeScript
  - p5.js
  - Vite
  - Node (WebSocket bridge)
  - Max for Live
  - Python / FastAPI
  - CLAP + librosa
  - Claude (authoring-time codegen)
  - monome (serialosc)
languages:
  - TypeScript
  - JavaScript
  - p5.js
  - Python
  - Max (Max for Live patching)
  - HTML/CSS
---

## The opportunity: not another VJ plugin

VJ tools map an audio envelope; they do not know this is the B-section. Lichtspiel reads the
Ableton set itself (clips, scenes, locators, transport) and shapes code-native visuals from
that structure, with the monome as a latent-space instrument. Built at an Ableton hackathon
run by **Music Hackspace** at **Berklee College of Music** (June 2026), under one constraint:
a few-minute performance that could not fail on stage.

## How it works, at the boundary

A thin Max for Live shell feeds a Node bridge, which routes set state to a **p5.js runtime**
for rendering and a **Python service** for authoring-time generation. One rule governs the
design (**runtime purity**): the performance path never calls a model or the network, so the
visuals keep running browser-only if the bridge or service disappears.

Scenes are single-file sketches built from reusable **idioms**: fader banks, arc macros, step
sequencers. The hardware layer is **capability-adaptive**, folding a four-encoder sketch onto
a two-encoder Arc, and a **digital twin** mirrors every LED so it plays with no hardware at
all. Rehearsal produced two standing rules: nothing on the monome navigates, everything
expresses; and a generated scene stays disposable until a deliberate Keep.

## The judgment call, and how it is validated

The most instructive part is a judgment call, not a feature. It forked three ways: the team's
base, a rigorous solo generator, and a newer tree with better UX whose validation had been
stubbed out. I consolidated onto the newest and restored the dropped rigor, each restoration
its own commit. Nothing generated is trusted: every scene runs a **five-gate chain**
(type-checking, allow-list lint, monome-playability check, headless render smoke test) inside
a bounded self-repair loop. The first scene through the rebuilt pipeline passed every gate at
60 fps.
