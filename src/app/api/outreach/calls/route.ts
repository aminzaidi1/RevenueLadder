import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import {
  CALL_OUTCOMES,
  createCall,
  listCalls,
  type CallOutcome,
  type DbCallInsert,
} from "@/lib/supabase/outreach"

export async function GET() {
  try {
    const calls = await listCalls()
    return NextResponse.json(calls)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function isCallOutcome(v: unknown): v is CallOutcome {
  return typeof v === "string" && (CALL_OUTCOMES as readonly string[]).includes(v)
}

function isValidCallInsert(body: unknown): body is DbCallInsert {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return typeof b.prospect_name === "string" && b.prospect_name.trim() !== "" &&
         typeof b.call_date === "string" &&
         isCallOutcome(b.outcome)
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }

    const body: unknown = await request.json()
    if (!isValidCallInsert(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const call = await createCall(body)
    return NextResponse.json(call, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
