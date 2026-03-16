---
description: Run a UX audit on captured screenshots using heuristic frameworks.
---

# Auditing UX Workflow

Score captured digital interfaces against heuristic frameworks and output a clinical friction report.

## Steps

1. Read the skill definition at `skills/auditing-ux/SKILL.md`.
2. Identify the brand, interface type, and UX tier under evaluation.
3. Confirm capture selection (platform, viewport, browser, strategy).
4. Use `skills/visual-capture-engine` to capture screenshots if not already done.
5. Load applicable frameworks: Nielsen's 10, WCAG 2.2 AA/AAA, Cognitive Load Theory, Fitts's Law, Gestalt Principles.
6. Score each captured screen against every applicable heuristic.
7. Compute aggregate failure rates and output the full scored audit matrix.
8. Store the audit report at `01_Audit_Engine/[brand]/reports/`.
