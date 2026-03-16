#!/usr/bin/env node

/**
 * Mukamal Visual Capture Engine — Window Helpers
 *
 * AppleScript-driven browser window management for native macOS capture.
 * Controls window geometry, device simulation modes, and tab lifecycle.
 */

const { execSync } = require('child_process');

// ─── AppleScript Executor ───────────────────────────────────────────────────
function runAppleScript(script) {
    return execSync(`osascript -e '${script.replace(/'/g, "'\\''")}'`, {
        encoding: 'utf-8',
        timeout: 15000,
    }).trim();
}

function runAppleScriptMultiLine(lines) {
    const escaped = lines.map(l => `-e '${l.replace(/'/g, "'\\''")}' `).join('');
    return execSync(`osascript ${escaped}`, {
        encoding: 'utf-8',
        timeout: 15000,
    }).trim();
}

// ─── Browser App Names ─────────────────────────────────────────────────────
const BROWSER_APPS = {
    chrome: 'Google Chrome',
    safari: 'Safari',
};

function appName(browser) {
    const name = BROWSER_APPS[browser];
    if (!name) throw new Error(`Unsupported browser: ${browser}. Use "chrome" or "safari".`);
    return name;
}

// ─── Open URL ───────────────────────────────────────────────────────────────
/**
 * Open a URL in the specified browser.
 * @param {string} browser - "chrome" or "safari"
 * @param {string} url - The URL to open
 */
function openURL(browser, url) {
    const app = appName(browser);
    execSync(`open -a "${app}" "${url}"`, { timeout: 10000 });
}

// ─── Resize & Position Window ───────────────────────────────────────────────
/**
 * Set exact window geometry (position + size) for the frontmost browser window.
 * @param {string} browser - "chrome" or "safari"
 * @param {number} width
 * @param {number} height
 * @param {number} [x=0] - x position
 * @param {number} [y=0] - y position
 */
function resizeWindow(browser, width, height, x = 0, y = 0) {
    const app = appName(browser);

    if (browser === 'chrome') {
        runAppleScriptMultiLine([
            `tell application "${app}"`,
            `  activate`,
            `  set bounds of front window to {${x}, ${y}, ${x + width}, ${y + height}}`,
            `end tell`,
        ]);
    } else if (browser === 'safari') {
        runAppleScriptMultiLine([
            `tell application "${app}"`,
            `  activate`,
            `  set bounds of front window to {${x}, ${y}, ${x + width}, ${y + height}}`,
            `end tell`,
        ]);
    }
}

// ─── Get Window ID ──────────────────────────────────────────────────────────
/**
 * Get the macOS window ID for the frontmost browser window.
 * Used by `screencapture -l<windowid>`.
 * @param {string} browser - "chrome" or "safari"
 * @returns {string} Window ID
 */
function getWindowId(appOrBrowser) {
    // Accept either a browser key ("chrome", "safari") or a direct app name ("Simulator", "Figma")
    const BROWSER_APPS = { chrome: 'Google Chrome', safari: 'Safari' };
    const app = BROWSER_APPS[appOrBrowser] || appName(appOrBrowser) || appOrBrowser;

    // Use osascript JXA (JavaScript for Automation) with CoreGraphics ObjC bridge
    const jxaScript = `
ObjC.import("CoreGraphics");
var options = $.kCGWindowListOptionOnScreenOnly | $.kCGWindowListExcludeDesktopElements;
var windowList = $.CGWindowListCopyWindowInfo(options, $.kCGNullWindowID);
var count = ObjC.castRefToObject(windowList).count;
for (var i = 0; i < count; i++) {
  var w = ObjC.castRefToObject(windowList).objectAtIndex(i);
  var owner = ObjC.unwrap(w.objectForKey("kCGWindowOwnerName"));
  var layer = ObjC.unwrap(w.objectForKey("kCGWindowLayer"));
  var wid = ObjC.unwrap(w.objectForKey("kCGWindowNumber"));
  if (owner === "${app}" && layer === 0) {
    wid;
    break;
  }
}
`.trim();

    try {
        const windowId = execSync(`osascript -l JavaScript -e '${jxaScript.replace(/'/g, "'\\''")}'`, {
            encoding: 'utf-8',
            timeout: 5000,
        }).trim();
        if (windowId && !isNaN(windowId)) return windowId;
        console.warn('⚠ Could not get window ID via JXA. Falling back to window capture mode.');
        return null;
    } catch (_) {
        console.warn('⚠ Could not get window ID. Falling back to window capture mode.');
        return null;
    }
}

// ─── Chrome Device Mode (CDP) ───────────────────────────────────────────────
/**
 * Launch Chrome with remote debugging and enable device emulation via CDP.
 * @param {string} url - URL to navigate to
 * @param {number} width - Viewport width
 * @param {number} height - Viewport height
 * @param {number} dpr - Device pixel ratio
 * @returns {number} Chrome debugging port
 */
function launchChromeWithDeviceMode(url, width, height, dpr) {
    const port = 9222;

    // Launch Chrome with remote debugging enabled
    execSync(
        `open -a "Google Chrome" --args ` +
        `--remote-debugging-port=${port} ` +
        `--window-size=${width},${height} ` +
        `"${url}"`,
        { timeout: 10000 }
    );

    return port;
}

/**
 * Enable device emulation on a Chrome instance via CDP.
 * @param {number} port - Chrome DevTools remote debugging port
 * @param {number} width - Viewport width
 * @param {number} height - Viewport height
 * @param {number} dpr - Device pixel ratio
 * @param {string} userAgent - Mobile user agent string
 */
