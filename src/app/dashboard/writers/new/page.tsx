import type { Metadata } from "next"
import Link from "next/link"
import { WriterForm } from "@/components/dashboard/WriterForm"

export const metadata: Metadata = { title: "New writer | Revenue Ladder" }

export default function NewWriterPage() {
  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/writers">Writers</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">New writer</span>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>New writer</h1>
            <div className="sub">Create a writer profile to link to blog posts.</div>
          </div>
        </div>

        <WriterForm />
      </div>
    </>
  )
}
