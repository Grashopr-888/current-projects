---
term: 'Distributed data parallel (DDP)'
area: methods
definition: >-
  Training one model on several GPUs at once: each holds a copy, takes a slice of every
  batch, and gradients are averaged across them. The thesis ran one GPU per run on A100s and
  L4s; DDP is how the same runs scale.
related: [mixed-precision, embedding-caching]
---
