#!/usr/bin/env node

/**
 * Mukamal Visual Capture Engine v2.0
 *
 * Native macOS screenshot-based capture engine.
 * Uses real browsers + macOS `screencapture` CLI for zero-failure captures.
 *
 * Usage:
 *   node capture.js --url <url> --brand <name> [options]
 *   node capture.js --config <config.json>
 *
 * Options:
 *   --url        Target URL to capture
 *   --brand      Brand name (determines output directory)
 *   --viewport   "desktop" | "mobile" | "both" (default: "both")
 *   --browser    "chrome" | "safari" | "both" (default: "chrome")
 *   --strategy   "native" | "interactive" | "headless" (default: "native")
 *   --delay      Seconds to wait for page load (default: 5)
 *   --output     Output base directory (default: ../../01_Audit_Engine)
 *   --timeout    Page load timeout in ms for headless mode (default: 30000)
 *   --config     Path to JSON config file with multiple targets
 *   --no-sanitize  Skip cookie/overlay removal (headless only)
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ─── Load Viewport Settings ────────────────────────────────────────────────
const VIEWPORT_SETTINGS_PATH = path.resolve(__dirname, '../viewport_settings.json');
const VIEWPORTS = JSON.parse(fs.readFileSync(VIEWPORT_SETTINGS_PATH, 'utf-8'));

// ─── Window Helpers ─────────────────────────────────────────────────────────
const {
  openURL,
  resizeWindow,
  getWindowId,
  launchChromeWithDeviceMode,
  enableChromeEmulation,
  enableSafariResponsiveMode,
  exitSafariResponsiveMode,
  closeTab,
  wait,
  appName, // Added appName
} = require('./helpers/window');

// ─── Extended Capture Modes ─────────────────────────────────────────────────
const {
  captureArea,
  captureFullscreen,
  captureApp,
  captureHover,
  captureJourney,
  timerCountdown,
} = require('./capture_modes');

const {
  detectBotProtection,
  warmUpPage,
  saveCookies,
  loadCookies,
  hasCookies,
} = require('./bot_detection');

// ─── Cookie/Overlay Sanitization (headless only) ────────────────────────────
const SANITIZE_SELECTORS = [
  '[class*="cookie"]', '[id*="cookie"]', '[class*="consent"]', '[id*="consent"]',
  '[class*="gdpr"]', '[id*="gdpr"]', '[class*="CookieBanner"]',
  '[aria-label*="cookie"]', '[aria-label*="consent"]',
  '[class*="intercom"]', '[id*="intercom"]', '#hubspot-messages-iframe-container',
  '[class*="drift"]', '[class*="crisp"]', '[class*="zendesk"]', '[class*="tawk"]',
  'iframe[src*="intercom"]', 'iframe[src*="drift"]',
  '[class*="overlay"]', '[class*="modal"]', '[class*="popup"]',
  '[class*="notification-bar"]', '[class*="announcement"]',
  '[class*="banner"][role="alert"]',
  '[class*="newsletter"]', '[class*="subscribe-modal"]',
];

// ─── CLI Argument Parsing ───────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const explicit = new Set();
  const config = {
    url: null,
    brand: null,
    viewport: 'both',
    browser: 'chrome',
    strategy: 'native',
    delay: 5,
    output: path.resolve(__dirname, '../../../01_Audit_Engine'),
    timeout: 30000,
    configFile: null,
    sanitize: true,
    mode: 'window',      // window | fullscreen | area | hover | journey
    timer: 0,            // countdown seconds before capture
    app: null,           // target app name (e.g., "Simulator", "Figma")
    warmup: 0,           // pre-capture warm-up seconds (for bot challenge auto-resolve)
    autoRetry: true,     // auto-retry with interactive if bot detected
    cookies: true,       // save/load cookies per brand
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--url': config.url = args[++i]; explicit.add('url'); break;
      case '--brand': config.brand = args[++i]; explicit.add('brand'); break;
      case '--viewport': config.viewport = args[++i]; explicit.add('viewport'); break;
      case '--browser': config.browser = args[++i]; explicit.add('browser'); break;
      case '--strategy': config.strategy = args[++i]; explicit.add('strategy'); break;
      case '--delay': config.delay = parseInt(args[++i], 10); explicit.add('delay'); break;
      case '--output': config.output = path.resolve(args[++i]); explicit.add('output'); break;
      case '--timeout': config.timeout = parseInt(args[++i], 10); explicit.add('timeout'); break;
      case '--config': config.configFile = path.resolve(args[++i]); break;
      case '--no-sanitize': config.sanitize = false; break;
      case '--mode': config.mode = args[++i]; explicit.add('mode'); break;
      case '--timer': config.timer = parseInt(args[++i], 10); explicit.add('timer'); break;
      case '--app': config.app = args[++i]; explicit.add('app'); break;
      case '--warmup': config.warmup = parseInt(args[++i], 10); explicit.add('warmup'); break;
      case '--no-auto-retry': config.autoRetry = false; break;
      case '--no-cookies': config.cookies = false; break;
    }
  }

  config._explicit = explicit;
  return config;
}

// ─── Output Path Builder ────────────────────────────────────────────────────
function buildOutputPath(outputBase, brand, url, viewportKey, browserName) {
  const mediaDir = path.join(outputBase, brand, 'media');
  fs.mkdirSync(mediaDir, { recursive: true });

  const urlSlug = new URL(url).hostname.replace(/[^a-zA-Z0-9]/g, '-');
  const vpLabel = VIEWPORTS[viewportKey]?.label || viewportKey;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `${urlSlug}_${vpLabel}_${browserName}_${timestamp}.png`;
  return path.join(mediaDir, filename);
}

// ═══════════════════════════════════════════════════════════════════════════
//  STRATEGY: NATIVE — Real browser + macOS screencapture
// ═══════════════════════════════════════════════════════════════════════════
async function captureNative(url, brand, viewportKey, browserName, outputBase, delay) {
  const vp = VIEWPORTS[viewportKey];
  if (!vp) throw new Error(`Unknown viewport: ${viewportKey}`);

  const result = {
    url,
    brand,
    viewport: vp.label,
    browser: browserName,
    strategy: 'native',
    file: null,
    status: 'SUCCESS',
    error: null,
    botDetection: 'none',
  };

  try {
    const filepath = buildOutputPath(outputBase, brand, url, viewportKey, browserName);

    // ─── Load saved cookies if available ─────────────────────────────
    const useCookies = arguments.length > 6 ? arguments[6] : true;
    if (useCookies) {
      const hasSaved = hasCookies(browserName, brand, outputBase, url);
      if (hasSaved) {
        console.log(`  🍪 Found saved cookies for ${brand} — will inject after load`);
      }
    }

    if (viewportKey === 'mobile') {
      // ─── Mobile Capture ─────────────────────────────────────────────
      if (browserName === 'chrome') {
        // Chrome: use CDP device emulation
        const port = launchChromeWithDeviceMode(url, vp.width, vp.height, vp.dpr);
        wait(3); // Wait for Chrome to start
        try {
          await enableChromeEmulation(port, vp.width, vp.height, vp.dpr);
        } catch (cdpErr) {
          console.warn(`  ⚠ CDP emulation failed (${cdpErr.message}), using window resize fallback`);
          resizeWindow('chrome', vp.width, vp.height + 80, 0, 0); // +80 for chrome toolbar
        }
      } else if (browserName === 'safari') {
        // Safari: use Responsive Design Mode
        openURL('safari', url);
        wait(2);
        enableSafariResponsiveMode(vp.width, vp.height);
      }
    } else {
      // ─── Desktop Capture ────────────────────────────────────────────
      openURL(browserName, url);
      wait(2);
      resizeWindow(browserName, vp.width, vp.height, 0, 0);
    }

    // ─── Load cookies into the page (if saved) ──────────────────────
    if (useCookies) {
      loadCookies(browserName, brand, outputBase, url);
    }

    // Wait for page to fully load
    wait(delay);

    // ─── Pre-capture warm-up (for bot challenge auto-resolve) ───────
    const warmupSeconds = arguments.length > 7 ? arguments[7] : 0;
    if (warmupSeconds > 0) {
      const warmResult = warmUpPage(browserName, url, warmupSeconds);
      if (!warmResult.resolved) {
        result.status = 'BLOCKED';
        result.botDetection = 'cloudflare';
        result.error = `Bot challenge did not auto-resolve after ${warmupSeconds}s warm-up`;
        closeTab(browserName);
        return result;
      }
    }

    // ─── Bot detection check ────────────────────────────────────────
    const botCheck = detectBotProtection(browserName);
    if (botCheck.detected) {
      console.log(`  🛡️  Bot protection detected: ${botCheck.provider} ("${botCheck.title}")`);
      result.status = 'BLOCKED';
      result.botDetection = botCheck.provider;
      result.error = `Page blocked by ${botCheck.provider}: "${botCheck.title}"`;
      closeTab(browserName);
      return result;
    }

    // Capture via screencapture
    const windowId = getWindowId(browserName);
    if (windowId) {
      // Window-specific capture: no shadow, silent, PNG
      execSync(`screencapture -l${windowId} -o -x -t png "${filepath}"`, { timeout: 10000 });
    } else {
      // Fallback: capture the full screen (main display only)
      execSync(`screencapture -m -x -t png "${filepath}"`, { timeout: 10000 });
    }

    // Verify the file was created
    if (fs.existsSync(filepath)) {
      result.file = filepath;

      // Save cookies on successful capture
      if (useCookies) {
        saveCookies(browserName, brand, outputBase, url);
      }
    } else {
      result.status = 'FAILED';
      result.error = 'Screenshot file was not created';
    }

    // Cleanup
    if (viewportKey === 'mobile' && browserName === 'safari') {
      exitSafariResponsiveMode();
    }
    closeTab(browserName);

  } catch (err) {
    result.status = 'FAILED';
    result.error = err.message;
  }

  return result;
}

// ═══════════════════════════════════════════════════════════════════════════
//  STRATEGY: INTERACTIVE — Real browser + operator-guided selection
// ═══════════════════════════════════════════════════════════════════════════
async function captureInteractive(url, brand, viewportKey, browserName, outputBase, delay) {
  const vp = VIEWPORTS[viewportKey];
  if (!vp) throw new Error(`Unknown viewport: ${viewportKey}`);

  const result = {
    url,
    brand,
    viewport: vp.label,
    browser: browserName,
    strategy: 'interactive',
    file: null,
    status: 'SUCCESS',
    error: null,
    botDetection: 'none',
  };

  try {
    const filepath = buildOutputPath(outputBase, brand, url, viewportKey, browserName);

    // Open URL in real browser
    openURL(browserName, url);
    wait(2);
    resizeWindow(browserName, vp.width, vp.height, 0, 0);
    wait(delay);

    console.log('  📸 Interactive mode: select the area to capture...');

    // Launch interactive screencapture (crosshair selection)
    execSync(`screencapture -i -x -t png "${filepath}"`, {
      stdio: 'inherit',
      timeout: 120000, // 2 min timeout for user interaction
    });

    if (fs.existsSync(filepath)) {
      result.file = filepath;
    } else {
      result.status = 'CANCELLED';
      result.error = 'Capture cancelled by operator (Escape pressed)';
    }

    closeTab(browserName);

  } catch (err) {
    result.status = 'FAILED';
    result.error = err.message;
  }

  return result;
}

// ═══════════════════════════════════════════════════════════════════════════
//  STRATEGY: HEADLESS — Playwright (legacy fallback)
// ═══════════════════════════════════════════════════════════════════════════
async function captureHeadless(url, brand, viewportKey, browserName, outputBase, timeout, sanitize) {
  const vp = VIEWPORTS[viewportKey];
  if (!vp) throw new Error(`Unknown viewport: ${viewportKey}`);

  const { chromium } = require('playwright');

  const contextOptions = {
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dpr,
  };

  if (viewportKey === 'mobile') {
    contextOptions.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
    contextOptions.isMobile = true;
    contextOptions.hasTouch = true;
  }

  const result = {
    url,
    brand,
    viewport: vp.label,
    browser: 'chromium-headless',
    strategy: 'headless',
    sanitization: [],
    file: null,
    status: 'SUCCESS',
    error: null,
    botDetection: 'none',
  };

  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();

    const response = await page.goto(url, { waitUntil: 'networkidle', timeout });

    // Bot detection check
    const title = await page.title();
    const content = await page.content();
    if (
      title.includes('Just a moment') ||
      title.includes('Attention Required') ||
      content.includes('cf-browser-verification') ||
      content.includes('challenge-platform')
    ) {
      result.status = 'BLOCKED';
      result.botDetection = 'cloudflare — requires manual bypass';
      result.error = 'Bot detection encountered. Use --strategy native or --strategy interactive.';
      await context.close();
      await browser.close();
      return result;
    }

    await page.waitForTimeout(2000);

    // Sanitize
    if (sanitize) {
      for (const selector of SANITIZE_SELECTORS) {
        try {
          const count = await page.evaluate((sel) => {
            const els = document.querySelectorAll(sel);
            els.forEach(el => el.remove());
            return els.length;
          }, selector);
          if (count > 0) result.sanitization.push({ selector, count });
        } catch (_) { }
      }
      await page.waitForTimeout(500);
    }

    const filepath = buildOutputPath(outputBase, brand, url, viewportKey, 'headless');
    await page.screenshot({ path: filepath, fullPage: false });
    result.file = filepath;

    await context.close();
  } catch (err) {
    result.status = 'FAILED';
    result.error = err.message;
  }

  await browser.close();
  return result;
}

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════════════════
async function main() {
  const config = parseArgs();

  // Build target list
  let targets = [];
  if (config.configFile) {
    const configData = JSON.parse(fs.readFileSync(config.configFile, 'utf-8'));
    targets = configData.targets || [];
    // Config file values as defaults — CLI args take precedence
    if (configData.browser && !config._explicit.has('browser')) config.browser = configData.browser;
    if (configData.strategy && !config._explicit.has('strategy')) config.strategy = configData.strategy;
    if (configData.delay && !config._explicit.has('delay')) config.delay = configData.delay;
    if (configData.viewports && !config._explicit.has('viewport')) {
      config.viewport = configData.viewports.length > 1 ? 'both' : configData.viewports[0];
    }
  } else if (config.app && config.brand) {
    // App capture mode — no URL needed
    targets = [{ url: config.url || 'app://' + config.app, brand: config.brand }];
  } else if (config.mode === 'area' && config.brand) {
    // Area selection — no URL needed
    targets = [{ url: 'screen://area-selection', brand: config.brand }];
  } else if (config.mode === 'fullscreen' && config.brand) {
    // Fullscreen — no URL needed
    targets = [{ url: 'screen://fullscreen', brand: config.brand }];
  } else if (config.url && config.brand) {
    targets = [{ url: config.url, brand: config.brand }];
  } else {
    console.error('Error: Provide --url + --brand, --app + --brand, or --config <file.json>');
    process.exit(1);
  }

  // Determine viewports and browsers
  const viewportKeys = config.viewport === 'both'
    ? Object.keys(VIEWPORTS)
    : [config.viewport];

  const browsers = config.browser === 'both'
    ? ['chrome', 'safari']
    : [config.browser];

  // Total captures to make
  const totalCaptures = targets.length * viewportKeys.length * browsers.length;
  let captureIndex = 0;

  console.log(`\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃  🎯 Mukamal Visual Capture Engine v2.1                    ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃  Mode:      ${(config.mode).padEnd(43)}┃`);
  console.log(`┃  Strategy:  ${(config.strategy).padEnd(43)}┃`);
  if (config.app) {
    console.log(`┃  App:       ${(config.app).padEnd(43)}┃`);
  }
  console.log(`┃  Targets:   ${String(targets.length).padEnd(43)}┃`);
  console.log(`┃  Viewports: ${viewportKeys.join(', ').padEnd(43)}┃`);
  console.log(`┃  Browsers:  ${browsers.join(', ').padEnd(43)}┃`);
  console.log(`┃  Delay:     ${(config.delay + 's').padEnd(43)}┃`);
  if (config.timer) {
    console.log(`┃  Timer:     ${(config.timer + 's').padEnd(43)}┃`);
  }
  if (config.warmup) {
    console.log(`┃  Warm-up:   ${(config.warmup + 's').padEnd(43)}┃`);
  }
  console.log(`┃  Cookies:   ${(config.cookies ? 'enabled' : 'disabled').padEnd(43)}┃`);
  console.log(`┃  Auto-retry: ${(config.autoRetry ? 'enabled' : 'disabled').padEnd(42)}┃`);
  console.log(`┃  Output:    ${config.output.padEnd(43).slice(0, 43)}┃`);
  console.log(`┃  Captures:  ${(totalCaptures + ' total').padEnd(43)}┃`);
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n`);

  const results = [];

  for (const target of targets) {
    for (const vp of viewportKeys) {
      for (const br of browsers) {
        captureIndex++;
        const progressPct = Math.round((captureIndex / totalCaptures) * 100);
        const progressBar = '█'.repeat(Math.round(progressPct / 5)) + '░'.repeat(20 - Math.round(progressPct / 5));

        console.log(`\n  ┌── Capture ${captureIndex}/${totalCaptures} [${progressBar}] ${progressPct}% ──`);

        let result;
        const brand = target.brand || config.brand;

        console.log(`  │ Brand:    ${brand}`);
        console.log(`  │ URL:      ${target.url}`);
        console.log(`  │ Mode:     ${config.mode}`);
        console.log(`  │ Viewport: ${vp}`);
        console.log(`  │ Browser:  ${br}`);
        if (config.timer) console.log(`  │ Timer:    ${config.timer}s`);
        console.log(`  └────────────────────────────────────────`);

        // ── Mode-based routing (takes priority) ──
        if (config.app) {
          // App window capture (Simulator, Figma, etc.)
          const mediaDir = path.join(config.output, brand, 'media');
          fs.mkdirSync(mediaDir, { recursive: true });
          const slug = config.app.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
          const filepath = path.join(mediaDir, `${slug}_app-window_${timestamp}.png`);
          result = captureApp(config.app, filepath, config.timer);
          result.brand = brand;
        } else if (config.mode === 'area') {
          // Free area selection
          const mediaDir = path.join(config.output, brand, 'media');
          fs.mkdirSync(mediaDir, { recursive: true });
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
          const filepath = path.join(mediaDir, `area-selection_${timestamp}.png`);
          result = captureArea(filepath, config.timer);
          result.brand = brand;
        } else if (config.mode === 'fullscreen') {
          const mediaDir = path.join(config.output, brand, 'media');
          fs.mkdirSync(mediaDir, { recursive: true });
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
          const filepath = path.join(mediaDir, `fullscreen_${timestamp}.png`);
          result = captureFullscreen(filepath, config.timer);
          result.brand = brand;
        } else if (config.mode === 'hover') {
          result = await captureHover(target.url, brand, vp, br, config.output, config.delay, config.timer, VIEWPORTS);
        } else if (config.mode === 'journey') {
          const journeyResults = await captureJourney(target.url, brand, vp, br, config.output, config.delay, config.timer, VIEWPORTS);
          // Journey returns an array — push all
          for (const jr of journeyResults) {
            results.push(jr);
            const jIcon = jr.status === 'SUCCESS' ? '✅' : '❌';
            console.log(`  ${jIcon} Journey step ${jr.step}: ${jr.status}`);
          }
          continue; // skip normal push/log below
        } else {
          // ── Strategy-based routing (original) ──
          switch (config.strategy) {
            case 'native':
              result = await captureNative(target.url, brand, vp, br, config.output, config.delay, config.cookies, config.warmup);
              break;
            case 'interactive':
              result = await captureInteractive(target.url, brand, vp, br, config.output, config.delay);
              break;
            case 'headless':
              result = await captureHeadless(target.url, brand, vp, br, config.output, config.timeout, config.sanitize);
              break;
            default:
              console.error(`Unknown strategy: ${config.strategy}`);
              process.exit(1);
          }

          // ── Auto-retry with interactive if bot detected ──
          if (result.status === 'BLOCKED' && config.autoRetry && config.strategy === 'native') {
            console.log(`\n  🔄 Auto-retry: switching to interactive mode for ${brand}...`);
            console.log(`  💡 Please bypass the ${result.botDetection} challenge in the browser`);
            console.log(`  📸 Then select the area to capture\n`);
            result = await captureInteractive(target.url, brand, vp, br, config.output, config.delay);
            result.botDetection = 'bypassed-interactive';
          }
        }

        results.push(result);

        const icons = { SUCCESS: '✅', FAILED: '❌', BLOCKED: '🛡️', CANCELLED: '⏹' };
        const icon = icons[result.status] || '❓';
        console.log(`  ${icon} ${result.status}${result.file ? ` → ${path.relative(config.output, result.file)}` : ''}`);
        if (result.file && fs.existsSync(result.file)) {
          const size = fs.statSync(result.file).size;
          const sizeKB = (size / 1024).toFixed(1);
          console.log(`  📁 Size: ${sizeKB} KB`);
        }
      }
    }
  }

  // ─── Output Report ──────────────────────────────────────────────────────
  const report = {
    engine: 'Mukamal Visual Capture Engine v2.0',
    timestamp: new Date().toISOString(),
    strategy: config.strategy,
    browsers,
    viewportSettings: VIEWPORTS,
    targets: targets.length,
    viewports: viewportKeys,
    captures: results,
    summary: {
      total: results.length,
      success: results.filter(r => r.status === 'SUCCESS').length,
      blocked: results.filter(r => r.status === 'BLOCKED').length,
      failed: results.filter(r => r.status === 'FAILED').length,
      cancelled: results.filter(r => r.status === 'CANCELLED').length,
    },
  };

  // Write JSON report
  let reportPath = null;
  if (targets.length > 0) {
    const brand = targets[0].brand || config.brand;
    const reportDir = path.join(config.output, brand, 'reports');
    fs.mkdirSync(reportDir, { recursive: true });
    reportPath = path.join(reportDir, `capture_report_${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }

  const reportLabel = reportPath ? path.relative(config.output, reportPath) : 'N/A';
  console.log(`\n┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  console.log(`┃  📊 Capture Summary                                      ┃`);
  console.log(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  console.log(`┃  ✅ Success:   ${String(report.summary.success).padEnd(41)}┃`);
  console.log(`┃  ❌ Failed:    ${String(report.summary.failed).padEnd(41)}┃`);
  console.log(`┃  🛡️  Blocked:   ${String(report.summary.blocked).padEnd(41)}┃`);
  console.log(`┃  ⏹  Cancelled: ${String(report.summary.cancelled).padEnd(41)}┃`);
  console.log(`┃  📄 Report:    ${reportLabel.padEnd(41).slice(0, 41)}┃`);
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n`);

  if (report.summary.failed > 0 || report.summary.blocked > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`\nFatal: ${err.message}`);
  process.exit(2);
});
