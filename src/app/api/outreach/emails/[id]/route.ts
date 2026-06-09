import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import {
  EMAIL_OUTCOMES,
  deleteEmail,
  getEmail,
  updateEmail,
  type DbEmailUpdate,
  type EmailOutcome,
} from "@/lib/supabase/outreach"

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params
    const email = await getEmail(id)
    if (!email) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(email)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function isEmailOutcome(v: unknown): v is EmailOutcome {
  return typeof v === "string" && (EMAIL_OUTCOMES as readonly string[]).includes(v)
}

function isValidUpdate(body: unknown): body is DbEmailUpdate {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  if (b.outcome !== undefined && !isEmailOutcome(b.outcome)) return false
  return true
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

    const existing = await getEmail(id)
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
    if (existing.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const email = await updateEmail(id, body)
    return NextResponse.json(email)
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
    const existing = await getEmail(id)
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
    if (existing.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await deleteEmail(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
