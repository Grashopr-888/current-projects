---
title: A closed kiosk page could leave the audio gate stuck
product: windchime
date: 2026-07-12
severity: sev2
summary: >-
  If the kiosk page died or was closed during a showcase, a shared phase gate could
  stay latched, leaving the installation's audio in the wrong state for the next
  visitor.
impact: >-
  On an unattended kiosk this could strand the piece in a stuck phase with no operator
  present to clear it, which defeats the whole point of a self-resetting visitor
  lifecycle.
detection: >-
  Found by the synthetic-visitor soak, which drives hundreds of sessions and exercises
  abrupt page exits that manual testing rarely reaches.
response: >-
  Added an explicit reset on the normal exit path and a best-effort reset that still
  fires while the page is being torn down.
root_cause: >-
  The phase gate was only cleared on a graceful showcase exit. A page that was closed
  or crashed never sent that signal, so the gate could remain latched.
fix: >-
  The controller posts an idle phase on showcase exit, and the page fires a page-hide
  beacon to a reset endpoint, so a dying page cannot leave the gate stuck. A beacon is
  used because it survives the page being torn down, where an ordinary request would
  not.
followup_actions:
  - action: Keep the page-hide reset covering future kiosk auto-boot paths
    status: open
status: resolved
blameless_note: >-
  Abrupt page death is exactly the kind of edge a long unattended run hits and a short
  manual test misses. The soak surfacing this before exhibition is the intended payoff,
  not a failing.
tags: [reliability, kiosk, lifecycle]
---

A reliability fix the soak paid for. Because a crashed page never runs its normal
cleanup, the recovery had to ride a page-hide beacon, the one signal that still fires
as the page goes away.
