# Revenue Ladder — Agent Context

## Project
Full-service digital agency website with an internal dashboard for content and contact management.
- Public site: revenueladder.co.uk
- GitHub: github.com/aminzaidi1/RevenueLadder

## Auth Flow
- Nav bar has a Login button visible on the public site
- Login navigates to /login — authenticates via Supabase — redirects to /dashboard
- /dashboard and all sub-routes are protected by middleware
- Unauthenticated users hitting any /dashboard route are redirected to /
- No separate deployment — dashboard lives at revenueladder.co.uk/dashboard

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (database, auth, storage)
- Vercel (deployment)

## Folder Structure
src/
  app/
    (public)/               # Public-facing marketing pages
      page.tsx              # Home → /
      about/                # → /about
      services/             # → /services
      blog/                 # → /blog, /blog/[slug]
      contact/              # → /contact
    login/
      page.tsx              # Login page -- redirects to /dashboard if already authed
    dashboard/              # Internal tool -- protected, redirects to / if no session
      page.tsx              # Dashboard home
      blog/                 # Blog post management (list, create, edit, delete)
      contacts/             # Contact submission inbox (read, mark as read)
    api/
      contact/              # POST /api/contact — public contact form handler
  components/
    ui/                     # Base primitives (Button, Input, Card, Badge, etc.)
    layout/                 # Header, Footer, Nav
    sections/               # Public page sections
    forms/                  # Public-facing forms
  hooks/                    # Custom React hooks
  lib/
    supabase/
      client.ts             # Browser Supabase client (use in client components only)
      server.ts             # Server Supabase client (use in RSC and server actions only)
    utils.ts                # cn() utility
  middleware.ts             # Session refresh + dashboard route protection
  types/
    database.ts             # Supabase generated types
    index.ts                # App-wide shared types

## Dashboard Purpose
The dashboard is an internal tool used to:
- Write, edit, publish, and delete blog posts
- View and manage contact form submissions
- No public registration — access is restricted to authenticated users only

## Key Rules
- Always use @/* imports (maps to src/*)
- App Router only — no pages/ directory
- Server components by default, client components only when needed
- All Supabase calls go through src/lib/supabase/
- Use server client in RSC and server actions, browser client in client components
- No em dashes in any code, comments, or content
- Tailwind only — no inline styles
- Mobile-first responsive design
- Named exports only — no default exports except Next.js page/layout files
- No any types — strict TypeScript throughout
- No console.log in committed code

## Database Tables

### blog_posts
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| title | text | Post title |
| slug | text | URL-safe unique identifier |
| content | text | Full post body (markdown or rich text) |
| excerpt | text | Short summary for listing pages |
| cover_image | text | Supabase storage URL |
| published | boolean | Controls public visibility |
| created_at | timestamptz | Auto-set on insert |
| updated_at | timestamptz | Auto-updated on edit |

### contact_submissions
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | text | Sender name |
| email | text | Sender email |
| company | text | Optional |
| message | text | Full message body |
| service | text | Service they enquired about |
| read | boolean | Mark as read in dashboard |
| created_at | timestamptz | Auto-set on insert |

## Environment Variables
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL

## Branch Strategy
- main — production
- staging — pre-production QA
- dev — active development
- feature/xxx, fix/xxx, chore/xxx — branch off dev, PR back into dev

## Agents Available
- /pr-reviewer — reviews git diff before opening a PR
- /code-reviewer — reviews uncommitted changes before committing
- /changelog — generates changelog entry from commits before merging to main