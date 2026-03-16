# Mukamal OS — Centralized Backlog

> The single source of truth for all improvements, features, skills, rules, and roles.
> The CEO reads this file at startup and manages it via **Mode E: Backlog Manager**.

## Backlog Legend
- **Category:** `IMPROVE` | `FEATURE` | `SKILL` | `RULE` | `ROLE`
- **Priority:** `P0` (critical) | `P1` (high) | `P2` (medium) | `P3` (low)
- **Status:** `OPEN` | `IN PROGRESS` | `BLOCKED` | `DONE`

---

## Active Backlog

| ID | Category | Priority | Title | Description | Status | Owner | Date |
|----|----------|----------|-------|-------------|--------|-------|------|
| BL-001 | IMPROVE | P1 | Safari RDM Retry Loop | Add retry logic (3 attempts, 1s delay) for Safari Responsive Design Mode Accessibility permission failures (error -1719). Source: lessons_learned.md | OPEN | visual-capture-engine | 2026-03-05 |
| BL-002 | IMPROVE | P1 | Chrome CDP Mobile Launch | Investigate launching Chrome with `--remote-debugging-port` pre-configured so CDP port 9222 is reachable for Device Mode. Current fallback: window resize. Source: lessons_learned.md | OPEN | visual-capture-engine | 2026-03-05 |
| BL-003 | IMPROVE | P2 | Interactive Mode Testing | Schedule test run for `screencapture -i` interactive mode. Currently untested. Source: lessons_learned.md | OPEN | visual-capture-engine | 2026-03-05 |
| BL-004 | FEATURE | P1 | Journey Mode (Phase D) | Multi-step interaction capture for auditing full user flows (onboarding, checkout). SKILL.md already defines the mode, but untested end-to-end in a pipeline. Source: Architecture.md roadmap | OPEN | visual-capture-engine | 2026-03-12 |
| BL-005 | FEATURE | P2 | Mirror/Simulator Mode (Phase E) | iPhone Mirroring / Xcode Simulator support for native iOS/Android app audits. Source: Architecture.md roadmap | OPEN | visual-capture-engine | 2026-03-12 |
| BL-006 | FEATURE | P1 | Heuristic Intelligence Engine (Phase A) | Ingestion pipeline for Human Input + Notebook LM to continuously update heuristic frameworks used by auditing-ux. Source: Architecture.md roadmap | OPEN | auditing-ux | 2026-03-12 |
| BL-007 | SKILL | P1 | Content Forging Skill (Phase B) | Dedicated skill for `05_Content_Forge` — outbound email/LinkedIn distribution logic. Currently no SKILL.md for this pillar. Source: Architecture.md roadmap | OPEN | 05_Content_Forge | 2026-03-12 |
| BL-008 | FEATURE | P0 | Case Study Factory Activation | Activate `02_Case_Study_Factory` — aggregate Phase 3 audit + Phase 4 design into unified lead magnet reports. Currently empty directory. Source: Businessplan.md Phase 4 | DONE | 02_Case_Study_Factory | 2026-03-12 |
| BL-009 | FEATURE | P2 | Content Forge Distribution Grid | Build the outbound distribution pipeline (LinkedIn posts + cold email scripts from case studies). Source: Businessplan.md Phase 5 | OPEN | 05_Content_Forge | 2026-03-12 |
| BL-010 | IMPROVE | P0 | Registry Sync — Agent Configs | Sync `Gemini.md` and `CLAUDE.md` with all 8 current skills and new slash commands. Currently missing: content-writer, ux-ui-designer, web-master. | DONE | 00_The_Hub_CEO | 2026-03-12 |
| BL-011 | IMPROVE | P2 | Architecture.md Sync | Update `docs/Architecture.md` Domain Skills Ledger to include all 8 skills (currently lists only 5). | OPEN | 00_The_Hub_CEO | 2026-03-12 |
| BL-012 | IMPROVE | P2 | Documentation.md Sync | Update `docs/Documentation.md` Layer 2 skills table to include all 8 skills (currently lists only 5). | OPEN | 00_The_Hub_CEO | 2026-03-12 |
| BL-013 | FEATURE | P1 | Multi-Vertical Pipeline Support | Enable concurrent pipelines for multiple verticals (e.g., FinTech + Web3 running simultaneously). Currently single-pipeline only. | OPEN | 00_The_Hub_CEO | 2026-03-12 |
| BL-014 | IMPROVE | P2 | Workspace Directory Structure | Enforce standardized subdirectory structure under `06_Workspace/[project]/` (01_Audit_Data, 02_Case_Studies, 03_Design_Systems, 04_Distribution_Assets). | OPEN | 00_The_Hub_CEO | 2026-03-12 |
| BL-015 | RULE | P2 | Backlog-Driven Prioritization Rule | Add operating rule: CEO must check backlog.md at startup and surface P0/P1 items before accepting new mandates. | OPEN | 00_The_Hub_CEO | 2026-03-12 |
| BL-016 | FEATURE | P1 | Audit Engine Mobile Viewport Update | Expand mobile viewport geometry to 393×852 @3x (iPhone 15 Pro). Current default: 375×812. Source: Businessplan.md | OPEN | visual-capture-engine | 2026-03-12 |

---

## Completed Items

| ID | Category | Title | Completed | Notes |
|----|----------|-------|-----------|-------|
| — | — | — | — | No items completed yet |

---

## How to Use This Backlog

### Adding Items
Tell the CEO: *"Add a backlog item: [category] [priority] [title] [description]"*
The CEO will assign the next `BL-XXX` ID and append it.

### Updating Items
Tell the CEO: *"Update BL-XXX: status → IN PROGRESS"* or *"Reprioritize BL-XXX to P0"*

### Closing Items
Tell the CEO: *"Close BL-XXX"* — moves to Completed Items with timestamp and notes.

### Querying
Tell the CEO: *"Show me all P0 items"* or *"What's open for visual-capture-engine?"*
