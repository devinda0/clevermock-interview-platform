
import React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  ArrowRight 
} from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#0B0F19] border-t border-white/5 font-sans relative overflow-hidden">
      {/* Background blobs for footer - subtle */}
      <div className="absolute top-[-50%] left-[-10%] w-[30%] h-[150%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-50%] right-[-10%] w-[30%] h-[150%] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo.png" 
                alt="CleverMock Logo" 
                width={300} 
                height={75} 
                className="h-16 md:h-18 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Master your technical interviews with our AI-powered voice assistant. Real-time feedback, realistic scenarios, and personalized coaching.
            </p>

          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-slate-200 font-semibold mb-6">Product</h3>
            <ul className="space-y-4">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#how-it-works">How it Works</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="/prepare">Try Demo</FooterLink>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-slate-200 font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/guides">Interview Guides</FooterLink>
              <FooterLink href="/questions">Question Bank</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
              <FooterLink href="/help">Help Center</FooterLink>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-slate-200 font-semibold mb-6">Stay Updated</h3>
            <p className="text-slate-400 text-sm mb-4">
              Join our newsletter for the latest interview tips and feature updates.
            </p>
            <form className="flex flex-col gap-3">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all group-hover:border-white/20"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium text-sm py-3 rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} CleverMock. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link 
      href={href} 
      className="text-slate-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
    >
      {children}
    </Link>
  </li>
);



export default Footer;
