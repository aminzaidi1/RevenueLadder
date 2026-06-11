import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

type Params = { params: Promise<{ slug: string }> }

export async function POST(_req: Request, { params }: Params) {
  try {
    const { slug } = await params
    const supabase = createAdminClient()

    const { data: post } = await supabase
      .from("blog_posts")
      .select("views")
      .eq("slug", slug)
      .eq("published", true)
      .single()

    if (!post) return NextResponse.json({ ok: true })

    await supabase
      .from("blog_posts")
      .update({ views: (post.views ?? 0) + 1 })
      .eq("slug", slug)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
