---
layout: post
title: "Zero-Idle, Instant Wake: Native GKE Scale-to-Zero Meets Our Hybrid Agentic Control Plane"
subtitle: "A Monday morning espresso doppio, KEP-2021 capacity buffers, a 0.74ms WireGuard mesh on netdev-edge, and a 12-agent OpenTelemetry mission control."
date: 2026-09-28
author: Jerome CG Paquay
cover-img: /assets/img/posts/2026-09-28-gke-scale-to-zero-netdev-edge-mission-control-hero.webp
thumbnail-img: /assets/img/posts/2026-09-28-gke-scale-to-zero-netdev-edge-mission-control-hero.webp
share-img: /assets/img/posts/2026-09-28-gke-scale-to-zero-netdev-edge-mission-control-hero.webp
heroImage: /assets/img/posts/2026-09-28-gke-scale-to-zero-netdev-edge-mission-control-hero.webp
image: /assets/img/posts/2026-09-28-gke-scale-to-zero-netdev-edge-mission-control-hero.webp
categories: ["Cloud Architecture", "AI Agents", "Kubernetes", "SRE"]
tags: ["GKE", "Scale to Zero", "Kubernetes", "WireGuard", "Tailscale", "A2A", "OpenTelemetry", "Cloud Run", "Ligne Claire", "Brussels"]
description: "How Google Kubernetes Engine (GKE) 1.37 native scale-to-zero (KEP-2021, AutoscalingMetric PromQL, and active/standby capacity buffers) converges with our netdev-edge WireGuard/SPIFFE hybrid substrate and our 12-agent A2A OpenTelemetry Mission Control."
comments: true
---

In Brussels, two institutions have historically resisted every attempt to scale to zero: interinstitutional working groups and idle Kubernetes deployments.

Leave a cluster unattended over a quiet weekend in the European Quarter, and you will return on Monday morning to find dozens of underutilized pods faithfully burning vCPUs while waiting for a JSON-RPC payload—the cloud-native equivalent of keeping every chandelier and espresso machine in the Berlaymont running at full pressure in mid-August just in case a rapporteur drops by to file a *corrigendum*.

