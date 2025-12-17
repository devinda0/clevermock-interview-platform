"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
  DisconnectButton,
  useRoomContext,
} from "@livekit/components-react"
import "@livekit/components-styles"
import { PhoneOff, Loader2, Clock, MessageSquare, Mic } from "lucide-react"
import { getLiveKitToken } from "@/lib/api"

// Interview phase durations in seconds
const INTERVIEW_DURATION = 10 * 60 // 10 minutes
const FEEDBACK_DURATION = 5 * 60 // 5 minutes
const TOTAL_DURATION = INTERVIEW_DURATION + FEEDBACK_DURATION // 15 minutes total

type InterviewPhase = "interview" | "feedback"

interface TimerDisplayProps {
  timeRemaining: number
  phase: InterviewPhase
  totalTimeRemaining: number
}

function TimerDisplay({ timeRemaining, phase, totalTimeRemaining }: TimerDisplayProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const isLowTime = timeRemaining <= 60 // Last minute warning
  const isCriticalTime = timeRemaining <= 30 // Last 30 seconds

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-slate-900/80 backdrop-blur-sm rounded-xl border border-white/10">
      {/* Phase indicator */}
      <div className="flex items-center gap-2">
        {phase === "interview" ? (
          <Mic className="w-4 h-4 text-emerald-400" />
        ) : (
          <MessageSquare className="w-4 h-4 text-blue-400" />
        )}
        <span className={`text-sm font-medium ${phase === "interview" ? "text-emerald-400" : "text-blue-400"}`}>
          {phase === "interview" ? "Interview" : "Feedback"}
        </span>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-2">
        <Clock className={`w-4 h-4 ${isCriticalTime ? "text-red-400 animate-pulse" : isLowTime ? "text-yellow-400" : "text-slate-400"}`} />
        <span className={`font-mono text-lg font-bold ${isCriticalTime ? "text-red-400" : isLowTime ? "text-yellow-400" : "text-white"}`}>
          {formatTime(timeRemaining)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${phase === "interview" ? "bg-emerald-500" : "bg-blue-500"}`}
          style={{ 
            width: `${phase === "interview" 
              ? (timeRemaining / INTERVIEW_DURATION) * 100 
              : (timeRemaining / FEEDBACK_DURATION) * 100}%` 
          }}
        />
      </div>

      {/* Total time remaining */}
      <div className="text-xs text-slate-500">
        Total: {formatTime(totalTimeRemaining)}
      </div>
    </div>
  )
}

// Custom Video Conference component with timer
function VideoConference({ 
  timeRemaining, 
  phase, 
  totalTimeRemaining,
  onTimeUp 
}: { 
  timeRemaining: number
  phase: InterviewPhase
  totalTimeRemaining: number
  onTimeUp: () => void 
}) {
  const room = useRoomContext()

  // Auto-disconnect when time is up
  useEffect(() => {
    if (totalTimeRemaining <= 0) {
      onTimeUp()
      room.disconnect()
    }
  }, [totalTimeRemaining, onTimeUp, room])

  return (
    <div className="flex flex-col h-full">
      {/* Timer header */}
      <div className="flex justify-center p-4 bg-black/30 backdrop-blur-sm border-b border-white/5">
        <TimerDisplay 
          timeRemaining={timeRemaining} 
          phase={phase}
          totalTimeRemaining={totalTimeRemaining}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl aspect-video bg-black/50 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                    <div className={`absolute inset-0 rounded-full animate-pulse ${phase === "interview" ? "bg-emerald-500/20" : "bg-blue-500/20"}`}></div>
                    <div className={`relative flex items-center justify-center w-full h-full bg-slate-900 rounded-full border-2 ${phase === "interview" ? "border-emerald-500/50" : "border-blue-500/50"}`}>
                        <span className="text-4xl">{phase === "interview" ? "🎙️" : "📝"}</span>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white">
                      {phase === "interview" ? "Voice Interview Active" : "Feedback Session"}
                    </h3>
                    <p className="text-slate-400">
                      {phase === "interview" 
                        ? "The AI interviewer is listening..." 
                        : "AI is providing feedback on your performance..."}
                    </p>
                </div>
            </div>
        </div>
      </div>
      <div className="flex justify-center p-6 bg-black/20 backdrop-blur-sm border-t border-white/5">
        <ControlBar variation="minimal" controls={{ microphone: true, camera: false, screenShare: false, chat: false, leave: false }} />
        <div className="ml-4">
            <DisconnectButton>
                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center gap-2 transition-colors">
                    <PhoneOff className="w-4 h-4" />
                    End Interview
                </button>
            </DisconnectButton>
        </div>
      </div>
    </div>
  )
}

export default function InterviewPage() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [serverUrl, setServerUrl] = useState("")
  const [isConnecting, setIsConnecting] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Timer state
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(TOTAL_DURATION)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate current phase and phase-specific time remaining
  const phase: InterviewPhase = totalTimeRemaining > FEEDBACK_DURATION ? "interview" : "feedback"
  const phaseTimeRemaining = phase === "interview" 
    ? totalTimeRemaining - FEEDBACK_DURATION 
    : totalTimeRemaining

  useEffect(() => {
    const initInterview = async () => {
      try {
        const storedContext = sessionStorage.getItem("interviewContext")
        if (!storedContext) {
          router.push("/prepare")
          return
        }

        const context = JSON.parse(storedContext)
        const conversationId = context.conversationId

        if (!conversationId) {
          throw new Error("No conversation ID found")
        }

        // Fetch token
        const data = await getLiveKitToken(conversationId)
        setToken(data.token)
        setServerUrl(data.serverUrl)
      } catch (err) {
        console.error("Error connecting to interview:", err)
        setError((err as Error).message || "Failed to initialize interview")
      } finally {
        setIsConnecting(false)
      }
    }

    initInterview()
  }, [router])

  // Start timer when connected
  useEffect(() => {
    if (!isConnecting && token && !isTimerActive) {
      setIsTimerActive(true)
    }
  }, [isConnecting, token, isTimerActive])

  // Timer countdown effect
  useEffect(() => {
    if (isTimerActive && totalTimeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTotalTimeRemaining(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isTimerActive])

  // Track if component is mounted to prevent redirects from unmounted components
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const [isDisconnected, setIsDisconnected] = useState(false)
  const [timeUpMessage, setTimeUpMessage] = useState(false)

  const handleTimeUp = useCallback(() => {
    console.log("Interview time is up!")
    setTimeUpMessage(true)
  }, [])

  const handleDisconnect = (...args: unknown[]) => {
    console.log("Disconnected from interview room", args)
    if (timerRef.current) clearInterval(timerRef.current)
    if (isMounted.current) {
      console.log("Component is mounted. Setting disconnected state.")
      setIsDisconnected(true)
    } else {
        console.log("Component is unmounted, ignoring disconnect redirect")
    }
  }

  if (isConnecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto" />
            <p className="text-slate-400">Connecting to interview room...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <div className="text-center space-y-4 p-8 bg-red-900/10 rounded-xl border border-red-500/20">
            <p className="text-red-400">Error: {error}</p>
            <button 
                onClick={() => router.push("/chat")}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
                Return to Chat
            </button>
        </div>
      </div>
    )
  }

  if (isDisconnected) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <div className="text-center space-y-4 p-8 bg-slate-900 rounded-xl border border-slate-700">
            {timeUpMessage ? (
              <>
                <div className="w-16 h-16 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold">Interview Complete!</h3>
                <p className="text-slate-400">Your 15-minute session has ended. Great job!</p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold">Interview Ended</h3>
                <p className="text-slate-400">The connection was closed.</p>
              </>
            )}
            <button 
                onClick={() => router.push("/chat")}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
                Return to Chat
            </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white" data-lk-theme="default">
      <LiveKitRoom
        video={false}
        audio={true}
        token={token}
        serverUrl={serverUrl}
        onDisconnected={handleDisconnect}
        onError={(err) => {
          console.error("LiveKit Error:", err);
          setError(`Connection error: ${err.message}`);
          setIsConnecting(false);
        }}
        onMediaDeviceFailure={(err) => {
          console.error("Media Device Failure:", err);
          setError(`Microphone error: ${((err as unknown) as { message?: string })?.message || "Unknown media error"}. Please check your permissions.`);
          setIsConnecting(false);
        }}
        className="flex-1"
      >
        <VideoConference 
          timeRemaining={phaseTimeRemaining}
          phase={phase}
          totalTimeRemaining={totalTimeRemaining}
          onTimeUp={handleTimeUp}
        />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  )
}
