type Service = {
  id: string
  title: string
  description: string
  tags?: string[]
}

type ServicesBentoProps = {
  eyebrow?: string
  headline?: string
  subline?: string
  services: Service[]
}

export function ServicesBento({
  eyebrow = "Services",
  headline = "What We Audit",
  subline,
  services,
}: ServicesBentoProps) {
  const [featured, ...rest] = services

  return (
    <section className="py-28 lg:py-40">
      <div className="container">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--color-accent)" }}>{eyebrow}</p>
          <h2 className="font-display text-[var(--fs-h2)] uppercase tracking-wide text-[var(--color-text)]">
            {headline}
          </h2>
          {subline && (
            <p className="font-sans text-base mt-3 max-w-md" style={{ color: "var(--color-text-muted)" }}>
              {subline}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]">
          {featured && (
            <div className="md:col-span-2 md:row-span-2 bg-[var(--color-background)] p-8 lg:p-10 spotlight-card border border-[var(--color-border)]">
              <div className="h-full flex flex-col justify-between min-h-[280px]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest mb-4 inline-block" style={{ color: "var(--color-accent)", opacity: 0.8 }}>
                    Core offering
                  </span>
                  <h3 className="font-display text-4xl lg:text-5xl uppercase tracking-wide text-[var(--color-text)] mb-4">
                    {featured.title}
                  </h3>
                  <p className="font-sans text-base leading-relaxed" style={{ color: "var(--color-text-dim)" }}>
                    {featured.description}
                  </p>
                </div>
                {featured.tags && (
                  <div className="mt-8 flex items-center gap-3">
                    {featured.tags.map((tag, i) => (
                      <span key={i} className="font-mono text-xs uppercase tracking-widest opacity-50">
                        {i > 0 && <span className="opacity-20 mr-3">·</span>}
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {rest.map((service) => (
            <div key={service.id} className="bg-[var(--color-background)] p-6 lg:p-8 spotlight-card border border-[var(--color-border)]">
              <h3 className="font-display text-2xl uppercase tracking-wide text-[var(--color-text)] mb-3">
                {service.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
