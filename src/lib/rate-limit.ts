const store = new Map<string, number[]>()

export function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const cutoff = now - windowMs
  const hits = (store.get(ip) ?? []).filter((t) => t > cutoff)
  if (hits.length >= limit) return false
  hits.push(now)
  store.set(ip, hits)
  return true
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1"
  )
}
