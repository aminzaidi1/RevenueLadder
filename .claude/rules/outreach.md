# Rules: Outreach OS

These rules apply to all files under `src/app/dashboard/outreach/`,
`src/app/api/outreach/`, `src/components/dashboard/outreach/`, and
`src/lib/supabase/outreach.ts`.

## 1. Schema lives in `db/outreach_schema.sql`

Do not run migrations. The file is the source of truth and is executed
manually in the Supabase SQL editor. If you need to change the schema,
edit the SQL file and ask the user to re-run it.

Tables:
- `outreach_calls`
- `outreach_emails`
- `outreach_journal`
- `outreach_knowledge`
- `outreach_reports`

Enums:
- `outreach_call_outcome` -- `booked | callback | not_interested | no_answer | left_vm`
- `outreach_email_outcome` -- `replied_positive | replied_negative | no_reply | bounced | meeting_booked`

## 2. Visibility model

Inner-circle team. Any authenticated user can read every row across
all five tables. Writes on calls/emails/journal are scoped to the
owning user (`user_id = auth.uid()`). Writes on knowledge are open to
any authenticated user. Reports are written exclusively by the service
role -- there is no POST route for reports in the UI.

## 3. Data access goes through `src/lib/supabase/outreach.ts`

Do not call `.from("outreach_*")` directly from API routes or pages.
All queries route through the typed access layer so the response
shapes stay stable and the visibility model is enforced in one place.

## 4. API routes follow `.claude/rules/api.md`

Every route under `src/app/api/outreach/` must:
- Validate the request body as `unknown` and narrow with a type guard
- Return typed `NextResponse.json` responses
- Wrap all logic in try/catch and return 500 on uncaught errors
- Use the server Supabase client from `@/lib/supabase/server`
- Export named HTTP methods (no `export default`)

## 5. UI conventions

- Match the existing `.dash-root` CSS scope; reuse `.surface`, `.tbl`,
  `.bdg`, `.abtn`, `.field`, `.form-card` classes
- New outreach-specific styles use the `.ox-*` prefix and live in
  `src/styles/app.css`
- Call outcome badge colours:
  - `booked` -- green (`bdg-ok`)
  - `callback` -- amber (`bdg-wa`)
  - `not_interested` -- red (`bdg-er`)
  - `no_answer` -- neutral (custom `.bdg-n`)
  - `left_vm` -- neutral (custom `.bdg-n`)
- Email outcome badge colours follow the same green/amber/red/neutral split
- Charts are inline SVG -- no charting library. Keep them small and
  calm; the brand voice is calm authority, not data-dashboard hype
- Markdown is rendered by `MarkdownRender.tsx` -- a small in-house
  converter for headings / bold / italic / code / lists / blockquote /
  links. No external markdown lib

## 6. No AI in the UI

Per OUTREACH_OS.md:
- No generate/analyze buttons
- No LLM calls from the Next.js frontend
- Reports page renders content written by Claude Code; do not add
  write paths for reports from the UI

## 7. Voice and content

- Sentence case for headings ("Log call", not "Log Call")
- UK spelling: organise, optimise, colour
- No emoji
- Currency: £
- "You" for the rep, "We" for RevenueLadder
