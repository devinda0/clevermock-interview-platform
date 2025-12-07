"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { MessageBubble } from "@/components/chat/message-bubble"
import { ChatInput } from "@/components/chat/chat-input"
import { refineDetails, acceptDetails, ApiError } from "@/lib/api"
import { 
  Mic, 
  CheckCircle, 
  RefreshCw, 
  ArrowRight, 
  Sparkles,
  Zap,
  MessageSquare,
  AlertCircle
} from "lucide-react"

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: string
}

interface InterviewContext {
  conversationId: string
  position: string
  instruction: string
  cvName: string
  interviewDetails: string
  status: string
}

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [interviewContext, setInterviewContext] = useState<InterviewContext | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [isAccepted, setIsAccepted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Load initial context from sessionStorage
    const storedContext = sessionStorage.getItem('interviewContext')
    
    if (storedContext) {
      try {
        const context = JSON.parse(storedContext) as InterviewContext
        setInterviewContext(context)
        setConversationId(context.conversationId)
        
        // Use interview details from backend
        const initialContent = context.interviewDetails || `# Interview Preparation Complete! 🎯

I've analyzed your profile and prepared a customized interview session for **${context.position}**.

Please wait while the AI generates your interview plan...`
        
        setMessages([{
          id: '1',
          role: 'ai',
          content: initialContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }])
        setIsLoading(false)
      } catch (e) {
        console.error("Failed to parse context", e)
        setError("Failed to load interview context")
        setIsLoading(false)
      }
    } else {
      // No context found - redirect to prepare page
      setMessages([{
        id: '1',
        role: 'ai',
        content: `# Welcome to Your Interview Session 👋

I couldn't find your preparation details. Let's start fresh!

Please go back to the [preparation page](/prepare) to set up your interview.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setIsLoading(false)
    }
  }, [])

  const handleSendMessage = async (text: string) => {
    if (!conversationId) {
      setError("No conversation found. Please restart from the preparation page.")
      return
    }
    
    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)
    setError(null)

    try {
      const response = await refineDetails(conversationId, text)
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: response.interview_details,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiMsg])
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to refine interview plan'
      setError(errorMessage)
      
      // Add error message to chat
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: `⚠️ **Error**: ${errorMessage}\n\nPlease try again or restart from the [preparation page](/prepare).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = async () => {
    if (!conversationId) {
      setError("No conversation found. Please restart from the preparation page.")
      return
    }
    
    setIsAccepted(true)
    setError(null)
    
    // Add acceptance message
    const acceptMsg: Message = {
      id: Date.now().toString(),
      role: 'ai',
      content: `## 🚀 Interview Starting...

Perfect! Your interview session is now being prepared.

**Transitioning to the interview room...**

*Get ready to shine! 🌟*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, acceptMsg])

    try {
      await acceptDetails(conversationId)
      setIsAccepted(true)
      
      // Store conversation ID for interview page
      sessionStorage.setItem('interviewConversationId', conversationId)
      
      // Navigate to interview page after a brief delay
      setTimeout(() => {
        router.push("/interview")
      }, 2000)
    } catch (err) {
      setIsAccepted(false)
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to accept interview plan'
      setError(errorMessage)
      
      // Add error message to chat
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: `⚠️ **Error**: ${errorMessage}\n\nPlease try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, errorMsg])
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Ambient Backgrounds */}
      <div className="fixed top-[-30%] left-[-20%] w-[60%] h-[60%] bg-blue-600/8 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
      <div className="fixed bottom-[-30%] right-[-20%] w-[60%] h-[60%] bg-purple-600/8 rounded-full blur-[150px] pointer-events-none animate-pulse-slow delay-1000" />
      <div className="fixed top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col h-screen max-w-6xl mx-auto w-full">
        
        {/* Premium Header */}
        <header className="shrink-0 px-6 py-4 border-b border-white/5 bg-black/30 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0B0F19] shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white tracking-wide">Interview Assistant</h1>
                <p className="text-xs text-slate-400 font-medium">Refine your session plan</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {interviewContext && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-slate-300 font-medium">{interviewContext.position}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              role={msg.role} 
              content={msg.content} 
              timestamp={msg.timestamp}
            />
          ))}
          
          {/* Premium Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start mb-6">
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#1e1e2d]/60 border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-bounce" />
                </div>
                <span className="text-sm text-slate-400 font-medium">AI is thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Action Buttons - Accept/Refine */}
        {!isLoading && messages.length > 0 && !isAccepted && (
          <div className="shrink-0 px-4 md:px-8 py-4 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <button
                onClick={handleAccept}
                className="flex-1 group relative px-6 py-4 rounded-2xl font-semibold text-white transition-all duration-300 overflow-hidden shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300" />
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Accept & Start Interview</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
            <p className="text-center text-xs text-slate-500 mt-3 font-medium">
              Or type below to refine the interview plan
            </p>
          </div>
        )}

        {/* Accepted State Animation */}
        {isAccepted && (
          <div className="shrink-0 px-4 md:px-8 py-6 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
              </div>
              <span className="text-emerald-400 font-semibold">Preparing your interview session...</span>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
          </div>
        )}

        {/* Input Area */}
        {!isAccepted && (
          <div className="shrink-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-transparent pt-2">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        )}
      </div>
    </div>
  )
}