async function enableChromeEmulation(port, width, height, dpr, userAgent) {
    const http = require('http');

    // Get the list of debuggable pages
    const pages = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${port}/json`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });

    if (!pages.length) throw new Error('No debuggable Chrome pages found');

    const wsUrl = pages[0].webSocketDebuggerUrl;
    const WebSocket = require('ws');

    return new Promise((resolve, reject) => {
        const ws = new WebSocket(wsUrl);
        let msgId = 1;

        ws.on('open', () => {
            // Enable device metrics override
            ws.send(JSON.stringify({
                id: msgId++,
                method: 'Emulation.setDeviceMetricsOverride',
                params: {
                    width,
                    height,
                    deviceScaleFactor: dpr,
                    mobile: true,
                },
            }));

            // Set mobile user agent
            ws.send(JSON.stringify({
                id: msgId++,
                method: 'Emulation.setUserAgentOverride',
                params: {
                    userAgent: userAgent || `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1`,
                },
            }));

            // Set touch emulation
            ws.send(JSON.stringify({
                id: msgId++,
                method: 'Emulation.setTouchEmulationEnabled',
                params: { enabled: true, maxTouchPoints: 5 },
            }));

            // Reload the page to apply emulation
            ws.send(JSON.stringify({
                id: msgId++,
                method: 'Page.reload',
                params: {},
            }));

            setTimeout(() => {
                ws.close();
                resolve();
            }, 2000);
        });

        ws.on('error', reject);
    });
}

// ─── Safari Responsive Design Mode ─────────────────────────────────────────
/**
 * Enable Safari's Responsive Design Mode and set custom viewport dimensions.
 * Uses Safari's AppleScript `do JavaScript` to resize the viewport within RDM,
 * bypassing the inaccessible RDM toolbar UI elements.
 * @param {number} width - Viewport width (e.g., 375)
 * @param {number} height - Viewport height (e.g., 812)
 */
function enableSafariResponsiveMode(width, height) {
    // Step 1: Enter Responsive Design Mode via Develop menu
    try {
        runAppleScriptMultiLine([
            `tell application "Safari" to activate`,
            `delay 0.5`,
            `tell application "System Events"`,
            `  tell process "Safari"`,
            `    click menu item "Enter Responsive Design Mode" of menu "Develop" of menu bar 1`,
            `  end tell`,
            `end tell`,
            `delay 1.5`,
        ]);
    } catch (e) {
        // May already be in RDM — continue
        console.warn('  ⚠ RDM toggle warning:', e.message);
    }

    // Step 2: Resize the Safari window to the target mobile dimensions
    // In RDM, the window bounds control the viewport size shown in the responsive preview.
    // We set the window to the mobile width + toolbar chrome, so the rendered viewport matches.
    try {
        // Resize the Safari window — the RDM viewport will adapt to the window width
        // Add padding for Safari's chrome (toolbar ~90px, RDM bar ~40px)
        const chromeHeight = 130;
        runAppleScriptMultiLine([
            `tell application "Safari"`,
            `  activate`,
            `  set bounds of front window to {0, 0, ${width}, ${height + chromeHeight}}`,
            `end tell`,
            `delay 0.5`,
        ]);
    } catch (e) {
        console.warn('  ⚠ Could not resize Safari window:', e.message);
    }

    // Step 3: Use JavaScript to confirm/force the viewport size
    try {
        runAppleScriptMultiLine([
            `tell application "Safari"`,
            `  do JavaScript "window.resizeTo(${width}, ${height})" in front document`,
            `end tell`,
            `delay 0.3`,
        ]);
    } catch (_) {
        // JavaScript resize may fail in RDM — the window bounds approach works as primary
    }
}

/**
 * Exit Safari's Responsive Design Mode.
 */
function exitSafariResponsiveMode() {
    try {
        runAppleScriptMultiLine([
            `tell application "Safari" to activate`,
            `delay 0.3`,
            `tell application "System Events"`,
            `  tell process "Safari"`,
            `    click menu item "Exit Responsive Design Mode" of menu "Develop" of menu bar 1`,
            `  end tell`,
            `end tell`,
        ]);
    } catch (_) {
        // May not be in responsive mode — ignore
    }
}

// ─── Close Tab ──────────────────────────────────────────────────────────────
/**
 * Close the active tab in the specified browser.
 * @param {string} browser - "chrome" or "safari"
 */
function closeTab(browser) {
    const app = appName(browser);
    try {
        if (browser === 'safari') {
            runAppleScriptMultiLine([
                `tell application "${app}"`,
                `  close current tab of front window`,
                `end tell`,
            ]);
        } else {
            runAppleScriptMultiLine([
                `tell application "${app}"`,
                `  close active tab of front window`,
                `end tell`,
            ]);
        }
    } catch (_) {
        // Tab may already be closed
    }
}

// ─── Wait for Page Load ────────────────────────────────────────────────────
/**
 * Wait for a specified number of seconds.
 * @param {number} seconds
 */
function wait(seconds) {
    execSync(`sleep ${seconds}`, { timeout: (seconds + 5) * 1000 });
}

// ─── Exports ────────────────────────────────────────────────────────────────
module.exports = {
    openURL,
    resizeWindow,
    getWindowId,
    launchChromeWithDeviceMode,
    enableChromeEmulation,
    enableSafariResponsiveMode,
    exitSafariResponsiveMode,
    closeTab,
    wait,
    appName,
    BROWSER_APPS,
};
