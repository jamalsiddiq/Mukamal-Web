# Mukamal OS — How to Use

> Complete usage guide for all agents, skills, slash commands, and workflows.
> Last updated: 2026-03-12

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [The Hub CEO (Orchestrator)](#2-the-hub-ceo--orchestrator)
3. [Skills Reference](#3-skills-reference)
4. [Slash Commands](#4-slash-commands)
5. [The 7-Phase Pipeline](#5-the-7-phase-pipeline)
6. [Backlog Management](#6-backlog-management)
7. [Skill Lifecycle](#7-skill-lifecycle)
8. [Rule & Role Management](#8-rule--role-management)
9. [File & Directory Map](#9-file--directory-map)

---

## 1. Quick Start

Mukamal OS is a skill-based agentic system. You talk to it using **slash commands** or natural language. The system has one orchestrator (**The Hub CEO**) and **9 specialized skills**.

### Your First Commands

| Goal | Command |
|------|---------|
| See what's happening | `/status` |
| Start a new audit pipeline | `/ceo` → give it a mandate |
| Capture screenshots of a website | `/visual-capture` |
| Run a UX audit on captures | `/auditing` |
| Add something to the backlog | `/backlog` |

### The Golden Rule
> Everything flows through the CEO. If you're unsure, start with `/ceo`.

---

## 2. The Hub CEO — Orchestrator

**Location:** `00_The_Hub_CEO/`
**Slash command:** `/ceo`
**What it does:** Receives your business mandates, delegates work to specialized skills, tracks pipeline execution, manages the backlog, and controls the entire system.

### CEO Modes

The CEO operates in **9 modes**. It auto-selects the right mode based on your request, or you can specify one directly.

---

#### Mode A: Trigger Pipeline

**When:** You want to start a new audit project from scratch.

**Example prompts:**
```
/ceo
"Audit the Top 5 neobank onboarding flows and generate a lead magnet report"
```
```
/ceo
"New mandate: Benchmark FinTech checkout UX — target Stripe, Square, Adyen, PayPal, Revolut"
```

**What happens:**
1. CEO decomposes your mandate into a target list.
2. Asks you for capture settings (platform, viewport, browser, strategy).
3. Creates an entry in `mandate_board.md` and `pipeline_state.md`.
4. Kicks off Phase 1 → Phase 2 (captures).

---

#### Mode B: Advance Pipeline

**When:** A pipeline is already in progress and you want to continue to the next phase.

**Example prompts:**
```
/ceo
"Advance the pipeline"
```
```
/ceo
"Continue to Phase 4"
```

**What happens:** CEO checks `pipeline_state.md`, identifies the current phase, delegates to the next skill, and updates the state.

---

#### Mode C: Post-Mortem

**When:** A pipeline just completed. CEO auto-triggers this after Phase 7, or you can request it.

**Example prompts:**
```
/ceo
"Run post-mortem on the web3-wallets pipeline"
```

**What happens:**
1. Reviews all phase outputs.
2. Extracts lessons → appends to `memory/lessons_learned.md`.
3. Creates backlog items for improvements found.
4. Marks mandate as DELIVERED.

---

#### Mode D: Status Report

**When:** You want a summary of everything — mandates, pipelines, and backlog.

**Example prompts:**
```
/status
```
```
/ceo
"What's the current status?"
```

**What you get:**
- Mandate table with pipeline progress.
- Backlog summary (total items, P0/P1 count, breakdown by category).
- Top 3 highest-priority open items.

---

#### Mode E: Backlog Manager

**When:** You want to add, update, close, or query backlog items.

**Example prompts:**
```
/backlog
"Add: FEATURE P1 Dark Mode Toggle — Add a dark/light mode switch to the Mukamal Web showroom"
```
```
/backlog
"Show me all P0 items"
```
```
/backlog
"Close BL-003 — interactive mode has been manually tested"
```

Full details in [Section 6: Backlog Management](#6-backlog-management).

---

#### Mode F: Skill Lifecycle

**When:** You want to create a new skill, update an existing one, or deprecate one.

**Example prompts:**
```
/ceo
"Create a new skill: SEO Auditor — scores pages against Core Web Vitals and meta tag best practices"
```
```
/ceo
"Update the content-writer skill — add LinkedIn carousel post format to output"
```
```
/ceo
"Deprecate the headless strategy in visual-capture-engine"
```

Full details in [Section 7: Skill Lifecycle](#7-skill-lifecycle).

---

#### Mode G: Rule Manager

**When:** You want to add, modify, or remove operating rules that all agents follow.

**Example prompts:**
```
/ceo
"Add rule: All audit reports must include a WCAG 2.2 AAA compliance section"
```
```
/ceo
"Modify rule 6: Change default capture strategy from native to interactive"
```

---

#### Mode H: Role Manager

**When:** You want to create new pillars/sub-agents or reassign skill ownership.

**Example prompts:**
```
/ceo
"Create a new pillar: 07_QA_Engine — automated quality assurance for all pipeline outputs"
```
```
/ceo
"Reassign harvesting-brand-tokens from 01_Audit_Engine to 03_System_Designer"
```

---

#### Mode I: Registry Sync

**When:** After making changes to skills, rules, or roles — or if you suspect configs are out of sync.

**Example prompts:**
```
/ceo
"Sync all registries"
```

**What happens:** CEO scans `skills/` and `.agents/workflows/`, cross-references against `Gemini.md`, `CLAUDE.md`, `Architecture.md`, and `Documentation.md`, reports discrepancies, and fixes them.

---

### CEO Files

| File | Purpose | CEO Reads At |
|------|---------|--------------|
| `mandate_board.md` | Active business directives | Startup |
| `pipeline_state.md` | Pipeline execution tracker | Startup |
| `backlog.md` | Centralized backlog (single source of truth) | Startup |
| `memory/lessons_learned.md` | Post-project insights | Startup |

---

## 3. Skills Reference

All skills live in `skills/[skill-name]/SKILL.md`. Each skill has structured `<instructions>`, `<inputs>`, and `<output_format>` tags.

---

### 3.1 Visual Capture Engine

**Slash command:** `/visual-capture`
**Pillar:** `01_Audit_Engine`
**What it does:** Takes pixel-perfect screenshots of websites and apps using real browsers on macOS.

#### Capture Modes

| Mode | What It Does | Use Case |
|------|-------------|----------|
| `window` | Captures a browser window at exact viewport dimensions | Standard website audit |
| `fullscreen` | Captures the entire screen | Dashboard monitoring, multi-window setups |
| `area` | Interactive crosshair selection of any screen region | Simulator windows, specific UI components |
| `hover` | Captures while hovering over a UI element | Tooltips, mega menus, dropdown states |
| `journey` | Multi-step capture through a user flow | Onboarding flows, checkout funnels |

#### Configuration Options

| Option | Values | Default |
|--------|--------|---------|
| Viewport | `desktop` (1440×900) / `mobile` (375×812) / `both` | `both` |
| Browser | `chrome` / `safari` / `both` | `chrome` |
| Strategy | `native` / `interactive` / `headless` | `native` |
| Delay | Seconds to wait for page load | `5` |
| Timer | Countdown before capture | `0` |

#### Example Usage
```
/visual-capture
Brand: revolut
URL: https://revolut.com
Viewport: both
Browser: chrome
Mode: window
```

**Outputs to:** `01_Audit_Engine/[brand]/media/`

---

### 3.2 Auditing UX

**Slash command:** `/auditing` or `/auditing-ux`
**Pillar:** `01_Audit_Engine`
**What it does:** Scores captured screenshots against heuristic frameworks and identifies revenue-leaking friction points.

#### Frameworks Used

| Framework | What It Evaluates |
|-----------|-------------------|
| Nielsen's 10 Heuristics | Usability principles (visibility, consistency, error prevention, etc.) |
| WCAG 2.2 AA/AAA | Accessibility compliance (contrast, keyboard nav, screen reader support) |
| Cognitive Load Theory | Information overload, working memory limits |
| Fitts's Law | Touch/click target sizing and distance |
| Gestalt Principles | Visual grouping, proximity, similarity |

#### Scoring Rubric

| Score | Label | Meaning |
|-------|-------|---------|
| 90-100 | BEST | Industry-leading |
| 75-89 | GOOD | Solid implementation |
| 60-74 | NEUTRAL | Room for improvement |
| 40-59 | BAD | Significant friction |
| 0-39 | BLOCKER | Revenue-leaking failure |

#### Example Usage
```
/auditing
Brand: revolut
UX Tier: onboarding
Screenshots: 01_Audit_Engine/revolut/media/
Frameworks: all
```

**Outputs to:** `01_Audit_Engine/[brand]/reports/`

---

### 3.3 Competitor Visual Audit

**Slash command:** `/competitor-audit`
**Pillar:** `01_Audit_Engine`
**What it does:** Orchestrates batch capture and benchmarking of multiple competitors in a vertical.

#### Example Usage
```
/competitor-audit
Vertical: Web3 Wallets
UX Tier: seed-phrase onboarding
Competitors:
  - MetaMask: https://metamask.io
  - Phantom: https://phantom.app
  - Rainbow: https://rainbow.me
  - Trust Wallet: https://trustwallet.com
  - Coinbase Wallet: https://wallet.coinbase.com
```

**Output:** Competitive matrix with ranks, scores, critical failures, and market leader/worst offender identification.

---

### 3.4 Harvesting Brand Tokens

**Slash command:** `/harvesting` or `/harvest-tokens`
**Pillar:** `01_Audit_Engine` / `03_System_Designer`
**What it does:** Scrapes design tokens (color, typography, spacing, elevation) from live websites and audits them against the Top 1% standard.

#### What Gets Extracted

| Token Type | What's Audited |
|------------|---------------|
| Colors | Hex/RGB/HSL values, AAA contrast ratio (7:1 min for text) |
| Typography | Font families, sizes, weights, line-heights — flags bloat (14+ unique sizes) |
| Spacing | Padding, margin, gap — checks 8px grid alignment |
| Elevation | Box-shadow, z-index layers |

#### Example Usage
```
/harvesting
URL: https://stripe.com
Scope: full-page
Base Grid: 8px
```

**Output:** Clean, deduplicated token inventory with PASS/FAIL annotations.

---

### 3.5 Designing Systems

**Slash command:** `/designing` or `/designing-systems`
**Pillar:** `03_System_Designer`
**What it does:** Takes broken UX metrics from audits and synthesizes mathematically perfect design solutions — Figma-ready tokens, structural layouts, and "The Mukamal Way" perfected flows.

#### What It Produces

| Output | Format |
|--------|--------|
| Structural corrections | Table: screen → failure → root cause → fix → spec |
| Design tokens | JSON: grid, typography, color, spacing, elevation |
| Perfected flow | Step-by-step redesigned user journey |

#### Example Usage
```
/designing
Broken Metrics: 01_Audit_Engine/metamask/reports/audit_report.md
Harvested Tokens: 03_System_Designer/harvester_output/metamask_tokens.json
Target Flow: seed-phrase onboarding
```

**Outputs to:** `03_System_Designer/` and routes to `02_Case_Study_Factory`.

---

### 3.6 Content Writer

**Pillar:** `04_Mukamal_Web` / `05_Content_Forge`
**What it does:** Generates high-converting, surgical, data-backed copy for the Mukamal website and content distribution.

#### Rules

- Uses the **AIDA framework** (Attention → Interest → Desire → Action) tailored for B2B.
- Headlines < 8 words. Sub-headlines < 24 words.
- Every claim backed by evidence (Rule 09: Evidence-Based Authenticity).
- Zero marketing fluff.

#### Example Usage
```
Target: Hero section for Mukamal Web
Audience: VP of Product at FinTech companies
Core Value Prop: We find the UX flaws leaking your revenue — and fix them
```

**Output:** Copy matrix with headline, sub-headline, primary CTA, and evidence.

---

### 3.7 UX/UI Designer

**Pillar:** `04_Mukamal_Web`
**What it does:** Enforces the Mukamal Dark Luxury Aesthetic and prescribes design specifications for the website.

#### The Mukamal Aesthetic

| Token | Value |
|-------|-------|
| Background | `#080808` (near-black) |
| Primary Accent | `#C6F135` (acid-green) |
| Text | `#F0EDE6` (off-white) |
| Display Font | Bebas Neue (100px+) |
| Body Font | DM Sans (16px/18px) |
| Data Font | Space Mono |
| Grid | 8px base, 12 columns, mathematical spacing |

#### Example Usage
```
Design the Services section
Layout: 12-col desktop, 4-col mobile
Include: GSAP animation parameters (ease, duration, stagger)
```

**Output:** Design specification with grid layout, typographic tokens, and animation parameters.

---

### 3.8 Web Master

**Pillar:** `04_Mukamal_Web`
**What it does:** Maintains, optimizes, and deploys the Mukamal website (`index.html`).

#### Rules

- Single-file HTML architecture (HTML + inline CSS + inline JS).
- Only Vanilla JS + GSAP (ScrollTrigger, ScrollSmoother).
- All animations wrapped in `gsap.matchMedia()` for responsive safety.
- Merges updates from Content Writer and UX/UI Designer without breaking ScrollSmoother.

#### Example Usage
```
Update the hero section headline to "We Design Conversion"
Add a new case study card linking to /web3-report
Ensure GSAP ScrollSmoother instance is preserved
```

**Output:** Deployment log with changes, status, and performance impact.

---

### 3.9 Case Study Factory

**Slash command:** `/case-study`
**Pillar:** `02_Case_Study_Factory`
**What it does:** Aggregates Phase 3 audit data and Phase 4 design outputs into polished, data-backed reports. Supports two modes.

#### Report Modes

| Mode | Purpose | Audience | Length |
|------|---------|----------|--------|
| `public` | Lead magnet for outbound distribution | VP of Product, CEO targets | 1,500–2,500 words |
| `private` | Deep-dive client deliverable | Paying clients | 3,000–5,000 words |

#### Public Report Structure
1. Executive Summary (3 sentences)
2. Top 3 Revenue-Leaking Failures (with severity + financial impact)
3. Before Screenshots (annotated captures)
4. The Mukamal Way (perfected flow specs)
5. Competitive Matrix
6. Call to Action

#### Private Report Structure
1. Executive Summary + methodology
2. Detailed Audit Matrix (per-screen, per-framework)
3. Before & After Analysis
4. Design Token Handoff (JSON)
5. Perfected Flow Walkthrough
6. Implementation Roadmap (S/M/L effort)
7. Appendix

#### Example Usage
```
/case-study
Project: web3-wallets
Mode: public
Vertical: Web3 Wallets
UX Tier: seed-phrase onboarding
Brands: MetaMask, Phantom, Rainbow, Trust Wallet, Coinbase
```

**Outputs to:** `02_Case_Study_Factory/[project_id]/` and `06_Workspace/[project_id]/02_Case_Studies/`

---

## 4. Slash Commands

Complete reference of all available slash commands:

| Command | Activates | What You Can Do |
|---------|-----------|-----------------|
| `/ceo` | Hub CEO | Pipeline orchestration, skill/rule/role management |
| `/pipeline` | Full Pipeline | Run complete 7-phase pipeline end-to-end |
| `/backlog` | Backlog Manager | Add, update, close, query, prioritize backlog items |
| `/case-study` | Case Study Factory | Assemble lead magnet or client reports from audit data |
| `/status` | Status Report | View mandates, pipelines, and backlog summary |
| `/visual-capture` | Visual Capture Engine | Capture screenshots (any mode) |
| `/auditing` | Auditing UX | Score interfaces against UX frameworks |
| `/auditing-ux` | Auditing UX | Full form of `/auditing` |
| `/competitor-audit` | Competitor Visual Audit | Multi-competitor benchmarking |
| `/designing` | Designing Systems | Synthesize design solutions from audit data |
| `/designing-systems` | Designing Systems | Full form of `/designing` |
| `/harvesting` | Harvesting Brand Tokens | Extract design tokens from live DOM |
| `/harvest-tokens` | Harvesting Brand Tokens | Full form of `/harvesting` |

---

## 5. The 7-Phase Pipeline

The pipeline is the core execution loop. It runs sequentially — no phase can be skipped.

```
Phase 1: TRIGGER        → CEO decomposes mandate into targets
Phase 2: RECONNAISSANCE → Visual Capture Engine captures all targets
Phase 3: AUDITING       → Auditing UX scores all captures
Phase 4: DESIGNING      → Designing Systems synthesizes perfected flows
Phase 5: CASE STUDY     → Case Study Factory aggregates into report
Phase 6: PUBLISHING     → Mukamal Web publishes to website
Phase 7: DISTRIBUTION   → Content Forge distributes to channels
```

### Running a Pipeline

**Option A — Full auto:**
```
/pipeline
Mandate: "Audit the Top 5 neobank onboarding flows"
```

**Option B — Step by step:**
```
/ceo
"New mandate: Audit neobanks"      → Triggers Phase 1
/ceo
"Advance"                          → Each call advances one phase
```

### Pipeline Status Tracking

The pipeline state is tracked in `00_The_Hub_CEO/pipeline_state.md`. Check it anytime with `/status`.

| Status | Meaning |
|--------|---------|
| `PHASE N — [NAME]` | Pipeline is at Phase N |
| `BLOCKED` | Phase failed, waiting for human input |
| `COMPLETED` | All 7 phases done |

---

## 6. Backlog Management

The backlog (`00_The_Hub_CEO/backlog.md`) is the **single source of truth** for all work items.

### Item Categories

| Category | What It Tracks |
|----------|---------------|
| `IMPROVE` | Enhancements to existing skills/workflows |
| `FEATURE` | New capabilities or pipeline extensions |
| `SKILL` | Creating, updating, or deprecating skills |
| `RULE` | Adding or changing operating rules |
| `ROLE` | New roles, pillars, or ownership changes |

### Priority Levels

| Priority | Meaning | Action |
|----------|---------|--------|
| `P0` | Critical | Must address before next pipeline run |
| `P1` | High | Address this sprint |
| `P2` | Medium | Address when capacity allows |
| `P3` | Low | Nice-to-have |

### Common Operations

**Add an item:**
```
/backlog
Add: FEATURE P1 iOS Simulator Capture — Enable visual-capture-engine to capture from Xcode Simulator windows
```

**Query items:**
```
/backlog
Show all P0 items
```
```
/backlog
What's open for visual-capture-engine?
```

**Update an item:**
```
/backlog
Update BL-003: status → IN PROGRESS
```

**Close an item:**
```
/backlog
Close BL-010 — completed registry sync on 2026-03-12
```

**Reprioritize:**
```
/backlog
Reprioritize BL-009 to P1
```

---

## 7. Skill Lifecycle

Use the CEO (Mode F) to manage skills without touching files manually.

### Create a New Skill
```
/ceo
Create skill: SEO Auditor
Pillar: 01_Audit_Engine
Purpose: Score pages against Core Web Vitals, meta tags, structured data, and mobile-friendliness
Inputs: URL, scope (single-page / site-wide)
Output: SEO score matrix with pass/fail per criteria
```

**What the CEO does:**
1. Generates `SKILL.md` in `skills/seo-auditor/`.
2. Creates workflow in `.agents/workflows/seo-auditor.md`.
3. Registers in `Gemini.md`, `CLAUDE.md`, and user rules registry.
4. Updates `backlog.md` (closes related items or creates follow-ups).

### Update an Existing Skill
```
/ceo
Update skill: content-writer
Change: Add LinkedIn carousel post format to the output_format section
```

### Deprecate a Skill
```
/ceo
Deprecate skill: [skill-name]
Reason: Functionality merged into [other-skill]
```

---

## 8. Rule & Role Management

### Managing Rules (Mode G)

Rules are the operating constraints all agents follow. They live in `Gemini.md` and `CLAUDE.md`.

**Add a rule:**
```
/ceo
Add rule: All case study reports must include a 3-sentence executive summary at the top
```

**Modify a rule:**
```
/ceo
Modify rule 7: Change default mobile viewport from 375×812 to 393×852
```

**Remove a rule:**
```
/ceo
Remove rule: [description of rule to remove]
```

### Managing Roles (Mode H)

Roles are the organizational pillars (directories) that own specific responsibilities.

**Current Pillars:**

| Pillar | Role | Skills Owned |
|--------|------|-------------|
| `00_The_Hub_CEO` | Strategic Orchestrator | — (delegates only) |
| `01_Audit_Engine` | Analysis Core | visual-capture-engine, auditing-ux, competitor-visual-audit, harvesting-brand-tokens |
| `02_Case_Study_Factory` | Sales Engine | case-study-factory |
| `03_System_Designer` | Creative Director AI | designing-systems, harvesting-brand-tokens |
| `04_Mukamal_Web` | Showroom | content-writer, ux-ui-designer, web-master |
| `05_Content_Forge` | Distribution Grid | — (pending activation) |
| `06_Workspace` | Storage Drive | — (data only) |

**Create a new pillar:**
```
/ceo
Create pillar: 07_QA_Engine
Purpose: Automated quality assurance — validates all pipeline outputs before advancing
```

**Reassign a skill:**
```
/ceo
Reassign skill harvesting-brand-tokens from 01_Audit_Engine to 03_System_Designer exclusively
```

---

## 9. File & Directory Map

```
Mukamal/
├── 00_The_Hub_CEO/                      # CEO brain + orchestration
│   ├── SKILL.md                         # CEO operating instructions (9 modes)
│   ├── mandate_board.md                 # Active business directives
│   ├── pipeline_state.md               # Pipeline execution tracker
│   ├── backlog.md                       # Centralized backlog (SINGLE SOURCE OF TRUTH)
│   └── memory/
│       └── lessons_learned.md           # Post-project insights
├── 01_Audit_Engine/                     # Analysis Core (stores audit media + reports)
│   └── [brand]/
│       ├── media/                       # Captured screenshots
│       └── reports/                     # Audit reports
├── 02_Case_Study_Factory/               # Lead magnet report assembly
├── 03_System_Designer/                  # Design synthesis outputs
├── 04_Mukamal_Web/                      # Website (index.html, case-study.html)
├── 05_Content_Forge/                    # Content distribution (pending activation)
├── 06_Workspace/                        # ALL client data & project reports
│   └── [project-id]/
│       ├── 01_Audit_Data/
│       ├── 02_Case_Studies/
│       ├── 03_Design_Systems/
│       └── 04_Distribution_Assets/
├── skills/                              # All executable AI skills
│   ├── visual-capture-engine/SKILL.md   # Screenshot capture
│   ├── auditing-ux/SKILL.md             # UX heuristic scoring
│   ├── competitor-visual-audit/SKILL.md # Multi-competitor benchmarking
│   ├── designing-systems/SKILL.md       # Design system synthesis
│   ├── harvesting-brand-tokens/SKILL.md # DOM token extraction
│   ├── content-writer/SKILL.md          # Copy generation
│   ├── ux-ui-designer/SKILL.md          # Aesthetic enforcement
│   ├── web-master/SKILL.md              # Website maintenance
│   └── case-study-factory/SKILL.md      # Lead magnet & client report assembly
├── .agents/workflows/                   # Slash command definitions
├── docs/                                # Documentation
│   ├── Architecture.md                  # System architecture
│   ├── Businessplan.md                  # Business strategy
│   ├── Documentation.md                 # Operations manual
│   └── How-to-Use.md                    # This file
├── Gemini.md                            # Gemini agent config
└── CLAUDE.md                            # Claude agent config
```

---

*Mukamal OS — How to Use Guide — v1.0*
