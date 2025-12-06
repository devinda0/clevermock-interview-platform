import { User, Bot, Sparkles } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MessageBubbleProps {
  role: 'user' | 'ai'
  content: string
  timestamp?: string
}

export function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
  const isAI = role === 'ai'

  return (
    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} mb-6 group animate-enter`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] gap-4 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 duration-300
          ${isAI 
            ? 'bg-linear-to-br from-indigo-500 via-purple-600 to-blue-600 text-white shadow-purple-500/30' 
            : 'bg-slate-800 text-slate-300 border border-slate-700'
          }`}
        >
          {isAI ? (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  <Bot className="w-5 h-5 relative z-10" />
              </div>
          ) : (
              <User className="w-5 h-5" />
          )}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isAI ? 'items-start' : 'items-end'} w-full min-w-0`}>
          <div className={`relative px-6 py-5 rounded-3xl shadow-sm leading-relaxed tracking-wide
            ${isAI
              ? 'bg-[#1e1e2d]/80 backdrop-blur-md text-slate-100 rounded-tl-none border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
              : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-[0_8px_20px_rgba(59,130,246,0.3)]'
            }
          `}>
             {isAI && (
                <div className="absolute -top-2 -left-2 w-5 h-5 text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-12 group-hover:rotate-0 transform scale-0 group-hover:scale-100">
                    <Sparkles className="w-full h-full fill-current drop-shadow-[0_0_8px_rgba(253,224,71,0.5)]" />
                </div>
             )}
            
            {/* Markdown Content */}
            <div className={`prose prose-sm max-w-none break-words
                ${isAI ? 'prose-invert prose-p:text-slate-200 prose-headings:text-white prose-strong:text-blue-300 prose-ul:text-slate-200' : 'text-white prose-p:text-white prose-headings:text-white prose-strong:text-white prose-ul:text-white marker:text-white/70'}
            `}>
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                        // Customize specific elements if needed
                        a: ({node, ...props}) => <a {...props} className="text-blue-300 hover:text-blue-200 underline underline-offset-2" target="_blank" rel="noopener noreferrer" />,
                        ul: ({node, ...props}) => <ul {...props} className="my-2 list-disc pl-4 space-y-1" />,
                        ol: ({node, ...props}) => <ol {...props} className="my-2 list-decimal pl-4 space-y-1" />,
                        li: ({node, ...props}) => <li {...props} className="pl-1" />,
                        p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0" />,
                        code: ({node, className, children, ...props}: any) => {
                            const match = /language-(\w+)/.exec(className || '')
                            const isInline = !match && !className?.includes('language-')
                            return isInline ? (
                                <code {...props} className="bg-white/10 px-1.5 py-0.5 rounded text-[0.9em] font-mono break-all border border-white/10">
                                    {children}
                                </code>
                            ) : (
                                <div className="relative group/code my-4">
                                     <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-lg opacity-0 group-hover/code:opacity-100 transition-opacity" />
                                    <pre className="!bg-[#0f111a] !p-4 rounded-xl border border-white/10 overflow-x-auto selection:bg-blue-500/30">
                                        <code {...props} className={`${className} font-mono text-sm`}>
                                            {children}
                                        </code>
                                    </pre>
                                </div>
                            )
                        }
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

          </div>
          
          {/* Timestamp */}
          {timestamp && (
            <span className={`text-[10px] uppercase tracking-wider font-semibold mt-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                ${isAI ? 'text-slate-500' : 'text-slate-500 text-right'}
            `}>
              {timestamp}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
