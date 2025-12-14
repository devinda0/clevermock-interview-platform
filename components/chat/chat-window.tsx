"use client"

import { useState, useEffect, useRef } from "react"
import { MessageBubble } from "./message-bubble"
import { ChatInput } from "./chat-input"
import { Mic } from "lucide-react"

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: string
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
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
    
    // Simulate initial AI processing
    const timer = setTimeout(() => {
      let initialContent = "Hello! I'm your AI Interviewer. I'm ready to start. Could not find your prep details, so we can start fresh or you can tell me what you're applying for."
      
      if (storedContext) {
        try {
            const context = JSON.parse(storedContext)
            initialContent = `Hello! I see you're applying for the **${context.position}** role. I've reviewed your resume (${context.cvName}) and instructions.

I've prepared a customized interview session focusing on:
_${context.instruction}_

Are you ready to begin?`
        } catch (e) {
            console.error("Failed to parse context", e)
        }
      }

      setMessages([
        {
          id: '1',
          role: 'ai',
          content: initialContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = async (text: string) => {
    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    // Simulate AI Response (Mock)
    setTimeout(() => {
        const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'ai',
            content: "That's a great start. Tell me more about your experience with system design scalability.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, aiMsg])
        setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col w-full h-full glass-panel overflow-hidden md:rounded-3xl shadow-2xl border border-white/10 relative">
      
      {/* Premium Header */}
      <div className="shrink-0 px-6 py-5 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)] animate-pulse" />
             <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-20" />
          </div>
          <div>
              <h2 className="text-white font-medium tracking-wide text-lg">Interview Assistant</h2>
              <p className="text-xs text-slate-400 font-medium">Session Active • 12:45 PM</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <Mic className="w-3.5 h-3.5" />
                <span>Voice On</span>
            </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
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
          <div className="flex justify-start mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="flex items-center gap-2 px-4 py-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
             </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 z-20 bg-black/20 backdrop-blur-sm">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>

    </div>
  )
}
