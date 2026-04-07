"use client"

import { useState } from "react"
import Link from "next/link"
import { Nav } from "@/components/brand/Nav"
import { Footer } from "@/components/brand/Footer"

const WHAT_HAPPENS_NEXT = [
  { step: "01", text: "We review your brief — same day." },
  { step: "02", text: "We schedule a 15-minute scoping call." },
  { step: "03", text: "We send an engagement proposal within 48 hours." },
]

const SERVICE_OPTIONS = ["UX Audit", "CRO Design", "Design System", "Visual QA", "Audit-Led Strategy", "Not sure yet"]
const BUDGET_OPTIONS = ["Under £5k", "£5k–£15k", "£15k–£50k", "£50k+", "Prefer to discuss"]

type FormState = { name: string; company: string; email: string; service: string; budget: string; brief: string }
type FormErrors = Partial<Record<keyof FormState, string>>

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormState>({ name: "", company: "", email: "", service: "", budget: "", brief: "" })
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.email.trim()) e.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address"
    if (!form.service) e.service = "Please select a service"
    if (!form.brief.trim()) e.brief = "Tell us a bit more — even a sentence helps"
    else if (form.brief.trim().length < 20) e.brief = "Tell us a bit more — even a sentence helps"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (validate()) setSubmitted(true)
  }

  const inputBase = "w-full bg-transparent border border-[var(--color-border)] rounded-lg px-4 py-3 font-sans text-sm text-[var(--color-text)] placeholder:opacity-30 focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200"
  const labelBase = "font-mono text-xs uppercase tracking-widest opacity-60 block mb-2"

  return (
    <main style={{ background: "var(--color-background)" }}>
      <Nav />

      {/* Header */}
      <div
        className="relative pt-40 pb-20 overflow-hidden"
        style={{ backgroundImage: `radial-gradient(circle, rgba(30,58,47,0.03) 1px, transparent 1px)`, backgroundSize: "56px 56px" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, var(--color-background) 30%, transparent 100%)" }} aria-hidden="true" />
        <div className="container relative z-10">
          <h1 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-wide uppercase text-[var(--color-text)] mb-6">
            Start The Conversation.
          </h1>
          <p className="font-sans text-xl max-w-lg" style={{ color: "var(--color-text-dim)" }}>
            We respond within 1 business day. The first call is a scope — not a sales pitch.
          </p>
        </div>
      </div>

      {/* Form */}
      <section className="pb-28 lg:pb-40 border-t border-[var(--color-border)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr,7fr] gap-16 lg:gap-24 pt-20">
            {/* Context */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-8 opacity-50">What happens next</p>
              <ol className="space-y-8">
                {WHAT_HAPPENS_NEXT.map((item) => (
                  <li key={item.step} className="flex gap-5 items-start">
                    <span className="font-mono text-xs opacity-40 flex-shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }}>{item.step}</span>
                    <p className="font-sans text-base leading-relaxed" style={{ color: "var(--color-text-dim)" }}>{item.text}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-12 pt-12 border-t border-[var(--color-border)]">
                <p className="font-mono text-xs opacity-30">Average response time: under 4 hours during GMT business hours.</p>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="py-16 text-center">
                  <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--color-accent)" }}>Brief received</p>
                  <h2 className="font-display text-3xl uppercase tracking-wide text-[var(--color-text)] mb-4">We&apos;ll Review It Today.</h2>
                  <p className="font-sans text-base" style={{ color: "var(--color-text-muted)" }}>Expect a reply within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="form-field">
                    <label htmlFor="name" className={labelBase}>Your name</label>
                    <input id="name" type="text" placeholder="Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputBase} aria-invalid={!!errors.name} />
                    {errors.name && <p className="font-sans text-xs mt-1.5" style={{ color: "var(--color-error)" }}>{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="form-field">
                      <label htmlFor="company" className={labelBase}>Company</label>
                      <input id="company" type="text" placeholder="Acme Corp" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputBase} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email" className={labelBase}>Email</label>
                      <input id="email" type="email" placeholder="jane@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputBase} aria-invalid={!!errors.email} />
                      {errors.email && <p className="font-sans text-xs mt-1.5" style={{ color: "var(--color-error)" }}>{errors.email}</p>}
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="service" className={labelBase}>What do you need?</label>
                    <select id="service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={`${inputBase} cursor-pointer`} aria-invalid={!!errors.service}>
                      <option value="" disabled>Select a service</option>
                      {SERVICE_OPTIONS.map((opt) => (<option key={opt} value={opt} style={{ background: "#0f0f0f" }}>{opt}</option>))}
                    </select>
                    {errors.service && <p className="font-sans text-xs mt-1.5" style={{ color: "var(--color-error)" }}>{errors.service}</p>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="budget" className={labelBase}>Approximate budget <span className="opacity-50">(optional)</span></label>
                    <select id="budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={`${inputBase} cursor-pointer`}>
                      <option value="" disabled>Select a range</option>
                      {BUDGET_OPTIONS.map((opt) => (<option key={opt} value={opt} style={{ background: "#0f0f0f" }}>{opt}</option>))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="brief" className={labelBase}>Tell us about the project</label>
                    <textarea id="brief" placeholder="Describe the product, the problem, and the pages you want audited." value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} rows={5} className={inputBase} style={{ resize: "vertical" }} aria-invalid={!!errors.brief} />
                    {errors.brief && <p className="font-sans text-xs mt-1.5" style={{ color: "var(--color-error)" }}>{errors.brief}</p>}
                  </div>

                  <button type="submit" className="w-full py-4 rounded-full font-sans font-semibold text-sm tracking-wide cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]" style={{ background: "var(--color-accent)", color: "var(--color-accent-contrast)" }}>
                    Send the Brief
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
