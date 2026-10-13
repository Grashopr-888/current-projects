---
term: 'Embedding caching'
area: methods
definition: >-
  Running a frozen model over the data once and storing its outputs, so later training reads
  features instead of recomputing them. The thesis ran frozen PaSST on every batch, so
  caching is its clearest speedup; Windchime and HRNSXTN embed their corpora once, offline.
related: [probing, distributed-data-parallel, music2latent]
---
