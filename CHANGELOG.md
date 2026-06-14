# Changelog

All notable changes to this project will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased] - 2026-06-14

### Added
- Case studies feature: public `/case-studies` index and first study at `/case-studies/arrow-taxi-bangor`, with both routes wired into `sitemap.ts`
- Reusable case study section components under `src/components/sections/case-studies/`: `CaseStudyHero`, `CaseStudyBreadcrumb`, `CaseStudyContext`, `CaseStudyProblem`, `CaseStudyWork`, `CaseStudyResults`, `CaseStudyTestimonial`, `CaseStudyCTA`, `CaseStudyIndexCard`, and an `Eyebrow` primitive
- Shared `CaseStudy` type definitions in `src/components/sections/case-studies/types.ts`
- Case study content layer in `src/data/case-studies/` with an `index.ts` registry and the Arrow Taxi Bangor study (`arrow-taxi-bangor.tsx`)
- Arrow Taxi logo asset at `public/assets/case-studies/arrow-logo.png`
- Dedicated `src/styles/case-study.css` stylesheet for case study page layout and section spacing
- "Case studies" entry in the public `Nav` so visitors can reach the index from any page

### Changed
- `AIServiceTemplate` updated to support linking out to a relevant case study from each service page
- All seven `/services/*` pages (ai-consultation, automated-social-media, chatbots, content-generation, marketing-automation, personalised-ai-agents, voice-agents) updated to pass through the new case study reference props

## [Unreleased] - 2026-06-11

### Added
- Live Urvo voice demo on `/services/voice-agents` hero: visitors can tap the mic to speak with the Bryn demo agent, with the call transcript streaming live into the existing forest/gold call panel
- `UrvoVoiceDemo` client component wrapping `@elevenlabs/react`, handling rate limits, mic permission, connecting/connected/ending states, and a five-minute session cap
- Blog comments system: public `CommentForm` and `CommentList` on every post, `POST /api/blog/[slug]/comments` for submissions, and a `/dashboard/blog/comments` moderation queue using `CommentModerationTable`
- Blog view tracking: `ViewTracker` client component plus `POST /api/blog/[slug]/view` to increment view counts
- Writers profile system: `/dashboard/writers` CRUD with avatar upload via `POST /api/upload/avatar`, and writer linking inside `BlogPostForm`
- Admin Supabase client (`src/lib/supabase/admin.ts`) for service-role moderation queries
- `NEXT_PUBLIC_URVO_API_URL` env var pointing at the Urvo demo backend
- `@elevenlabs/react` dependency

### Changed
- Voice-agents hero swaps the static scripted `LiveCallPanel` for the interactive `UrvoVoiceDemo`
- `BlogPostForm` now lets editors pick a writer profile and shows their avatar inline

## [Unreleased] - 2026-06-11

### Added
- Cover image support on blog index: `coverImage` field added to `BlogPost` type and `mapDbPost`; featured card shows full-width 16:9 image when present; grid cards and related posts on slug page also display cover images
- CTA block colour picker in the rich editor: 6 brand colour swatches plus a custom hex input with auto light/dark text detection; colour persists as `data-bg-color` in stored HTML
- Cover image upload button in `BlogPostForm`: calls `/api/upload`, populates URL field, shows thumbnail preview
- Responsive CSS classes: `rl-inner`, `rl-blog-header`, `rl-blog-feat-content`, `rl-blog-posts-section` for mobile-first blog layout

### Changed
- Blog index grid is now fully responsive: 1 col on mobile, 2 col on tablet, 3 col on desktop -- no more horizontal scroll
- Featured card switches to stacked image-top layout when a cover image is present; falls back to side-by-side glyph layout when not
- Replaced inline `BlogCard` in `BlogIndexClient` with the shared `BlogCard` component
- Container padding on blog pages is now responsive (16px mobile, 24px tablet, 32px desktop)
- Added `*.supabase.co` and `i.postimg.cc` to `next.config.ts` `remotePatterns`

### Fixed
- Drop cap float no longer creates a gap before the next paragraph; subsequent short lines now wrap around the drop cap correctly
- Drop cap pseudo-element no longer leaks into CTA blocks, callouts, or pull quotes

## [Unreleased] - 2026-05-22

### Added
- Shared `BlogCard` component (`src/components/blog/BlogCard.tsx`) used by homepage teaser and blog post related-grid
- Shared `SectionHeader` component (`src/components/ui/SectionHeader.tsx`) replacing copy-pasted eyebrow/heading/description markup in six section components
- Centralised pricing tier data in `src/lib/pricing-data.ts`; pricing hero, compare, and matrix sections now import from a single source

