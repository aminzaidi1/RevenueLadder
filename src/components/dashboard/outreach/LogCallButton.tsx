"use client"

import { useState } from "react"
import { PhoneCall } from "lucide-react"
import { CallLogForm } from "@/components/dashboard/outreach/CallLogForm"

interface LogCallButtonProps {
  size?: "sm" | "md"
  variant?: "primary" | "accent"
}

export function LogCallButton({ size = "sm", variant = "primary" }: LogCallButtonProps) {
  const [open, setOpen] = useState(false)
  const sizeCls = size === "sm" ? " sm" : ""
  return (
    <>
      <button
        type="button"
        className={`abtn ${variant}${sizeCls}`}
        onClick={() => setOpen(true)}
      >
        <PhoneCall size={13} strokeWidth={2} /> Log call
      </button>
      {open && <CallLogForm onClose={() => setOpen(false)} />}
    </>
  )
}
