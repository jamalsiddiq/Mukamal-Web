# Template Adapter — Template Selection and Adaptation Logic

> Part of: 09_Website_Builder/engine | Consumed by: UX/UI Strategist 09, Lead Web-Master 09

## Purpose

Defines the scoring matrix and adaptation rules for selecting a base template from `07_Template_Library` and merging it with assembled component JSX. A template provides the **structural scaffold** (routing, layout, nav, footer, section ordering). Components provide the **interactive elements** injected into that scaffold.

---

## Template Catalog (13 Templates)

| Template | Category | Dark Mode | Section Count | Animation Level | Mukamal Variant |
|---|---|---|---|---|---|
| `commit` | SaaS / Changelog | ✅ | 6 | Low | ✅ Done |
| `compass` | SaaS / Dashboard | Partial | 8 | Low | ❌ |
| `keynote` | Conference / Event | ✅ | 5 | Medium | ❌ |
| `pocket` | Finance / Mobile App | ✅ | 7 | Medium | ❌ |
| `primer` | Documentation / Docs | ❌ | 4 | None | ❌ |
| `protocol` | API / Developer | ✅ | 5 | Low | ❌ |
| `radiant` | AI / Product SaaS | ✅ | 9 | High | ❌ |
| `salient` | General SaaS / Marketing | Partial | 10 | Medium | ❌ |
| `spotlight` | Portfolio / Personal | ✅ | 6 | Medium | ❌ |
| `studio` | Agency / Creative | ✅ | 8 | High | ❌ |
| `syntax` | Podcast / Media | ✅ | 5 | Low | ❌ |
| `transmit` | Podcast / Simple | ❌ | 4 | None | ❌ |
| `oatmeal` | SaaS Component Kit | ✅ | 13 pages, 38 sections | Variable | ✅ Done |

---

## Template Scoring Matrix

Score each candidate template on 5 axes (1–10 each). Select highest total score.

### Axis 1: Industry Match (weight: 3x)

| Brand Type | Top Templates | Score |
|---|---|---|
| Design / UX Agency | `studio` (10), `spotlight` (8), `radiant` (6) | 10/8/6 |
| SaaS / Product | `radiant` (10), `salient` (9), `compass` (8), `commit` (7) | 10/9/8/7 |
| API / Developer Tool | `protocol` (10), `primer` (9), `commit` (8) | 10/9/8 |
| Finance / FinTech | `pocket` (10), `salient` (8), `compass` (7) | 10/8/7 |
| Event / Conference | `keynote` (10), `studio` (6) | 10/6 |
| Media / Content | `syntax` (10), `transmit` (9) | 10/9 |
| Portfolio / Personal | `spotlight` (10), `studio` (8) | 10/8 |

### Axis 2: Section Count Match (weight: 2x)

```
target_sections = count of sections in layout_spec.md
score = 10 - abs(template.section_count - target_sections) * 1.5
floor(score, 1) / 10
```

### Axis 3: Animation Complexity Match (weight: 2x)

| Brand Motion Budget | Required Level | Match Templates | Score |
|---|---|---|---|
| High (Motion Intensity 7–10) | High | `studio`, `radiant` | 10 |
| Medium (Motion Intensity 4–6) | Medium | `keynote`, `pocket`, `salient`, `spotlight` | 8 |
| Low (Motion Intensity 1–3) | Low | `commit`, `protocol`, `primer`, `syntax` | 6 |
| None | None | `transmit`, `primer` | 4 |

### Axis 4: Dark Mode Support (weight: 2x)

| Brand Tone | Dark Mode Required | Score |
|---|---|---|
| `dark-luxury`, `tech`, `clinical` | Yes — template must have `✅` | 10 if ✅, 0 if ❌ |
| `editorial` | Optional | 6 if ✅, 8 if ❌ (editorial prefers light) |

### Axis 5: Mukamal Variant Available (weight: 1x)

