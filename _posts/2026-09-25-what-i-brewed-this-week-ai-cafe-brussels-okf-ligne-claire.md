---
layout: post
title: "Les Carnets de l'Atelier in Ligne Claire: What I Brewed This Week for 25sep.aicafe.netdev.be, the OKF Graph Vault, and a Sunny Brussels Bike Loop"
subtitle: "From a 5-squad Cloud Run control plane and a 9-Bar Socratic AI Barista Coach at 25sep.aicafe.netdev.be to Varro & Cicero in our Spanner Graph vault—all bookended by sunny Brussels bike rides between home, schools, the office, Connected Cup, London Calling at Place de Londres, and a Friday night BBQ with the teens."
date: 2026-09-25
author: Jerome CG Paquay
cover-img: /assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-ligne-claire-hero.webp
thumbnail-img: /assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-ligne-claire-hero.webp
share-img: /assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-ligne-claire-hero.webp
heroImage: /assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-ligne-claire-hero.webp
image: /assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-ligne-claire-hero.webp
categories: ["AI Agents", "Cloud Architecture", "Knowledge Engineering", "Brussels"]
tags: ["AI Cafe", "Connected Cup", "ADK", "A2A", "Spanner Graph", "OKF", "Ligne Claire", "Brussels", "Cycling", "Ixelles"]
description: "A geeky deep-dive into a week of relentless engineering in Brussels: launching the 25sep.aicafe.netdev.be Builder Hub with a 9-Bar Socratic AI Barista Coach and EU-27 QMV A2A simulator, architecting the Varro & Cicero OKF Spanner Graph vault, and pedaling through a golden Brussels Friday from Connected Cup to Place de Londres and a backyard BBQ with the teens."
comments: true
---

**Friday, September 25, 2026 · Late Evening · Brussels.**

Some weeks in Brussels feel like they were scripted and inked directly inside a classic Franco-Belgian *Bande Dessinée*.

All week long, the late-September sun has been unusually generous over the capital—turning every daily bike commute into a golden-hour victory lap. Between pedaling back and forth from **home** to **the kids' schools**, zipping over to **the office**, and coasting down to the **[Connected Cup (Google AI Café)](https://rsvp.withgoogle.com/events/connected-cup/programme)** in the EU Quarter, my handlebars served as the ultimate context-switching buffer between distributed systems architecture and real life.

And when a week of late-night coding, espresso extraction, and multi-agent engineering finally converges in a packed room full of builders under a spinning disco ball—before wrapping up with a cold glass at **London Calling** on *Place de Londres* in Ixelles and a backyard **BBQ at home with the teens**—there is only one honorable way to illustrate it: ***en ligne claire***.

![25sep.aicafe.netdev.be — Le Grand Roastery Agentic de Bruxelles rendered in Franco-Belgian ligne claire comic style](/assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-ligne-claire-hero.webp)
*Le Grand Roastery Agentic de Bruxelles: Friday's hands-on ADK & Agent Platform session at the Connected Cup in Brussels, reimagined in classic Hergé & Jacobs ligne claire.*

If Professor Mortimer had spent this week pairing with coding agents in `europe-west1` (Belgium), he would have been debugging **Agent2Agent (`A2A`)** JSON-RPC handshakes while Tintin interrogated a local **Brain Visualizer** daemon on port `:8088`. Grab a flat white (or whatever is still chilling in the cooler from the barbecue), and let's pop the hood on what I've been brewing this week.

---

## 1. The Pop-Up Roastery Portal: [`https://25sep.aicafe.netdev.be/`](https://25sep.aicafe.netdev.be/)

For Friday's **[Introduction to Agents with ADK (`ghacks.dev`)](https://25sep.aicafe.netdev.be/)** workshop at the **Google AI Café · Brussels (Connected Cup Edition)**, a static slide deck simply wasn't going to cut it. When you gather thirty developers, architects, and policy-minded builders around five round oak tables—christened **Squad Espresso (`831`)**, **Squad Cortado (`832`)**, **Squad Flat White (`833`)**, **Squad Pour-Over (`834`)**, and **Squad Cold Brew (`835`)**—you need a live, self-paced control plane.

