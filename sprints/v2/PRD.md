# Sprint v2 — PRD: Apple Light Theme, AI Engineering Positioning & Consistency

## Overview
Transform the portfolio from Apple Night dark to Apple Light (apple.com-style white), reposition Ankit as an AI Engineer / GenAI practitioner rather than a Data Scientist, fix consistency issues across all pages, and clean up stale files and links. Every page — index.html, visual_guide/index.html, and visual guide sub-pages — must share the same design token system and visual language.

## Goals
- Site-wide Apple Light theme (`#ffffff` bg, `#1d1d1f` text, `#0071e3` blue) applied consistently to all pages
- Ankit positioned as an AI Engineer focused on: AI Agents, LLM Finetuning, Inference Engineering, production GenAI
- All deprecated HTML files (`food.html`, `dsa-viz.html`, `ml-viz.html`, `travel.html`) physically deleted and all references removed
- "View on GitHub →" links removed from all project/case-study cards
- Visual guide hub and sub-pages share the same token system as index.html (no divergence)
- Python code blocks in `hf_stack_apple.html` are correctly indented
- Contact form and all interactive elements match the light design system

## User Stories
- As a recruiter/hiring manager, I want to immediately understand that Ankit is an AI Engineer specialising in Agents, Finetuning, and Inference — not a generic Data Scientist — so I can assess fit for AI-focused roles
- As a visitor on any page, I want a consistent clean Apple Light visual language, so the site feels professional and coherent
- As a mobile visitor, I want the nav, forms, and cards to look polished on a light background
- As a reader of the HuggingFace guide, I want correctly-indented Python code so I can follow along without confusion

## Technical Architecture

**Stack**: Pure HTML + CSS (no build step), Tailwind CDN on index.html, vanilla CSS on visual_guide pages

**Design Tokens — Apple Light**
```
--bg:        #ffffff          (page background — white like apple.com)
--surf:      #f5f5f7          (card / section surface — Apple off-white)
--surf2:     #e8e8ed          (elevated surface, tag backgrounds)
--surf3:     #d2d2d7          (borders, dividers)
--border:    rgba(0,0,0,.08)  (subtle border)
--border-h:  rgba(0,113,227,.30) (hover border)
--t1:        #1d1d1f          (primary text — Apple charcoal)
--t2:        #6e6e73          (secondary text)
--t3:        #aeaeb2          (muted / tertiary text)
--acc:       #0071e3          (Apple light-mode blue)
--acc-l:     #0077ed          (slightly lighter variant)
--acc-bg:    rgba(0,113,227,.06)
--acc-bd:    rgba(0,113,227,.18)
--purple:    #8944ab          (light-mode purple)
--green:     #1c8c3c          (availability green)
--pink:      #e0245e
--font:      -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif
--ease:      cubic-bezier(.22,1,.36,1)
--r:         14px
--r-lg:      18px
--shadow-acc: 0 4px 24px -8px rgba(0,113,227,.18)
```

**Page inventory**
```
ankitw497.github.io/
├── index.html                            ← full light-theme overhaul + AI Eng content
├── visual_guide/
│   ├── index.html                        ← light theme, consistent with index.html
│   ├── hf_stack_apple.html               ← light theme + Python indentation fix
│   └── combined_guide_finetuning.html    ← light theme
├── buddhism.html                         ← kept (footer link only)
└── assets/                               ← unchanged
[food.html, dsa-viz.html, ml-viz.html, travel.html — DELETED]
```

**Nav layout (unchanged structure, new colours)**
```
[Ankit Wahane]  Work  Experience  Skills  Visual Guides  Contact   [LinkedIn] [GitHub] [Resume ↗]
```

## Content Changes

### Hero & positioning
- Title: `AI Engineer` (replaces "Senior Data Scientist")
- Headline: "I build AI systems / that work **in production**." (or similar GenAI-focused)
- Subheadline: AI Agents · LLM Finetuning · Inference Engineering
- Trust bar: TransUnion · ZS Associates · IISc Bengaluru (unchanged)

### Skills section — reordered for AI Engineering focus
1. **AI Agents & Orchestration** — LangGraph, CrewAI, LangChain, Multi-Agent, Tool Use, MCP
2. **LLM Finetuning** — LoRA/QLoRA, PEFT, Transformers, TRL, SFT, DPO
3. **Inference Engineering** — vLLM, Ollama, Quantisation (GGUF/AWQ), Triton
4. **ML & Modelling** — PyTorch, XGBoost, Bayesian Stats, Time Series, Scikit-learn
5. **MLOps & Cloud** — AWS SageMaker, GCP, Databricks, Docker, CI/CD
6. **Languages & Tools** — Python, SQL, Git, Streamlit, FastAPI

### Case studies — updated framing
- Keep the 3 existing case studies; update labels/tags to be more AI-Engineering-forward
- Remove "View on GitHub →" links from ALL case study cards and project cards

## Out of Scope (v3+)
- Dark/light mode toggle
- JavaScript animations beyond existing scroll-reveal
- New visual guide content
- Blog RSS feed
- SRI integrity hashes for Tailwind CDN (backlogged from v1)
- Rewriting hf_stack_apple.html or combined_guide_finetuning.html content (only theme + indent fix)

## Dependencies
- Sprint v1 completed: all 10 tasks green (126/126 Playwright tests pass)
- `food.html`, `dsa-viz.html`, `ml-viz.html`, `travel.html` still exist in repo — will be deleted in this sprint
