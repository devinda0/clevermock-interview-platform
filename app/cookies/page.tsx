
import React from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';

export default function CookiePolicy() {
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
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
                    <Cookie className="w-4 h-4" />
                    <span>Legal Documentation</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Cookie Policy</h1>
                <p className="text-xl text-slate-400">Last updated: December 21, 2025</p>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                <p className="lead text-xl text-slate-300 mb-8">
                    This Cookie Policy explains how CleverMock (&quot;we&quot;, &quot;us&quot;, and &quot;our&quot;) uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">1. What are cookies?</h2>
                <p>
                    Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                </p>
                <p className="mt-4">
                   Cookies set by the website owner (in this case, CleverMock) are called &quot;first-party cookies&quot;. Cookies set by parties other than the website owner are called &quot;third-party cookies&quot;. Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., analytics).
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">2. Why do we use cookies?</h2>
                <p>
                    We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as &quot;essential&quot; or &quot;strictly necessary&quot; cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.
                </p>

                <div className="glass-panel p-6 rounded-xl border border-white/10 my-6 bg-slate-900/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Types of Cookies We Use:</h3>
                    <ul className="list-disc pl-6 space-y-3 text-slate-400">
                        <li>
                            <strong className="text-pink-300">Essential Cookies:</strong> These are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas (e.g. Authentication tokens).
                        </li>
                        <li>
                            <strong className="text-blue-300">Analytics & Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
                        </li>
                    </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">3. How can I control cookies?</h2>
                <p>
                    You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
                </p>

                 <h2 className="text-2xl font-bold text-white mt-12 mb-6">4. Updates to this Policy</h2>
                <p>
                    We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">5. Contact Us</h2>
                <p>
                    If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:support@clevermock.com" className="text-pink-400 hover:text-pink-300 transition-colors">support@clevermock.com</a>.
                </p>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
