---
title: Boot-time visual runtime selector and a Three.js scene set
product: windchime
version_or_label: visual-runtime-selector
date: 2026-07-16
status: shipped
summary: >-
  The visuals app now offers two selectable runtimes at boot, the current p5 system
  and an experimental Three.js runtime behind the same host interface, and the Three
  runtime gained the full ported family corpus plus a set of original 3D scenes.
customer_value: >-
  The piece can be shown on either renderer for a direct fidelity comparison, one
  runtime per session, with no change to hardware behaviour or interaction, so the
  choice is purely about how it looks.
included_work:
  - A full-screen runtime selector before any renderer or audio init, with a URL parameter to pin it for kiosk boots
  - A second host implementation sharing the existing host contract (params, LED flush, mount semantics)
  - The p5 family corpus ported to Three.js siblings, plus original 3D scenes
  - Per-runtime dynamic imports, so a session loads only the runtime it selected
notable_risks:
  - The newest scenes still await an in-person audition and per-family fidelity tuning
  - A physical-hardware pass is pending for the latest scenes, so far verified only through the on-screen twin
followups:
  - Audition the new scenes on the rig and tune idle framing and exposure per family
tags: [visuals, rendering, three-js]
---

Two renderers now sit behind one contract, chosen at boot, so the same installation
can be compared side by side on p5 and Three.js. The Three runtime reuses the p5
host semantics rather than forking them, which is what keeps the comparison honest.
