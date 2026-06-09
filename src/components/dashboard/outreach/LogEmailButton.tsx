"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { EmailLogForm } from "@/components/dashboard/outreach/EmailLogForm"

interface LogEmailButtonProps {
  size?: "sm" | "md"
  variant?: "primary" | "accent"
}

export function LogEmailButton({ size = "sm", variant = "primary" }: LogEmailButtonProps) {
  const [open, setOpen] = useState(false)
  const sizeCls = size === "sm" ? " sm" : ""
  return (
    <>
      <button
        type="button"
        className={`abtn ${variant}${sizeCls}`}
        onClick={() => setOpen(true)}
      >
        <Mail size={13} strokeWidth={2} /> Log email
      </button>
      {open && <EmailLogForm onClose={() => setOpen(false)} />}
    </>
  )
}
