# Skill: Create a New API Route

## File location

All API routes live under `src/app/api/`. Each endpoint is a `route.ts` file:

```
src/app/api/
└── <resource>/
    └── route.ts     # handles GET, POST, etc. for /api/<resource>
```

Never colocate a `route.ts` next to a `page.tsx`.

## Rules

- Always validate the request body before using it.
- Always return a typed response object.
- Wrap all logic in try/catch and return appropriate HTTP status codes.
- Use `createClient` from `@/lib/supabase/server` for any DB access.
- Use named HTTP method exports (`GET`, `POST`, `PATCH`, `DELETE`).
- No `export default`.

## Template

```ts
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface ContactBody {
  name: string
  email: string
  message: string
}

function isValidBody(body: unknown): body is ContactBody {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return (
    typeof b.name === "string" &&
    typeof b.email === "string" &&
    typeof b.message === "string"
  )
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()

    if (!isValidBody(body)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { error } = await supabase.from("your_table").insert(body)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
```

## Status code reference

| Situation | Code |
|---|---|
| Success, resource created | 201 |
| Success, no content to return | 204 |
| Validation failed | 400 |
| Unauthenticated | 401 |
| Forbidden (authenticated but not allowed) | 403 |
| Not found | 404 |
| DB or unexpected error | 500 |

## Checklist

- [ ] Body validated before use
- [ ] Return type is `NextResponse.json(...)` with explicit status
- [ ] try/catch wraps all async logic
- [ ] Supabase errors surfaced with 500, not swallowed
- [ ] Named export (no `export default`)
- [ ] No em dashes in comments
