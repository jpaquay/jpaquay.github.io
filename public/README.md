# `/net/dev` Portal & Firebase Hosting Hub (`netdev.be`) ⚡

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Author: Jerome CG Paquay](https://img.shields.io/badge/Author-Jerome%20CG%20Paquay%20(%40jpaquay)-blue)](https://github.com/jpaquay)
[![Hosting: Firebase Hosting](https://img.shields.io/badge/Hosting-Firebase%20Hosting%20CDN-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/products/hosting)
[![Live Portal](https://img.shields.io/badge/Live%20Portal-netdev.be-success)](https://netdev.be)

Official static web portal, interactive engineering portfolio, and syndicated RSS/Sitemap edge distribution hub for **`netdev.be`**, built for **Google Firebase Hosting CDN** by **Jerome CG Paquay (`@jpaquay`)**.

---

## 🏗️ Edge Architecture

```mermaid
flowchart LR
    Visitor(["Global Visitors / RSS Readers"])
    CDN["Firebase Hosting Edge CDN (netdev.be)"]
    Bundle[("Static Bundle (index.html, app.js, styles.css, WebP Assets, XML Feeds)")]

    Visitor -- "HTTPS TLS 1.3 + HTTP/3" --> CDN
    CDN -- "Immutable Cache Headers" --> Bundle
```

For a full engineering, security, and caching audit, see [docs/ARCHITECTURE_REVIEW.md](./docs/ARCHITECTURE_REVIEW.md).

---

## 📂 Repository Structure

```text
├── index.html          # Main interactive portal & engineering showcase
├── netdev.html         # Alternate portal view
├── app.js              # Interactive UI & portfolio logic
├── styles.css          # Responsive typography & dark/light styling
├── assets/             # Optimized WebP post hero imagery & static media
├── blog/               # Syndicated blog RSS feed (blog/rss.xml)
├── v2/ & web3/         # Portal versioned & Web3 static views
├── rss.xml / feed.xml  # Syndicated RSS 2.0 & Atom feeds
├── sitemap.xml         # Search engine XML sitemap
├── firebase.json       # Firebase Hosting CDN caching & cleanUrls config
└── docs/               # Architecture & security review
```

---

## 🚀 Quickstart & Firebase Hosting Deployment

### 1. Local Preview
```bash
# Serve locally via Firebase Hosting emulator
firebase serve --only hosting
```

### 2. Deploy to Firebase Hosting (`netdev.be`)
```bash
firebase deploy --only hosting
```

---

## 🤝 Contributing

Contributions and improvements are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 👏 Credits & Author

Designed, authored, and maintained by **Jerome CG Paquay (`@jpaquay`)** — [https://github.com/jpaquay](https://github.com/jpaquay).

---

## 📜 License

Licensed under the **Creative Commons Attribution-ShareAlike 4.0 International License (`CC BY-SA 4.0`)** — Copyright © 2026 **Jerome CG Paquay (`@jpaquay`)**. See [LICENSE](./LICENSE) for full legal terms.
