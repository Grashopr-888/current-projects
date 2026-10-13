---
term: Knowledge distillation
product: hrnsxtn
definition: >-
  A post training method: a small student model learns to reproduce a large pretrained
  teacher's outputs instead of learning from labels. HRNSXTN uses feature distillation: a
  103k parameter student regresses music2latent's 64 dim latents from one log mel frame (MSE
  plus a cosine term), 560× smaller and cheap enough for a pedal with no neural accelerator.
related: [post-training, quantization, spearman-rank-correlation, music2latent, embedding-space]
---
