// Shared types and runtime constants for the Outreach OS feature.
// SAFE TO IMPORT FROM CLIENT COMPONENTS — no server-only deps.
// The server-side data access layer at src/lib/supabase/outreach.ts
// re-exports from this module so existing server callers keep working.

// Returns YYYY-MM-DD in the caller's LOCAL timezone. Do not use
// toISOString().slice(0,10) for outreach dates — that resolves to UTC
// and silently shifts off-by-one for non-UTC timezones, which breaks
// the call-volume chart bucket lookup against Postgres date columns.
export function localYmd(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export const CALL_OUTCOMES = [
  "booked",
  "callback",
  "not_interested",
  "no_answer",
  "left_vm",
] as const
export type CallOutcome = (typeof CALL_OUTCOMES)[number]

export const EMAIL_OUTCOMES = [
  "replied_positive",
  "replied_negative",
  "no_reply",
  "bounced",
  "meeting_booked",
] as const
export type EmailOutcome = (typeof EMAIL_OUTCOMES)[number]

export const KNOWLEDGE_KEYS = [
  "product_context",
  "call_rubric",
  "objection_library",
  "competitors",
] as const
export type KnowledgeKey = (typeof KNOWLEDGE_KEYS)[number]

export interface DbCall {
  id: string
  user_id: string
  prospect_name: string
  company: string | null
  prospect_key: string
  call_date: string
  duration_minutes: number | null
  outcome: CallOutcome
  opener_used: string | null
  main_objection: string | null
  notes: string | null
  energy_level: number | null
  confidence_level: number | null
  transcript: string | null
  created_at: string
  updated_at: string
}
export type DbCallInsert = Omit<DbCall, "id" | "user_id" | "created_at" | "updated_at">
export type DbCallUpdate = Partial<DbCallInsert>

export interface DbEmail {
  id: string
  user_id: string
  prospect_name: string
  company: string | null
  subject_line: string
  sequence_step: number
  email_date: string
  outcome: EmailOutcome
  notes: string | null
  body: string | null
  created_at: string
  updated_at: string
}
export type DbEmailInsert = Omit<DbEmail, "id" | "user_id" | "created_at" | "updated_at">
export type DbEmailUpdate = Partial<DbEmailInsert>

export interface DbJournal {
  id: string
  user_id: string
  name: string
  entry_date: string
  what_worked: string | null
  what_didnt_work: string | null
  mindset_note: string | null
  focus_tomorrow: string | null
  created_at: string
  updated_at: string
}
export type DbJournalInsert = Omit<DbJournal, "id" | "user_id" | "created_at" | "updated_at">
export type DbJournalUpdate = Partial<DbJournalInsert>

export interface DbKnowledge {
  id: string
  key: KnowledgeKey
  title: string
  content: string
  updated_by: string | null
  created_at: string
  updated_at: string
}
export type DbKnowledgeUpdate = { title?: string; content?: string }

export interface DbReport {
  id: string
  user_id: string | null
  type: string
  title: string
  content: string
  created_at: string
}
