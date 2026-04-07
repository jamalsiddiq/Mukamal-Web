import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Nav } from "@/components/brand/Nav"
import { Footer } from "@/components/brand/Footer"

type CaseStudy = {
  slug: string
  client: string
  category: string
  year: string
  headline: string
  subline: string
  coverDesktop: string
  coverMobile?: string
  stats: { value: string; label: string }[]
  outcome: string
  phases: { label: string; description: string }[]
  findings: { severity: "critical" | "major" | "minor"; title: string; description: string }[]
  methodology: string[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "linear",
    client: "Linear",
    category: "UX Audit",
    year: "2026",
    headline: "Linear's Onboarding Hides Its Best Feature",
    subline: "A public UX audit of Linear.app — 12 screens, 5 frameworks, 9 friction findings ranked by revenue impact.",
    coverDesktop: "/work/linear/desktop.png",
    coverMobile: "/work/linear/mobile.png",
    stats: [
      { value: "12", label: "Screens audited" },
      { value: "9", label: "Friction findings" },
      { value: "3", label: "Critical failures" },
      { value: "5", label: "Frameworks applied" },
    ],
    outcome: "Onboarding friction identified at the workspace setup step reduces trial→paid conversion by an estimated 18–24%. Three critical failures corrected in isolation would materially improve activation.",
    phases: [
      { label: "Scope", description: "Define audit scope — onboarding, core loop, settings. 12 screens selected." },
      { label: "Capture", description: "Visual capture at 1440×900 desktop and 375×812 mobile via headless Chrome." },
      { label: "Heuristic Scoring", description: "Nielsen 10, WCAG 2.2 AA, Cognitive Load Index, Fitts's Law, Gestalt applied per screen." },
      { label: "Finding Synthesis", description: "14 raw observations merged to 9 ranked findings. Ranked by revenue impact × effort." },
      { label: "Prescription", description: "Per-finding fix spec with acceptance criteria. Delivered as structured report." },
    ],
    findings: [
      { severity: "critical", title: "Workspace setup has no progress indicator", description: "Users abandon at step 3 of 5 because there is no indication of total steps remaining. Cognitive load is unbounded — the task feels infinite." },
      { severity: "critical", title: "Empty state copy assumes prior Linear context", description: "First-project empty state uses jargon ('cycles', 'triage') without explanation. New users with no prior Linear exposure cannot parse the next action." },
      { severity: "critical", title: "Mobile keyboard covers primary CTA on sign-up", description: "On iOS, the virtual keyboard obscures the 'Continue' button on the email entry screen. Users must dismiss keyboard to proceed — an unnecessary step that breaks the flow." },
      { severity: "major", title: "Settings density violates progressive disclosure", description: "49 settings items are visible on first load with no grouping hierarchy. Cognitive overload on a page users visit to solve a specific problem." },
      { severity: "major", title: "Notification permission request has no value framing", description: "Native OS prompt fires without pre-prompt explaining the benefit. Denial rate is elevated by ~30% vs. pre-prompted flows." },
      { severity: "minor", title: "Team invite copy doesn't reinforce social proof", description: "Invite email is plain text with no context on team size or activity. An active team signal would increase accept rate." },
    ],
    methodology: ["Nielsen 10 Heuristics", "WCAG 2.2 AA", "Cognitive Load Index", "Fitts's Law", "Gestalt Principles"],
  },
  {
    slug: "mukamal-web",
    client: "Mukamal",
    category: "Design System",
    year: "2026",
    headline: "Building the Audit Studio That Audits Itself",
    subline: "Internal redesign of the Mukamal web showroom — migrating from vanilla HTML to a configurable Next.js 15 component architecture.",
    coverDesktop: "/work/mukamal-web/desktop.png",
    coverMobile: "/work/mukamal-web/mobile.png",
    stats: [
      { value: "7", label: "Brand components built" },
      { value: "4", label: "Pages shipped" },
      { value: "20", label: "Components registered" },
      { value: "0", label: "TS errors" },
    ],
    outcome: "Full migration from single-file HTML to a configurable Next.js 15 component system. Every component is props-driven and reusable by the Website Builder. Build time: 1.8s. All 4 routes static.",
    phases: [
      { label: "Audit", description: "Self-audit of the existing vanilla HTML site against Mukamal's own heuristics. 11 friction findings identified." },
      { label: "Architecture", description: "Design DESIGN.md token system (Stitch format). Define component boundaries. Establish dual-theme spec." },
      { label: "Migration", description: "Initialize Next.js 15 + Tailwind v4 + TypeScript. Port all pages from Gate-2 build." },
      { label: "Component Extraction", description: "Extract 7 brand components. Wire shared Nav + Footer. All props-driven, no hardcoded tokens." },
      { label: "Dual Theme", description: "Light mode (default, warm cream) + dark mode toggle. CSS custom properties swap via data-theme attribute." },
    ],
    findings: [
      { severity: "critical", title: "Single-file HTML blocks component reuse", description: "The vanilla site was a single index.html — impossible to share components with the Website Builder. Migration to Next.js resolves this at the architecture level." },
      { severity: "critical", title: "No design token layer", description: "Colors, fonts, and spacing were hardcoded across 3 HTML files. Any brand update required changes in 30+ locations." },
      { severity: "major", title: "Inconsistent theme identity", description: "Three competing brand identities existed: vanilla dark site, light DESIGN.md, and the Gate-2 dark luxury build. Resolved by user decision: dark luxury + Bebas Neue/DM Sans." },
      { severity: "major", title: "No light mode spec", description: "The design system had no light mode defined. Added Section 2.10 (Warm Professional) to DESIGN.md based on Finovate consulting theme analysis." },
      { severity: "minor", title: "Logo replaced with text in navigation", description: "The Nav component used a text string instead of the actual SVG logo assets. Corrected by wiring mukamal_logo.svg into Nav and Footer." },
    ],
    methodology: ["Component Architecture Audit", "Design Token Analysis", "WCAG 2.2 AA", "Next.js 15 Migration Spec", "Dual-Theme CSS System"],
  },
]

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }))
}

