---
layout: page
title: About Jerome Paquay
subtitle: Enterprise Architect @ Google Cloud • Building trusted relationships & solving tough engineering problems
cover-img: /assets/img/ai_act_transparency_provenance_map.webp
thumbnail-img: /assets/img/author.jpg
share-img: /assets/img/author.jpg
tags: [about, story, architecture, google-cloud, pqc, sre]
readtime: true
---

<style>
  .nd-about-wrap {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #202124;
  }
  .nd-hero-card {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.75rem;
    border-radius: 14px;
    background: linear-gradient(135deg, #f8faff 0%, #eef4ff 100%);
    border: 1px solid #d2e3fc;
    margin-bottom: 2rem;
  }
  .nd-hero-main {
    flex: 1 1 380px;
  }
  .nd-badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.85rem;
  }
  .nd-badge {
    display: inline-block;
    padding: 0.28rem 0.75rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
  .nd-badge-primary {
    background: #1a73e8;
    color: #ffffff;
  }
  .nd-badge-verified {
    background: #e6f4ea;
    color: #137333;
    border: 1px solid #ceead6;
  }
  .nd-avatar-box {
    flex: 0 0 180px;
    text-align: center;
    margin: 0 auto;
  }
  .nd-avatar-box img {
    width: 136px;
    height: 136px;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid #1a73e8;
    box-shadow: 0 6px 18px rgba(26, 115, 232, 0.2);
  }
  .nd-avatar-box h4 {
    margin: 0.65rem 0 0.15rem;
    font-size: 1rem;
    font-weight: 700;
  }
  .nd-avatar-box p {
    margin: 0;
    font-size: 0.8rem;
    color: #5f6368;
  }
  .nd-credly-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin: 1.25rem 0 2rem;
  }
  .nd-credly-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.15rem;
    border-radius: 12px;
    border: 1px solid #dadce0;
    background: #ffffff;
    text-decoration: none !important;
    color: inherit !important;
    transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
  }
  .nd-credly-card:hover {
    transform: translateY(-2px);
    border-color: #1a73e8;
    box-shadow: 0 6px 16px rgba(26, 115, 232, 0.12);
  }
  .nd-credly-card img {
    width: 72px;
    height: 72px;
    object-fit: contain;
    flex-shrink: 0;
  }
  .nd-credly-issuer {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #1a73e8;
    letter-spacing: 0.04em;
  }
  .nd-credly-card h4 {
    margin: 0.15rem 0 0.3rem;
    font-size: 0.98rem;
    font-weight: 700;
  }
  .nd-credly-card p {
    margin: 0 0 0.3rem;
    font-size: 0.82rem;
    color: #5f6368;
    line-height: 1.4;
  }
  .nd-credly-verify {
    font-size: 0.78rem;
    font-weight: 700;
    color: #1a73e8;
  }
  .nd-filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin: 0.75rem 0 1.1rem;
  }
  .nd-filter-btn {
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    border: 1px solid #dadce0;
    background: #f8f9fa;
    font-size: 0.82rem;
    font-weight: 600;
    color: #3c4043;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .nd-filter-btn.active,
  .nd-filter-btn:hover {
    background: #1a73e8;
    color: #ffffff;
    border-color: #1a73e8;
  }
  .nd-attr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 0.85rem;
    margin-bottom: 2rem;
  }
  .nd-attr-card {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border-radius: 10px;
    border: 1px solid #e8eaed;
    background: #ffffff;
  }
  .nd-attr-icon {
    font-size: 1.45rem;
    line-height: 1;
  }
  .nd-attr-card h5 {
    margin: 0 0 0.2rem;
    font-size: 0.92rem;
    font-weight: 700;
  }
  .nd-attr-card p {
    margin: 0;
    font-size: 0.78rem;
    color: #5f6368;
    line-height: 1.35;
  }
  .nd-lifeline-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .nd-lifeline-card {
    padding: 1rem 1.1rem;
    border-radius: 12px;
    border: 1px solid #e0e3e7;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .nd-lifeline-year {
    display: inline-block;
    padding: 0.15rem 0.55rem;
    border-radius: 6px;
    background: #e8f0fe;
    color: #1967d2;
    font-family: monospace;
    font-size: 0.78rem;
    font-weight: 700;
    margin-bottom: 0.45rem;
    width: fit-content;
  }
  .nd-lifeline-card h4 {
    margin: 0 0 0.4rem;
    font-size: 0.98rem;
    font-weight: 700;
  }
  .nd-lifeline-card p {
    margin: 0 0 0.65rem;
    font-size: 0.83rem;
    color: #4b5563;
    line-height: 1.45;
  }
  .nd-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .nd-tag {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    background: #f1f3f4;
    color: #3c4043;
  }
  .nd-timeline-item {
    border-left: 3px solid #1a73e8;
    padding-left: 1.25rem;
    margin-bottom: 1.5rem;
  }
  .nd-timeline-date {
    font-size: 0.8rem;
    font-weight: 700;
    color: #1a73e8;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .nd-timeline-item h4 {
    margin: 0.2rem 0 0.1rem;
    font-weight: 700;
  }
  .nd-timeline-company {
    font-size: 0.9rem;
    font-weight: 600;
    color: #5f6368;
    margin-bottom: 0.45rem;
  }
  .nd-garage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 0.9rem;
    margin: 1rem 0 2rem;
  }
  .nd-garage-card {
    display: block;
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #dadce0;
    background: #ffffff;
    text-decoration: none !important;
    color: inherit !important;
    transition: border-color 0.15s ease, transform 0.15s ease;
  }
  .nd-garage-card:hover {
    border-color: #1a73e8;
    transform: translateY(-2px);
  }
  .nd-garage-card h4 {
    margin: 0 0 0.25rem;
    font-size: 0.96rem;
    font-weight: 700;
  }
  .nd-garage-card p {
    margin: 0 0 0.4rem;
    font-size: 0.8rem;
    color: #5f6368;
  }
  .nd-garage-url {
    font-family: monospace;
    font-size: 0.76rem;
    color: #1a73e8;
    font-weight: 700;
  }
