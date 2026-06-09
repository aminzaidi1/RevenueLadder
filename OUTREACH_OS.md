# RevenueLadder — Outreach OS

## What we're building

An internal outreach tracking and coaching system added as a feature to the existing RevenueLadder Next.js dashboard. The system lets sales reps log calls and emails, write journal entries, and browse their outreach history through a clean UI. Claude Code acts as the offline coaching brain — it reads the same database directly and writes analysis back to it. There is no LLM in the UI. No API calls from the frontend. No AI buttons.

---

## Core principle

**Supabase is the single source of truth. Everything is editable from the UI and from Claude Code equally.**

The UI writes and reads from Supabase. Claude Code connects to the same Supabase Postgres instance and does the same. No markdown files on disk, no sync issues, no separate knowledge base folder. One database, two interfaces.

**Visibility is fully open within the team.** Every authenticated user sees everyone's calls, emails, journals, reports, and performance data. This is an inner-circle tool — there is no per-user data hiding. Auth controls who gets in. Once in, everything is visible. The only access distinction is admin vs rep: admins can edit the knowledge base, reps cannot.

---

## Tech stack

- **Frontend:** Next.js (existing dashboard codebase — match all existing conventions, components, and styling patterns exactly)
- **Database:** Supabase (Postgres) — existing project, already integrated
- **Auth:** Existing auth system in the dashboard — do not introduce new auth
- **Automation:** n8n hosted on VPS (not in scope for this phase)
- **AI coaching:** Claude Code running locally by each rep, connecting directly to Supabase via connection string

---

## Database schema

Before writing any migrations, read the existing codebase thoroughly:

- Inspect all existing Supabase migrations and table definitions to understand current naming conventions, column patterns, RLS structure, and how user relationships are modelled
- Inspect how the existing blog feature structures its tables — use the same conventions for consistency
- Understand how auth.users is referenced across the project before creating any foreign keys

Once you have full context of the existing schema patterns, design the tables yourself for the following five entities. Do not guess — derive the structure from what the feature actually needs based on the pages and fields described below, and from what will make Claude Code's analysis queries efficient and readable.

**The five entities you need to model:**

1. **Calls** — outbound call log. Each call belongs to a user. Must store enough structured fields to be aggregated for pattern analysis (outcomes, objections, energy), plus a large text field for the full transcript.

2. **Emails** — outbound email log. Each email belongs to a user. Must track sequence position and outcome so reply rates can be calculated.

3. **Journal** — daily entries per rep. Each entry includes a name field the rep fills in themselves — no auth dependency, just a plain text field. This is used for filtering and personal stats. Fields should capture reflection, not just metrics.

4. **Knowledge base** — a small set of named text documents (product context, call rubric, objection library, competitors). Centralized and shared — no user_id, one record per key, visible and readable by everyone. Editable from the UI (admin only) and from Claude Code. Must track who last updated each entry and when.

5. **Reports** — written exclusively by Claude Code, read by the UI. Must be queryable by type and by user. Content is markdown text.

**Schema design constraints:**
- Be consistent with existing Supabase conventions in this project
- Every table needs RLS — design policies consistent with how existing tables handle them
- Use enums or check constraints for outcome fields so bad data cannot be inserted
- Seed the knowledge base table with placeholder rows for all four keys so the UI has something to render immediately

**Output format:**
Do not run any migrations or touch the database. Output a single SQL block containing all CREATE TABLE statements, CHECK constraints, RLS policies, and seed inserts in the correct execution order. The user will copy this and run it manually in the Supabase SQL editor. Add a brief comment above each section explaining what it does and why it is structured that way.

---

## Pages to build

Add these routes inside the existing dashboard layout. Match the existing navigation pattern.

### `/outreach` — Overview
- Call volume chart (last 30 days, bar chart by day)
- Outcome breakdown (donut or bar — booked / callback / not_interested / no_answer / left_vm)
- Win rate (booked / total calls with an outcome)
- Email reply rate
- Journal entries per rep (breakdown by name — how active each person has been)
- Recent reports list (last 5, click to read)
- Quick-log button linking to call logger

