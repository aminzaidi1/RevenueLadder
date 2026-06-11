import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getWriter } from "@/lib/supabase/blog"
import { WriterForm } from "@/components/dashboard/WriterForm"

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const writer = await getWriter(id)
  return { title: writer ? `Edit: ${writer.name} | Revenue Ladder` : "Writer not found" }
}

export default async function EditWriterPage({ params }: Props) {
  const { id } = await params
  const writer = await getWriter(id)

  if (!writer) notFound()

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar">
          <div className="bc">
            <Link href="/dashboard">Revenue Ladder</Link>
            <span className="bc-sep">/</span>
            <Link href="/dashboard/writers">Writers</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">{writer.name}</span>
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="page-head">
          <div>
            <h1>Edit writer</h1>
            <div className="sub mono" style={{ fontSize: 12 }}>{writer.id}</div>
          </div>
        </div>

        <WriterForm writer={writer} />
      </div>
    </>
  )
}
