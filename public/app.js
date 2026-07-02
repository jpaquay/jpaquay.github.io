// Attributes Data
const ATTRIBUTES = [
  { icon: '🌱', title: 'Eco Hacker', desc: 'IoT FarmBot & sustainable tech advocate', category: 'core' },
  { icon: '❤️', title: 'Dad of 3', desc: 'Proud father of 3 rockstar teenagers', category: 'core' },
  { icon: '🚴', title: 'I bike', desc: 'Commuter & cycling enthusiast', category: 'fun' },
  { icon: '🤝', title: 'I meet', desc: 'Connecting innovative teams', category: 'core' },
  { icon: '📚', title: 'I learn', desc: 'Continuous tech exploration', category: 'core' },
  { icon: '🧗', title: 'I climb', desc: 'Scaling physical & architecture heights', category: 'fun' },
  { icon: '😄', title: 'I laugh', desc: 'Hakuna matata philosophy', category: 'fun' },
  { icon: '💻', title: 'I code', desc: 'Building trusted systems & tools', category: 'skills' },
  { icon: '🧔', title: 'Great Beard', desc: 'Rocking a top-tier engineer beard', category: 'fun' },
  { icon: '🧠', title: 'Handsome Genius ™', desc: 'Verified 10x innovator', category: 'skills' },
  { icon: '🛡️', title: 'Crypto-Agile', desc: 'Post-quantum security advocate', category: 'skills' },
  { icon: '🎯', title: 'Turing Verified', desc: '100% Passed Turing Human Test', category: 'fun' }
];

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initSidebarDrawer();
  initAttributesGrid();
  initLifelineFilter();
  initCodeSimulator();
  initAIArchPlayground();
  initQuantumSimulator();
  initChaosSimulator();
  initTuringBadge();
});

// 1. Theme Switcher Engine
function initThemeSwitcher() {
  const themeButtons = document.querySelectorAll('.theme-btn');
  const htmlRoot = document.documentElement;

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const themeId = btn.getAttribute('data-theme-id');
      
      // Update Active Button
      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Set Theme Attribute
      htmlRoot.setAttribute('data-theme', themeId);

      // Dynamic Avatar Theme Badge Update
      const badgeIcon = document.querySelector('.avatar-theme-badge .badge-icon');
      if (badgeIcon) {
        const themeIcons = {
          minimal: '🌊',
          cyberpunk: '⚡',
          ghibli: '🍃',
          terminal: '📟'
        };
        badgeIcon.textContent = themeIcons[themeId] || '🛡️';
      }

      // Save Preference
      localStorage.setItem('cv-theme', themeId);
    });
  });

  // Restore Saved Theme (Default: Ocean Blue / minimal)
  const savedTheme = localStorage.getItem('cv-theme') || 'minimal';
  const targetBtn = document.querySelector(`.theme-btn[data-theme-id="${savedTheme}"]`);
  if (targetBtn) targetBtn.click();
}

