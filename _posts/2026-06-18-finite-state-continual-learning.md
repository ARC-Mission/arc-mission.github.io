---
layout: distill
title: "Finite-State Models for Continual Learning"
subtitle: "If the next data frontier is a stream, the model has to be a learner in the loop — not a frozen archive of the past."
eyebrow: "Position · Architecture"
author: "ARC-M Team"
affiliation: "ARC-M · TUM"
date: "June 18, 2026"
slug: "finite-state-continual-learning"
summary: "The companion to 'The Data Wall.' We argue that the architecture that learns from the world's operational stream needs two properties transformers structurally lack: a bounded internal state and an online update rule. We connect three live research threads — structured state-space models, learning at test time, and the plasticity/forgetting problem — into a single bet: finite-sized state models that keep learning after deployment without catastrophically forgetting."
abstract: "A transformer is frozen at deployment: its weights are fixed and its context window is a sliding buffer that forgets the moment it fills. That is exactly the wrong shape for learning from a continuous stream of experience. We make the case for finite-sized state models — architectures with a bounded internal state that is updated online from the model's own interaction with the world. We ground each claim in recent work: structured state-space models (S4, Mamba) show that a constant-size recurrent state can match attention on long sequences at linear cost; test-time-training and memory-at-test-time methods (TTT, Titans) show that the recurrent state can itself be a fast learner that updates during inference; and continual-learning research (EWC, and the loss-of-plasticity results of Dohare et al.) shows that the central obstacle is no longer representation but stability — keeping old skills while acquiring new ones. The synthesis is a single architectural bet, and a falsifiable benchmark to test it."
---

The previous post ended on a claim: the data wall is structural, not logistical. The information exists — it is generated every second by agents and robots acting in the world — but transformers cannot consume it, because a transformer only ever learns from a static corpus assembled before training. To learn from a *stream*, you need a different shape of model. This post is about that shape.

## Two properties a stream-learner must have

Start from what a transformer is. Attention compares every token to every other token <a class="cite" href="#ref-1">1</a>. This gives two properties that are virtues for one-shot generation and liabilities for continual learning:

1. **The state grows without bound.** "Memory" is the context window — a buffer of past tokens. Cost grows quadratically with its length, and once it fills, the oldest content is simply dropped. There is no mechanism to *consolidate* what scrolled off; it is gone.
2. **The weights are frozen at deployment.** All learning happens during pre-training. At inference the model adapts only within the context window, and that adaptation evaporates when the session ends. What the model does, the corrections it receives, the outcomes it sees — none of it updates the model.

<aside class="margin-note">
<span class="mn-label">The shape we need</span>
Bounded state, so cost stays constant as experience accumulates. Online update, so experience is written into the model instead of scrolling out of a buffer.
</aside>

A model that learns from an unbounded operational stream needs the opposite of both: a **bounded internal state** whose cost does not grow with the length of experience, and an **online update rule** that folds new experience into the model permanently. Call a model with these two properties a *finite-sized state model*. Three research threads, usually discussed separately, are each solving one piece of it.

## Thread 1 — A constant-size state can be enough (S4, Mamba)

The first objection is that you cannot compress an arbitrarily long history into a fixed-size state without crippling the model. Structured state-space models are the counter-evidence. S4 reframed sequence modeling as a linear state-space recurrence with a cleverly parameterized transition, and matched or beat attention on long-range benchmarks while scaling **linearly** in sequence length <a class="cite" href="#ref-2">2</a>. Mamba added input-dependent (selective) state transitions, letting the model choose what to keep and what to forget, and reached transformer-quality language modeling with a recurrent, constant-memory inference path <a class="cite" href="#ref-3">3</a>.

