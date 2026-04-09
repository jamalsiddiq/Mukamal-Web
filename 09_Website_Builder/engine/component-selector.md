# Component Selector — Asset Injection Algorithm

> Part of: 09_Website_Builder/engine | Consumed by: Lead Web-Master 09, UX/UI Strategist 09

## Purpose

Defines the deterministic algorithm for selecting which components from the live registry at `localhost:3000/components` are assigned to each section of a layout. No guessing. No aesthetic intuition at this stage — this is a logic layer.

---

## Component Registry (20 Components, 6 Categories)

```
Category: Backgrounds (4)
  slug: mesh-gradient      → Full-bleed animated blob mesh (purple/teal/indigo, additive blending)
  slug: background-paths   → framer-motion SVG path mesh, editorial feel
  slug: background-elements→ GridBackground (dot grid) + FloatingShapes (animated blobs)

Category: Data Visualization (2)
  slug: globe              → WebGL interactive globe (cobe), drag + inertia
  slug: data-viz-burst     → Three.js fiber-optic burst (350 rays, additive blending)

Category: Interactive (3)
  slug: button             → 8 motion variants (default, shimmer, glow, ghost, outline, etc.)
  slug: magnetic-button    → Cursor magnet effect (GSAP elastic snap, 30% proximity)
  slug: bento-grid         → Responsive grid with radial spotlight hover per card

Category: Motion (3)
  slug: char-stagger       → GSAP text character stagger entrance
  slug: section-reveal     → GSAP + ScrollTrigger viewport reveal wrapper
  slug: logo-ticker        → GSAP infinite horizontal scroll, grayscale → color hover

Category: Utilities (1)
  slug: visual-placeholder → Wireframe slots (desktop chrome, mobile notch, graph, process)

Category: Advanced Motion (4) — from reference-patterns.md analysis
  slug: preloader          → Branded loading sequence (counter 000→100, rotating words, progress bar)
  slug: blur-text          → Word-by-word blur-to-clear entrance (GSAP filter: blur 10px→0, stagger 0.03)
  slug: parallax-gallery   → Pinned scroll gallery (ScrollTrigger pin, 2-col, scrub-linked)
  slug: video-hero         → Full-bleed video bg + gradient overlay (HLS/MP4, autoplay, muted)
```

---

## Section Type → Component Assignment Table

For each section type, the algorithm assigns a **Primary** and optional **Secondary** component. Selection logic follows below.

| Section Type | Primary Component | Secondary Component | Notes |
|---|---|---|---|
| `hero-full-bleed` | `mesh-gradient` OR `background-paths` | `char-stagger` (headline) + `button` (CTA) | Choose: editorial tone → `background-paths`, dark luxury → `mesh-gradient` |
| `hero-split` | `visual-placeholder` OR `globe` | `char-stagger` + `button` | Data-forward brands → `globe`. Service brands → `visual-placeholder` |
| `hero-minimal` | `background-elements` (GridBackground) | `char-stagger` + `button` | Used when content is the star, background is structure only |
| `features-grid` | `bento-grid` | `section-reveal` (wrapping each card) | Standard feature/service grid |
| `features-list` | `section-reveal` | None | Line-by-line reveal for copy-heavy feature lists |
| `stats-block` | `data-viz-burst` OR `char-stagger` (numbers) | `section-reveal` | Data brands → `data-viz-burst`. Metric highlights → `char-stagger` |
| `process-steps` | `section-reveal` | `visual-placeholder` (process slot) | Staggered step-by-step reveal |
| `social-proof` | `bento-grid` | `logo-ticker` | Testimonials in bento, logos in ticker |
| `logo-strip` | `logo-ticker` | None | Single-purpose section |
| `cta-full-bleed` | `mesh-gradient` | `button` (shimmer or glow variant) | High-contrast CTA break |
| `cta-inline` | `section-reveal` | `button` | Subtle mid-page CTA |
| `contact-form` | `background-elements` (GridBackground) | `button` (primary) | Structured, low-distraction |
| `case-study-preview` | `visual-placeholder` | `section-reveal` | Before/after or mockup showcase |
| `globe-feature` | `globe` | `char-stagger` | Used when global reach / data is the claim |
| `hero-video` | `video-hero` | `blur-text` (headline) + `button` (CTA) | Premium feel, dark luxury brands. Video as depth layer |
| `loading-screen` | `preloader` | None | Branded entry sequence. Counter + words + progress bar |
| `work-showcase` | `parallax-gallery` | `section-reveal` | Pinned gallery for case studies. Max 1 per page |

