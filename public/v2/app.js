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
    if (themeIcon && themeLabel) {
      if (theme === 'dark') {
        themeIcon.textContent = '🌙';
        themeLabel.textContent = 'Dark';
      } else {
        themeIcon.textContent = '☀️';
        themeLabel.textContent = 'Light';
      }
    }
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
    runCodeBtn.addEventListener('click', () => {
      codeOutputBox.classList.remove('hidden');
      codeOutputBox.innerHTML = `⚡ Running <code>innovate("whats_next")</code>...<br>🚀 Result: <strong>10x Transformation Achieved!</strong>`;
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

  // --- 5. Google Cloud & Gemini 3.5 AI Flow Sandbox ---
  const archBtns = document.querySelectorAll('[data-arch-scenario]');
  const archModelVal = document.getElementById('arch-model-val');
  const archLatencyVal = document.getElementById('arch-metric-latency');
  const archTpsVal = document.getElementById('arch-metric-tps');
  const archCostVal = document.getElementById('arch-metric-cost');
  const archLog = document.getElementById('arch-flow-log');

  const scenarioConfigs = {
    'doc-ai': {
      model: 'Gemini 3.5 Pro',
      latency: '42 ms',
      tps: '1,250 doc/sec',
      cost: '98% Optimal',
      log: '⚡ <strong>[Gemini 3.5 AI Pipeline]</strong> Initialized EU Public Sector Document Pipeline. Gemini 3.5 Pro active with zero-data retention security policy.'
    },
    'multimodal': {
      model: 'Gemini 3.5 Flash',
      latency: '14 ms',
      tps: '4,800 frames/sec',
      cost: '99.2% Optimal',
      log: '🎥 <strong>[Real-time Multimodal Stream]</strong> Streaming audio/video directly to Gemini 3.5 Flash via Vertex AI Low-Latency Sockets.'
    },
    'code-refactor': {
      model: 'Gemini 3.5 Pro (1M Token)',
      latency: '85 ms',
      tps: '350 files/min',
      cost: '95.5% Optimal',
      log: '🤖 <strong>[Agentic Refactoring Swarm]</strong> ADK Subagent swarm analyzing legacy codebase context and emitting post-quantum safe code diffs.'
    }
  };

  archBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      archBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const scenarioKey = btn.getAttribute('data-arch-scenario');
      const config = scenarioConfigs[scenarioKey];

      if (config) {
        if (archModelVal) archModelVal.textContent = config.model;
        if (archLatencyVal) archLatencyVal.textContent = config.latency;
        if (archTpsVal) archTpsVal.textContent = config.tps;
        if (archCostVal) archCostVal.textContent = config.cost;
        if (archLog) archLog.innerHTML = config.log;
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
    pqcSlider.addEventListener('input', (e) => {
      const year = parseInt(e.target.value);
      if (pqcYearLabel) pqcYearLabel.textContent = year;

      let vulnPct = Math.min(100, Math.max(10, (year - 2024) * 10 + 15));
      if (rsaVulnFill) rsaVulnFill.style.width = `${vulnPct}%`;

      if (year < 2027) {
        if (rsaStatus) rsaStatus.textContent = "✓ RSA Active (Migration Recommended)";
        if (pqcSummary) pqcSummary.innerHTML = `💡 <strong>Status (${year}):</strong> RSA-2048 is currently viable but vulnerable to Harvest-Now-Decrypt-Later threats.`;
      } else if (year < 2030) {
        if (rsaStatus) rsaStatus.textContent = "⚠️ High Risk (Quantum Sup. Approaching)";
        if (pqcSummary) pqcSummary.innerHTML = `⚠️ <strong>Status (${year}):</strong> PQC Hybrid mode (FIPS 203/204) mandatory for enterprise protection.`;
      } else {
        if (rsaStatus) rsaStatus.textContent = "❌ DEPRECATED / BROKEN";
        if (pqcSummary) pqcSummary.innerHTML = `🚨 <strong>Status (${year}):</strong> Classical RSA-2048 broken by Cryptographic Quantum Hardware. Full PQC required!`;
      }
    });
  }

  // --- 7. SRE Chaos Autoscaling Simulator ---
  const chaosSpikeBtn = document.getElementById('chaos-spike-btn');
  const chaosOutageBtn = document.getElementById('chaos-outage-btn');
  const chaosResetBtn = document.getElementById('chaos-reset-btn');
  const gkePodsVal = document.getElementById('gke-pods-val');
  const gkePodsFill = document.getElementById('gke-pods-fill');
  const sreLatencyVal = document.getElementById('sre-latency-val');
  const sreLatencyFill = document.getElementById('sre-latency-fill');
  const chaosConsoleLog = document.getElementById('chaos-console-log');

  if (chaosSpikeBtn) {
    chaosSpikeBtn.addEventListener('click', () => {
      if (gkePodsVal) gkePodsVal.textContent = "120 Pods (HPA Autoscaled 🚀)";
      if (gkePodsFill) gkePodsFill.style.width = "90%";
      if (sreLatencyVal) sreLatencyVal.textContent = "28 ms (Spike Mitigated ✓)";
      if (sreLatencyFill) sreLatencyFill.style.width = "20%";
      if (chaosConsoleLog) chaosConsoleLog.innerHTML = `💥 <strong>[Traffic Surge Detected]</strong> 10x HTTP RPS burst. GKE Autopilot scaled pod replicas from 12 to 120 in 4.2s. Zero dropped packets!`;
    });
  }

  if (chaosOutageBtn) {
    chaosOutageBtn.addEventListener('click', () => {
      if (gkePodsVal) gkePodsVal.textContent = "48 Pods (Failover Region)";
      if (gkePodsFill) gkePodsFill.style.width = "40%";
      if (sreLatencyVal) sreLatencyVal.textContent = "38 ms (Multi-Region DNS Reroute)";
      if (sreLatencyFill) sreLatencyFill.style.width = "30%";
      if (chaosConsoleLog) chaosConsoleLog.innerHTML = `⚡ <strong>[Regional Outage Injected]</strong> europe-west1 simulated offline. Cloud DNS automatically rerouted traffic to europe-west4 within 800ms.`;
    });
  }

  if (chaosResetBtn) {
    chaosResetBtn.addEventListener('click', () => {
      if (gkePodsVal) gkePodsVal.textContent = "12 Pods (Baseline)";
      if (gkePodsFill) gkePodsFill.style.width = "25%";
      if (sreLatencyVal) sreLatencyVal.textContent = "24 ms (Optimal)";
      if (sreLatencyFill) sreLatencyFill.style.width = "15%";
      if (chaosConsoleLog) chaosConsoleLog.innerHTML = `💻 <strong>[SRE Telemetry Console]</strong> Baseline state restored. All systems operating within normal parameters.`;
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
