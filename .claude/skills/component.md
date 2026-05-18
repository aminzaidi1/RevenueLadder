# Skill: Scaffold a New Component

## Decide where it lives

| Type | Folder | Example |
|---|---|---|
| Base primitive (button, input, badge) | `src/components/ui/` | `Button.tsx` |
| Site-wide structural piece | `src/components/layout/` | `Header.tsx` |
| Full page section | `src/components/sections/` | `HeroSection.tsx` |
| Form | `src/components/forms/` | `ContactForm.tsx` |

## Rules

- Use a named export. Never `export default` from a component file.
- Add `"use client"` only if the component uses state, effects, refs, or event handlers.
- Use `cn()` from `@/lib/utils` for all conditional class logic.
- Props interface goes directly above the component, named `<ComponentName>Props`.
- No inline style attributes -- Tailwind classes only.
- Brand color is `--color-brand` (indigo #4F46E5). Use `bg-indigo-600` or `[var(--color-brand)]`.

## Server Component template

```tsx
import { cn } from "@/lib/utils"

interface ExampleCardProps {
  title: string
  description?: string
  className?: string
}

export function ExampleCard({ title, description, className }: ExampleCardProps) {
  return (
    <div className={cn("rounded-lg border bg-white p-6 shadow-sm", className)}>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      )}
    </div>
  )
}
```

## Client Component template

```tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ToggleProps {
  label: string
  className?: string
}

export function Toggle({ label, className }: ToggleProps) {
  const [on, setOn] = useState(false)

  return (
    <button
      onClick={() => setOn((prev) => !prev)}
      className={cn(
        "rounded px-4 py-2 text-sm font-medium transition-colors",
        on ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700",
        className
      )}
    >
      {label}
    </button>
  )
}
```

## Checklist

- [ ] Named export
- [ ] Props interface defined above the component
- [ ] `cn()` used for conditional classes
- [ ] `"use client"` added only if truly needed
- [ ] No em dashes in comments
