"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Nav } from "@/components/brand/Nav"
import { Footer } from "@/components/brand/Footer"

const PILLARS = [
  { id: "evidence", headline: "Evidence Before Opinion", body: "Every recommendation we make is supported by a heuristic score, a source framework, and a revenue impact estimate. We do not present mood boards, vibes, or preferences." },
  { id: "measurement", headline: "Measurement Before Build", body: "We audit before we design. The friction map is the brief. Build without it and you're decorating a broken journey." },
  { id: "specificity", headline: "Specificity as Standard", body: "'Improve the checkout' is not a recommendation. 'Reduce required fields from 7 to 4 — 47% of users abandon at field 3' is. We write the second kind." },
  { id: "delivery", headline: "Delivery in Days, Not Months", body: "A full 10-screen audit lands in 5 working days. A design system token set in 10. You get a decision-ready output, not a retainer." },
]

const PROCESS_STEPS = [
  { number: "01", title: "Brief", body: "You describe the product, the problem, and the pages. 30-minute call or async brief doc." },
  { number: "02", title: "Capture", body: "We capture every screen across desktop and mobile. Live render, no staging assumptions." },
  { number: "03", title: "Audit", body: "5 frameworks applied to every screen. Every failure scored by severity and revenue impact." },
  { number: "04", title: "Synthesis", body: "Findings compiled into a priority-ranked report. Top 3 revenue leaks, full heuristic matrix, concrete action route." },
  { number: "05", title: "Build", body: "If you need the fix, not just the finding — we build it. Same evidence governs every design decision." },
]

export default function AboutPage() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null
    async function init() {
      try {
        const { gsap } = await import("gsap")
        ctx = gsap.context(() => {
          const mm = gsap.matchMedia()
          mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(".about-headline-word", { opacity: 0, y: 24, duration: 0.55, ease: "power3.out", stagger: 0.06, delay: 0.15 })
            gsap.from(".about-subhead", { opacity: 0, y: 12, duration: 0.5, ease: "power3.out", delay: 0.6 })
          })
        }, headerRef)
      } catch { /* graceful degrade */ }
    }
    init()
    return () => { ctx?.revert() }
  }, [])

  return (
    <main style={{ background: "var(--color-background)" }}>
      <Nav />

      {/* Header */}
      <div
        ref={headerRef}
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ backgroundImage: `radial-gradient(circle, rgba(30,58,47,0.04) 1px, transparent 1px)`, backgroundSize: "48px 48px" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, var(--color-background) 30%, transparent 100%)" }} aria-hidden="true" />
        <div className="container relative z-10 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-widest mb-8 opacity-50">About</p>
          <h1 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-wide uppercase text-[var(--color-text)] mb-8" aria-label="We measure what everyone else guesses.">
            {"WE MEASURE WHAT".split(" ").map((word, i) => (
              <span key={`h1-${i}`} className="about-headline-word inline-block mr-[0.22em]">{word}</span>
            ))}
            <br />
            {"EVERYONE ELSE GUESSES.".split(" ").map((word, i) => (
              <span key={`h2-${i}`} className="about-headline-word inline-block mr-[0.22em]">{word}</span>
            ))}
          </h1>
          <p className="about-subhead font-sans text-xl max-w-xl leading-relaxed" style={{ color: "var(--color-text-dim)" }}>
            Mukamal applies 5 evaluation frameworks to every interface we touch. The output is a scored, ranked, evidence-backed report — not a mood board.
          </p>
        </div>
      </div>

      {/* Approach pillars */}
      <section className="py-28 lg:py-40 border-t border-[var(--color-border)]">
        <div className="container">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--color-accent)" }}>How We Work</p>
          <h2 className="font-display text-[var(--fs-h2)] uppercase tracking-wide text-[var(--color-text)] mb-16">Our Approach</h2>
          <div className="max-w-3xl space-y-16">
            {PILLARS.map((pillar, i) => (
              <div key={pillar.id}>
                <div className="flex gap-6 items-start">
                  <span className="font-mono text-xs opacity-30 mt-1 flex-shrink-0 w-6" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-sans text-xl font-semibold text-[var(--color-text)] mb-3">{pillar.headline}</h3>
                    <p className="font-sans text-base leading-relaxed" style={{ color: "var(--color-text-dim)" }}>{pillar.body}</p>
                  </div>
                </div>
                {i < PILLARS.length - 1 && <div className="mt-16 border-b border-[var(--color-border)]" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 lg:py-40 border-t border-[var(--color-border)]">
        <div className="container">
          <div className="mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--color-accent)" }}>Process</p>
            <h2 className="font-display text-[var(--fs-h2)] uppercase tracking-wide text-[var(--color-text)]">
              Brief To Deliverable In 5 Steps.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[var(--color-border)]">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="bg-[var(--color-background)] p-6 lg:p-8 border border-[var(--color-border)] hover:border-[rgba(198,241,53,0.15)] transition-colors">
                <span className="font-mono text-xs uppercase tracking-widest mb-6 block" style={{ color: "var(--color-accent)", opacity: 0.7 }}>{step.number}</span>
                <h3 className="font-sans text-base font-semibold text-[var(--color-text)] mb-3">{step.title}</h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 lg:py-40 border-t border-[var(--color-border)]">
        <div className="container max-w-3xl">
          <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-wide text-[var(--color-text)] mb-4 leading-tight">
            Let&apos;s Scope The Engagement.
          </h2>
          <p className="font-sans text-lg mb-10" style={{ color: "var(--color-text-muted)" }}>
            15 minutes. No pitch deck. Just a conversation about your product and where the friction is.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-sans font-semibold text-sm tracking-wide cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: "var(--color-accent)", color: "var(--color-accent-contrast)" }}
          >
            Book the 15-Minute Call
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
