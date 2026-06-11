import { createClient } from "@/lib/supabase/server"

export interface DbBlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image_url: string | null
  author: string
  author_role: string | null
  category: string | null
  tags: string[] | null
  reading_time_minutes: number | null
  published: boolean
  featured: boolean
  meta_title: string | null
  meta_description: string | null
  views: number
  created_at: string
  updated_at: string
  writer_profile_id: string | null
}

export type DbBlogPostInsert = Omit<DbBlogPost, "id" | "views" | "created_at" | "updated_at">
export type DbBlogPostUpdate = Partial<DbBlogPostInsert>

export interface WriterProfile {
  id: string
  name: string
  role: string | null
  email: string | null
  bio: string | null
  avatar_url: string | null
  twitter_handle: string | null
  linkedin_url: string | null
  created_at: string
  updated_at: string
}

export type WriterProfileInsert = Omit<WriterProfile, "id" | "created_at" | "updated_at">
export type WriterProfileUpdate = Partial<WriterProfileInsert>

export interface BlogComment {
  id: string
  post_id: string
  author_name: string
  author_email: string
  content: string
  approved: boolean
  created_at: string
}

export type BlogCommentInsert = Omit<BlogComment, "id" | "approved" | "created_at">

export interface BlogCommentWithPost extends BlogComment {
  blog_posts: { title: string; slug: string } | null
}

export interface DbBlogPostWithWriter extends DbBlogPost {
  writer_profiles: WriterProfile | null
}

export interface BlogStats {
  publishedCount: number
  draftCount: number
  totalViews: number
  pendingComments: number
  topPosts: Array<{ title: string; slug: string; views: number }>
}

// ── Blog Posts ──────────────────────────────────────────────────────

export async function listBlogPosts(opts?: { publishedOnly?: boolean }): Promise<DbBlogPost[]> {
  const supabase = await createClient()
  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (opts?.publishedOnly) {
    query = query.eq("published", true)
  }

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getBlogPost(slug: string): Promise<DbBlogPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error?.code === "PGRST116") return null
  if (error) throw new Error(error.message)
  return data
}

export async function getBlogPostWithWriter(slug: string): Promise<DbBlogPostWithWriter | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, writer_profiles(*)")
    .eq("slug", slug)
    .single()

  if (error?.code === "PGRST116") return null
  if (error) throw new Error(error.message)
  return data as unknown as DbBlogPostWithWriter
}

export async function createBlogPost(post: DbBlogPostInsert): Promise<DbBlogPost> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .insert(post)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateBlogPost(slug: string, updates: DbBlogPostUpdate): Promise<DbBlogPost> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .update(
      Object.keys(updates).length > 0
        ? { ...updates, updated_at: new Date().toISOString() }
        : updates
    )
    .eq("slug", slug)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteBlogPost(slug: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("slug", slug)

  if (error) throw new Error(error.message)
}

export async function getBlogStats(): Promise<BlogStats> {
  const supabase = await createClient()

  const [postsRes, commentsRes] = await Promise.all([
    supabase.from("blog_posts").select("title, slug, published, views"),
    supabase.from("blog_comments").select("approved"),
  ])

  const posts = postsRes.data ?? []
  const comments = commentsRes.data ?? []

  const published = posts.filter((p) => p.published)
  const drafts = posts.filter((p) => !p.published)
  const totalViews = published.reduce((sum, p) => sum + (p.views ?? 0), 0)
  const pendingComments = comments.filter((c) => !c.approved).length

  const topPosts = [...published]
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 5)
    .map((p) => ({ title: p.title as string, slug: p.slug as string, views: (p.views ?? 0) as number }))

  return { publishedCount: published.length, draftCount: drafts.length, totalViews, pendingComments, topPosts }
}

// ── Writer Profiles ─────────────────────────────────────────────────

export async function listWriters(): Promise<WriterProfile[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("writer_profiles")
    .select("*")
    .order("name", { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getWriter(id: string): Promise<WriterProfile | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("writer_profiles")
    .select("*")
    .eq("id", id)
    .single()

  if (error?.code === "PGRST116") return null
  if (error) throw new Error(error.message)
  return data
}

export async function createWriter(writer: WriterProfileInsert): Promise<WriterProfile> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("writer_profiles")
    .insert(writer)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateWriter(id: string, updates: WriterProfileUpdate): Promise<WriterProfile> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("writer_profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteWriter(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("writer_profiles")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
}

// ── Blog Comments ───────────────────────────────────────────────────

export async function listComments(opts?: { postId?: string; approvedOnly?: boolean }): Promise<BlogComment[]> {
  const supabase = await createClient()
  let query = supabase
    .from("blog_comments")
    .select("*")
    .order("created_at", { ascending: true })

  if (opts?.postId) query = query.eq("post_id", opts.postId)
  if (opts?.approvedOnly) query = query.eq("approved", true)

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function listAllCommentsWithPost(): Promise<BlogCommentWithPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_comments")
    .select("*, blog_posts(title, slug)")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as BlogCommentWithPost[]
}

export async function createComment(comment: BlogCommentInsert): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from("blog_comments").insert(comment)
  if (error) throw new Error(error.message)
}

export async function updateComment(id: string, updates: { approved?: boolean }): Promise<BlogComment> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_comments")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteComment(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from("blog_comments").delete().eq("id", id)
  if (error) throw new Error(error.message)
}
