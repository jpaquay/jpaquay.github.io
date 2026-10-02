---
layout: post
title: "Carnets d'Atelier in Ligne Claire: Brewing Agents, Spanner Graphs, and a Brussels Trilogue"
subtitle: "An espresso doppio, five autonomous agents negotiating a Qualified Majority, and a week of zero-trust engineering between Schuman and Place de Londres."
date: 2026-09-25
author: Jerome CG Paquay
cover-img: /assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-ligne-claire-hero.webp
thumbnail-img: /assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-ligne-claire-hero.webp
share-img: /assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-ligne-claire-hero.webp
heroImage: /assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-ligne-claire-hero.webp
image: /assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-ligne-claire-hero.webp
categories: ["AI Agents", "Cloud Architecture", "Knowledge Engineering", "Brussels"]
tags: ["AI Cafe", "Connected Cup", "ADK", "A2A", "Spanner Graph", "OKF", "Ligne Claire", "Brussels", "Zero Trust"]
description: "A Brussels engineering notebook in ligne claire: building the Connected Cup Builder Hub with a 9-Bar Socratic AI Barista Coach and a COREPER II Qualified Majority Voting A2A simulator, compiling institutional memory into Cloud Spanner Graph with Varro and Cicero, and hardening our zero-trust IAP proxy."
comments: true
---

In the European Quarter of Brussels, consensus is traditionally measured in *corrigenda*, late-night trilogues, and the structural resilience of an **espresso doppio**.

