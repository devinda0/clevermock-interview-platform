"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { User, Mail, Lock, ArrowRight, Loader2, AlertCircle, Sparkles, CheckCircle } from "lucide-react"
import { signup, ApiError } from "@/lib/api"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    full_name: "",
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
      await signup({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
      })
      
      setStatus('success')
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    } catch (error) {
      setStatus('error')
      if (error instanceof ApiError) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.')
      }
      console.error('Signup error:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-12 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Ambient Backgrounds */}
      <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow delay-1000" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <Link href="/">
               <Image 
                  src="/logo.png" 
                  alt="CleverMock Logo" 
                  width={300} 
                  height={75} 
                  className="h-16 md:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
               />
             </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Sparkles className="w-3 h-3" />
            <span>Join CleverMock</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Create Your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
              Account
            </span>
          </h1>
          
          <p className="text-sm text-slate-400 leading-relaxed">
            Start your journey to mastering interviews with AI-powered practice.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-xl border border-white/10 relative overflow-hidden">
            {/* Top border gradient */}
             <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="text"
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all"
                  placeholder="••••••••"
                  minLength={8}
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
                <p className="text-sm font-medium">Account created! Redirecting...</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`w-full py-3.5 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group shadow-lg mt-4
                ${status === 'success' 
                  ? 'bg-green-600 hover:bg-green-700 shadow-green-500/25' 
                  : 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-purple-500/25'
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
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
