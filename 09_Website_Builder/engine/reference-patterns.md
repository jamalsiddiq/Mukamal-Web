# Reference Prompt Pattern Taxonomy

> Catalog of 30 reference prompts at `09_Website_Builder/refrance prompts/`, classified by section type, animation technique, visual pattern, and layout approach. Used by the UX/UI Strategist and component-selector to inform builds.

---

## Corpus Overview

| Metric | Count |
|--------|-------|
| Total prompts | 30 |
| Dark theme | 22 |
| Light theme | 6 |
| Mixed | 2 |
| Use Framer Motion | 18 |
| Use GSAP | 2 |
| CSS-only animation | 10 |
| Use liquid glass | 14 |
| Use video background | 25 |
| Use HLS streaming | 10 |
| Multi-section (3+) | 9 |
| Hero-only / hero+nav | 21 |

---

## Section Type Frequency

| Section Type | Count | Key Sources |
|---|---|---|
| Hero | 30 | Every prompt |
| Navigation Bar | 28 | Nearly universal |
| CTA Button(s) | 27 | Nearly universal |
| Video Background | 25 | Dominant depth pattern |
| Logo/Brand Marquee | 8 | Power AI, Grow AI, Synapse, Portfolio Cosmic, Mindloop, AI Designer, Stellar AI, Liquid Glass Agency |
| Social Proof / Avatar Row | 7 | ClearInvoice, Mindloop, Neuralyn, AI Designer, Nexora, Stellar AI, Taskly |
| Features Section | 5 | Liquid Glass Agency, Innovation/Asme, Mindloop, Stellar AI, Nexora |
| Testimonials | 4 | Liquid Glass Agency, AI Designer Portfolio, Neuralyn, Innovation |
| Pricing / Calculator | 3 | AI Designer Portfolio, Price Calculator SaaS, Liquid Glass Agency |
| Stats Section | 2 | Liquid Glass Agency, Portfolio Cosmic |
| Loading Screen | 2 | Portfolio Cosmic, Loader Animation |
| Footer | 5 | Mindloop, Liquid Glass Agency, Innovation, Portfolio Cosmic, AI Designer |
| Parallax Gallery | 2 | Portfolio Cosmic, Yacht Club |
| About Section | 2 | Innovation/Asme, Orbis NFT |

---

## Animation Technique Frequency

| Technique | Count | Key Sources |
|---|---|---|
| Fade-up entrance (y→0 + opacity 0→1) | 18 | Neuralyn, Mindloop, Digitwist, Nexora, Synapse, Liquid Glass Agency |
| Staggered entrance (per-element delay) | 17 | Standard 0.1–0.15s stagger across most prompts |
| Hover scale (1.02–1.05) | 20+ | Nearly universal |
| Video fade loop (requestAnimationFrame) | 9 | Aethera, Innovation, Grow AI, Power AI, Mindloop, Portfolio Cosmic |
| CSS marquee (translateX 0→-50%) | 7 | AI Designer, Grow AI, Power AI, Synapse, Portfolio Cosmic, Mindloop, Liquid Glass Agency |
| BlurIn / blur-to-clear text | 4 | AI Automation, Liquid Glass Agency, Digitwist, Portfolio Cosmic |
| Scroll-driven word reveal (useScroll) | 3 | Neuralyn, Mindloop, Innovation/Asme |
| SplitText / word stagger | 3 | AI Automation, Liquid Glass Agency, Portfolio Cosmic |
| Gradient text sweep | 2 | DesignPro Academy, Stellar AI |
| Parallax scroll (y offset) | 3 | Neuralyn, Portfolio Cosmic, Yacht Club |
| GSAP ScrollTrigger pin | 2 | Portfolio Cosmic, Yacht Club |
| GSAP entrance timeline | 2 | Portfolio Cosmic, Yacht Club |
| GSAP marquee (xPercent, repeat -1) | 1 | Portfolio Cosmic |
| Counter 0→100 (rAF) | 2 | Loader Animation, Portfolio Cosmic |
| Role/word cycling (AnimatePresence) | 2 | Portfolio Cosmic, Loader Animation |
| SVG filter mouse ripple | 1 | Yacht Club |
| Auto-cycling tab bar | 1 | Stellar AI |

