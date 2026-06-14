"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ArrowRight, X } from "lucide-react"

const MEGA_COL1 = {
  eyebrow: "AI for every business need",
  title: "AI & Automation",
  links: [
    { label: "Marketing Automation",   href: "/services/marketing-automation"   },
    { label: "Voice Agents",           href: "/services/voice-agents"           },
    { label: "Chatbots",               href: "/services/chatbots"               },
    { label: "Personalised AI Agents", href: "/services/personalised-ai-agents" },
    { label: "Content Generation",     href: "/services/content-generation"     },
    { label: "Automated Social Media", href: "/services/automated-social-media" },
    { label: "AI Consultation",        href: "/services/ai-consultation"        },
  ],
}

const MEGA_COL2 = {
  title: "Build & Ship",
  links: [
    { label: "Web Development",     href: "/services/web-development"     },
    { label: "Web App Development", href: "/services/web-app-development" },
    { label: "SEO",                 href: "/services/seo"                 },
    { label: "DevOps & Hosting",    href: "/services/devops-hosting"      },
  ],
  engagementTitle: "Engagement Models",
  engagementLinks: [
    { label: "Audit & Strategy", href: "/services/audit-strategy" },
    { label: "Project Build",    href: "/services/project-build"  },
    { label: "Retainer",         href: "/services/retainer"       },
  ],
}

const MEGA_COL3 = {
  title: "Industries",
  links: [
    { label: "Coaches & Consultants",      href: "/industries/coaches-consultants"     },
    { label: "E-commerce & Retail",        href: "/industries/ecommerce-retail"        },
    { label: "Real Estate",                href: "/industries/real-estate"             },
    { label: "Healthcare & Wellness",      href: "/industries/healthcare-wellness"     },
    { label: "Restaurants & Hospitality",  href: "/industries/restaurants-hospitality" },
    { label: "Legal & Finance",            href: "/industries/legal-finance"           },
    { label: "Home Services & Trades",     href: "/industries/home-services-trades"    },
    { label: "Agencies & Freelancers",     href: "/industries/agencies-freelancers"    },
    { label: "Education & Online Courses", href: "/industries/education-courses"       },
    { label: "SaaS & Tech Startups",       href: "/industries/saas-tech-startups"      },
  ],
}

const MEGA_COL4_LINKS = [
  { label: "Arrow Taxi Bangor -- 0 missed calls", href: "/case-studies/arrow-taxi-bangor" },
  { label: "All case studies",                    href: "/case-studies"                   },
]

function MegaLink({ label, href, dark = false }: { label: string; href: string; dark?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        fontSize: "13.5px",
        fontWeight: 600,
        color: dark
          ? hovered ? "var(--rl-gold)" : "rgba(255,255,255,.78)"
          : hovered ? "var(--rl-forest)" : "var(--rl-fg-1)",
        padding: "7px 10px",
        borderRadius: 9,
        background: dark
          ? hovered ? "rgba(255,196,37,.10)" : "transparent"
          : hovered ? "rgba(26,77,46,.06)" : "transparent",
        transition: "background var(--rl-dur-base), color var(--rl-dur-base)",
        textDecoration: "none",
      }}
    >
      <span>{label}</span>
      <ArrowRight size={14} style={{ opacity: 0.55 }} aria-hidden="true" />
    </Link>
  )
}

