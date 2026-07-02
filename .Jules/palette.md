## 2026-07-01 - Add required attribute to comment form
**Learning:** HTML forms that visually mark elements as required (with `*`) but do not include the HTML5 `required` attribute rely entirely on server-side or async JS validation. This degrades the user experience by not providing immediate native browser feedback prior to submission.
**Action:** Always verify that input fields denoted as required visually have the corresponding `required` HTML attribute to leverage native browser accessibility and UX patterns.
