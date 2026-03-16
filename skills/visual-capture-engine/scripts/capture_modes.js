#!/usr/bin/env node

/**
 * Mukamal Visual Capture Engine — Extended Capture Modes
 *
 * New capture functions for: area selection, fullscreen, app window,
 * hover-state, and journey (multi-step) capture.
 *
 * All functions return a result object compatible with the main engine.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const {
    openURL,
    resizeWindow,
    getWindowId,
    closeTab,
    wait,
    appName,
} = require('./helpers/window');

// ─── Timer Countdown ────────────────────────────────────────────────────────
/**
 * Display a visible countdown in the terminal before returning.
 * @param {number} seconds - Countdown duration
 */
function timerCountdown(seconds) {
    if (!seconds || seconds <= 0) return;
    process.stdout.write(`  ⏱ Capturing in `);
    for (let i = seconds; i > 0; i--) {
        process.stdout.write(`${i}...`);
        execSync(`sleep 1`, { timeout: 5000 });
    }
    process.stdout.write(`📸\n`);
}

// ─── Wait for Keypress ──────────────────────────────────────────────────────
/**
 * Wait for the operator to press a key. Returns the key pressed.
 * @param {string} prompt - Message to display
 * @returns {Promise<string>} The key pressed
 */
function waitForKey(prompt) {
    return new Promise((resolve) => {
        process.stdout.write(prompt);
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }
        process.stdin.resume();
        process.stdin.once('data', (data) => {
            if (process.stdin.isTTY) {
                process.stdin.setRawMode(false);
            }
            rl.close();
            const key = data.toString();
            // ESC = \x1b, q = q
            if (key === '\x1b' || key === 'q' || key === 'Q') {
                resolve('escape');
            } else if (key === 'h' || key === 'H') {
                resolve('hover');
            } else if (key === 't' || key === 'T') {
                resolve('timer');
            } else {
                resolve('capture');
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
//  MODE: AREA — Crosshair region selection (works with any on-screen content)
// ═══════════════════════════════════════════════════════════════════════════
/**
 * @param {string} filepath - Output file path
 * @param {number} timer - Optional countdown seconds
 */
function captureArea(filepath, timer) {
    const result = {
        url: null,
        brand: null,
        viewport: 'area-selection',
        browser: 'none',
        strategy: 'area',
        file: null,
        status: 'SUCCESS',
        error: null,
        botDetection: 'none',
    };

    try {
        console.log('  📸 Area selection mode: draw a rectangle around the area to capture...');
        timerCountdown(timer);

        execSync(`screencapture -i -x -t png "${filepath}"`, {
            stdio: 'inherit',
            timeout: 120000,
        });

        if (fs.existsSync(filepath)) {
            result.file = filepath;
        } else {
            result.status = 'CANCELLED';
            result.error = 'Capture cancelled by operator (Escape pressed)';
        }
    } catch (err) {
        result.status = 'FAILED';
        result.error = err.message;
    }

    return result;
}

// ═══════════════════════════════════════════════════════════════════════════
//  MODE: FULLSCREEN — Capture the main display
// ═══════════════════════════════════════════════════════════════════════════
/**
 * @param {string} filepath - Output file path
 * @param {number} timer - Optional countdown seconds
 */
function captureFullscreen(filepath, timer) {
    const result = {
        url: null,
        brand: null,
        viewport: 'fullscreen',
        browser: 'none',
        strategy: 'fullscreen',
        file: null,
        status: 'SUCCESS',
        error: null,
        botDetection: 'none',
    };

    try {
        timerCountdown(timer);
        execSync(`screencapture -m -x -t png "${filepath}"`, { timeout: 10000 });

        if (fs.existsSync(filepath)) {
            result.file = filepath;
        } else {
            result.status = 'FAILED';
            result.error = 'Fullscreen capture failed — no file produced';
        }
    } catch (err) {
        result.status = 'FAILED';
        result.error = err.message;
    }

    return result;
}

// ═══════════════════════════════════════════════════════════════════════════
//  MODE: APP — Capture any macOS application window by name
// ═══════════════════════════════════════════════════════════════════════════
/**
 * @param {string} targetApp - App name (e.g., "Simulator", "Figma", "Android Emulator")
 * @param {string} filepath - Output file path
 * @param {number} timer - Optional countdown seconds
 */
function captureApp(targetApp, filepath, timer) {
    // Resolve shorthand aliases
    const APP_ALIASES = {
        simulator: 'Simulator',
        ios: 'Simulator',
        emulator: 'qemu-system-aarch64', // Android Emulator process
        android: 'qemu-system-aarch64',
        figma: 'Figma',
        sketch: 'Sketch',
        xd: 'Adobe XD',
    };

    const resolvedApp = APP_ALIASES[targetApp.toLowerCase()] || targetApp;

    const result = {
        url: null,
        brand: null,
        viewport: 'app-window',
        browser: resolvedApp,
        strategy: 'app',
        file: null,
        status: 'SUCCESS',
        error: null,
        botDetection: 'none',
    };

    try {
        // Activate the target app
        console.log(`  🔍 Targeting app: ${resolvedApp}`);
        try {
            execSync(`osascript -e 'tell application "${resolvedApp}" to activate'`, { timeout: 5000 });
        } catch (_) {
            // App might not support AppleScript 'activate' — try open -a
            try {
                execSync(`open -a "${resolvedApp}"`, { timeout: 5000 });
            } catch (__) {
                console.warn(`  ⚠ Could not activate ${resolvedApp} — it may already be in front`);
            }
        }
        wait(1);

        // Get the window ID
        const windowId = getWindowId(resolvedApp);

        timerCountdown(timer);

        if (windowId) {
            execSync(`screencapture -l${windowId} -o -x -t png "${filepath}"`, { timeout: 10000 });
        } else {
            // Fallback to interactive window selection
            console.log('  ⚠ Could not detect window ID — click on the window to capture it');
            execSync(`screencapture -W -x -t png "${filepath}"`, {
                stdio: 'inherit',
                timeout: 30000,
            });
        }

        if (fs.existsSync(filepath)) {
            result.file = filepath;
        } else {
            result.status = 'FAILED';
            result.error = `No screenshot captured for ${resolvedApp}`;
        }
    } catch (err) {
        result.status = 'FAILED';
        result.error = err.message;
    }

    return result;
}

// ═══════════════════════════════════════════════════════════════════════════
//  MODE: HOVER — Timed auto-capture (browser stays focused, no Enter needed)
// ═══════════════════════════════════════════════════════════════════════════
/**
 * Hover capture flow:
 *   1. Open URL in browser, resize to viewport
 *   2. Display instructions to the operator
 *   3. Wait for operator to confirm ready (Enter in terminal)
 *   4. Bring browser BACK to front via AppleScript
 *   5. Start countdown (default 5s) — operator hovers over target during countdown
 *   6. Capture fires via screencapture -l<wid> while browser is focused
 *
 * The key insight: the countdown runs in Node while the browser is in front,
 * so the hover state is preserved when the capture fires.
 */
async function captureHover(url, brand, viewportKey, browserName, outputBase, delay, timer, VIEWPORTS) {
    const vp = VIEWPORTS[viewportKey];
    if (!vp) throw new Error(`Unknown viewport: ${viewportKey}`);

    // Default hover timer is 5s if not specified
    const hoverDelay = timer || 5;

    const result = {
        url,
        brand,
        viewport: vp.label,
        browser: browserName,
        strategy: 'hover',
        file: null,
        status: 'SUCCESS',
        error: null,
        botDetection: 'none',
    };

    try {
        const mediaDir = path.join(outputBase, brand, 'media');
        fs.mkdirSync(mediaDir, { recursive: true });
        const slug = url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const filepath = path.join(mediaDir, `${slug}_hover_${vp.label}_${browserName}_${timestamp}.png`);

        // Step 1: Open URL and resize
        openURL(browserName, url);
        wait(2);
        resizeWindow(browserName, vp.width, vp.height, 0, 0);
        wait(delay);

        // Step 2: Instructions
        console.log(`\n  ┌─────────────────────────────────────────────────────┐`);
        console.log(`  │  🖱  HOVER CAPTURE MODE                             │`);
        console.log(`  │                                                     │`);
        console.log(`  │  1. Press ENTER here when you're ready              │`);
        console.log(`  │  2. Browser will come to front automatically        │`);
        console.log(`  │  3. You have ${hoverDelay} seconds to hover over your target  │`);
        console.log(`  │  4. Screenshot fires automatically — hover is kept  │`);
        console.log(`  │                                                     │`);
        console.log(`  │  Press ESC to cancel                                │`);
        console.log(`  └─────────────────────────────────────────────────────┘\n`);

        const key = await waitForKey('  ⏎  Press ENTER when ready (ESC to cancel): ');

        if (key === 'escape') {
            result.status = 'CANCELLED';
            result.error = 'Hover capture cancelled by operator';
            closeTab(browserName);
            return result;
        }

        // Step 3: Bring browser BACK to front so operator can hover
        const browserApp = browserName === 'chrome' ? 'Google Chrome' : 'Safari';
        try {
            execSync(`osascript -e 'tell application "${browserApp}" to activate'`, { timeout: 3000 });
        } catch (_) { }
        wait(0.5);

        // Step 4: Countdown while browser is in front — user hovers during this
        console.log(`\n  ⏱  Browser is in front — hover over your target NOW!`);
        for (let i = hoverDelay; i > 0; i--) {
            process.stdout.write(`  ${i}...`);
            execSync('sleep 1', { timeout: 5000 });
        }
        process.stdout.write(`📸 CAPTURING!\n`);

        // Step 5: Capture — browser is still focused, hover state preserved
        const windowId = getWindowId(browserName);
        if (windowId) {
            execSync(`screencapture -l${windowId} -o -x -t png "${filepath}"`, { timeout: 10000 });
        } else {
            execSync(`screencapture -m -x -t png "${filepath}"`, { timeout: 10000 });
        }

        if (fs.existsSync(filepath)) {
            result.file = filepath;
            console.log(`  ✅ Hover captured → ${path.basename(filepath)}`);
        } else {
            result.status = 'FAILED';
            result.error = 'Hover capture failed — no file produced';
        }

        closeTab(browserName);
    } catch (err) {
        result.status = 'FAILED';
        result.error = err.message;
    }

    return result;
}

// ═══════════════════════════════════════════════════════════════════════════
//  MODE: JOURNEY — Multi-step capture flow
// ═══════════════════════════════════════════════════════════════════════════
/**
 * @param {string} url - Starting URL
 * @param {string} brand - Brand slug
 * @param {string} viewportKey - Viewport key
 * @param {string} browserName - Browser name
 * @param {string} outputBase - Output base directory
 * @param {number} delay - Initial page load delay
 * @param {number} timer - Optional countdown per capture
 * @param {object} VIEWPORTS - Viewport settings
 * @returns {Promise<object[]>} Array of capture results
 */
async function captureJourney(url, brand, viewportKey, browserName, outputBase, delay, timer, VIEWPORTS) {
    const vp = VIEWPORTS[viewportKey];
    if (!vp) throw new Error(`Unknown viewport: ${viewportKey}`);

    const results = [];
    let step = 1;

    // Open URL and resize
    openURL(browserName, url);
    wait(2);
    resizeWindow(browserName, vp.width, vp.height, 0, 0);
    wait(delay);

    console.log('  🚶 Journey mode — press ENTER after each step to capture, ESC/q to finish\n');

    while (true) {
        const key = await waitForKey(`  Step ${step}: Press ENTER to capture (H=hover snap, T=timer, ESC=done): `);

        if (key === 'escape') {
            console.log(`\n  🏁 Journey complete — ${step - 1} steps captured`);
            break;
        }

        if (key === 'timer') {
            timerCountdown(5);
        } else {
            timerCountdown(timer);
        }

        const mediaDir = path.join(outputBase, brand, 'media');
        fs.mkdirSync(mediaDir, { recursive: true });
        const slug = url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const stepStr = String(step).padStart(2, '0');
        const filepath = path.join(mediaDir, `${slug}_journey-${stepStr}_${vp.label}_${browserName}_${timestamp}.png`);

        const result = {
            url,
            brand,
            viewport: vp.label,
            browser: browserName,
            strategy: 'journey',
            file: null,
            status: 'SUCCESS',
            error: null,
            botDetection: 'none',
            step,
        };

        try {
            const windowId = getWindowId(browserName);
            if (windowId) {
                execSync(`screencapture -l${windowId} -o -x -t png "${filepath}"`, { timeout: 10000 });
            } else {
                execSync(`screencapture -m -x -t png "${filepath}"`, { timeout: 10000 });
            }

            if (fs.existsSync(filepath)) {
                result.file = filepath;
                console.log(`  ✅ Step ${step} captured → ${path.basename(filepath)}`);
            } else {
                result.status = 'FAILED';
                result.error = 'No file produced';
                console.log(`  ❌ Step ${step} failed`);
            }
        } catch (err) {
            result.status = 'FAILED';
            result.error = err.message;
            console.log(`  ❌ Step ${step} error: ${err.message}`);
        }

        results.push(result);
        step++;
    }

    return results;
}

// ─── Exports ────────────────────────────────────────────────────────────────
module.exports = {
    captureArea,
    captureFullscreen,
    captureApp,
    captureHover,
    captureJourney,
    timerCountdown,
    waitForKey,
};
