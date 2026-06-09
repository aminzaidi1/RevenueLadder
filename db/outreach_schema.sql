-- =====================================================================
-- Revenue Ladder · Outreach OS schema
-- Run this once, manually, in the Supabase SQL editor.
-- Not a migration. Idempotent (uses IF NOT EXISTS and ON CONFLICT).
--
-- Visibility model (matches existing blog_posts convention):
--   Any authenticated user has full read access to every row.
--   Write access on calls / emails / journal is scoped to the owner
--   (user_id = auth.uid()) so when a second account is added the data
--   does not silently bleed between owners.
--   Write access on knowledge is open to any authenticated user (this
--   project does not currently model admin vs rep at the row level —
--   the dashboard auth gate is the only access boundary).
--   Reports are written exclusively by the service role (Claude Code).
-- =====================================================================


-- ---------------------------------------------------------------------
-- Enums: outcome fields, so bad values cannot be inserted from the UI
-- or from Claude Code direct writes.
-- ---------------------------------------------------------------------
do $$ begin
  create type outreach_call_outcome as enum (
    'booked', 'callback', 'not_interested', 'no_answer', 'left_vm'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type outreach_email_outcome as enum (
    'replied_positive', 'replied_negative', 'no_reply', 'bounced', 'meeting_booked'
  );
exception when duplicate_object then null; end $$;


-- ---------------------------------------------------------------------
-- Table: outreach_calls
-- Outbound call log. Structured fields drive aggregation; transcript
-- is free text (paste from any dialer).
-- ---------------------------------------------------------------------
create table if not exists public.outreach_calls (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  prospect_name     text not null,
  company           text,
  call_date         date not null default current_date,
  duration_minutes  integer check (duration_minutes is null or duration_minutes >= 0),
  outcome           outreach_call_outcome not null,
  opener_used       text,
  main_objection    text,
  notes             text,
  energy_level      smallint check (energy_level is null or (energy_level between 1 and 5)),
  confidence_level  smallint check (confidence_level is null or (confidence_level between 1 and 5)),
  transcript        text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists outreach_calls_date_idx     on public.outreach_calls (call_date desc);
create index if not exists outreach_calls_user_idx     on public.outreach_calls (user_id, call_date desc);
create index if not exists outreach_calls_outcome_idx  on public.outreach_calls (outcome);


-- ---------------------------------------------------------------------
-- Table: outreach_emails
-- Outbound email log. Sequence position + outcome enable reply-rate.
-- ---------------------------------------------------------------------
create table if not exists public.outreach_emails (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  prospect_name   text not null,
  company         text,
  subject_line    text not null,
  sequence_step   smallint not null default 1 check (sequence_step >= 1),
  email_date      date not null default current_date,
  outcome         outreach_email_outcome not null default 'no_reply',
  notes           text,
  body            text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists outreach_emails_date_idx    on public.outreach_emails (email_date desc);
create index if not exists outreach_emails_user_idx    on public.outreach_emails (user_id, email_date desc);
create index if not exists outreach_emails_outcome_idx on public.outreach_emails (outcome);


-- ---------------------------------------------------------------------
-- Table: outreach_journal
-- Daily reflection. `name` is a plain text field the rep types
-- themselves (per OUTREACH_OS.md). Used for filter + personal stats.
-- ---------------------------------------------------------------------
create table if not exists public.outreach_journal (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  name             text not null,
  entry_date       date not null default current_date,
  what_worked      text,
  what_didnt_work  text,
  mindset_note     text,
  focus_tomorrow   text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists outreach_journal_date_idx on public.outreach_journal (entry_date desc);
create index if not exists outreach_journal_name_idx on public.outreach_journal (name);


-- ---------------------------------------------------------------------
-- Table: outreach_knowledge
-- Four named documents (product_context, call_rubric, objection_library,
-- competitors). One row per key. Team-wide; no user_id.
-- ---------------------------------------------------------------------
create table if not exists public.outreach_knowledge (
  id          uuid primary key default gen_random_uuid(),
  key         text unique not null,
  title       text not null,
  content     text not null default '',
  updated_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);


-- ---------------------------------------------------------------------
-- Table: outreach_reports
-- Written by Claude Code via service role; UI is read-only.
-- user_id is nullable for team-wide reports.
-- ---------------------------------------------------------------------
create table if not exists public.outreach_reports (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete set null,
  type        text not null,
  title       text not null,
  content     text not null default '',
  created_at  timestamptz not null default now()
);

create index if not exists outreach_reports_type_idx    on public.outreach_reports (type);
create index if not exists outreach_reports_created_idx on public.outreach_reports (created_at desc);


-- ---------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------
create or replace function public.outreach_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_outreach_calls_updated     on public.outreach_calls;
drop trigger if exists trg_outreach_emails_updated    on public.outreach_emails;
drop trigger if exists trg_outreach_journal_updated   on public.outreach_journal;
drop trigger if exists trg_outreach_knowledge_updated on public.outreach_knowledge;

create trigger trg_outreach_calls_updated     before update on public.outreach_calls     for each row execute function public.outreach_set_updated_at();
create trigger trg_outreach_emails_updated    before update on public.outreach_emails    for each row execute function public.outreach_set_updated_at();
create trigger trg_outreach_journal_updated   before update on public.outreach_journal   for each row execute function public.outreach_set_updated_at();
create trigger trg_outreach_knowledge_updated before update on public.outreach_knowledge for each row execute function public.outreach_set_updated_at();


-- ---------------------------------------------------------------------
-- Row level security
-- Matches the existing blog_posts convention: any authenticated user
-- can read everything. Owner-scoped writes on calls/emails/journal so
-- multi-user support works correctly when a second account is added.
-- ---------------------------------------------------------------------
alter table public.outreach_calls     enable row level security;
alter table public.outreach_emails    enable row level security;
alter table public.outreach_journal   enable row level security;
alter table public.outreach_knowledge enable row level security;
alter table public.outreach_reports   enable row level security;


-- ---- calls ----------------------------------------------------------
drop policy if exists "calls read authenticated" on public.outreach_calls;
drop policy if exists "calls insert own"         on public.outreach_calls;
drop policy if exists "calls update own"         on public.outreach_calls;
drop policy if exists "calls delete own"         on public.outreach_calls;

create policy "calls read authenticated" on public.outreach_calls
  for select to authenticated using (true);
create policy "calls insert own" on public.outreach_calls
  for insert to authenticated with check (user_id = auth.uid());
create policy "calls update own" on public.outreach_calls
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "calls delete own" on public.outreach_calls
  for delete to authenticated using (user_id = auth.uid());


-- ---- emails ---------------------------------------------------------
drop policy if exists "emails read authenticated" on public.outreach_emails;
drop policy if exists "emails insert own"         on public.outreach_emails;
drop policy if exists "emails update own"         on public.outreach_emails;
drop policy if exists "emails delete own"         on public.outreach_emails;

create policy "emails read authenticated" on public.outreach_emails
  for select to authenticated using (true);
create policy "emails insert own" on public.outreach_emails
  for insert to authenticated with check (user_id = auth.uid());
create policy "emails update own" on public.outreach_emails
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "emails delete own" on public.outreach_emails
  for delete to authenticated using (user_id = auth.uid());


-- ---- journal --------------------------------------------------------
drop policy if exists "journal read authenticated" on public.outreach_journal;
drop policy if exists "journal insert own"         on public.outreach_journal;
drop policy if exists "journal update own"         on public.outreach_journal;
drop policy if exists "journal delete own"         on public.outreach_journal;

create policy "journal read authenticated" on public.outreach_journal
  for select to authenticated using (true);
create policy "journal insert own" on public.outreach_journal
  for insert to authenticated with check (user_id = auth.uid());
create policy "journal update own" on public.outreach_journal
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "journal delete own" on public.outreach_journal
  for delete to authenticated using (user_id = auth.uid());


-- ---- knowledge ------------------------------------------------------
-- Single auth boundary; any authenticated user can edit. If admin/rep
-- separation is ever needed, gate via a column on a profiles table and
-- add a stricter UPDATE policy here.
drop policy if exists "knowledge read authenticated"   on public.outreach_knowledge;
drop policy if exists "knowledge write authenticated"  on public.outreach_knowledge;
drop policy if exists "knowledge update authenticated" on public.outreach_knowledge;

create policy "knowledge read authenticated" on public.outreach_knowledge
  for select to authenticated using (true);
create policy "knowledge write authenticated" on public.outreach_knowledge
  for insert to authenticated with check (true);
create policy "knowledge update authenticated" on public.outreach_knowledge
  for update to authenticated using (true) with check (true);


-- ---- reports --------------------------------------------------------
-- Service role bypasses RLS, so Claude Code (using
-- SUPABASE_SERVICE_ROLE_KEY) can insert without any policy work.
drop policy if exists "reports read authenticated" on public.outreach_reports;

create policy "reports read authenticated" on public.outreach_reports
  for select to authenticated using (true);


-- ---------------------------------------------------------------------
-- Seed: knowledge base placeholders so the UI renders four sections
-- on first visit. Idempotent via on conflict (key).
-- ---------------------------------------------------------------------
insert into public.outreach_knowledge (key, title, content) values
  ('product_context', 'Product context',
   '# Product context

What we sell, who it''s for, and the core promise. Update this so reps and Claude Code stay aligned on positioning.'),
  ('call_rubric', 'Call rubric',
   '# Call rubric

How a great cold call sounds. Opener, qualifying questions, objection handling, close. Used by Claude Code when grading transcripts.'),
  ('objection_library', 'Objection library',
   '# Objection library

Top objections we hear and the response that worked best. Maintain this from real transcripts.'),
  ('competitors', 'Competitors',
   '# Competitors

Who prospects compare us to, where we win, where we lose. Update after every competitive deal.')
on conflict (key) do nothing;


-- ---------------------------------------------------------------------
-- Verify with:
--   select table_name from information_schema.tables
--   where table_schema = 'public' and table_name like 'outreach_%';
-- ---------------------------------------------------------------------