<figure>
<svg viewBox="0 0 640 240" role="img" aria-label="Left: a transformer whose context buffer grows token by token. Right: a recurrent model with a single fixed-size state box updated by each input." style="width:100%;height:auto;background:#0a0a0a;border:1px solid #262626;border-radius:0.5rem;">
  <!-- transformer side -->
  <text x="40" y="34" fill="#737373" font-size="12" font-family="ui-monospace,Menlo,monospace">transformer: context grows</text>
  <rect x="40" y="60" width="26" height="26" fill="none" stroke="#525252"/>
  <rect x="70" y="60" width="26" height="26" fill="none" stroke="#525252"/>
  <rect x="100" y="60" width="26" height="26" fill="none" stroke="#525252"/>
  <rect x="130" y="60" width="26" height="26" fill="none" stroke="#525252"/>
  <rect x="160" y="60" width="26" height="26" fill="none" stroke="#525252"/>
  <rect x="190" y="60" width="26" height="26" fill="none" stroke="#525252" stroke-dasharray="3 3"/>
  <text x="222" y="78" fill="#737373" font-size="18">…</text>
  <text x="40" y="120" fill="#737373" font-size="11" font-family="ui-monospace,Menlo,monospace">cost ∝ length²  ·  oldest dropped</text>
  <!-- divider -->
  <line x1="300" y1="40" x2="300" y2="200" stroke="#262626" stroke-width="1"/>
  <!-- finite-state side -->
  <text x="330" y="34" fill="#93c5fd" font-size="12" font-family="ui-monospace,Menlo,monospace">finite state: bounded</text>
  <rect x="470" y="70" width="64" height="64" fill="#0f1f3a" stroke="#60a5fa" stroke-width="2"/>
  <text x="486" y="107" fill="#93c5fd" font-size="13" font-family="ui-monospace,Menlo,monospace">state</text>
  <!-- inputs feeding the state -->
  <path d="M340,102 L466,102" fill="none" stroke="#525252" stroke-width="1.5" marker-end="url(#a)"/>
  <path d="M502,150 C502,175 502,175 502,150" fill="none" stroke="#60a5fa"/>
  <path d="M534,102 C575,102 575,150 502,150" fill="none" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="330" y="160" fill="#737373" font-size="11" font-family="ui-monospace,Menlo,monospace">xₜ →</text>
  <text x="360" y="195" fill="#737373" font-size="11" font-family="ui-monospace,Menlo,monospace">cost ∝ length  ·  state updated in place</text>
  <defs>
    <marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#60a5fa"/></marker>
  </defs>
</svg>
<figcaption>The structural contrast. A transformer re-attends over an ever-growing buffer (left). A state-space / recurrent model carries a single bounded state updated by each input (right) — the prerequisite for learning from a stream of unbounded length at constant cost.</figcaption>
</figure>

This settles the first property. A constant-size state, done right, is not a bottleneck — it is competitive. But an off-the-shelf Mamba is still *trained once and frozen*. Its recurrent state is a fast memory of the current sequence, not a place where lasting learning accumulates. That is the second thread.

## Thread 2 — The state can be a learner (test-time learning)

The recent and more radical idea is to make the model's internal state update *itself* during inference, by running a learning step on the data it is currently seeing. In Test-Time Training layers, the hidden state is the weights of a small model, and the recurrence's update rule is literally a gradient step — so the longer the model runs, the more it has learned from the stream, all at inference time <a class="cite" href="#ref-4">4</a>. Titans builds a neural long-term memory module that learns *what to memorize* at test time and reads it back, scaling to very long contexts while keeping a bounded, updatable store <a class="cite" href="#ref-5">5</a>.

<aside class="margin-note">
<span class="mn-label">The turn</span>
In these methods the boundary between "training" and "inference" dissolves. The forward pass <em>is</em> a learning step. That is the mechanism by which a stream stops evaporating.
</aside>

This is the conceptual hinge of the whole program: **the forward pass becomes a learning step.** Experience is not buffered and discarded; it is written into the state as it arrives. This is what "continual" has to mean architecturally — not periodic re-training in a lab, but learning in the loop, online.

## Thread 3 — The hard problem is stability, not capacity

If updating online were free, this would already be solved. It is not, and the obstacle has a name. Neural networks trained sequentially on new data overwrite old knowledge — **catastrophic forgetting**, identified in connectionist models decades ago <a class="cite" href="#ref-6">6</a> and still the central failure mode of continual learning. Elastic Weight Consolidation showed forgetting can be mitigated by slowing changes to weights important for previous tasks, anchoring them with a quadratic penalty <a class="cite" href="#ref-7">7</a> — a real advance, but a partial one.

Worse, the problem is not only forgetting what you knew; it is losing the *ability to keep learning at all*. Dohare et al. demonstrated in **Nature** that standard deep networks trained continually suffer a steady **loss of plasticity** — units saturate, effective rank collapses, and the network gradually stops being able to learn new things — and that targeted interventions (continually re-injecting diversity into the weights) are needed to preserve it <a class="cite" href="#ref-8">8</a>. Any architecture that claims to learn forever has to answer this directly.

