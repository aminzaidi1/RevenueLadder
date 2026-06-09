# Rules: src/app/api/**

These rules apply to every file under `src/app/api/`.

## 1. Validate the request body

Never use `request.json()` output directly. Parse it as `unknown` first and narrow the type with a type guard before touching any fields.

```ts
const body: unknown = await request.json()
if (!isValidBody(body)) {
  return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
}
```

## 2. Return typed responses

Every return value must be a `NextResponse.json(...)` call with an explicit typed payload. Define a response interface if the shape is non-trivial.

```ts
// Good
return NextResponse.json({ success: true }, { status: 201 })
return NextResponse.json({ error: "Not found" }, { status: 404 })

// Bad -- do not return raw Response or untyped objects
return new Response("ok")
```

## 3. Wrap all async logic in try/catch

Every route handler must have a top-level try/catch. The catch block must return a 500 response -- never let an unhandled rejection bubble up.

```ts
export async function POST(request: Request) {
  try {
    // all logic here
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
```

## 4. Map errors to correct status codes

| Situation | Status |
|---|---|
| Missing or invalid body fields | 400 |
| Missing auth / no session | 401 |
| Valid session but insufficient permissions | 403 |
| Resource not found | 404 |
| Supabase error or unexpected throw | 500 |

## 5. Use the server Supabase client

Always import from `@/lib/supabase/server`, not the browser client:

```ts
import { createClient } from "@/lib/supabase/server"

const supabase = await createClient()
```

## 6. Named exports only

Export each HTTP method by name. No `export default` in route files.

```ts
export async function GET(...) {}
export async function POST(...) {}
```
