"use client"

import Image from "next/image"

const COLS = [
  {
    title: "Product",
    links: ["How it works", "Pricing", "Case studies", "Book a call"],
  },
  {
    title: "Capabilities",
    links: ["Web development", "Marketing automation", "SEO", "Content & social", "Chat & voice agents", "AI consultation"],
  },
  {
    title: "Industries",
    links: ["Coaches & Consultants", "E-commerce & Retail", "Real Estate", "Healthcare & Wellness", "Restaurants & Hospitality", "View all industries"],
  },
  {
    title: "Company",
    links: ["About us", "Meet the team", "Customer stories", "Blog", "Contact", "Privacy & terms"],
  },
]

const SOCIALS = ["LinkedIn", "YouTube", "X", "Email"]

export function Footer() {
  return (
    <footer style={{ background: "var(--rl-forest-ink)", color: "rgba(255,255,255,.55)", padding: "64px 0 32px", marginTop: 64, position: "relative" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", gap: 40, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,.08)" }}
          className="grid-cols-2 lg:grid-cols-5">

          {/* Brand col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image src="/assets/logo-mark.png" alt="RevenueLadder mark" width={36} height={36} style={{ height: 36, width: "auto" }} />
              <div>
                <div style={{ fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 900, fontSize: 18, color: "#fff", letterSpacing: "-.01em", lineHeight: 1 }}>
                  RevenueLadder
                </div>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--rl-gold)", marginTop: 4 }}>
                  Welsh Automation Agency
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 280 }}>
              Precision-built websites and automation for Welsh and UK small businesses. Hand-built from Bangor, Gwynedd.
            </p>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>
              Studio 4, The Foundry · Bangor LL57<br />
              +44 (0) 1248 000 000 · hello@revenueladder.co.uk
            </div>
          </div>

          {COLS.map(({ title, links }) => (
            <div key={title}>
              <h4 style={{ fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".18em", color: "var(--rl-gold)", marginBottom: 16 }}>
                {title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: "13.5px", color: "rgba(255,255,255,.55)", textDecoration: "none", transition: "color var(--rl-dur-base)", display: "block" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff" }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.55)" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, fontSize: 12, color: "rgba(255,255,255,.3)" }}>
          <div>© 2026 RevenueLadder Ltd. Registered in Wales · 14528221.</div>
          <div style={{ display: "flex", gap: 8 }}>
            {SOCIALS.map((label) => (
              <a key={label} href="#" aria-label={label} style={{
                width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,.5)", transition: "all var(--rl-dur-base)", textDecoration: "none",
                fontSize: 9, fontWeight: 800,
              }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--rl-gold)"; el.style.color = "var(--rl-forest)" }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,.06)"; el.style.color = "rgba(255,255,255,.5)" }}>
                {label[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
