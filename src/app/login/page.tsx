import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import { AlertCircle, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Sign in | Revenue Ladder",
}

async function signIn(formData: FormData) {
  "use server"
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect("/login?error=Invalid+email+or+password")
  }

  redirect("/dashboard")
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect("/dashboard")

  return (
    <div className="login-root">
      <div className="login-panel">
        <div className="lp-mark">RL</div>

        <div>
          <div className="lp-tagline">
            The tools that keep<br /><em>Revenue Ladder</em><br />running.
          </div>
          <p className="lp-sub">
            Internal dashboard for blog publishing and contact management.
            Bangor, Wales.
          </p>
          <div className="lp-badges">
            {["Blog management", "Contact submissions", "Supabase auth", "Bangor"].map((b) => (
              <span key={b} className="lp-badge">
                <span className="dot" />{b}
              </span>
            ))}
          </div>
        </div>

        <div className="lp-foot">revenueladder.co.uk &middot; internal tools only</div>
      </div>

      <div className="login-form-side">
        <div className="login-card">
          <div className="login-card-head">
            <div className="eyebrow">Revenue Ladder</div>
            <h2>Sign in</h2>
            <p>Internal access only. Use your RL account.</p>
          </div>

          <form action={signIn} className="login-form">
            {error && (
              <div className="login-error">
                <AlertCircle size={15} strokeWidth={2.5} />
                {error}
              </div>
            )}

            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@revenueladder.co.uk"
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              />
            </div>

            <button type="submit" className="login-submit">
              Sign in <ArrowRight size={15} strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
