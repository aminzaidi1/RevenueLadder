import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { listBlogPosts, createBlogPost } from "@/lib/supabase/blog"
import type { DbBlogPostInsert } from "@/lib/supabase/blog"

export async function GET() {
  try {
    const posts = await listBlogPosts()
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function isValidInsert(body: unknown): body is DbBlogPostInsert {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return typeof b.title === "string" && b.title.trim() !== "" &&
         typeof b.slug === "string" && b.slug.trim() !== "" &&
         typeof b.content === "string" &&
         typeof b.author === "string" && b.author.trim() !== ""
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }

    const body: unknown = await request.json()
    if (!isValidInsert(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const post = await createBlogPost(body)
    return NextResponse.json(post, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