### `/outreach/calls` — Call log
- Table of all calls, newest first, filterable by outcome and date range
- Each row: date, prospect, company, outcome badge, duration, notes preview
- Click row to expand full detail including transcript
- "Log call" button opens a modal or inline form

**Log call form fields:**
- Prospect name (text, required)
- Company (text)
- Date (date picker, defaults to today)
- Duration (number, minutes)
- Outcome (select — booked / callback / not_interested / no_answer / left_vm)
- Opener used (text)
- Main objection heard (text)
- Notes (textarea)
- Energy level (1–5 selector)
- Confidence level (1–5 selector)
- Transcript (large textarea, optional — paste from Trellus or any dialer)

### `/outreach/emails` — Email log
- Same table pattern as calls
- Log email form: prospect, company, subject line, sequence step, outcome, date, notes, body

### `/outreach/journal` — Journal
- Calendar view or list view toggle
- Filter by name so each rep can view their own entries or browse the team's
- Each entry shows date and name as heading, then the four fields as sections
- Clean writing UI — feels like a note editor, not a form
- "New entry" defaults to today with name field at the top

**Journal entry fields:**
- Name (text — rep types their own name, used for filtering and personal stats)
- What worked today
- What didn't work
- Mindset note (how you felt, energy, headspace)
- Focus for tomorrow

### `/outreach/reports` — Reports
- Read-only list of all reports Claude Code has written
- Filter by type and date
- Click to read full report — render markdown content
- No generate button. No AI in the UI. Claude Code writes here, this page just displays.

### `/outreach/knowledge` — Knowledge base
- Four sections visible to everyone: Product context, Call rubric, Objection library, Competitors
- Each section is a full-width textarea — editable only by admins, read-only for reps
- Shows last updated timestamp and updated_by on each section
- Admins see save buttons, reps see the content cleanly formatted but cannot edit

---

## UI feel

- Match the existing dashboard design system exactly — spacing, typography, colors, component patterns
- Call outcome badges should be color-coded consistently (booked = green, not_interested = red, callback = amber, no_answer = gray, left_vm = gray)
- Journal should feel like writing, not form-filling — generous text areas, minimal chrome
- Reports page renders markdown — use whatever markdown renderer is already in the project or add one
- Tables should be clean and scannable — no excess columns
- Graphs use whatever charting library is already in the project; if none exists use Recharts

---

## Row-level security

This is a small inner-circle team. RLS should allow any authenticated user to read all rows across calls, emails, journal, reports, and knowledge_base. There is no per-user data hiding — full team visibility is the intent.

Write access: any authenticated user can insert and update their own calls, emails, and journal entries. The knowledge_base table is restricted to admin users for writes — reps can read it but not modify it. The reports table is written by Claude Code via the service role key and read by all authenticated users.

Apply these policies consistently with how the existing dashboard handles auth. Do not introduce new auth patterns.

---

---

## What is explicitly out of scope

- No AI or LLM calls from the Next.js frontend
- No "Analyze" or "Generate" buttons in the UI
- No external integrations (Trellus, Gmail, etc.) in this phase — transcripts and emails are pasted manually
- No leaderboards or team comparison views in this phase
- No notifications or email digests in this phase
- n8n automation workflows are a future phase

---

## Build order

1. Read all existing migrations, table definitions, and the blog feature implementation fully before writing a single line
2. Design and write the schema for all five entities — output as a single SQL block for manual execution in Supabase, do not proceed to building until confirmed
3. Update the existing CLAUDE.md with the outreach OS context — tables, role, and example commands
4. Build `/outreach/calls` — this is the core logging interface
5. Build `/outreach/journal`
6. Build `/outreach/emails`
7. Build `/outreach/reports` — read-only
8. Build `/outreach/knowledge` — admin gated
9. Build `/outreach` overview with graphs last — data needs to exist first
