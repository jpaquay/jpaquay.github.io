// Open Notebook / VitePress Interactive Engine for CV v2 (netdev.be/v2)

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dark / Light Theme Engine ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

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

  // Escape key closes modal
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
      codeOutputBox.innerHTML = `⚙️ <span style="color:var(--vp-c-brand);">Compiling vector spaces...</span>`;
      
      setTimeout(() => {
        codeOutputBox.innerHTML = `⚡ Running <code>innovate("whats_next")</code>...<br>🔍 Applying 10x architectural force multiplier...`;
        setTimeout(() => {
          codeOutputBox.innerHTML = `⚡ Running <code>innovate("whats_next")</code>...<br>🚀 <strong>Result: 10x Transformation Achieved!</strong>`;
          isRunning = false;
        }, 650);
      }, 450);
    });
  }

  // --- 4. Verified Traits Tag Cloud (Only Traits, No Descriptions) ---
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
    traitsContainer.innerHTML = '';

    traitsData.forEach(item => {
      const badge = document.createElement('span');
      badge.className = 'vp-trait-badge';
      badge.innerHTML = `<span class="vp-trait-icon">${item.icon}</span> ${item.text}`;
      traitsContainer.appendChild(badge);
    });
  };

  renderTraits();

  // --- 5. Google Cloud & Gemini 3.5 AI Flow Sandbox with Real-Time Telemetry Jitter ---
  const archBtns = document.querySelectorAll('[data-arch-scenario]');
  const archModelVal = document.getElementById('arch-model-val');
  const archLatencyVal = document.getElementById('arch-metric-latency');
  const archTpsVal = document.getElementById('arch-metric-tps');
  const archCostVal = document.getElementById('arch-metric-cost');
  const archLog = document.getElementById('arch-flow-log');

  const scenarioConfigs = {
    'doc-ai': {
      model: 'Gemini 3.5 Pro',
      baseLatency: 42,
      baseTps: 1250,
      tpsUnit: 'doc/sec',
      cost: '98% Optimal',
      log: '⚡ <strong>[Gemini 3.5 AI Pipeline]</strong> Initialized EU Public Sector Document Pipeline. Gemini 3.5 Pro active with zero-data retention security policy.'
    },
    'multimodal': {
      model: 'Gemini 3.5 Flash',
      baseLatency: 14,
      baseTps: 8400,
      tpsUnit: 'frames/sec',
      cost: '99.4% Optimal',
      log: '🎥 <strong>[Real-time Multimodal Stream]</strong> Streaming sub-20ms audio/video directly to Gemini 3.5 Flash via Vertex AI Low-Latency Sockets.'
    },
    'code-refactor': {
      model: 'Gemini 3.5 Pro (1M Token)',
      baseLatency: 68,
      baseTps: 450,
      tpsUnit: 'files/min',
      cost: '95.5% Optimal',
      log: '🤖 <strong>[Agentic Refactoring Swarm]</strong> ADK Subagent swarm analyzing legacy codebase context and emitting post-quantum safe code diffs.'
    }
  };

  let activeScenarioKey = 'doc-ai';

  // Live Jitter Loop for AI Flow sandbox
  setInterval(() => {
    const cfg = scenarioConfigs[activeScenarioKey];
    if (!cfg) return;
    const jitterLat = cfg.baseLatency + Math.floor((Math.random() - 0.5) * 5);
    const jitterTps = Math.round(cfg.baseTps + (Math.random() - 0.5) * (cfg.baseTps * 0.04));
    if (archLatencyVal) archLatencyVal.textContent = `${jitterLat} ms`;
    if (archTpsVal) archTpsVal.textContent = `${jitterTps.toLocaleString()} ${cfg.tpsUnit}`;
  }, 1100);

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
        
        // Trigger subtle flash animation on metric cards
        document.querySelectorAll('.vp-sim-node').forEach(n => {
          n.style.transform = 'scale(0.97)';
          setTimeout(() => { n.style.transform = 'scale(1)'; }, 180);
        });

        if (archLog) {
          archLog.innerHTML = `<span style="opacity:0.6;">Connecting endpoints...</span>`;
          setTimeout(() => { archLog.innerHTML = config.log; }, 220);
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
    const updatePQCView = (year) => {
      if (pqcYearLabel) pqcYearLabel.textContent = year;

      let vulnPct = Math.min(100, Math.max(10, Math.round(((year - 2024) / 11) * 100)));
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
        if (pqcSummary) pqcSummary.innerHTML = `💡 <strong>Status (${year}):</strong> RSA-2048 viable today. Implement FIPS 203/204 hybrid algorithms for Harvest-Now-Decrypt-Later immunity.`;
      } else if (year <= 2031) {
        if (rsaStatus) {
          rsaStatus.textContent = "⚠️ High Risk (CRQC Horizon)";
          rsaStatus.style.color = "#ef4444";
        }
        if (pqcSummary) pqcSummary.innerHTML = `⚠️ <strong>CRQC Horizon (${year}):</strong> Cryptographically Relevant Quantum Hardware approaching thresholds. Legacy RSA risk critical!`;
      } else {
        if (rsaStatus) {
          rsaStatus.textContent = "❌ COMPROMISED BY SHOR'S ALGORITHM";
          rsaStatus.style.color = "#ef4444";
        }
        if (pqcSummary) pqcSummary.innerHTML = `🚨 <strong>POST-QUANTUM ERA (${year}):</strong> Classical public key encryption broken. Kyber/ML-KEM lattice-based PQC protection active!`;
      }
    };

    pqcSlider.addEventListener('input', (e) => {
      updatePQCView(parseInt(e.target.value));
    });
  }

  // --- 7. SRE Chaos Autoscaling Simulator with Real-Time Multi-Stage Animations ---
  const chaosSpikeBtn = document.getElementById('chaos-spike-btn');
  const chaosOutageBtn = document.getElementById('chaos-outage-btn');
  const chaosResetBtn = document.getElementById('chaos-reset-btn');
  const gkePodsVal = document.getElementById('gke-pods-val');
  const gkePodsFill = document.getElementById('gke-pods-fill');
  const sreLatencyVal = document.getElementById('sre-latency-val');
  const sreLatencyFill = document.getElementById('sre-latency-fill');
  const chaosConsoleLog = document.getElementById('chaos-console-log');

  let sreMode = 'normal'; // 'normal', 'spike', 'outage'
  let sreTimer = null;

  // Live SRE Telemetry Loop (Continuous realistic Prometheus/GKE metric ticks)
  const startSRETelemetry = () => {
    if (sreTimer) clearInterval(sreTimer);
    sreTimer = setInterval(() => {
      const nowStr = new Date().toLocaleTimeString();
      if (sreMode === 'normal') {
        const tickLat = 22 + Math.floor(Math.random() * 5);
        if (sreLatencyVal) sreLatencyVal.textContent = `${tickLat} ms (Optimal)`;
        if (sreLatencyFill) sreLatencyFill.style.width = `${Math.round((tickLat / 120) * 100)}%`;
      } else if (sreMode === 'spike') {
        const tickPods = 118 + Math.floor(Math.random() * 8);
        const tickLat = 26 + Math.floor(Math.random() * 4);
        if (gkePodsVal) gkePodsVal.textContent = `${tickPods} Pods (HPA Autoscale Active)`;
        if (sreLatencyVal) sreLatencyVal.textContent = `${tickLat} ms (SLO Stable ✓)`;
      } else if (sreMode === 'outage') {
        const tickLat = 34 + Math.floor(Math.random() * 6);
        if (sreLatencyVal) sreLatencyVal.textContent = `${tickLat} ms (west4 Failover)`;
      }
    }, 1100);
  };

  startSRETelemetry();

  if (chaosSpikeBtn) {
    chaosSpikeBtn.addEventListener('click', () => {
      sreMode = 'spike';
      const timestamp = new Date().toLocaleTimeString();
      
      // Stage 1: Surge Impact (Immediate)
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
        chaosConsoleLog.innerHTML = `⚠️ <strong>[SRE ALERT ${timestamp}]</strong> Traffic surge +850% RPS detected. Triggering GKE Horizontal Pod Autoscaler (HPA) scale-out 12 ➔ 128 pods...`;
      }

      // Stage 2: HPA Auto-Recovery (1.3 seconds later)
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
          chaosConsoleLog.innerHTML = `✅ <strong>[SRE AUTO-RECOVERY ${recoveryTime}]</strong> GKE Autopilot expanded pool to 124 pod replicas in 3.8s. Latency stabilized at 27ms. Zero packet loss!`;
        }
      }, 1300);
    });
  }

  if (chaosOutageBtn) {
    chaosOutageBtn.addEventListener('click', () => {
      sreMode = 'outage';
      const timestamp = new Date().toLocaleTimeString();

      // Stage 1: Disruption Injected
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
        chaosConsoleLog.innerHTML = `⚡ <strong>[CHAOS INCIDENT ${timestamp}]</strong> Simulated total outage in zone europe-west1. Initiating Anycast BGP traffic failover to europe-west4...`;
      }

      // Stage 2: Zero Downtime Spanner Quorum Failover
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
          chaosConsoleLog.innerHTML = `🛡️ <strong>[ZERO-DOWNTIME FAILOVER ${okTime}]</strong> Multi-region Cloud Spanner quorum elected leader in europe-west4. Cloud Load Balancing active on backup region.`;
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
        chaosConsoleLog.innerHTML = `💻 <strong>[SRE Telemetry Console]</strong> Baseline state restored. All cluster metrics nominal.`;
      }
    });
  }

  // --- 8. Lifeline Interactive Filter ---
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