Over this morning's **espresso doppio**, I have been pairing Eyal Yablonka and Scott Funkenhauser's announcement of **[GKE 1.37 native scale-to-zero capabilities](https://cloud.google.com/blog/products/containers-kubernetes/gke-adds-native-scale-to-zero-capabilities)** with the two infrastructure tracks I have been brewing over the past few days: unifying our hybrid ARM64 edge-to-cloud substrate on **`netdev-edge`** and wiring a **12-agent OpenTelemetry & Well-Architected Mission Control** across an 11-project cloud fleet.

![Monday Morning in the Brussels Cloud Engineering Atelier: GKE 1.37 Scale-to-Zero, netdev-edge WireGuard + SPIFFE mTLS Bridge, and 12-Agent A2A Mission Control rendered in Franco-Belgian ligne claire style](/assets/img/posts/2026-09-28-gke-scale-to-zero-netdev-edge-mission-control-hero.webp)
*Monday morning in the Brussels atelier: GKE 1.37 native scale-to-zero (`minReplicas: 0 -> 50`) with Active & Standby Capacity Buffers on the left, the `netdev-edge` WireGuard + SPIFFE mTLS bridge in the center, and our 12-Agent A2A Mission Control on the right.*

The thesis linking all three is simple: **true elasticity in the age of autonomous agents means decoupling the cost of always-on compute from sub-second operational readiness—without ever allowing security, state durability, or observability to go dark.**

---

## 1. Why GKE 1.37 Native Scale-to-Zero Changes the Equation for Agentic Fleets

Multi-agent systems are bursty by nature. A sovereign procurement agent, a fiscal customs verifier, or a five-node legislative simulator might sit completely silent for forty minutes, then suddenly fan out across six **Agent2Agent (`A2A`)** handshakes, three **Model Context Protocol (`MCP`)** database queries, and a side-by-side evaluation sweep in under a second.

Until now, achieving `minReplicas: 0` on Kubernetes required bolting on external event-driven operators such as **KEDA**. While capable, external autoscaling operators introduce their own operational gravity: custom `ScaledObject` CRDs, external metrics adapter hop-counts that inflate cold-start reaction times, and YAML sprawl that easily crosses 10,000 lines across a multi-project fleet.

With **GKE 1.37**, scale-to-zero moves from sidecar management directly into the GKE control plane through three tightly integrated primitives:

| Architectural Dimension | GKE 1.37 Native Scale-to-Zero | Legacy Add-On Operators (KEDA) |
| :--- | :--- | :--- |
| **Control Plane Toil** | **Fully managed**; zero third-party operators or custom metrics adapters to patch. | Requires lifecycle management of external operators and `ScaledObject` CRDs. |
| **Signal Path & Configuration** | Native `autoscaling/v2` **HPA** (`KEP-2021`) + **`AutoscalingMetric`** querying **Managed Prometheus** directly via PromQL. | Adapter polling intervals and extra network hops increase wake-up latency and YAML footprint. |
| **Cold-Start Mitigation (`0 -> 1`)** | Pooled **Active & Standby Capacity Buffers** eliminate the 60–90s node provisioning wait. | Cold starts block on cluster autoscaler node bring-up unless over-provisioned dummy pause pods are hacked together. |

### Under the Hood: `AutoscalingMetric` PromQL + `KEP-2021` (`minReplicas: 0`)

Instead of routing external signals through third-party adapter pods, GKE 1.37 extends the **`AutoscalingMetric`** custom resource (`autoscaling.gke.io/v1beta1`) to read PromQL queries directly from **Google Cloud Managed Service for Prometheus**—covering Pub/Sub backlog depth, Cloud Monitoring gauges, or custom `A2A` task queue metrics—and feeds them straight into a `KEP-2021`-enabled **HorizontalPodAutoscaler (`HPA`)**:

```yaml
apiVersion: autoscaling.gke.io/v1beta1
kind: AutoscalingMetric
metadata:
  name: a2a-agent-task-backlog
spec:
  metrics:
  - promql:
      name: pubsub-a2a-undelivered
      query: >
        pubsub_googleapis_com:subscription_num_undelivered_messages{
          monitored_resource="pubsub_subscription",
          subscription_id="a2a-specialist-task-queue"
        }
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: a2a-specialist-worker-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: a2a-specialist-worker
  minReplicas: 0
  maxReplicas: 50
  metrics:
  - type: External
    pods:
      metric:
        name: autoscaling.gke.io|a2a-agent-task-backlog|pubsub-a2a-undelivered
      target:
        type: AverageValue
        averageValue: "4"
```

### Defeating the 90-Second Cold Start: Active & Standby Capacity Buffers

Any SRE who has ever put `minReplicas: 0` into production knows the catch: the moment the first message arrives, the HPA flips from `0` to `1`, finds no schedulable node capacity, and waits 60 to 90 seconds for a new VM to boot and pull container layers. For an interactive `A2A` agent orchestration with a sub-second SLA, a 90-second pause is indistinguishable from an outage.

GKE solves this with **Capacity Buffers** in two complementary tiers:
1. **Active Capacity Buffer (Shared Wildcard Compute)**: A compact pool of warm compute shared across *hundreds* of scale-to-zero deployments. Instead of 50 idle agents each hoarding a replica, the active buffer acts as cluster-wide wildcard capacity: whichever agent wakes from `0 -> 1` claims warm CPU and memory *instantly*.
2. **Standby Capacity Buffer (Low-Cost Rapid Refill)**: Priced at a fraction of active compute, the standby buffer automatically replenishes the active pool the moment a burst of multi-agent traffic claims the initial warm slots.

![Elastic Agentic Control Plane Architecture Diagram showing 1. Elastic Substrate & Hybrid Mesh, 2. 12-Agent A2A Mission Control, and 3. SRE Co-Pilot & 5-Gate Eval Flywheel](/assets/img/posts/2026-09-28-elastic-agentic-control-plane-architecture.webp)
*The three-tier Elastic Agentic Control Plane: combining GKE 1.37 Scale-to-Zero and our `netdev-edge` WireGuard router (left) with the 12-Agent A2A Mission Control (center) and the 5-Gate SRE & Evaluation Flywheel (right).*

---

## 2. Hybrid Scale-to-Zero on `netdev-edge`: WireGuard `Noise_IKpsk2`, `tmpfs` Secrets, and `118ms` CRIU Restore

How do you extend that same "zero-idle compute, instant wake-up" discipline across a hybrid edge-to-cloud boundary?

This week in **[agentic-platform](https://github.com/jpaquay/agentic-platform)**, we completed a major architectural consolidation on **`netdev-edge`** (`europe-west1`): retiring fragmented legacy substrate views, unifying **Platform**, **Deployments**, and **Infrastructure** under a single cockpit, and wiring end-to-end **Server-Sent Events (`SSE`)** live telemetry across our React Backstage portal (processing 60-FPS **RFC 6902** incremental JSON patches and FlatBuffer binary decodes with zero static mocks).

Our compute topology spans two worlds with **100% `linux/arm64` binary parity**:
- **On-Premises K3s Swarm Mesh**: Anchored by our control-plane master (`sweetsixty6`), ARM64 worker nodes (`rpi`, `rpj`, `rpk`), a local **Tekton** build factory (`git-clone` $\rightarrow$ `kaniko-build` $\rightarrow$ `trivy-scan` $\rightarrow$ `cosign-slsa3-attest` $\rightarrow$ zero-downtime rollout), and a dedicated NAS Write-Ahead Log (`WAL`) vault (`synack`).
- **Elastic Cloud Burst in `europe-west1` (`netdev-edge`)**: **GKE Autopilot ARM64** node pools (Tau T2A / Axion C4A) alongside a **Cloud Run Gen2** serverless burst pool scaling elastically from **`0` to `50` instances**.

### The Headless Bridge: `aether-tailscale-router` on Cloud Run Gen2

When cloud worker instances scale down to `0` and burst back to `50` on demand, they cannot afford a multi-second VPN handshake or a stateful split-brain when reconnecting to the on-prem control plane. We engineered the **`aether-tailscale-router`** on **Cloud Run Gen2** (`minScale: 1`, `cpu-throttling: false`), bound directly to our Shared VPC (`vpc-netdev-shared`, subnet `10.10.2.0/24`) via `ipvlan-eth1` Direct VPC Egress (`all-traffic`):

1. **WireGuard `Noise_IKpsk2` & Cryptokey Routing**: The router maintains a 24/7 warm 15-second keepalive tunnel (`Curve25519` ECDH, `ChaCha20-Poly1305` AEAD, `BLAKE2s`, `SipHash24`) with strict **Cryptokey Routing** binding node keys to `AllowedIPs`, encapsulated when needed inside zero-knowledge DERP TLS 1.3 streams and wrapped in **Layer-7 SPIFFE/SPIRE X.509 mTLS** (`spiffe://aether.local/ns/edge/sa/router`).
2. **Zero-Disk Secret Manager State Recovery (`tmpfs`)**: How do you make a stateless Cloud Run container survive a cold restart without re-authenticating to the mesh or writing private keys to disk? At container boot, the cryptographic node state (`_machinekey` and node private keys) is fetched from **Google Cloud Secret Manager** (`TAILSCALE_STATE`) and hydrated strictly into an in-memory, root-only **`tmpfs`** mount (`/tmp/tailscale.state`, `chmod 600`), with `private_key_http_redaction: ENFORCED` across all diagnostic endpoints.
3. **Single-Writer WAL & `118ms` CRIU Memory Teleportation**: To prevent split-brain state corruption when burst instances wake from zero, `sweetsixty6` acts as the authoritative **Single-Writer WAL Master**. Waking Cloud Run and GKE Autopilot ARM64 pods auto-discover the master via MagicDNS, forwarding state mutations over the warm tunnel while consuming asynchronous Change-Data-Capture (`CDC`) WAL streams, `14.2µs` zero-copy Unix Domain Socket IPC (`48,290 req/s`), and **CRIU checkpoint/restore memory snapshots (`118ms` restore SLA, `3.42 GB` reclaimed via `zswap`)**.

---

## 3. The 12-Agent Mission Control: W3C OpenTelemetry Waterfalls & The 5-Gate Eval Flywheel

When your compute layer scales elastically between zero and fifty replicas across edge and cloud, **your observability, architectural governance, and evaluation loops cannot scale to zero**.

Over the weekend in **[aicafe-mission-control](https://github.com/cloud-gtm/aicafe-mission-control)**, we evolved Friday's live workshop arena into a full **Multi-Project Agentic Mission Control** governing **12 specialized `A2A` agents** across an **11-project cloud fleet** in `europe-west1`.

![12-Agent A2A Exchange Visualizer, Strict JSON-RPC 2.0 Task.metadata Inspector, and 756ms W3C OpenTelemetry Distributed Trace Waterfall](/assets/img/posts/2026-09-28-a2a-exchange-otel-waterfall-inspector.webp)
*Inside the 12-Agent Mission Control: (Left) Live SVG Exchange Topology orchestrating a 6-hop `SequentialAgent` cascade, (Right) Strict JSON-RPC 2.0 `Task.metadata` payload inspector, and (Bottom) the `756ms` W3C OpenTelemetry distributed trace waterfall.*

### I. Live 12-Agent SVG Exchange Visualizer & Sub-Second `traceparent` Waterfall

Rather than treating multi-agent chains as opaque black boxes, the **`#arena` Exchange Visualizer** renders all 12 domain agents—including our **Cloud SRE Co-Pilot**, **TenderScout Benelux Procurement Agent**, **MyTotum Dialectical `OKF` Graph Agent**, **MyMinFin Fiscal & CBAM Auditor**, **FinOps Chargeback Governor**, **AlphaEvolve Coding Agent**, **EHDS Health Space Guard**, and **BigQuery Audit Sink**—around the central `/net/dev/Aether` hub with animated Bezier packet flows across `SequentialAgent`, `ParallelAgent`, `LoopAgent`, and `Coordinator` topologies.

Clicking any hop in a live 6-agent `SequentialAgent` cascade exposes the exact **W3C OpenTelemetry (`traceparent`)** span timeline (`Total: 756 ms` end-to-end across six distinct agent hops: `125ms` $\rightarrow$ `148ms` $\rightarrow$ `96ms` $\rightarrow$ `133ms` $\rightarrow$ `122ms` $\rightarrow$ `92ms`), backed by **ADK 2.0 `ContextCacheConfig`** achieving an **`81.2%` semantic cache hit rate** and dual-sinking every trace to **Google Cloud Trace v2** and **BigQuery**.

### II. Hard-Won `A2A` Production Lessons: The 5-Gate Continuous Verification Engine

Running 12 real **Agent2Agent (`A2A`)** services across an enterprise discovery engine and a multi-project fleet surfaces protocol sharp edges that never appear in localhost demos. We codified those hard-won lessons into **four continuous root-cause monitors (`MON-01` .. `MON-04`)** and a **5-Gate Verification Suite** executing **54 multi-turn evaluation tracks (162 turns) every five minutes**:

1. **Gate 1 · `MON-01` (Direct Cloud Run Egress vs. Proxy Reset)**: Routing registered `A2A` agents through an cross-region Secure Web Proxy without an explicit gateway security policy URL list triggers `HTTP 502 (URX)` upstream resets against `*.a.run.app` backends. Gate 1 continuously verifies direct `europe-west1` Cloud Run egress bindings across all 21 registered agent services.
2. **Gate 2 · `MON-02` (Strict Pydantic v2 `extra="forbid"` Envelope Compliance)**: Strict `A2A` v0.3 clients validate `message/send` JSON-RPC 2.0 responses against `SendMessageResponse` (`Task | Message`) with `extra="forbid"`. Attaching custom telemetry keys (`otel_trace_id`, `traceparent`, or `eval_score_pct`) at the JSON-RPC root or top-level `Task` object triggers an immediate `HTTP 400: Extra inputs are not permitted`. Gate 2 enforces that all custom OpenTelemetry and guardrail attributes are nested strictly inside **`result.metadata` (`Task.metadata`)**.
3. **Gate 3 · `MON-03` (Runtime `/.well-known/agent.json` Streaming Parity)**: Because discovery engines fetch `{origin}/.well-known/agent.json` dynamically prior to every invocation, advertising a stale hostname or setting `capabilities.streaming: true` on a synchronous JSON-RPC endpoint breaks invocation at runtime. Gate 3 probes live agent cards every 300 seconds to guarantee 100% contract parity.
4. **Gate 4 & Gate 5 · `MON-04` (WAF-Aware & `OKF v0.2` SRE Co-Pilot + `SxS` LLM Arbiter)**: Every trace cross-feeds into our **5-Pillar Google Cloud Well-Architected Framework (`WAF`)** and **`OKF v0.2` SRE Co-Pilot** (enforcing `okf-cost-4-stage` *Classify $\rightarrow$ Consume $\rightarrow$ Route $\rightarrow$ Cache* and `okf-security-5-layer` *Perimeter $\rightarrow$ Identity $\rightarrow$ Model Armor $\rightarrow$ Tool Governance $\rightarrow$ Audit*) and is graded by our deterministic **Side-by-Side (`SxS`) LLM Arbiter** across four weighted dimensions:
   - **Goal Completion (`35%`)**
   - **Tool Selection Accuracy (`25%`, with a `-3.5` penalty on hallucinated or unauthorized tools)**
   - **Step Efficiency (`20%`)**
   - **WAF Grounding & Enterprise Safety (`20%`, with a `-3.5` penalty for `0.0.0.0/0` egress or static keys)**

Across the latest 162-turn fleet sweep, the control plane recorded a **`98.1%` (`2.94 / 3.0`)** evaluation flywheel score (`SxS Δ +1.02`, `100%` Candidate A win rate).

---

## Brewed Artifacts & Monday Takeaway

Whether you are running bursty background workers on **GKE 1.37** with `KEP-2021` and **Capacity Buffers**, bridging ARM64 edge nodes to **Cloud Run Gen2** over a headless **WireGuard + SPIFFE** router, or orchestrating a 12-agent **`A2A`** constellation with **W3C OpenTelemetry** waterfalls, the architectural rule of thumb for 2026 is clear:

> **Let your idle compute scale ruthlessly to zero—but keep your capacity buffers warm, your cryptographic state in `tmpfs`, and your `Task.metadata` telemetry traces wide awake.**

Now, if only we could submit a Kubernetes Enhancement Proposal to apply `minReplicas: 0` to Monday afternoon committee meetings. Until then, I will settle for a second **espresso doppio**.
