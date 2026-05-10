# Sprint v1 — Tasks

## Status: In Progress

---

- [x] Task 1: Define Apple Night design token block and shared CSS patterns (P0)
  - Acceptance: A self-contained `<style>` block exists with all design tokens (`--bg`, `--surf`, `--surf2`, `--border`, `--t1/t2/t3`, `--acc`, `--acc-l`, `--acc-bg`, `--acc-bd`), base reset, typography scale, card, button, tag, and nav-link classes — ready to paste into any page
  - Files: `sprints/v1/design-tokens.css` (reference file; tokens will be inlined into HTML pages)
  - Completed: 2026-05-10 — Full Apple Night token system: 9 colour tokens, 4 radius vars, typography scale, card/button/tag/nav-link/form-input/timeline/stat-pill/reveal components. 5/5 Playwright tests green, screenshot verified.

- [ ] Task 2: Update `index.html` navigation — desktop + mobile (P0)
  - Acceptance: Desktop nav shows: `Work | Experience | Skills | Visual Guides | Contact` + LinkedIn / GitHub / Resume. "Visual Guides" links to `visual_guide/index.html`. The old dropdown (food, dsa-viz, ml-viz, travel) is removed entirely. Mobile menu mirrors desktop. `buddhism.html` link moved to footer only. "Open to work" badge remains.
  - Files: `index.html` (nav `<header>` and `#mob-menu` sections only)

- [ ] Task 3: Redesign `index.html` hero section with Apple Night tokens (P0)
  - Acceptance: Background is `#000000`, card surfaces `#161617`, accent `#2997ff`. Hero uses SF Pro system font stack. Headline uses `clamp()` sizing, gradient text updated to blue. Photo card has Apple-style border-radius + subtle blue glow. Floating "Currently building" badge matches new surface color. Stat pills below hero use new tokens.
  - Files: `index.html` (`<style>` block + `#home` section + stats strip)

- [ ] Task 4: Redesign `index.html` case studies and all-projects sections (P0)
  - Acceptance: Cards use `--surf` / `--surf2`, `--border`, Apple border-radius `18px`. Top-border accent colours updated to use blue/indigo/purple from new palette. Impact badges and tech tags use new token colours. Hover state: `border-color: --acc-bd`, `translateY(-2px)`, soft blue box-shadow. No glassmorphism.
  - Files: `index.html` (`.card` CSS + `#work` + `#all-projects` sections)

- [ ] Task 5: Create `visual_guide/index.html` — Visual Guides hub landing page (P0)
  - Acceptance: Standalone page with same Apple Night tokens (no Tailwind dependency). Shows page title "Visual Learning Guides", subtitle, and a card grid listing published guides. Each card has: emoji icon, title, one-line description, "Read guide →" link. Two cards present: (1) "The HuggingFace Training Stack" → `hf_stack_apple.html`, (2) "Fine-tuning Fundamentals" → `combined_guide_finetuning.html`. A "More coming soon…" placeholder card at end. Back link to `../index.html` in nav.
  - Files: `visual_guide/index.html` (new file)

- [ ] Task 6: Redesign `index.html` experience timeline and education section (P1)
  - Acceptance: Timeline dot colour updated to `--acc`. Timeline line uses `--border`. Role/company text uses `--t1`/`--acc`. Date metadata uses `--t3`. Education cards use new card style with `--surf` background. IISc / VIT logos still displayed.
  - Files: `index.html` (`#experience` + `#education` sections)

- [ ] Task 7: Redesign `index.html` skills and awards sections (P1)
  - Acceptance: Skill category labels use `--acc`, `--acc-l`, and a third accent (purple `#bf5af2` from Apple palette). Tags use `--surf2` background with `--border`. Award cards use new card style. No visual regressions in layout or grid.
  - Files: `index.html` (`#skills` + `#awards` sections)

- [ ] Task 8: Redesign `index.html` beyond-work photos section (P1)
  - Acceptance: Section header/label uses new tokens. Photo grid items use `border-radius: 14px`, `--surf` background, `--border`. Hover scale effect kept (CSS only). The links to `travel.html`, `food.html` removed from this section. Caption updated to: "Travel · Photography · Buddhism".
  - Files: `index.html` (`#beyond` section)

- [ ] Task 9: Redesign `index.html` writing, contact form, and footer (P1)
  - Acceptance: Writing cards match new card style. Contact form inputs use `--surf` bg, `--border`, `--acc-bd` on focus. Footer background transparent (sits on `--bg`), border-top uses `--border`. Footer links: Resume, LinkedIn, GitHub, Medium, Buddhism (replaces old sub-page links). Year auto-updates via JS (already present).
  - Files: `index.html` (`#writing` + `#contact` + `footer` sections)

- [ ] Task 10: Final polish — ambient background, rainbow stripe, scroll-reveal, and meta (P2)
  - Acceptance: Rainbow top stripe updated to Apple blue-purple-pink (`#2997ff → #bf5af2 → #ff375f`). Ambient radial gradient uses new blue/purple. Scroll-reveal transitions smoothed to `0.5s cubic-bezier(.22,1,.36,1)`. OG meta tags updated. Structured data `@type: Person` unchanged. No console errors on page load.
  - Files: `index.html` (global `<style>` ambient/stripe rules + `<head>` meta)
