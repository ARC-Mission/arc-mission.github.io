---
layout: distill
title: "The Data Wall"
subtitle: "Transformer scaling was a bet on abundant data. That bet is being called."
eyebrow: "Position · Scaling"
author: "ARC-M Team"
affiliation: "ARC-M · TUM"
date: "June 10, 2026"
slug: "the-data-wall"
summary: "The transformer's superpower was eating the internet — and it has now essentially eaten it. We walk through the scaling-law evidence that the binding constraint has shifted from compute to data, why the usual escape hatches (repeat, synthesize, scrape harder) only buy time, and why this is an architectural problem rather than a supply problem."
abstract: "For five years the dominant strategy in machine learning has been to make transformers larger and feed them more text. The scaling laws that justified this are real, but they have a term most summaries omit: data. Compute-optimal training requires tokens to grow in step with parameters, and the stock of high-quality human text is finite. Recent estimates place its effective exhaustion within this decade. Repeating data, generating synthetic data, and scraping more aggressively each push the wall back by a few years at most, and some carry their own degradation. We argue the conclusion is not 'scaling is over' but rather 'scaling on a frozen, context-bounded architecture is over' — which reframes the data wall as a reason to change the architecture, not to abandon learning at scale."
---

In 2020 the recipe for a better language model became refreshingly simple: add parameters, add compute, add data, and loss falls along a smooth power law <a class="cite" href="#ref-1">1</a>. That predictability is what unlocked the last half-decade of capital. You could write a check for a training run and forecast the result.

The recipe had three ingredients, and the public conversation collapsed them into one — compute. But the original scaling laws were explicit that data is a separate, co-equal term, and the field's own course-correction made that impossible to ignore.

## Chinchilla moved the bottleneck

DeepMind's 2022 *Compute-Optimal* result — "Chinchilla" — showed that the large models of the day were badly **undertrained** <a class="cite" href="#ref-2">2</a>. For a fixed compute budget, parameters and training tokens should scale in roughly equal proportion; the rule of thumb that emerged was on the order of twenty tokens per parameter. A 70B-parameter Chinchilla trained on 1.4 trillion tokens beat the 280B-parameter Gopher trained on far fewer.

<aside class="margin-note">
<span class="mn-label">Why it matters</span>
Chinchilla didn't make data a smaller problem — it made data the <em>primary</em> problem. Every additional unit of useful compute now demands a proportional unit of fresh tokens.
</aside>

The headline was "smaller models can be better." The consequence, less discussed, was that **every future unit of compute now comes with a data invoice.** You cannot spend your way past the bottleneck with more GPUs alone; compute-optimal scaling requires the token count to rise with the parameter count. The question becomes unavoidable: how many high-quality tokens exist?

## How much text is there, really?

The most careful public attempt to answer this comes from Epoch AI <a class="cite" href="#ref-3">3</a>. Estimating the stock of human-generated public text and projecting training-set growth, they conclude that the usable stock will be **effectively exhausted within this decade** — with central estimates clustering around 2026–2032 depending on how aggressively data is reused. The frontier is not approaching the wall; it is already scraping along it.

<figure>
<svg viewBox="0 0 640 260" role="img" aria-label="Two curves: a flattening stock of human text and an exponentially rising data demand, crossing around the late 2020s." style="width:100%;height:auto;background:#0a0a0a;border:1px solid #262626;border-radius:0.5rem;">
  <line x1="56" y1="20" x2="56" y2="210" stroke="#404040" stroke-width="1"/>
  <line x1="56" y1="210" x2="612" y2="210" stroke="#404040" stroke-width="1"/>
  <!-- stock of text: flattening (logistic) -->
  <path d="M56,170 C200,150 320,120 612,108" fill="none" stroke="#737373" stroke-width="2.5"/>
  <!-- demand: exponential -->
  <path d="M56,205 C320,200 470,150 600,40" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
  <!-- crossing marker -->
  <circle cx="544" cy="112" r="4" fill="#60a5fa"/>
  <text x="470" y="96" fill="#93c5fd" font-size="12" font-family="ui-monospace,Menlo,monospace">demand &gt; supply</text>
  <text x="120" y="142" fill="#a3a3a3" font-size="12" font-family="ui-monospace,Menlo,monospace">stock of human text</text>
  <text x="64" y="34" fill="#93c5fd" font-size="12" font-family="ui-monospace,Menlo,monospace">training-set size</text>
  <text x="300" y="232" fill="#737373" font-size="11" font-family="ui-monospace,Menlo,monospace">time →</text>