</style>

<div class="nd-about-wrap">

  <!-- 1. Hero / Executive Summary -->
  <div class="nd-hero-card">
    <div class="nd-hero-main">
      <div class="nd-badge-row">
        <span class="nd-badge nd-badge-primary">Enterprise Architect @ Google Cloud</span>
        <span class="nd-badge nd-badge-verified">Turing Test Verified Human ✓</span>
      </div>
      <h2 style="margin-top:0;">Hi, I'm Jerome 👋</h2>
      <p style="font-size:1.02rem; line-height:1.6; margin-bottom:0.9rem;">
        Building trusted relationships with people by listening to their needs and meeting them where they are in their transformation. Solving tough engineering problems and accelerating organizations to the next step in digitalization.
      </p>
      <p style="font-size:0.9rem; color:#5f6368; margin:0;">
        Born and raised in <a href="https://goo.gl/maps/Xhy4aBu1WYrbBHe97" target="_blank" rel="noopener noreferrer">Brussels, Belgium 🇧🇪</a> • <code>/net/dev</code> is my online garage • <em>"Hakuna matata — take it easy, there are no worries."</em>
      </p>
    </div>
    <div class="nd-avatar-box">
      <img src="/assets/img/author.jpg" alt="Jerome Paquay">
      <h4>Handsome Genius ™</h4>
      <p>Brussels, Belgium • 20+ Years in IT</p>
    </div>
  </div>

</div>

```javascript
var innovate = function(x) {
  return (10 * x);
};
innovate("whats_next"); // 🚀 Output: 10x Transformation
```

---

### Verified Certifications & Credentials 🏅

Official third-party Google Cloud digital badges verified on Credly:

<div class="nd-credly-grid">
  <a href="https://www.credly.com/badges/eaea15ea-eb91-4a22-84c5-53013f122ecf" target="_blank" rel="noopener noreferrer" class="nd-credly-card">
    <img src="https://images.credly.com/images/71c579e0-51fd-4247-b493-d2fa8167157a/linkedin_thumb_image.png" alt="Professional Cloud Architect Certification" loading="lazy" decoding="async">
    <div>
      <div class="nd-credly-issuer">Google Cloud</div>
      <h4>Professional Cloud Architect Certification</h4>
      <p>Design, develop, and manage robust, secure, scalable, highly available, and dynamic solution architectures on Google Cloud.</p>
      <span class="nd-credly-verify">Verify on Credly ↗</span>
    </div>
  </a>

  <a href="https://www.credly.com/badges/2840fdb9-da00-4819-8a5a-f352ffb4f135" target="_blank" rel="noopener noreferrer" class="nd-credly-card">
    <img src="https://images.credly.com/images/a45057f4-ec6b-4c13-ab9d-60f54b4fc7e2/linkedin_thumb_blob" alt="Accelerate 2026 Hackathon Participant" loading="lazy" decoding="async">
    <div>
      <div class="nd-credly-issuer">Explore Google Cloud</div>
      <h4>Accelerate 2026 Hackathon Participant</h4>
      <p>Earned for hacking into the future and building AI &amp; agentic cloud architectures at Google Cloud Accelerate 2026.</p>
      <span class="nd-credly-verify">Verify on Credly ↗</span>
    </div>
  </a>
