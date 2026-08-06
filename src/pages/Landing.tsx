import { ArrowRight } from 'lucide-react';
import { useAuth } from '../lib/auth';

export default function Landing() {
  const { session } = useAuth();

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-[1200px] mx-auto">
        <span className="font-bold text-[20px] tracking-[-0.02em]">showfolio</span>
        <div className="flex items-center gap-4">
          {session ? (
            <a
              href="/dashboard"
              className="px-4 py-2 bg-[#111] text-white rounded-xl text-[14px] font-medium hover:bg-[#333] transition-colors"
            >
              Dashboard
            </a>
          ) : (
            <>
              <a href="/login" className="text-[14px] text-[#777] hover:text-[#111] transition-colors">
                Sign in
              </a>
              <a
                href="/login#signup"
                className="px-4 py-2 bg-[#111] text-white rounded-xl text-[14px] font-medium hover:bg-[#333] transition-colors"
              >
                Get started
              </a>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f0f0f0] rounded-full text-[12px] text-[#555] font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Now in beta · Free to start
        </div>

        <h1 className="text-[clamp(48px,8vw,96px)] font-semibold leading-[0.95] tracking-[-0.03em] lowercase mb-8">
          your portfolio,<br />
          <span className="text-[#aaa]">beautifully simple</span>
        </h1>

        <p className="text-[18px] md:text-[22px] text-[#555] leading-[1.5] max-w-[560px] mx-auto mb-10">
          Create a stunning design portfolio in minutes. No code, no templates — just your work, presented perfectly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/login"
            className="flex items-center gap-2 px-6 py-3.5 bg-[#111] text-white rounded-xl text-[16px] font-medium hover:bg-[#333] transition-colors"
          >
            Create your portfolio
            <ArrowRight size={18} />
          </a>
          <a
            href="/p/carlos"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 border border-[#ddd] rounded-xl text-[16px] hover:border-[#111] transition-colors"
          >
            See example
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="w-full h-px bg-[#e8e8e8] mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '✦',
              title: 'Built for designers',
              desc: 'Full-bleed images, case study layouts, and password-protected projects — everything a designer needs.',
            },
            {
              icon: '⚡',
              title: 'Live in minutes',
              desc: 'Create an account, add your projects, and share your link. Your portfolio is instantly live at showfolio.com/p/you.',
            },
            {
              icon: '🔒',
              title: 'Protect your work',
              desc: 'Lock any project with a password. Perfect for NDA work or projects you only want certain people to see.',
            },
          ].map((f) => (
            <div key={f.title} className="flex flex-col gap-4 p-6 bg-white border border-[#eee] rounded-2xl">
              <span className="text-[28px]">{f.icon}</span>
              <h3 className="font-semibold text-[17px]">{f.title}</h3>
              <p className="text-[15px] text-[#666] leading-[1.6]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="w-full h-px bg-[#e8e8e8] mb-16" />
        <h2 className="text-[36px] font-semibold tracking-[-0.02em] text-center mb-12 lowercase">simple pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[700px] mx-auto">
          {/* Free */}
          <div className="p-7 bg-white border border-[#eee] rounded-2xl flex flex-col gap-5">
            <div>
              <p className="text-[13px] font-medium text-[#888] uppercase tracking-wide mb-2">Free</p>
              <p className="text-[40px] font-bold tracking-[-0.02em]">R$0</p>
              <p className="text-[14px] text-[#888] mt-1">Forever free</p>
            </div>
            <ul className="flex flex-col gap-3 text-[14px] text-[#555]">
              {['Up to 2 projects', 'showfolio.com/p/you URL', 'Password-protected projects', 'Unlimited image uploads'].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="/login" className="mt-auto block text-center px-4 py-3 border border-[#ddd] rounded-xl text-[14px] font-medium hover:border-[#111] transition-colors">
              Get started free
            </a>
          </div>

          {/* Pro */}
          <div className="p-7 bg-[#111] text-white rounded-2xl flex flex-col gap-5">
            <div>
              <p className="text-[13px] font-medium text-[#888] uppercase tracking-wide mb-2">Pro</p>
              <div className="flex items-end gap-2">
                <p className="text-[40px] font-bold tracking-[-0.02em]">R$29</p>
                <p className="text-[16px] text-[#888] mb-2">/mo</p>
              </div>
              <p className="text-[14px] text-[#888] mt-1">Billed monthly</p>
            </div>
            <ul className="flex flex-col gap-3 text-[14px] text-[#aaa]">
              {['Unlimited projects', 'Everything in Free', 'Analytics & visitor stats', 'Custom domain support', 'Priority support'].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-green-400 font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className="mt-auto block text-center px-4 py-3 bg-white text-[#111] rounded-xl text-[14px] font-semibold hover:bg-[#f0f0f0] transition-colors">
              Coming soon
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#eee] px-6 py-8">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between text-[14px] text-[#aaa]">
          <span className="font-semibold text-[#111]">showfolio</span>
          <span>© {new Date().getFullYear()} showfolio. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
