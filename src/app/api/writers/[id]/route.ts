import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getWriter, updateWriter, deleteWriter } from "@/lib/supabase/blog"
import type { WriterProfileUpdate } from "@/lib/supabase/blog"

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 })

    const { id } = await params
    const writer = await getWriter(id)
    if (!writer) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(writer)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function isValidUpdate(body: unknown): body is WriterProfileUpdate {
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

    const writer = await updateWriter(id, body)
    return NextResponse.json(writer)
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
    const writer = await getWriter(id)
    if (!writer) return NextResponse.json({ error: "Not found" }, { status: 404 })

    await deleteWriter(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