</div>

---

### Verified Attributes & Capabilities 🎯

Interactive filterable trait matrix based on human Turing verification:

<div class="nd-filter-bar" id="nd-attr-filters">
  <button type="button" class="nd-filter-btn active" data-attr-filter="all">🌟 All Traits</button>
  <button type="button" class="nd-filter-btn" data-attr-filter="core">👤 Core Traits</button>
  <button type="button" class="nd-filter-btn" data-attr-filter="skills">⚡ Tech &amp; Architecture</button>
  <button type="button" class="nd-filter-btn" data-attr-filter="fun">😄 Fun &amp; Family</button>
</div>

<div class="nd-attr-grid" id="nd-attr-grid">
  <div class="nd-attr-card" data-attr-cat="core">
    <span class="nd-attr-icon">🌱</span>
    <div><h5>Eco Hacker</h5><p>IoT FarmBot &amp; sustainable tech advocate</p></div>
  </div>
  <div class="nd-attr-card" data-attr-cat="core">
    <span class="nd-attr-icon">❤️</span>
    <div><h5>Dad of 3</h5><p>Proud father of 3 rockstar teenagers</p></div>
  </div>
  <div class="nd-attr-card" data-attr-cat="fun">
    <span class="nd-attr-icon">🚴</span>
    <div><h5>I bike</h5><p>Commuter &amp; cycling enthusiast</p></div>
  </div>
  <div class="nd-attr-card" data-attr-cat="core">
    <span class="nd-attr-icon">🤝</span>
    <div><h5>I meet</h5><p>Connecting innovative teams</p></div>
  </div>
  <div class="nd-attr-card" data-attr-cat="core">
    <span class="nd-attr-icon">📚</span>
    <div><h5>I learn</h5><p>Continuous tech exploration</p></div>
  </div>
  <div class="nd-attr-card" data-attr-cat="fun">
    <span class="nd-attr-icon">🧗</span>
    <div><h5>I climb</h5><p>Scaling physical &amp; architecture heights</p></div>
  </div>
  <div class="nd-attr-card" data-attr-cat="fun">
    <span class="nd-attr-icon">😄</span>
    <div><h5>I laugh</h5><p>Hakuna matata philosophy</p></div>
  </div>
  <div class="nd-attr-card" data-attr-cat="skills">
    <span class="nd-attr-icon">💻</span>
    <div><h5>I code</h5><p>Building trusted systems &amp; tools</p></div>
  </div>
  <div class="nd-attr-card" data-attr-cat="fun">
    <span class="nd-attr-icon">🧔</span>
    <div><h5>Great Beard</h5><p>Rocking a top-tier engineer beard</p></div>
  </div>
  <div class="nd-attr-card" data-attr-cat="skills">
    <span class="nd-attr-icon">🧠</span>
    <div><h5>Handsome Genius ™</h5><p>Verified 10x innovator</p></div>
  </div>
  <div class="nd-attr-card" data-attr-cat="skills">
    <span class="nd-attr-icon">🛡️</span>
    <div><h5>Crypto-Agile</h5><p>Post-quantum security advocate</p></div>
  </div>
  <div class="nd-attr-card" data-attr-cat="skills">
    <span class="nd-attr-icon">🎯</span>
    <div><h5>Turing Verified</h5><p>100% Passed Turing Human Test</p></div>
  </div>
</div>

---

### Philosophy & Leadership 📖

I’m a passionate technologist with a recognized customer-centric attitude working for over twenty years in IT. I strive to provide my teams with the best solutions taking into account their needs and expectations. This produced dozens of successful projects from launch to landing.

