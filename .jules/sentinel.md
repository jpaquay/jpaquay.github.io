## 2024-07-02 - Stored DOM XSS in Post Editor Admin Interface
**Vulnerability:** Inline `onclick` handlers and unescaped variable interpolation (`innerHTML` concatenation) in `assets/js/admin.js` allowed for stored DOM XSS if a file name or path contained malicious payloads.
**Learning:** Even internal admin interfaces must treat API data (like GitHub file objects) as untrusted, because file names or metadata might be modified maliciously outside the application, bypassing client-side checks.
**Prevention:** Use event delegation with `data-*` attributes instead of inline event handlers. Always sanitize untrusted data before interpolation into `innerHTML`, or use `textContent`/`innerText` where possible.
