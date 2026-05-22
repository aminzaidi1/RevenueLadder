import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"

interface ContactBody {
  name: string
  email: string
  message: string
  company?: string
  phone?: string
  service?: string
  budget?: string
}

function isValidBody(body: unknown): body is ContactBody {
  if (!body || typeof body !== "object") return false
  const b = body as Record<string, unknown>
  if (typeof b.name !== "string" || !b.name.trim()) return false
  if (typeof b.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim())) return false
  if (typeof b.message !== "string" || !b.message.trim()) return false
  const optionals = ["company", "phone", "service", "budget"] as const
  for (const key of optionals) {
    if (b[key] !== undefined && typeof b[key] !== "string") return false
  }
  return true
}

export async function POST(request: Request) {
  try {
    if (!checkRateLimit(getClientIp(request), 5, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    const body: unknown = await request.json()

    if (!isValidBody(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from("contact_submissions").insert({
      name: body.name.trim().slice(0, 200),
      email: body.email.trim().toLowerCase().slice(0, 320),
      message: body.message.trim().slice(0, 10_000),
      company: body.company?.trim().slice(0, 200) || null,
      phone: body.phone?.trim().slice(0, 50) || null,
      service: body.service?.trim().slice(0, 200) || null,
      budget: body.budget?.trim().slice(0, 100) || null,
      source: "website/contact",
    })

    if (error) {
      return NextResponse.json({ error: "Failed to save submission" }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
