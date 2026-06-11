import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getBlogPost, listComments, createComment } from "@/lib/supabase/blog"
import type { BlogCommentInsert } from "@/lib/supabase/blog"

type Params = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, { params }: Params) {
  try {
    const { slug } = await params
    const post = await getBlogPost(slug)
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const comments = await listComments({ postId: post.id, approvedOnly: !user })
    return NextResponse.json(comments)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function isValidCommentInsert(body: unknown): body is Omit<BlogCommentInsert, "post_id"> {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return (
    typeof b.author_name === "string" && b.author_name.trim() !== "" &&
    typeof b.author_email === "string" && b.author_email.includes("@") &&
    typeof b.content === "string" && b.content.trim() !== ""
  )
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { slug } = await params
    const post = await getBlogPost(slug)
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const body: unknown = await request.json()
    if (!isValidCommentInsert(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { author_name, author_email, content } = body
    await createComment({ post_id: post.id, author_name, author_email, content })
    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