// 2. Attributes Grid Filter
function initAttributesGrid() {
  const grid = document.getElementById('attributes-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function render(filter = 'all') {
    grid.innerHTML = '';
    const filtered = filter === 'all' 
      ? ATTRIBUTES 
      : ATTRIBUTES.filter(a => a.category === filter);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'attr-card';
      card.innerHTML = `
        <div class="attr-icon">${item.icon}</div>
        <div class="attr-info">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.getAttribute('data-filter'));
    });
  });

  render();
}

// 3. Programming Lifeline Tech Stack Filter & Horizontal Scroll Slider
function initLifelineFilter() {
  const filterBtns = document.querySelectorAll('.lifeline-filter-btn');
  const nodes = document.querySelectorAll('.lifeline-node');
  const scrollSlider = document.getElementById('lifeline-scroll-slider');
  const scrollContainer = document.getElementById('lifeline-scroll-container');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTech = btn.getAttribute('data-tech-filter');

      nodes.forEach(node => {
        const categories = (node.getAttribute('data-category') || '').split(' ');
        if (targetTech === 'all' || categories.includes(targetTech)) {
          node.classList.remove('dimmed');
        } else {
          node.classList.add('dimmed');
        }
      });
    });
  });

  // Sync Slider input to Horizontal Scroll Position
  if (scrollSlider && scrollContainer) {
    scrollSlider.addEventListener('input', (e) => {
      const pct = parseInt(e.target.value) / 100;
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      scrollContainer.scrollLeft = pct * maxScrollLeft;
    });

    scrollContainer.addEventListener('scroll', () => {
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (maxScrollLeft > 0) {
        const currentPct = Math.round((scrollContainer.scrollLeft / maxScrollLeft) * 100);
        scrollSlider.value = currentPct;
      }
    });
  }
}

// 3. 10x Code Simulator
function initCodeSimulator() {
  const runBtn = document.getElementById('run-code-btn');
  const outputBox = document.getElementById('code-output-box');

  runBtn.addEventListener('click', () => {
    outputBox.classList.remove('hidden');
    outputBox.innerHTML = `⚡ Executing: innovate("whats_next") ...<br>✨ <strong>Result:</strong> 10x Transformation Achieved! 🚀`;
  });
}

// Eras Data for Merged Lifeline Slider
const ERAS = [
  {
    minYear: 1991, maxYear: 1994,
    time: '1991 - 1994',
    icon: '🕹️',
    title: 'Commodore 64 & BASIC',
    desc: 'Jerome starts his programming journey with after-school BASIC lessons on the Commodore 64.',
    tags: ['BASIC', 'Commodore 64', '8-bit']
  },
  {
    minYear: 1995, maxYear: 1996,
    time: '1995 - 1996',
    icon: '💻',
    title: 'First PC & Web Birth',
    desc: 'Own Pentium 133MHz computer with 64MB RAM. Learning VBScript, Office Macros, MS Access, HTML, CSS, JavaScript, and Flash ActionScript.',
    tags: ['HTML', 'CSS', 'JavaScript', 'VBScript', 'ActionScript']
  },
  {
    minYear: 1997, maxYear: 1998,
    time: '1997 - 1998',
    icon: '🌐',
    title: '56kbps Internet & LAMP Web Stacks',
    desc: 'Internet at home @ 56kbps. Building web applications with ASP.net, IIS, WAMP, LAMP, PHP, MySQL, and Bash scripts.',
    tags: ['PHP', 'MySQL', 'Bash', 'LAMP', '56kbps']
  },
  {
    minYear: 1999, maxYear: 2001,
    time: '1999 - 2001',
    icon: '⚙️',
    title: 'CS Foundations & Systems Engineering',
    desc: 'University engineering years mastering MATLAB, C, C++, Java, UML, x86 Assembly, and SQL relational databases.',
    tags: ['C', 'C++', 'Java', 'Assembly', 'MATLAB', 'SQL']
  },
  {
    minYear: 2002, maxYear: 2005,
    time: '2002 - 2005',
    icon: '📁',
    title: 'GFS, MapReduce & Borg Infrastructure',
    desc: 'Google publishes the GFS (2002) & MapReduce (2004) papers, spawning Apache Hadoop & the Big Data movement. Borg container automation schedules billions of containers.',
    tags: ['GFS', 'MapReduce', 'Borg', 'Hadoop', 'IT Manager']
  },
  {
    minYear: 2006, maxYear: 2007,
    time: '2006 - 2007',
    icon: '🗄️',
    title: 'BigTable & Cisco Systems Architect',
    desc: 'Jerome joins Cisco as Solutions Architect. Google publishes BigTable paper (spawning HBase & NoSQL). Adopting Python, Rust & Node.js.',
    tags: ['BigTable', 'NoSQL', 'Python', 'Rust', 'Cisco IOS TCL']
  },
  {
    minYear: 2008, maxYear: 2013,
    time: '2008 - 2013',
    icon: '⚡',
    title: 'Dremel, Spanner & Cloud Infrastructure',
    desc: 'Google Cloud launches (2008). Dremel powers BigQuery, Spanner delivers global synchronous SQL, and Colossus upgrades storage layer.',
    tags: ['Spanner', 'Dremel', 'Colossus', 'Google Cloud', 'Cisco']
  },
  {
    minYear: 2014, maxYear: 2016,
    time: '2014 - 2016',
    icon: '☸️',
    title: 'Kubernetes Open Source & AlphaGo',
    desc: 'Google open-sources Kubernetes & TensorFlow! DeepMind AlphaGo defeats world champion (2015). Cloud native revolution begins.',
    tags: ['Kubernetes', 'TensorFlow', 'AlphaGo', 'Docker', 'Go']
  },
  {
    minYear: 2017, maxYear: 2019,
    time: '2017 - 2019',
    icon: '🧠',
    title: 'Transformer & Jerome joins Google Cloud',
    desc: 'Google invents Transformer ("Attention is All You Need"). Jerome joins Google Cloud as Customer Engineer (2018). BERT & T5 kickstart LLM era.',
    tags: ['Transformer', 'BERT', 'T5', 'Google Cloud', 'Customer Engineer']
  },
  {
    minYear: 2020, maxYear: 2022,
    time: '2020 - 2022',
    icon: '🧬',
    title: 'LaMDA, AlphaFold & Crypto Agility',
    desc: 'Google LaMDA conversational model & AlphaFold protein folding. Focus on enterprise crypto-agility for post-quantum threat mitigation.',
    tags: ['LaMDA', 'AlphaFold', 'Crypto-Agile', 'TypeScript', 'Flutter']
  },
  {
    minYear: 2023, maxYear: 2027,
    time: '2023 - 2027',
    icon: '✨',
    title: 'Gemini, Gemma & Post-Quantum Transition',
    desc: 'Google launches Gemini multimodal AI family & Gemma open models. Hybrid Post-Quantum Cryptography (FIPS 203/204) rollout in progress.',
    tags: ['Gemini', 'Gemma', 'PQC', 'FIPS 203/204', 'GKE']
  },
  {
    minYear: 2028, maxYear: 2031,
    time: '2028 - 2031',
    icon: '⚠️',
    title: 'CRQC Threat Horizon (Moderate/High Risk)',
    desc: 'Quantum computing scaling approaches Cryptographically Relevant Quantum Computer (CRQC) thresholds. Legacy RSA keys at elevated risk.',
    tags: ['CRQC Threshold', 'RSA-2048 Risk', 'PQC Mandatory', 'Zero Trust']
  },
  {
    minYear: 2032, maxYear: 2035,
    time: '2032 - 2035',
    icon: '🚨',
    title: 'Post-Quantum Era (Classical RSA Broken)',
    desc: 'Shor\'s algorithm running on fault-tolerant quantum hardware breaks classical RSA-2048/ECC. PQC (Dilithium/Kyber) protects quantum-safe systems.',
    tags: ['Shor\'s Algorithm', 'RSA Broken', 'PQC Immune', 'Quantum Supremacy']
  }
];

// 4. Standalone Post-Quantum Cryptography Threat Simulator
function initQuantumSimulator() {
  const slider = document.getElementById('quantum-slider');
  const yearLabel = document.getElementById('slider-year-label');
  const classicalStatus = document.getElementById('classical-status');
  const classicalVuln = document.getElementById('classical-vuln');
  const classicalVulnText = document.getElementById('classical-vuln-text');
  const summaryText = document.getElementById('pqc-summary-text');

  if (!slider) return;

  function updatePQC(year) {
    yearLabel.textContent = year;

    if (year < 2028) {
      classicalStatus.innerHTML = `<span class="indicator-dot green"></span> Secure`;
      const pct = Math.round(Math.max(10, ((year - 2024) / 11) * 100));
      classicalVuln.style.width = `${pct}%`;
      classicalVulnText.textContent = `Quantum Vulnerability: Low (${year})`;
      summaryText.innerHTML = `💡 <strong>Status (${year}):</strong> RSA/ECC currently safe, but preparing crypto-agility is key for long-life enterprise data.`;
    } else if (year >= 2028 && year <= 2031) {
      classicalStatus.innerHTML = `<span class="indicator-dot yellow"></span> Elevated Risk (CRQC Horizon)`;
      const pct = Math.round(((year - 2024) / 11) * 100);
      classicalVuln.style.width = `${pct}%`;
      classicalVulnText.textContent = `Quantum Vulnerability: Moderate / High (${year})`;
      summaryText.innerHTML = `⚠️ <strong>Warning (${year}):</strong> Quantum computing capabilities approaching CRQC threshold. Migrate legacy keys now!`;
    } else {
      classicalStatus.innerHTML = `<span class="indicator-dot red"></span> BROKEN BY SHOR'S ALGORITHM`;
      classicalVuln.style.width = `100%`;
      classicalVulnText.textContent = `Quantum Vulnerability: CRITICAL (Bypassed)`;
      summaryText.innerHTML = `🚨 <strong>CRITICAL (${year}):</strong> Classical RSA-2048 compromised by Quantum computers. Post-Quantum Cryptography (PQC) mandatory!`;
    }
  }

  slider.addEventListener('input', (e) => {
    updatePQC(parseInt(e.target.value));
  });

  updatePQC(parseInt(slider.value));
}

