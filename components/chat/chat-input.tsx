import { Send, Sparkles, Mic } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (input.trim() && !disabled) {
      onSendMessage(input)
      setInput("")
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [input])

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 md:p-6 pb-8">
      
      {/* Animated Glow Backdrop */}
      <div className={`absolute inset-x-6 top-6 bottom-8 rounded-[32px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl transition-all duration-700 ease-out
        ${isFocused ? 'opacity-100 scale-105' : 'opacity-0 scale-95'}
      `} />

      <form 
        onSubmit={handleSubmit}
        className={`relative group flex items-end gap-3 p-2 rounded-[32px] backdrop-blur-2xl border transition-all duration-500 ease-out z-10
          ${isFocused 
            ? 'bg-[#131625]/90 border-blue-500/40 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)] ring-1 ring-blue-500/20' 
            : 'bg-[#0f111a]/60 border-white/10 hover:border-white/20 shadow-xl'
          }
        `}
      >
        {/* Animated Gradient Border (Bottom) */}
        <div className={`absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-700 opacity-0
             ${isFocused ? 'opacity-100 scale-x-100' : 'scale-x-50'}
        `} />

        <div className="flex-1 min-h-[56px] flex items-center pl-2">
            <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about the interview..."
                disabled={disabled}
                rows={1}
                className="w-full px-4 py-4 bg-transparent border-none outline-none resize-none text-slate-100 placeholder-slate-400/60 disabled:opacity-50 font-medium text-[16px] leading-relaxed scrollbar-none tracking-wide"
                style={{ maxHeight: '120px' }}
            />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 pb-1.5 pr-1.5 self-end h-[56px]">
            
            {/* Voice Input Trigger */}
            <button
                type="button"
                className={`p-3 rounded-full transition-all duration-300 group/mic
                     ${isFocused ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-300'}
                `}
                title="Voice Input"
            >
                <Mic className="w-5 h-5 group-hover/mic:scale-110 transition-transform" />
            </button>

            <div className="h-8 w-[1px] bg-white/5 mx-1" />

            {/* Send Button */}
            <button
            type="submit"
            disabled={!input.trim() || disabled}
            className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 transform
                ${input.trim() && !disabled
                ? 'bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:scale-105 active:scale-95 rotate-0'
                : 'bg-white/5 text-slate-600 cursor-not-allowed rotate-0'
                }
            `}
            >
             <div className="relative w-5 h-5">
                <Send className={`absolute inset-0 w-full h-full transition-all duration-500 ${input.trim() ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-[-45deg]'}`} />
                <Sparkles className={`absolute inset-0 w-full h-full transition-all duration-500 ${!input.trim() ? 'opacity-50 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'}`} />
             </div>
            </button>
        </div>
      </form>
      
      {/* Helper Text */}
      <div className={`text-center mt-4 transition-all duration-500 transform ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
          <p className="text-[10px] text-slate-500/80 font-medium tracking-[0.2em] uppercase">
            Start typing to refine your plan
          </p>
      </div>
    </div>
  )
}
