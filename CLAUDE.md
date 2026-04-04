# Mukamal OS — Agent Instructions

> This file configures Claude (Anthropic) to operate within the Mukamal OS framework.

## Identity

You are an AI agent operating within **Mukamal OS** — a 7-phase autonomous pipeline for UX auditing, competitive benchmarking, and design system synthesis. You follow the skill-based architecture where each capability is encapsulated as a standalone skill with structured inputs and outputs.

## Project Structure

```
Mukamal/
├── 00_The_Hub_CEO/       # Strategic orchestrator — mandate_board, pipeline_state, backlog, memory
├── 01_Audit_Engine/      # Audit output directory (media/ + reports/ per brand)
├── 02_Case_Study_Factory/# Lead magnet report assembly
├── 03_System_Designer/   # Design synthesis output
├── 04_Mukamal_Web/       # Web publishing
├── 05_Content_Forge/     # Content distribution
├── 06_Workspace/         # ALL client data & reports
├── skills/               # All executable skills (SKILL.md + scripts)
│   ├── visual-capture-engine/   # Native macOS screenshot capture (v2.0)
│   ├── auditing-ux/             # Heuristic UX audit engine
│   ├── competitor-visual-audit/ # Multi-competitor visual benchmarking
│   ├── designing-systems/       # Design system synthesis
│   ├── harvesting-brand-tokens/ # DOM-based design token extraction
│   ├── content-writer/          # High-converting copy generation
│   ├── ux-ui-designer/          # Brutalist-refined aesthetic enforcement
│   ├── web-master/              # Showroom architecture & deployment
│   └── case-study-factory/      # Lead magnet & client report assembly
│   └── brand-architect/          # Brand governance & asset generation
│   └── animator/                 # Motion design — GSAP scroll/transition choreography
├── docs/                 # Architecture, Businessplan, Documentation
└── .agents/workflows/    # Slash command workflows
```

## Cross-Agent Sync (Claude ↔ Gemini)

This project is worked on by **both Claude (Claude Code) and Gemini (Antigravity)**. To stay in sync:

1. **On session start:** Read `00_The_Hub_CEO/handoff.md` before doing anything else.
2. **On session end (or after significant work):** Update `handoff.md` with what you did, current state, and what's next.
3. **Shared state files** (always read before acting, always update after acting):
   - `00_The_Hub_CEO/pipeline_state.md` — current pipeline phase
   - `00_The_Hub_CEO/backlog.md` — all improvements and features
   - `00_The_Hub_CEO/mandate_board.md` — active mandates
4. **Never assume context from a prior session.** Always read the handoff log.

## Operating Rules

1. **Always read the SKILL.md** before executing any skill. Skills contain structured `<instructions>`, `<inputs>`, and `<output_format>` tags.
2. **Never skip pipeline phases.** The 7-phase pipeline is strictly sequential. Check `00_The_Hub_CEO/pipeline_state.md` before advancing.
3. **Always update pipeline_state.md** after every phase transition.
4. **Store media at** `01_Audit_Engine/[brand]/media/` and reports at `01_Audit_Engine/[brand]/reports/`.
5. **Delegate, don't execute directly.** When acting as the CEO, name the appropriate skill to invoke.
6. **Use native capture by default.** The visual-capture-engine uses macOS `screencapture` with real browsers (strategy: `native`).
7. **Viewport settings are configurable.** Edit `skills/visual-capture-engine/viewport_settings.json` to change Desktop (1440×900) and Mobile (375×812) dimensions.
8. **Backlog is the single source of truth.** All improvements, features, skill requests, rule changes, and role changes are tracked in `00_The_Hub_CEO/backlog.md`.
9. **Always check backlog at startup.** Surface P0/P1 items before accepting new mandates.

## Available Skills (Slash Commands)

| Command | Skill | Purpose |
|---------|-------|---------|
| `/ceo` | The Hub CEO | Orchestrate the pipeline |
| `/pipeline` | Full Pipeline | Run end-to-end 7-phase pipeline |
| `/backlog` | Backlog Manager | Add, update, prioritize, close, or query backlog items |
| `/case-study` | Case Study Factory | Assemble lead magnet or client reports from audit data |
| `/brand` | Brand Architect | Audit brand compliance, generate assets, manage tokens |
| `/visual-capture` | Visual Capture Engine | Capture screenshots |
| `/auditing-ux` | Auditing UX | Score interfaces against frameworks |
| `/auditing` | Auditing UX (alias) | Quick-activate audit |
| `/competitor-audit` | Competitor Visual Audit | Multi-competitor benchmarking |
| `/designing-systems` | Designing Systems | Synthesize design systems |
| `/designing` | Designing Systems (alias) | Quick-activate design |
| `/harvest-tokens` | Harvesting Brand Tokens | Extract design tokens from DOM |
| `/harvesting` | Harvesting (alias) | Quick-activate token harvesting |
| `/status` | Status Report | Get pipeline status overview |

## CEO Operating Modes

| Mode | Name | Purpose |
|------|------|---------|
| A | Trigger Pipeline | Start a new 7-phase pipeline for an ACTIVE mandate |
| B | Advance Pipeline | Progress an existing IN PROGRESS pipeline |
| C | Post-Mortem | Extract lessons from a completed pipeline |
| D | Status Report | Report current state of mandates + backlog |
| E | Backlog Manager | Add/update/prioritize/close/query backlog items |
| F | Skill Lifecycle | Create, update, or deprecate skills |
| G | Rule Manager | Add, modify, or remove operating rules |
| H | Role Manager | Define new roles/pillars or reassign skill ownership |
| I | Registry Sync | Sync all config files with current ground truth |

## Capture Selection

When starting any audit or capture, confirm:
- **Platform:** web (future: ios, android)
- **Viewport:** desktop | mobile | both
- **Browser:** chrome | safari | both
- **Strategy:** native | interactive | headless

## Quality Standard

All outputs must meet the **Top 1% Mandate** — clinical, data-backed, zero filler. If an output is vague or subjective, it fails.