// 5. Sidebar Drawer Toggle
function initSidebarDrawer() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');

  if (sidebar) {
    // Click anywhere on sidebar (outside interactive buttons/links) to toggle fold
    sidebar.addEventListener('click', (e) => {
      // Prevent toggling when clicking directly on interactive links or buttons
      if (e.target.closest('a, button, input, select, textarea')) {
        return;
      }
      sidebar.classList.toggle('collapsed');
    });
  }

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });
  }
}

// 6. Interactive SRE & Cloud Autoscaling Chaos Simulator
function initChaosSimulator() {
  const btnSpike = document.getElementById('chaos-btn-spike');
  const btnOutage = document.getElementById('chaos-btn-outage');
  const btnReset = document.getElementById('chaos-btn-reset');

  const gkeCount = document.getElementById('gke-pod-count');
  const gkeStatus = document.getElementById('gke-status-tag');
  const gkeFill = document.getElementById('gke-pod-fill');
  const gkeLabel = document.getElementById('gke-autoscale-label');

  const latencyValue = document.getElementById('latency-value');
  const latencyStatus = document.getElementById('latency-status-tag');
  const latencyFill = document.getElementById('latency-fill');
  const latencyLabel = document.getElementById('latency-label');

  const spannerValue = document.getElementById('spanner-value');
  const spannerStatus = document.getElementById('spanner-status-tag');
  const spannerFill = document.getElementById('spanner-fill');
  const spannerLabel = document.getElementById('spanner-label');

  const consoleBox = document.getElementById('chaos-console');

  if (!btnSpike) return;

  let currentMode = 'normal'; // 'normal', 'spike', 'outage'
  let liveTimer = null;

  function setMetricStatus(elem, status, text) {
    elem.className = `metric-status ${status}`;
    elem.textContent = text;
  }

  // Continuous Telemetry Live Loop (Simulates real-time Prometheus / Cloud Monitoring data stream)
  function startLiveTelemetry() {
    if (liveTimer) clearInterval(liveTimer);
    liveTimer = setInterval(() => {
      if (currentMode === 'normal') {
        // Subtle real-time latency jitter (21ms - 27ms)
        const jitterLatency = 21 + Math.floor(Math.random() * 7);
        latencyValue.textContent = `${jitterLatency} ms`;
        latencyFill.style.width = `${Math.round((jitterLatency / 100) * 100)}%`;
      } else if (currentMode === 'spike') {
        // Active load jitter during traffic spike
        const jitterLatency = 26 + Math.floor(Math.random() * 6);
        const jitterPods = 62 + Math.floor(Math.random() * 5);
        gkeCount.textContent = `${jitterPods} Pods`;
        latencyValue.textContent = `${jitterLatency} ms`;
      } else if (currentMode === 'outage') {
        const jitterLatency = 32 + Math.floor(Math.random() * 8);
        latencyValue.textContent = `${jitterLatency} ms`;
      }
    }, 1200);
  }

  // 10x Traffic Spike Simulation
  btnSpike.addEventListener('click', () => {
    currentMode = 'spike';
    // Stage 1: Initial Spike Impact
    setMetricStatus(gkeStatus, 'yellow', 'SCALING UP');
    gkeCount.textContent = '48 Pods';
    gkeFill.style.width = '85%';
    gkeFill.className = 'progress-fill warn';
    gkeLabel.textContent = 'Horizontal Pod Autoscaler (HPA): Active (CPU 92%)';

    setMetricStatus(latencyStatus, 'yellow', 'SPIKE DETECTED');
    latencyValue.textContent = '142 ms';
    latencyFill.style.width = '75%';
    latencyFill.className = 'progress-fill warn';
    latencyLabel.textContent = 'SLO Warning: Traffic Surge +850%';

    setMetricStatus(spannerStatus, 'green', 'HEALTHY');
    spannerValue.textContent = '99.999% Sync';
    spannerFill.style.width = '100%';
    spannerFill.className = 'progress-fill safe';

    consoleBox.innerHTML = `⚠️ <strong>[SRE ALERT ${new Date().toLocaleTimeString()}]</strong> Traffic spike detected (+850% rps). Triggering GKE Horizontal Pod Autoscaler (HPA) scale-out 12 ➔ 48 pods...`;

    // Stage 2: Autoscaling Recovery after 1.5s
    setTimeout(() => {
      if (currentMode !== 'spike') return;
      setMetricStatus(gkeStatus, 'green', 'STABILIZED');
      gkeCount.textContent = '64 Pods';
      gkeFill.style.width = '95%';
      gkeFill.className = 'progress-fill safe';

      setMetricStatus(latencyStatus, 'green', 'SLO RECOVERED');
      latencyValue.textContent = '28 ms';
      latencyFill.style.width = '28%';
      latencyFill.className = 'progress-fill safe';
      latencyLabel.textContent = 'SLO Restored: p99 &lt; 30 ms';

      consoleBox.innerHTML = `✅ <strong>[SRE AUTO-RECOVERY ${new Date().toLocaleTimeString()}]</strong> GKE HPA expanded cluster capacity to 64 replicas. Traffic load absorbed. Latency restored to 28ms!`;
    }, 1500);
  });

  // Region Outage Simulation
  btnOutage.addEventListener('click', () => {
    currentMode = 'outage';
    setMetricStatus(gkeStatus, 'yellow', 'DRAINING');
    gkeFill.style.width = '55%';
    gkeFill.className = 'progress-fill warn';
    gkeLabel.textContent = 'Cloud Load Balancing: Diverting europe-west1 ➔ europe-west4';

    setMetricStatus(latencyStatus, 'yellow', 'REROUTING');
    latencyValue.textContent = '86 ms';
    latencyFill.style.width = '55%';
    latencyFill.className = 'progress-fill warn';

    setMetricStatus(spannerStatus, 'yellow', 'FAILOVER ACTIVE');
    spannerValue.textContent = 'Leader Elected';
    spannerFill.style.width = '60%';
    spannerFill.className = 'progress-fill warn';
    spannerLabel.textContent = 'Quorum Failover: europe-west4 (Leader)';

    consoleBox.innerHTML = `⚡ <strong>[CHAOS INCIDENT ${new Date().toLocaleTimeString()}]</strong> Regional network degradation simulated in europe-west1. Initiating Cloud Load Balancing failover...`;

    setTimeout(() => {
      if (currentMode !== 'outage') return;
      setMetricStatus(spannerStatus, 'green', 'FAILOVER COMPLETE');
      spannerValue.textContent = '100% Failover';
      spannerFill.style.width = '100%';
      spannerFill.className = 'progress-fill safe';

      setMetricStatus(gkeStatus, 'green', 'ONLINE');
      gkeCount.textContent = '32 Pods (west4)';
      gkeFill.style.width = '50%';
      gkeFill.className = 'progress-fill safe';

      consoleBox.innerHTML = `🛡️ <strong>[ZERO-DOWNTIME FAILOVER ${new Date().toLocaleTimeString()}]</strong> Multi-Region Spanner quorum leader re-elected in europe-west4. Zero data loss achieved!`;
    }, 1500);
  });

  // Reset Baseline
  btnReset.addEventListener('click', () => {
    currentMode = 'normal';
    setMetricStatus(gkeStatus, 'green', 'NORMAL');
    gkeCount.textContent = '12 Pods';
    gkeFill.style.width = '25%';
    gkeFill.className = 'progress-fill safe';
    gkeLabel.textContent = 'Autoscaler: Idle (Target 70% CPU)';

    setMetricStatus(latencyStatus, 'green', 'OPTIMAL');
    latencyValue.textContent = '24 ms';
    latencyFill.style.width = '15%';
    latencyFill.className = 'progress-fill safe';
    latencyLabel.textContent = 'SLO Target: &lt; 100 ms';

    setMetricStatus(spannerStatus, 'green', 'HEALTHY');
    spannerValue.textContent = '99.999% Sync';
    spannerFill.style.width = '100%';
    spannerFill.className = 'progress-fill safe';
    spannerLabel.textContent = 'Quorum Leader: europe-west1';

    consoleBox.innerHTML = `💻 <strong>[SRE Telemetry Console]</strong> Baseline state restored. All cluster metrics nominal.`;
  });

  // Start telemetry loop automatically
  startLiveTelemetry();
}

