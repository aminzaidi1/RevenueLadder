import type { CallOutcome, EmailOutcome } from "@/lib/outreach/types"

const CALL_META: Record<CallOutcome, { label: string; cls: string }> = {
  booked:         { label: "Booked",         cls: "bdg-ok" },
  callback:       { label: "Callback",       cls: "bdg-wa" },
  not_interested: { label: "Not interested", cls: "bdg-er" },
  no_answer:      { label: "No answer",      cls: "bdg-n"  },
  left_vm:        { label: "Left VM",        cls: "bdg-n"  },
}

const EMAIL_META: Record<EmailOutcome, { label: string; cls: string }> = {
  meeting_booked:    { label: "Meeting booked", cls: "bdg-ok" },
  replied_positive:  { label: "Positive reply", cls: "bdg-ok" },
  replied_negative:  { label: "Negative reply", cls: "bdg-er" },
  no_reply:          { label: "No reply",       cls: "bdg-n"  },
  bounced:           { label: "Bounced",        cls: "bdg-er" },
}

export function CallOutcomeBadge({ outcome }: { outcome: CallOutcome }) {
  const meta = CALL_META[outcome]
  return <span className={`bdg ${meta.cls}`}>{meta.label}</span>
}

export function EmailOutcomeBadge({ outcome }: { outcome: EmailOutcome }) {
  const meta = EMAIL_META[outcome]
  return <span className={`bdg ${meta.cls}`}>{meta.label}</span>
}

export const CALL_OUTCOME_LABELS = CALL_META
export const EMAIL_OUTCOME_LABELS = EMAIL_META