function MegaColHeader({ title, eyebrow, dark = false }: { title: string; eyebrow?: string; dark?: boolean }) {
  return (
    <>
      {eyebrow && (
        <div style={{
          fontSize: 10, fontWeight: 800, textTransform: "uppercase",
          letterSpacing: ".18em",
          color: dark ? "var(--rl-gold)" : "var(--rl-forest)",
        }}>
          {eyebrow}
        </div>
      )}
      <div style={{
        fontFamily: "var(--font-montserrat, var(--rl-font-display))",
        fontWeight: 800, fontSize: 22, letterSpacing: "-.02em",
        color: dark ? "#fff" : "var(--rl-forest)", marginTop: 2,
      }}>
        {title}
      </div>
      <div style={{ height: 3, width: 36, background: "var(--rl-gold)", borderRadius: 99, margin: "4px 0 8px" }} />
    </>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMegaOpen(false); setMobileOpen(false) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 880) setMobileOpen(false) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const openMega = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMegaOpen(true) }
  const closeMega = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 160) }

  const navLinkStyle = (active = false) => ({
    background: active ? "rgba(26,77,46,.07)" : "none",
    border: "none" as const,
    cursor: "pointer" as const,
    fontFamily: "var(--rl-font-body)",
    fontSize: 14,
    fontWeight: 600,
    color: active ? "var(--rl-forest)" : "var(--rl-fg-2)",
    padding: "8px 14px",
    borderRadius: 9999,
    display: "inline-flex" as const,
    alignItems: "center" as const,
    gap: 4,
    textDecoration: "none" as const,
    transition: "background var(--rl-dur-base), color var(--rl-dur-base)",
  })

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 80, padding: "16px 24px 0" }}>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64, padding: "0 14px 0 22px", borderRadius: 20,
        background: scrolled ? "rgba(237,234,229,.94)" : "rgba(237,234,229,.72)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255,255,255,.80)",
        boxShadow: scrolled
          ? "var(--rl-shadow-lg), var(--rl-shadow-inset)"
          : "var(--rl-shadow-md), var(--rl-shadow-inset)",
        maxWidth: 1240, margin: "0 auto",
        transition: "background .35s, box-shadow .35s",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
          <Image src="/assets/logo-mark.png" alt="RevenueLadder mark" width={32} height={32} style={{ height: 32, width: "auto" }} />
          <div>
            <div style={{ fontFamily: "var(--font-montserrat, var(--rl-font-display))", fontWeight: 900, fontSize: 16, letterSpacing: "-0.01em", color: "var(--rl-forest)", lineHeight: 1 }}>
              RevenueLadder
            </div>
            <div style={{ color: "var(--rl-fg-3)", fontSize: 9, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", marginTop: 3 }}>
              Welsh Automation Agency
            </div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div style={{ gap: 2 }} className="hidden lg:flex" role="menubar">
          <Link href="/blog" style={navLinkStyle()}>Blog</Link>
          <div onMouseEnter={openMega} onMouseLeave={closeMega}>
            <button onClick={() => setMegaOpen((o) => !o)} aria-expanded={megaOpen} style={navLinkStyle(megaOpen)}>
              Services <ChevronDown size={14} strokeWidth={2.25} />
            </button>
          </div>
          <Link href="/pricing" style={navLinkStyle()}>Pricing</Link>
          <Link href="/case-studies" style={navLinkStyle()}>Case studies</Link>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/login" className="hidden lg:inline-flex" style={{ background: "transparent", fontFamily: "var(--rl-font-body)", fontWeight: 600, fontSize: 13, height: 36, padding: "0 14px", borderRadius: 10, color: "var(--rl-fg-2)", alignItems: "center", textDecoration: "none" }}>
            Sign in
          </Link>
          <Link href="/contact" className="hidden lg:inline-flex" style={{ background: "var(--rl-forest)", color: "#fff", fontFamily: "var(--rl-font-body)", fontWeight: 600, fontSize: 13, height: 36, padding: "0 14px", borderRadius: 10, alignItems: "center", gap: 6, boxShadow: "0 2px 8px rgba(26,77,46,.28)", textDecoration: "none" }}>
            Book a call <ArrowRight size={14} />
          </Link>
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => { setMobileOpen((o) => !o); setMobileServicesOpen(false) }}
            className="flex lg:hidden"
            style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(26,77,46,.06)", border: "1px solid rgba(26,77,46,.10)", color: "var(--rl-forest)", cursor: "pointer", alignItems: "center", justifyContent: "center" }}
          >
            {mobileOpen ? <X size={20} strokeWidth={2.25} /> : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
                <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: "absolute", left: 24, right: 24, top: "calc(100% + 8px)",
        maxWidth: 1240, margin: "0 auto",
        background: "var(--rl-surface)", borderRadius: 20,
        border: "1px solid var(--rl-border-soft)", boxShadow: "var(--rl-shadow-xl)",
        padding: 16, display: "flex", flexDirection: "column", gap: 4,
        maxHeight: "calc(100svh - 100px)", overflowY: "auto",
        opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(-6px)",
        pointerEvents: mobileOpen ? "auto" : "none",
        transition: "opacity .25s var(--rl-ease-out), transform .25s var(--rl-ease-out)",
      }} className="lg:hidden">
        <Link href="/blog" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "14px 16px", borderRadius: 12, fontSize: 15, fontWeight: 600, color: "var(--rl-fg-1)", textDecoration: "none" }}>
          Blog <ArrowRight size={14} style={{ color: "var(--rl-fg-3)" }} />
        </Link>

        {/* Services accordion */}
        <div>
          <button
            onClick={() => setMobileServicesOpen((o) => !o)}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "14px 16px", borderRadius: 12, fontSize: 15, fontWeight: 600, color: "var(--rl-fg-1)", background: mobileServicesOpen ? "rgba(26,77,46,.05)" : "none", border: "none", cursor: "pointer" }}
          >
            Services
            <ChevronDown size={14} style={{ color: "var(--rl-fg-3)", transform: mobileServicesOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
          </button>
          {mobileServicesOpen && (
            <div style={{ paddingLeft: 8, paddingBottom: 8, display: "flex", flexDirection: "column", gap: 1, maxHeight: "40vh", overflowY: "auto" }}>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--rl-fg-3)", padding: "8px 12px 4px" }}>AI &amp; Automation</div>
              {MEGA_COL1.links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => { setMobileOpen(false); setMobileServicesOpen(false) }} style={{ display: "block", padding: "9px 12px", borderRadius: 10, fontSize: 14, fontWeight: 500, color: "var(--rl-fg-2)", textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--rl-fg-3)", padding: "10px 12px 4px" }}>Build &amp; Ship</div>
              {MEGA_COL2.links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => { setMobileOpen(false); setMobileServicesOpen(false) }} style={{ display: "block", padding: "9px 12px", borderRadius: 10, fontSize: 14, fontWeight: 500, color: "var(--rl-fg-2)", textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--rl-fg-3)", padding: "10px 12px 4px" }}>Engagement Models</div>
              {MEGA_COL2.engagementLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => { setMobileOpen(false); setMobileServicesOpen(false) }} style={{ display: "block", padding: "9px 12px", borderRadius: 10, fontSize: 14, fontWeight: 500, color: "var(--rl-fg-2)", textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link href="/pricing" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "14px 16px", borderRadius: 12, fontSize: 15, fontWeight: 600, color: "var(--rl-fg-1)", textDecoration: "none" }}>
          Pricing <ArrowRight size={14} style={{ color: "var(--rl-fg-3)" }} />
        </Link>
        <Link href="/case-studies" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "14px 16px", borderRadius: 12, fontSize: 15, fontWeight: 600, color: "var(--rl-fg-1)", textDecoration: "none" }}>
          Case studies <ArrowRight size={14} style={{ color: "var(--rl-fg-3)" }} />
        </Link>
        <div style={{ marginTop: 12, paddingTop: 16, borderTop: "1px solid var(--rl-border-soft)", display: "flex", flexDirection: "column", gap: 8 }}>
          <Link href="/contact" onClick={() => setMobileOpen(false)} style={{ background: "var(--rl-forest)", color: "#fff", fontFamily: "var(--rl-font-body)", fontWeight: 600, fontSize: 14, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, textDecoration: "none" }}>
            Book a call <ArrowRight size={14} />
          </Link>
          <Link href="/login" onClick={() => setMobileOpen(false)} style={{ background: "transparent", border: "2px solid rgba(26,77,46,.28)", color: "var(--rl-forest)", fontFamily: "var(--rl-font-body)", fontWeight: 600, fontSize: 14, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>Sign in</Link>
        </div>
      </div>

      {/* Mega menu */}
      <div
        onMouseEnter={openMega} onMouseLeave={closeMega}
        style={{
          position: "absolute", left: 24, right: 24, top: "calc(100% + 8px)",
          maxWidth: 1240, margin: "0 auto",
          pointerEvents: megaOpen ? "auto" : "none",
          opacity: megaOpen ? 1 : 0, transform: megaOpen ? "translateY(0)" : "translateY(-4px)",
          transition: "opacity .25s var(--rl-ease-out), transform .25s var(--rl-ease-out)",
        }}
        className="hidden lg:block"
      >
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr 1fr .9fr", background: "var(--rl-surface)", borderRadius: 24, border: "1px solid var(--rl-border-soft)", boxShadow: "var(--rl-shadow-xl)", overflow: "hidden" }}>
          {/* Col 1 */}
          <div style={{ padding: "28px 26px", display: "flex", flexDirection: "column", gap: 0, minHeight: 380, background: "var(--rl-forest-tint)", position: "relative" }}>
            <div style={{ position: "absolute", right: 0, top: 24, bottom: 24, width: 1, background: "rgba(26,77,46,.10)" }} />
            <MegaColHeader title={MEGA_COL1.title} eyebrow={MEGA_COL1.eyebrow} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {MEGA_COL1.links.map((l) => <MegaLink key={l.href} label={l.label} href={l.href} />)}
            </div>
          </div>
          {/* Col 2 */}
          <div style={{ padding: "28px 26px", display: "flex", flexDirection: "column", gap: 0, minHeight: 380 }}>
            <MegaColHeader title={MEGA_COL2.title} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {MEGA_COL2.links.map((l) => <MegaLink key={l.href} label={l.label} href={l.href} />)}
            </div>
            <div style={{ height: 1, background: "var(--rl-border-soft)", margin: "16px 0 10px" }} />
            <MegaColHeader title={MEGA_COL2.engagementTitle} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {MEGA_COL2.engagementLinks.map((l) => <MegaLink key={l.href} label={l.label} href={l.href} />)}
            </div>
          </div>
          {/* Col 3 */}
          <div style={{ padding: "28px 26px", display: "flex", flexDirection: "column", gap: 0, minHeight: 380 }}>
            <MegaColHeader title={MEGA_COL3.title} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {MEGA_COL3.links.map((l) => <MegaLink key={l.href} label={l.label} href={l.href} />)}
            </div>
          </div>
          {/* Col 4 dark */}
          <div style={{ padding: "28px 26px", display: "flex", flexDirection: "column", gap: 0, minHeight: 380, background: "var(--rl-forest-ink)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "var(--rl-pattern-ladder)", opacity: 0.18, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
              <MegaColHeader title="Case Studies" eyebrow="Featured Work" dark />
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {MEGA_COL4_LINKS.map((l) => <MegaLink key={l.href} label={l.label} href={l.href} dark />)}
              </div>
              <div style={{ marginTop: "auto", paddingTop: 16, fontSize: 12, color: "rgba(255,255,255,.45)" }}>
                48 Welsh & UK SMEs onboarded since 2022. Hand-built from Bangor.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
