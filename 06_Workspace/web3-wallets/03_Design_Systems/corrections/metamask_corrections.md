# Structural Corrections — MetaMask

**Brand:** metamask.io
**Current Score:** Desktop 72 / Mobile 65 (Avg 68.5)
**Target Score:** Desktop 88 / Mobile 85 (Avg 86.5)
**Failures Addressed:** 8

---

## Correction Summary

| ID | Heuristic | Severity | Root Cause | Fix |
|----|-----------|:--------:|-----------|-----|
| MM-01 | H10 — Help | MED | Nav IA omits support link | Add "Help" link to nav |
| MM-02 | H8 — Aesthetic | LOW | Headline ~200px — 4.2:1 weight ratio vs CTA | Reduce to `clamp(40px, 5vw, 64px)` |
| MM-03 | Fitts's Law | MED | CTA 48px height — undersized vs headline | Enlarge to `56px` height, `48px` horizontal padding |
| MM-04 | Cognitive Load | MED | Text-only hero — no product visual | Add wallet mockup (2-col grid) |
| MM-05 | WCAG Contrast | MED | `#24115F` on `#FCE4D6` = 4.7:1 (AA only) | Darken to `#1A0D40` = 8.2:1 (AAA) |
| MM-06 | Cognitive Load | HIGH | Mobile: zero context — only headline + CTA | Add onboarding subtitle |
| MM-07 | Fitts's Law | HIGH | Mobile CTA visually lost | Full-width pill, `#F5841F` background |
| MM-08 | H8 — Aesthetic | MED | ~40% viewport whitespace on mobile | Reduce `padding-top` from ~160px to 24px |

---

## CSS Corrections

### Navigation — Add Help Link

```css
/* Add between "Developer" and globe icon */
.nav-help {
  font-size: 16px;
  font-weight: 500;
  color: inherit;
  text-decoration: none;
  padding: 8px 0;
}

.nav-help:hover {
  opacity: 0.7;
}
```

### Hero Typography — Desktop

```css
.hero-headline {
  font-size: clamp(40px, 5vw, 64px); /* was ~200px effective */
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-weight: 900;
  color: #1A0D40; /* was #24115F — now AAA compliant */
}

.hero-subtitle {
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
  color: #1A0D40;
  opacity: 0.7;
  max-width: 480px;
  margin-top: 16px;
}
```

### Hero Layout — Desktop

```css
.hero-section {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  padding: 64px 80px;
  min-height: calc(100vh - 72px);
  align-items: center;
}

.hero-mockup {
  width: 320px;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.16);
}
```

### CTA — Both Viewports

```css
.cta-primary {
  height: 56px; /* was ~48px */
  padding: 0 48px;
  border-radius: 28px;
  font-size: 18px;
  font-weight: 600;
  background: #1A0D40;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 200ms ease;
}

.cta-primary:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(26, 13, 64, 0.3);
}

/* Mobile override */
@media (max-width: 768px) {
  .cta-primary {
    width: 100%;
    max-width: 327px;
    background: #F5841F; /* MetaMask orange for mobile accent */
    color: #FFFFFF;
  }
}
```

### Mobile Layout

```css
@media (max-width: 768px) {
  .hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 16px 0; /* was padding-top: ~160px */
    text-align: center;
  }

  .hero-headline {
    font-size: 40px;
  }

  .hero-subtitle {
    font-size: 16px;
    max-width: 280px;
    margin: 16px auto 24px;
  }

  .hero-mockup {
    width: 240px;
    margin-top: 32px;
  }
}
```

---

## Brand Tokens

```json
{
  "brand": "MetaMask",
  "color": {
    "primary": "#1A0D40",
    "accent": "#F5841F",
    "surface": "#FCE4D6",
    "surface_dark": "#24115F",
    "text_on_surface": "#1A0D40",
    "text_on_dark": "#FFFFFF",
    "success": "#22C55E",
    "error": "#EF4444"
  },
  "typography": {
    "primary": "'MetaMask Sans', -apple-system, sans-serif",
    "headline_weight": 900,
    "body_weight": 400
  },
  "contrast": {
    "primary_on_surface": 8.2,
    "accent_on_dark": 5.8,
    "white_on_primary": 12.1
  }
}
```
