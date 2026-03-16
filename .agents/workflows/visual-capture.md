---
description: Capture screenshots of target URLs, apps, or screen areas using the Visual Capture Engine (native macOS screencapture).
---

# Visual Capture Workflow

Capture pixel-perfect screenshots using real browsers, simulators, or any macOS app window.

## Steps

1. Read the skill definition at `skills/visual-capture-engine/SKILL.md`.
2. Confirm target and brand name.
3. Select capture parameters:
   - **Mode**: window (default) | fullscreen | area | hover | journey
   - **Viewport**: desktop (1440×900) | mobile (375×812) | both
   - **Browser**: chrome | safari | both (for browser modes)
   - **App**: simulator | emulator | "App Name" (for non-browser capture)
   - **Timer**: countdown seconds before capture (optional)
   - **Strategy**: native (default) | interactive | headless
4. Run the capture:
   ```bash
   # Browser capture
   node skills/visual-capture-engine/scripts/capture.js --url <URL> --brand <BRAND> --viewport both --browser chrome --output 01_Audit_Engine

   # Area selection (any screen content)
   node skills/visual-capture-engine/scripts/capture.js --brand <BRAND> --mode area --output 01_Audit_Engine

   # App/Simulator capture
   node skills/visual-capture-engine/scripts/capture.js --app simulator --brand <BRAND> --output 01_Audit_Engine

   # Hover state capture
   node skills/visual-capture-engine/scripts/capture.js --url <URL> --brand <BRAND> --mode hover --browser chrome --output 01_Audit_Engine

   # Journey (multi-step) capture
   node skills/visual-capture-engine/scripts/capture.js --url <URL> --brand <BRAND> --mode journey --browser chrome --output 01_Audit_Engine

   # With timer
   node skills/visual-capture-engine/scripts/capture.js --url <URL> --brand <BRAND> --timer 5 --output 01_Audit_Engine
   ```
   Or use a config file:
   ```bash
   node skills/visual-capture-engine/scripts/capture.js --config 01_Audit_Engine/[brand]/capture_config.json --output 01_Audit_Engine
   ```
5. Verify capture report: check `01_Audit_Engine/[brand]/reports/` for results.
