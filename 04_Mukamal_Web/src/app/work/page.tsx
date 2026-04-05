"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Nav } from "@/components/brand/Nav"
import { Footer } from "@/components/brand/Footer"

type FilterCategory = "All" | "UX Audit" | "CRO" | "Design Systems"

const CASE_STUDIES = [
  {
    id: "web3-wallets",
    category: "UX Audit" as FilterCategory,
    title: "5 WALLETS. 14 CRITICAL FAILURES. ONE REPORT.",
    client: "Web3 Ecosystem",
    outcome: "Average UX score lifted 20.8 points after Mukamal corrections.",
    slug: "/work/web3-wallets",
  },
  {
    id: "linear-audit",
    category: "UX Audit" as FilterCategory,
    title: "A PUBLIC AUDIT OF ONE OF THE MOST-LOVED B2B TOOLS.",
    client: "Linear.app",
    outcome: "Heuristic analysis across 8 screens, 5 frameworks. Full synthesis in progress.",
    slug: "/work/linear-audit",
  },
  {
    id: "mukamal-web",
    category: "Design Systems" as FilterCategory,
    title: "REBUILDING THE AGENCY SITE FROM A 76% FAILURE RATE TO BRAND-ACCURATE.",
    client: "Mukamal",
    outcome: "Full @theme token overhaul. Stripe defaults removed. Dark luxury enforced.",
    slug: "/work/mukamal-redesign",
  },
]

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All")
  const filters: FilterCategory[] = ["All", "UX Audit", "CRO", "Design Systems"]
  const filteredStudies = activeFilter === "All" ? CASE_STUDIES : CASE_STUDIES.filter((s) => s.category === activeFilter)

  return (
    <main style={{ background: "var(--color-background)" }}>
      <Nav />

      {/* Header */}
      <div
        className="relative pt-40 pb-20 overflow-hidden"
        style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, var(--color-background) 30%, transparent 100%)" }} aria-hidden="true" />
        <div className="container relative z-10">
          <h1 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-wide uppercase text-[var(--color-text)] mb-6">
            Work That Moved The Metrics.
          </h1>
          <p className="font-sans text-xl max-w-xl" style={{ color: "var(--color-text-dim)" }}>
            Case studies from UX audits, design overhauls, and system builds — each with a stated outcome.
          </p>
        </div>
      </div>

      {/* Filters + Grid */}
      <section className="pb-28 lg:pb-40">
        <div className="container">
          <div className="flex gap-2 flex-wrap mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: activeFilter === f ? "var(--color-accent)" : "var(--color-border)",
                  color: activeFilter === f ? "var(--color-accent)" : "var(--color-text-muted)",
                  background: activeFilter === f ? "rgba(198,241,53,0.06)" : "transparent",
                }}
                aria-pressed={activeFilter === f}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[var(--color-border)]">
            {filteredStudies.map((study) => (
              <Link
                key={study.id}
                href={study.slug}
                className="group block bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[rgba(198,241,53,0.2)] transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[2/1] overflow-hidden bg-[var(--color-bg-elevated)]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-20">Case Study</span>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-40">{study.client}</span>
                    <span className="opacity-20">·</span>
                    <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--color-accent)", opacity: 0.7 }}>{study.category}</span>
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl uppercase tracking-wide text-[var(--color-text)] mb-3 leading-snug">
                    {study.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-muted)" }}>{study.outcome}</p>
                  <span className="font-mono text-xs uppercase tracking-widest group-hover:opacity-100 transition-opacity" style={{ color: "var(--color-accent)", opacity: 0.6 }}>
                    Read the Audit →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-border)] py-20">
        <div className="container text-center">
          <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-wide text-[var(--color-text)] mb-6">
            Ready To Audit Yours?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-sans font-semibold text-sm tracking-wide cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: "var(--color-accent)", color: "var(--color-accent-contrast)" }}
          >
            Start the Audit Process
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