In my role as Enterprise Architect with [Google Cloud](https://cloud.google.com), I design and develop architectures for on-premise and cloud-based systems to solve large global organizations' business requirements. I have a natural leadership that expresses best when organizing cross-functional teams around concrete goals.

{: .box-note}
**Cybersecurity for the Quantum Era 🛡️⚡** — Quantum computers are expected to soon break traditional public-key cryptography (`RSA-2048` / `ECC`). Transitioning enterprise systems to Post-Quantum Cryptography (`FIPS 203/204` — `ML-KEM / Kyber` & `Dilithium`) hybrid mode ensures long-term protection against store-now-decrypt-later attacks. Become [crypto-agile](https://cloud.google.com/blog/products/identity-security/how-google-is-preparing-for-a-post-quantum-world).

---

### My Programming Lifeline 🚀 (1991 – 2026+)

Personal code history, key milestones, language evolutions, and tech stack experience since 1991:

<div class="nd-filter-bar" id="nd-lifeline-filters">
  <button type="button" class="nd-filter-btn active" data-tech-filter="all">🌐 All Stack</button>
  <button type="button" class="nd-filter-btn" data-tech-filter="programming">💻 Programming &amp; Web</button>
  <button type="button" class="nd-filter-btn" data-tech-filter="cloud">☁️ Cloud &amp; Infra</button>
  <button type="button" class="nd-filter-btn" data-tech-filter="ai">🤖 AI &amp; ML</button>
  <button type="button" class="nd-filter-btn" data-tech-filter="network">🛡️ Network &amp; Security</button>
</div>

<div class="nd-lifeline-grid" id="nd-lifeline-grid">
  <div class="nd-lifeline-card" data-tech-cat="programming">
    <div>
      <span class="nd-lifeline-year">1991</span>
      <h4>🕹️ Commodore 64 &amp; BASIC</h4>
      <p>First after-school coding lessons. Typing POKE &amp; PEEK commands in <code>BASIC</code> on 8-bit hardware.</p>
    </div>
    <div class="nd-tags"><span class="nd-tag">BASIC</span><span class="nd-tag">C64</span></div>
  </div>

  <div class="nd-lifeline-card" data-tech-cat="programming">
    <div>
      <span class="nd-lifeline-year">1995</span>
      <h4>💻 First PC &amp; Web Dawn</h4>
      <p>Pentium 133MHz, 64MB RAM. Writing MS Office Macros, MS Access DBs, VBScript, HTML, CSS, JavaScript, and Flash <code>ActionScript</code>.</p>
    </div>
    <div class="nd-tags"><span class="nd-tag">VBScript</span><span class="nd-tag">HTML/CSS</span><span class="nd-tag">JS</span><span class="nd-tag">ActionScript</span></div>
  </div>

  <div class="nd-lifeline-card" data-tech-cat="programming">
    <div>
      <span class="nd-lifeline-year">1997</span>
      <h4>🌐 56kbps Dial-Up &amp; LAMP Stack</h4>
      <p>Home Internet setup @ 56kbps. Building full-stack web applications with ASP.net (IIS/Access), WAMP/LAMP, PHP, MySQL &amp; Bash scripts.</p>
    </div>
    <div class="nd-tags"><span class="nd-tag">PHP</span><span class="nd-tag">MySQL</span><span class="nd-tag">Bash</span><span class="nd-tag">ASP.NET</span></div>
  </div>

  <div class="nd-lifeline-card" data-tech-cat="programming">
    <div>
      <span class="nd-lifeline-year">1999</span>
      <h4>⚙️ Computer Science &amp; Systems</h4>
      <p>University CS engineering. Deep dive into MATLAB, C, C++, Java, UML architectural design, x86 Assembler, and SQL database design.</p>
    </div>
    <div class="nd-tags"><span class="nd-tag">C</span><span class="nd-tag">C++</span><span class="nd-tag">Java</span><span class="nd-tag">Assembly</span><span class="nd-tag">SQL</span></div>
  </div>

  <div class="nd-lifeline-card" data-tech-cat="network programming">
    <div>
      <span class="nd-lifeline-year">2006</span>
      <h4>🐍 Python, Rust &amp; Cisco TCL</h4>
      <p>Joined Cisco Systems. Scripting network infrastructure with Cisco IOS TCL, adopting Python, Rust, CoffeeScript, and server-side Node.js.</p>
    </div>
    <div class="nd-tags"><span class="nd-tag">Python</span><span class="nd-tag">Rust</span><span class="nd-tag">Node.js</span><span class="nd-tag">Cisco TCL</span></div>
  </div>

  <div class="nd-lifeline-card" data-tech-cat="cloud ai">
    <div>
      <span class="nd-lifeline-year">2018</span>
      <h4>☁️ Google Cloud, Go &amp; Machine Learning</h4>
      <p>Joined Google Cloud as Customer Engineer. Scaling Go architectures, TensorFlow with Keras, Flutter cross-platform apps &amp; TypeScript.</p>
    </div>
    <div class="nd-tags"><span class="nd-tag">Go</span><span class="nd-tag">TensorFlow</span><span class="nd-tag">TypeScript</span><span class="nd-tag">Flutter</span></div>
  </div>

  <div class="nd-lifeline-card" data-tech-cat="network ai programming">
    <div>
      <span class="nd-lifeline-year">2021</span>
      <h4>🤖 Quantum Security &amp; Scratch Education</h4>
      <p>PQC Crypto-Agility, Post-Quantum security design, and teaching fundamental block programming to the next generation with Scratch 👾.</p>
    </div>
    <div class="nd-tags"><span class="nd-tag">Scratch</span><span class="nd-tag">PQC</span><span class="nd-tag">GKE</span></div>
  </div>

  <div class="nd-lifeline-card" data-tech-cat="ai programming">
    <div>
      <span class="nd-lifeline-year">2022</span>
      <h4>⚡ Generative Pre-trained Transformer &amp; LLMs</h4>
      <p>GPT &amp; Transformer architectures emerge. LLMs accelerate tech transformation, making the once-impossible possible 👾.</p>
    </div>
    <div class="nd-tags"><span class="nd-tag">BERT</span><span class="nd-tag">GPT</span><span class="nd-tag">LLM</span></div>
  </div>

  <div class="nd-lifeline-card" data-tech-cat="ai">
    <div>
      <span class="nd-lifeline-year">2023</span>
      <h4>🧠 Open Weights &amp; Local LLMs</h4>
      <p>Open-weight models explode (Llama, Gemma, Ollama). Running local LLM inference engines and MCP protocol integrations 🚀.</p>
    </div>
    <div class="nd-tags"><span class="nd-tag">Gemini</span><span class="nd-tag">MCP</span><span class="nd-tag">Ollama</span></div>
  </div>

  <div class="nd-lifeline-card" data-tech-cat="ai cloud programming">
    <div>
      <span class="nd-lifeline-year">2024</span>
      <h4>🔮 Multimodal Gemini 1.5 &amp; Vibe Coding</h4>
      <p>1M+ token context window, native multimodal reasoning (video/audio), and AI-driven Vibe Coding workflows taking flight ✨.</p>
    </div>
    <div class="nd-tags"><span class="nd-tag">Gemini 1.5</span><span class="nd-tag">Vibe Coding</span><span class="nd-tag">Vertex AI</span></div>
  </div>

  <div class="nd-lifeline-card" data-tech-cat="cloud ai">
    <div>
      <span class="nd-lifeline-year">2025</span>
      <h4>🐝 Agentic Revolution &amp; Swarm Intelligence</h4>
      <p>Multi-agent swarms working on long-running code refactoring, automated security audits, and complex science breakthroughs 👾.</p>
    </div>
    <div class="nd-tags"><span class="nd-tag">ADK Agents</span><span class="nd-tag">DeepSeek</span><span class="nd-tag">Unsloth</span></div>
  </div>

  <div class="nd-lifeline-card" data-tech-cat="cloud ai network">
    <div>
      <span class="nd-lifeline-year">2026+</span>
      <h4>🚀 Gemini 3.5 &amp; Autonomous AI Engineering</h4>
      <p>Autonomous AI pair programmers &amp; SRE co-piloting. Deploying serverless multi-agent architectures with zero-downtime chaos resilience 🛡️.</p>
    </div>
    <div class="nd-tags"><span class="nd-tag">Gemini 3.5</span><span class="nd-tag">Antigravity</span><span class="nd-tag">SRE Chaos</span></div>
  </div>
</div>

---

### Work Experience 💼

Over 20 years of designing scalable architectures and driving digital transformation:

<div class="nd-timeline-item">
  <div class="nd-timeline-date">September 2018 – Present</div>
  <h4>Customer Engineer / Cloud Architect</h4>
  <div class="nd-timeline-company">Google Cloud</div>
  <p>Cloud Architect for EU public sector. Partnering with innovative teams to design resilient Google Cloud Platform solutions, solve complex engineering challenges, and accelerate digital maturity.</p>
  <div class="nd-tags">
    <span class="nd-tag">Google Cloud</span>
    <span class="nd-tag">Enterprise Architecture</span>
    <span class="nd-tag">EU Public Sector</span>
    <span class="nd-tag">Security &amp; Compliance</span>
  </div>
</div>

<div class="nd-timeline-item">
  <div class="nd-timeline-date">June 2006 – August 2018</div>
  <h4>Systems Engineer / Solutions Architect</h4>
  <div class="nd-timeline-company">Cisco Systems</div>
  <p>Solutions Architect for EU institutions, NATO, and Belgian Governments. Engineered mission-critical networking, cybersecurity, and infrastructure solutions across large global organizations.</p>
  <div class="nd-tags">
    <span class="nd-tag">Cisco</span>
    <span class="nd-tag">NATO / EU Institutions</span>
    <span class="nd-tag">Network Security</span>
    <span class="nd-tag">Infrastructure</span>
  </div>
</div>

<div class="nd-timeline-item">
  <div class="nd-timeline-date">September 2002 – June 2006</div>
  <h4>IT Manager</h4>
  <div class="nd-timeline-company">Missil Petroleum</div>
  <p>Responsible for end-to-end IT operations, infrastructure availability, and internal systems deployment.</p>
  <div class="nd-tags">
    <span class="nd-tag">IT Management</span>
    <span class="nd-tag">Operations</span>
    <span class="nd-tag">Infrastructure</span>
  </div>
</div>

---

### Garage Mechanics & Interactive Labs 🛠️

Personal lab environments, micro-apps, interactive simulators, and web experiments:

<div class="nd-garage-grid">
  <a href="https://netdev.be/netdev.html" class="nd-garage-card">
    <h4>🚀 Interactive CV &amp; Simulators</h4>
    <p>Launch live Gemini 3.5 AI Flow, Post-Quantum Crypto-Agility, and SRE Chaos simulators.</p>
    <span class="nd-garage-url">netdev.be/netdev.html ↗</span>
  </a>

  <a href="https://netdev.be" class="nd-garage-card">
    <h4>🌐 gcs</h4>
    <p>Google Cloud Storage custom hosting endpoint &amp; lab domain.</p>
    <span class="nd-garage-url">netdev.be</span>
  </a>

  <a href="https://fb.netdev.be" class="nd-garage-card">
    <h4>🔥 firebase</h4>
    <p>Firebase App Hosting deployment &amp; Brussels Mobility AI backend sandbox.</p>
    <span class="nd-garage-url">fb.netdev.be</span>
  </a>

  <a href="https://beyond.netdev.be/" class="nd-garage-card">
    <h4>🛡️ beyond</h4>
    <p>Software Delivery Shield (SLSA Level 3 &amp; Binary Authorization) interactive visualizer.</p>
    <span class="nd-garage-url">beyond.netdev.be</span>
  </a>

  <a href="https://netdev.be/web3/architecture.html" class="nd-garage-card">
    <h4>✍️ Aether Architecture</h4>
    <p>Aether Agent Platform Architecture &amp; visual flow hub.</p>
    <span class="nd-garage-url">netdev.be/web3/architecture.html</span>
  </a>

  <a href="https://web3.netdev.be/" class="nd-garage-card">
    <h4>📰 Blog v2</h4>
    <p>Astro technical blog archive &amp; interactive mechanics lab.</p>
    <span class="nd-garage-url">web3.netdev.be</span>
  </a>

  <a href="https://v3.netdev.be" class="nd-garage-card">
    <h4>☁️ Google Cloud</h4>
    <p>Google Cloud architecture renderer &amp; static markdown viewer.</p>
    <span class="nd-garage-url">v3.netdev.be</span>
  </a>

  <a href="https://blog.netdev.be" class="nd-garage-card">
    <h4>📰 github.io blog</h4>
    <p>Main online garage &amp; technical thought leadership blog.</p>
    <span class="nd-garage-url">blog.netdev.be</span>
  </a>
</div>

<script>
  (function() {
    function setupFilter(buttonContainerId, itemSelector, btnAttr, itemAttr) {
      var container = document.getElementById(buttonContainerId);
      if (!container) return;
      var buttons = container.querySelectorAll('button[' + btnAttr + ']');
      var items = document.querySelectorAll(itemSelector);
      buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var filterVal = btn.getAttribute(btnAttr);
          buttons.forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          items.forEach(function(card) {
            var cats = (card.getAttribute(itemAttr) || '').split(/\s+/);
            card.style.display = (filterVal === 'all' || cats.indexOf(filterVal) !== -1) ? '' : 'none';
          });
        });
      });
    }
    setupFilter('nd-attr-filters', '#nd-attr-grid .nd-attr-card', 'data-attr-filter', 'data-attr-cat');
    setupFilter('nd-lifeline-filters', '#nd-lifeline-grid .nd-lifeline-card', 'data-tech-filter', 'data-tech-cat');
  })();
</script>
