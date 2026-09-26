// Open Notebook / VitePress Interactive Engine for CV v2 (netdev.be/v2 & web3.netdev.be)
// Hardened per mandatory-secure-web-skills: zero innerHTML, safe DOM APIs, and visibility-gated timers.

document.addEventListener('DOMContentLoaded', () => {
  // Helper: safely render structured simulator console messages without innerHTML
  const renderSimLog = (container, icon, boldTitle, messageText) => {
    if (!container) return;
    const frag = document.createDocumentFragment();
    if (icon) {
      frag.appendChild(document.createTextNode(`${icon} `));
    }
    if (boldTitle) {
      const strong = document.createElement('strong');
      strong.textContent = boldTitle;
      frag.appendChild(strong);
      frag.appendChild(document.createTextNode(' '));
    }
    if (messageText) {
      frag.appendChild(document.createTextNode(messageText));
    }
    container.replaceChildren(frag);
  };

  // --- 1. Dark / Light Theme Engine ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');

  const getSavedTheme = () => {
    return localStorage.getItem('vp-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vp-theme', theme);
  };

  applyTheme(getSavedTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // --- 2. Contact Overlay Modal Box ---
  const contactModal = document.getElementById('contact-modal');
  const closeModalBtn = document.getElementById('close-contact-modal');
  const contactTriggers = document.querySelectorAll('[data-contact-trigger]');

  const openContactModal = () => {
    if (contactModal) {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeContactModal = () => {
    if (contactModal) {
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  contactTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeContactModal);
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeContactModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactModal();
    }
  });

  // --- 3. 10x Code Simulator (innovate.js) ---
  const runCodeBtn = document.getElementById('run-code-btn');
  const codeOutputBox = document.getElementById('code-output-box');

  if (runCodeBtn && codeOutputBox) {
    let isRunning = false;
    runCodeBtn.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;
      codeOutputBox.classList.remove('hidden');
      renderSimLog(codeOutputBox, '⚙️', 'Compiling vector spaces...', '');

      setTimeout(() => {
        renderSimLog(codeOutputBox, '⚡', 'Running innovate("whats_next")...', '🔍 Applying 10x architectural force multiplier...');
        setTimeout(() => {
          renderSimLog(codeOutputBox, '🚀', 'Result: 10x Transformation Achieved!', 'Execution completed.');
          isRunning = false;
        }, 650);
      }, 450);
    });
  }

  // --- 4. Verified Traits Tag Cloud ---
  const traitsData = [
    { text: "Eco Hacker", icon: "🌱" },
    { text: "Dad of 3", icon: "❤️" },
    { text: "I bike", icon: "🚴" },
    { text: "I meet", icon: "🤝" },
    { text: "I learn", icon: "📚" },
    { text: "I climb", icon: "🧗" },
    { text: "I laugh", icon: "😄" },
    { text: "I code", icon: "💻" },
    { text: "Great Beard", icon: "🧔" },
    { text: "Handsome Genius ™", icon: "🧠" },
    { text: "Crypto-Agile", icon: "🛡️" },
    { text: "Turing Verified", icon: "🎯" }
  ];

  const traitsContainer = document.getElementById('traits-tag-cloud');

  const renderTraits = () => {
    if (!traitsContainer) return;
    const frag = document.createDocumentFragment();

    traitsData.forEach(item => {
      const badge = document.createElement('span');
      badge.className = 'vp-trait-badge';
      const iconSpan = document.createElement('span');
      iconSpan.className = 'vp-trait-icon';
      iconSpan.textContent = item.icon;
      badge.appendChild(iconSpan);
      badge.appendChild(document.createTextNode(` ${item.text}`));
      frag.appendChild(badge);
    });
    traitsContainer.replaceChildren(frag);
  };

  renderTraits();

  // --- 5. Google Cloud & Gemini 3.5 AI Flow Sandbox with Visibility-Gated Telemetry ---
  const archBtns = document.querySelectorAll('[data-arch-scenario]');
  const archModelVal = document.getElementById('arch-model-val');
  const archLatencyVal = document.getElementById('arch-metric-latency');
  const archTpsVal = document.getElementById('arch-metric-tps');
  const archCostVal = document.getElementById('arch-metric-cost');
  const archLog = document.getElementById('arch-flow-log');
  const archDetails = archLog ? archLog.closest('details') : null;

  const scenarioConfigs = {
    'doc-ai': {
      model: 'Gemini 3.5 Pro',
      baseLatency: 42,
      baseTps: 1250,
      tpsUnit: 'doc/sec',
      cost: '98% Optimal',
      icon: '⚡',
      title: '[Gemini 3.5 AI Pipeline]',
      log: 'Initialized EU Public Sector Document Pipeline. Gemini 3.5 Pro active with zero-data retention security policy.'
    },
    'multimodal': {
      model: 'Gemini 3.5 Flash',
      baseLatency: 14,
      baseTps: 8400,
      tpsUnit: 'frames/sec',
      cost: '99.4% Optimal',
      icon: '🎥',
      title: '[Real-time Multimodal Stream]',
      log: 'Streaming sub-20ms audio/video directly to Gemini 3.5 Flash via Vertex AI Low-Latency Sockets.'
    },
    'code-refactor': {
      model: 'Gemini 3.5 Pro (1M Token)',
      baseLatency: 68,
      baseTps: 450,
      tpsUnit: 'files/min',
      cost: '95.5% Optimal',
      icon: '🤖',
      title: '[Agentic Refactoring Swarm]',
      log: 'ADK Subagent swarm analyzing legacy codebase context and emitting post-quantum safe code diffs.'
    }
  };

  let activeScenarioKey = 'doc-ai';

  if (archLatencyVal && archTpsVal) {
    setInterval(() => {
      if (document.hidden || (archDetails && !archDetails.open)) return;
      const cfg = scenarioConfigs[activeScenarioKey];
      if (!cfg) return;
      const jitterLat = cfg.baseLatency + Math.floor((Math.random() - 0.5) * 5);
      const jitterTps = Math.round(cfg.baseTps + (Math.random() - 0.5) * (cfg.baseTps * 0.04));
      archLatencyVal.textContent = `${jitterLat} ms`;
      archTpsVal.textContent = `${jitterTps.toLocaleString()} ${cfg.tpsUnit}`;
    }, 1100);
  }

  archBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      archBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const scenarioKey = btn.getAttribute('data-arch-scenario');
      const config = scenarioConfigs[scenarioKey];

      if (config) {
        activeScenarioKey = scenarioKey;
        if (archModelVal) archModelVal.textContent = config.model;
        if (archLatencyVal) archLatencyVal.textContent = `${config.baseLatency} ms`;
        if (archTpsVal) archTpsVal.textContent = `${config.baseTps.toLocaleString()} ${config.tpsUnit}`;
        if (archCostVal) archCostVal.textContent = config.cost;

        document.querySelectorAll('.vp-sim-node').forEach(n => {
          n.style.transform = 'scale(0.97)';
          setTimeout(() => { n.style.transform = 'scale(1)'; }, 180);
        });

        if (archLog) {
          archLog.textContent = 'Connecting endpoints...';
          setTimeout(() => {
            renderSimLog(archLog, config.icon, config.title, config.log);
          }, 220);
        }
      }
    });
  });

  // --- 6. Post-Quantum Cryptography Threat Simulator ---
  const pqcSlider = document.getElementById('pqc-slider');
  const pqcYearLabel = document.getElementById('pqc-year-label');
  const rsaStatus = document.getElementById('rsa-status');
  const rsaVulnFill = document.getElementById('rsa-vuln-fill');
  const pqcSummary = document.getElementById('pqc-summary');

  if (pqcSlider) {
    const updatePQCView = (rawYear) => {
      const year = Math.min(2035, Math.max(2024, Number(rawYear) || 2026));
      if (pqcYearLabel) pqcYearLabel.textContent = String(year);

      const vulnPct = Math.min(100, Math.max(10, Math.round(((year - 2024) / 11) * 100)));
      if (rsaVulnFill) {
        rsaVulnFill.style.width = `${vulnPct}%`;
        if (year < 2028) {
          rsaVulnFill.style.backgroundColor = '#f59e0b';
        } else if (year <= 2031) {
          rsaVulnFill.style.backgroundColor = '#ef4444';
        } else {
          rsaVulnFill.style.backgroundColor = '#991b1b';
        }
      }

      if (year < 2028) {
        if (rsaStatus) {
          rsaStatus.textContent = "✓ RSA-2048 Active (Prepare Agility)";
          rsaStatus.style.color = "#f59e0b";
        }
        renderSimLog(pqcSummary, '💡', `Status (${year}):`, 'RSA-2048 viable today. Implement FIPS 203/204 hybrid algorithms for Harvest-Now-Decrypt-Later immunity.');
      } else if (year <= 2031) {
        if (rsaStatus) {
          rsaStatus.textContent = "⚠️ High Risk (CRQC Horizon)";
          rsaStatus.style.color = "#ef4444";
        }
        renderSimLog(pqcSummary, '⚠️', `CRQC Horizon (${year}):`, 'Cryptographically Relevant Quantum Hardware approaching thresholds. Legacy RSA risk critical!');
      } else {
        if (rsaStatus) {
          rsaStatus.textContent = "❌ COMPROMISED BY SHOR'S ALGORITHM";
          rsaStatus.style.color = "#ef4444";
        }
        renderSimLog(pqcSummary, '🚨', `POST-QUANTUM ERA (${year}):`, 'Classical public key encryption broken. Kyber/ML-KEM lattice-based PQC protection active!');
      }
    };

    pqcSlider.addEventListener('input', (e) => {
      updatePQCView(parseInt(e.target.value, 10));
    });
  }

  // --- 7. SRE Chaos Autoscaling Simulator with Visibility-Gated Telemetry ---
  const chaosSpikeBtn = document.getElementById('chaos-spike-btn');
  const chaosOutageBtn = document.getElementById('chaos-outage-btn');
  const chaosResetBtn = document.getElementById('chaos-reset-btn');
  const gkePodsVal = document.getElementById('gke-pods-val');
  const gkePodsFill = document.getElementById('gke-pods-fill');
  const sreLatencyVal = document.getElementById('sre-latency-val');
  const sreLatencyFill = document.getElementById('sre-latency-fill');
  const chaosConsoleLog = document.getElementById('chaos-console-log');
  const sreDetails = chaosConsoleLog ? chaosConsoleLog.closest('details') : null;

  let sreMode = 'normal';

  if (sreLatencyVal) {
    setInterval(() => {
      if (document.hidden || (sreDetails && !sreDetails.open)) return;
      if (sreMode === 'normal') {
        const tickLat = 22 + Math.floor(Math.random() * 5);
        sreLatencyVal.textContent = `${tickLat} ms (Optimal)`;
        if (sreLatencyFill) sreLatencyFill.style.width = `${Math.round((tickLat / 120) * 100)}%`;
      } else if (sreMode === 'spike') {
        const tickPods = 118 + Math.floor(Math.random() * 8);
        const tickLat = 26 + Math.floor(Math.random() * 4);
        if (gkePodsVal) gkePodsVal.textContent = `${tickPods} Pods (HPA Autoscale Active)`;
        sreLatencyVal.textContent = `${tickLat} ms (SLO Stable ✓)`;
      } else if (sreMode === 'outage') {
        const tickLat = 34 + Math.floor(Math.random() * 6);
        sreLatencyVal.textContent = `${tickLat} ms (west4 Failover)`;
      }
    }, 1100);
  }

  if (chaosSpikeBtn) {
    chaosSpikeBtn.addEventListener('click', () => {
      sreMode = 'spike';
      const timestamp = new Date().toLocaleTimeString();

      if (gkePodsVal) gkePodsVal.textContent = "48 Pods (Scaling Up...)";
      if (gkePodsFill) {
        gkePodsFill.style.width = "88%";
        gkePodsFill.style.backgroundColor = "#f59e0b";
      }
      if (sreLatencyVal) sreLatencyVal.textContent = "156 ms (RPS SURGE +850%)";
      if (sreLatencyFill) {
        sreLatencyFill.style.width = "82%";
        sreLatencyFill.style.backgroundColor = "#ef4444";
      }
      if (chaosConsoleLog) {
        chaosConsoleLog.className = "vp-sim-log pulse-alert";
        renderSimLog(chaosConsoleLog, '⚠️', `[SRE ALERT ${timestamp}]`, 'Traffic surge +850% RPS detected. Triggering GKE Horizontal Pod Autoscaler (HPA) scale-out 12 ➔ 128 pods...');
      }

      setTimeout(() => {
        if (sreMode !== 'spike') return;
        const recoveryTime = new Date().toLocaleTimeString();
        if (gkePodsVal) gkePodsVal.textContent = "124 Pods (HPA Autoscaled 🚀)";
        if (gkePodsFill) {
          gkePodsFill.style.width = "92%";
          gkePodsFill.style.backgroundColor = "#3b82f6";
        }
        if (sreLatencyVal) sreLatencyVal.textContent = "27 ms (SLO Absorbed ✓)";
        if (sreLatencyFill) {
          sreLatencyFill.style.width = "22%";
          sreLatencyFill.style.backgroundColor = "#10b981";
        }
        if (chaosConsoleLog) {
          chaosConsoleLog.className = "vp-sim-log pulse-success";
          renderSimLog(chaosConsoleLog, '✅', `[SRE AUTO-RECOVERY ${recoveryTime}]`, 'GKE Autopilot expanded pool to 124 pod replicas in 3.8s. Latency stabilized at 27ms. Zero packet loss!');
        }
      }, 1300);
    });
  }

  if (chaosOutageBtn) {
    chaosOutageBtn.addEventListener('click', () => {
      sreMode = 'outage';
      const timestamp = new Date().toLocaleTimeString();

      if (gkePodsVal) gkePodsVal.textContent = "6 Pods (Draining europe-west1)";
      if (gkePodsFill) {
        gkePodsFill.style.width = "45%";
        gkePodsFill.style.backgroundColor = "#f59e0b";
      }
      if (sreLatencyVal) sreLatencyVal.textContent = "84 ms (Cloud DNS Rerouting)";
      if (sreLatencyFill) {
        sreLatencyFill.style.width = "58%";
        sreLatencyFill.style.backgroundColor = "#f59e0b";
      }
      if (chaosConsoleLog) {
        chaosConsoleLog.className = "vp-sim-log pulse-alert";
        renderSimLog(chaosConsoleLog, '⚡', `[CHAOS INCIDENT ${timestamp}]`, 'Simulated total outage in zone europe-west1. Initiating Anycast BGP traffic failover to europe-west4...');
      }

      setTimeout(() => {
        if (sreMode !== 'outage') return;
        const okTime = new Date().toLocaleTimeString();
        if (gkePodsVal) gkePodsVal.textContent = "48 Pods (europe-west4 Active)";
        if (gkePodsFill) {
          gkePodsFill.style.width = "50%";
          gkePodsFill.style.backgroundColor = "#10b981";
        }
        if (sreLatencyVal) sreLatencyVal.textContent = "35 ms (Cross-Region Safe)";
        if (sreLatencyFill) {
          sreLatencyFill.style.width = "28%";
          sreLatencyFill.style.backgroundColor = "#10b981";
        }
        if (chaosConsoleLog) {
          chaosConsoleLog.className = "vp-sim-log pulse-success";
          renderSimLog(chaosConsoleLog, '🛡️', `[ZERO-DOWNTIME FAILOVER ${okTime}]`, 'Multi-region Cloud Spanner quorum elected leader in europe-west4. Cloud Load Balancing active on backup region.');
        }
      }, 1400);
    });
  }

  if (chaosResetBtn) {
    chaosResetBtn.addEventListener('click', () => {
      sreMode = 'normal';
      if (gkePodsVal) gkePodsVal.textContent = "12 Pods (Baseline)";
      if (gkePodsFill) {
        gkePodsFill.style.width = "25%";
        gkePodsFill.style.backgroundColor = "#3b82f6";
      }
      if (sreLatencyVal) sreLatencyVal.textContent = "24 ms (Optimal)";
      if (sreLatencyFill) {
        sreLatencyFill.style.width = "15%";
        sreLatencyFill.style.backgroundColor = "#10b981";
      }
      if (chaosConsoleLog) {
        chaosConsoleLog.className = "vp-sim-log";
        renderSimLog(chaosConsoleLog, '💻', '[SRE Telemetry Console]', 'Baseline state restored. All cluster metrics nominal.');
      }
    });
  }

  // --- 8. SLSA Level 4 Supply Chain Simulator ---
  const slsaBuildBtn = document.getElementById('slsa-build-btn');
  const slsaAttestBtn = document.getElementById('slsa-attest-btn');
  const slsaVerifyBtn = document.getElementById('slsa-verify-btn');
  const slsaStageVal = document.getElementById('slsa-stage-val');
  const slsaHashVal = document.getElementById('slsa-hash-val');
  const slsaStatusFill = document.getElementById('slsa-status-fill');
  const slsaConsoleLog = document.getElementById('slsa-console-log');

  if (slsaBuildBtn) {
    slsaBuildBtn.addEventListener('click', () => {
      if (slsaStageVal) slsaStageVal.textContent = "2. Hermetic Isolated Worker Active";
      if (slsaStatusFill) { slsaStatusFill.style.width = "50%"; slsaStatusFill.style.backgroundColor = "#3b82f6"; }
      if (slsaHashVal) slsaHashVal.textContent = "e3b0c442...98fc (Building)";
      if (slsaConsoleLog) {
        slsaConsoleLog.className = "vp-sim-log pulse-alert";
        renderSimLog(slsaConsoleLog, '🔨', '[Hermetic Worker]', 'Disabling network access. Compiling in ephemeral container with pinned toolchain...');
      }
    });
  }

  if (slsaAttestBtn) {
    slsaAttestBtn.addEventListener('click', () => {
      if (slsaStageVal) slsaStageVal.textContent = "3. In-Toto Attestation Signed";
      if (slsaStatusFill) { slsaStatusFill.style.width = "75%"; slsaStatusFill.style.backgroundColor = "#8b5cf6"; }
      if (slsaHashVal) slsaHashVal.textContent = "7c9e2b10...f42a (Signed)";
      if (slsaConsoleLog) {
        slsaConsoleLog.className = "vp-sim-log pulse-success";
        renderSimLog(slsaConsoleLog, '🔏', '[In-Toto Attestation]', 'Generated Cosign/Sigstore cryptographically verifiable provenance payload.');
      }
    });
  }

  if (slsaVerifyBtn) {
    slsaVerifyBtn.addEventListener('click', () => {
      if (slsaStageVal) slsaStageVal.textContent = "4. SLSA L4 VERIFIED & APPROVED";
      if (slsaStatusFill) { slsaStatusFill.style.width = "100%"; slsaStatusFill.style.backgroundColor = "#10b981"; }
      if (slsaHashVal) slsaHashVal.textContent = "0f4571f...8a65 (SLSA L4 PASS)";
      if (slsaConsoleLog) {
        slsaConsoleLog.className = "vp-sim-log pulse-success";
        renderSimLog(slsaConsoleLog, '🛡️', '[SLSA L4 Policy Engine]', 'Verified non-falsifiable provenance, 2-party review, and hermetic build. Deployment authorized!');
      }
    });
  }

  // --- 9. Carbon-Aware Compute Scheduler ---
  const greenSlider = document.getElementById('green-slider');
  const greenIntensityVal = document.getElementById('green-intensity-val');
  const greenMigrateBtn = document.getElementById('green-migrate-btn');
  const greenRegionVal = document.getElementById('green-region-val');
  const greenSavingsVal = document.getElementById('green-savings-val');
  const greenMeterFill = document.getElementById('green-meter-fill');
  const greenConsoleLog = document.getElementById('green-console-log');

  let greenIsMigrated = false;

  if (greenSlider) {
    greenSlider.addEventListener('input', (e) => {
      const val = Math.min(480, Math.max(80, parseInt(e.target.value, 10) || 280));
      if (greenIntensityVal) greenIntensityVal.textContent = `${val} gCO2/kWh`;
      if (!greenIsMigrated && greenConsoleLog) {
        if (val > 300) {
          renderSimLog(greenConsoleLog, '⚠️', '[High Carbon Alert]', `Brussels grid intensity peaked at ${val} gCO2/kWh (coal/gas generation active). Click button to reroute to green Nordic hydro!`);
        } else {
          renderSimLog(greenConsoleLog, '🌱', '[Green FLOPs Engine]', `Brussels grid carbon intensity: ${val} gCO2/kWh.`);
        }
      }
    });
  }

  if (greenMigrateBtn) {
    greenMigrateBtn.addEventListener('click', () => {
      greenIsMigrated = !greenIsMigrated;
      if (greenIsMigrated) {
        if (greenRegionVal) greenRegionVal.textContent = "🌱 Nordic Hydro (europe-north1)";
        if (greenSavingsVal) greenSavingsVal.textContent = "84% CO2 Reduction 🌿";
        if (greenMeterFill) greenMeterFill.style.width = "95%";
        if (greenConsoleLog) {
          greenConsoleLog.className = "vp-sim-log pulse-success";
          renderSimLog(greenConsoleLog, '🌱', '[Carbon Rerouting Active]', 'Workload shifted to europe-north1 (Hamina Hydro/Wind DC). 84% reduction in carbon footprint!');
        }
      } else {
        if (greenRegionVal) greenRegionVal.textContent = "📍 Brussels (europe-west1)";
        if (greenSavingsVal) greenSavingsVal.textContent = "0% (Baseline Grid)";
        if (greenMeterFill) greenMeterFill.style.width = "20%";
        if (greenConsoleLog) {
          greenConsoleLog.className = "vp-sim-log";
          renderSimLog(greenConsoleLog, '📍', '[Local Grid Active]', 'Workload running in europe-west1 (Brussels).');
        }
      }
    });
  }

  // --- 10. EU AI Act & Sovereignty Compliance Auditor ---
  const aiactHighriskBtn = document.getElementById('aiact-highrisk-btn');
  const aiactGpaiBtn = document.getElementById('aiact-gpai-btn');
  const aiactDoraBtn = document.getElementById('aiact-dora-btn');
  const aiactRiskVal = document.getElementById('aiact-risk-val');
  const aiactResidencyVal = document.getElementById('aiact-residency-val');
  const aiactRiskFill = document.getElementById('aiact-risk-fill');
  const aiactConsoleLog = document.getElementById('aiact-console-log');

  if (aiactHighriskBtn) {
    aiactHighriskBtn.addEventListener('click', () => {
      if (aiactRiskVal) aiactRiskVal.textContent = "High-Risk Annex III (Biometric/Public)";
      if (aiactResidencyVal) aiactResidencyVal.textContent = "✓ 100% EU In-Region Sovereign";
      if (aiactRiskFill) { aiactRiskFill.style.width = "100%"; aiactRiskFill.style.backgroundColor = "#10b981"; }
      if (aiactConsoleLog) {
        aiactConsoleLog.className = "vp-sim-log pulse-success";
        renderSimLog(aiactConsoleLog, '🏛️', '[EU AI Act Audit]', 'High-Risk classification verified. Human oversight, logging, & fundamental rights assessment passed.');
      }
    });
  }

  if (aiactGpaiBtn) {
    aiactGpaiBtn.addEventListener('click', () => {
      if (aiactRiskVal) aiactRiskVal.textContent = "General-Purpose AI (Systemic Risk Check)";
      if (aiactResidencyVal) aiactResidencyVal.textContent = "✓ Model Transparency & Copyright Audit";
      if (aiactRiskFill) { aiactRiskFill.style.width = "85%"; aiactRiskFill.style.backgroundColor = "#3b82f6"; }
      if (aiactConsoleLog) {
        aiactConsoleLog.className = "vp-sim-log pulse-success";
        renderSimLog(aiactConsoleLog, '🤖', '[GPAI Code of Practice]', 'Automated evaluation against EU AI Office rules: Copyright compliance & red-teaming report generated.');
      }
    });
  }

  if (aiactDoraBtn) {
    aiactDoraBtn.addEventListener('click', () => {
      if (aiactRiskVal) aiactRiskVal.textContent = "Financial DORA / NIS2 Resilience Audit";
      if (aiactResidencyVal) aiactResidencyVal.textContent = "🛡️ Multi-Region ICT Risk Compliant";
      if (aiactRiskFill) { aiactRiskFill.style.width = "95%"; aiactRiskFill.style.backgroundColor = "#8b5cf6"; }
      if (aiactConsoleLog) {
        aiactConsoleLog.className = "vp-sim-log pulse-success";
        renderSimLog(aiactConsoleLog, '🔐', '[DORA & NIS2 Crucible]', 'ICT third-party risk management verified. Continuous threat monitoring and RTO < 5m certified.');
      }
    });
  }

  // --- 11. Lifeline Interactive Filter ---
  const lifelineFilters = document.querySelectorAll('[data-lifeline-filter]');
  const lifelineCards = document.querySelectorAll('.vp-lifeline-card');

  lifelineFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      lifelineFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-lifeline-filter');

      lifelineCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
