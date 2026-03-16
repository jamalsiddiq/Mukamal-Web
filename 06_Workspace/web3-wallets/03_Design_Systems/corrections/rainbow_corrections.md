# Structural Corrections — Rainbow

**Brand:** rainbow.me
**Current Score:** Desktop 78 / Mobile 70 (Avg 74.0)
**Target Score:** Desktop 87 / Mobile 84 (Avg 85.5)
**Failures Addressed:** 4

---

## Correction Summary

| ID | Heuristic | Severity | Root Cause | Fix |
|----|-----------|:--------:|-----------|-----|
| RB-01 | UX Anti-pattern | HIGH | Chat widget auto-shows with notification badge on first load | Remove auto-show; defer to footer link or 30s delay with no badge |
| RB-02 | Cognitive Load | MED | 3 competing focal points (3D rainbow, sparkle, phone mockup) | Reduce to 2: headline + phone mockup. Defer 3D rainbow to below fold |
| RB-03 | UX Anti-pattern | HIGH | Chat widget persists on mobile — covers actionable area | Same as RB-01 |
| RB-04 | Cognitive Load | MED | Phone mockup absolute positioning overflows at 375px | Stack below CTAs, constrain to `240px` width |

---

## CSS Corrections

### Chat Widget — Remove Auto-Show

```javascript
// Option A (Recommended): Remove auto-initialization entirely
// Move chat trigger to footer
// Delete: window.Intercom('boot', { show: true })

// Option B: Delay with no badge
setTimeout(() => {
  window.Intercom('boot', {
    hide_default_launcher: false,
    custom_launcher_selector: null
  });
}, 30000); // 30-second delay

// Remove notification badge
window.Intercom('update', { 
  unread_count: 0 
});
```

```css
/* Footer chat link instead of floating widget */
.footer-chat-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
  text-decoration: underline;
  cursor: pointer;
}

.footer-chat-link:hover {
  color: #1A1A1A;
}
```

### Hero — Simplified Visual Hierarchy

```css
.hero {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 48px;
  align-items: center;
  padding: 64px 80px;
  min-height: calc(100vh - 72px);
}

/* Remove 3D rainbow from hero — move to scroll-triggered section */
.hero-rainbow-3d {
  display: none; /* Hidden in hero; shown via IntersectionObserver below fold */
}

/* Remove sparkle decoration from hero */
.hero-sparkle {
  display: none;
}

.hero-phone-mockup {
  width: 300px;
  height: auto;
  position: relative; /* was absolute — caused overflow on mobile */
  border-radius: 32px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
}
```

### Scroll-Triggered 3D Rainbow

```css
.below-fold-rainbow {
  width: 320px;
  height: auto;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 600ms ease, transform 600ms ease;
}

.below-fold-rainbow.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
// IntersectionObserver for scroll-triggered reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

observer.observe(document.querySelector('.below-fold-rainbow'));
```

### Mobile Layout — Stacked Phone Mockup

```css
@media (max-width: 768px) {
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 16px;
    gap: 24px;
  }

  .hero-phone-mockup {
    width: 240px; /* constrained from overflow */
    margin-top: 32px;
    position: relative;
    order: 3; /* After headline + CTAs */
  }

  .hero-ctas {
    order: 2;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 327px;
  }
}
```

---

## Brand Tokens

```json
{
  "brand": "Rainbow",
  "color": {
    "surface": "#E8F4FD",
    "surface_white": "#FFFFFF",
    "text_primary": "#1A1A1A",
    "text_secondary": "#666666",
    "accent_orange": "#FF6B35",
    "accent_pink": "#FF69B4",
    "accent_rainbow": "linear-gradient(135deg, #FF6B35, #FF69B4, #A855F7, #3B82F6, #22C55E)",
    "success": "#22C55E",
    "error": "#EF4444"
  },
  "typography": {
    "primary": "'Rainbow Sans', -apple-system, sans-serif",
    "headline_weight": 800,
    "body_weight": 400
  },
  "contrast": {
    "text_on_surface": 14.8,
    "white_on_orange": 3.1,
    "white_on_pink": 3.4
  }
}
```
