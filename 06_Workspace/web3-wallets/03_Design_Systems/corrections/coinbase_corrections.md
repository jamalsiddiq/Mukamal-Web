# Structural Corrections — Coinbase / Base App

**Brand:** join.base.app (redirected from coinbase.com)
**Current Score:** Desktop 45 / Mobile 50 (Avg 47.5)
**Target Score:** Desktop 82 / Mobile 80 (Avg 81.0)
**Failures Addressed:** 9 (highest correction count)

---

## Correction Summary

| ID | Heuristic | Severity | Root Cause | Fix |
|----|-----------|:--------:|-----------|-----|
| CB-01 | WCAG Consent | HIGH | Cookie banner fixed-bottom, 120px tall | Replace with 48px top banner, auto-dismiss |
| CB-02 | H10 — Help | HIGH | Zero navigation links | Add full nav: Products, Learn, Developers, Support |
| CB-03 | UX Anti-pattern | CRITICAL | `<video autoplay>` with sound toggle | Replace with static hero or user-initiated play |
| CB-04 | Cognitive Load | HIGH | Cryptic eye macro hero — zero product context | Replace with product screenshot/mockup |
| CB-05 | H2 — Real World | MED | "It pays to be here" — vague | "Trade, Build, and Earn on Base" |
| CB-06 | H4 — Consistency | MED | Only logo in nav — no links | See CB-02 |
| CB-07 | Gestalt — Figure/Ground | MED | Hero image dominates text | 50/50 grid rebalance |
| CB-08 | H1 — Visibility (Mobile) | HIGH | Cookie banner covers ~20% on mobile | See CB-01 |
| CB-09 | Cognitive Load (Mobile) | MED | Social feed overlaps layout | Contained card with max-height |

---

## CSS Corrections

### Cookie Consent — Minimal Top Banner

```css
/* Replace fixed bottom bar with minimal top banner */
.cookie-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px; /* was ~120px bottom bar */
  background: #F5F5F5;
  border-bottom: 1px solid #E5E5E5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  font-size: 14px;
  z-index: 1000;
  transition: transform 300ms ease;
}

.cookie-banner.dismissed {
  transform: translateY(-100%);
}

.cookie-banner__text {
  color: #666;
}

.cookie-banner__actions {
  display: flex;
  gap: 12px;
}

.cookie-banner__accept {
  height: 32px;
  padding: 0 16px;
  background: #0052FF;
  color: #FFFFFF;
  border: none;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.cookie-banner__settings {
  height: 32px;
  padding: 0 16px;
  background: transparent;
  color: #666;
  border: 1px solid #DDD;
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
}
```

### Navigation — Full IA

```css
.nav {
  height: 72px;
  padding: 0 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E5E5;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav__links {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav__link {
  font-size: 16px;
  font-weight: 500;
  color: #1A1A1A;
  text-decoration: none;
  padding: 8px 0;
  position: relative;
}

.nav__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #0052FF;
  transform: scaleX(0);
  transition: transform 200ms ease;
}

.nav__link:hover::after {
  transform: scaleX(1);
}

.nav__cta {
  height: 40px;
  padding: 0 24px;
  background: #0052FF;
  color: #FFFFFF;
  border: none;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
```

### Hero — Product-Focused

```css
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr; /* was full-width media */
  gap: 48px;
  padding: 64px 80px;
  min-height: calc(100vh - 72px);
  align-items: center;
  background: #FFFFFF;
}

.hero__headline {
  font-size: 48px;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #1A1A1A;
}

.hero__subtitle {
  font-size: 18px;
  line-height: 1.5;
  color: #666;
  margin-top: 16px;
  max-width: 480px;
}

.hero__cta {
  height: 56px;
  padding: 0 48px;
  background: #0052FF;
  color: #FFFFFF;
  border: none;
  border-radius: 28px;
  font-size: 18px;
  font-weight: 600;
  margin-top: 32px;
  cursor: pointer;
  transition: all 200ms ease;
}

.hero__cta:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 82, 255, 0.3);
}

.hero__visual {
  max-width: 100%;
  border-radius: 24px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
}

/* NO autoplay video — static product screenshot */
```

### Social Feed — Contained

```css
.social-feed {
  max-height: 200px;
  overflow-y: auto;
  margin: 24px 16px;
  border-radius: 12px;
  background: #FAFAFA;
  padding: 16px;
  border: 1px solid #E5E5E5;
}

.social-feed__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #F0F0F0;
}

.social-feed__item:last-child {
  border-bottom: none;
}
```

### Mobile Overrides

```css
@media (max-width: 768px) {
  .nav {
    padding: 0 16px;
    height: 64px;
  }

  .hero {
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    gap: 32px;
  }

  .hero__headline {
    font-size: 36px;
    text-align: left;
  }

  .hero__cta {
    width: 100%;
    max-width: 327px;
  }

  .cookie-banner {
    height: auto;
    min-height: 48px;
    padding: 8px 16px;
    flex-wrap: wrap;
    gap: 8px;
  }
}
```

---

## Copy Corrections

| Element | Current | Corrected |
|---------|---------|-----------|
| Headline | "It pays to be here." | "Trade, Build, and Earn on Base" |
| Subtitle | "Countless ways to earn with the everything app from Base." | "The L2 ecosystem by Coinbase — fast, low-cost, and open to everyone." |
| CTA | "Download" | "Download Base App" |

---

## Brand Tokens

```json
{
  "brand": "Coinbase / Base App",
  "color": {
    "primary": "#0052FF",
    "surface": "#FFFFFF",
    "surface_muted": "#F5F5F5",
    "text_primary": "#1A1A1A",
    "text_secondary": "#666666",
    "border": "#E5E5E5",
    "success": "#22C55E",
    "error": "#EF4444"
  },
  "typography": {
    "primary": "'Coinbase Sans', -apple-system, sans-serif",
    "headline_weight": 700,
    "body_weight": 400
  },
  "contrast": {
    "primary_on_white": 5.2,
    "text_on_white": 17.4,
    "white_on_primary": 5.2
  }
}
```
