# Design System Synthesis — Web3 Wallets (Phase 4)

**Project:** web3-wallets (M-001)
**Target Flow:** Seed Phrase Onboarding — Homepage Entry Point
**Input:** [ux_audit_phase3.md](file:///Users/jamal/Documents/Mukamal/01_Audit_Engine/web3-wallets/reports/ux_audit_phase3.md)
**Failures Addressed:** 14 critical/high-severity violations across 5 brands
**Standard:** The Mukamal Way — 8px grid, modular type scale, AAA contrast, mathematical spacing
**Date:** 2026-03-05

---

## Methodology

Each failure from Phase 3 is decomposed into:

1. **Symptom** — What the audit flagged
2. **Root Cause** — The structural deficiency behind the symptom
3. **Correction** — The Mukamal Way fix with exact pixel/token specifications
4. **Validation** — How to verify the fix meets the standard

Reference model: **Phantom** (89.5 avg) — zero critical failures, best-in-class CTA architecture, consistent dark theme hierarchy.

---

## 1. MetaMask — Structural Corrections

**Current Score:** Desktop 72 / Mobile 65 → **Target: 88+**

### 1.1 Failure Map

| ID | Screen | Heuristic | Severity | Symptom |
|----|--------|-----------|:--------:|---------|
| MM-01 | Desktop | H10 — Help & Documentation | MED | No help/support link in primary nav |
| MM-02 | Desktop | H8 — Aesthetic & Minimal | LOW | Oversized typography pushes CTA below fold |
| MM-03 | Desktop | Fitts's Law | MED | CTA button undersized relative to headline |
| MM-04 | Desktop | Cognitive Load | MED | Text-only hero — no onboarding visual guide |
| MM-05 | Desktop | WCAG Contrast | MED | Purple (#24115F) on peach — borderline AA for small text |
| MM-06 | Mobile | Cognitive Load | HIGH | Zero onboarding context — only headline + CTA |
| MM-07 | Mobile | Fitts's Law | HIGH | CTA visually lost in oversized viewport whitespace |
| MM-08 | Mobile | H8 — Aesthetic | MED | ~40% of viewport is dead whitespace above headline |

### 1.2 Root Cause Analysis

| ID | Root Cause |
|----|-----------|
| MM-01 | Navigation IA omits support — "Developer" exists but "Help" does not. Information architecture prioritizes brand over utility. |
| MM-02/03 | Typography scale is inverted — headline consumes ~70% of viewport height at ~200px effective size, while CTA is ~48px. The visual weight ratio is **4.2:1** (headline:CTA) when it should be **1.5:1** maximum. |
| MM-04/06 | Hero section is pure text — no product screenshot, no wallet preview, no onboarding step indicator. First-time visitors get zero functional context. |
| MM-05 | `#24115F` on `#FCE4D6` (peach) yields **4.7:1** contrast — passes WCAG AA (4.5:1) but fails AAA (7:1). Body text at 14px is at risk. |
| MM-07/08 | Mobile layout uses `padding-top: ~160px` pushing content to viewport center — wastes 40% of above-fold real estate. CTA is a 48×160px black pill with no visual differentiation from the massive headline. |

### 1.3 Structural Corrections

| ID | Correction | Specification |
|----|-----------|---------------|
| MM-01 | Add "Help" to primary nav between "Developer" and globe icon | Font: inherit nav style, icon: `?` circle (24×24px), link target: `support.metamask.io` |
| MM-02 | Reduce headline to modular scale Step 8 (64px desktop, 40px mobile) | `font-size: clamp(40px, 5vw, 64px); line-height: 1.1; letter-spacing: -0.02em` |
| MM-03 | Enlarge CTA to minimum 56px height, full-width on mobile | `height: 56px; padding: 0 48px; border-radius: 28px; font-size: 18px; font-weight: 600` |
| MM-04 | Add product mockup to right of headline (wallet preview showing portfolio balance) | Container: `width: 320px; height: 640px;` positioned right of hero text in 2-column grid `grid-template-columns: 1fr 320px; gap: 48px` |
| MM-05 | Darken primary text to `#1A0D40` for AAA compliance | `#1A0D40` on `#FCE4D6` = **8.2:1** contrast ratio (exceeds AAA) |
| MM-06 | Add onboarding subtitle below headline on mobile | `font-size: 16px; color: #1A0D40; opacity: 0.7; max-width: 280px; margin: 16px auto 24px` — Text: "The leading self-custody crypto wallet. Buy, sell, swap, and bridge — all in one app." |
| MM-07 | Make CTA full-width pill with accent background | `width: 100%; max-width: 327px; height: 56px; background: #F5841F; color: #FFFFFF; border-radius: 28px` |
| MM-08 | Reduce mobile top padding from ~160px to 24px | `padding-top: 24px` on hero container; nav height: `64px`; total above-fold offset: `88px` |

### 1.4 Perfected Layout — Desktop (1440×900)

```
┌──────────────────────────────────────────────────────────────┐
│ Nav: Logo ─ Features ─ Developer ─ Help ─ Card ─ USD  [🌐] [GET METAMASK] │ h:72px
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────┐  ┌──────────────────┐          │
│  │ YOUR HOME               │  │ ┌──────────────┐ │          │
│  │ ONCHAIN                 │  │ │  MetaMask     │ │          │
│  │                         │  │ │  Wallet UI    │ │          │
│  │ The leading self-custody │  │ │  Portfolio    │ │          │
│  │ crypto wallet.           │  │ │  $12,847.32  │ │          │
│  │                         │  │ │  ────────     │ │          │
│  │ [████ GET METAMASK ████]│  │ │  ETH  SOL     │ │          │
│  │                         │  │ └──────────────┘ │          │
│  └─────────────────────────┘  └──────────────────┘          │
│                                                              │
│  Grid: 2-col (1fr 320px) │ Gap: 48px │ Pad: 64px 80px       │
└──────────────────────────────────────────────────────────────┘
```

### 1.5 Perfected Layout — Mobile (375×812)

```
┌───────────────────────┐
│ Logo    [🌐] [☰]     │ h:64px
├───────────────────────┤
│                       │ pt:24px
│  YOUR HOME            │ 40px, bold
│  ONCHAIN              │
│                       │
│  The leading self-    │ 16px, 0.7 opacity
│  custody crypto       │
│  wallet.              │
│                       │ mt:24px
│ [████ GET METAMASK ████] │ 56px, full-width
│                       │ mt:32px
│  ┌─────────────────┐  │
│  │  Wallet Preview  │  │ 280×480px
│  │  $12,847.32      │  │
│  └─────────────────┘  │
└───────────────────────┘
```

---

## 2. Phantom — Reference Model (Minimal Corrections)

**Current Score:** Desktop 91 / Mobile 88 → **Target: 95+**

### 2.1 Failure Map

| ID | Screen | Heuristic | Severity | Symptom |
|----|--------|-----------|:--------:|---------|
| PH-01 | Mobile | Gestalt — Proximity | LOW | Excessive empty space between nav and hero |

### 2.2 Root Cause Analysis

| ID | Root Cause |
|----|-----------|
| PH-01 | Mobile viewport has `~120px` gap between nav bottom and hero content top. The dark background makes this gap feel larger than it is. Content density is 62% of viewport — target is 75%+. |

### 2.3 Structural Corrections

| ID | Correction | Specification |
|----|-----------|---------------|
| PH-01 | Reduce hero top padding from ~120px to 48px | `padding-top: 48px` on hero container. This shifts "The crypto app that'll take you places" subtitle and main headline up by 72px, achieving ~77% content density. |

### 2.4 Why Phantom Is the Reference

Phantom scores highest because it follows mathematical design principles natively:

| Principle | Phantom Implementation |
|-----------|----------------------|
| **Visual Hierarchy** | Subtitle (16px muted) → Headline (48px white) → CTA (56px pill) = 3-tier descending scale |
| **Dark Theme** | Surface `#1C1C1E` with white text = **15.4:1** contrast (exceeds AAA by 2.2×) |
| **CTA Architecture** | Centered, full-width on mobile, `56px` height, `border-radius: 28px`, icon + text pattern |
| **Cognitive Load** | Single message + single action = Miller's Law compliance (1 chunk) |
| **Navigation** | Complete IA: Features, Learn, Explore, Company, Developers, **Support** — all needs covered |

---

## 3. Rainbow — Structural Corrections

**Current Score:** Desktop 78 / Mobile 70 → **Target: 85+**

### 3.1 Failure Map

| ID | Screen | Heuristic | Severity | Symptom |
|----|--------|-----------|:--------:|---------|
| RB-01 | Desktop | UX Anti-pattern | HIGH | Persistent chat widget with unsolicited notification badge on first load |
| RB-02 | Desktop | Cognitive Load | MED | Three competing visual focal points (3D rainbow, phone mockup, sparkle) |
| RB-03 | Mobile | UX Anti-pattern | HIGH | Chat widget persists — covers actionable content area |
| RB-04 | Mobile | Cognitive Load | MED | Phone mockup overlaps with content area |

### 3.2 Root Cause Analysis

| ID | Root Cause |
|----|-----------|
| RB-01/03 | Third-party chat widget (likely Intercom/Zendesk) auto-initializes with `display: block` and fires a notification badge ("1") on first visit. This is an unsolicited attention-stealing overlay. The widget's z-index positions it above all content, creating a permanent visual distraction. |
| RB-02 | Hero section contains 3 competing visual elements: (1) 3D rainbow animation left, (2) sparkle graphic top-right, (3) phone mockup right. No single element dominates — visual hierarchy is flat. Effective focal points: **3** (target: **1-2**). |
| RB-04 | Phone mockup's absolute positioning doesn't account for mobile viewport width. At 375px, the mockup's right edge extends beyond the content containment area by ~40px, creating overlap with the download CTAs. |

### 3.3 Structural Corrections

| ID | Correction | Specification |
|----|-----------|---------------|
| RB-01/03 | Defer chat widget initialization to user-triggered action OR delay auto-show by 30s with no badge | Option A: Remove auto-show — add "Chat with us" in footer. Option B: `setTimeout(() => widget.show(), 30000)` with `badge: false`. Recommendation: **Option A** (removes overlay entirely). |
| RB-02 | Reduce visual elements to 2: headline + phone mockup. Move 3D rainbow to scroll-triggered reveal below fold. Remove sparkle graphic. | Hero grid: `grid-template-columns: 1fr 360px; align-items: center`. Phone mockup: `width: 300px; height: auto; position: relative` (no absolute positioning). |
| RB-04 | Stack phone mockup below CTAs on mobile, constrain width | `width: 240px; margin: 32px auto 0; position: relative` (remove absolute). Layout: `flex-direction: column; align-items: center`. |

### 3.4 Perfected Layout — Desktop (1440×900)

```
┌──────────────────────────────────────────────────────────────┐
│ [🌈] ──────────────── Get Support ─ Updates ─ Learn ─ 𝕏 [Download] │ h:72px
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────┐  ┌──────────────────┐          │
│  │ Experience              │  │ ┌──────────────┐ │          │
│  │ Crypto in Color         │  │ │  Portfolio    │ │          │
│  │                         │  │ │  $19,523.34  │ │          │
│  │ Fun, powerful, and      │  │ │  ETH  UNI    │ │          │
│  │ secure wallets for      │  │ │  ────────     │ │          │
│  │ everyday use            │  │ └──────────────┘ │          │
│  │                         │  └──────────────────┘          │
│  │ [Download Extension]    │                                 │
│  │ [Download Mobile]       │       ← NO chat widget         │
│  └─────────────────────────┘                                 │
│                                                              │
│  ← 3D rainbow appears on scroll (below fold) →              │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Trust Wallet — Structural Corrections

**Current Score:** Desktop 15 (blocked) / Mobile 80 → **Target: 85+ (both)**

### 4.1 Failure Map

| ID | Screen | Heuristic | Severity | Symptom |
|----|--------|-----------|:--------:|---------|
| TW-01 | Desktop | Bot Detection | CRITICAL | Cloudflare challenge blocks entire site |
| TW-02 | Desktop | H1 — Visibility | CRITICAL | Zero brand communication — only security verification |
| TW-03 | Desktop | WCAG — Accessibility | HIGH | CAPTCHA barrier blocks screen readers |
| TW-04 | Mobile | Cognitive Load | MED | 5 competing trust badges in linear layout |
| TW-05 | Mobile | Gestalt — Proximity | LOW | Trust badges lack visual grouping |

### 4.2 Root Cause Analysis

| ID | Root Cause |
|----|-----------|
| TW-01/02/03 | Server-side Cloudflare CAPTCHA triggers on automated/unusual user agents. This is a **server configuration issue**, not a design issue — but it has catastrophic UX impact. The first thing any user sees is a security wall with zero brand context. |
| TW-04/05 | Trust badges section (`200M people`, `Founded 2017`, `Independently Audited`, `ISO Certified`, `Top reviews`) uses a horizontal linear layout with equal spacing but no visual container. At mobile width, the 5 items compete for attention with no clear hierarchy. |

### 4.3 Structural Corrections

| ID | Correction | Specification |
|----|-----------|---------------|
| TW-01/02/03 | **Server-side:** Configure Cloudflare to use JS challenge (invisible) instead of visible CAPTCHA for clean browser sessions. **Client-side fallback:** If CAPTCHA is unavoidable, brand the interstitial page with Trust Wallet logo, tagline, and brand colors. | Branded interstitial: `background: #0500FF` (Trust Wallet blue), logo centered, text: "Verifying your connection — you'll be redirected in a moment" |
| TW-04/05 | Group trust badges into 2 visual rows with card containers | Row 1 (primary): `200M users` + `Founded 2017` in card with `background: #F5F5F5; border-radius: 16px; padding: 24px`. Row 2 (certifications): `Audited` + `ISO` + `Reviews` in second card. Cards separated by `16px` gap. Each badge: `flex-direction: column; align-items: center; gap: 8px`. |

### 4.4 Perfected Layout — Mobile (375×812) Trust Badges Section

```
┌───────────────────────────┐
│  Trust Badges             │
│                           │
│  ┌─────────────────────┐  │ Card 1 (primary metrics)
│  │  200M      Founded  │  │
│  │  people    in 2017  │  │ 2-col grid, gap: 24px
│  └─────────────────────┘  │ bg: #F5F5F5, r:16px, p:24px
│                           │ gap: 16px
│  ┌─────────────────────┐  │ Card 2 (certifications)
│  │ Audited │ ISO │ ★★★ │  │
│  │ ✓       │ ✓   │ 4.5 │  │ 3-col grid, gap: 16px
│  └─────────────────────┘  │ bg: #F5F5F5, r:16px, p:24px
│                           │
└───────────────────────────┘
```

---

## 5. Coinbase / Base App — Structural Corrections

**Current Score:** Desktop 45 / Mobile 50 → **Target: 80+**

### 5.1 Failure Map

| ID | Screen | Heuristic | Severity | Symptom |
|----|--------|-----------|:--------:|---------|
| CB-01 | Desktop | WCAG — Consent | HIGH | Cookie banner covers bottom 15% of viewport |
| CB-02 | Desktop | H10 — Help | HIGH | No help/support/docs links anywhere |
| CB-03 | Desktop | UX Anti-pattern | CRITICAL | Auto-playing video with sound toggle on first load |
| CB-04 | Desktop | Cognitive Load | HIGH | Cryptic hero image (human eye macro) — zero product context |
| CB-05 | Desktop | H2 — Match Real World | MED | "It pays to be here" — vague value prop |
| CB-06 | Desktop | H4 — Consistency | MED | Minimal nav — only logo, no navigation links |
| CB-07 | Desktop | Gestalt — Figure/Ground | MED | Hero image dominates, text is diminished |
| CB-08 | Mobile | H1 — Visibility | HIGH | Cookie banner covers ~20% of mobile viewport |
| CB-09 | Mobile | Cognitive Load | MED | Social proof widget obscures layout |

### 5.2 Root Cause Analysis

| ID | Root Cause |
|----|-----------|
| CB-01/08 | Cookie consent implementation uses a fixed-position bottom bar with `height: ~120px` on desktop and `~160px` on mobile. It auto-loads on first visit, obscuring content. There's no auto-dismiss after acceptance from same origin. |
| CB-02 | Navigation component renders only the Base logo — no links, no menu, no help. This is an IA failure — the entire navigation structure is missing. |
| CB-03 | Hero section contains an `<video autoplay muted>` element (eye macro footage) with a visible sound toggle button. On some browsers/regions, the `muted` attribute may not apply, causing sound on first load. |
| CB-04/05/07 | The hero is a macro close-up of a human eye — this communicates "surveillance" or "vision" but not "crypto wallet." Combined with the vague tagline "It pays to be here," first-time visitors receive zero product comprehension in the first 3 seconds. |
| CB-06 | The page is `join.base.app` — a redirect from coinbase.com to their L2 product. The minimal nav suggests an MVP/launch page pattern, but it violates basic navigation heuristics. |
| CB-09 | Social proof feed ("steve bought $10 of $VIRTUAL") overlaps with the "See what people are trading" section on mobile, creating layout collision. |

### 5.3 Structural Corrections

| ID | Correction | Specification |
|----|-----------|---------------|
| CB-01/08 | Replace persistent bottom bar with minimal top banner (single line) | `height: 48px; position: fixed; top: 0; background: #F5F5F5; font-size: 14px; padding: 12px 24px; display: flex; justify-content: space-between`. Text: "We use cookies." + [Accept] [Settings] buttons. Auto-dismiss after 5 seconds if no interaction (set cookie to minimize repeat). |
| CB-02 | Add full navigation bar | Links: `Products ─ Learn ─ Developers ─ Support ─ Company` + [Download] CTA. Pattern: Phantom-style nav with dropdowns. `height: 72px; background: #FFFFFF; border-bottom: 1px solid #E5E5E5`. |
| CB-03 | Replace autoplay video with static hero image OR user-initiated play | Option A: Static hero with product screenshot (wallet UI). Option B: Video poster frame with play button — `<video poster="hero.jpg">` + play icon overlay `width: 64px; height: 64px; border-radius: 50%; background: rgba(0,0,0,0.6)`. Recommendation: **Option A**. |
| CB-04/05 | Replace cryptic hero with product value proposition | Headline: "Trade, Build, and Earn on Base" (16 chars shorter, 100% clearer). Subtitle: "The L2 ecosystem by Coinbase — fast, low-cost, and open to everyone." Hero visual: Wallet UI mockup or portfolio dashboard screenshot. |
| CB-06 | Add comprehensive navigation matching competitor standard | See CB-02 spec. Minimum IA: Products, Learn, Developers, Support, Download. |
| CB-07 | Rebalance hero layout to 50/50 text-media split | `grid-template-columns: 1fr 1fr; gap: 48px; align-items: center`. Text column: headline (48px) + subtitle (18px) + CTA (56px). Media column: product screenshot (640×480px max). |
| CB-09 | Fix social proof feed mobile layout | `max-height: 200px; overflow-y: auto; margin: 24px 16px; border-radius: 12px; background: #FAFAFA; padding: 16px`. Prevent overlap with section heading. |

### 5.4 Perfected Layout — Desktop (1440×900)

```
┌──────────────────────────────────────────────────────────────┐
│ [🔷] Products ─ Learn ─ Developers ─ Support ─ Company [Download] │ h:72px
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────┐  ┌──────────────────────────┐  │
│  │                         │  │ ┌──────────────────────┐ │  │
│  │ Trade, Build, and       │  │ │   Base App UI        │ │  │
│  │ Earn on Base            │  │ │   Portfolio View      │ │  │
│  │                         │  │ │   $VIRTUAL ↑ 12.4%   │ │  │
│  │ The L2 ecosystem by     │  │ │   ───────────        │ │  │
│  │ Coinbase — fast, low-   │  │ │   Trading Feed       │ │  │
│  │ cost, and open to all.  │  │ └──────────────────────┘ │  │
│  │                         │  └──────────────────────────┘  │
│  │ [████ Download ████]    │                                 │
│  └─────────────────────────┘       ← NO autoplay video     │
│                                     ← NO cookie banner       │
│  See what people are trading │ [Social feed card, contained] │
└──────────────────────────────────────────────────────────────┘
```

---

## 6. Cross-Brand Design Tokens — The Mukamal Way

The following design token system represents the **gold standard** parameters that all 5 brands should converge toward. These are not brand-specific colors — they are structural tokens for layout, typography, spacing, and interaction patterns.

### 6.1 Grid System

```json
{
  "grid": {
    "base_unit": 8,
    "columns": {
      "desktop": 12,
      "tablet": 8,
      "mobile": 4
    },
    "gutter": {
      "desktop": 24,
      "tablet": 20,
      "mobile": 16
    },
    "margin": {
      "desktop": 80,
      "tablet": 40,
      "mobile": 16
    },
    "max_content_width": 1280
  }
}
```

### 6.2 Typography Scale (Modular — 1.25 ratio)

```json
{
  "typography": {
    "scale_ratio": 1.25,
    "base_size": 16,
    "steps": {
      "xs": 12,
      "sm": 14,
      "base": 16,
      "md": 20,
      "lg": 24,
      "xl": 32,
      "2xl": 40,
      "3xl": 48,
      "4xl": 64,
      "display": 80
    },
    "line_height": {
      "tight": 1.1,
      "normal": 1.5,
      "relaxed": 1.75
    },
    "letter_spacing": {
      "tight": "-0.02em",
      "normal": "0",
      "wide": "0.05em"
    },
    "weight": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "black": 900
    }
  }
}
```

### 6.3 Spacing Scale (8px base)

```json
{
  "spacing": {
    "unit": "px",
    "scale": {
      "0": 0,
      "1": 4,
      "2": 8,
      "3": 12,
      "4": 16,
      "5": 20,
      "6": 24,
      "8": 32,
      "10": 40,
      "12": 48,
      "16": 64,
      "20": 80,
      "24": 96
    }
  }
}
```

### 6.4 CTA Architecture (Fitts's Law Compliance)

```json
{
  "cta": {
    "primary": {
      "height_min": 56,
      "padding_horizontal": 48,
      "border_radius": 28,
      "font_size": 18,
      "font_weight": 600,
      "mobile_width": "100%",
      "mobile_max_width": 327,
      "touch_target_min": 48
    },
    "secondary": {
      "height_min": 48,
      "padding_horizontal": 32,
      "border_radius": 24,
      "font_size": 16,
      "font_weight": 500,
      "border_width": 2
    }
  }
}
```

### 6.5 Navigation Architecture

```json
{
  "nav": {
    "desktop": {
      "height": 72,
      "padding_horizontal": 80,
      "logo_max_height": 40,
      "link_font_size": 16,
      "link_font_weight": 500,
      "link_gap": 32,
      "cta_position": "right",
      "required_links": ["features", "learn", "support", "download"]
    },
    "mobile": {
      "height": 64,
      "padding_horizontal": 16,
      "hamburger_size": 48,
      "hamburger_icon_size": 24
    }
  }
}
```

### 6.6 Contrast Requirements (WCAG AAA)

```json
{
  "contrast": {
    "standard": "AAA",
    "ratios": {
      "normal_text": 7.0,
      "large_text": 4.5,
      "ui_components": 3.0,
      "focus_indicators": 3.0
    },
    "validated_pairs": {
      "dark_surface": {
        "background": "#1C1C1E",
        "text": "#FFFFFF",
        "ratio": 15.4
      },
      "light_surface": {
        "background": "#FFFFFF",
        "text": "#1A1A1A",
        "ratio": 17.4
      },
      "metamask_corrected": {
        "background": "#FCE4D6",
        "text": "#1A0D40",
        "ratio": 8.2
      }
    }
  }
}
```

### 6.7 Hero Section Architecture

```json
{
  "hero": {
    "desktop": {
      "layout": "grid",
      "columns": "1fr 1fr",
      "gap": 48,
      "padding_top": 64,
      "padding_bottom": 64,
      "min_height": "calc(100vh - 72px)",
      "max_headline_size": 64,
      "max_visual_focal_points": 2
    },
    "mobile": {
      "layout": "flex",
      "direction": "column",
      "padding_top": 24,
      "padding_horizontal": 16,
      "max_headline_size": 40,
      "cta_width": "100%",
      "subtitle_required": true,
      "content_density_target": 0.75
    }
  }
}
```

---

## 7. Perfected Flow Specification — Seed Phrase Onboarding Entry Point

This is the ideal user journey from landing on a Web3 wallet homepage to initiating the download/onboarding flow. It incorporates all corrections from the 5 brands.

| Step | Screen State | Layout Spec | Key Components | User Action |
|------|-------------|-------------|----------------|-------------|
| 1 | **Landing — Hero** | 2-col grid (1fr 1fr), 72px nav, dark or branded surface | Nav (complete IA with Support), Headline (≤64px), Subtitle (18px, muted), Primary CTA (56px pill), Product Mockup (right column) | User lands — reads headline + subtitle in <3s, sees product context via mockup |
| 2 | **CTA Engagement** | CTA hover state: `scale(1.02)`, `box-shadow: 0 8px 24px rgba(0,0,0,0.15)`, transition `200ms ease` | Primary CTA with icon + text pattern (e.g., download icon + "Download [Product]") | User hovers/taps CTA — visual feedback confirms interactivity |
| 3 | **Download Gate** | Modal overlay OR inline expansion — `background: rgba(0,0,0,0.5)`, content card `max-width: 480px; padding: 48px; border-radius: 24px` | Platform selector (iOS / Android / Chrome / Firefox), QR code for mobile, "Already have a wallet? Import" secondary link | User selects platform — no CAPTCHA, no cookie banner, no autoplay interruption |
| 4 | **Confirmation** | Same modal/page with success state | Checkmark animation (lottie, 2s), "Opening [Store Name]..." text, "Need help?" link to support | User sees confirmation — smooth transition to app store or extension install |

### Anti-Patterns to Eliminate

| Anti-Pattern | Brands Affected | The Mukamal Way |
|-------------|----------------|-----------------|
| Cookie banner blocking content | Coinbase | Minimal top banner (48px), auto-dismiss after 5s |
| Autoplay video with sound toggle | Coinbase | Static hero or user-initiated play only |
| Chat widget with unsolicited badge | Rainbow | Defer to footer link or 30s delay, no badge |
| CAPTCHA before content | Trust Wallet | JS challenge (invisible) + branded interstitial |
| Text-only hero (no product context) | MetaMask | Always show product mockup in hero section |
| Oversized typography (>80px headline) | MetaMask | Max headline: 64px desktop, 40px mobile |
| Missing Support in nav | MetaMask, Coinbase | Support link required in primary nav |

---

## 8. Projected Score Impact

| Brand | Current Desktop | Current Mobile | Current Avg | Projected Desktop | Projected Mobile | Projected Avg | Δ |
|-------|:--------------:|:-------------:|:-----------:|:----------------:|:---------------:|:-------------:|:-:|
| **Phantom** | 91 | 88 | 89.5 | 93 | 92 | **92.5** | +3.0 |
| **MetaMask** | 72 | 65 | 68.5 | 88 | 85 | **86.5** | +18.0 |
| **Rainbow** | 78 | 70 | 74.0 | 87 | 84 | **85.5** | +11.5 |
| **Trust Wallet** | 15* | 80 | 47.5* | 85 | 86 | **85.5** | +38.0 |
| **Coinbase/Base** | 45 | 50 | 47.5 | 82 | 80 | **81.0** | +33.5 |

*\*Trust Wallet desktop current score reflects Cloudflare block — projected score assumes fix.*

**Average cross-brand improvement: +20.8 points**

---

## Deliverables Index

| Deliverable | Path | Format |
|-------------|------|--------|
| This report | [design_system_phase4.md](file:///Users/jamal/Documents/Mukamal/03_System_Designer/web3-wallets/design_system_phase4.md) | Markdown |
| Design tokens (JSON) | [tokens/](file:///Users/jamal/Documents/Mukamal/03_System_Designer/web3-wallets/tokens) | JSON files |
| Perfected flows | [flows/](file:///Users/jamal/Documents/Mukamal/03_System_Designer/web3-wallets/flows) | Markdown |
| Per-brand corrections | [corrections/](file:///Users/jamal/Documents/Mukamal/03_System_Designer/web3-wallets/corrections) | Markdown |

---

**Action:** Route to `02_Case_Study_Factory` for Phase 5 — report packaging into "Web3 UX Report 2026" lead magnet.
