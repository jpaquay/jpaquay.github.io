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

  // --- 4. Filterable Verified Traits (Compact Tag Cloud Style) ---
  const traitsData = [
    { text: "I bike", type: "core", icon: "🚴" },
    { text: "I meet", type: "core", icon: "🤝" },
    { text: "I learn", type: "core", icon: "📚" },
    { text: "I climb", type: "fun", icon: "🧗" },
    { text: "I laugh", type: "fun", icon: "😂" },
    { text: "I code", type: "skills", icon: "💻" },
    { text: "I rock a great beard", type: "fun", icon: "🧔" },
    { text: "Handsome genius ™", type: "fun", icon: "✨" },
    { text: "Completely Automated Public Turing Test Passed", type: "skills", icon: "🤖" }
  ];

  const traitsContainer = document.getElementById('traits-tag-cloud');
  const traitFilters = document.querySelectorAll('[data-attr-filter]');

  const renderTraits = (filter = 'all') => {
    if (!traitsContainer) return;
    traitsContainer.innerHTML = '';
    
    const filtered = filter === 'all' 
      ? traitsData 
      : traitsData.filter(item => item.type === filter);

    filtered.forEach(item => {
      const badge = document.createElement('span');
      badge.className = 'vp-trait-badge';
      badge.innerHTML = `<span class="vp-trait-icon">${item.icon}</span> ${item.text}`;
      traitsContainer.appendChild(badge);
    });
  };

  renderTraits();

  traitFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      traitFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTraits(btn.getAttribute('data-attr-filter'));
    });
  });

  // --- 5. Programming Lifeline Filter ---
  const lifelineFilters = document.querySelectorAll('[data-lifeline-filter]');
  const lifelineCards = document.querySelectorAll('.vp-lifeline-card');

  lifelineFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      lifelineFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-lifeline-filter');
      lifelineCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Google Cloud AI Architecture Sandbox ---
  const archScenarioBtns = document.querySelectorAll('[data-arch-scenario]');
  const archModelVal = document.getElementById('arch-model-val');
  const archLatencyVal = document.getElementById('arch-metric-latency');
  const archTpsVal = document.getElementById('arch-metric-tps');
  const archCostVal = document.getElementById('arch-metric-cost');
  const archLog = document.getElementById('arch-flow-log');

  const archScenarios = {
    'doc-ai': {
      model: 'Gemini 3.5 Pro',
      latency: '42 ms',
      tps: '1,250 doc/sec',
      cost: '98% Optimal',
      log: '⚡ [Doc AI Pipeline] Processing EU Public Sector document queue with Zero-Trust Secret Manager & KMS.'
    },
    'multimodal': {
      model: 'Gemini 3.5 Flash Multimodal',
      latency: '18 ms',
      tps: '4,500 frames/sec',
      cost: '99% Optimal',
      log: '🎥 [Multimodal Stream] Real-time audio/video ingestion on GKE Autopilot + Ray GPUs.'
    },
    'code-refactor': {
      model: 'Gemini 3.5 Pro Agentic Swarm',
      latency: '85 ms',
      tps: '3,200 LOC/sec',
      cost: '96% Optimal',
      log: '🐝 [Agentic Refactoring] Swarm intelligence running parallel unit testing and security compliance audits.'
    }
  };

  archScenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      archScenarioBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const scenarioKey = btn.getAttribute('data-arch-scenario');
      const data = archScenarios[scenarioKey];
      if (data) {
        if (archModelVal) archModelVal.textContent = data.model;
        if (archLatencyVal) archLatencyVal.textContent = data.latency;
        if (archTpsVal) archTpsVal.textContent = data.tps;
        if (archCostVal) archCostVal.textContent = data.cost;
        if (archLog) archLog.innerHTML = data.log;
      }
    });
  });

  // --- 7. Post-Quantum Cryptography Simulator ---
  const pqcSlider = document.getElementById('pqc-slider');
  const pqcYearLabel = document.getElementById('pqc-year-label');
  const rsaStatus = document.getElementById('rsa-status');
  const rsaVulnFill = document.getElementById('rsa-vuln-fill');
  const pqcSummary = document.getElementById('pqc-summary');

  if (pqcSlider) {
    pqcSlider.addEventListener('input', (e) => {
      const year = parseInt(e.target.value, 10);
      if (pqcYearLabel) pqcYearLabel.textContent = year;

      let vulnPercent = Math.min(100, Math.max(10, (year - 2024) * 10 + 15));
      if (rsaVulnFill) rsaVulnFill.style.width = `${vulnPercent}%`;

      if (year >= 2030) {
        if (rsaStatus) rsaStatus.innerHTML = `<span style="color: #ef4444;">⚠️ Deprecated / Broken</span>`;
        if (pqcSummary) pqcSummary.innerHTML = `🚨 <strong>Status (${year}):</strong> Quantum computers exceed CRQC threshold. RSA-2048 broken. PQC FIPS 203/204 is MANDATORY!`;
      } else if (year >= 2028) {
        if (rsaStatus) rsaStatus.innerHTML = `<span style="color: #f59e0b;">⚡ High Risk</span>`;
        if (pqcSummary) pqcSummary.innerHTML = `⚠️ <strong>Status (${year}):</strong> Store-now-decrypt-later threat elevated. Organizations adopting hybrid PQC suites.`;
      } else {
        if (rsaStatus) rsaStatus.innerHTML = `<span style="color: #10b981;">✓ Active Transition</span>`;
        if (pqcSummary) pqcSummary.innerHTML = `💡 <strong>Status (${year}):</strong> Transitioning algorithms to PQC hybrid mode ensures long-term data security.`;
      }
    });
  }

  // --- 8. SRE Chaos Autoscaling Simulator ---
  const chaosSpikeBtn = document.getElementById('chaos-spike-btn');
  const chaosOutageBtn = document.getElementById('chaos-outage-btn');
  const chaosResetBtn = document.getElementById('chaos-reset-btn');

  const gkePodsVal = document.getElementById('gke-pods-val');
  const gkePodsFill = document.getElementById('gke-pods-fill');
  const latencyVal = document.getElementById('sre-latency-val');
  const latencyFill = document.getElementById('sre-latency-fill');
  const chaosConsole = document.getElementById('chaos-console-log');

  if (chaosSpikeBtn) {
    chaosSpikeBtn.addEventListener('click', () => {
      if (gkePodsVal) gkePodsVal.textContent = '64 Pods (Scaled up)';
      if (gkePodsFill) gkePodsFill.style.width = '85%';
      if (latencyVal) latencyVal.textContent = '38 ms (Mitigated)';
      if (latencyFill) latencyFill.style.width = '38%';
      if (chaosConsole) chaosConsole.innerHTML = `💥 <strong>[Traffic Spike]</strong> 10x HTTP requests detected! GKE HPA autoscaled 12 -> 64 pods. Latency stabilized at 38ms.`;
    });
  }

  if (chaosOutageBtn) {
    chaosOutageBtn.addEventListener('click', () => {
      if (gkePodsVal) gkePodsVal.textContent = '32 Pods (Failover Region)';
      if (gkePodsFill) gkePodsFill.style.width = '50%';
      if (latencyVal) latencyVal.textContent = '45 ms (Cross-Region)';
      if (latencyFill) latencyFill.style.width = '45%';
      if (chaosConsole) chaosConsole.innerHTML = `⚡ <strong>[Region Outage]</strong> Simulated europe-west1 failure! Traffic rerouted to europe-west4 via Cloud Load Balancer in 1.2 seconds.`;
    });
  }

  if (chaosResetBtn) {
    chaosResetBtn.addEventListener('click', () => {
      if (gkePodsVal) gkePodsVal.textContent = '12 Pods (Baseline)';
      if (gkePodsFill) gkePodsFill.style.width = '25%';
      if (latencyVal) latencyVal.textContent = '24 ms (Optimal)';
      if (latencyFill) latencyFill.style.width = '15%';
      if (chaosConsole) chaosConsole.innerHTML = `💻 <strong>[SRE Baseline]</strong> Infrastructure restored to baseline parameters. All metrics nominal.`;
    });
  }
});
