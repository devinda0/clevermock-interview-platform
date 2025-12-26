
import { CheckCircle2, Clock, FileText, Home, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface InterviewSummaryProps {
  duration?: number // duration in seconds
  transcription?: string
}

export default function InterviewSummary({ duration, transcription }: InterviewSummaryProps) {
  const router = useRouter()

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white p-4">
      <div className="w-full max-w-2xl space-y-8 animate-in fade-in zoom-in duration-500">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full"></div>
            <div className="relative w-24 h-24 mx-auto bg-slate-900 rounded-full border-2 border-emerald-500/50 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Interview Completed!
            </h1>
            <p className="text-slate-400 mt-2 text-lg">
              Great job completing your session. The AI is analyzing your performance.
            </p>
          </div>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 backdrop-blur border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <p className="text-sm text-slate-400">Duration</p>
                    <p className="text-xl font-semibold text-white">
                        {duration ? formatDuration(duration) : "15m 00s"}
                    </p>
                </div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                    <p className="text-sm text-slate-400">Status</p>
                    <p className="text-xl font-semibold text-white">Processed</p>
                </div>
            </div>
        </div>

        {/* Summary Content Placeholder */}
        <div className="bg-slate-900/80 backdrop-blur border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">Performance Summary</h3>
            </div>
            
            <div className="space-y-4">
                <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl">
                    <p className="text-emerald-200/80 leading-relaxed">
                        Your detailed interview analysis and feedback report is being generated. 
                        We will notify you once the AI has completed the evaluation of your responses, 
                        technical accuracy, and communication style.
                    </p>
                </div>
                
                {transcription && (
                    <div className="space-y-2">
                         <p className="text-sm font-medium text-slate-400">Last Transcript Segment:</p>
                         <p className="p-4 bg-black/30 rounded-xl text-slate-300 italic text-sm border border-white/5">
                            &quot;{transcription}&quot;
                        </p>
                    </div>
                )}
            </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => router.push("/chat")}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            <Home className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />
            <span className="font-medium">Return to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  )
}
