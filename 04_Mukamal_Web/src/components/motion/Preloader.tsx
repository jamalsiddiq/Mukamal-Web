"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Skip if already seen in this session
    if (sessionStorage.getItem("mukamal-preloader-shown")) {
      setDone(true)
      onComplete?.()
      return
    }

    let start: number | null = null
    const duration = 2200

    const tick = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * 100))
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        // Exit animation
        exitPreloader()
      }
    }

    const raf = requestAnimationFrame(tick)

    async function exitPreloader() {
      try {
        const { gsap } = await import("gsap")
        const mm = gsap.matchMedia()
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.to(ref.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              sessionStorage.setItem("mukamal-preloader-shown", "1")
              setDone(true)
              onComplete?.()
            },
          })
        })
        mm.add("(prefers-reduced-motion: reduce)", () => {
          sessionStorage.setItem("mukamal-preloader-shown", "1")
          setDone(true)
          onComplete?.()
        })
      } catch {
        sessionStorage.setItem("mukamal-preloader-shown", "1")
        setDone(true)
        onComplete?.()
      }
    }

    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  if (done) return null

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: "var(--color-background)" }}
      aria-hidden="true"
    >
      {/* Logo */}
      <div className="mb-16 opacity-90">
        <Image
          src="/brand/mukamal_logo.svg"
          alt="Mukamal"
          width={140}
          height={32}
          priority
        />
      </div>

      {/* Counter */}
      <div
        className="font-display text-[clamp(5rem,15vw,12rem)] leading-none tabular-nums"
        style={{ color: "var(--color-text)", opacity: 0.15 }}
      >
        {String(count).padStart(3, "0")}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-10 left-[var(--gutter)] right-[var(--gutter)]">
        <div
          className="h-px w-full rounded-full overflow-hidden"
          style={{ background: "var(--color-border)" }}
        >
          <div
            className="h-full rounded-full transition-none"
            style={{
              width: `${count}%`,
              background: "var(--color-accent)",
              transition: "width 0.05s linear",
            }}
          />
        </div>
        <p
          className="font-mono text-xs uppercase tracking-widest mt-3 opacity-40"
          style={{ color: "var(--color-text-muted)" }}
        >
          Loading
        </p>
      </div>
    </div>
  )
}