---

## Selection Algorithm

```
INPUT: layout_spec.md (list of sections with type + content brief)
INPUT: existing configurator saves (localStorage, 20 max per component)

FOR each section in layout_spec:

  1. IDENTIFY section_type from layout_spec
  2. LOOKUP primary_component and secondary_component from table above
  3. CHECK tone modifier:
     - If brand.tone == "editorial"  → prefer background-paths over mesh-gradient
     - If brand.tone == "dark-luxury" → prefer mesh-gradient, magnetic-button
     - If brand.tone == "clinical"   → prefer background-elements (grid), no blob backgrounds

  4. FETCH component JSX:
     a. Query localhost:3000/components/[slug] (live configurator)
     b. Check if localStorage has a saved configuration for this component
     c. If saved config exists → load it (preserves brand-specific tuning)
     d. If not → use default props, then apply brand token overrides:
           - accent color  → var(--color-accent) from globals.css
           - bg color      → var(--color-background)
           - font family   → brand.fonts.display / sans / mono
     e. Extract pure component JSX (strip ConfiguratorShell wrapper)
     f. Replace hardcoded values with CSS custom properties

  5. VALIDATE component suitability:
     - Does it pass prefersReducedMotion() safety check? (required)
     - Does it animate only transform + opacity? (required for perf)
     - Does it use max 5 will-change elements? (required)
     - If any fail → flag for Motion Architect review

  6. OUTPUT: component_assignments.json entry:
     {
       "section": "[section_id]",
       "type": "[section_type]",
       "primary": "[slug]",
       "secondary": "[slug or null]",
       "props": { ...brand-tuned defaults },
       "jsx_path": "src/components/ui/[slug].tsx",
       "configurator_save": "[save_id or null]"
     }

OUTPUT: component_assignments.json → consumed by Lead Web-Master 09
```

---

## Tone Modifier Definitions

| Tone | bg | accent | preferred backgrounds | avoid |
|---|---|---|---|---|
| `dark-luxury` | `#080808` | `#C6F135` | `mesh-gradient`, floating shapes | Light backgrounds, grid-only |
| `editorial` | `#F9F9F6` | `#A3FF00` | `background-paths` SVG | Heavy WebGL, blob mesh |
| `clinical` | `#0a0a0a` | `#ffffff` | `background-elements` (grid only) | All gradient backgrounds |
| `tech` | `#080808` | `#3B82F6` | `background-elements`, `globe` | Organic blob shapes |

---

## Performance Budget Per Section

| Element | Max Count | Rule |
|---|---|---|
| WebGL components | 1 per page | Globe OR DataVizBurst — never both |
| `will-change: transform` elements | 5 simultaneously | Stagger activation via ScrollTrigger |
| framer-motion animated elements | 8 per section | Beyond 8 → GSAP only |
| Fixed position overlays | 1 (noise texture only) | `pointer-events: none` required |

---

## Code Extraction Pattern

When pulling JSX from a component configurator, strip the configurator shell:

```tsx
// BEFORE (configurator output)
<ConfiguratorShell>
  <MeshGradient
    color1="#635bff"
    color2="#0ea5e9"
    speed={0.8}
  />
</ConfiguratorShell>

// AFTER (extracted for assembly)
<MeshGradient
  color1="var(--color-accent)"
  color2="var(--color-surface)"
  speed={0.8}
/>
```

Token replacement rules:
- Hardcoded hex → CSS custom property from `globals.css`
- Hardcoded font string → `var(--font-display)` / `var(--font-sans)` / `var(--font-mono)`
- Hardcoded pixel values → Tailwind spacing tokens (`p-6`, `gap-8`, etc.)
