"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

const COLS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Pricing",       href: "/pricing"      },
      { label: "Case studies",  href: "/case-studies" },
      { label: "Book a call",   href: "https://calendly.com/revenueladder/30min", external: true },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "Web development",      href: "/services/web-development"        },
      { label: "Marketing automation", href: "/services/marketing-automation"   },
      { label: "SEO",                  href: "/services/seo"                    },
      { label: "Content & social",     href: "/services/automated-social-media" },
      { label: "Chat & voice agents",  href: "/services/chatbots"               },
      { label: "AI consultation",      href: "/services/ai-consultation"        },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Coaches & Consultants",     href: "/industries/coaches-consultants"      },
      { label: "E-commerce & Retail",       href: "/industries/ecommerce-retail"         },
      { label: "Real Estate",               href: "/industries/real-estate"              },
      { label: "Healthcare & Wellness",     href: "/industries/healthcare-wellness"      },
      { label: "Restaurants & Hospitality", href: "/industries/restaurants-hospitality"  },
      { label: "View all industries",       href: "/industries"                          },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us",        href: "/about"         },
      { label: "Blog",            href: "/blog"          },
      { label: "Contact",         href: "/contact"       },
      { label: "Privacy & terms", href: "/privacy-terms" },
    ],
  },
]

const SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer style={{ background: "var(--rl-forest-ink)", color: "var(--rl-fg-on-dark-2)", padding: "64px 0 32px", marginTop: 64, position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">
        <div className="rl-footer-grid" style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}>

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
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: "13.5px", textDecoration: "none", display: "block" }}>
                        {label}
                      </a>
                    ) : (
                      <Link href={href} className="footer-link" style={{ fontSize: "13.5px", textDecoration: "none", display: "block" }}>
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rl-footer-bottom" style={{ paddingTop: 24, fontSize: 12, color: "rgba(255,255,255,.3)" }}>
          <div>© 2026 RevenueLadder Ltd. Registered in Wales · 14528221.</div>
          <div style={{ display: "flex", gap: 8 }}>
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="footer-social"
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
