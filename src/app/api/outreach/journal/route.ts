import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import {
  createJournal,
  listJournal,
  type DbJournalInsert,
} from "@/lib/supabase/outreach"

export async function GET() {
  try {
    const entries = await listJournal()
    return NextResponse.json(entries)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function isValidJournalInsert(body: unknown): body is DbJournalInsert {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return typeof b.name === "string" && b.name.trim() !== "" &&
         typeof b.entry_date === "string"
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }

    const body: unknown = await request.json()
    if (!isValidJournalInsert(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const entry = await createJournal(body)
    return NextResponse.json(entry, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
