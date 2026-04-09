import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity">
          <Image
            src="/brand/mukamal_logo.svg"
            alt="Mukamal"
            width={96}
            height={22}
          />
        </Link>
        <div className="flex gap-8">
          <Link href="/work" className="footer-link font-sans text-sm cursor-pointer">Work</Link>
          <Link href="/about" className="footer-link font-sans text-sm cursor-pointer">About</Link>
          <Link href="/contact" className="footer-link font-sans text-sm cursor-pointer">Contact</Link>
        </div>
        <span className="font-mono text-xs opacity-30">© 2026 Mukamal</span>
      </div>
    </footer>
  )
}
