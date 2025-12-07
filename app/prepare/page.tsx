"use client"

import { VideoInterviewPrepForm } from "@/components/video-interview-prep-form"
import { Sparkles, Zap, Loader2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PreparePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    )
  }

  if (!user) return null
  return (
    <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-12 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Ambient Backgrounds */}
      <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow delay-1000" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Text Contnet */}
        <div className="text-center md:text-left md:flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Sparkles className="w-3 h-3" />
            <span>AI Interview Setup</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Design Your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
              Perfect Session
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 leading-relaxed max-w-md mx-auto md:mx-0">
            Tell us about your target role and upload your resume. Our AI will craft a hyper-realistic interview scenerio just for you.
          </p>

           <div className="hidden md:flex flex-col gap-4 text-sm text-slate-500 mt-4">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <Zap className="w-4 h-4" />
                  </div>
                  <span>Instant personalized questions generation</span>
              </div>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Zap className="w-4 h-4" />
                  </div>
                  <span>Real-world company contexts</span>
              </div>
           </div>
        </div>

        {/* Form Container */}
        <div className="w-full md:flex-1 max-w-xl">
           <VideoInterviewPrepForm />
        </div>

      </div>
    </div>
  )
}
