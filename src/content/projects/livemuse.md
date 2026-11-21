---
title: Live.Muse
summary: >-
  A multimodal generative audiovisual performance framework. A monome grid plays generative
  visuals in Processing, Sonic Pi sends the music on to Ableton Live, and two language model
  assistants write code on request to change the visuals and the music while the set runs.
  Begun in Berlin in 2024, it became an installation in Barcelona in December 2025.
status: shipped
timeframe: August 2024 to December 2025
role: Artist and developer, from the concept and compositions to the code and visuals
thesis: >-
  Can performers invent their own gestures on the fly? Live.Muse lets a language model write
  the code that maps a controller to image and sound in the middle of a performance, while the
  music stays the artist's own compositions.
problem: >-
  Audiovisual sets usually fix their mappings before the show: a key does what it was patched
  to do. Live.Muse wants affordances that can change mid performance, written as code in
  answer to a prompt, without giving up the quality of finished compositions. Its visual
  language follows experimental filmmakers such as Takashi Ito, Stan Brakhage and Len Lye, and
  early computer animators such as John Whitney.
audience: >-
  Audiovisual performers, live coders and installation visitors, and researchers in generative
  music and interactive media.
constraints:
  - 'Stacks that already hold up on stage: Processing and p5.js for visuals, Sonic Pi and Strudel for live code, Ableton Live for the multitrack mix'
  - A monome grid as the one physical controller
  - Generated code changes the visuals and the MIDI, never the audio engine directly
  - Finished compositions carry the sound, so generation shapes the set rather than replacing the music
  - One framework for three uses, performance, installation and composition
outcomes:
  - First experiments during a three month artist residency at Petersburg Art Space, Berlin, August to November 2024
  - Formally conceived and presented at the Universitat Pompeu Fabra Generative Music workshop, led by Valerio Velardo and Xavier Serra, Barcelona, December 2024
  - Presented at Innovation Lab, Utrecht (June 2025), at the Mutacions Festival, Terrassa (September 2025) and at dorkbot London (November 2025)
  - An installation build in Barcelona in December 2025, funded by a Mutacions artistic production grant, documented as a full audiovisual album in 4K and a spatial audio mix
  - Its stem library and code became the starting point for Windchime, shown at Gray Area and published at NeurIPS 2026
public_visibility_note: >-
  The code and the stem library stay private; the videos, the poster and this page are public.
featured: true
order: 5
tech:
  - Processing and p5.js
  - Sonic Pi and Strudel
  - Ableton Live
  - monome grid
  - OSC and MIDI
  - Language model assistants for code
languages:
  - Processing (Java)
  - JavaScript
  - Sonic Pi (Ruby)
skills:
  - Generative visuals
  - Live coding
  - Code generation with language models
  - OSC and MIDI routing
  - Hardware control (monome)
  - Composition and production
  - Spatial audio mixing
  - Installation design
keywords:
  - generative audiovisual performance
  - multimodal
  - live coding
  - Processing
  - p5.js
  - Sonic Pi
  - Strudel
  - Ableton Live
  - monome
  - language models
  - code generation
  - visual stems
  - installation
  - spatial audio
  - Petersburg Art Space
  - Universitat Pompeu Fabra
  - Mutacions
  - Barcelona
---

## Why a framework

Live.Muse started as a question about gesture. A controller in a live set usually does one
thing, decided in rehearsal. Here the performer can ask for a new behavior in words, and an
assistant answers with code: one rewrites the visuals, another rewrites the MIDI. The same
framework can run a performance, an installation or a composition session.

## Berlin, then Barcelona

The first experiments came out of a residency at Petersburg Art Space in Berlin in the autumn
of 2024. That December, Live.Muse was formally conceived and presented at the Generative Music
workshop at Universitat Pompeu Fabra in Barcelona, led by Valerio Velardo and Xavier Serra.

## How it plays

The monome grid sends control input to Processing, which draws the visuals and sends OSC
events on to Sonic Pi. Sonic Pi synthesizes and sends MIDI to Ableton Live, which holds the
multitrack audio. The visuals are built as visual stems, full screen scenes that can be layered
and triggered like parts of a track, and the music fuses live code with original compositions
and audio assets from the artist's own library.

## On stage and in the gallery

Through 2025 the framework was iterated for academic and performance settings: a presentation
at Innovation Lab in Utrecht in June, a talk at the Mutacions Festival in Terrassa in
September, and a talk at dorkbot London in November. In December 2025 it was built as an
installation in Barcelona, funded by a Mutacions artistic production grant, and documented as a
full audiovisual album in 4K, with a separate spatial audio mix.

## What came next

Windchime grew out of this work, adapting parts of the Live.Muse stem library and code. The two
are separate works: Windchime replaces the assistants with retrieval over audio language model
embeddings and runs unattended, for visitors who speak rather than perform.
