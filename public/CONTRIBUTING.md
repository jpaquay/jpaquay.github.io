# Contributing to `netdev.be`

Thank you for contributing to **`netdev.be` (`/net/dev` Portal & Firebase Hosting Static Hub)**, created and maintained by **Jerome CG Paquay (`@jpaquay`)**.

---

## 🛠️ Local Preview & Deployment

### Prerequisites
- **Firebase CLI** (`npm install -g firebase-tools`)

### Preview Locally
```bash
# Serve locally with Firebase Hosting emulator
firebase serve --only hosting
```

### Deploy to Production (`netdev.be`)
```bash
firebase deploy --only hosting
```

---

## 🔒 Security & Publishing Standards

1. **Zero Hardcoded Secrets**: Never commit API keys, private tokens, or service account JSON files.
2. **Immutable CDN Assets**: Prefer WebP imagery (`assets/img/posts/*.webp`) and keep RSS/Sitemap feeds (`rss.xml`, `feed.xml`, `sitemap.xml`) synchronized.
3. **Commit Tagging**: Append `TAG=agy` and `CONV=<conversation_id>` on automated or AI-assisted commits.

---

## 📜 License

All contributions are licensed under the **Creative Commons Attribution-ShareAlike 4.0 International License (`CC BY-SA 4.0`)** attributed to **Jerome CG Paquay (`@jpaquay`)**. See [LICENSE](./LICENSE).
