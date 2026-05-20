import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashSidebar } from "@/components/dashboard/DashSidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  return (
    <div className="dash-root">
      <DashSidebar email={user.email ?? ""} />
      <div className="dash-main">
        {children}
      </div>
    </div>
  )
}