// 6. Google Cloud AI Architecture Sandbox & Flow Visualizer
function initAIArchPlayground() {
  const scenarioBtns = document.querySelectorAll('.arch-scenario-btn');
  const ingestVal = document.getElementById('arch-ingest-val');
  const ingestDesc = document.getElementById('arch-ingest-desc');
  const ingestBadge = document.getElementById('arch-ingest-badge');

  const computeVal = document.getElementById('arch-compute-val');
  const computeDesc = document.getElementById('arch-compute-desc');
  const computeBadge = document.getElementById('arch-compute-badge');

  const modelVal = document.getElementById('arch-model-val');
  const modelDesc = document.getElementById('arch-model-desc');
  const modelBadge = document.getElementById('arch-model-badge');

  const secVal = document.getElementById('arch-sec-val');
  const secDesc = document.getElementById('arch-sec-desc');
  const secBadge = document.getElementById('arch-sec-badge');

  const metricModel = document.getElementById('arch-metric-model');
  const metricLatency = document.getElementById('arch-metric-latency');
  const metricTps = document.getElementById('arch-metric-tps');
  const metricCost = document.getElementById('arch-metric-cost');

  const flowLog = document.getElementById('arch-flow-log');

  if (!scenarioBtns.length || !ingestVal) return;

  const SCENARIOS = {
    'doc-ai': {
      ingest: { val: 'GCS Secure Bucket', desc: 'Customer PDF/Document store with KMS Encryption.', badge: 'Cloud Storage' },
      compute: { val: 'GKE Autopilot + Ray', desc: 'Distributed container scaling with auto-provisioned GPUs.', badge: 'GKE Autopilot' },
      model: { val: 'Gemini 3.5 Pro', desc: '1M Token Context Window & Multimodal Reasoning.', badge: 'Vertex AI' },
      sec: { val: 'BeyondCorp + IAM', desc: 'Context-aware access, Secret Manager, DLP data masking.', badge: 'BeyondCorp' },
      metrics: { model: 'Gemini 3.5 Pro', latency: '42 ms', tps: '1,250 doc/sec', cost: '98% Optimal' },
      log: `⚡ <strong>[Gemini 3.5 AI Pipeline]</strong> Initialized EU Public Sector Document Pipeline. Gemini 3.5 Pro active with zero-data retention security policy.`
    },
    'multimodal': {
      ingest: { val: 'Pub/Sub Realtime Stream', desc: 'High-throughput video & image payload stream.', badge: 'Pub/Sub' },
      compute: { val: 'Cloud Run v2 GPU', desc: 'Serverless microservice scaling to 0 when idle.', badge: 'Cloud Run' },
      model: { val: 'Gemini 3.5 Flash', desc: 'Low-latency native audio/video multimodal stream.', badge: 'Vertex AI Flash' },
      sec: { val: 'VPC Service Controls', desc: 'Perimeter isolation preventing data exfiltration.', badge: 'VPC Security' },
      metrics: { model: 'Gemini 3.5 Flash', latency: '14 ms', tps: '8,400 stream/sec', cost: '99.4% Efficient' },
      log: `🎥 <strong>[Gemini 3.5 Multimodal Stream]</strong> Real-time video stream connected. Sub-20ms inference latency achieved via Cloud Run GPU endpoints!`
    },
    'code-refactor': {
      ingest: { val: 'Piper / Git Repository', desc: 'Monorepo source code & CL change inspection.', badge: 'Git/Piper' },
      compute: { val: 'ADK Agent Runtime', desc: 'Multi-agent orchestration engine & tool executor.', badge: 'Agent Engine' },
      model: { val: 'Gemini 3.5 Pro Code', desc: 'Deep reasoning model for automated code refactoring.', badge: 'Vertex AI Code' },
      sec: { val: 'Binary Authorization', desc: 'Cryptographic container provenance verification.', badge: 'SecOps' },
      metrics: { model: 'Gemini 3.5 Pro Code', latency: '65 ms', tps: '450 refactor/min', cost: '95% Cost-Effective' },
      log: `🤖 <strong>[ADK Agentic Workflow]</strong> Autonomous refactoring pipeline active. Gemini 3.5 Pro analyzing dependency tree and writing unit tests.`
    }
  };

  scenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scenarioBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const scenarioKey = btn.getAttribute('data-scenario');
      const data = SCENARIOS[scenarioKey];
      if (!data) return;

      // Update Node 1
      ingestVal.textContent = data.ingest.val;
      ingestDesc.textContent = data.ingest.desc;
      ingestBadge.textContent = data.ingest.badge;

      // Update Node 2
      computeVal.textContent = data.compute.val;
      computeDesc.textContent = data.compute.desc;
      computeBadge.textContent = data.compute.badge;

      // Update Node 3
      modelVal.textContent = data.model.val;
      modelDesc.textContent = data.model.desc;
      modelBadge.textContent = data.model.badge;

      // Update Node 4
      secVal.textContent = data.sec.val;
      secDesc.textContent = data.sec.desc;
      secBadge.textContent = data.sec.badge;

      // Update Metrics
      metricModel.textContent = data.metrics.model;
      metricLatency.textContent = data.metrics.latency;
      metricTps.textContent = data.metrics.tps;
      metricCost.textContent = data.metrics.cost;

      // Update Log
      flowLog.innerHTML = data.log;
    });
  });
}

// 7. Interactive Turing Badge
function initTuringBadge() {
  const badge = document.getElementById('turing-badge');
  if (badge) {
    badge.addEventListener('click', () => {
      alert("🤖 CAPTCHA Verification:\n✓ Jerome Paquay is 100% confirmed Human (Passed Turing Test).");
    });
  }
}
