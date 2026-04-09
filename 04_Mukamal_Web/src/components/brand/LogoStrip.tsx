type LogoStripProps = {
  label?: string
  logos: string[]
}

export function LogoStrip({ label = "Brands we've audited", logos }: LogoStripProps) {
  return (
    <section className="border-y border-[var(--color-border)] py-8 overflow-hidden">
      <p className="font-mono text-xs uppercase tracking-widest text-center mb-6 opacity-50">
        {label}
      </p>
      <div className="relative">
        <div className="flex overflow-hidden">
          <div className="flex gap-16 items-center whitespace-nowrap" style={{ animation: "marquee 22s linear infinite", width: "max-content" }}>
            {[...logos, ...logos].map((name, i) => (
              <span key={i} className="font-mono text-sm uppercase tracking-widest opacity-40 hover:opacity-70 transition-opacity">{name}</span>
            ))}
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none" style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }} aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none" style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }} aria-hidden="true" />
      </div>
    </section>
  )
}
