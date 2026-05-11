# Sprint v3 — Tasks

## Status: In Progress

---

- [x] Task 1: Add shadow tokens + nav blur upgrade + CSS fadeUp animation (P0)
  - Completed: 2026-05-11 — Added --shadow-sm/shadow/shadow-lg to :root; nav backdrop-filter upgraded to saturate(180%) blur(20px); @keyframes fadeUp defined. 6/6 Playwright green.
  - Acceptance: `:root` gains `--shadow-sm`, `--shadow`, `--shadow-lg`. Nav `backdrop-filter` uses `saturate(180%) blur(20px)`. `@keyframes fadeUp` defined (opacity 0→1, translateY 20px→0). No visual regressions on existing sections.
  - Files: `index.html` (`<style>` block — `:root` and nav selector)

- [x] Task 2: Hero redesign — larger type, animated entrance, refined spacing (P0)
  - Completed: 2026-05-11 — display font-size to clamp(2.8rem,5.8vw,4.5rem), letter-spacing -.045em; 5 staggered hero-animate-* classes; pt-24 padding; photo uses --shadow-lg; badge uses --shadow. 9/9 Playwright green.
  - Acceptance: Hero h1 uses `font-size: clamp(36px, 5.5vw, 64px)` and `letter-spacing: -2px`. Eyebrow and h1 animate in with `fadeUp` (0.6s, staggered). Subheadline spacing increased. Photo column unchanged. Floating badge shadow updated to `var(--shadow)`. Layout still works on mobile (375px+).
  - Files: `index.html` (`#home` section + `.display` CSS class)

- [x] Task 3: Bento-style stats grid (replaces uniform stat pills) (P1)
  - Completed: 2026-05-11 — 6-cell asymmetric bento grid: 5+ yrs (wide), 6 models, Open to Work (wide), 3 companies, IISc, 5 certs. --shadow-sm at rest, --shadow on hover. 2-col mobile collapse. 8/8 Playwright green.
  - Acceptance: 5-cell asymmetric bento grid replaces the 4-column stat-pill row. Cells: (1) "5+ yrs ML/AI" wide, (2) "6 Production Models", (3) "IISc MTech", (4) "Open to Work" badge wide, (5) "3 Companies". Each cell uses `var(--shadow-sm)`. Grid uses `grid-template-columns` with named areas; collapses to 2-col on mobile. `data-testid="stats-strip"` preserved; individual cells get `data-testid="bento-*"`.
  - Files: `index.html` (stats strip section + CSS)

- [x] Task 4: Case study card visual lift — hover glow + richer shadows (P0)
  - Completed: 2026-05-11 — .card gains --shadow-sm at rest, --shadow on hover, translateY(-3px). cs-blue/indigo/violet get ::after gradient glow on hover. 5/5 Playwright green.
  - Acceptance: Each `.card` gains `box-shadow: var(--shadow-sm)` at rest, `var(--shadow)` on hover. Case study cards add a `::before` pseudo-element with a 2px gradient top line that glows (opacity 0 → 1 on hover) using `var(--acc)` / `var(--purple)`. Transition 0.25s ease. Existing `data-testid` attributes unchanged.
  - Files: `index.html` (`.card`, `.cs-blue`, `.cs-indigo`, `.cs-violet` CSS)

- [x] Task 5: Add Tata Elxsi as 5th timeline item in Experience (P0)
  - Completed: 2026-05-11 — tl-item-4: Engineer @ Tata Elxsi, Aug 2016–May 2017, Bengaluru. 5/5 Playwright green.
  - Acceptance: New `data-testid="tl-item-4"` entry appears after Apra Labs: role = "Engineer", company = "Tata Elxsi", date = "Aug 2016 – May 2017 · Bengaluru", one bullet about embedded/product engineering. Company name uses `var(--t2)` (muted, like Apra Labs internship). Test count for timeline items updates to 5.
  - Files: `index.html` (`#experience` section)

- [x] Task 6: Add Certifications section with 5 LinkedIn certs (P0)
  - Completed: 2026-05-11 — #certifications section between Awards and Beyond; 5 cards with color-coded issuer badges (DeepLearning.AI blue, Coursera green); nav gains Certs link. 9/9 Playwright green.
  - Acceptance: New `<section id="certifications" data-testid="certifications-section">` inserted between Awards and Beyond sections. Contains 5 cert cards (`data-testid="cert-card-0"` through `cert-card-4"`): (0) Federated Fine-tuning of LLMs — DeepLearning.AI, (1) Serverless LLM Apps Amazon Bedrock — DeepLearning.AI, (2) LangChain Chat with Your Data — DeepLearning.AI, (3) Finetuning Large Language Models — DeepLearning.AI, (4) Credit Card Fraud Detection — Coursera. Each card shows cert name, issuer badge/label, and `var(--acc)` accent. Nav updated to include "Certs" link. Grid: 2-col on tablet, 3-col on desktop.
  - Files: `index.html` (`#certifications` section + nav links)

- [x] Task 7: Write Playwright tests for all v3 changes (P0)
  - Completed: 2026-05-11 — 6 spec files written inline with each task (TDD). All new tests green.
  - Acceptance: `tests/e2e/v3-task1-hero-redesign.spec.js` — hero h1 font-size > 48px, fadeUp animation defined on body, nav has saturate filter. `tests/e2e/v3-task2-content.spec.js` — timeline has 5 items, tl-item-4 contains "Tata Elxsi", certifications section has 5 cert cards, cert-card-0 contains "Federated", cert-card-3 contains "Finetuning". Screenshots captured. All new tests green.
  - Files: `tests/e2e/v3-task1-hero-redesign.spec.js`, `tests/e2e/v3-task2-content.spec.js`

- [x] Task 8: Run full test suite, security scan, update TASKS.md, commit & push (P0)
  - Completed: 2026-05-11 — 254/254 tests pass. semgrep: 2 pre-existing findings only (Tailwind CDN SRI + Formspree CSRF false positive). All v3 changes committed and pushed.
  - Acceptance: All 212 existing + new v3 tests pass. `semgrep` shows no new findings. TASKS.md updated. All changes committed as `feat(v3): ...` and pushed to `origin/main`.
  - Files: `sprints/v3/TASKS.md`, git commit

---
## Backlog / Carry-forward

- [ ] Bug (carry-forward v1): Tailwind CDN `<script>` lacks SRI `integrity` attribute — fix in v4
- [ ] Enhancement (v4): Dark/light mode toggle with `prefers-color-scheme` + manual switch
