# Contributing to `jpaquay.github.io` (`blog.netdev.be`)

Thank you for contributing to **`jpaquay.github.io` (`/net/dev` Engineering Blog & Web CMS)**, authored and maintained by **Jerome CG Paquay (`@jpaquay`)**.

---

## 🛠️ Local Development Environment

### Prerequisites
- **Ruby 3.0+ & Bundler** (`gem install bundler`)
- **Node.js 20+ & Jest** (for CMS/frontend unit tests in `__tests__/`)
- **Firebase CLI** (`firebase-tools`)

### Local Preview & Testing
```bash
# Install Ruby gems
bundle install

# Serve Jekyll locally with live reload
bundle exec jekyll serve --future

# Run JavaScript/CMS unit test suite
npm install
npm test
```

---

## 🔒 Security & Publishing Standards

1. **Zero Hardcoded Secrets**: Never commit GitHub PATs, private keys, or `.agents/gcloud.env`. All Firebase Web SDK public identifiers must enforce strict Firebase Auth / Google OAuth 2.0 domain restrictions and Content Security Policy (`CSP`) headers.
2. **Post Frontmatter & Feeds**: Posts under `_posts/YYYY-MM-DD-slug.md` must include valid YAML frontmatter (`title`, `subtitle`, `tags`, `author: Jerome CG Paquay`).
3. **Commit Tagging**: Append `TAG=agy` and `CONV=<conversation_id>` on automated or AI-assisted commits.

---

## 📜 License

All original articles, diagrams, and CMS code contributions are licensed under **Creative Commons Attribution-ShareAlike 4.0 International (`CC BY-SA 4.0`)** attributed to **Jerome CG Paquay (`@jpaquay`)**. See [LICENSE](./LICENSE).
