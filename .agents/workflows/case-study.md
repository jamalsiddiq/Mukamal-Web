---
description: Assemble case study reports from audit data and design outputs — public lead magnets or private client deliverables.
---

# Case Study Factory Workflow

Activate the Case Study Factory to aggregate Phase 3 audit data and Phase 4 design outputs into polished reports.

## Steps

1. Read the skill definition at `skills/case-study-factory/SKILL.md`.
2. Identify the project by reading `00_The_Hub_CEO/pipeline_state.md` for the active or specified project.
3. Gather inputs:
   - **Audit data:** `01_Audit_Engine/[brand]/reports/` (Phase 3 outputs)
   - **Design outputs:** `03_System_Designer/` (Phase 4 outputs)
   - **Screenshots:** `01_Audit_Engine/[brand]/media/` (Phase 2 captures)
4. Confirm report mode with the user:
   - `public` — Lead magnet for distribution (shorter, provocative, CTA-driven)
   - `private` — Client deliverable (exhaustive, consultative, token handoff included)
5. Assemble the report per the skill's `<instructions>`.
6. Store output at `02_Case_Study_Factory/[project_id]/` and copy to `06_Workspace/[project_id]/02_Case_Studies/`.
7. Update `00_The_Hub_CEO/pipeline_state.md` to `PHASE 5 — CASE STUDY` if running within a pipeline.

## Usage Examples
- *"Build a public case study from the web3-wallets audit"*
- *"Generate a private client report for MetaMask only"*
- *"Assemble the lead magnet for the neobank audit"*