---

## Visual Pattern Frequency

| Pattern | Count | Key Sources |
|---|---|---|
| Liquid glass (.liquid-glass) | 14 | Bloom AI, Grow AI, Power AI, Innovation, Liquid Glass Agency, Mindloop, Neuralyn, Orbis NFT, Portfolio Cosmic, Velorah |
| Full-screen video background | 25 | Dominant pattern |
| Backdrop-blur navbar | 16 | Very common |
| Pill badge / eyebrow label | 15 | Most hero sections |
| Rounded-full pill buttons | 18 | Dominant CTA shape |
| Gradient text (bg-clip-text) | 8 | DesignPro, Grow AI, Power AI, Digitwist, Stellar AI, Portfolio Cosmic |
| Gradient border via ::before mask | 10 | All liquid-glass implementations |
| Social proof avatar row | 7 | ClearInvoice, Mindloop, Neuralyn, AI Designer, Nexora, Stellar AI, Taskly |
| Radial glow / decorative blobs | 6 | Digitwist, Taskly, Grow AI, Innovation, CodeNest |
| Video-in-card | 5 | Innovation, Orbis NFT, Liquid Glass Agency |
| Dashboard/product as hero visual | 3 | Neuralyn, Nexora, Stellar AI |
| Bento grid layout | 2 | Portfolio Cosmic, implied in others |
| Neon/lime accent on dark | 2 | Orbis NFT (#6FFF00), CodeNest (#5ed29c) |
| Instrument Serif italic accent word | 14 | Widespread editorial technique |

---

## Mukamal Alignment Score

Patterns ranked by fit with the Mukamal dark-luxury aesthetic (#080808 bg, #C6F135 lime, Bebas Neue/DM Sans, GSAP).

### Tier 1 — Direct Fit (adopt as-is)

| Pattern | Source | Why |
|---|---|---|
| GSAP loader (counter + rotating words + progress bar) | Portfolio Cosmic, Loader Animation | Native GSAP, dark aesthetic, premium entrance |
| GSAP ScrollTrigger pin + parallax | Portfolio Cosmic | Matches Mukamal's GSAP 3.12.5 + ScrollTrigger stack |
| GSAP marquee (xPercent, repeat -1) | Portfolio Cosmic | Direct match to motion stack |
| Bento grid (alternating column spans) | Portfolio Cosmic | Dense dark card layout |
| Neon accent on dark bg | Orbis NFT | #6FFF00 closest to #C6F135 |
| Bold display headline 100–230px | Grow AI, Power AI, New Era, Targo | Scale matches Bebas Neue usage |
| Liquid glass on nav pill + badges | 14 prompts | Works on #080808, subtle elegance |

### Tier 2 — Adapt (modify for Mukamal stack)

| Pattern | Source | Adaptation |
|---|---|---|
| BlurIn word-by-word text | AI Automation, Liquid Glass Agency | Convert from Framer Motion to GSAP |
| Scroll-driven word reveal | Neuralyn, Mindloop | Implement with GSAP ScrollTrigger instead of useScroll |
| Video-in-service-cards | Innovation, Liquid Glass Agency | Dark frame, hover scale |
| Alternating chess rows (features) | Liquid Glass Agency | Structured premium layout |
| Halftone card overlay | Portfolio Cosmic | Adds texture without breaking dark theme |
| Desaturated video section | Liquid Glass Agency | Removes color distraction for dark luxury |
| Fleet overlay / showcase | Yacht Club | Map to case study or work page |

### Tier 3 — Avoid or Heavily Modify

| Pattern | Reason |
|---|---|
| White/light themes | Contradicts #080808 mandate |
| Purple/indigo accents | Not Mukamal palette |
| Instrument Serif as primary display | Mukamal uses Bebas Neue |
| Grayscale-only palettes | Misses lime accent brand signal |

---

## Top 5 Reference Prompts for Mukamal

Ranked by architectural relevance:

### 1. Portfolio Cosmic (Portfolio)
- **Why:** Only prompt using GSAP natively. Loader, bento grid, parallax gallery, marquee, multi-section structure. Most complete architectural reference.
- **Adopt:** Loader, GSAP marquee, bento grid, scroll parallax, halftone overlay.

### 2. Orbis NFT (Landing Page)
- **Why:** Closest color system — neon green (#6FFF00) on near-black (#010828). Card + nav accent usage.
- **Adopt:** Neon accent treatment, dark card surfaces, liquid glass on nav.

### 3. Liquid Glass Agency (Landing Page)
- **Why:** Most complete multi-section structure (hero + features alternating + stats + testimonials + CTA). Two-tier liquid glass system.
- **Adopt:** Section architecture, alternating chess rows, desaturated video, BlurText component.

### 4. Yacht Club (Landing Page)
- **Why:** GSAP panel animations, SVG filter ripple trail, video blur effects. High-craft interactions.
- **Adopt:** GSAP menu panels, fleet overlay concept for work showcase.

### 5. Neuralyn (SaaS)
- **Why:** Parallax scroll, scroll-driven word reveal, dashboard composite. Premium editorial feel.
- **Adopt:** Word-reveal testimonials, parallax dashboard, gradient bottom fade.

---

## New Components to Add to Registry

Based on patterns not yet in the component-selector:

| Component | Type | Source Prompts | Mukamal Use |
|---|---|---|---|
| `Preloader` | motion | Portfolio Cosmic, Loader Animation | Branded loading sequence (counter 000→100, rotating words, progress bar) |
| `BlurText` | motion | AI Automation, Liquid Glass Agency | Word-by-word blur-to-clear entrance for headlines |
| `ParallaxGallery` | brand | Portfolio Cosmic, Yacht Club | Pinned scroll gallery for case studies or work showcase |
| `VideoHero` | brand | 25 prompts | Full-bleed video + gradient overlay hero variant |

---

## Animation Technique Reference

### GSAP Patterns (Mukamal stack)

```
// Loader counter (Portfolio Cosmic)
requestAnimationFrame loop → 0 to 100 over 2700ms
gsap.to(".progress-bar", { scaleX: 1, duration: 2.7 })

// Word stagger (Portfolio Cosmic)
gsap.from(".word", { y: 50, opacity: 0, duration: 1.2, stagger: 0.08, ease: "power3.out" })

// Blur-in (Portfolio Cosmic)
gsap.from(".char", { filter: "blur(10px)", opacity: 0, duration: 1, stagger: 0.03 })

// ScrollTrigger parallax
gsap.to(".element", { y: -200, scrollTrigger: { trigger: ".section", scrub: 0.5 } })

// ScrollTrigger pin (Portfolio Cosmic)
ScrollTrigger.create({ trigger: ".gallery", pin: true, start: "top top", end: "+=300%" })

// Marquee (Portfolio Cosmic)
gsap.to(".track", { xPercent: -50, duration: 40, repeat: -1, ease: "none" })
```

### Scroll Word Reveal (adapt from Framer Motion → GSAP)

```
// Original: useScroll + useTransform per word
// GSAP equivalent:
words.forEach((word, i) => {
  gsap.to(word, {
    opacity: 1, color: "var(--color-text)",
    scrollTrigger: { trigger: word, start: "top 85%", end: "top 50%", scrub: true }
  })
})
```

---

*Last updated: 2026-04-05*
*Source: 30 prompts in `09_Website_Builder/refrance prompts/`*
