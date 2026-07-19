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

VJ tools map an audio envelope; they do not know that this is the B-section or that the
performer just launched a new scene. Lichtspiel reads the Ableton Live set itself (clips,
scenes, locators, transport) and uses that structure to choose and shape code-native
browser visuals, with the monome as a latent-space instrument. It was built at an Ableton
hackathon run by **Music Hackspace**, hosted at **Berklee College of Music** (Boston, June
2026), under a hard constraint: a repeatable few-minute performance that could not fail on
stage.

## How it works, at the boundary

Ableton talks to a thin Max for Live shell, which feeds a Node bridge that normalises and
routes set state to a **p5.js runtime** for rendering and a **Python service** for
retrieval and authoring-time generation. One rule governs the design (**runtime purity**):
the performance path never calls a model or the network, and if the bridge, Ableton, or the
model service disappears, the visuals keep running browser-only and reconnect when they
return.

## The monome as an instrument

Visual scenes are single-file sketches composed from reusable **idioms**: a fader bank, arc
macros, a step sequencer, a cell-painter. The hardware layer is **capability-adaptive**: it
detects the connected device and folds a four-encoder sketch down onto a two-encoder Arc, or
adapts up to a larger grid. An on-screen **digital twin** mirrors every LED, so the piece is
fully playable with no hardware at all, which is also how it survives an unreliable stage.

## Discovery

Mapping visuals to section and scene changes makes them feel composed rather than merely
reactive. Authoring settled into three set-conditioned modes: **Sync** (the live audio's
character becomes a scene), **Dream** (a text prompt becomes a scene), and **Fuse**. And
generation needs curation to matter: a generated scene stays disposable until a human keeps
it, with a _Keep_ / _Promote_ flow moving the good ones into a committed tier.

## UX choices, tested in rehearsal

The instrument is designed around what a performer can afford to think about mid-set:
nothing on the monome navigates, everything expresses. That rule came from rehearsal, where
encoder presses left over from an early fallback mapping kept yanking the active scene out
from under the performer; the fix removed template switching from the hardware entirely and
became a standing design rule the idiom layer inherited. The capability-adaptive mapping
(folding a four-encoder sketch onto a two-encoder Arc) and the on-screen digital twin exist
for the same reason: the show must be playable on whatever hardware survives the trip, or
none at all.

Later passes added a hover-help tutorial layer over every control and an instrument-style
visual overhaul, both responses to watching a new user freeze in front of an unlabeled
surface. Curation got the same treatment: a generated scene stays disposable until a
deliberate Keep, because trusting a fresh generation on stage is a risk a performer should
opt into, not inherit.

## The three-fork consolidation

The most instructive part of Lichtspiel is a **judgment call**, not a feature. The
project forked into three lines: the team's pre-AI base, a rigorous solo generator with real
validation and curation, and a newer tree with a much better UX and a Python "vibe" pipeline
whose validation had been stubbed out. I based the consolidation on the newest tree and
**restored the dropped rigor** from the other fork, each restoration its own reviewable
commit. The decision record and the incident that followed are below.

## Validation

Generated visuals are not trusted by default. Every one runs a **five-gate chain** (strict
type-checking, an allow-list lint, a monome-playability marker check, and a headless render
smoke test) inside a bounded self-repair loop that retries up to three times before giving
up. The first scene through the rebuilt pipeline passed every gate at 60 fps.

## What I'd do next

- Close the **grid-coverage gap**: the playability gate checks that controls _exist_, not that
  they _cover_ the surface, so thin mappings can pass. (Tracked as an open incident.)
- Package the instrument as a distributable **Max for Live device**.
- Fold more of Windchime's newer visual work back across the shared lineage.
