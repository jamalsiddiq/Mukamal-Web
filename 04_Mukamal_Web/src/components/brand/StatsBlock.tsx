type Stat = {
  value: string
  label: string
}

type StatsBlockProps = {
  eyebrow?: string
  headline?: string
  stats: Stat[]
  source?: string
}

export function StatsBlock({
  eyebrow = "Evidence",
  headline = "The Numbers Behind The Work",
  stats,
  source,
}: StatsBlockProps) {
  return (
    <section className="py-28 lg:py-40 border-t border-[var(--color-border)]">
      <div className="container">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--color-accent)" }}>{eyebrow}</p>
          <h2 className="font-display text-[var(--fs-h2)] uppercase tracking-wide text-[var(--color-text)]">
            {headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <div key={i} className="border-l border-[var(--color-border)] pl-6">
              <span className="font-display text-5xl lg:text-6xl leading-none text-[var(--color-accent)]">
                {stat.value}
              </span>
              <p className="font-sans text-sm leading-relaxed mt-4" style={{ color: "var(--color-text-muted)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {source && (
          <p className="font-mono text-xs opacity-30 mt-12">{source}</p>
        )}
      </div>
    </section>
  )
}
