// Server-side data access layer for the Outreach OS feature.
// Imports next/headers via createClient — DO NOT import this from client
// components. For shared types and runtime constants, use @/lib/outreach/types.

import { createClient } from "@/lib/supabase/server"
import type {
  DbCall, DbCallInsert, DbCallUpdate,
  DbEmail, DbEmailInsert, DbEmailUpdate,
  DbJournal, DbJournalInsert, DbJournalUpdate,
  DbKnowledge, DbKnowledgeUpdate, KnowledgeKey,
  DbReport,
} from "@/lib/outreach/types"

export * from "@/lib/outreach/types"

async function db() {
  return await createClient()
}

async function requireUserId(): Promise<string> {
  const supabase = await db()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorised")
  return user.id
}


// ---- Calls --------------------------------------------------------

export async function listCalls(): Promise<DbCall[]> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_calls")
    .select("*")
    .order("call_date", { ascending: false })
    .order("created_at", { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getCall(id: string): Promise<DbCall | null> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_calls")
    .select("*")
    .eq("id", id)
    .single()
  if (error?.code === "PGRST116") return null
  if (error) throw new Error(error.message)
  return data
}

export async function createCall(input: DbCallInsert): Promise<DbCall> {
  const supabase = await db()
  const user_id = await requireUserId()
  const { data, error } = await supabase
    .from("outreach_calls")
    .insert({ ...input, user_id })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateCall(id: string, patch: DbCallUpdate): Promise<DbCall> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_calls")
    .update(patch)
    .eq("id", id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteCall(id: string): Promise<void> {
  const supabase = await db()
  const { error } = await supabase.from("outreach_calls").delete().eq("id", id)
  if (error) throw new Error(error.message)
}


// ---- Emails -------------------------------------------------------

export async function listEmails(): Promise<DbEmail[]> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_emails")
    .select("*")
    .order("email_date", { ascending: false })
    .order("created_at", { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getEmail(id: string): Promise<DbEmail | null> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_emails")
    .select("*")
    .eq("id", id)
    .single()
  if (error?.code === "PGRST116") return null
  if (error) throw new Error(error.message)
  return data
}

export async function createEmail(input: DbEmailInsert): Promise<DbEmail> {
  const supabase = await db()
  const user_id = await requireUserId()
  const { data, error } = await supabase
    .from("outreach_emails")
    .insert({ ...input, user_id })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateEmail(id: string, patch: DbEmailUpdate): Promise<DbEmail> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_emails")
    .update(patch)
    .eq("id", id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteEmail(id: string): Promise<void> {
  const supabase = await db()
  const { error } = await supabase.from("outreach_emails").delete().eq("id", id)
  if (error) throw new Error(error.message)
}


// ---- Journal ------------------------------------------------------

export async function listJournal(): Promise<DbJournal[]> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_journal")
    .select("*")
    .order("entry_date", { ascending: false })
    .order("created_at", { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getJournal(id: string): Promise<DbJournal | null> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_journal")
    .select("*")
    .eq("id", id)
    .single()
  if (error?.code === "PGRST116") return null
  if (error) throw new Error(error.message)
  return data
}

export async function createJournal(input: DbJournalInsert): Promise<DbJournal> {
  const supabase = await db()
  const user_id = await requireUserId()
  const { data, error } = await supabase
    .from("outreach_journal")
    .insert({ ...input, user_id })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateJournal(id: string, patch: DbJournalUpdate): Promise<DbJournal> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_journal")
    .update(patch)
    .eq("id", id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteJournal(id: string): Promise<void> {
  const supabase = await db()
  const { error } = await supabase.from("outreach_journal").delete().eq("id", id)
  if (error) throw new Error(error.message)
}


// ---- Knowledge ----------------------------------------------------

export async function listKnowledge(): Promise<DbKnowledge[]> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_knowledge")
    .select("*")
    .order("key", { ascending: true })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getKnowledgeByKey(key: KnowledgeKey): Promise<DbKnowledge | null> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_knowledge")
    .select("*")
    .eq("key", key)
    .single()
  if (error?.code === "PGRST116") return null
  if (error) throw new Error(error.message)
  return data
}

export async function updateKnowledge(key: KnowledgeKey, patch: DbKnowledgeUpdate): Promise<DbKnowledge> {
  const supabase = await db()
  const user_id = await requireUserId()
  const { data, error } = await supabase
    .from("outreach_knowledge")
    .update({ ...patch, updated_by: user_id })
    .eq("key", key)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}


// ---- Reports (read-only from UI) ----------------------------------

export async function listReports(): Promise<DbReport[]> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_reports")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getReport(id: string): Promise<DbReport | null> {
  const supabase = await db()
  const { data, error } = await supabase
    .from("outreach_reports")
    .select("*")
    .eq("id", id)
    .single()
  if (error?.code === "PGRST116") return null
  if (error) throw new Error(error.message)
  return data
}
