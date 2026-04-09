---
project: mukamal-v3
stitch_project_id: 2429643696881362422
framework: Next.js 15 + TypeScript + Tailwind CSS v4 + shadcn/ui
last_updated: 2026-04-05
stitch_format: true
---

# Mukamal V3 — Design System (Stitch Format)

> **Machine-readable design spec** — optimized for AI agent consumption.
> Follows Google Stitch DESIGN.md format: Color System → Typography → Spacing → Layout → Components → Visual Details → Motion → DON'Ts.
> This file is the single source of truth. `src/app/globals.css` is the CSS implementation of these tokens.
> Changes here must be reflected in globals.css immediately.

---

## 1. Brand Identity

| Field | Value |
|-------|-------|
| **Name** | Mukamal |
| **Tagline** | Design That Converts. |
| **Voice** | Direct, expert, clinical — with editorial gravitas. Zero filler. |
| **Aesthetic** | **Dark Luxury**: Off-black precision, bold uppercase display type, lime-only accent, glass surfaces, noise texture. Every element earns its place. |
| **Theme** | Dual-mode: **Dark Luxury** (default) + **Light Warm** (alt). Toggled via `data-theme="light"` on `<html>`. |
| **Inspiration** | Award-winning dark interfaces — clinical precision with luxury depth. Glass cards, noise overlay, lime energy on dark canvas. |
| **Differentiator** | No blue, no purple, no gradients-for-decoration. Lime (#C6F135) is the only accent. Everything else is neutral. |

**Logo:**
- SVG: `public/brand/mukamal_logo.svg`
- Height: 48px in nav, 24px in footer, auto width
- Variants: `logo-light.png` (for dark bg), `logo-dark.png` (for lime band)
- Never use text-only in nav. Always use the SVG/PNG asset.

---

## 2. Color System

### 2.1 Core Palette — Dark Luxury
```
Background:                      #080808     — Near-black (NOT pure #000000)
Background Elevated:             #0f0f0f     — Subtle lift for nav, modals
Surface:                         rgba(255, 255, 255, 0.03)  — Glass card base
Card:                            rgba(255, 255, 255, 0.03)  — Default card bg
Card Highest:                    rgba(255, 255, 255, 0.06)  — Elevated card / hover
Border:                          rgba(255, 255, 255, 0.08)  — 1px separator
Border Hover:                    rgba(255, 255, 255, 0.15)  — On interaction
```

### 2.2 Accent — Mukamal Lime
```
Accent:                   #C6F135   — Primary lime
Accent Alt:               #aad306   — Pressed/active state
Accent Contrast Text:     #0e1a00   — Dark text on lime background
Accent Dim:               rgba(198, 241, 53, 0.60)   — Dimmed lime for secondary use
Accent Subtle:            rgba(198, 241, 53, 0.08)   — Lime-tinted chips/badges
Accent Glow:              rgba(198, 241, 53, 0.15)   — Button glow shadow
```

### 2.3 Accent Opacity Scale
```
accent-03:  rgba(198, 241, 53, 0.03)   — Barely visible tint
accent-05:  rgba(198, 241, 53, 0.05)   — Geometric fill
accent-08:  rgba(198, 241, 53, 0.08)   — Badge/chip bg
accent-12:  rgba(198, 241, 53, 0.12)   — Hover highlight
accent-25:  rgba(198, 241, 53, 0.25)   — Strong glow
```

### 2.4 Text Hierarchy
```
Text Primary:    #F0EDE6              — Warm off-white (headlines, primary content)
Text Dim:        rgba(240, 237, 230, 0.7)  — Body text, descriptions
Text Muted:      rgba(240, 237, 230, 0.5)  — Captions, labels, overlines
```

### 2.5 Semantic Colors
```
Success:   #C6F135   — Lime (brand-aligned success)
Error:     #ff4d4d   — Red
```

### 2.6 Glass Surface Tokens
```
Glass BG:      rgba(255, 255, 255, 0.03)
Glass Blur:    blur(10px)
Glass Border:  1px solid rgba(255, 255, 255, 0.08)
```

### 2.7 Shadow Tokens — Lime-Tinted Depth
```
Card:      0 1px 2px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.4)
Glow:      0 0 40px rgba(198, 241, 53, 0.05), 0 0 80px rgba(198, 241, 53, 0.03)
Elevated:  0 8px 40px rgba(0, 0, 0, 0.6)
Neon:      0 0 24px rgba(198, 241, 53, 0.12)
```

### 2.8 Lime Band — Colored Section Break
```
Background:    #C6F135
Text color:    #0e1a00 (dark text on lime — always dark text on lime)
Usage:         One prominent section per page (CTA band, stats highlight)
```

### 2.9 CSS Custom Properties
```css
/* Surfaces */
--color-background:      #080808;
--color-bg:              #080808;
--color-bg-elevated:     #0f0f0f;
--color-surface:         rgba(255, 255, 255, 0.03);
--color-card:            rgba(255, 255, 255, 0.03);
--color-card-highest:    rgba(255, 255, 255, 0.06);
--color-border:          rgba(255, 255, 255, 0.08);
--color-border-hover:    rgba(255, 255, 255, 0.15);

/* Accent */
--color-accent:          #C6F135;
--color-accent-alt:      #aad306;
--color-accent-contrast: #0e1a00;
--color-accent-dim:      rgba(198, 241, 53, 0.60);
--color-accent-subtle:   rgba(198, 241, 53, 0.08);
--color-accent-glow:     rgba(198, 241, 53, 0.15);

/* Text */
--color-text:            #F0EDE6;
--color-text-dim:        rgba(240, 237, 230, 0.7);
--color-text-muted:      rgba(240, 237, 230, 0.5);

/* Semantic */
--color-error:           #ff4d4d;
--color-success:         #C6F135;

/* Glass */
--glass-bg:              rgba(255, 255, 255, 0.03);
--glass-blur:            blur(10px);
--glass-border:          1px solid rgba(255, 255, 255, 0.08);

/* Shadows */
--shadow-card:           0 1px 2px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.4);
--shadow-glow:           0 0 40px rgba(198, 241, 53, 0.05), 0 0 80px rgba(198, 241, 53, 0.03);
--shadow-elevated:       0 8px 40px rgba(0, 0, 0, 0.6);
--shadow-neon:           0 0 24px rgba(198, 241, 53, 0.12);
```

### 2.10 Light Mode — Warm Professional

> **Inspiration:** Finovate consulting theme — warm cream surfaces, dark forest-green text, lime accent preserved, photography-forward, rounded card system with real shadows. Premium but approachable.

#### 2.10.1 Core Palette — Light Warm
```
Background:                      #F7F5F0     — Warm cream (NOT pure white)
Background Elevated:             #FFFFFF     — Pure white for nav, modals, elevated cards
Surface:                         #EFECE5     — Warm gray for secondary surfaces
Card:                            #FFFFFF     — White cards with real shadows
Card Highest:                    #F7F5F0     — Subtle cream for nested/secondary cards
Border:                          rgba(30, 58, 47, 0.10)  — Dark green at 10%
Border Hover:                    rgba(30, 58, 47, 0.20)  — Strengthened on interaction
```

#### 2.10.2 Accent — Lime (Preserved)
```
Accent:                   #A4D233   — Lime adjusted for light contrast (slightly deeper than dark mode #C6F135)
Accent Alt:               #8FBB1E   — Pressed/active (darker for light bg visibility)
Accent Contrast Text:     #FFFFFF   — White text on lime buttons (light mode only)
Accent Dim:               rgba(164, 210, 51, 0.70)   — Slightly dimmed
Accent Subtle:            rgba(164, 210, 51, 0.10)   — Lime-tinted chips/badges on light
Accent Glow:              rgba(164, 210, 51, 0.20)   — Button glow
```

#### 2.10.3 Text Hierarchy — Light Mode
```
Text Primary:    #1E3A2F              — Dark forest green (NOT black — warmer, premium)
Text Dim:        rgba(30, 58, 47, 0.75)    — Body text, descriptions
Text Muted:      rgba(30, 58, 47, 0.50)    — Captions, labels, overlines
```

#### 2.10.4 Dark Section — Forest Green (Featured Sections)
```
Background:    #234338               — Deep forest green
Text:          #F0EDE6               — Warm off-white (same as dark mode text)
Text Dim:      rgba(240, 237, 230, 0.7)
Card BG:       rgba(255, 255, 255, 0.06)  — Glass on green
Card Border:   rgba(255, 255, 255, 0.10)
Usage:         Philosophy section, featured testimonial, footer — max 2 dark sections per page
```

#### 2.10.5 Semantic Colors — Light Mode
```
Success:   #A4D233   — Lime (brand-aligned)
Error:     #D93025   — Slightly muted red for light bg
```

#### 2.10.6 Shadow Tokens — Light Mode (Real Shadows)
```
Card:      0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)
Elevated:  0 4px 24px rgba(0,0,0,0.08), 0 12px 48px rgba(0,0,0,0.04)
Hover:     0 8px 32px rgba(0,0,0,0.10)
Subtle:    0 1px 2px rgba(0,0,0,0.03)
```

#### 2.10.7 CSS Custom Properties — Light Mode Override
```css
[data-theme="light"] {
  /* Surfaces */
  --color-background:      #F7F5F0;
  --color-bg:              #F7F5F0;
  --color-bg-elevated:     #FFFFFF;
  --color-surface:         #EFECE5;
  --color-card:            #FFFFFF;
  --color-card-highest:    #F7F5F0;
  --color-border:          rgba(30, 58, 47, 0.10);
  --color-border-hover:    rgba(30, 58, 47, 0.20);

  /* Accent */
  --color-accent:          #A4D233;
  --color-accent-alt:      #8FBB1E;
  --color-accent-contrast: #FFFFFF;
  --color-accent-dim:      rgba(164, 210, 51, 0.70);
  --color-accent-subtle:   rgba(164, 210, 51, 0.10);
  --color-accent-glow:     rgba(164, 210, 51, 0.20);

  /* Text */
  --color-text:            #1E3A2F;
  --color-text-dim:        rgba(30, 58, 47, 0.75);
  --color-text-muted:      rgba(30, 58, 47, 0.50);

  /* Semantic */
  --color-error:           #D93025;
  --color-success:         #A4D233;

  /* Glass — becomes frosted white on light */
  --glass-bg:              rgba(255, 255, 255, 0.70);
  --glass-blur:            blur(12px);
  --glass-border:          1px solid rgba(30, 58, 47, 0.08);

  /* Shadows — real shadows replace glows */
  --shadow-card:           0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06);
  --shadow-glow:           0 4px 24px rgba(164, 210, 51, 0.08);
  --shadow-elevated:       0 4px 24px rgba(0,0,0,0.08), 0 12px 48px rgba(0,0,0,0.04);
  --shadow-neon:           0 0 24px rgba(164, 210, 51, 0.10);

  /* Dark section (for featured blocks) */
  --color-dark-section-bg:         #234338;
  --color-dark-section-text:       #F0EDE6;
  --color-dark-section-text-dim:   rgba(240, 237, 230, 0.7);
  --color-dark-section-card:       rgba(255, 255, 255, 0.06);
  --color-dark-section-border:     rgba(255, 255, 255, 0.10);

  /* Noise */
  --noise-opacity: 0.02;
}
```

#### 2.10.8 Component Differences — Light Mode

**Nav:**
```
Background:    #FFFFFF or rgba(255, 255, 255, 0.90)
Backdrop:      blur(12px) saturate(180%)
Border-bottom: 1px solid rgba(30, 58, 47, 0.08)
Text:          --color-text (#1E3A2F)
CTA:           Lime pill with white text
Shadow:        0 1px 3px rgba(0,0,0,0.04)
```

**Cards:**
```
Background:    #FFFFFF
Border:        none (use shadow instead)
Border-radius: 16px
Shadow:        --shadow-card
Hover:         --shadow-hover + translateY(-2px)
```

**Buttons:**
| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| **Primary** | `#A4D233` | `#FFFFFF` | none | `#8FBB1E`, shadow lift |
| **Secondary** | transparent | `#1E3A2F` | `1px solid rgba(30,58,47,0.15)` | border darkens |
| **Ghost** | transparent | text-dim | none | color: text |
| **Dark** | `#1E3A2F` | `#FFFFFF` | none | `#234338` |

**Overlines:**
```
Color:    #1E3A2F (dark green, NOT lime on light backgrounds)
          #A4D233 lime ONLY inside dark sections (#234338 bg)
```

**Service Cards (Finovate-inspired):**
```
Layout:         4-column grid, equal width
Card:           White bg, 16px radius, shadow, no border
Image:          aspect-[4/5] rounded-xl overflow-hidden, object-cover
Icon badge:     48px circle, lime bg (#A4D233), white icon, positioned top-left overlapping image
Title:          DM Sans 600, below image
Arrow:          Circle icon button, border, right-aligned
Hover:          Card lifts (translateY -4px), shadow deepens
```

**Bento Cards (Finovate n=2 "Who We Are" section):**
```
Layout:         3-column grid, center card taller/accent
Default card:   White bg, 16px radius, subtle shadow
Accent card:    Lime bg (#A4D233), white text, image with organic blob mask
Badge:          Pill tag (border + text), top-left
Arrow:          Circle icon, top-right
Image:          Bottom half of card, rounded corners
```

**Philosophy / Dark Section:**
```
Background:    #234338 (forest green)
Text:          #F0EDE6 (warm off-white)
Cards:         Glass effect — rgba(255,255,255,0.06) bg, 1px white/10 border
Icons:         Lime (#A4D233) at 100%
Stats:         Below section, white cards on cream bg, numbers with lime accent border-left
Image:         Full-bleed rounded-2xl below dark section, overlapping both zones
```

**Stats (Light Mode):**
```
Number:   Bebas Neue, --color-text, with 2px left border in lime
Label:    Space Mono, UPPERCASE, --color-text-muted
Layout:   4 across, white card bg or cream bg, subtle bottom border between
```

**Industries / List Section:**
```
Layout:    Split — image left (60%), list right (40%)
List:      Vertical stack, 1px dividers, arrow icon right, hover: bg-accent-subtle
Image:     Rounded-2xl, aspect-[3/4]
```

**Testimonial (Finovate-inspired):**
```
Layout:    2-column — left: client quote, right: lime accent card with avatar + metric
Quote:     DM Sans italic, --color-text-dim, 18px
Avatar:    48px circle, lime border
Metric:    Large Bebas Neue number (e.g. "1.6x"), lime accent
Badge:     Lime pill "Case Study" tag
```

**Blog / Insights Cards:**
```
Layout:    3-column grid
Card:      White bg, image top (rounded-xl), tag pill, title, description
Tag:       Lime bg pill with white text OR border pill
Hover:     Shadow deepens, image zooms 1.03
```

**FAQ (Light Mode):**
```
Item border:   1px solid rgba(30, 58, 47, 0.08) bottom
Trigger:       DM Sans 600, --color-text
Content:       DM Sans 400, --color-text-dim
Icon:          + / × at 20px, lime accent, rotates on open
Accent:        Small lime bar left of open item
```

**Footer (Light Mode — Dark Section):**
```
Background:    #234338 (forest green, matches dark section)
Text:          #F0EDE6 (warm off-white)
Logo:          Light variant
Links:         rgba(240, 237, 230, 0.7), hover: full white
CTA:           Lime pill
Dividers:      rgba(255, 255, 255, 0.08)
```

**Logo Strip (Light Mode):**
```
Background:    transparent or #F7F5F0
Logos:         Grayscale (filter: grayscale(1) opacity(0.5)), hover: full color
Border:        1px solid rgba(30, 58, 47, 0.06) top and bottom
```

#### 2.10.9 Photography Direction (Light Mode)

Light mode is photography-forward (vs. dark mode's glass-and-texture approach):
```
Style:       Warm, natural lighting. Professional but human. Diverse subjects.
Treatment:   Full color (no filters), rounded corners (16px), subtle shadow
Aspect:      Hero: 16:9. Cards: 4:5 or 3:4. Testimonial: square.
Masks:       Organic blob masks for accent cards (SVG clip-path, lime bg behind)
Overlap:     Images can overlap section boundaries for depth (negative margin trick)
```

#### 2.10.10 Light Mode Section Map

| Section | Background | Text Color | Special |
|---------|-----------|------------|---------|
| **Nav** | White (frosted) | Dark green | Shadow instead of border |
| **Hero** | Cream (#F7F5F0) | Dark green | Full-bleed photo, lime CTA |
| **Logo Strip** | Cream | — | Grayscale logos |
| **Who We Are / Bento** | Cream | Dark green | Center card lime bg with blob mask |
| **Services** | White (#FFFFFF) | Dark green | Photo cards with lime icon badges |
| **Philosophy** | Forest green (#234338) | Off-white | Glass cards, lime icons |
| **Stats** | Cream | Dark green | Lime left-border on numbers |
| **Featured Image** | Cream | Dark green | Full-width rounded photo |
| **Industries** | Cream | Dark green | Split layout, image + list |
| **Testimonial** | Cream | Dark green | Quote + lime accent card |
| **Insights/Blog** | White | Dark green | 3-col card grid |
| **Footer** | Forest green (#234338) | Off-white | Dark section, lime CTA |

---

## 3. Typography

### 3.1 Font Stack
| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| **Display** | `Bebas Neue` | sans-serif | H1, H2, hero headlines, section titles — UPPERCASE |
| **Body** | `DM Sans` | sans-serif | Nav, body, UI labels, buttons, descriptions |
| **Mono** | `Space Mono` | monospace | Overlines, data labels, code, version tags |

### 3.2 Type Scale
| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `--fs-hero` | clamp(100px, 12vw, 160px) desktop / clamp(56px, 14vw, 80px) mobile | 400 | 0.9 | Hero headline |
| `--fs-h1` | 96px desktop / 56px mobile | 400 | 1.0 | Page titles |
| `--fs-h2` | 72px desktop / 40px mobile | 400 | 1.0 | Section headers |
| `--fs-h3` | 36px desktop / 28px mobile | 400 | 1.1 | Card titles, sub-sections |
| `--fs-h4` | 24px desktop / 20px mobile | 500 | 1.25 | Feature labels |
| `--fs-body-lg` | 20px | 400 | 1.7 | Lead paragraphs |
| `--fs-body` | 16px | 400 | 1.7 | Body paragraphs |
| `--fs-body-sm` | 14px | 400 | 1.6 | Small body |
| `--fs-label` | 12px | 500 | 1.3 | Overlines (UPPERCASE), tags |

### 3.3 Display Type Rules
- Bebas Neue is ALWAYS uppercase (the font is designed for it)
- Letter-spacing: 0.02em on H1, 0.04em on H2
- Bebas Neue at display sizes creates vertical rhythm through tight line-height (0.9-1.0)
- Never use Bebas Neue for body text or UI labels

### 3.4 Section Overline Pattern
```
Font:            Space Mono, uppercase
Size:            12px (--fs-label)
Letter-spacing:  0.12em
Color:           --color-accent (#C6F135) — ALWAYS lime, never muted
Margin-bottom:   12px before the heading
```

### 3.5 Heading + Body Block Pattern
```
Heading:   Bebas Neue, --color-text (#F0EDE6) at full opacity
Body:      DM Sans 400, --color-text-dim (rgba 0.7) — directly below heading
Gap:       16px between heading and body
Rule:      The opacity shift IS the visual separator — no borders needed
```

---

## 4. Spacing (8px Grid)

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-1` | 0.5rem (8px) | Micro gaps, icon padding |
| `--spacing-2` | 1rem (16px) | Component internal spacing |
| `--spacing-3` | 1.5rem (24px) | Card padding |
| `--spacing-4` | 2rem (32px) | Component gaps |
| `--spacing-6` | 3rem (48px) | Small section padding |
| `--spacing-8` | 4rem (64px) | Medium section padding |
| `--spacing-12` | 6rem (96px) | Large section padding |
| `--spacing-16` | 8rem (128px) | Max section vertical rhythm |
| `--spacing-24` | 12rem (192px) | Hero padding |

---

## 5. Layout

```
Container max-width:   1280px
Container wide:        1440px
Gutter:                clamp(1.5rem, 4vw, 3rem)
Column grid:           12-column, 24px gap
Card grid:             auto-fit, minmax(300px, 1fr), 24px gap
Bento grid:            40/60 or 33/67 splits — asymmetric preferred
```

### 5.1 Section Anatomy
Every section follows this structure:
1. `overline` — Space Mono, uppercase, lime (#C6F135)
2. `heading` — Bebas Neue, uppercase, warm off-white
3. `body` — DM Sans 400, text-dim (0.7 opacity), directly below heading
4. `visual element` — REQUIRED. Every section has a visual (glass card, data viz, screenshot, gradient, or icon grid)
5. `CTA` — Optional pill button or arrow link

---

## 6. Components

### 6.1 Glass Cards (Core Component)
```
Background:     var(--glass-bg) — rgba(255, 255, 255, 0.03)
Backdrop:       blur(10px)
Border:         1px solid rgba(255, 255, 255, 0.08)
Border-radius:  16px (--radius-lg)
Padding:        24px (--spacing-3)
```

**Hover:**
```css
border-color: rgba(255, 255, 255, 0.14);
transition: border-color 0.2s;
```

**Lime-accent hover (CTA cards / spotlight):**
```css
border-color: rgba(198, 241, 53, 0.2);
```

### 6.2 Buttons
| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| **Primary** | `#C6F135` | `#0e1a00` | none | `#aad306`, subtle lift |
| **Secondary** | transparent | `#F0EDE6` | `1px solid rgba(255,255,255,0.15)` | border brightens |
| **Ghost** | transparent | text-dim | none | color: text |
| **Lime Outline** | transparent | `#C6F135` | `1px solid #C6F135` | bg: `rgba(198,241,53,0.08)` |

```
Padding:       10px 20px
Border-radius: 100px (pill)
Font:          DM Sans 500, 14px
Transition:    all 0.2s
```

**Magnetic micro-interaction:** CTAs attract to cursor within 60px radius (max 8px offset).

### 6.3 Navigation Bar
```
Background:    rgba(8, 8, 8, 0.85) OR var(--color-bg-elevated)
Backdrop:      blur(12px) saturate(180%)
Border-bottom: 1px solid rgba(255, 255, 255, 0.08)
Height:        64px
Logo:          48px height
Nav links:     DM Sans 500, text-muted, hover: text
CTA:           Primary lime pill button
```

### 6.4 Section Dividers / 1px Lines
```
Horizontal rule:   1px solid rgba(255, 255, 255, 0.08)
Vertical divider:  1px solid rgba(255, 255, 255, 0.08)
Usage:             Between nav and hero, between footer columns, in stats
Never:             Use them as section separators (use spacing/darkness shift instead)
```

### 6.5 Icons
```
Size:        24px (UI), 32px (feature), 48px (section hero)
Style:       Outlined stroke (2px)
Color:       text-muted default, accent for highlighted states
Container:   48px × 48px rounded-lg (8px), bg: rgba(198,241,53,0.08)
```

### 6.6 Lime Band — Colored Section Break
```
Background:    #C6F135
Text color:    #0e1a00 (dark on lime — high contrast)
Padding:       96px top + bottom
Usage:         ONE prominent section per page (CTA band, stats, key message)
```

### 6.7 Stats / Metrics Display
```
Number:   Bebas Neue, --fs-h2 or larger, --color-text
Label:    Space Mono, --fs-label, UPPERCASE, --color-text-muted
Layout:   3-4 stats horizontal, 1px vertical dividers between
```

### 6.8 Logo / Client Strip
```
Background:    transparent or subtle glass
Logos:         Grayscale (filter: grayscale(1) opacity(0.4)), hover: full color
Layout:        Horizontal marquee (CSS animation) or static flex
Gap:           4rem between logos
Border:        1px solid rgba(255,255,255,0.06) top and bottom
```

### 6.9 Accordion / FAQ
```
Item border:   1px solid rgba(255,255,255,0.08) bottom
Trigger:       DM Sans 600, --color-text
Content:       DM Sans 400, --color-text-dim
Icon:          + / × at 20px, text-muted, rotates on open
Animation:     max-height transition, 0.3s ease
```

---

## 7. Visual Elements (Every Section Must Have One)

**RULE: No section is allowed to be text-only. Every section requires a supporting visual element.**

### 7.1 Noise Overlay (Global)
```
Applied to:     Root layout, fixed position, covers full viewport
SVG filter:     feTurbulence, fractalNoise, baseFrequency 0.9, 4 octaves
Opacity:        0.04 (4%)
Pointer-events: none
z-index:        9999
```

### 7.2 Glass Cards as Visual Elements
Glass cards with subtle border glow serve as the primary visual pattern. Combined with data, icons, or screenshots inside.

### 7.3 Product UI Screenshots
```
Wrapper:    rounded-xl (16px), border: 1px solid rgba(255,255,255,0.08), shadow: --shadow-elevated
Chrome:     Optional browser frame for authenticity
Scale:      max-width 80% of container, centered or offset
```

### 7.4 Geometric Background Elements (Subtle)
```
Grid pattern:    rgba(255,255,255,0.06) lines
Geometric fill:  rgba(198, 241, 53, 0.025) — barely visible lime shapes
Geometric edge:  rgba(198, 241, 53, 0.06) — subtle lime outlines
Usage:           Hero background, section accents
```

### 7.5 Icon Grids / Feature Diagrams
```
Layout:    2×2 or 3×3 grid of icon+label pairs
Cards:     48px icon container, 8px rounded, lime-subtle bg
Animation: stagger reveal on scroll (50ms per item)
```

### 7.6 Gradient Accent Line (1px)
```
background: linear-gradient(90deg, transparent, #C6F135, transparent)
Usage:      Under nav on scroll, section breaks, decorative emphasis
```

---

## 8. Motion System

**Library:** GSAP 3.12.5 + ScrollTrigger
**Base Ease:** `cubic-bezier(0.2, 0, 0, 1)` (smooth deceleration)
**Alt Ease:** `cubic-bezier(0.65, 0, 0.35, 1)` (in-out for state changes)

### Named Patterns
| Pattern | Initial State | Final State | Duration | Use |
|---------|--------------|-------------|----------|-----|
| `reveal-up` | `y: 32, opacity: 0` | `y: 0, opacity: 1` | 0.8s | Text blocks, cards |
| `reveal-fade` | `opacity: 0` | `opacity: 1` | 0.5s | Images, visual elements |
| `stagger-grid` | `y: 24, opacity: 0` per item | `y: 0, opacity: 1` | 0.6s | Card grids (0.08s-0.1s stagger) |
| `char-stagger` | Per-char `opacity: 0` | `opacity: 1` | 0.03s | Hero H1 only |
| `magnetic` | — | cursor attraction max 8px | — | CTA buttons |
| `counter-up` | 0 | target number | 2.0s | Stats section |
| `draw-line` | `scaleX: 0` | `scaleX: 1` | 1.0s | Gradient accent lines |

### Scroll Trigger Defaults
```
start:          "top 80%"
end:            "bottom 20%"
toggleActions:  "play none none reverse"
```

### GSAP Duration Limits (Hard Caps)
```
Hero total:        1.5s max
Section reveal:    0.8s max
Micro-interaction: 0.3s max
Count-up:          2.0s max
```

### CSS Transitions (Non-GSAP)
```css
/* Glass card hover */
transition: border-color 0.2s;

/* Button hover */
transition: all 0.2s;

/* Card grow */
transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1),
            box-shadow 0.3s cubic-bezier(0.2, 0, 0, 1);
```

### Accessibility Guard
All GSAP animations must be wrapped in `prefers-reduced-motion` check:
```ts
gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  // animations here
  return () => ctx.revert(); // cleanup
});
```

---

## 9. Aesthetic Directives

### DO
- Use **Bebas Neue** (uppercase) for all H1, H2 headlines
- Use **DM Sans** for body, nav, buttons, UI
- Use **Space Mono** for overlines, labels, data — always UPPERCASE, always lime
- Use the **3-level text hierarchy** (#F0EDE6 → rgba 0.7 → rgba 0.5) strictly
- Use **1px borders** (`rgba(255,255,255,0.08)`) for glass cards and separators
- Apply **glass morphism** to cards (rgba bg + blur + 1px border)
- Include a **visual element** in every section — no text-only sections
- Use the **lime band** (`#C6F135` background) for ONE section per page
- Use **pill-shaped buttons** (border-radius: 100px)
- Apply **noise overlay** at 4% opacity globally
- Use **overlines** in Space Mono uppercase lime before every H2
- Include **lime-tinted icon containers** (48px, rounded, accent-subtle bg)
- Keep navigation **frosted glass** (dark bg + blur + 1px border)
- Wrap all GSAP in `prefers-reduced-motion` guards

### DON'T
- No pure black (#000000) in dark mode — use #080808
- No pure white (#FFFFFF) as page background in light mode — use #F7F5F0 (warm cream)
- No black text in light mode — use dark forest green (#1E3A2F) for warmth
- No blue or purple accents in either mode — lime only
- No text-only sections — every section needs a visual
- No high-opacity shadows in dark mode — use rgba at 0.03-0.15 for glows
- No AI-style fluff copy ("Elevate your business") — surgical, data-backed only
- No font families beyond the 3-font stack (Bebas Neue / DM Sans / Space Mono)
- No Instrument Serif, Manrope, or Inter — those are NOT Mukamal fonts
- No gradients as decoration — lime is flat, accent opacity scale for depth
- No equal-width column grids for content — prefer asymmetric bento (40/60, 33/67)
- No lime overlines on light backgrounds — use dark green; lime overlines ONLY on dark sections
- No mixing modes — each page is fully dark OR fully light (except dark sections within light mode)

---

## 10. Page-Level Section Map

| Section | Visual Element | Overline | Heading Type | CTA |
|---------|---------------|----------|-------------|-----|
| **Nav** | Logo (SVG/PNG) | — | — | Lime pill button |
| **Hero** | Geometric bg + noise | Space Mono ticker | Bebas Neue H1 | Lime + ghost |
| **Logo Strip** | Client logos (grayscale → color) | "Trusted by" | — | — |
| **Services** | Glass bento cards with icons | LIME OVERLINE | Bebas Neue H2 | Arrow link |
| **Audit Engine** | Product UI screenshot | LIME OVERLINE | Bebas Neue H2 | Lime button |
| **Stats / Proof** | 3 stats with 1px dividers | LIME OVERLINE | Bebas Neue H2 | — |
| **Process** | Timeline with draw-line | LIME OVERLINE | Bebas Neue H2 | — |
| **Lime Band** | Geometric accent | — | DM Sans H2 (dark on lime) | Lime outline → dark |
| **Case Studies** | Glass cards with screenshots | LIME OVERLINE | Bebas Neue H2 | Arrow links |
| **FAQ** | Accordion | LIME OVERLINE | Bebas Neue H2 | — |
| **Footer** | Logo, 1px column dividers | — | — | Lime pill CTA |

---

## 11. Stitch Export / MCP Integration

This DESIGN.md is formatted for AI agent consumption following Google Stitch DESIGN.md best practices:
- **Deterministic parsing**: Sections use explicit headings. Tokens use code blocks.
- **Machine-readable tokens**: All values are exact (hex, rem, px, rgba).
- **Component states documented**: Hover, active, focus defined for all interactive components.
- **Agent instruction**: When generating or modifying any UI component, reference this file. Use only documented token values. Match component states exactly. Do not introduce colors, radii, shadows, or fonts not listed here.
- **CLAUDE.md sync**: This file is the design authority. `globals.css` is the implementation. If they conflict, this file wins.
- **Font rule**: Bebas Neue (display), DM Sans (body), Space Mono (mono) — no exceptions.

---
