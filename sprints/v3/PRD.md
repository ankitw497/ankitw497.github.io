# Sprint v3 — PRD: Visual Polish, LinkedIn Content Sync & Hero Redesign

## Overview
Elevate the landing page from functional to visually striking by adopting design patterns from the HuggingFace stack visual guide (large clamped typography, layered shadows, animated fadeUp entrances, saturated backdrop blur). Simultaneously sync missing LinkedIn content — 5 certifications, the Tata Elxsi role — and add a Certifications section as a new trust signal for recruiters.

## Goals
- Landing page hero feels premium: larger display type, animated entrance, refined spacing — matching the quality of `hf_stack_apple.html`
- Stat strip replaced with a bento-style asymmetric grid with varied card sizes
- New **Certifications** section (5 DeepLearning.AI / Coursera certs) appears between Awards and Beyond sections
- **Tata Elxsi** (Engineer, Aug 2016 – May 2017) added as 5th timeline item in Experience
- Case study cards gain subtle gradient top-border glow and richer shadow layering
- All Playwright tests updated and passing; changes pushed to GitHub

## LinkedIn Content Delta (from uploaded PDF)

### Missing from portfolio — add in v3
| Item | Detail |
|------|--------|
| **Tata Elxsi** | Engineer · Aug 2016 – May 2017 · Bengaluru |
| **Cert 1** | Federated Fine-tuning of LLMs with Private Data — DeepLearning.AI |
| **Cert 2** | Serverless LLM Apps — Amazon Bedrock — DeepLearning.AI |
| **Cert 3** | Portfolio Project: Credit Card Fraud Detection for Vesta — Coursera |
| **Cert 4** | LangChain Chat with Your Data — DeepLearning.AI |
| **Cert 5** | Finetuning Large Language Models — DeepLearning.AI |

### Already on portfolio — no change needed
- All 4 experience entries (TransUnion, ZS × 2, Apra Labs) ✓
- Both education cards (IISc MTech, VIT BTech) ✓
- 6 awards ✓
- 3 case studies + 6 project cards ✓

## Design Inspiration: `hf_stack_apple.html` patterns to adopt

| Pattern | HF Guide value | Apply to index.html |
|---------|---------------|----------------------|
| Display font size | `clamp(40px, 6.5vw, 72px)` | Hero h1: `clamp(36px, 5.5vw, 64px)` |
| Letter spacing | `-2.5px` on headings | `-2px` on hero h1 |
| Nav blur | `saturate(180%) blur(20px)` | Update from plain `backdrop-blur-xl` |
| Shadow system | `--shadow-sm`, `--shadow`, `--shadow-lg` | Add to CSS vars, apply to cards |
| FadeUp animation | `opacity:0 → 1`, `translateY(20px → 0)` | Hero text block, eyebrow |
| Section eyebrow | `12px, weight 500, letter-spacing .10em` | Already similar — refine |
| Card hover glow | gradient `opacity 0 → 1` on `::before` | Case study cards |

## Technical Architecture

**Stack**: Pure HTML + CSS + minimal vanilla JS (no build step), Tailwind CDN on index.html

**New CSS tokens to add to `:root`**
```css
--shadow-sm:  0 1px 4px rgba(0,0,0,.06), 0 2px 12px rgba(0,0,0,.04);
--shadow:     0 2px 8px rgba(0,0,0,.07), 0 8px 32px rgba(0,0,0,.05);
--shadow-lg:  0 4px 16px rgba(0,0,0,.08), 0 24px 64px rgba(0,0,0,.06);
```

**New section order in index.html**
```
Home (hero)
↓ Stats (bento grid)
↓ Work (case studies)
↓ All Projects
↓ Experience
↓ Education
↓ Skills
↓ Awards
↓ Certifications  ← NEW
↓ Beyond
↓ Writing
↓ Contact
↓ Footer
```

**Bento grid layout (replaces stat-pills)**
```
┌────────────────────┬──────────┬──────────┐
│  5+ yrs in ML/AI  │  6 prod  │   IISc   │
│  (wide card)       │  models  │  MTech   │
├──────────────────┬─┴──────────┴──────────┤
│  Open to work    │  3 companies impacted  │
└──────────────────┴────────────────────────┘
```

## User Stories
- As a recruiter, I want to see Ankit's certifications so I can verify his LLM/GenAI credentials quickly
- As a visitor, I want the hero to feel visually impressive on first load so I stay engaged
- As a hiring manager, I want to see Ankit's full work history (including Tata Elxsi) for completeness
- As a mobile visitor, I want the bento grid and cert cards to stack cleanly on small screens

## Out of Scope (v4+)
- Dark/light mode toggle
- SRI integrity hash for Tailwind CDN
- Animations beyond CSS keyframes (no GSAP/Three.js)
- Blog RSS feed
- Updating visual guide sub-pages (hf_stack_apple.html, combined_guide_finetuning.html)

## Dependencies
- Sprint v2 complete: Apple Light theme, AI Engineer positioning, 212 tests passing ✓
- LinkedIn PDF provided by user with certifications and full experience history ✓
