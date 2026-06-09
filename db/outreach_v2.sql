-- =====================================================================
-- Revenue Ladder · Outreach OS — v2 delta
-- Run this once, manually, in the Supabase SQL editor after the original
-- db/outreach_schema.sql. Idempotent.
--
-- What it does:
--   Adds prospect_key, a derived identifier so calls can be grouped by
--   prospect across multiple touchpoints without needing a separate
--   prospects table. Format:
--     lower(trim(prospect_name)) || '|' || lower(trim(coalesce(company,'')))
--   "John Smith" + "Acme Corp"  -> "john smith|acme corp"
--   "john smith"  + "Acme Corp" -> "john smith|acme corp"  (same key)
--   "John Smith"  + null        -> "john smith|"           (own group)
--
-- Generated STORED column: Postgres computes it on insert/update AND
-- backfills it for existing rows when the column is added.
-- =====================================================================

alter table public.outreach_calls
  add column if not exists prospect_key text
  generated always as (
    lower(trim(prospect_name)) || '|' || lower(trim(coalesce(company, '')))
  ) stored;

create index if not exists outreach_calls_prospect_idx
  on public.outreach_calls (prospect_key, call_date desc);

-- Verify with:
--   select prospect_key, count(*) as touches, max(call_date) as last_touch
--   from public.outreach_calls
--   group by prospect_key
--   order by last_touch desc;