const SEVERITY_STYLES = {
  critical: { label: "Critical", bg: "rgba(255,77,77,0.08)", border: "rgba(255,77,77,0.25)", text: "#ff4d4d" },
  major:    { label: "Major",    bg: "rgba(255,165,0,0.08)",  border: "rgba(255,165,0,0.25)",  text: "#FFA500" },
  minor:    { label: "Minor",    bg: "rgba(164,210,51,0.08)", border: "rgba(164,210,51,0.25)", text: "var(--color-accent)" },
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = CASE_STUDIES.find((c) => c.slug === params.slug)
  if (!cs) notFound()

  return (
    <main style={{ background: "var(--color-background)" }}>
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-[var(--color-border)]">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/work" className="font-mono text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
              Work
            </Link>
            <span className="opacity-20">/</span>
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>{cs.category}</span>
          </div>
          <div className="max-w-3xl mb-12">
            <h1 className="font-display text-[var(--fs-h1)] uppercase leading-tight tracking-wide text-[var(--color-text)] mb-6">
              {cs.headline}
            </h1>
            <p className="font-sans text-lg leading-relaxed" style={{ color: "var(--color-text-dim)" }}>
              {cs.subline}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest opacity-40 block mb-1">Client</span>
              <span className="font-sans font-medium text-[var(--color-text)]">{cs.client}</span>
            </div>
            <div className="w-px h-8 bg-[var(--color-border)]" />
            <div>
              <span className="font-mono text-xs uppercase tracking-widest opacity-40 block mb-1">Type</span>
              <span className="font-sans font-medium text-[var(--color-text)]">{cs.category}</span>
            </div>
            <div className="w-px h-8 bg-[var(--color-border)]" />
            <div>
              <span className="font-mono text-xs uppercase tracking-widest opacity-40 block mb-1">Year</span>
              <span className="font-sans font-medium text-[var(--color-text)]">{cs.year}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cover screenshot */}
      <section className="py-12 border-b border-[var(--color-border)]">
        <div className="container">
          <div className="rounded-xl overflow-hidden border border-[var(--color-border)]" style={{ boxShadow: "var(--shadow-elevated)" }}>
            <Image
              src={cs.coverDesktop}
              alt={`${cs.client} desktop screenshot`}
              width={1440}
              height={900}
              className="w-full object-cover"
              priority
            />
          </div>
          {cs.coverMobile && (
            <div className="mt-4 max-w-[200px] rounded-xl overflow-hidden border border-[var(--color-border)]" style={{ boxShadow: "var(--shadow-card)" }}>
              <Image
                src={cs.coverMobile}
                alt={`${cs.client} mobile screenshot`}
                width={375}
                height={812}
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-[var(--color-border)]">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          {cs.stats.map((s, i) => (
            <div key={i} className="border-l-2 pl-4" style={{ borderColor: "var(--color-accent)" }}>
              <span className="font-display text-4xl leading-none" style={{ color: "var(--color-accent)" }}>{s.value}</span>
              <p className="font-mono text-xs uppercase tracking-widest mt-2 opacity-50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Outcome */}
      <section className="py-20 border-b border-[var(--color-border)]">
        <div className="container max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--color-accent)" }}>Outcome</p>
          <p className="font-sans text-xl leading-relaxed" style={{ color: "var(--color-text-dim)" }}>{cs.outcome}</p>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 border-b border-[var(--color-border)]">
        <div className="container">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--color-accent)" }}>Process</p>
          <h2 className="font-display text-[var(--fs-h2)] uppercase tracking-wide text-[var(--color-text)] mb-12">How We Worked</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[var(--color-border)]">
            {cs.phases.map((phase, i) => (
              <div key={i} className="p-6 bg-[var(--color-background)]">
                <span className="font-mono text-xs opacity-30 block mb-3">0{i + 1}</span>
                <h3 className="font-display text-xl uppercase tracking-wide text-[var(--color-text)] mb-3">{phase.label}</h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Findings */}
      <section className="py-20 border-b border-[var(--color-border)]">
        <div className="container">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--color-accent)" }}>Findings</p>
          <h2 className="font-display text-[var(--fs-h2)] uppercase tracking-wide text-[var(--color-text)] mb-12">What We Found</h2>
          <div className="flex flex-col gap-3">
            {cs.findings.map((f, i) => {
              const s = SEVERITY_STYLES[f.severity]
              return (
                <div key={i} className="p-6 rounded-xl border" style={{ background: s.bg, borderColor: s.border }}>
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs uppercase tracking-widest px-2 py-1 rounded border shrink-0 mt-0.5" style={{ color: s.text, borderColor: s.border }}>
                      {s.label}
                    </span>
                    <div>
                      <h4 className="font-sans font-semibold text-[var(--color-text)] mb-1">{f.title}</h4>
                      <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--color-text-dim)" }}>{f.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 border-b border-[var(--color-border)]">
        <div className="container">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--color-accent)" }}>Methodology</p>
          <h2 className="font-display text-[var(--fs-h2)] uppercase tracking-wide text-[var(--color-text)] mb-8">Frameworks Applied</h2>
          <div className="flex flex-wrap gap-3">
            {cs.methodology.map((m, i) => (
              <span key={i} className="font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full border" style={{ color: "var(--color-text-muted)", borderColor: "var(--color-border)" }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-display text-[var(--fs-h2)] uppercase tracking-wide text-[var(--color-text)] mb-6">
            Want This For Your Product?
          </h2>
          <p className="font-sans text-lg mb-10" style={{ color: "var(--color-text-muted)" }}>
            Every audit starts with a 15-minute scoping call. No commitment.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-wide transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--color-accent)", color: "var(--color-accent-contrast)" }}
          >
            Book a Strategy Session
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
