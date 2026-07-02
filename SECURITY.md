# Security Policy

We take the security of this site, administrative portal, and public services seriously. This document outlines our security posture, supported versions, vulnerability reporting procedures, and security controls.

---

## Supported Components & Scope

| Component | Status | Security Model |
| :--- | :--- | :--- |
| **Jekyll Static Blog (`blog.netdev.be`)** | Supported | Static HTML/CSS served via Firebase CDN |
| **Admin Post Editor (`/admin`)** | Supported | Restricted Google OAuth 2.0 & Firebase Auth |
| **Comments System (Staticman)** | Supported | Origin validation (`allowedOrigins`) |

---

## Security Architecture & Best Practices

### 1. Administrative Access Control
Access to the `/admin` Post Editor GUI is strictly restricted to designated Google Admin accounts configured in authorized user lists.

Attempts to sign in with unauthorized accounts will be blocked by both the client-side module ([`assets/js/firebase-config.js`](file:///usr/local/google/home/jpaquay/dev/Apps/jpaquay.github.io/assets/js/firebase-config.js)) and Firebase Auth rules.

### 2. Secret & Token Management
* **GitHub Personal Access Tokens (PAT)**: Used by `/admin` to commit posts directly to `_posts/`. Tokens are stored strictly in the user's browser `localStorage` and sent directly over TLS to `https://api.github.com`. Tokens are never transmitted to or logged on third-party backend servers.
* **Firebase Credentials**: Firebase web API keys stored in client JS are public identifiers. Access control is enforced by OAuth origin validation and domain authorization rules.

### 3. Subresource & Content Security
* **Content Security Policy (CSP)**: The site enforces a baseline CSP meta tag restricting default script execution, frame sources, and network connections.
* **Subresource Integrity (SRI)**: External CDN assets (such as Bootstrap and FontAwesome) include cryptographic SRI hashes (`sha384-...`) to verify asset integrity.
* **Origin Protection**: Comment submission endpoints validate incoming request origins to prevent cross-site form misuse.

---

## Reporting a Vulnerability

If you discover a security vulnerability or security issue affecting this repository or site:

1. **Do NOT open a public GitHub issue.**
2. Report vulnerability details confidentially via the repository owner's contact channels.
3. Please include:
   * Description of the issue and potential impact.
   * Proof-of-Concept (PoC) steps or script to reproduce the vulnerability.
   * Suggested remediation steps if known.

---

## Response & Disclosure Policy

* **Acknowledgement**: We aim to acknowledge vulnerability reports within **48 hours**.
* **Remediation**: Validated security vulnerabilities will be prioritized and patched promptly.
* **Attribution**: Responsible security researchers who report valid vulnerabilities will be acknowledged in release notes.
