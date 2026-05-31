import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import {
  KNOWLEDGE_KEYS,
  getKnowledgeByKey,
  updateKnowledge,
  type DbKnowledgeUpdate,
  type KnowledgeKey,
} from "@/lib/supabase/outreach"

type Params = { params: Promise<{ key: string }> }

function isKnowledgeKey(v: string): v is KnowledgeKey {
  return (KNOWLEDGE_KEYS as readonly string[]).includes(v)
}

function isValidUpdate(body: unknown): body is DbKnowledgeUpdate {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  if (b.title !== undefined && typeof b.title !== "string") return false
  if (b.content !== undefined && typeof b.content !== "string") return false
  return true
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const { key } = await params
    if (!isKnowledgeKey(key)) {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 })
    }
    const doc = await getKnowledgeByKey(key)
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(doc)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 })

    const { key } = await params
    if (!isKnowledgeKey(key)) {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 })
    }

    const body: unknown = await request.json()
    if (!isValidUpdate(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const doc = await updateKnowledge(key, body)
    return NextResponse.json(doc)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
