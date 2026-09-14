---
title: Boot time visual runtime selector, with Three.js scenes
product: windchime
version_or_label: visual-runtime-selector
date: 2026-07-16
status: shipped
summary: >-
  Beside p5, one runtime per session.
customer_value: >-
  A direct fidelity comparison; hardware and interaction unchanged.
included_work:
  - Selector before renderer or audio init
  - URL pin for kiosk boots
  - Second host sharing params, LED flush, mount
  - p5 families ported to Three.js
  - Original 3D scenes
  - Per runtime dynamic imports
notable_risks:
  - Newest scenes need audition and tuning
  - Hardware pass pending; twin verified only
followups:
  - Audition the new scenes on the rig and tune idle framing and exposure per family
tags: [visuals, rendering, three-js]
---

Two renderers now sit behind one contract, chosen at boot, so the same installation
can be compared side by side on p5 and Three.js. The Three runtime reuses the p5
host semantics rather than forking them, which is what keeps the comparison honest.
