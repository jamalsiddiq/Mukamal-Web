---
description: Run a multi-competitor visual capture and benchmarking audit.
---

# Competitor Visual Audit Workflow

Orchestrate systematic visual capture and benchmarking of Top N competitors in a vertical.

## Steps

1. Read the skill definition at `skills/competitor-visual-audit/SKILL.md`.
2. Define the vertical, UX tier, and competitor URL list.
3. Create a capture config at `01_Audit_Engine/[brand]/capture_config.json`.
4. Run visual captures for all targets using `skills/visual-capture-engine`.
5. Construct a competitive matrix comparing each competitor across heuristic dimensions.
6. Rank competitors by overall UX score.
7. Store reports at `01_Audit_Engine/[brand]/reports/`.
