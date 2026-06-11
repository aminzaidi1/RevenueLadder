"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ConversationProvider, useConversation } from "@elevenlabs/react"
import { Mic, MicOff, Loader2, PhoneOff } from "lucide-react"

interface UrvoVoiceDemoProps {
  apiBaseUrl?: string
}

interface DemoStatus {
  available: boolean
  rate_limit_remaining: number
  rate_limit_per_hour: number
  max_duration_seconds: number
}

interface DemoConversationResponse {
  signed_url: string
  max_duration_seconds: number
  rate_limit_remaining: number
}

interface TranscriptLine {
  id: number
  source: "user" | "ai"
  text: string
}

const IDLE_SCRIPT: TranscriptLine[] = [
  { id: -3, source: "ai", text: "Hi, you've reached Bryn. How can I help today?" },
  { id: -2, source: "user", text: "Tap the mic to start a live conversation." },
  { id: -1, source: "ai", text: "I'll answer in real time. Five minutes max per session." },
]

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

function UrvoVoiceDemoInner({ apiBaseUrl }: UrvoVoiceDemoProps) {
  const API_BASE_URL =
    apiBaseUrl || process.env.NEXT_PUBLIC_URVO_API_URL || "https://api.urvo.io"

  const [status, setStatus] = useState<DemoStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [callDuration, setCallDuration] = useState(0)
  const [maxDuration, setMaxDuration] = useState(300)
  const [isStarting, setIsStarting] = useState(false)
  const [isEnding, setIsEnding] = useState(false)
  const [micPermission, setMicPermission] = useState<"prompt" | "granted" | "denied">("prompt")
  const [transcript, setTranscript] = useState<TranscriptLine[]>([])
  const messageIdRef = useRef(0)
  const scriptRef = useRef<HTMLDivElement | null>(null)

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/public/demo/status`)
      if (!response.ok) throw new Error("Failed to fetch status")
      const data: DemoStatus = await response.json()
      setStatus(data)
      setMaxDuration(data.max_duration_seconds)
      setError(null)
    } catch {
      setError("Unable to connect to demo server")
    } finally {
      setIsLoading(false)
    }
  }, [API_BASE_URL])

  const conversation = useConversation({
    onConnect: () => {
      setIsStarting(false)
      setError(null)
      setTranscript([])
    },
    onDisconnect: () => {
      setCallDuration(0)
      setIsEnding(false)
      setTimeout(() => fetchStatus(), 1000)
    },
    onError: () => {
      setIsStarting(false)
      setIsEnding(false)
      setError("Connection failed. Please try again.")
    },
    onMessage: ({ source, message }) => {
      if (!message) return
      messageIdRef.current += 1
      setTranscript((prev) => [
        ...prev,
        { id: messageIdRef.current, source, text: message },
      ])
    },
  })

  useEffect(() => {
    const checkMic = async () => {
      try {
        const result = await navigator.permissions.query({ name: "microphone" as PermissionName })
        setMicPermission(result.state as "prompt" | "granted" | "denied")
        result.addEventListener("change", () => {
          setMicPermission(result.state as "prompt" | "granted" | "denied")
        })
      } catch {
        setMicPermission("prompt")
      }
    }
    checkMic()
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStatus()
  }, [fetchStatus])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (conversation.status === "connected") {
      interval = setInterval(() => {
        setCallDuration((prev) => {
          const next = prev + 1
          if (next >= maxDuration) conversation.endSession()
          return next
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [conversation.status, maxDuration, conversation])

  useEffect(() => {
    if (scriptRef.current) {
      scriptRef.current.scrollTop = scriptRef.current.scrollHeight
    }
  }, [transcript])

  const startCall = async () => {
    if (isStarting || conversation.status === "connected") return
    setIsStarting(true)
    setError(null)
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      setMicPermission("granted")

      const response = await fetch(`${API_BASE_URL}/api/v1/public/demo/start-conversation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) {
        const errData: { detail?: string } = await response.json().catch(() => ({}))
        throw new Error(errData.detail || "Failed to start demo")
      }

      const data: DemoConversationResponse = await response.json()
      setMaxDuration(data.max_duration_seconds)
      await conversation.startSession({ signedUrl: data.signed_url })
    } catch (err) {
      const e = err as { name?: string; message?: string }
      if (e.name === "NotAllowedError") {
        setMicPermission("denied")
        setError("Microphone access denied. Please allow microphone access and try again.")
      } else {
        setError(e.message || "Failed to start demo call")
      }
      setIsStarting(false)
    }
  }

  const endCall = async () => {
    if (isEnding) return
    setIsEnding(true)
    try {
      await conversation.endSession()
    } catch {
      setIsEnding(false)
    }
  }

  const isConnected = conversation.status === "connected"
  const isConnecting = isStarting || conversation.status === "connecting"
  const isRateLimited = !!status && !status.available && status.rate_limit_remaining === 0
  const isDisabled = isLoading || isConnecting || isEnding || isRateLimited || (micPermission === "denied" && !isConnected)

  const lines: TranscriptLine[] = transcript.length > 0 ? transcript : IDLE_SCRIPT

  const handleClick = () => {
    if (isConnected) endCall()
    else if (!isConnecting && !isRateLimited) startCall()
  }

  let actionLabel = "Tap to speak"
  if (isLoading) actionLabel = "Loading"
  else if (isRateLimited) actionLabel = "Demo limit reached"
  else if (micPermission === "denied" && !isConnected) actionLabel = "Enable microphone"
  else if (isConnecting) actionLabel = "Connecting"
  else if (isEnding) actionLabel = "Ending"
  else if (isConnected) actionLabel = "Tap to end"

  return (
    <div className="t1-call vd-call">
      <div className="t1-call-head">
        <div className="dots"><i /><i /><i /></div>
        <span className="label">
          {isConnected ? (
            <span className="live">Live call</span>
          ) : isConnecting ? (
            "Connecting…"
          ) : isRateLimited ? (
            "Demo offline"
          ) : (
            "Live demo"
          )}
        </span>
      </div>

      <div className="t1-call-body">
        <div className="t1-caller">
          <div className="t1-wave" aria-hidden={!isConnected}>
            {Array.from({ length: 5 }).map((_, i) => (
              <i key={i} style={{ animationPlayState: isConnected ? "running" : "paused" }} />
            ))}
          </div>
          <div className="who">
            <span className="nm">Bryn · Voice agent</span>
            <span className="ph">{isConnected ? "Talk now — Bryn is listening" : "Sample agent · powered by Urvo"}</span>
          </div>
          <span className="dur">{formatTime(callDuration)} / {formatTime(maxDuration)}</span>
        </div>

        <div className="t1-script vd-script" ref={scriptRef}>
          {lines.map((l) => (
            <div key={l.id} className={`t1-line${l.source === "ai" ? " agent" : ""}`}>
              <span className="who">{l.source === "ai" ? "Bryn" : "You"}</span>
              <span className="txt">{l.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="t1-call-foot vd-foot">
        <button
          type="button"
          onClick={handleClick}
          disabled={isDisabled}
          aria-label={actionLabel}
          className={`vd-action${isConnected ? " end" : ""}`}
        >
          {isLoading || isConnecting || isEnding ? (
            <Loader2 size={18} className="vd-spin" />
          ) : isConnected ? (
            <PhoneOff size={18} />
          ) : micPermission === "denied" ? (
            <MicOff size={18} />
          ) : (
            <Mic size={18} />
          )}
        </button>
        <div className="label">
          <div className="t">{actionLabel}</div>
          <div className="s">
            {error
              ? error
              : isConnected
              ? "Five-minute demo session"
              : "No signup · Mic access required"}
          </div>
        </div>
        <a
          href="https://www.urvo.io"
          target="_blank"
          rel="noopener noreferrer"
          className="vd-attrib"
        >
          Powered by Urvo
        </a>
      </div>
    </div>
  )
}

export function UrvoVoiceDemo(props: UrvoVoiceDemoProps) {
  return (
    <ConversationProvider>
      <UrvoVoiceDemoInner {...props} />
    </ConversationProvider>
  )
}
