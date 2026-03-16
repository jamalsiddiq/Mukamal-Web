---
description: The Mukamal 7-Phase Autonomous Pipeline — end-to-end from trend detection to lead distribution.
---

# Pipeline Workflow

Execute the Mukamal 7-Phase Pipeline for a given mandate.

// turbo-all

## Prerequisites
1. Read `00_The_Hub_CEO/mandate_board.md` to identify the ACTIVE mandate.
2. Read `00_The_Hub_CEO/pipeline_state.md` to determine current phase.
3. Read `00_The_Hub_CEO/memory/lessons_learned.md` for historical context.

## Autonomous Execution Sequence
Execute the following phases sequentially. If any phase fails, trigger **Phase 8 — ERROR RECOVERY**.

### Phase 1 — TRIGGERING (The Hub CEO)
1. Decompose the ACTIVE mandate into a target list (Top N URLs/brands in the vertical).
2. Define capture selection: `platform`, `viewport`, `browser`, `strategy`.
3. Create/update `pipeline_state.md` with Status: `PHASE 1 — TRIGGERING` and the defined target list.

### Phase 2 — RECONNAISSANCE (Visual Capture Engine)
1. Use `skills/visual-capture-engine` to automatically capture all targets defined in Phase 1.
2. Execute the shell command (using `--mode window` or configured mode):
   `node skills/visual-capture-engine/scripts/capture.js --url <URL> --brand <BRAND> --viewport <VIEWPORT> --browser <BROWSER> --output 01_Audit_Engine`
3. Verify capture report: all targets must be `SUCCESS`.
4. Update `pipeline_state.md` to `PHASE 2 — RECONNAISSANCE`.

### Phase 3 — AUDITING (Auditing UX)
1. Use `skills/auditing-ux` to score all captured screenshots found in `01_Audit_Engine/[brand]/media/`.
2. Generate the scored audit matrix with heuristic violations.
3. Save the output to `01_Audit_Engine/[brand]/reports/`.
4. Update `pipeline_state.md` to `PHASE 3 — AUDITING`.

### Phase 4 — DESIGNING (Designing Systems)
1. Use `skills/designing-systems` to synthesize perfected flows based on the Phase 3 audit failure report.
2. Output Figma-ready specifications, design tokens, and layout corrections to `03_System_Designer/`.
3. Update `pipeline_state.md` to `PHASE 4 — DESIGNING`.

### Phase 5 — CASE STUDY (Case Study Factory)
1. Route to `02_Case_Study_Factory` for report assembly.
2. Automatically aggregate Phase 3 audit data + Phase 4 design outputs into a unified lead magnet report markdown file.
3. Update `pipeline_state.md` to `PHASE 5 — CASE STUDY`.

### Phase 6 — PUBLISHING (Mukamal Web)
1. Route to `04_Mukamal_Web` for web publishing.
2. Update `pipeline_state.md` to `PHASE 6 — PUBLISHING`.

### Phase 7 — DISTRIBUTION (Content Forge)
1. Route to `05_Content_Forge` for content distribution (LinkedIn posts, etc.).
2. Update `pipeline_state.md` to `PHASE 7 — DISTRIBUTION`.
3. Mark project as `COMPLETED` in `pipeline_state.md` and the mandate as `DELIVERED` in `mandate_board.md`.
4. Extract a lesson learned and append to `memory/lessons_learned.md`.

### Phase 8 — ERROR RECOVERY (Fallback)
1. If a phase fails (e.g., capture crash, missing data), log the error.
2. Mark `pipeline_state.md` Status as `BLOCKED`.
3. Analyze the error and attempt a single automated retry for the failing phase.
4. If the retry fails, halt execution and notify the USER via the `notify_user` tool with a specific failure report and wait for HITL (Human-in-the-Loop) resolution.