| Status | Score |
|---|---|
| ✅ Done (commit, oatmeal) | 10 — use mukamal/ fork directly |
| ❌ Not done | 5 — use original/ and apply mukamal-theme.json |

---

## Selection Algorithm

```
INPUT: layout_spec.md (section count, brand type, motion budget, tone)
INPUT: 07_Template_Library/catalog.md

FOR each template in catalog:
  score = (industry_match × 3)
        + (section_count_match × 2)
        + (animation_match × 2)
        + (dark_mode_match × 2)
        + (mukamal_variant × 1)

SELECT template with highest score
IF tie: prefer template with Mukamal variant (commit or oatmeal)
IF score < 30: flag for UX/UI Strategist review (no template fits well — custom scaffold needed)

OUTPUT: {
  "template": "[name]",
  "score": [total],
  "source": "mukamal/" OR "original/",
  "theme_override": "07_Template_Library/mukamal-theme.json",
  "adaptation_notes": "[specific sections to replace]"
}
```

---

## Adaptation Protocol (Template → Assembly)

Once a template is selected, the Lead Web-Master 09 performs a structured merge:

### Step 1: Scaffold Extraction
- Copy selected template from `07_Template_Library/[name]/mukamal/` (or `original/`)
- Do NOT modify originals — work in `09_Website_Builder/builds/[brand_id]/05_code/`

### Step 2: Token Override
Apply `mukamal-theme.json` as Tailwind `@theme` overrides in `globals.css`:

```css
@theme {
  --color-accent: #C6F135;        /* lime — Mukamal primary */
  --color-background: #080808;    /* near-black */
  --color-text: #F0EDE6;          /* warm off-white */
  --color-border: rgba(255,255,255,0.08);
  --font-display: 'Instrument Serif', serif;
  --font-sans: 'Manrope', sans-serif;
  --font-mono: 'Space Mono', monospace;
}
```

### Step 3: Section Replacement
For each section in `component_assignments.json`:
- Identify matching template section by type (hero, features, cta, etc.)
- Replace template section content with assembled component JSX
- Preserve template's outer layout wrappers (`<section>`, padding, max-width)
- Inject template's nav and footer unchanged (they receive token override from Step 2)

### Step 4: Copy Injection
For each section:
- Pull H1, H2, body, CTA from `copy_matrix.md`
- Replace template placeholder text with copy
- Enforce typographic hierarchy:
  - H1: `text-5xl font-display font-bold` (Instrument Serif)
  - H2: `text-3xl font-sans font-semibold` (Manrope)
  - Body: `text-base font-sans opacity-[0.87]`
  - Labels: `text-sm font-mono uppercase tracking-widest opacity-60`

### Step 5: Motion Injection
For each section in `motion_spec.json`:
- Import required GSAP plugins at top of component file
- Add `useEffect` with GSAP timeline inside component
- Wrap all GSAP calls in `gsap.matchMedia()` for reduced-motion safety
- Add `return () => ctx.revert()` cleanup

### Step 6: Final Assembly Validation
Before submitting to Critic Agent Gate 2:
- [ ] Zero hardcoded hex values (all → CSS custom properties)
- [ ] Zero Inter font references
- [ ] All images use `picsum.photos/seed/[name]/W/H` or SVG (no Unsplash)
- [ ] All sections have `min-h-[100dvh]` if full-bleed
- [ ] All interactive elements have `cursor-pointer`
- [ ] Responsive verified: 375px, 768px, 1024px, 1440px breakpoints present
- [ ] `prefersReducedMotion()` guard on every GSAP block

---

## Template Override Rules

When no template scores above 30, or when the brand mandate is for Mukamal itself:

**Default Scaffold for Mukamal Builds:**
- Base: `studio` template (agency/creative, high animation, full dark mode)
- Mukamal variant: apply `mukamal-theme.json` from scratch (not pre-done for studio)
- Section order: Hero → Logo Strip → Features/Services → Stats → Process → Case Studies → CTA → Contact

This is the scaffold used for the `mukamal-redesign-09` first mission.