This week, the late-September sun over the capital was generous enough to turn every bike ride—back and forth between home, the schools, the office, and our **[Connected Cup](https://rsvp.withgoogle.com/events/connected-cup/programme)** pop-up near Schuman—into an open-air architecture review. When a week of distributed systems engineering finally converges in a room full of thirty builders under a spinning disco ball, there is only one proper Belgian medium to document it: ***en ligne claire***.

![Carnets d'Atelier — Le Grand Roastery Agentic de Bruxelles rendered in Franco-Belgian ligne claire comic style](/assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-ligne-claire-hero.webp)
*Le Grand Roastery Agentic de Bruxelles: Friday's hands-on ADK & Agent Platform session at the Connected Cup, inked in classic Hergé & Jacobs ligne claire.*

If Professor Mortimer had spent the week pairing with coding agents in `europe-west1`, he would have been inspecting **Agent2Agent (`A2A`)** JSON-RPC handshakes while Tintin interrogated a local **Brain Visualizer** daemon on port `:8088`. Pull up a chair, order a doppio, and let's inspect the three systems I have been brewing in the workshop this week.

---

## 1. The Brewed Artifacts: Inside the Connected Cup Arena

For Friday's **[Introduction to Agents with ADK](https://rsvp.withgoogle.com/events/introduction-to-agents-with-adk)** session, a static slide deck would have been an insult to a room that reads legislative impact assessments before breakfast. When you seat thirty engineers, architects, and policy-fluent builders around five oak tables—christened **Squad Espresso (`831`)**, **Squad Cortado (`832`)**, **Squad Flat White (`833`)**, **Squad Pour-Over (`834`)**, and **Squad Cold Brew (`835`)**—you need a live, self-paced control plane.

<img src="/assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-live-workshop-photo.webp" alt="Live photo from the Friday September 25, 2026 Google AI Café Brussels workshop showing Jerome CG Paquay briefing the 5 Squad Tables under the disco ball" style="float: right; width: 350px; max-width: 46%; margin: 0.35rem 0 1.25rem 1.6rem; border-radius: 14px; box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18); border: 1px solid rgba(226, 232, 240, 0.95);" />

So we shipped the dedicated Friday pop-up portal at **[25sep.aicafe.netdev.be](https://25sep.aicafe.netdev.be/)**, deployed on serverless **Cloud Run** in Belgium (`europe-west1`) and structured around three engineering movements:

### I. Three-Minute Zero-Friction Onboarding
Nothing derails a hands-on session faster than IAM permission loops or consumer quota ceilings—the cloud equivalent of getting stuck in a *comitology* procedural vote. The onboarding track binds each pre-provisioned squad project directly to **Gemini Enterprise Agent Platform** quotas, launches **Cloud Shell Editor** with the **Google Antigravity CLI (`agy`)** pre-wired, and verifies SDK credentials in under 180 seconds.

### II. Twenty-Six Challenges & The COREPER II Trilogue Simulator
Rather than a toy "hello-world" chatbot, we designed two core tracks, seven specialty pours, and thirty progressive challenges culminating in a quintessentially Brussels boss fight: **The 5-Node `A2A` Eurocrat Trilogue Capstone**.

Anyone who has ever watched a directive move between the Commission, the Parliament, and the Council knows that "multi-agent orchestration with conflicting system prompts" was actually invented on Rue de la Loi in 1958. Our capstone wires five autonomous **Agent Development Kit (`ADK`)** agents over the **Agent2Agent (`A2A`)** protocol into a live **COREPER II Qualified Majority Voting (QMV) Simulator**—enforcing the exact Treaty of Lisbon double-majority threshold in code:
- **Member State Quorum**: At least **$55\%$ of Member States** ($\ge 15$ out of $27$), *and*
- **Demographic Weight**: Representing at least **$65\%$ of the total EU population** (with a blocking minority requiring at least four Council members representing $>35\%$ of the population).

Watching five autonomous LLM agents negotiate amendments until their JSON payload clears $65\%$ demographic weight is remarkably therapeutic—and takes roughly four hours less than the real thing.

### III. The 9-Bar Socratic "AI Barista Coach"
Tucked into the bottom-right corner of the portal is my favorite mechanism of the week: a resizable **AI Barista Coach** calibrated to **`🛡️ 9-Bar` pressure** (the exact hydrostatic pressure required to pull a proper espresso doppio).

If an assistant immediately dumps the final Python code when a builder hits a snag, zero learning occurs. Instead, the coach enforces a **three-stage progressive extraction valve**:
1. **`1 · Nudge`** *(Shot 1/3)*: A Socratic architectural hint pointing to the relevant protocol invariant or schema contract.
2. **`2 · Steps`** *(Shot 2/3)*: The structural workflow and CLI diagnostic sequence.
3. **`3 · Code`** *(Shot 3/3 — `+1 Shot` escalation)*: Copy-ready **ADK**, **`agy`**, or **`RemoteA2aAgent`** implementation snippets when you genuinely need a double shot to unblock your pipeline.

<div style="clear: both;"></div>

### The 8-Hour Live Telemetry Scorecard (`08:40 – 16:55 CEST`)

How did the control plane behave when all five tables hit peak velocity between 11:00 and 14:00 CEST?

| Telemetry Dimension | 8-Hour Live Measurement | Engineering Highlight |
| :--- | :--- | :--- |
| **Platform Availability** | **`100%` (`0` HTTP `5xx`)** | Across all **8 Cloud Run microservices** in `europe-west1` (`2,545` non-probe HTTP requests). |
| **Metered GCP API Calls** | **`10,733` calls** | Including `1,745` Vertex AI invocations and `498` Agent Registry discoveries. |
| **Cloud Audit Log Events** | **`2,265` audit events** | `2,180` human-initiated builder actions (`79.9%` concentrated in the three-hour midday sprint). |
| **Socratic AI Barista Chats** | **`50` live coaching turns** | `100%` `HTTP 200 OK` with a `4.2s` median streaming response time. |
| **Artifacts Shipped by Builders** | **`10` AI Agents + `1` Cloud Run App** | `5` Gemini Enterprise no-code agents, `4` Vertex AI Reasoning Engines, `1` ADK Python agent, and `1` live regulatory intelligence Cloud Run web app. |
| **Arena Leaderboard Podium** | **🏆 #1 Squad Cortado (`832`)** | **Squad Cortado** took gold with **`1,500 pts`** (`1,000/1,000` from the multimodal AI Judge), edging out **Squad Espresso (`831`, `1,480 pts`)** by a razor-thin 20 points. |

---

## 2. Les Carnets de l'Atelier: The Three Technical Brews of the Week

While Friday's arena was the public stage, the back-office workshop was humming all week across three deeper architectural tracks—distilled here into a three-panel *ligne claire* technical plate:

![Les Carnets de l'Atelier: 3-Panel Ligne Claire Technical Comic Strip — Connected Cup Arena, OKF Graph Vault (Varro & Cicero), and Model Garden + IAP Proxy Zero-Trust Shield](/assets/img/posts/2026-09-25-weekly-brew-technical-iap-proxy-ligne-claire-strip.webp)
*Les Carnets de l'Atelier: (I) The 5-Squad Cloud Run Control Plane & 9-Bar Socratic Coach, (II) The OKF Graph Vault with Varro & Cicero on Cloud Spanner Graph, and (III) Model Garden Token Reconciliation, IAP Proxy Guard & CodeMender Zero-Trust Shield.*

### Panel I · The 5-Squad Control Plane & `A2A` Trilogue Engine
Wiring the espresso machine directly into our serverless control plane let every squad move seamlessly from zero-friction onboarding to **BigQuery MCP** data agents and **`A2A` Qualified Majority** simulations—backed by real-time Cloud Monitoring telemetry and Socratic coaching.

### Panel II · From `OKF` Theory to Running Code: *Varro*, *Cicero*, and the Spanner Graph Vault
Earlier this week, I wrote about why the **[Open Knowledge Format (`OKF`)](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf)** and **[WikiSkill](https://arxiv.org/abs/2608.27454)** are essential to bridge individual agent introspection with institutional memory. Over the past few days, I turned that specification into a two-tier compounding knowledge vault written in **Pure Go**, **Cloud Spanner Graph (ISO GQL)**, and **ScaNN vector search**.

Traditional enterprise knowledge management tries to scrape noisy human chat channels and email threads—producing a compliance migraine and low-signal chatter. Our **OKF Graph Vault** inverts the paradigm:

1. **Hybrid Brain Visualizer Ingestion (`:8088`)**: A local bridge tails high-signal agent execution trajectories (`transcript_full.jsonl` via `inotify` byte-offset checkpoints) alongside REST calls to Guillaume Laforge's local **[Antigravity Brain Visualizer](https://github.com/glaforge/antigravity-brain-visualizer/releases)** Micronaut daemon (`[::1]:18088`).
2. **Two Roman Agent Personas (*Varro* & *Cicero*)**:
   - ***Varro* (The Curator)**: Named after Marcus Terentius Varro, Rome's greatest librarian. *Varro* runs asynchronously to distill raw debugging trajectories into human-readable **OKF v0.2** Markdown notes with strict `#tech/*`, `#practice/*`, and `#workload/*` taxonomies and mandatory `> **Sources**:` provenance links.
   - ***Cicero* (The Retriever)**: Named after the master orator. Instead of dumping bloated vector chunks into a context window, *Cicero* executes a **three-turn progressive disclosure retrieval** (`<10ms` index catalog lookup $\rightarrow$ `<50ms` targeted section extraction $\rightarrow$ dual-scope synthesis across the developer's local vault and the shared **Cloud Spanner Graph**).
3. **The 3-Gate Zero-Trust Sanitization Airlock**: Nothing *ever* auto-syncs from a developer's workstation. When an engineer explicitly stages an insight for the shared organizational brain, it must pass through three deterministic and AI guardrails before touching storage:
   - **Gate 1 (Workstation)**: Local regex + Shannon entropy redaction of keys, tokens, IPs, and sensitive identifiers.
   - **Gate 2 (Cloud Edge)**: **Cloud Data Loss Prevention (Cloud DLP)** de-identification templates.
   - **Gate 3 (Cognitive Shield)**: **Vertex AI Model Armor** prompt-injection and sensitive-data screening before the **OKF v0.2** node and its `DEPENDS_ON` / `SUPERSEDES` edges are committed via **ISO GQL** to **Cloud Spanner Graph**.

### Panel III · Model Garden Token Telemetry, `IAP Proxy Guard` & 60-Min Canaries
Finally, on the right panel of our workshop notebook, we tightened the bolts across observability and perimeter security:
- **12-Model Vertex AI Token Reconciliation**: We aligned our observability control plane strictly with all **12 verified Vertex AI Model Garden Gemini models** (**Gemini 3.1 Pro**, **Gemini 3 Flash**, and the **Gemini 2.5 Pro / Flash / Flash-Lite** family), reconciling exact input, output, and reasoning token burn directly against OpenTelemetry trace spans.
- **`IAP Proxy Guard` & Zero-Trust `CodeMender` Shield**: We ran both initial and adversarial **[CodeMender](https://cloud.google.com/security/codemender)** sweeps across our local zero-trust Identity-Aware Proxy guard (`IAP Proxy Guard`) and authentication middleware—eliminating every P0 and P1 finding before Friday's live traffic hit.
- **Bilingual `OKF` Maps & 60-Min Playwright Canary**: We shipped a full **French/English (`FR/EN`) OKF Knowledge Base** switcher and consolidated fragmented browser checks into a single, deterministic **60-minute Playwright E2E canary lifecycle** verifying 10 deep-analysis milestones.

---

## Epilogue: From Schuman to *Place de Londres*

When the final telemetry sweep wrapped up late Friday afternoon with `0` HTTP `5xx` errors and **Squad Cortado** crowned on the podium, it was time to close the laptop, unlock the bike, and coast through the late-afternoon sunshine over to *Place de Londres* in Ixelles. Raising a glass on the terrace of **London Calling** while the square hummed in five languages—before pedaling home at dusk to light the charcoal for a quiet **Friday night barbecue with the teens**—was the best possible reminder of why we build in Brussels.

The **[Connected Cup](https://rsvp.withgoogle.com/events/connected-cup/programme)** continues in the EU Quarter through **October 16, 2026**, and the Builder Hub stays open whenever you want to test your agents against the 26 challenges. Next time you're near Schuman, drop by—the **espresso doppio** is on us.