<aside class="margin-note">
<span class="mn-label">Why this is the bet</span>
Bounded state and online updates are increasingly off-the-shelf. Doing both <em>without</em> catastrophic forgetting or plasticity collapse is the unsolved core — so that is exactly where a new architecture has to earn its keep.
</aside>

So the bet is precise. The first two threads — bounded state and test-time updates — are maturing fast. The unsolved core is stability under an endless update stream: retaining old skills, preserving plasticity for new ones, all within a fixed-size state. That is the problem a finite-state continual learner is *built around*, not a feature bolted on afterward.

## What it unlocks: data that compounds

Why is this worth a company rather than a paper? Because solving it inverts the data economics of the previous post. World-model research already shows that an agent can learn a compact, predictive internal model of its environment and improve by acting within it <a class="cite" href="#ref-9">9</a>, including across many distinct domains from a single configuration <a class="cite" href="#ref-10">10</a>. Couple that with online, non-forgetting updates and the operational stream stops evaporating: every robot, every shift, every correction makes the system better, and the data **compounds** instead of resetting to zero. The moat is not a single trained model — it is a self-improving system fed by a data source that frozen architectures cannot reach.

## A falsifiable first step

Conviction is cheap; the bet has to be testable. The near-term target we hold ourselves to: a finite-state model that learns continually on an embodied or operational task and **beats two baselines at once** — a long-context model given the same history in its window, and a model that is periodically fine-tuned offline — while holding compute and state size bounded. Concrete, adversarial, and fast to falsify. If a bounded-state online learner cannot beat "just make the context longer" and "just re-train monthly," the thesis is wrong and we want to know early.

That is the whole program in one line: **the architecture every robot and agent ships with once the transformer era ends.** The data wall says the old source is exhausted. This is the model built for the source that isn't.

---

<div class="references">

## References

<ol>
<li id="ref-1">Vaswani, A., Shazeer, N., Parmar, N., et al. (2017). <em>Attention Is All You Need.</em> NeurIPS. arXiv:1706.03762.</li>
<li id="ref-2">Gu, A., Goel, K., &amp; Ré, C. (2022). <em>Efficiently Modeling Long Sequences with Structured State Spaces</em> (S4). ICLR. arXiv:2111.00396.</li>
<li id="ref-3">Gu, A., &amp; Dao, T. (2023). <em>Mamba: Linear-Time Sequence Modeling with Selective State Spaces.</em> arXiv:2312.00752.</li>
<li id="ref-4">Sun, Y., Li, X., Dalal, K., et al. (2024). <em>Learning to (Learn at Test Time): RNNs with Expressive Hidden States.</em> arXiv:2407.04620.</li>
<li id="ref-5">Behrouz, A., Zhong, P., &amp; Mirrokni, V. (2025). <em>Titans: Learning to Memorize at Test Time.</em> arXiv:2501.00663.</li>
<li id="ref-6">McCloskey, M., &amp; Cohen, N. J. (1989). <em>Catastrophic Interference in Connectionist Networks: The Sequential Learning Problem.</em> Psychology of Learning and Motivation, 24, 109–165.</li>
<li id="ref-7">Kirkpatrick, J., Pascanu, R., Rabinowitz, N., et al. (2017). <em>Overcoming Catastrophic Forgetting in Neural Networks</em> (EWC). PNAS, 114(13). arXiv:1612.00796.</li>
<li id="ref-8">Dohare, S., Hernandez-Garcia, J. F., Lan, Q., Rahman, P., Mahmood, A. R., &amp; Sutton, R. S. (2024). <em>Loss of Plasticity in Deep Continual Learning.</em> Nature, 632, 768–774.</li>
<li id="ref-9">Ha, D., &amp; Schmidhuber, J. (2018). <em>World Models.</em> NeurIPS. arXiv:1803.10122.</li>
<li id="ref-10">Hafner, D., Pasukonis, J., Ba, J., &amp; Lillicrap, T. (2023). <em>Mastering Diverse Domains through World Models</em> (DreamerV3). arXiv:2301.04104.</li>
</ol>

</div>
