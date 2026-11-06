---
title: Meteora
summary: >-
  A reverb whose space is a real landscape: the rock pillars and monasteries of Meteora,
  Greece, computed from open elevation and map data. Two microphones move through the
  valley, every cliff answers at its real distance, and version 0.3 listens to the player
  and can answer back. Free for macOS, released for ADC 2026.
status: active
timeframe: October 2026 to present
role: Solo, from the acoustic model to the plugin and its interface
thesis: >-
  Can a reverb's space be a place you move through rather than a room you pick? Meteora
  computes every echo from open terrain data, so distance, direction and air are physical,
  and it says so whenever it leaves the physics.
problem: >-
  Reverbs model rooms or hardware units. A landscape behaves differently: a cliff 300 m
  away answers after about 1.75 s, from its own direction, through air that changes with
  the weather. No survey or recording of the site exists, so the model has to come from
  open data (30 m satellite elevation and OpenStreetMap) and stay honest about what is
  estimated.
audience: >-
  Guitarists, producers and sound designers who want space as an instrument, and audio
  developers curious about geometric acoustics inside a realtime plugin.
constraints:
  - 'Open data only: Copernicus 30 m elevation and OpenStreetMap; no fieldwork and no measured impulse responses'
  - Zero latency and no heap use on the audio thread; the landscape is traced again on a worker whenever a microphone moves
  - 'A UNESCO World Heritage Site and a living monastic community: released free, framed as a simulation, not affiliated with the monasteries'
  - 'No budget for signing: the build is signed ad hoc and not notarized, so installing it takes one Terminal line'
  - Each version installs as its own plugin, so a saved session never changes its sound
outcomes:
  - Released free for macOS on Apple Silicon (VST3 and Standalone) for ADC 2026, Bristol
  - Echoes from about 57,000 surface patches of a 5 m terrain model, with air absorption after ISO 9613-1 for temperature, humidity and wind
  - 'A listener (attacks, density, brightness, pitch, noisiness) and a guide that suggests or makes changes, from subtle to drastic, for about one point of a CPU core'
  - Passes pluginval at strictness 10 and Steinberg's VST3 validator (47 of 47), with no allocations on the audio thread under address, thread and realtime sanitizers
  - 41 factory presets, 106 automatable parameters and a LEARN mode that explains every control
public_visibility_note: >-
  Meteora is closed source freeware: the plugin, its README and its notices are public;
  the source, the research notes and the design documents stay private. Event marks appear
  for attribution and imply no endorsement.
featured: true
order: 4
tech:
  - C++ / JUCE 9
  - VST3 and Standalone
  - WebView interface (TypeScript, three.js)
  - Python acoustics pipeline
  - Embree ray tracing
  - Copernicus DEM GLO-30
  - OpenStreetMap
languages:
  - C++
  - TypeScript
  - Python
  - CMake
  - Shell
skills:
  - Geometric room acoustics
  - Realtime DSP (JUCE)
  - Convolution and partitioned tails
  - Geospatial data (DEM, OpenStreetMap)
  - Audio feature extraction
  - WebView plugin interfaces
  - Plugin validation and release
keywords:
  - reverb
  - geometric acoustics
  - ray tracing
  - impulse response
  - outdoor acoustics
  - ISO 9613-1
  - open data
  - Copernicus DEM
  - OpenStreetMap
  - JUCE
  - VST3
  - audio plugin
  - audio descriptors
  - Meteora, Greece
  - ADC 2026
  - Audio Developer Conference
---

## Why a landscape

Most reverbs give you a room. Meteora gives you a valley: conglomerate pillars rising hundreds of meters,
monasteries on their summits, a village at their foot. Sound travels far there and comes back
late, from many directions, and the air between decides how bright it returns. The plugin lets
you place a source and two microphones anywhere in that landscape and hear it answer.

## From open data to an echo

The terrain comes from Copernicus satellite elevation at 30 m, too coarse for the pillars'
walls, so they are sharpened using OpenStreetMap cliff lines and summit heights, and every
change is logged. An offline Python pipeline turns that into a 5 m terrain, about 57,000
acoustic surface patches and a pack the plugin loads. In the plugin, first order echoes are
computed for each microphone's exact position, later reflections are traced on a worker and
become a convolution tail, and the audio thread only plays delay taps and that tail. Every
sound carries the tag "simulated from open data, uncalibrated".

## A reverb that listens

Version 0.3 adds a listener that hears attacks, density, brightness, pitch and noisiness, and
a guide that turns them into suggestions or changes: dense playing can bring the place close,
bright playing can change the air. It never writes host automation, and whenever it moves the
landscape beyond the physics, an EXTREME lamp says so.

## Released for ADC

Meteora 0.3 was released on November 6, 2026 as a free download for the Audio Developer
Conference in Bristol, shared with attendees by QR code. Notarization, an AU for Logic and a
Windows build are the road to 1.0.
