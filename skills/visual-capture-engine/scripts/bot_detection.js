#!/usr/bin/env node

/**
 * Mukamal Visual Capture Engine — Bot Detection & Bypass Utilities
 *
 * Provides:
 *   - detectBotProtection(browserName)  → checks page title for known bot walls
 *   - warmUpPage(browserName, url, warmupSeconds) → pre-loads page and waits for challenges to auto-resolve
 *   - saveCookies(browserName, brand, outputBase) → exports browser cookies for brand session
 *   - loadCookies(browserName, brand, outputBase) → loads saved cookies before capture
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ─── Known Bot Protection Signatures ────────────────────────────────────────
// Page titles and body text that indicate a bot challenge page
const BOT_SIGNATURES = {
    titles: [
        'Just a moment',
        'Attention Required',
        'Please Wait',
        'Access denied',
        'Checking your browser',
        'Verify you are human',
        'Security Check',
        'One more step',
        'Please verify you are a human',
        'DDoS protection by',
    ],
    // Body text patterns (checked via accessibility inspection)
    bodyPatterns: [
        'Verify you are human',
        'Checking if the site connection is secure',
        'Performing security verification',
        'Please stand by, while we are checking your browser',
        'Enable JavaScript and cookies to continue',
    ],
};

/**
 * Get the current page title from the browser via AppleScript.
 * @param {string} browserName - 'chrome' or 'safari'
 * @returns {string} The page title, or empty string on failure
 */
function getPageTitle(browserName) {
    try {
        const app = browserName === 'chrome' ? 'Google Chrome' : 'Safari';

        let script;
        if (browserName === 'chrome') {
            script = `tell application "${app}" to get title of active tab of front window`;
        } else {
            script = `tell application "${app}" to get name of front document`;
        }

        const title = execSync(`osascript -e '${script}'`, {
            encoding: 'utf-8',
            timeout: 5000,
        }).trim();

        return title;
    } catch {
        return '';
    }
}

/**
 * Get the current page URL from the browser via AppleScript.
 * @param {string} browserName - 'chrome' or 'safari'
 * @returns {string} The current URL
 */
function getPageURL(browserName) {
    try {
        const app = browserName === 'chrome' ? 'Google Chrome' : 'Safari';

        let script;
        if (browserName === 'chrome') {
            script = `tell application "${app}" to get URL of active tab of front window`;
        } else {
            script = `tell application "${app}" to get URL of front document`;
        }

        return execSync(`osascript -e '${script}'`, {
            encoding: 'utf-8',
            timeout: 5000,
        }).trim();
    } catch {
        return '';
    }
}

/**
 * Detect if the current browser page is showing a bot protection challenge.
 * Checks page title against known signatures.
 *
 * @param {string} browserName - 'chrome' or 'safari'
 * @returns {{ detected: boolean, provider: string, title: string }}
 */
function detectBotProtection(browserName) {
    const title = getPageTitle(browserName);

    for (const sig of BOT_SIGNATURES.titles) {
        if (title.toLowerCase().includes(sig.toLowerCase())) {
            // Determine provider
            let provider = 'unknown';
            if (title.toLowerCase().includes('moment') || title.toLowerCase().includes('cloudflare')) {
                provider = 'cloudflare';
            } else if (title.toLowerCase().includes('ddos')) {
                provider = 'ddos-guard';
            } else if (title.toLowerCase().includes('attention')) {
                provider = 'akamai';
            }

            return {
                detected: true,
                provider,
                title,
            };
        }
    }

    return { detected: false, provider: 'none', title };
}

/**
 * Pre-load a page and wait for auto-resolving bot challenges.
 * Many Cloudflare challenges auto-resolve in 5-15 seconds if the browser
 * has JavaScript enabled and passes fingerprint checks.
 *
 * @param {string} browserName - 'chrome' or 'safari'
 * @param {string} url - URL to warm up
 * @param {number} warmupSeconds - How long to wait (default: 15)
 * @returns {{ resolved: boolean, attempts: number, finalTitle: string }}
 */
function warmUpPage(browserName, url, warmupSeconds = 15) {
    console.log(`  🔥 Warming up: waiting ${warmupSeconds}s for challenges to auto-resolve...`);

    // Check every 3 seconds if the challenge has resolved
    const checkInterval = 3;
    const maxChecks = Math.ceil(warmupSeconds / checkInterval);
    let attempts = 0;

    for (let i = 0; i < maxChecks; i++) {
        attempts++;

        // Wait between checks
        execSync(`sleep ${checkInterval}`);

        const detection = detectBotProtection(browserName);

        if (!detection.detected) {
            console.log(`  ✅ Challenge auto-resolved after ~${attempts * checkInterval}s`);
            return { resolved: true, attempts, finalTitle: detection.title };
        }

        const remaining = warmupSeconds - (attempts * checkInterval);
        if (remaining > 0) {
            console.log(`  ⏳ Still blocked (${detection.provider}) — ${remaining}s remaining...`);
        }
    }

    // Final check
    const finalCheck = detectBotProtection(browserName);
    if (!finalCheck.detected) {
        console.log(`  ✅ Challenge resolved at final check`);
        return { resolved: true, attempts, finalTitle: finalCheck.title };
    }

    console.log(`  ⚠️  Warm-up failed — ${finalCheck.provider} challenge still active`);
    return { resolved: false, attempts, finalTitle: finalCheck.title };
}

