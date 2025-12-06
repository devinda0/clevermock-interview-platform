"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, CheckCircle, ArrowRight, Loader2, AlertCircle } from "lucide-react"
import { startPreparation, ApiError } from "@/lib/api"

export function VideoInterviewPrepForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cv: null as File | null,
    position: "",
    instruction: "",
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage(null)
    
    if (!formData.cv) {
      setStatus('error')
      setErrorMessage('Please upload a CV file')
      return
    }

    try {
      const response = await startPreparation(
        formData.cv,
        formData.position,
        formData.instruction
      )
      
      // Save response to sessionStorage for chat page
      sessionStorage.setItem('interviewContext', JSON.stringify({
        conversationId: response.conversation_id,
        position: formData.position,
        instruction: formData.instruction,
        cvName: formData.cv.name,
        interviewDetails: response.interview_details,
        status: response.status
      }))
      
      setStatus('success')
      
      // Navigate to chat page
      setTimeout(() => {
        router.push("/chat")
      }, 500)
    } catch (error) {
      setStatus('error')
      if (error instanceof ApiError) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.')
      }
      console.error('Preparation error:', error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cv: e.target.files[0] })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 p-12 -mr-12 -mt-12 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 p-12 -ml-12 -mb-12 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-500" />

      <div className="relative z-10 space-y-6">
        {/* CV Upload Section */}
        <div className="space-y-3">
          <label htmlFor="cv" className="block text-sm font-semibold text-slate-300">
            Resume / CV
          </label>
          <div className="relative group/upload">
            <div className={`absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover/upload:opacity-50 blur transition duration-500 ${formData.cv ? 'opacity-20' : ''}`} />
            <label 
              htmlFor="cv" 
              className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
                ${formData.cv 
                  ? 'border-green-500/50 bg-green-500/5' 
                  : 'border-slate-600 bg-slate-900/50 hover:bg-slate-800 hover:border-blue-400'
                }
              `}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                {formData.cv ? (
                   <>
                    <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-3">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-green-400 truncate max-w-xs">{formData.cv.name}</p>
                    <p className="text-xs text-green-500/70 mt-1">Click to change</p>
                   </>
                ) : (
                    <>
                        <Upload className="w-10 h-10 mb-3 text-slate-500 group-hover/upload:text-blue-400 transition-colors" />
                        <p className="mb-2 text-sm text-slate-400 font-medium">
                            <span className="text-blue-400 group-hover/upload:underline">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-600">PDF, DOCX up to 10MB</p>
                    </>
                )}
              </div>
              <input id="cv" type="file" className="hidden" onChange={handleFileChange} required accept=".pdf,.doc,.docx" />
            </label>
          </div>
        </div>

        {/* Position Input */}
        <div className="space-y-3">
          <label htmlFor="position" className="block text-sm font-semibold text-slate-300">
            Target Role
          </label>
          <div className="relative group/input">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-focus-within/input:opacity-50 transition duration-300" />
            <div className="relative flex items-center">
                <FileText className="absolute left-3 w-5 h-5 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                <input
                id="position"
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-transparent focus:ring-0 transition-all font-medium"
                placeholder="e.g. Senior Frontend Engineer"
                />
            </div>
          </div>
        </div>

        {/* Instructions Input */}
        <div className="space-y-3">
          <label htmlFor="instruction" className="block text-sm font-semibold text-slate-300">
            Focus Areas / Context
          </label>
          <div className="relative group/input">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-focus-within/input:opacity-50 transition duration-300" />
            <textarea
              id="instruction"
              value={formData.instruction}
              onChange={(e) => setFormData({ ...formData, instruction: e.target.value })}
              required
              rows={4}
              className="relative w-full px-4 py-3 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-transparent focus:ring-0 transition-all resize-none font-medium leading-relaxed"
              placeholder="E.g., Focus on React optimization and system design patterns..."
            />
          </div>
        </div>

        {/* Error Display */}
        {status === 'error' && errorMessage && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/btn shadow-lg
            ${status === 'success' 
              ? 'bg-green-500 hover:bg-green-600 shadow-green-500/25' 
              : status === 'error'
              ? 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-purple-500/25'
              : 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-purple-500/25'
            }
          `}
        >
            {/* Shimmer effect */}
           <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
            
          {status === 'loading' ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : status === 'success' ? (
            <>
              <CheckCircle className="w-6 h-6" />
              <span>Ready to Go!</span>
            </>
          ) : (
            <>
              <span>Generate Interview Plan</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
