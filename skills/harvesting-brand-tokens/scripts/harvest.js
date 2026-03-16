const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// CLI Arguments Parser
const args = process.argv.slice(2);
const options = {};
args.forEach((arg, i) => {
    if (arg.startsWith('--')) {
        options[arg.substring(2)] = args[i + 1];
    }
});

const TARGET_URL = options.url;
const BASE_GRID = parseInt(options.grid || 8, 10);
const OUTPUT_DIR = options.output || path.join(__dirname, '../../../03_System_Designer/harvester_output');

if (!TARGET_URL) {
    console.error("Usage: node harvest.js --url <https://example.com> [--grid 8] [--output ./output_dir]");
    process.exit(1);
}

// Utility to calculate contrast ratio securely
function getLuminance(r, g, b) {
    let a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}
function rgbStringToObject(rgbStr) {
    if (!rgbStr || rgbStr === 'rgba(0, 0, 0, 0)') return { r: 255, g: 255, b: 255 }; // Default white bg if transparent
    let parts = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return parts ? { r: parseInt(parts[1]), g: parseInt(parts[2]), b: parseInt(parts[3]) } : { r: 255, g: 255, b: 255 };
}

function getContrast(rgb1, rgb2) {
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

(async () => {
    console.log(`[HARVESTER] Launching engine for target: ${TARGET_URL}`);
    console.log(`[HARVESTER] Base Grid System: ${BASE_GRID}px`);

    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    } catch (e) {
        console.error(`[HARVESTER] Failed to reach ${TARGET_URL}: ${e.message}`);
        await browser.close();
        process.exit(1);
    }

    console.log("[HARVESTER] Extracting raw DOM tokens...");

    // Execute DOM script in browser context to extract styles
    const rawTokens = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const colors = new Set();
        const fontSizes = new Set();
        const fontFamilies = new Set();
        const spacingValues = new Set();
        const colorPairs = []; // To check contrast

        elements.forEach(el => {
            const style = window.getComputedStyle(el);

            // Colors
            if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(`bg:${style.backgroundColor}`);
            if (style.color && style.color !== 'rgba(0, 0, 0, 0)') colors.add(`text:${style.color}`);
            if (style.borderColor && style.borderColor !== 'rgba(0, 0, 0, 0)' && style.borderWidth !== '0px') colors.add(`border:${style.borderColor}`);

            // Contrast Pairs
            if (style.color && style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                colorPairs.push({ bg: style.backgroundColor, fg: style.color, text: el.innerText.trim() ? el.innerText.substring(0, 10) : 'icon' });
            }

            // Typography
            if (style.fontSize) fontSizes.add(style.fontSize);
            if (style.fontFamily) fontFamilies.add(style.fontFamily);

            // Spacing
            ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'gap'].forEach(prop => {
                if (style[prop] && style[prop] !== '0px' && style[prop] !== 'normal') {
                    // Exclude percentages or auto
                    if (style[prop].includes('px')) spacingValues.add(style[prop]);
                }
            });
        });

        return {
            colors: Array.from(colors),
            colorPairs: colorPairs,
            fontSizes: Array.from(fontSizes).map(s => parseFloat(s)).filter(s => !isNaN(s)).sort((a, b) => a - b),
            fontFamilies: Array.from(fontFamilies),
            spacingValues: Array.from(spacingValues).map(s => parseFloat(s)).filter(s => !isNaN(s)).sort((a, b) => a - b)
        };
    });

    console.log("[HARVESTER] Auditing against Mukamal OS Top 1% specs...");

    const domainName = new URL(TARGET_URL).hostname.replace('www.', '');

    // Audit Colors
    const auditedColors = [];
    const colorUsageMap = new Map();
    rawTokens.colors.forEach(c => {
        const [type, val] = c.split(':');
        if (!colorUsageMap.has(val)) colorUsageMap.set(val, new Set());
        colorUsageMap.get(val).add(type);
    });

    let compliantColors = 0;
    // Audit contrast from collected pairs
    const failedContrastList = [];
    rawTokens.colorPairs.forEach(pair => {
        const cRatio = getContrast(rgbStringToObject(pair.bg), rgbStringToObject(pair.fg));
        if (cRatio < 4.5) {
            failedContrastList.push(`FAIL (${cRatio.toFixed(2)}:1) | Text '${pair.text}' | FG: ${pair.fg} on BG: ${pair.bg}`);
        } else {
            compliantColors++;
        }
    });

    // Typography Audit
    const totalSizes = rawTokens.fontSizes.length;
    const typoStatus = totalSizes > 14 ? 'BLOAT' : 'CLEAN';

    // Spacing Audit
    let gridAligned = 0;
    const auditedSpacing = rawTokens.spacingValues.map(s => {
        const isAligned = s % BASE_GRID === 0;
        if (isAligned) gridAligned++;
        return { val: `${s}px`, status: isAligned ? 'PASS' : 'DEVIANT' };
    });
    const gridPercentage = rawTokens.spacingValues.length ? ((gridAligned / rawTokens.spacingValues.length) * 100).toFixed(1) : 100;

    // Compile Markdown Report
    let reportDoc = `### Brand Token Report\n`;
    reportDoc += `**Target:** ${TARGET_URL}\n`;
    reportDoc += `**Scope:** Full-Page\n`;
    reportDoc += `**Base Grid:** ${BASE_GRID}px\n\n`;

    reportDoc += `#### Color Contrast Audit (Sampled Elements)\n`;
    reportDoc += `| Sample | Status & Evidence |\n`;
    reportDoc += `|--------|------------------|\n`;
    failedContrastList.slice(0, 10).forEach(f => {
        reportDoc += `| Random Text | ${f} |\n`;
    });
    if (failedContrastList.length === 0) reportDoc += `| All tested text | PASS (AAA Compliant ≥4.5:1) |\n`;
    else if (failedContrastList.length > 10) reportDoc += `| ... | +${failedContrastList.length - 10} more contrast failures |\n`;

    reportDoc += `\n#### Typography Tokens\n`;
    reportDoc += `| Families Detected | Sizes Detected | Status |\n`;
    reportDoc += `|------------------|----------------|--------|\n`;
    reportDoc += `| ${rawTokens.fontFamilies.slice(0, 2).join(', ')} | ${rawTokens.fontSizes.length} unique sizes (${rawTokens.fontSizes.slice(0, 3).join('px, ')}...) | ${typoStatus} |\n`;

    reportDoc += `\n#### Spacing Tokens (Top 10 Deviations)\n`;
    reportDoc += `| Value | Status |\n`;
    reportDoc += `|-------|--------|\n`;
    auditedSpacing.filter(s => s.status === 'DEVIANT').slice(0, 10).forEach(s => {
        reportDoc += `| ${s.val} | ${s.status} (Not divisible by ${BASE_GRID}) |\n`;
    });

    reportDoc += `\n**Summary:**\n`;
    reportDoc += `- Colors Contrast: ${compliantColors} passing pairs, ${failedContrastList.length} failing pairs.\n`;
    reportDoc += `- Typography: ${rawTokens.fontSizes.length} unique sizes (${typoStatus})\n`;
    reportDoc += `- Spacing: ${gridPercentage}% grid-aligned\n\n`;
    reportDoc += `**Action:** Route clean tokens to \`03_System_Designer\`.\n`;

    // Ensure output dir exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const outputPath = path.join(OUTPUT_DIR, `${domainName}_harvest_report.md`);
    fs.writeFileSync(outputPath, reportDoc);

    console.log(`[HARVESTER] Audit complete. Output written to ${outputPath}`);

    await browser.close();
})();
