"use client"

import { Nav } from "@/components/brand/Nav"
import { Footer } from "@/components/brand/Footer"
import { HeroFullBleed } from "@/components/brand/HeroFullBleed"
import { LogoStrip } from "@/components/brand/LogoStrip"
import { ServicesBento } from "@/components/brand/ServicesBento"
import { StatsBlock } from "@/components/brand/StatsBlock"
import { CTAFullBleed } from "@/components/brand/CTAFullBleed"

const LOGOS = ["MetaMask", "Phantom", "Rainbow", "Trust Wallet", "Coinbase", "Linear", "Notion", "Figma", "Vercel", "Stripe"]

const SERVICES = [
  { id: "ux-audit", title: "UX AUDIT", description: "We apply 5 evaluation frameworks to every screen — Nielsen, WCAG 2.2, Cognitive Load, Fitts's Law, Gestalt. Every finding is scored, ranked by revenue impact, and delivered in 5 working days.", tags: ["5 frameworks", "5 working days", "Revenue-ranked"] },
  { id: "cro-design", title: "CRO DESIGN", description: "Conversion-rate-optimised UI built on audit evidence. No aesthetic preference. Every component choice is justified by a friction finding." },
  { id: "design-systems", title: "DESIGN SYSTEMS", description: "Token-governed, component-first architecture. Scales across products without visual drift or designer dependency." },
  { id: "visual-qa", title: "VISUAL QA", description: "Every screen scored against Top 1% industry peers. We benchmark before we build." },
  { id: "strategy", title: "AUDIT-LED STRATEGY", description: "Friction findings ranked by revenue impact. A priority-ordered roadmap, not a list of opinions." },
]

const STATS = [
  { value: "60%", label: "of audited products have critical UX failures on first load" },
  { value: "20.8pt", label: "average UX score improvement after Mukamal audit corrections" },
  { value: "14", label: "critical failures found across 5 audited products in one engagement" },
  { value: "5 days", label: "standard audit delivery for a full 10-screen evaluation" },
]

export default function HomePage() {
  return (
    <main style={{ background: "var(--color-background)" }}>
      <Nav />
      <HeroFullBleed
        eyebrow="UX Audit Studio"
        headlineParts={[
          { text: "YOUR UX HAS" },
          { text: "A GAP." },
          { text: "WE FIND IT.", accent: true },
        ]}
        subline="Mukamal audits the friction between your interface and your revenue — then fixes it with evidence, not opinion."
        primaryCTA={{ label: "Book a Strategy Session", href: "/contact" }}
        secondaryCTA={{ label: "See Audit Examples", href: "/work" }}
      />
      <LogoStrip logos={LOGOS} />
      <ServicesBento
        services={SERVICES}
        subline="Five disciplines. All measured against the same standard: does it convert?"
      />
      <StatsBlock
        stats={STATS}
        source="Source: Mukamal Web3 Wallet UX Audit, March 2026"
      />
      <CTAFullBleed
        headline="The Audit Starts With A 15-Minute Call."
        subline="No commitment. We scope the engagement, you decide if it's right."
        cta={{ label: "Book a 15-Minute Call", href: "/contact" }}
        glow
      />
      <Footer />
    </main>
  )
}
