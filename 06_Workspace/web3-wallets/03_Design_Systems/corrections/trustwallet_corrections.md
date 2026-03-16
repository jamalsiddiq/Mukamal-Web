# Structural Corrections — Trust Wallet

**Brand:** trustwallet.com
**Current Score:** Desktop 15 (Cloudflare blocked) / Mobile 80 (Avg 47.5*)
**Target Score:** Desktop 85 / Mobile 86 (Avg 85.5)
**Failures Addressed:** 5

*\*Desktop score reflects Cloudflare CAPTCHA — not a design failure but a server configuration issue with catastrophic UX impact.*

---

## Correction Summary

| ID | Heuristic | Severity | Root Cause | Fix |
|----|-----------|:--------:|-----------|-----|
| TW-01 | Bot Detection | CRITICAL | Cloudflare visible CAPTCHA triggers on clean browser sessions | Switch to JS challenge (invisible) or brand the interstitial |
| TW-02 | H1 — Visibility | CRITICAL | User sees security wall instead of product | Branded interstitial fallback |
| TW-03 | WCAG — Accessibility | HIGH | CAPTCHA blocks screen readers | JS challenge eliminates visual barrier |
| TW-04 | Cognitive Load | MED | 5 trust badges compete linearly with no hierarchy | Group into 2 visual cards |
| TW-05 | Gestalt — Proximity | LOW | Trust badges lack visual containers | Card-based grouping with background |

---

## Server Configuration — Cloudflare Fix

### Option A: Invisible JS Challenge (Recommended)

```
# Cloudflare Dashboard → Security → WAF
# Rule: "Challenge Sensitivity"
# Change from: "Interactive Challenge" (visible CAPTCHA)
# Change to: "JS Challenge" (invisible, auto-resolve)

# Cloudflare Page Rule:
# Match: trustwallet.com/*
# Setting: Security Level = "Essentially Off" for clean sessions
# Setting: Browser Integrity Check = ON (invisible)
```

### Option B: Branded Interstitial (Fallback)

If visible challenge is unavoidable, brand the page:

```css
/* Override Cloudflare challenge page styles */
.cf-challenge-page {
  background: #0500FF !important; /* Trust Wallet blue */
  color: #FFFFFF !important;
  font-family: -apple-system, sans-serif !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 100vh !important;
}

.cf-challenge-page::before {
  content: '';
  width: 120px;
  height: 120px;
  background: url('/trust-wallet-logo-white.svg') center/contain no-repeat;
  margin-bottom: 32px;
}

.cf-challenge-page h1 {
  font-size: 24px !important;
  font-weight: 600 !important;
  margin-bottom: 8px !important;
}

.cf-challenge-page p {
  font-size: 16px !important;
  opacity: 0.8 !important;
  max-width: 400px !important;
  text-align: center !important;
}

/* Custom text */
.cf-challenge-text::after {
  content: "Verifying your connection — you'll be redirected in a moment";
}
```

---

## CSS Corrections — Trust Badges

### Current State (Flat Linear)

```
200M people ─ Founded 2017 ─ Independently Audited ─ ISO Certified ─ Top reviews ★★★★★
```

### Corrected State (Grouped Cards)

```css
.trust-badges {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
  margin: 32px 0;
}

.trust-card {
  background: #F5F5F5;
  border-radius: 16px;
  padding: 24px;
}

.trust-card--primary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.trust-card--certifications {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.trust-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.trust-badge__value {
  font-size: 24px;
  font-weight: 700;
  color: #0500FF; /* Trust Wallet blue */
}

.trust-badge__label {
  font-size: 14px;
  color: #666;
  font-weight: 400;
}

.trust-badge__icon {
  width: 32px;
  height: 32px;
  color: #0500FF;
}
```

### Desktop Layout Override

```css
@media (min-width: 769px) {
  .trust-badges {
    flex-direction: row;
    gap: 24px;
    padding: 0 80px;
    max-width: 1280px;
    margin: 48px auto;
  }

  .trust-card {
    flex: 1;
  }

  .trust-card--primary {
    flex: 2;
    grid-template-columns: repeat(2, 1fr);
  }

  .trust-card--certifications {
    flex: 3;
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## Brand Tokens

```json
{
  "brand": "Trust Wallet",
  "color": {
    "primary": "#0500FF",
    "surface": "#FFFFFF",
    "surface_muted": "#F5F5F5",
    "text_primary": "#1A1A1A",
    "text_secondary": "#666666",
    "interstitial_bg": "#0500FF",
    "interstitial_text": "#FFFFFF",
    "success": "#22C55E",
    "error": "#EF4444"
  },
  "typography": {
    "primary": "'Trust Sans', -apple-system, sans-serif",
    "headline_weight": 700,
    "body_weight": 400
  },
  "contrast": {
    "text_on_white": 17.4,
    "white_on_primary": 6.8,
    "primary_on_white": 6.1
  }
}
```
