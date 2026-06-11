import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { listWriters, createWriter } from "@/lib/supabase/blog"
import type { WriterProfileInsert } from "@/lib/supabase/blog"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 })

    const writers = await listWriters()
    return NextResponse.json(writers)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function isValidInsert(body: unknown): body is WriterProfileInsert {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return typeof b.name === "string" && b.name.trim() !== ""
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 })

    const body: unknown = await request.json()
    if (!isValidInsert(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const writer = await createWriter(body)
    return NextResponse.json(writer, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
