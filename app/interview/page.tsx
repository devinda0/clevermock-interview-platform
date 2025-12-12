"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
  DisconnectButton,
  useTracks,
  TrackReferenceOrPlaceholder,
} from "@livekit/components-react"
import "@livekit/components-styles"
import { Track } from "livekit-client"
import { Mic, MicOff, PhoneOff, Loader2 } from "lucide-react"
import { getLiveKitToken } from "@/lib/api"

// Custom Video Conference component to customize layout if needed
function VideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  )

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl aspect-video bg-black/50 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse"></div>
                    <div className="relative flex items-center justify-center w-full h-full bg-slate-900 rounded-full border-2 border-emerald-500/50">
                        <span className="text-4xl">🎙️</span>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white">Voice Interview Active</h3>
                    <p className="text-slate-400">The AI interviewer is listening...</p>
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
      } catch (err: any) {
        console.error("Error connecting to interview:", err)
        setError(err.message || "Failed to initialize interview")
      } finally {
        setIsConnecting(false)
      }
    }

    initInterview()
  }, [router])

  // Track if component is mounted to prevent redirects from unmounted components
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const [isDisconnected, setIsDisconnected] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDisconnect = (...args: any[]) => {
    console.log("Disconnected from interview room", args)
    if (isMounted.current) {
      console.log("Component is mounted. Setting disconnected state.")
      setIsDisconnected(true)
      // router.push("/chat") // Redirect to chat instead of 404
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
            <h3 className="text-xl font-semibold">Interview Ended</h3>
            <p className="text-slate-400">The connection was closed.</p>
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
        onMediaDeviceFailure={(err: any) => {
          console.error("Media Device Failure:", err);
          setError(`Microphone error: ${err?.message || "Unknown media error"}. Please check your permissions.`);
          setIsConnecting(false);
        }}
        className="flex-1"
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  )
}
