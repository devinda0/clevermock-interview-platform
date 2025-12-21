
import React from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans selection:bg-purple-500/30 selection:text-purple-200 flex flex-col">
      
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>
        </div>
      </nav>

      <main className="flex-1 relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
            
            {/* Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                    <Shield className="w-4 h-4" />
                    <span>Legal Documentation</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
                <p className="text-xl text-slate-400">Last updated: December 21, 2025</p>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                <p className="lead text-xl text-slate-300 mb-8">
                    At CleverMock, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website and use our AI interview services.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">1. Information We Collect</h2>
                <p>
                    We collect information that you strictly provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website (such as using our AI Interviewer) or otherwise when you contact us.
                </p>
                <div className="glass-panel p-6 rounded-xl border border-white/10 my-6 bg-slate-900/50">
                    <ul className="list-disc pl-6 space-y-2 text-slate-400">
                        <li><strong>Personal Data:</strong> Name, email address, and job preferences.</li>
                        <li><strong>Interview Data:</strong> Voice recordings, transcripts, and resume content uploaded for analysis.</li>
                        <li><strong>Usage Data:</strong> Information about how you use our website, including access times, pages viewed, and IP address.</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">2. How We Use Your Information</h2>
                <p>
                    We use the information we collect or receive:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>To provide and manage your account.</li>
                    <li>To generate personalized interview questions and feedback based on your resume and preferences.</li>
                    <li>To improve our AI models and user experience (data is anonymized where possible).</li>
                    <li>To send you administrative information, such as product, service, and new feature information and/or information about changes to our terms, conditions, and policies.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">3. Disclosure of Your Information</h2>
                <p>
                    We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
                    <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance. Specifically, we utilize third-party LLM and Voice providers to power the interview experience.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">4. Data Security</h2>
                <p>
                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">5. Contact Us</h2>
                <p>
                    If you have questions or comments about this policy, you may email us at <a href="mailto:support@clevermock.com" className="text-blue-400 hover:text-blue-300 transition-colors">support@clevermock.com</a>.
                </p>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
