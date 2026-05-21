import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getBlogPost, updateBlogPost, deleteBlogPost } from "@/lib/supabase/blog"
import type { DbBlogPostUpdate } from "@/lib/supabase/blog"

type Params = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, { params }: Params) {
  try {
    const { slug } = await params
    const post = await getBlogPost(slug)
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function isValidUpdate(body: unknown): body is DbBlogPostUpdate {
  return typeof body === "object" && body !== null
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 })

    const { slug } = await params
    const body: unknown = await request.json()
    if (!isValidUpdate(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const post = await updateBlogPost(slug, body)
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 })

    const { slug } = await params
    const existing = await getBlogPost(slug)
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })

    await deleteBlogPost(slug)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
