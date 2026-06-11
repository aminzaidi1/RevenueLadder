import { NextResponse } from "next/server"
import { fileTypeFromBuffer } from "file-type"
import { createClient } from "@/lib/supabase/server"

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"]

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 })

    const formData = await request.formData()
    const file = formData.get("file")
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 2 MB)" }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const detected = await fileTypeFromBuffer(buffer)
    if (!detected || !ALLOWED_MIME.includes(detected.mime)) {
      return NextResponse.json({ error: "File type not allowed" }, { status: 400 })
    }

    const filename = `${crypto.randomUUID()}.${detected.ext}`

    const { error: uploadError } = await supabase.storage
      .from("writer-avatars")
      .upload(filename, file, { contentType: detected.mime, upsert: false })

    if (uploadError) throw new Error(uploadError.message)

    const { data: { publicUrl } } = supabase.storage
      .from("writer-avatars")
      .getPublicUrl(filename)

    return NextResponse.json({ url: publicUrl }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