</svg>
<figcaption>Schematic. The stock of high-quality human text grows roughly with population and digitization — slowly and saturating. Compute-optimal training-set size grows with the compute being deployed — far faster. The two were never going to stay compatible; the only question was the crossing date.</figcaption>
</figure>

## The escape hatches buy years, not decades

Three responses are usually offered. Each helps, none dissolves the constraint.

**Repeat the data.** Muennighoff et al. studied training in the data-constrained regime directly and found that repeating a corpus for up to roughly four epochs is nearly as good as fresh tokens <a class="cite" href="#ref-4">4</a>. That is a genuine and useful result — but it is a constant-factor reprieve. Past a handful of epochs the marginal value of another pass decays toward zero. Four epochs is a one-time multiplier, not a new supply curve.

<aside class="margin-note">
<span class="mn-label">The trap</span>
Repetition multiplies a finite stock by a constant. Synthetic data risks feeding the model its own distribution. Neither produces genuinely new information about the world.
</aside>

**Generate synthetic data.** Promising for narrow, verifiable domains (math, code) where a checker provides ground truth. But training a model on the unfiltered output of models degrades it: Shumailov et al. show that recursive training on generated data causes **model collapse**, with tails of the distribution disappearing first <a class="cite" href="#ref-5">5</a>. Synthetic data can re-package what a model already knows; it cannot conjure new information about a world it has never observed.

**Scrape harder.** Multimodal corpora, transcribed video, and more languages extend the runway. But these are still the same kind of artifact — a static, human-produced record of the past, scraped once and frozen into weights.

## The constraint is structural, not logistical

Here is the reframe. The shortage is not of *information in the world* — the world produces an unimaginable amount every second. The shortage is of information **in the format this architecture can consume**: pre-existing, human-authored, batch-collected text.

That last clause is the real constraint, and it is a property of the architecture, not of the planet. A transformer is trained once on a fixed corpus and then frozen at deployment. It cannot turn the experience it generates while running — the actions it takes, the corrections it receives, the outcomes it observes — back into learning. So the only data it can ever use is data that already existed before training began. The well is dry because we built a machine that can only drink from wells.

This is why we read the data wall not as an obituary for scale, but as a specification for what comes next. The lesson of the last decade — that general methods riding more computation win <a class="cite" href="#ref-6">6</a> — still holds. What has to change is the *source of experience*: from a finite archive of human text to the open-ended, continuously generated stream of an agent acting in the world <a class="cite" href="#ref-7">7</a>. The systems already exist that produce that stream — every robot on a line, every agent doing a task <a class="cite" href="#ref-8">8</a>. What is missing is an architecture that can learn from it as it arrives.

That architecture — bounded in state, continual in learning — is the subject of the [companion post](/blog/2026/06/18/finite-state-continual-learning/).

---

<div class="references">

## References

<ol>
<li id="ref-1">Kaplan, J., McCandlish, S., Henighan, T., et al. (2020). <em>Scaling Laws for Neural Language Models.</em> arXiv:2001.08361.</li>
<li id="ref-2">Hoffmann, J., Borgeaud, S., Mensch, A., et al. (2022). <em>Training Compute-Optimal Large Language Models</em> (Chinchilla). arXiv:2203.15556.</li>
<li id="ref-3">Villalobos, P., Ho, A., Sevilla, J., Besiroglu, T., Heim, L., &amp; Hobbhahn, M. (2024). <em>Will We Run Out of Data? Limits of LLM Scaling Based on Human-Generated Data.</em> Epoch AI. arXiv:2211.04325.</li>
<li id="ref-4">Muennighoff, N., Rush, A. M., Barak, B., et al. (2023). <em>Scaling Data-Constrained Language Models.</em> NeurIPS. arXiv:2305.16264.</li>
<li id="ref-5">Shumailov, I., Shumaylov, Z., Zhao, Y., Gal, Y., Papernot, N., &amp; Anderson, R. (2024). <em>AI Models Collapse When Trained on Recursively Generated Data.</em> Nature 631, 755–759.</li>
<li id="ref-6">Sutton, R. (2019). <em>The Bitter Lesson.</em></li>
<li id="ref-7">Silver, D., &amp; Sutton, R. (2025). <em>Welcome to the Era of Experience.</em></li>
<li id="ref-8">Open X-Embodiment Collaboration (2024). <em>Open X-Embodiment: Robotic Learning Datasets and RT-X Models.</em> ICRA. arXiv:2310.08864.</li>
</ol>

</div>