### Changed
- Replaced JS `onMouseEnter`/`onMouseLeave` hover handlers in `Footer` and `ServicesSection` with CSS `:hover` rules
- Replaced hardcoded hex colours with semantic design tokens: error banner uses `--rl-error-*`, success indicators use `--rl-success`/`--rl-success-bg`, dark-surface text uses `--rl-fg-on-dark-2`
- Added `aria-hidden="true"` to decorative `ArrowRight` icons in the nav mega-menu
- Removed unused stub sections: `ProcessSection`, `ResultsSection`, `TeamSection`
- Deleted superseded `src/styles/pricing.css`

---

## [Unreleased] - 2026-05-22

### Changed
- Commented out "How it works" nav link (desktop and mobile) until the section is built
- Footer links wired to real routes — replaced all placeholder `href="#"` anchors with typed `<Link>` components; removed entries with no corresponding pages ("Meet the team", "Customer stories")
- Removed `TeamSection` from homepage render order

### Fixed
- Contact page: `padding` shorthand on the section element was overriding `rl-px` horizontal padding (setting left/right to 0); split into responsive Tailwind vertical-padding classes
- Contact page: form card, dark sidebar card, and contact details card now use responsive padding (`p-6 sm:p-8 lg:p-10` etc.) instead of fixed inline values
- Contact page: added 768px two-column breakpoint to `.rl-contact-grid` (equal cols at tablet, `1fr 420px` at desktop)
- Contact form: submit button class corrected from non-existent `rl-btn rl-btn-primary` to `btn primary`
- Pricing matrix ("Detail · every feature"): wrapped in `pr-matrix-outer` scroll container; added `min-width: 480px` and fixed column widths at <= 600px so columns stay symmetrical on mobile instead of collapsing

---

## [Unreleased] - 2026-05-21

### Added
- Blog CMS backed by Supabase: create, edit, and delete posts from `/dashboard/blog`
- Tiptap WYSIWYG editor with bold, italic, headings, lists, blockquote, inline code, links, and dividers
- Image upload to Supabase Storage (`blog-images` bucket) or insert by URL, dropped inline at cursor position
- CTA block node: branded banner (dark forest or gold) with editable heading, body, button label, and URL
- Callout card node: highlight box with emoji icon and three tone options (neutral, forest, gold)
- API routes: `GET/POST /api/blog`, `GET/PUT/DELETE /api/blog/[slug]`, `POST /api/upload`
- Dashboard pages: blog list (live from Supabase), `/dashboard/blog/new`, `/dashboard/blog/[slug]` edit with delete
- `src/lib/supabase/blog.ts` typed access layer with `listBlogPosts`, `getBlogPost`, `createBlogPost`, `updateBlogPost`, `deleteBlogPost`
- Seeded 12 original blog posts into Supabase with correct author, category, read time, and publication dates

---

## [Unreleased] - 2026-05-21

### Added
- Vercel Analytics via `@vercel/analytics/next` (page view and event tracking)
- Contact page and form with email delivery via Resend API
- Self-hosted Montserrat and Inter fonts via `next/font` (eliminates Google Fonts network requests)
- Full mobile-first responsive layout across all homepage sections using CSS utility classes (`rl-px`, `rl-section-pad`, `rl-hero-grid`, `rl-grid-2/3/4/6`, `rl-footer-grid`, `rl-footer-bottom`)
- Services accordion in mobile hamburger menu with scrollable content panel
- Mobile menu scrollable container (`max-height: calc(100svh - 100px)`)
- Complete public site: homepage, blog, pricing, services (14 pages), and all section components
- Dashboard layout with blog management UI
- Supabase auth flow (`/login` -> `/dashboard`)
- OpenGraph image, sitemap, and robots.txt
- CI workflow on Node.js 24
- PR template and contributing guide

### Changed
- Nav: Sign in and Book a call buttons hidden below `lg` breakpoint; accessible via hamburger menu only on mobile
- Nav: mobile CTA buttons stack vertically (Book a call primary, Sign in secondary)
- Footer: 2-column grid on mobile with brand column spanning full width; 5-column on desktop
- Lint script scoped to `src/` to exclude design reference files
- Removed staging branch; simplified deploy flow to dev -> main

### Fixed
- Contact API route: request body validated with type guard before use; rate-limiting and CSRF protections added
- Sign-out route hardened against unhandled rejections
