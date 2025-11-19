"use client";

import React, { useState } from 'react';
import { 
  Briefcase, 
  Mic, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  Menu,
  X
} from 'lucide-react';
import Image from 'next/image';

/**
 * CleverMock - Virtual Mock Interview Platform
 * Theme: Blue-Purple Gradient (Cyber/Tech aesthetic)
 * Tech Stack Simulation: Next.js Structure (Client Component)
 */

// --- Components ---

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const FeatureCard: React.FC<{ icon: IconType; title: string; description: string }> = ({ icon: Icon, title, description }) => (
  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 group overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{description}</p>
    </div>
  </div>
);

const StepCard: React.FC<{ number: string | number; title: string; description: string; isLast?: boolean }> = ({ number, title, description, isLast }) => (
  <div className="relative pl-8 md:pl-0 group">
    {/* Connector Line */}
    {!isLast && (
      <div className="hidden md:block absolute top-6 left-1/2 w-[calc(100%+1.5rem)] h-0.5 bg-linear-to-r from-purple-500/50 to-blue-500/50 -translate-y-1/2 z-0" />
    )}
    {/* Mobile Connector */}
    <div className="md:hidden absolute top-0 left-[19px] w-0.5 h-full bg-linear-to-b from-purple-500/50 to-transparent z-0" />
    
    <div className="relative z-10 flex flex-col md:items-center text-left md:text-center max-w-sm mx-auto">
      <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center text-purple-400 font-bold mb-4 shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform duration-300 bg-linear-to-br from-slate-900 to-purple-900/50 z-10">
        {number}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);



const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="text-lg font-medium text-slate-200 group-hover:text-white transition-colors">{question}</span>
        <span className={`text-purple-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ArrowRight className="w-5 h-5 rotate-90" />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default function App(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', { 
        method: 'POST', 
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        console.error(data.message);
        // Optional: Show error message to user
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 selection:bg-purple-500/30 selection:text-purple-200 font-sans overflow-x-hidden">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-pink-600/10 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F19]/60 backdrop-blur-xl">
        <nav className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="text-xl font-bold text-white tracking-tight">
              CleverMock
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors hover:scale-105 transform duration-200">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors hover:scale-105 transform duration-200">How it Works</a>
            <a href="#faq" className="hover:text-white transition-colors hover:scale-105 transform duration-200">FAQ</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0B0F19]/95 backdrop-blur-xl border-b border-white/10 py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
            <a 
              href="#features" 
              className="text-slate-400 hover:text-white py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-slate-400 hover:text-white py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it Works
            </a>
            <a 
              href="#faq" 
              className="text-slate-400 hover:text-white py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[90vh] flex flex-col justify-center pt-20 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wide uppercase mb-8 animate-bounce shadow-[0_0_10px_rgba(168,85,247,0.2)]">
            <Zap className="w-3 h-3" />
            <span>AI-Powered Voice Interviews</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-2xl">
            Practice Real <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
              Voice-to-Voice
            </span>
            <br /> Interviews
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the most realistic mock interviews with our advanced voice AI. Speak naturally, get interrupted, and receive instant feedback just like the real thing.
          </p>

          {/* Waitlist Form */}
          <div className="max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row gap-2 bg-slate-900/90 backdrop-blur-xl p-2 rounded-xl border border-white/10 shadow-2xl">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500/50 transition-all"
                required
              />
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2
                  ${status === 'success' 
                    ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                    : 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105 active:scale-95'
                  }
                `}
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Joined!</span>
                  </>
                ) : (
                  <>
                    <span>Join Waitlist</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
          
            {status === 'success' && (
              <p className="mt-4 text-green-400 text-sm font-medium animate-fade-in">
                Welcome aboard! We&apos;ll invite you as soon as spots open up.
              </p>
            )}
          
          {/* <div className="mt-12 flex items-center justify-center gap-8 text-slate-500 grayscale opacity-60">
              Mock Logos 
            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-current"/> TechCorp</div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-current"/> InnoSys</div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 rotate-45 bg-current"/> DataFlow</div>
          </div> */}
        </div>
      </section>

      {/* Value Proposition */}
      <section id="features" className="py-24 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to ace it</h2>
            <p className="text-slate-400">Comprehensive tools tailored for every career path.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Briefcase}
              title="Role-Specific Scenarios"
              description="Practice with questions tailored to your specific industry and job role, from marketing and sales to engineering and design."
            />
            <FeatureCard 
              icon={Mic}
              title="Real-time Voice Engine"
              description="Experience ultra-low latency voice interactions that feel just like speaking to a real human interviewer."
            />
            <FeatureCard 
              icon={Sparkles}
              title="Smart Feedback Engine"
              description="Get instant, personalized feedback on your answers, highlighting strengths and areas for improvement."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-slate-900/0 via-purple-900/5 to-slate-900/0 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your path to success</h2>
            <p className="text-slate-400">Simple steps to your dream job.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 md:gap-6 relative">
            <StepCard 
              number="1"
              title="Upload Resume"
              description="We parse your resume to tailor questions specifically to your experience level and target roles."
            />
            <StepCard 
              number="2"
              title="Start Voice Session"
              description="Connect your microphone and jump into a 45-minute lifelike interview session."
            />
            <StepCard 
              number="3"
              title="Get Detailed Feedback"
              description="Receive an instant, granular scorecard highlighting strengths and areas for improvement."
              isLast={true}
            />
          </div>
        </div>
      </section>



      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400">Got questions? We&apos;ve got answers.</p>
          </div>
          <div className="space-y-2">
            <FaqItem 
              question="Is it really voice-to-voice?"
              answer="Yes! We use advanced speech-to-text and text-to-speech models to create a seamless conversational experience. No typing required."
            />
            <FaqItem 
              question="Can I practice for specific companies?"
              answer="Absolutely. You can specify the company and role you are interviewing for, and our AI will tailor the style and difficulty of questions accordingly."
            />
            <FaqItem 
              question="How much does it cost?"
              answer="We are currently in beta and offering free access to early users. Join the waitlist to secure your spot!"
            />
            <FaqItem 
              question="Do you support coding interviews?"
              answer="Currently, we focus on system design, behavioral, and verbal technical questions. A collaborative coding environment is coming soon."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-linear-to-r from-blue-900/40 to-purple-900/40 border border-white/10 p-12 text-center relative overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] group-hover:bg-purple-500/30 transition-colors duration-500"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-colors duration-500"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            Ready to level up your career?
          </h2>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto relative z-10">
            Join 2,000+ engineers waiting to get early access to CleverMock.
          </p>
          
          <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="relative z-10 px-8 py-3 rounded-full bg-white text-purple-900 font-bold hover:bg-purple-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95"
          >
            Get Early Access
          </button>

          <div className="mt-8 flex items-center justify-center gap-4 relative z-10">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-purple-900 bg-slate-700 flex items-center justify-center text-xs overflow-hidden hover:scale-110 transition-transform z-0 hover:z-10">
                   <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*123}`} alt="User" width={40} height={40} />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-sm">50+ Engineers</div>
              <div className="text-slate-400 text-xs">Joined this week</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-200">
              CleverMock
            </span>
          </div>
          
          {/* <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div> */}

          <p className="text-slate-500 text-sm">&copy; 2025 CleverMock. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}