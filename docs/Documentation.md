# Mukamal OS — Operations Documentation

## 01 — Core Directives (The Brand DNA)

All autonomous agents and skills are strictly bound by:

- **The "Top 1%" Mandate**: Every task executes with the objective of generating Revenue Powerhouses. If it isn't Top 1%, the execution is a failure.
- **Minimalist Tone**: Clinical, declarative, data-backed. No AI fluff.
- **Logic Dictates Layout**: UX interactions mapped psychologically before visualized.
- **Zero-Bloat Process**: Assets stripped of cognitive friction (cookies removed before audits, redundant steps eliminated).
- **HITL Gates**: AI handles data acquisition, scoring, scaffolding, orchestration. Humans own taste, narrative, validation, and sales.

---

## 02 — Two-Layer Skill Architecture

### Definitions
- **Pillars** = The core operational directories acting as the Sub-Agent logic nodes (e.g., `01_Audit_Engine`). These directories process data but **never** store client or project assets.
- **Skills** = The executable AI tools stored inside `skills/` (e.g., `auditing-ux`). Each skill executes specialized work on behalf of a pillar.

### Layer 1: Global Skills (Meta — `~/Documents/Global Skills/`)

Manage the lifecycle of all skills. These are NOT duplicated inside the project.

| Skill | Purpose |
|-------|---------|
| Skill Creator | Build new skills from intent |
| Skill Updater | Refine existing skills |
| Skill Search & Retrieve | Route problems to best-fit skill |
| Skill Execute/Test | Sandbox execution |
| Skill Analytics | Grade outputs → Deploy/Update/Deprecate |
| Skill Backup | Serialize to JSON with semver |
| Skill Archive & Delete | Safe deprecation + registry cleanup |
| Skill Acquisition Planner | Macro goal → micro-skill roadmap |

### Layer 2: Mukamal Domain Skills (`Mukamal/skills/`)

Execute the pipeline work. Each skill has a `SKILL.md` in the Global Skill Creator format.

| Skill | Pillar | Purpose |
|-------|--------|---------|
| `visual-capture-engine` | `01_Audit_Engine` | Headless/interactive capture, geometry locking, sanitization |
| `auditing-ux` | `01_Audit_Engine` | Heuristic scoring (Nielsen, WCAG, cognitive load) |
| `competitor-visual-audit` | `01_Audit_Engine` | Multi-competitor capture + competitive matrices |
| `harvesting-brand-tokens` | `01` / `03` | DOM token extraction, AAA enforcement |
| `designing-systems` | `03_System_Designer` | Broken metrics → Figma-ready tokens + perfected flows |

**Deduplication Note**: The former `architecting-skills` and `self-improving-supervisor` are now handled by Global Skills (Skill Creator/Updater and Skill Analytics respectively).

---

## 03 — The Mukamal Architecture (Central Intelligence Core)

### The Hub: AI-CEO (`00_The_Hub_CEO/`)
- Manages business KPIs (e.g., "5 new FinTech leads this month")
- Leverages Brand DNA rules
- Stores Lessons Learned post-project for continuous improvement

### Sub-Agent Pillars

| Pillar | Role | Interactions |
|--------|------|-------------|
| `01_Audit_Engine` | Analysis Core | Captures + scores competitors |
| `02_Case_Study_Factory` | Sales Engine | Public Audits (lead magnets) + Private Audits (client delivery) |
| `03_System_Designer` | Creative Director AI | Structural layouts for Web, Before/After visuals for Case Studies, social assets for Forge |
| `04_Mukamal_Web` | Showroom | Hosts published reports and the agency website |
| `05_Content_Forge` | Distribution Grid | Outbound email/LinkedIn from formatted case studies |

---

## 04 — Skill Creation & Update Procedures

### Creating a New Domain Skill
1. Define the intent and constraints.
2. Invoke **Global Skill Creator** → produces `SKILL.md` + registry manifests.
3. Place `SKILL.md` in `Mukamal/skills/[skill-name]/`.
4. Append registry entry to `Global Skills/Gemini.md`.

### Updating an Existing Skill
1. Identify the update needed.
2. Invoke **Global Skill Updater** with the current `SKILL.md` + update request.
3. Replace the `SKILL.md` and update registry entries.

### Testing a Skill
1. Invoke **Global Skill Execute/Test** with the skill's prompt + test input.
2. Invoke **Global Skill Analytics** to grade the output.
3. Action: Deploy / Update / Deprecate.

---

## 05 — Pipeline Execution Guide

The 7-phase pipeline is defined in `.agents/workflows/pipeline.md`. Execution rules:
- **Sequential**: Phase N+1 cannot start until Phase N completes.
- **Pass-through**: Each phase's output is the next phase's input.
- **Halt on failure**: Any phase failure stops the chain.

See `Architecture.md` Section 4 for the full pipeline flow.

---

## 06 — Directory Conventions

```
Mukamal/
├── .agents/rules.md                     # Brand DNA rules
├── .agents/workflows/pipeline.md        # 7-phase pipeline
├── 00_The_Hub_CEO/                      # Orchestration
├── 01_Audit_Engine/                     # Analysis Core (Stateless)
├── 02_Case_Study_Factory/               # Sales Engine (Stateless)
├── 03_System_Designer/                  # Creative AI (Stateless)
├── 04_Mukamal_Web/                      # Website Logic
├── 05_Content_Forge/                    # Distribution Grid
├── 06_Workspace/                        # Client & Case Study Data (e.g., web3-wallets/)
├── docs/                                # Documentation (Architecture, Businessplan)
└── skills/[skill-name]/SKILL.md         # Domain skill definitions
```

---
*Mukamal OS Documentation — v2.0*