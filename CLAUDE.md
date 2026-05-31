# Revenue Ladder — Claude Code Context

See AGENTS.md for full project details, folder structure, database schema, and agent list.

## Project
Welsh Web & Automation Agency. Precision-built. Results-driven.
Bangor, Wales · revenueladder.co.uk

## Brand Identity

### Colours (use CSS variables only — never hardcode hex)
- `--rl-forest` (#1A4D2E) — Forest Growth Green, primary brand colour
- `--rl-forest-dark` (#143D24) — primary hover/pressed
- `--rl-forest-deep` (#0F2E1C) — dark surface base
- `--rl-forest-ink` (#0D1A10) — sidebar/hero ink black-green
- `--rl-gold` (#FFC425) — Accelerated Gold, accent
- `--rl-gold-dark` (#E6B020) — accent hover
- `--rl-gold-deep` (#B07F00) — high-contrast gold text
- `--rl-charcoal` (#1A1A1A) — secondary
- `--rl-bg` (#EDEAE5) — warm off-white application background
- `--rl-surface` (#FFFFFF) — card/panel

No invented colours. Forest green and Accelerated Gold are the only two brand colours.
Full token list lives in colors_and_type.css — import it, do not copy-paste values.

### Typography
- Display/headings: Montserrat (700, 800, 900) — tight tracking, sentence case
- Body: Inter (400, 500, 600, 700) — relaxed line height
- Mono: JetBrains Mono — code only
- Two typefaces only. No third font, no decorative fonts.

### Type Scale
- Hero: 72px Montserrat 900
- Display: 56px Montserrat 900
- H1: 40px Montserrat 800
- H2: 32px Montserrat 800
- H3: 24px Montserrat 700
- H4: 18px Montserrat 700
- Body lg: 17px Inter
- Body: 15px Inter

### Logo
- Three lockups: mark, stacked, horizontal — in project/assets/
- Never recolour the logo

### Signature Pattern
- Ladder stripe (--rl-pattern-ladder) — used sparingly, never as default background

## Voice & Tone
- Trusted operator, not a hype merchant — calm authority, plain language, results-led
- Welsh sensibility — grounded, practical, never American-corporate
- Results-led, not feature-led — lead with the outcome, then explain how
- "You" for the reader, "We" for RevenueLadder, never "I" outside bios
- No emoji anywhere — iconography does the visual work
- No hype language ("AI-powered synergistic revenue acceleration" is wrong)
- UK spellings: optimise, organise, colour
- Oxford comma
- Currency: £ not $
- Headlines: Sentence case (not Title Case, not ALL CAPS except eyebrow labels)
- Buttons: Sentence case ("Book a call", not "BOOK A CALL")

## Auth Flow
- Login button in public nav → /login → Supabase auth → /dashboard
- /dashboard is the internal tool for blog and contact management
- Unauthenticated users hitting /dashboard are redirected to /
- No separate deployment — everything is on revenueladder.co.uk

## Outreach OS
Internal cold outreach journaling and tracking feature for the dashboard.
- Rules: `.claude/rules/outreach.md`
- Schema (manual run, not a migration): `db/outreach_schema.sql`
- DB access layer: `src/lib/supabase/outreach.ts`
- Routes: `/dashboard/outreach`, `/dashboard/outreach/{calls,emails,journal,reports,knowledge}`
- API: `src/app/api/outreach/{calls,emails,journal,knowledge}/...`
- No AI in the UI — Claude Code runs locally and writes reports to the `outreach_reports` table via the service role key. Read those from `/dashboard/outreach/reports`.

## Tooling
- GitHub CLI is installed at `C:\Program Files\GitHub CLI\gh.exe` -- it is NOT in PATH
- Always invoke it via full path: `& "C:\Program Files\GitHub CLI\gh.exe" <args>` in PowerShell
- Never assume `gh` is on PATH; use the full path every time

## Key Rules
- All colour values from --rl-* CSS variables only — never hardcode hex
- Tailwind only for layout/spacing — CSS variables for brand tokens
- Named exports only — except Next.js page/layout files
- Server components by default — "use client" only when needed
- No em dashes anywhere in code, comments, or content
- No any types — strict TypeScript
- No console.log in committed code
- No emoji anywhere
- Mobile-first responsive design
- @/* imports throughout (maps to src/*)
- All Supabase calls through src/lib/supabase/
- WCAG AAA contrast minimum (7:1) — the brand hits 11.5:1
- Lucide icons only — no other icon libraries