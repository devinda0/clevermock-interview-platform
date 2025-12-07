"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, Sparkles, CheckCircle, LogIn } from "lucide-react"
import { login, ApiError } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage(null)

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      })
      
      // Store tokens
      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('refresh_token', response.refresh_token)
      
      // Set cookie for middleware access (non-HttpOnly for client-side setting)
      // Max age 1 day (86400 seconds)
      document.cookie = `access_token=${response.access_token}; path=/; max-age=86400; SameSite=Strict`
      
      setStatus('success')
      
      // Redirect to prepare page after a short delay
      setTimeout(() => {
        router.push("/prepare")
      }, 1000)
    } catch (error) {
      setStatus('error')
      if (error instanceof ApiError) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.')
      }
      console.error('Login error:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-12 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Ambient Backgrounds */}
      <div className="absolute top-[-20%] right-[-20%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-20%] left-[-20%] w-[70%] h-[70%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow delay-1000" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3 h-3" />
            <span>Welcome Back</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Sign In to <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
              CleverMock
            </span>
          </h1>
          
          <p className="text-sm text-slate-400 leading-relaxed">
            Continue your interview preparation journey where you left off.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-xl border border-white/10 relative overflow-hidden">
            {/* Top border gradient */}
             <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Password</label>
                <Link href="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error Display */}
            {status === 'error' && errorMessage && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 animate-enter">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{errorMessage}</p>
              </div>
            )}

            {/* Success Display */}
            {status === 'success' && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 animate-enter">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">Login successful! Redirecting...</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`w-full py-3.5 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group shadow-lg mt-4
                ${status === 'success' 
                  ? 'bg-green-600 hover:bg-green-700 shadow-green-500/25' 
                  : 'bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-500/25'
                }
              `}
            >
               {/* Shimmer effect */}
               <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Success</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{' '}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