/**
 * Get the cookie directory path for a brand.
 * @param {string} brand - Brand slug
 * @param {string} outputBase - Base output directory
 * @returns {string} Path to cookies directory
 */
function getCookiePath(brand, outputBase) {
    return path.join(outputBase, brand, '.cookies');
}

/**
 * Save browser cookies for a brand after successful page load.
 * Uses AppleScript to export cookies from Safari.
 * For Chrome, uses the SQLite cookie database.
 *
 * @param {string} browserName - 'chrome' or 'safari'
 * @param {string} brand - Brand slug
 * @param {string} outputBase - Base output directory
 * @param {string} url - The URL whose domain cookies to save
 * @returns {boolean} Whether cookies were saved successfully
 */
function saveCookies(browserName, brand, outputBase, url) {
    try {
        const cookieDir = getCookiePath(brand, outputBase);
        fs.mkdirSync(cookieDir, { recursive: true });

        const domain = new URL(url).hostname;
        const cookieFile = path.join(cookieDir, `${browserName}_${domain}.json`);

        if (browserName === 'safari') {
            // Safari doesn't easily expose cookies via AppleScript,
            // but we can run JS in the page to extract document.cookie
            const script = `tell application "Safari" to do JavaScript "document.cookie" in front document`;
            const cookies = execSync(`osascript -e '${script}'`, {
                encoding: 'utf-8',
                timeout: 5000,
            }).trim();

            const cookieData = {
                domain,
                browser: browserName,
                savedAt: new Date().toISOString(),
                cookies: cookies,
            };

            fs.writeFileSync(cookieFile, JSON.stringify(cookieData, null, 2));
            console.log(`  🍪 Cookies saved → ${path.relative(outputBase, cookieFile)}`);
            return true;
        } else if (browserName === 'chrome') {
            // Chrome: execute JS to get cookies
            const script = `tell application "Google Chrome" to execute active tab of front window javascript "document.cookie"`;
            const cookies = execSync(`osascript -e '${script}'`, {
                encoding: 'utf-8',
                timeout: 5000,
            }).trim();

            const cookieData = {
                domain,
                browser: browserName,
                savedAt: new Date().toISOString(),
                cookies: cookies,
            };

            fs.writeFileSync(cookieFile, JSON.stringify(cookieData, null, 2));
            console.log(`  🍪 Cookies saved → ${path.relative(outputBase, cookieFile)}`);
            return true;
        }
    } catch (err) {
        console.log(`  ⚠️  Cookie save failed: ${err.message}`);
    }

    return false;
}

/**
 * Load previously saved cookies for a brand before capture.
 * Injects cookies into the current page via JavaScript.
 *
 * @param {string} browserName - 'chrome' or 'safari'
 * @param {string} brand - Brand slug
 * @param {string} outputBase - Base output directory
 * @param {string} url - The URL whose domain cookies to load
 * @returns {boolean} Whether cookies were loaded successfully
 */
function loadCookies(browserName, brand, outputBase, url) {
    try {
        const cookieDir = getCookiePath(brand, outputBase);
        const domain = new URL(url).hostname;
        const cookieFile = path.join(cookieDir, `${browserName}_${domain}.json`);

        if (!fs.existsSync(cookieFile)) {
            return false;
        }

        const cookieData = JSON.parse(fs.readFileSync(cookieFile, 'utf-8'));

        // Check if cookies are less than 24 hours old
        const savedAt = new Date(cookieData.savedAt);
        const hoursSince = (Date.now() - savedAt.getTime()) / (1000 * 60 * 60);
        if (hoursSince > 24) {
            console.log(`  🍪 Saved cookies expired (${Math.round(hoursSince)}hrs old) — skipping`);
            fs.unlinkSync(cookieFile);
            return false;
        }

        // Inject cookies via JavaScript
        const app = browserName === 'chrome' ? 'Google Chrome' : 'Safari';
        const cookies = cookieData.cookies.replace(/'/g, "\\'");

        let script;
        if (browserName === 'safari') {
            script = `tell application "${app}" to do JavaScript "document.cookie = '${cookies}'" in front document`;
        } else {
            script = `tell application "${app}" to execute active tab of front window javascript "document.cookie = '${cookies}'"`;
        }

        execSync(`osascript -e '${script}'`, { timeout: 5000 });
        console.log(`  🍪 Cookies loaded from previous session (${Math.round(hoursSince)}hrs old)`);
        return true;
    } catch (err) {
        console.log(`  ⚠️  Cookie load failed: ${err.message}`);
    }

    return false;
}

/**
 * Check if cookies exist for a brand/domain combination.
 * @param {string} browserName
 * @param {string} brand
 * @param {string} outputBase
 * @param {string} url
 * @returns {boolean}
 */
function hasCookies(browserName, brand, outputBase, url) {
    try {
        const domain = new URL(url).hostname;
        const cookieFile = path.join(getCookiePath(brand, outputBase), `${browserName}_${domain}.json`);
        if (!fs.existsSync(cookieFile)) return false;

        const data = JSON.parse(fs.readFileSync(cookieFile, 'utf-8'));
        const hoursSince = (Date.now() - new Date(data.savedAt).getTime()) / (1000 * 60 * 60);
        return hoursSince <= 24;
    } catch {
        return false;
    }
}

// ─── Exports ────────────────────────────────────────────────────────────────
module.exports = {
    BOT_SIGNATURES,
    getPageTitle,
    getPageURL,
    detectBotProtection,
    warmUpPage,
    saveCookies,
    loadCookies,
    hasCookies,
    getCookiePath,
};
