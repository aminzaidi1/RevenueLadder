# Changelog

All notable changes to this project will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
