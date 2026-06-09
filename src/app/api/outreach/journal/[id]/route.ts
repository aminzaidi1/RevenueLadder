import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import {
  deleteJournal,
  getJournal,
  updateJournal,
  type DbJournalUpdate,
} from "@/lib/supabase/outreach"

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params
    const entry = await getJournal(id)
    if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(entry)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function isValidUpdate(body: unknown): body is DbJournalUpdate {
  return typeof body === "object" && body !== null
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 })

    const { id } = await params
    const body: unknown = await request.json()
    if (!isValidUpdate(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const existing = await getJournal(id)
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
    if (existing.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const entry = await updateJournal(id, body)
    return NextResponse.json(entry)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 })

    const { id } = await params
    const existing = await getJournal(id)
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
    if (existing.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await deleteJournal(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
