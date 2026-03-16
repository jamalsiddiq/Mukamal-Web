# Lessons Learned — CEO Memory Bank

> Post-project insights appended after each completed pipeline run. The CEO reads this at startup to apply historical context to current decisions.

---

<!-- Lessons are appended below this line in reverse chronological order -->

### 2026-03-05 | web3-wallets Phase 2 | Visual Capture Engine v2.0

**What worked:**
- Native strategy (real browser + `screencapture`) eliminated all bot detection and timeout failures.
- Chrome desktop + mobile: 10/10. Safari desktop: 5/5.
- JXA-based window ID retrieval (via `osascript -l JavaScript` + CoreGraphics) is reliable on macOS.
- CLI `--browser` flag now correctly overrides config file `browser` value.

**What was slow:**
- Safari Responsive Design Mode has intermittent Accessibility permission failures (System Events error -1719). Self-resolves after 2-3 attempts. Root cause: `osascript` timing with System Events authorization.

**What to improve:**
- Add a retry loop for Safari RDM enable (with 1s delay between attempts).
- Chrome mobile currently falls back to window resize (CDP port 9222 not reachable from `open -a` launch). Investigate launching Chrome with `--remote-debugging-port` pre-configured.
- Interactive mode (`screencapture -i`) untested — schedule for next run.