<img src="/assets/img/posts/2026-09-25-ai-cafe-brussels-25sep-live-workshop-photo.webp" alt="Live photo from the Friday September 25, 2026 Google AI Café Brussels workshop showing Jerome CG Paquay briefing the 5 Squad Tables under the disco ball" style="float: right; width: 360px; max-width: 48%; margin: 0.35rem 0 1.25rem 1.6rem; border-radius: 14px; box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18); border: 1px solid rgba(226, 232, 240, 0.95);" />

So I brewed **[`https://25sep.aicafe.netdev.be/`](https://25sep.aicafe.netdev.be/)**—a dedicated **Builder Hub** deployed on serverless **Cloud Run** in `europe-west1` and structured around three workspaces:

### Part 1 · 3-Minute Zero-Friction Runtime Setup (`/getting-started`)
Nothing stalls a live coding session faster than IAM permission loops or consumer quota walls. Part 1 walks every builder seat through binding their pre-provisioned squad project to activate **Gemini Enterprise Agent Platform** quotas, firing up **Cloud Shell Editor** with the pre-installed **Google Antigravity CLI (`agy`)**, and verifying their SDK credentials in under 180 seconds.

### Part 2 · 26 Progressive Challenges & The EU-27 QMV Arena (`/challenges`)
Instead of a single linear tutorial, we brewed **two core tracks, 7 specialty pours, and 30 progressive challenges**:
- **Cloud FinOps & Conversational Data Agents**: Wiring **Agent Development Kit (`ADK`)** agents to **BigQuery MCP**, **AlloyDB for PostgreSQL**, and trade-compliance sandboxes.
- **The 5-Node `A2A` Eurocrat Trilogue Capstone**: Because we are in Brussels' EU Quarter, our boss-level distributed systems challenge models an inter-institutional **European Trilogue negotiation** over the **Agent2Agent (`A2A`)** protocol—complete with a live **COREPER II Qualified Majority Voting (QMV) Simulator** enforcing the real Treaty of Lisbon double-majority threshold ($55\%$ of Member States $\ge 15/27$ **and** $65\%$ of total EU population).

### Part 3 · The 9-Bar Socratic "AI Barista Coach"
Look in the bottom-right corner of **[`25sep.aicafe.netdev.be`](https://25sep.aicafe.netdev.be/)** and you'll find my favorite UI detail of the week: a floating, corner-resizable **AI Barista Coach** calibrated to **`🛡️ 9-Bar` safety pressure**.

If an AI coach immediately dumps the final Python solution when a participant gets stuck, nobody learns anything. So we wired a **3-Tier Progressive Extraction Bar** directly into the chat stream:
1. **`1 · Nudge`** *(Shot 1/3)*: A Socratic architectural hint pointing to the right concept or API contract.
2. **`2 · Steps`** *(Shot 2/3)*: The exact CLI workflow and structural blueprint.
3. **`3 · Code`** *(Shot 3/3 — `+1 Shot` escalation)*: Copy-ready **ADK**, **`agy`**, or **`RemoteA2aAgent`** implementation code when you truly need a triple espresso to unblock your build.

<div style="clear: both;"></div>

### The 8-Hour Live Telemetry Scorecard (`08:40 – 16:55 CEST`)

How did the roastery hold up when all five tables hit peak velocity between 11:00 and 14:00 CEST?

| Telemetry Dimension | 8-Hour Live Measurement | Engineering Highlight |
| :--- | :--- | :--- |
| **Platform Availability** | **`100%` (`0` HTTP `5xx`)** | Across all **8 Cloud Run microservices** in `europe-west1` (`2,545` non-probe HTTP requests). |
| **Metered GCP API Calls** | **`10,733` calls** | Including `1,745` Vertex AI (`aiplatform.googleapis.com`) calls and `498` Agent Registry discoveries. |
| **Cloud Audit Log Events** | **`2,265` audit events** | `2,180` human-initiated builder actions (`79.9%` concentrated in the 3-hour midday coding sprint). |
| **Socratic AI Barista Chats** | **`50` live coaching turns** | `100%` `HTTP 200 OK` on `25sep.aicafe.netdev.be` with a `4.2s` median streaming response time. |
| **Artifacts Shipped by Builders** | **`10` AI Agents + `1` Cloud Run App** | `5` Gemini Enterprise no-code agents, `4` Vertex AI Reasoning Engines, `1` ADK Python agent, and `1` live regulatory intelligence Cloud Run web app. |
| **Arena Leaderboard Podium** | **🏆 #1 Squad Cortado (`832`)** | **Squad Cortado** took gold with **`1,500 pts`** (`1,000/1,000` from the multimodal AI Judge), edging out **Squad Espresso (`831`, `1,480 pts`)** by a razor-thin 20 points! |

---

## 2. Les Carnets de l'Atelier: The Full Week in Three Ligne Claire Panels

While getting `25sep.aicafe.netdev.be` ready for Friday's crowd was the main stage, the back-office workshop was humming all week—and every time I hopped back on the bike in the Brussels sunshine, another piece of the puzzle clicked into place. Here is the full week distilled into a three-panel *ligne claire* comic strip:

![Les Carnets de l'Atelier: 3-Panel Ligne Claire Technical Comic Strip of the Week's Engineering Brews and Sunny Brussels Bike Loop](/assets/img/posts/2026-09-25-weekly-brew-okf-vault-bike-bbq-ligne-claire-strip.webp)
*Les Carnets de l'Atelier: (I) The `25sep.aicafe.netdev.be` 5-Squad Control Plane & 9-Bar Socratic Coach, (II) The OKF Graph Vault with Varro & Cicero on Cloud Spanner Graph, and (III) The Sunny Brussels Bike Loop from Home & Schools to Connected Cup, London Calling (Place de Londres, Ixelles), and Friday night's BBQ with the teens.*

### Panel I · `25sep.aicafe.netdev.be` & The 9-Bar Socratic Coach
As we saw above, wiring the espresso machine directly into our 5-squad Cloud Run control plane let every table move seamlessly from 3-minute onboarding to multi-agent **`A2A` Trilogue** simulations—with the **9-Bar Socratic AI Barista Coach** keeping everyone in flow without spoiling the punchline.

### Panel II · From `OKF` Theory to Running Code: The *Varro & Cicero* Spanner Graph Vault
On Tuesday, I wrote about why the **[Open Knowledge Format (`OKF`)](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf)** and **[WikiSkill (`arXiv:2608.27454`)](https://arxiv.org/abs/2608.27454)** are essential to bridge individual agent introspection with institutional memory. This week, I turned that architectural blueprint into a two-tier compounding engineering knowledge vault built in **Pure Go**, **Cloud Spanner Graph (ISO GQL)**, and **ScaNN vector search**.

Traditional enterprise knowledge tools try to scrape noisy human chat rooms and email threads—creating a nightmare of privacy friction and low-signal chatter. Our **OKF Graph Vault** inverts the flow:

1. **Hybrid Brain Visualizer Ingestion (`:8088`)**: A local bridge tails high-signal agent execution trajectories (`transcript_full.jsonl` via `inotify` byte-offset checkpoints) alongside REST calls to Guillaume Laforge's local **[Antigravity Brain Visualizer](https://github.com/glaforge/antigravity-brain-visualizer/releases)** Micronaut daemon (`[::1]:18088`).
2. **Two Roman Agent Personas (*Varro* & *Cicero*)**:
   - ***Varro* (The Curator)**: Named after Marcus Terentius Varro, Rome's greatest librarian. *Varro* runs asynchronously to distill raw debugging trajectories into human-readable **OKF v0.2** Markdown notes with strict `#tech/*`, `#practice/*`, and `#workload/*` taxonomies and mandatory `> **Sources**:` provenance links.
   - ***Cicero* (The Retriever)**: Named after the master orator. Instead of dumping bloated vector chunks into your context window, *Cicero* executes a **3-turn progressive disclosure retrieval** (`<10ms` index catalog lookup $\rightarrow$ `<50ms` targeted section extraction $\rightarrow$ dual-scope synthesis across your personal workstation vault and the shared **Cloud Spanner Graph**).
3. **The 3-Gate Zero-Trust Sanitization Airlock**: Nothing *ever* auto-syncs from a developer's laptop. When an engineer explicitly stages an insight for the shared organizational brain, it must pass through three deterministic and AI guardrails:
   - **Gate 1 (Workstation)**: Local regex + Shannon entropy redaction of keys, tokens, IPs, and sensitive identifiers.
   - **Gate 2 (Cloud Edge)**: **Cloud Data Loss Prevention (Cloud DLP)** de-identification templates.
   - **Gate 3 (Cognitive Shield)**: **Vertex AI Model Armor** prompt-injection and sensitive-data screening before the **OKF v0.2** node and its `DEPENDS_ON` / `SUPERSEDES` edges are committed to **Cloud Spanner Graph**.

Alongside the vault, we also reconciled all **12 Vertex AI Model Garden Gemini models** (**Gemini 3.1 Pro**, **Gemini 3 Flash**, and the **Gemini 2.5 Pro / Flash / Flash-Lite** family) in our observability control plane, added a bilingual **French/English (`FR/EN`) OKF Knowledge Base**, consolidated our browser checks into a single **60-minute Playwright E2E canary lifecycle**, and closed out zero-trust **CodeMender** security sweeps across our local IAP proxy guard.

---

## 3. Panel III · The Real-World Brussels Loop: Two Wheels, *London Calling* at Place de Londres, and a Friday BBQ with the Teens

Here is the secret that every Brussels cyclist knows: the best architectural breakthroughs don't happen while staring at a terminal—they happen while pedaling across town under a crisp blue sky.

All week long, my daily telemetry loop ran on two wheels through the sunshine:
- **Morning & Afternoon Commutes**: Weaving between **home**, **the schools**, **the office**, and the **Connected Cup AI Café**—letting the fresh air clear the mental cache between **Spanner Graph GQL** queries and **Cloud Run** deployments.
- **Pit Stop at *London Calling* (*Place de Londres*, Ixelles)**: When the final workshop telemetry sweep wrapped up late Friday afternoon with `0` HTTP 5xx errors and **Squad Cortado** crowned on the podium, we coasted over to *Place de Londres* in Ixelles. Sitting outside at **London Calling** in the golden late-afternoon sun, clinking glasses with the crew and debriefing the day's builds while the square hummed around us, was pure Brussels magic.
- **Friday Night Finale — BBQ at Home with the Teens**: And to close the loop properly, I pedaled back home just as twilight settled over the garden, lit the charcoal, and fired up a **Friday evening barbecue with the teens**. No screens, no token counters, no JSON-RPC payloads—just grilled food, laughter under the string lights, and stories from their week at school.

---

## Come Brew With Us Next Week!

The **[Google AI Café · Brussels (Connected Cup)](https://rsvp.withgoogle.com/events/connected-cup/programme)** continues in the EU Quarter all the way through **October 16, 2026**—and the **[`https://25sep.aicafe.netdev.be/`](https://25sep.aicafe.netdev.be/)** Builder Hub stays live whenever you want to test your skills against the 26 challenges or ask the **9-Bar AI Barista Coach** for a Socratic nudge.

- **Explore the Live Builder Hub & 26 Challenges**: **[`https://25sep.aicafe.netdev.be/`](https://25sep.aicafe.netdev.be/)**
- **Full 4-Week Brussels Connected Cup Programme**: **[`rsvp.withgoogle.com/events/connected-cup/programme`](https://rsvp.withgoogle.com/events/connected-cup/programme)**

See you on the bike lanes, at the AI Café espresso bar, or on the terrace at *Place de Londres*!
