import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { updateComment, deleteComment } from "@/lib/supabase/blog"

type Params = { params: Promise<{ slug: string; id: string }> }

export async function PATCH(request: Request, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 })

    const { id } = await params
    const body: unknown = await request.json()

    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const b = body as Record<string, unknown>
    const updates: { approved?: boolean } = {}
    if (typeof b.approved === "boolean") updates.approved = b.approved

    const comment = await updateComment(id, updates)
    return NextResponse.json(comment)
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
    await deleteComment(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
