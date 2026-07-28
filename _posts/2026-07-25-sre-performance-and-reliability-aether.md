---
layout: post
title: "Sub-150ms Teleport & Closed-Loop Reliability: SRE Practices and Performance Engineering Behind Aether"
subtitle: "How the Aether team achieved <30s pure TypeScript container builds, <150ms instant session state-teleport recovery, and closed-loop Gemini ADK SRE observability."
cover-img: /assets/img/posts/2026-07-25-sre-performance-banner.webp
thumbnail-img: /assets/img/posts/2026-07-25-sre-performance-banner.webp
share-img: /assets/img/posts/2026-07-25-sre-performance-banner.webp
gh-repo: jpaquay/jpaquay.github.io/
gh-badge: [star, fork, follow]
tags: [jerome-paquay, sre, 2020s, global]
readtime: true
---

![SRE Performance Banner](/assets/img/posts/2026-07-25-sre-performance-banner.webp)

When building platforms capable of running autonomous AI engineering agents, classic Site Reliability Engineering (SRE) paradigms face a breaking point. Unlike static web services where request-response lifecycles terminate in tens of milliseconds, autonomous agent trajectories run multi-turn feedback loops, edit codebases, run shell commands, and interact with live cloud infrastructure over prolonged execution sessions.

If an underlying worker pod crashes, a network node drops, or a cloud dependency throttles halfway through an agent's multi-step refactoring task, traditional recovery methods involve restarting from scratch—losing computational state, context history, and engineering velocity.

This article explores the **SRE Genesis and Performance Engineering** of the **Aether Platform**: how the team achieved an unprecedented **<30-second Tekton container build SLA**, engineered **<150ms instant session state-teleport recovery**, built a **Google AX single-writer append-only event durability log**, and institutionalized **closed-loop observability** with OpenTelemetry and Gemini 3.5 Pro ADK SRE streams.

{: .box-note}
**10x SLA Velocity Leap:** Dropping container build SLAs from **20 minutes down to <30 seconds** transformed deployment pipelines from slow background jobs into interactive surfaces for autonomous AI engineering swarms.

### The Build Velocity Bottleneck: From 20 Minutes to <30 Seconds

Before autonomous engineering agents can remediate incidents or push pull requests, the platform’s delivery pipeline must be frictionless. In early architecture iterations, compiling heavy multi-platform UI applications pushed container build times to **20–25 minutes** per release.

The Aether engineering group radically refactored the build stack:
1. **Replacement of Monolithic Cross-Compilers**: Replaced heavy compilation paths with a lightweight **2-Stage Node.js 20 Alpine + Vite React** frontend engine and Go-based backends.
2. **In-Cluster Kaniko Builder**: Replaced standard docker-in-docker daemon dependencies with daemonless **Kaniko** executions running directly inside Kubernetes build pods.
3. **Local PVC Layer Caching**: Attached high-speed NVMe Persistent Volume Claims (`PVC`) to cache `node_modules`, Go build caches, and Trivy security databases.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CONTAINER BUILD SLA COMPARISON                         │
│                                                                             │
│  Legacy Stack (Flutter / Heavy CI):                                         │
│  [==================================================] 20 - 25 Minutes       │
│                                                                             │
│  Aether Refactored Stack (Kaniko + Alpine + Vite + PVC Cache):              │
│  [==] < 30 Seconds  (10x Velocity Leap)                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Instant Session Teleport (<150ms) & Google AX Durability Logs

What happens when a node running an active engineering agent dies? In the Aether substrate, session persistence is powered by the **Google AX Single-Writer Durability Log**.

![SRE Observability Pipeline](/assets/img/posts/2026-07-25-sre-observability-pipeline.webp)

### System Architecture of State-Teleport

Rather than letting individual workers maintain volatile local state, Aether models all cognitive actions as an immutable event stream written to a **single-writer append-only durability log**:

```mermaid
sequenceDiagram
    autonumber
    participant Actor as Polecat Actor (gVisor)
    participant AX as AX Controller (Single-Writer)
    participant Log as Append-Only Durability Log
    participant Sub as Substrate Scheduler / K3s Mesh

    Actor->>AX: Stream Action Trajectory Step N
    AX->>Log: Synchronous Commit & Flushed Index
    Log-->>AX: Ack
    AX-->>Actor: State Checkpoint Verified

    Note over Actor,Sub: Hardware Node Failure / Preemption Event!

    Sub->>Sub: Detect etcd Lease Expiration (Heartbeat Missed)
    Sub->>AX: Request Re-hydration for Workspace ID
    AX->>Log: Read Last Verified State Trajectory (<10ms)
    Sub->>Actor: Spawn New gVisor Sandbox & Teleport Snapshot (<140ms)
    Actor-->>Sub: Resume Trajectory at Step N+1 (Zero Loss)
```

### Key Recovery Metrics
- **Heartbeat Timeout**: `etcd` node lease TTL set to 2 seconds.
- **Snapshot Re-hydration Latency**: Under **150 milliseconds** end-to-end (`< 150ms recovery time`).
- **Zero Dual-Write Drift**: Single-writer append-only model prevents split-brain corruption.

### Closed-Loop SRE Observability: OTel, Prometheus & Gemini ADK

Observability in Aether is built around a tripartite streaming model:

1. **W3C OpenTelemetry (`OTEL`) & Prometheus Exporter**: Every HTTP, gRPC, and eBPF event emits W3C trace contexts (`traceparent`, `tracestate`), exposing live Prometheus histogram metrics at `/metrics`.
2. **GUI Action Telemetry (`sreAgentStore`)**: Visual UI clicks and operator actions in the Backstage VDOM cockpit trigger `sreAgentStore.recordGuiAction()`, streaming user actions directly into Prometheus and Grafana dashboards.
3. **Gemini 3.5 Pro ADK SRE Output Stream**: Autonomous ADK agents consume trace anomalies and formulate 1-click JSON RCA audit sheets and remediation pull requests.

### Multi-Region Failure Isolation

| Operational Domain | Cluster Topology | Blast Radius Control |
| :--- | :--- | :--- |
| **Master Control Node** | `sweetsixty6` (`100.92.249.20`) | Isolated master control plane orchestrating Tailscale wireguard mesh. |
| **Edge Compute Nodes** | K3s Nodes (`rpi`, `rpj`, `rpk`, `raspberry`) | Regional workload execution; node outage triggers automatic sub-150ms pod failover. |
| **Hermetic Test Harness** | `AetherLookupBridgeTestSuite` | Automated synthetic canary probers test data parity and SLA compliance. |

---
*Authored by the Aether Platform SRE & Performance Engineering Group.*
