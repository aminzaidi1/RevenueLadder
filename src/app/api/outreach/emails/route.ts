import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import {
  EMAIL_OUTCOMES,
  createEmail,
  listEmails,
  type DbEmailInsert,
  type EmailOutcome,
} from "@/lib/supabase/outreach"

export async function GET() {
  try {
    const emails = await listEmails()
    return NextResponse.json(emails)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function isEmailOutcome(v: unknown): v is EmailOutcome {
  return typeof v === "string" && (EMAIL_OUTCOMES as readonly string[]).includes(v)
}

function isValidEmailInsert(body: unknown): body is DbEmailInsert {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return typeof b.prospect_name === "string" && b.prospect_name.trim() !== "" &&
         typeof b.subject_line === "string" && b.subject_line.trim() !== "" &&
         typeof b.email_date === "string" &&
         typeof b.sequence_step === "number" &&
         isEmailOutcome(b.outcome)
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }

    const body: unknown = await request.json()
    if (!isValidEmailInsert(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const email = await createEmail(body)
    return NextResponse.json(email, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
