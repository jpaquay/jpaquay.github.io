---
layout: post
title: "No More JSON Tax: A Dual-Path Decision Gateway on Cloud Run"
subtitle: "From Dumas's silent servant Grimaud to Cloud Run /v1/systemone and BigQuery—picking up the thread from Michiel Brinkman's Gemini Decisions API benchmarks and our October dgem switchboard."
description: "Stop paying autoregressive LLM token latency for binary yes/no routing. Deploy a dual-path decision-model gateway on Cloud Run combining Google's managed Gemini Decisions API (gemini-decision-1), self-hosted dgem (/v1/systemone), a Shannon entropy cascade to Gemini 3.8 Flash, and a BigQuery row-shuffling safeguard against table-ordering bias."
date: 2026-11-24 08:30:00 +0100
categories: [AI Agents, Cloud Architecture, BigQuery, Cloud Run, Brussels]
tags: [jerome-paquay, cloud-computing, sre, software-engineering, 2020s, brussels, belgium, europe, gemini, dgem, decision-models, cloud-run, bigquery, ligne-claire]
author: Jerome CG Paquay
image: /assets/img/posts/2026-11-24-decision-model-gateway-cloud-run-hero.webp
heroImage: /assets/img/posts/2026-11-24-decision-model-gateway-cloud-run-hero.webp
cover-img: /assets/img/posts/2026-11-24-decision-model-gateway-cloud-run-hero.webp
thumbnail-img: /assets/img/posts/2026-11-24-decision-model-gateway-cloud-run-hero.webp
share-img: /assets/img/posts/2026-11-24-decision-model-gateway-cloud-run-hero.webp
comments: true
social-share: true
readtime: true
---

> **Quick Answer:** Stop burning generative LLM latency and JSON syntax tokens on closed-set yes/no routing, rubric checks, and severity triage. Serve a dual-path decision gateway on Cloud Run (`--concurrency=15 --cpu-boost`) that returns `0` output tokens via **`gemini-decision-1`** (managed) or **`dgem` / `/v1/systemone`** (self-hosted), escalates only uncertain slices (`Hesitation >= 16%`) to `gemini-3.8-flash`, and shuffles BigQuery inputs (`ORDER BY RAND()`) so table order never fakes your accuracy score.

## Grimaud Walks Into a Brussels Café

