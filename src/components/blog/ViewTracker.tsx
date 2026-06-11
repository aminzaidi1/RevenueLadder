"use client"

import { useEffect } from "react"

export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`/api/blog/${slug}/view`, { method: "POST" })
  }, [slug])
  return null
}
