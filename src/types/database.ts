export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image_url: string | null
  author: string
  category: string | null
  tags: string[]
  reading_time_minutes: number | null
  published: boolean
  featured: boolean
  meta_title: string | null
  meta_description: string | null
  views: number
  created_at: string
  updated_at: string
}

export type ContactSubmission = {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  service: string | null
  budget: string | null
  message: string
  source: string | null
  read: boolean
  replied: boolean
  notes: string | null
  created_at: string
}