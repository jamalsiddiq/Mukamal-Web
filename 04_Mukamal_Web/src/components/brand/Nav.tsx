"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Nav() {
  const pathname = usePathname()

  const links = [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 lg:px-12 py-5">
      <Link href="/" className="font-mono text-sm tracking-widest uppercase opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
        Mukamal
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
    </nav>
  )
}
