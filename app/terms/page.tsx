
import React from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsOfService() {
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
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                    <FileText className="w-4 h-4" />
                    <span>Legal Documentation</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
                <p className="text-xl text-slate-400">Last updated: December 21, 2025</p>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                <p className="lead text-xl text-slate-300 mb-8">
                    Welcome to CleverMock. These Terms of Service (&quot;Terms&quot;) govern your use of the CleverMock website and services. By accessing or using our Service, you agree to be bound by these Terms.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">1. Acceptance of Terms</h2>
                <p>
                    By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">2. Description of Service</h2>
                <p>
                    CleverMock provides an AI-powered mock interview platform that allows users to practice technical interviews using voice interaction. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">3. User Accounts</h2>
                <p>
                    When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>
                <p className="mt-4">
                    You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">4. User Content</h2>
                <p>
                    Our Service allows you to upload resume files and generate audio content (&quot;User Content&quot;). You retain all rights in your User Content. By uploading User Content, you grant CleverMock a license to use, process, and analyze that content solely for the purpose of providing the interview service to you.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">5. Acceptable Use</h2>
                <p>
                    You agree not to use the Service:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-400">
                    <li>In any way that violates any applicable national or international law or regulation.</li>
                    <li>To transmit, or procure the sending of, any advertising or promotional material, including any &quot;junk mail&quot;, &quot;chain letter,&quot; &quot;spam,&quot; or any other similar solicitation.</li>
                    <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
                    <li>To engage in any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Service.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">6. Intellectual Property</h2>
                <p>
                    The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of CleverMock and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>

                 <h2 className="text-2xl font-bold text-white mt-12 mb-6">7. Limitation of Liability</h2>
                <p>
                    In no event shall CleverMock, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">8. Changes</h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">9. Contact Us</h2>
                <p>
                    If you have any questions about these Terms, please contact us at <a href="mailto:legal@clevermock.com" className="text-purple-400 hover:text-purple-300 transition-colors">legal@clevermock.com</a>.
                </p>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
