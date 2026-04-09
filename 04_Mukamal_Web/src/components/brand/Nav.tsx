"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function Nav() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<"dark" | "light">("light")

  useEffect(() => {
    const stored = localStorage.getItem("mukamal-theme") as "dark" | "light" | null
    const initial = stored ?? "light"
    setTheme(initial)
    document.documentElement.setAttribute("data-theme", initial)
  }, [])

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    localStorage.setItem("mukamal-theme", next)
    document.documentElement.setAttribute("data-theme", next)
  }

  const links = [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 lg:px-12 py-5">
      <Link href="/" className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
        <Image
          src={theme === "dark" ? "/brand/mukamal_logo_white.svg" : "/brand/mukamal_logo.svg"}
          alt="Mukamal"
          width={120}
          height={28}
          priority
        />
      </Link>
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-sans text-sm cursor-pointer ${
              pathname === link.href ? "text-[var(--color-accent)]" : "nav-link"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {/* Theme toggle — preview only */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="font-mono text-xs uppercase tracking-widest opacity-40 hover:opacity-80 transition-opacity cursor-pointer px-2 py-1 rounded border border-[var(--color-border)]"
        >
          {theme === "dark" ? "☀" : "◑"}
        </button>
        <Link
          href="/contact"
          className={`text-sm font-sans font-semibold tracking-wide px-5 py-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
            pathname === "/contact"
              ? "border-[var(--color-accent)] text-[var(--color-accent)]"
              : "border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          }`}
        >
          Get in touch
        </Link>
      </div>
    </nav>
  )
}
