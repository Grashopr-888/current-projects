---
title: Feeder poll loop wedged the live trigger path
product: lichtspiel
date: 2026-06-15
severity: sev2
status: resolved
summary: >-
  The Ableton feeder process could stall so that live state stopped reaching the bridge and no
  scene-launch or locator-crossing triggers fired, leaving the visuals unresponsive while Live
  was still playing.
impact: >-
  With the trigger path stalled, the visuals stopped following the set even though the music
  played on. For a live instrument this is a show-stopping failure of the core loop.
detection: >-
  Seen in the bridge log: only the OSC-sourced live state arrived and never the feeder source,
  and no scene-launched or locator-crossed events fired despite active playback.
response: >-
  Traced the stall to the feeder's polling loop, added a self-healing timeout, and documented a
  manual restart as an immediate mitigation if it ever recurred.
root_cause: >-
  A poll-loop wedge. A read against the control socket collided with the bridge's own snapshot
  query, the interleaved bytes never parsed, the inactivity timeout never fired, and the loop
  stayed stuck in a busy state.
fix: >-
  The feeder's Ableton read now has an absolute settle timeout so it self-heals from a wedged
  read. If it ever recurs, stopping and restarting the feeder process clears it.
followup_actions:
  - action: Watch for recurrence now that the read has an absolute settle timeout
    status: open
  - action: Keep Session scene launches as the reliable trigger where locator crossings are suppressed
    status: done
blameless_note: >-
  Two independent readers sharing one control socket is a subtle race that only shows up under
  live timing. Adding a self-healing timeout and a documented manual recovery is a proportionate,
  honest response to an intermittent hang.
tags: [feeder, ableton, reliability, polling]
---

This is the kind of failure that only appears under live timing, which is why the fix is defensive rather than clever: an absolute timeout that recovers on its own, plus a one-line manual restart. The trigger path is the core loop, so its resilience matters more than its elegance.
