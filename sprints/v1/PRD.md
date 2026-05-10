# Sprint v1 — PRD: Portfolio Redesign (Apple Night Dark)

## Overview
Redesign the personal portfolio site (ankitw497.github.io) with a premium Apple Night dark aesthetic — clean blacks, SF Pro typography, and crisp blue accents — consistent across all pages. Add a "Visual Guides" hub page that surfaces existing guides (Finetuning Basics, HuggingFace ML Stack) and serves as a growing library for future visual learning content. Remove all deprecated sub-pages from the navigation.

## Goals
- Portfolio redesigned in Apple Night dark theme, visually consistent with the `visual_guide/` pages
- Navigation has a top-level "Visual Guides" link (replaces the old dropdown entries for ml-viz, dsa-viz, food, travel)
- `visual_guide/index.html` landing page lists all published guides with cards linking to each
- `buddhism.html` kept but moved to footer only (no prominent nav placement)
- All four deprecated pages (`food.html`, `dsa-viz.html`, `ml-viz.html`, `travel.html`) removed from every nav and link surface
- Design tokens (CSS variables) are unified and documented so adding new pages is consistent

## User Stories
- As a recruiter/visitor, I want to see Ankit's profile, projects, and photos on one polished page, so I can quickly assess his background
- As a curious visitor, I want to browse Visual Guides from a clearly-labelled nav link, so I can find educational ML content easily
- As Ankit, I want a consistent design system (tokens, typography, card patterns) so that publishing a new visual guide automatically fits the site aesthetic
- As a mobile visitor, I want the nav to be clean and concise, so I'm not overwhelmed by irrelevant links

## Technical Architecture

**Stack**: Pure HTML + CSS (no build step), Tailwind CDN on index.html, vanilla CSS on visual guide pages

**Design Tokens — Apple Night Dark**
```
--bg:        #000000          (page background)
--surf:      #161617          (card / surface)
--surf2:     #1c1c1e          (elevated surface)
--border:    rgba(255,255,255,.1)
--t1:        #f5f5f7          (primary text)
--t2:        #a1a1a6          (secondary text)
--t3:        #6e6e73          (tertiary / muted)
--acc:       #2997ff          (Apple blue)
--acc-l:     #5abaff          (lighter blue)
--acc-bg:    rgba(41,151,255,.08)
--acc-bd:    rgba(41,151,255,.2)
Font:        -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif
```

**Page Structure**
```
ankitw497.github.io/
├── index.html               ← redesigned (Apple Night, updated nav)
├── visual_guide/
│   ├── index.html           ← NEW: guides hub landing page
│   ├── hf_stack_apple.html  ← existing (ML packages guide)
│   └── combined_guide_finetuning.html  ← existing (Finetuning guide)
├── buddhism.html            ← kept, linked only in footer
├── assets/                  ← unchanged
└── [food/dsa-viz/ml-viz/travel removed from all nav]
```

**Nav layout (desktop)**
```
[Ankit Wahane]   Work  Experience  Skills  Visual Guides  Contact   [LinkedIn] [GitHub] [Resume ↗]
```

## Out of Scope (v2+)
- Actual deletion of food.html / dsa-viz.html / ml-viz.html / travel.html files (just remove from nav/links for now to keep git history clean)
- Dark/light mode toggle
- JavaScript-heavy animations (stick to CSS transitions)
- New visual guide content (only the hub page is in scope)
- Blog/writing RSS feed

## Dependencies
- No prior sprints; greenfield redesign on existing HTML files
- Assets (`assets/`, `visual_guide/*.html`) already exist and are unchanged
