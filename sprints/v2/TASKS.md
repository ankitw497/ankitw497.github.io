# Sprint v2 — Tasks

## Status: In Progress

---

- [x] Task 1: Define Apple Light design token block and update global CSS in `index.html` (P0)
  - Completed: 2026-05-10 — Replaced all dark tokens with Apple Light palette (#ffffff bg, #1d1d1f text, #0071e3 acc, #f5f5f7 surf); nav updated to rgba(255,255,255,.88); ambient blobs lightened; OTW badge green adjusted for light; timeline dot glow updated; mobile menu colours updated. 10/10 Playwright green.
  - Acceptance: `:root` tokens updated to Apple Light palette (`--bg:#ffffff`, `--surf:#f5f5f7`, `--surf2:#e8e8ed`, `--border:rgba(0,0,0,.08)`, `--t1:#1d1d1f`, `--t2:#6e6e73`, `--t3:#aeaeb2`, `--acc:#0071e3`). Nav background becomes `rgba(255,255,255,.88)`. Ambient blobs become light-mode tinted (very subtle blue). Rainbow stripe updated to light Apple colours. Body background is white. No dark surfaces remain in the `<style>` block.
  - Files: `index.html` (`<style>` block — `:root`, body, `.ambient`, nav, rainbow stripe)

- [x] Task 2: Update `index.html` hero, stats strip, and nav to Apple Light + AI Engineer positioning (P0)
  - Completed: 2026-05-10 — Title/meta updated to "AI Engineer"; hero eyebrow/headline/subheadline rewritten for AI Agents/Finetuning/Inference focus; structured data jobTitle updated; nav brand, hamburger, mobile menu inline colours updated to light-mode values. 15/15 Playwright green.
  - Acceptance: Page `<title>` and meta description updated to "AI Engineer". Hero eyebrow label = "AI Engineer". Headline updated to GenAI/production focus. Subheadline mentions AI Agents, LLM Finetuning, Inference Engineering. Floating badge updated. Stat pills use light surface (`--surf`). Nav text colours updated (brand `--t1`, links `--t2`→hover `--t1`). Hamburger button border uses `--border`. OTW badge uses light-mode green. Photo glow uses `--shadow-acc` light variant.
  - Files: `index.html` (`<head>` meta + `#home` hero section + stats strip + nav/mobile-menu colour values)

- [x] Task 3: Update `index.html` case studies and all-projects sections — light theme + remove GitHub links (P0)
  - Completed: 2026-05-10 — Removed all "View on GitHub →" links from 3 case study cards; CSS vars already resolved to light surfaces; tags use --surf2; card borders use --border (rgba black). 10/10 Playwright green.
  - Acceptance: Card backgrounds use `--surf`. Card borders use `--border`. Top accent stripes remain but colours adjusted for light contrast. `data-testid="cs-card-*"` backgrounds resolve to `rgb(245,245,247)`. All "View on GitHub →" links removed from case study AND project cards. Tech tags use `--surf2` background with `--t1` text. Impact badges updated to light-mode colours.
  - Files: `index.html` (`#work` + `#all-projects` sections + card CSS)

- [ ] Task 4: Update `index.html` experience, education, skills, awards, beyond, writing, contact, and footer to Apple Light (P0)
  - Acceptance: Timeline dots and lines use light-mode `--acc`/`--border`. Education card logos use `--surf2` bg. Skill tags use `--surf2` bg. Award cards use `--surf` bg. Photo grid items use `--surf` bg. Contact form inputs: bg `--surf`, border `--border`, focus border `--acc-bd`, placeholder `--t3`. Footer border-top `--border`, copyright `--t3`. No dark surfaces (`#161617`, `#1c1c1e`, `rgba(255,255,255,*)` borders) remain in any of these sections.
  - Files: `index.html` (`#experience`, `#education`, `#skills`, `#awards`, `#beyond`, `#writing`, `#contact`, `footer` sections)

- [ ] Task 5: Update `index.html` skills section content for AI Engineering focus (P1)
  - Acceptance: 6 skill groups reordered and relabelled: (0) AI Agents & Orchestration, (1) LLM Finetuning, (2) Inference Engineering, (3) ML & Modelling, (4) MLOps & Cloud, (5) Languages & Tools. Tags within each group updated to reflect AI Engineering focus (e.g., vLLM, Ollama, PEFT, LoRA, TRL, MCP added; Bayesian Stats / MMM / A-B Testing moved to group 3). All `data-testid` attributes preserved.
  - Files: `index.html` (`#skills` section)

- [ ] Task 6: Delete stale HTML files and remove all remaining references (P0)
  - Acceptance: `food.html`, `dsa-viz.html`, `ml-viz.html`, `travel.html` are permanently deleted from the repo. `git status` shows them as deleted. No `href` pointing to any of these files exists anywhere in `index.html`, `visual_guide/index.html`, or any other file. `buddhism.html` is kept.
  - Files: delete `food.html`, `dsa-viz.html`, `ml-viz.html`, `travel.html`; audit all HTML files for stale refs

- [ ] Task 7: Apply Apple Light theme to `visual_guide/index.html` — hub page (P0)
  - Acceptance: `visual_guide/index.html` `:root` tokens match the Apple Light system from Task 1. Nav background `rgba(255,255,255,.88)`. Guide cards use `--surf` background. Rainbow stripe uses same gradient. Ambient blobs light. All hardcoded dark values removed. Visual result matches index.html aesthetic.
  - Files: `visual_guide/index.html` (full `<style>` block rewrite to light tokens)

- [ ] Task 8: Apply Apple Light theme to `visual_guide/hf_stack_apple.html` + fix Python indentation (P1)
  - Acceptance: Page uses Apple Light tokens (same `:root` block). Fix all Python `<code>` / `<pre>` blocks where indentation is broken (missing leading spaces, misaligned function bodies). Code blocks have light background (`--surf2` or `#f5f5f7`) with `--t1` text and a subtle border. No dark backgrounds remain. A Python snippet that was previously mis-indented now displays correctly.
  - Files: `visual_guide/hf_stack_apple.html`

- [ ] Task 9: Apply Apple Light theme to `visual_guide/combined_guide_finetuning.html` (P1)
  - Acceptance: Page uses the same Apple Light `:root` tokens. Nav, cards, code blocks, and section backgrounds updated. No hardcoded dark colours remain. Visual language consistent with hub page and index.html.
  - Files: `visual_guide/combined_guide_finetuning.html`

- [ ] Task 10: Write and run Playwright tests, security scan, and commit all v2 changes (P0)
  - Acceptance: New `tests/e2e/task-v2-light-theme.spec.js` verifies: (a) `body` background resolves to `rgb(255,255,255)`, (b) nav brand text is `rgb(29,29,31)` (`--t1`), (c) first case study card bg is `rgb(245,245,247)` (`--surf`), (d) no "View on GitHub" text in `#work` section innerHTML, (e) skills section group-0 label contains "Agents", (f) visual_guide/index.html body bg is white. Screenshots taken. `semgrep` shows no new findings beyond the pre-existing Tailwind CDN SRI issue. All tasks committed as `feat(v2): ...`.
  - Files: `tests/e2e/task-v2-light-theme.spec.js`, `tests/screenshots/v2-*.png`

---
## Backlog / Carry-forward from v1

- [ ] Bug (carry-forward): Tailwind CDN `<script>` lacks SRI `integrity` attribute — fix in v3 by self-hosting or adding hash
- [ ] Enhancement (v3): Add dark/light mode toggle with `prefers-color-scheme` media query + manual switch button
