"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, FileText, Inbox, LogOut } from "lucide-react"

const NAV = [
  {
    group: "Manage",
    links: [
      { href: "/dashboard",          label: "Overview", icon: LayoutGrid },
      { href: "/dashboard/blog",     label: "Blog",     icon: FileText,  pip: true },
      { href: "/dashboard/contacts", label: "Contacts", icon: Inbox },
    ],
  },
]

export function DashSidebar({ email }: { email: string }) {
  const path = usePathname()

  const initials = email
    .split("@")[0]
    .split(/[._-]/)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("") || "RL"

  return (
    <nav className="sidebar">
      <div className="sb-hd">
        <div className="sb-brand">
          <div className="sb-mark">RL</div>
          <div className="txt">
            <div className="nm">Revenue Ladder</div>
            <div className="sub">Internal tools</div>
          </div>
        </div>
      </div>

      <div className="sb-nav">
        {NAV.map((grp) => (
          <div key={grp.group}>
            <div className="sb-grp-lbl">{grp.group}</div>
            <div className="sb-grp">
              {grp.links.map(({ href, label, icon: Icon, pip }) => {
                const active = href === "/dashboard"
                  ? path === href
                  : path.startsWith(href)
                return (
                  <Link key={href} href={href} className={`sb-lnk${active ? " on" : ""}`}>
                    <span className="ico"><Icon size={16} strokeWidth={2} /></span>
                    <span className="lbl">{label}</span>
                    {pip && !active && <span className="pip" />}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="sb-ft">
        <div className="sb-user">
          <div className="sb-av">{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sb-uname">{email}</div>
            <div className="sb-urole">Admin</div>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="sb-signout" title="Sign out">
              <LogOut size={14} strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}
