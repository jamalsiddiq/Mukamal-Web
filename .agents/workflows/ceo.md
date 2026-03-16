---
description: Activates the Hub CEO skill to orchestrate the Mukamal pipeline
---

# The Hub CEO Workflow

Activate The Hub CEO to orchestrate Mukamal OS operations.

## Steps

1. Read the CEO skill definition at `00_The_Hub_CEO/SKILL.md`.
2. Execute the CEO Startup Sequence:
   - Read `00_The_Hub_CEO/mandate_board.md` → identify the highest-priority ACTIVE mandate.
   - Read `00_The_Hub_CEO/pipeline_state.md` → determine if a pipeline is IN PROGRESS, BLOCKED, or IDLE.
   - Read `00_The_Hub_CEO/memory/lessons_learned.md` → apply historical insights.
   - Read `00_The_Hub_CEO/backlog.md` → surface P0/P1 items.
3. Determine the operating mode:
   - **Mode A: Trigger** — Start a new pipeline for an ACTIVE mandate.
   - **Mode B: Advance** — Progress an existing IN PROGRESS pipeline.
   - **Mode C: Post-Mortem** — Extract lessons from a completed pipeline.
   - **Mode D: Status** — Report current state of mandates + backlog.
   - **Mode E: Backlog** — Add, update, prioritize, close, or query backlog items.
   - **Mode F: Skill Lifecycle** — Create, update, or deprecate skills.
   - **Mode G: Rule Manager** — Add, modify, or remove operating rules.
   - **Mode H: Role Manager** — Define new roles/pillars or reassign skill ownership.
   - **Mode I: Registry Sync** — Sync all config files with current ground truth.
4. Execute the appropriate mode and update `pipeline_state.md` or `backlog.md` as needed.
