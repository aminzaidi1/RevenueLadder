import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export function CaseStudyBreadcrumb({ current }: { current: string }) {
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">
      <nav aria-label="Breadcrumb" className="cs-breadcrumb">
        <Link href="/">
          <ChevronLeft size={12} aria-hidden="true" />
          Home
        </Link>
        <span className="cs-breadcrumb-sep" aria-hidden="true">/</span>
        <Link href="/case-studies">Case studies</Link>
        <span className="cs-breadcrumb-sep" aria-hidden="true">/</span>
        <span className="cs-breadcrumb-current">{current}</span>
      </nav>
    </div>
  )
}