If you pedaled along *Rue de la Loi* through a November drizzle this week while balancing your helmet and an extra **espresso doppio**, chances are your LinkedIn feed opened with a delightful literary cameo from my colleague [**Michiel Brinkman**](https://nl.linkedin.com/in/jmbrinkman1980).

In his Saturday Pulse article—[*Stop Paying the JSON Tax: Single-Pass Enterprise RFx & SOW Audits with the Gemini Decisions API*](https://www.linkedin.com/pulse/stop-paying-json-tax-single-pass-enterprise-rfx-sow-audits-brinkman-q3yne/) (with the [accompanying LinkedIn summary](https://www.linkedin.com/posts/jmbrinkman1980_single-pass-gemini-decisions-api-for-enterprise-share-7527300802642886656-reu9/))—Michiel reminded us of the old legend about Alexandre Dumas. Paid *by the line* when serializing *The Three Musketeers* in 1844, Dumas gave Athos a servant named **Grimaud**, a man who answers exclusively in single words.

A few weeks earlier, over an October rainstorm right here in the EU Quarter, I wrote about the exact same reflex in silicon inside our [**`dgem` (`Decision Diffusion Gemma`) switchboard post**](/2026-10-31-dgem-diffusion-gemma-system-one-routing-brussels/): calling a frontier autoregressive model to spit out `{"urgent": "yes", "escalate": true}` character by character is paying a **novelist by the line** to stamp a train ticket.

And three days later, PostHog pushed the exact same verdict onto the front page of Hacker News (**187 points**, 75 comments, `17 Nov 2026`): *Not Everything Needs an LLM*. Then on **19 November**, Michiel dropped the [BigQuery companion thread](https://www.linkedin.com/posts/jmbrinkman1980_bigquery-gemini-dataengineering-share-7529175125922054144-BGLq/) scoring **100,000 rows** with `gemini-decision-1`—catching a classic table-ordering trap that inflated an early accuracy run to a suspicious **`93.7%`**.

This Tuesday edition folds all three threads into one practical **Cloud Run** gateway you can stand up in twelve minutes before the espresso cools.

![Ligne claire hero illustration inside a rainy Brussels Art Nouveau pavilion showing a slow Victorian brass teletype labeled JSON TAX on the left, a bearded engineer holding an espresso doppio beside his folding bike and a pneumatic YES/NO/SCORE switchboard console in the center, emerald 0.02 and PASS capsules exiting right, and one glowing amber ESCALATE capsule rising to a writer on the mezzanine desk](/assets/img/posts/2026-11-24-decision-model-gateway-cloud-run-hero.webp)
*The Schuman pneumatic dispatch pavilion: on the left, the sleepy bronze teletype snail churning curly braces into the `JSON TAX` wicker basket. Center stage, a calm single-pass console reading **`YES` / `NO` / `SCORE`** (`0` output tokens). Green capsules shoot straight down the `0.02` and `PASS` tubes—while the novelist in the quiet upper mezzanine waits only for the single amber `ESCALATE` dossier.*

**Atelier Editorial Note (Series Follow-Up):** This tutorial is the *Tuesday Cloud Run companion* to two earlier posts: (1) my deep dive on [55ms Diffusion Routing with `dgem`](/2026-10-31-dgem-diffusion-gemma-system-one-routing-brussels/) (open-source `DiffusionGemma`), and (2) **Michiel Brinkman's** live benchmarks for the [Gemini Decisions API on RFx & SOW audits](https://www.linkedin.com/pulse/stop-paying-json-tax-single-pass-enterprise-rfx-sow-audits-brinkman-q3yne/) and his [BigQuery 100k-row evaluation note](https://www.linkedin.com/posts/jmbrinkman1980_bigquery-gemini-dataengineering-share-7529175125922054144-BGLq/). Read the [official Python walkthrough on Medium](https://medium.com/google-cloud/getting-started-with-the-gemini-decisions-api-in-python-d2b40093034f) for the baseline SDK quickstart.
{: .box-note}

## The Numbers Side by Side: Michiel's Benchmarks in One Table

Michiel timed **`gemini-decision-1`** (`google-genai >= 3.2`, `v1beta`, `0` output tokens) directly against **`gemini-3.8-flash` JSON schema completion** on a synthetic **21,715-token (77,272-character)** enterprise cloud RFP & SOW package. Note how dramatically output tokens dominate wall-clock latency once a document gets real:

| Audit Workload | Input Tokens | `gemini-decision-1` (0 out tok) | `gemini-3.8-flash` JSON (`thinking=0`) | Speedup vs. JSON | What a Heading Linter Missed |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Standalone SOW** (`7` questions) | `1,761` | **`291 ms`** | `8,768 ms` *(9,335 ms default)* | **`30.2×`** *(32.1× default)* | Valid headings hiding TBD waves |
| **Full RFP Package** (`7` questions) | `21,715` | **`387 ms`** | `6,313 ms` *(15,253 ms default)* | **`16.3×`** *(39.5× default)* | Procurement-date trap (`noul=0.02`, rigor `1.52/3.00`) & uncapped liability (`legal_escalation=0.90`) |
| **53-Row Compliance Matrix** | `25,633` | **`419 ms`** *(361 ms compact)* | `20,674 ms` (`3,198` out tok) | **`49.4×`** *(57.3× compact)* | Passed 50 standard rows; flagged all 3 escalation rows (`noul=0.05, 0.06, 0.02`) |
| **216-Control Security Scorecard** | `38,408` | **`701 ms`** | — | Single pass | Uncapped liability, IP module transfer, 25% SLA penalty |

As Michiel put it far more cleanly than any slide deck: *"Grimaud checks all 216 doors in 700 ms — and only calls in the novelist when a door is unlocked."*

## Picking Your Lane: Managed API vs. Self-Hosted `dgem`

A common question from European public-sector teams after reading both posts is whether to bet on the **managed `gemini-decision-1` API** or **self-hosted `dgem` / `llama.cpp` `/v1/systemone`**. Put both behind **one thin Cloud Run gateway contract** so callers submit one schema and never care which inference lane answers.

![Google Cloud Dual-Path Decision Gateway architecture on Cloud Run showing Cloud Armor and IAP ingress, Path 2A managed Gemini Decisions API versus Path 2B self-hosted dgem/llama.cpp, Shannon entropy hesitation gate cascading to Gemini 3.8 Flash, and BigQuery with RAND shuffle guard](/assets/img/posts/2026-11-24-decision-model-gateway-cloud-run-arch.webp)
*The dual-path **Google Cloud** decision architecture (`europe-west1` Belgium): one `Cloud Run` router exposes a unified decision contract, feeding either **Path 2A** (`gemini-decision-1`, zero GPU ops) or **Path 2B** (self-hosted `dgem` / `llama.cpp` `/v1/systemone` for sovereign weights). Both emit calibrated probabilities into the **Shannon Entropy (`Hesitation %`) Gate** so `60–66%` of clear tickets take the instant path with zero generated tokens, escalating only ambiguous dossiers to **`Gemini 3.8 Flash`**.*

When should you switch lanes?

- **Pick Path 2A (`gemini-decision-1`, managed API)** when you want zero GPU provisioning, sub-second scoring across massive `20k–38k`-token RFx/SOW bundles, and native `noul` / `score` / `choice` typing out of the box.
- **Pick Path 2B (`dgem` / `llama.cpp` `/v1/systemone`)** when strict air-gap / sovereign-weight rules require running unmodified weights inside your own VPC or GPU pool (`55–62 ms` `p50` on a single RTX PRO 6000 with `isolate: auto`).
- **Keep BOTH gated by an entropy check** — never blindly swap an LLM out for raw `argmax`. When confidence degrades (`Hesitation >= 16%`), pass the single-pass distribution as a *soft prior* up to the Stage 2 `gemini-3.8-flash` call.

## The 12-Minute Tutorial: Deploy the Cloud Run Decision Router

Let's wire a slim FastAPI router exposing **`/v1/systemone`** for our fictional **Cymbal Public Treasury** citizen support & procurement queue (never `foo/bar`). Every ticket gets three typed checks in one pass:

1. `has_bounded_timeline` (`noul`: binary probability `0.01..0.99`)
2. `scope_clarity` (`score`: `1..3` ordered rubric)
3. `route_queue` (`choice`: `standard` | `legal_escalation` | `scope_gap`)

### Step 1: The Entropy-Gated Handler (`app.py`)

```python
"""Cymbal Decision-Model Gateway (/v1/systemone compatible).

WHY: Wrap binary/rubric decisions behind a calibrated Shannon entropy gate so
routine tickets return in one zero-output-token pass and only ambiguous items
trigger an expensive generative Gemini 3.8 Flash escalation.
"""

from __future__ import annotations

import math
from typing import Sequence


def normalized_hesitation(probs: Sequence[float]) -> float:
    """Compute normalized Shannon entropy H_norm in [0.0, 1.0].

    WHY: Raw confidence thresholds (`max(p) > 0.85`) shift meaning across
    2-way gates and 26-way routers. Dividing entropy by ln(K) puts every
    question type on the same universal 0%..100% hesitation scale.
    """
    k = len(probs)
    if k < 2:
        return 0.0
    eps = 1e-12
    h = -sum(p * math.log(max(p, eps)) for p in probs if p > 0.0)
    return h / math.log(k)


def decide_escalation(
    noul_probs: dict[str, float],
    route_probs: dict[str, float],
    hesitation_cutoff: float = 0.16,
) -> dict:
    """Return Stage-1 verdict or flag the slot for Stage-2 Gemini 3.8 Flash."""
    binary_h = {
        slot: round(normalized_hesitation([p, 1.0 - p]), 4)
        for slot, p in noul_probs.items()
    }
    route_h = round(normalized_hesitation(list(route_probs.values())), 4)
    flagged = [slot for slot, h in binary_h.items() if h >= hesitation_cutoff]
    if route_h >= hesitation_cutoff:
        flagged.append("route_queue")

    best_route = max(route_probs, key=route_probs.__getitem__)
    return {
        "action": "ESCALATE_STAGE2" if flagged else "FAST_PASS",
        "best_route": best_route,
        "route_confidence": round(route_probs[best_route], 4),
        "hesitation": {**binary_h, "route_queue": route_h},
        "flagged_slots": flagged,
    }
```

### Step 2: Deploy on Cloud Run in `europe-west1` (Belgium)

Pay attention to the **`--concurrency=15 --cpu-boost`** flags. The default `Cloud Run` concurrency (`80`) works splendidly for thin REST proxying, **but** starves the vCPU budget if you host a local quantized classifier side-by-side inside the container:

```bash
# WHY: Pin concurrency=15 with startup CPU boost so p99 tail latency stays flat
# during batch RFx bursts instead of throttling the FastAPI worker queue.
gcloud run deploy cymbal-decision-router \
  --image="europe-west1-docker.pkg.dev/${PROJECT_ID}/ai/cymbal-decision-router:v1" \
  --region="europe-west1" \
  --concurrency=15 \
  --cpu=2 \
  --memory=4Gi \
  --cpu-boost \
  --min-instances=1 \
  --no-allow-unauthenticated \
  --set-env-vars="HESITATION_THRESHOLD=0.16,DECISION_LANE=managed" \
  --set-secrets="GEMINI_API_KEY=cymbal-decision-key:latest"
```

Note the cold-start economics: pinning `--min-instances=1` with `--cpu-boost` keeps a warm edge gateway alive in Belgium (`europe-west1`), avoiding multi-second cold pulls across container spin-up (in baseline `Cloud Run` testing, warm CPU-boosted workers cut p99 cold-start spikes from `~4,200 ms` down to `~380 ms`).

## Do Not Skip Michiel's BigQuery Gotcha (`93.7%` Isn't Free)

One of the sharpest engineering lessons in Michiel's [**19 November BigQuery post**](https://www.linkedin.com/posts/jmbrinkman1980_bigquery-gemini-dataengineering-share-7529175125922054144-BGLq/) deserves permanent framing above every evaluation notebook:

> When batch-scoring up to `100,000` rows against `Jev` and BigQuery's AI functions, an early evaluation run returned a suspiciously rosy **`93.7%`** accuracy—not because the prompt was genius, but because rows were physically **bunched by class / table ordering**!

Always stratify and shuffle your evaluation slice explicitly inside BigQuery before celebrating a single metric:

```sql
-- WHY: BigQuery storage order often groups ingested records by date, tenant,
-- or label. Always materialize a deterministic random slice BEFORE scoring
-- or splitting calibration thresholds.
CREATE OR REPLACE TABLE `cymbal_eval.rfx_tickets_eval_shuffled` AS
SELECT
  ticket_id,
  document_text,
  ground_truth_label,
  FARM_FINGERPRINT(CONCAT(ticket_id, '|2026-11-24-seed')) AS split_key
FROM `cymbal_raw.rfx_tickets`
ORDER BY split_key
LIMIT 2000;
```

Notice we use **`FARM_FINGERPRINT(..., seed)`** instead of bare `RAND()` so the exact `2,000`-row sample is **100% reproducible** across runs when you compare `gemini-decision-1` vs. `dgem` vs. `gemini-3.8-flash` JSON decoding.

## When NOT to Replace Your LLM With a Decision Model

Honest architecture diagrams include their exit ramps. **Do not** force a single-pass decision model onto tasks that actually need synthesis or open chains:

| Workload Type | Better Tool | Why |
| :--- | :--- | :--- |
| Binary risk gates, moderation, SLA routing (`yes/no`, `1..5`, `A..Z`) | **`gemini-decision-1` / `dgem`** | Zero output tokens, calibrated probabilities, `16×–57×` faster |
| Multi-row compliance audit (`50–250` crisp rubric items) | **`gemini-decision-1` / `dgem`** | Parallel prefill amortizes a single `25k–38k`-token document across all checks |
| Draft a redline memo defending *why* Clause 14.2 fails EU procurement law | **`gemini-3.8-flash` (Stage 2)** | Needs reasoned prose, legal nuance, and span citations |
| Multi-step iterative coding edits / tool planning | **Coding model / harness** | Requires stateful multi-turn reasoning & verifier feedback |
| Any gate where `Hesitation >= 16%` | **Cascade to Stage 2** | Let the decision model flag uncertainty rather than forcing a bad flip |

## Railway Tracks to Compass: Tuning Your Cutoff

Take the deployed router against your own **shuffled** slice of `100` historical Cymbal support/RFP records and chart **two cutoffs** side by side:

- **Aggressive (`hesitation_cutoff = 0.25`):** Sends more rows straight through `FAST_PASS`—lowest bill, check your **false-negative cost** on `legal_escalation` carefully.
- **Conservative (`hesitation_cutoff = 0.10`):** Escalates nearly every edge case to `gemini-3.8-flash`—higher spend, tightest recall for high-penalty procurement clauses.

Between `0.10` and `0.25` lies the sweet spot where you stop burning cash on `{"urgent": "yes"}` while keeping Alexandre Dumas's novelist rested for the clauses that genuinely deserve prose.

### References & Credits
- **Michiel Brinkman (`14 Nov 2026`):** [Stop Paying the JSON Tax: Single-Pass Enterprise RFx & SOW Audits with the Gemini Decisions API](https://www.linkedin.com/pulse/stop-paying-json-tax-single-pass-enterprise-rfx-sow-audits-brinkman-q3yne/)
- **Michiel Brinkman (`14 Nov 2026` companion post):** [Single-pass Gemini Decisions API summary](https://www.linkedin.com/posts/jmbrinkman1980_single-pass-gemini-decisions-api-for-enterprise-share-7527300802642886656-reu9/) (`lnkd.in/p/ebwaACqn`)
- **Michiel Brinkman (`19 Nov 2026` BigQuery post):** [Gemini Decisions API at 100k BigQuery rows & table-ordering gotcha](https://www.linkedin.com/posts/jmbrinkman1980_bigquery-gemini-dataengineering-share-7529175125922054144-BGLq/) (`lnkd.in/p/eXz_fwJx`)
- **Official Python SDK walkthrough:** [Getting Started with the Gemini Decisions API in Python (Medium)](https://medium.com/google-cloud/getting-started-with-the-gemini-decisions-api-in-python-d2b40093034f)
- **Previous Atelier foundation (`31 Oct 2026`):** [Stop Asking Your LLM Yes/No Questions: 55ms Diffusion Routing with `dgem`](/2026-10-31-dgem-diffusion-gemma-system-one-routing-brussels/) · [`github.com/GoogleCloudPlatform/dgem`](https://github.com/GoogleCloudPlatform/dgem)
- **Community signal (`17 Nov 2026`):** PostHog — [Not Everything Needs an LLM](https://newsletter.posthog.com/p/decision-models) (`187` pts on Hacker News)
