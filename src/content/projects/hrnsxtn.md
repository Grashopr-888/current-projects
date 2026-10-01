---
title: HRNSXTN x RDMSXN
summary: >-
  Team THIRI's project from a two podium weekend at the Music Hackspace × MUTEK
  hackathon in Montréal: a voice leading harmonizer that fits a stompbox, and a
  latent granular instrument where a folder of recordings becomes a playable sound world: whatever you play comes back one bar later, revoiced through
  that corpus. Both live on the Elk Stomp, a screenless embedded pedal.
status: active
timeframe: August 2026 to present
role: Audio ML (on a four person team), then solo on the embedded port
collaborators:
  - Dennison Blackett
  - Radu-Alex Ceban
  - Jazz Calls Home
thesis: >-
  A neural model too big for a device does not have to shrink; it has to think
  less often. Run the heavy model offline, distill its judgment into something
  tiny, and put decisions at 10 Hz so the audio thread only ever plays real
  recordings.
problem: >-
  The instrument was built around music2latent, a 58M parameter neural codec
  that measures slower than real time on a laptop CPU, and the target is a
  pedal with two 800 MHz cores, no neural accelerator, no PyTorch runtime for
  its architecture, and a hard 1.333 ms deadline on every audio callback. The
  team's hackathon plugin loaded on the board and averaged 6.8% of that budget,
  then peaked at 1302% and glitched: the deadline is per callback peak, not
  average. The port is therefore an architecture problem, not an optimization problem: which decisions genuinely need the network, and when.
audience: >-
  Performers who want a corpus of their own recordings under their hands with
  no laptop on stage, and embedded audio developers asking what ML honestly
  fits on hardware with no NPU.
constraints:
  - 'A hard realtime budget: 64 samples per callback at 48 kHz, 1.333 ms, on two Cortex-A7 cores without out of order execution'
  - No neural accelerator, and no PyTorch/LibTorch runtime exists for 32 bit armv7 at all
  - 'No screen, no menus: the challenge brief was knobs, encoders, and a footswitch, played by feel'
  - Nothing may allocate, lock, or make a syscall on the audio thread (the dual kernel OS turns violations into audible glitches)
  - The embedded C++ must reproduce the Python research instrument exactly; its selections are the sound
outcomes:
  - '1st place, Elk Audio Challenge; 2nd place, Roland Future Design Lab Challenge (Music Hackspace × MUTEK, Montréal 2026)'
  - 'Accepted to the ISMIR 2026 Late-Breaking Demo session (Abu Dhabi, November 2026); code, board logs and notebooks are public'
  - 58M parameter codec replaced at the input by a distilled 103k parameter student (560× smaller) that keeps its similarity ordering (Spearman ρ .83)
  - 'Runs on the Elk Stomp itself, no laptop in the signal path: the student takes about 1% of each 93 ms analysis, and every analysis finished on time'
  - An 8 bit matching table made the corpus search 2.6 to 3.1 times faster with the ordering unchanged; golden parity held at 200/200 identical grain selections
  - The team's posthackathon fix put five harmony voices on the pedal at 0.59× of the deadline (a ~50× per voice saving, and it follows the player's intonation)
  - Two latent defects found in the platform's open source audio engine by reading its source
public_visibility_note: >-
  The research code, board logs and notebooks behind the ISMIR 2026 paper are
  public; the team's hackathon source and the corpora stay private. Event,
  sponsor and venue marks appear for attribution and imply no endorsement.
featured: true
order: 3
tech:
  - Elk Stomp (STM32MP157)
  - Elk Audio OS / SUSHI
  - JUCE 8 (VST3)
  - PyTorch
  - music2latent
  - RTNeural
  - gRPC / OSC / MIDI
languages:
  - C++
  - Python
  - TypeScript
  - Shell
---

## The opportunity

The Elk Audio brief at MUTEK was blunt: no laptop, no menus, an instrument you work by feel.
The Roland Future Design Lab brief asked for a neural model treated as something performable.
Both are the same question from different sides: what does machine learning look like when it
has to live in a musician's hands rather than in a browser tab? Team THIRI entered both
challenges and placed in both. The instrument on this page is my half of that answer (a corpus player where the intelligence chooses real recordings instead of synthesizing new ones), and the engineering that follows is what it took to make that honest on a pedal.

## How it works, at the boundary

A folder of recordings is embedded once, offline, by music2latent into 64 dimensional frames
at 10.7 Hz, and packed with its audio into a single memory mappable file. On the pedal, live
input becomes mel frames; a distilled student network predicts where the big model would have
placed them; cosine matching with temperature sampling picks corpus grains; and the audio
thread plays those grains back (real recordings, windowed and crossfaded) one bar behind
your playing. The latency is not hidden. It is the instrument's character: you play, and the
room answers.

## What I chose, and why

Three calls, each a decision record below. First, the model was never compressed; the decisions moved: offline precomputation, a 560×-smaller distilled student, inference at the
10.7 Hz decision rate instead of the 48 kHz audio rate. Second, the neural decoder was deleted
rather than shrunk: playback is real corpus audio, which keeps the sound accountable and cost
nothing the ear could keep. Third, equivalence over elegance: the C++ port is held to
bit identical grain selection against the Python reference, and the one divergence the parity
harness caught was resolved in the reference's favor, because its quirk is part of the sound.

## Proven before the hardware, then on it

The riskiest question, whether cheap matching still feels like the big model's taste, was answered before any hardware was touched. The finding that reframed it: at performance
settings the original instrument agrees with itself on only 2.6% of picks across seeds, so
the right measure is regret, and the student lands in the teacher's top 4–7% of candidates
(a raw MFCC baseline fails outright at 15–18%). In September the instrument went onto the pedal
itself, every analysis stage was timed on the board, and the study became a Late-Breaking Demo
accepted at ISMIR 2026. What remains open is a blind listening verdict. The prototyping before the hackathon (the studio interface with its live map of 17,000 grains) is in the research notes below.
