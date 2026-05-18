# Contributing to RevenueLadder

## Branch Strategy

| Branch | Purpose | Merges into |
|---|---|---|
| `main` | Production | Never directly |
| `dev` | Active development | `main` via PR |
| `feature/xxx` | New features | `dev` via PR |
| `fix/xxx` | Bug fixes | `dev` via PR |
| `chore/xxx` | Non-functional changes | `dev` via PR |

## Starting Work

Always branch off `dev`:

```bash
git checkout dev
git pull
git checkout -b feature/your-feature-name
```

## Commit Convention

Use prefixes on every commit:

```
feat: add contact form validation
fix: correct dashboard redirect on logout
chore: update dependencies
refactor: simplify supabase client setup
```

No em dashes anywhere in code, comments, or commit messages.

## Opening a PR

1. Run the PR reviewer agent inside Claude Code before opening any PR
2. Make sure CI passes locally first: `npm run build && npx tsc --noEmit`
3. All PRs target `dev` — never `main` directly
4. Fill out the PR template fully — no empty sections
5. PRs with failing CI will not be merged

## Code Standards

- Named exports only — no default exports except Next.js pages
- No `any` types — use proper TypeScript
- No `console.log` left in committed code
- Supabase server client in RSC and server actions only
- Supabase browser client in client components only
- All API routes must validate request body and return typed responses

## Merging Flow

```
feature/xxx  →  dev        (per feature, via PR)
dev          →  main       (per release, via PR)
```

## Using Claude Subagents

Before committing:
- `/code-reviewer` — reviews uncommitted changes

Before opening a PR:
- `/pr-reviewer` — reviews diff, outputs PR title and description

Before merging to main:
- `/changelog` — generates changelog entry from commits

## Release Process

1. Run `/changelog` to generate release notes
2. Open PR from `dev` to `main`
3. Merge — auto-deploys to production