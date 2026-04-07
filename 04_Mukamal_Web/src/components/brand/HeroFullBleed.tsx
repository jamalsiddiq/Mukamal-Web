"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

type HeroProps = {
  eyebrow?: string
  headlineParts: { text: string; accent?: boolean }[]
  subline: string
  primaryCTA: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
}

export function HeroFullBleed({
  eyebrow = "UX Audit Studio",
  headlineParts,
  subline,
  primaryCTA,
  secondaryCTA,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    async function initGSAP() {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          const mm = gsap.matchMedia()
          mm.add("(prefers-reduced-motion: no-preference)", () => {
            const words = document.querySelectorAll(".hero-word")
            gsap.from(words, {
              opacity: 0, y: 30, duration: 0.6, ease: "power3.out", stagger: 0.08, delay: 0.2,
            })
            gsap.from(".hero-subline", {
              opacity: 0, y: 16, duration: 0.5, ease: "power3.out", delay: 0.75,
            })
            gsap.from(".hero-cta-primary", {
              opacity: 0, y: 12, duration: 0.4, ease: "power3.out", delay: 1.05,
            })
            gsap.from(".hero-cta-secondary", {
              opacity: 0, y: 8, duration: 0.35, ease: "power3.out", delay: 1.15,
            })
            gsap.to(".hero-grid", {
              y: -30, ease: "none",
              scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 0.5 },
            })
          })
        }, sectionRef)
      } catch { /* GSAP not available — degrade gracefully */ }
    }
    initGSAP()
    return () => { ctx?.revert() }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
      <div
        className="hero-grid absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, rgba(30,58,47,0.05) 1px, transparent 1px)`, backgroundSize: "40px 40px" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 20% 50%, transparent 40%, rgba(8,8,8,0.7) 100%)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10 pt-32 pb-20">
        <div className="max-w-4xl">
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color: "var(--color-accent)", opacity: 0.8 }}>
              {eyebrow}
            </p>
          )}

          <h1
            className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.95] tracking-wide uppercase text-[var(--color-text)] mb-8"
            aria-label={headlineParts.map((p) => p.text).join(" ")}
          >
            {headlineParts.map((part, i) => {
              const words = part.text.split(" ")
              const inner = words.map((word, j) => (
                <span key={`w${i}-${j}`} className="hero-word inline-block mr-[0.25em]">{word}</span>
              ))
              return part.accent ? (
                <span key={`p-${i}`} className="text-[var(--color-accent)]">
                  {inner}
                  {i < headlineParts.length - 1 && <br />}
                </span>
              ) : (
                <span key={`p-${i}`}>
                  {inner}
                  {i < headlineParts.length - 1 && <br />}
                </span>
              )
            })}
          </h1>

          <p className="hero-subline font-sans text-xl max-w-xl leading-relaxed mb-12" style={{ color: "var(--color-text-dim)" }}>
            {subline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link
              href={primaryCTA.href}
              className="hero-cta-primary inline-flex items-center gap-2 px-7 py-4 rounded-full font-sans font-semibold text-sm tracking-wide cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: "var(--color-accent)", color: "var(--color-accent-contrast)" }}
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="hero-cta-secondary inline-flex items-center gap-2 px-7 py-4 rounded-full font-sans font-medium text-sm tracking-wide cursor-pointer border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all duration-200"
                style={{ color: "var(--color-text-dim)" }}
              >
                {secondaryCTA.label} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
