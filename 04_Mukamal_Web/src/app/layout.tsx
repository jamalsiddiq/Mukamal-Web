import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mukamal — Design That Converts",
  description:
    "Mukamal audits the friction between your interface and your revenue — then fixes it with evidence, not opinion. Clinical UX audits, CRO design, and design systems for ambitious product teams.",
  openGraph: {
    title: "Mukamal — Design That Converts",
    description: "Clinical UX audits and conversion-focused design. Your UX has a gap. We find it.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="antialiased noise-overlay min-h-[100dvh]">
        {children}
      </body>
    </html>
  )
}
