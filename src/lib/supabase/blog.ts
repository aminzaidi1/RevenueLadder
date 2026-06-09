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
}

export type DbBlogPostInsert = Omit<DbBlogPost, "id" | "views" | "created_at" | "updated_at">
export type DbBlogPostUpdate = Partial<DbBlogPostInsert>

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
