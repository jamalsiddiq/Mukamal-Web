import Link from "next/link"

type CTAFullBleedProps = {
  headline: string
  subline?: string
  cta: { label: string; href: string }
  glow?: boolean
}

export function CTAFullBleed({ headline, subline, cta, glow = false }: CTAFullBleedProps) {
  return (
    <section className="py-28 lg:py-40 border-t border-[var(--color-border)] overflow-hidden relative">
      {glow && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(198,241,53,0.04) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
      )}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-5xl lg:text-7xl uppercase tracking-wide text-[var(--color-text)] mb-6 leading-tight">
            {headline}
          </h2>
          {subline && (
            <p className="font-sans text-lg mb-10" style={{ color: "var(--color-text-muted)" }}>
              {subline}
            </p>
          )}
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-wide cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-accent-contrast)",
              ...(glow ? { boxShadow: "0 0 40px rgba(198,241,53,0.15)" } : {}),
            }}
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
