import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

export default function PremmiaCase() {
  useEffect(() => {
    document.title = "Premmia App — Carlos Filipe";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col font-sans text-[#111]">
      {/* Header */}
      <header className="flex items-center px-6 py-4 max-w-[1400px] w-full mx-auto relative">
        <div className="hidden md:flex flex-[1_0_0] items-center justify-between min-w-px relative w-full">
          <a href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity cursor-pointer">
            <img src="/carlos.jpeg" alt="carlos filipe" className="w-12 h-12 rounded-full object-cover" />
            <div className="font-bold text-[18px] tracking-[-0.18px] whitespace-nowrap leading-[1.1] flex flex-col justify-center">
              <span>carlos</span>
              <span>filipe</span>
            </div>
          </a>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="/" className="text-[18px] leading-[1.5] hover:opacity-70 transition-opacity whitespace-nowrap">
              work
            </a>
          </div>
          <div>
            <span className="text-[18px] leading-[1.5] hover:opacity-70 transition-opacity whitespace-nowrap cursor-pointer">
              about me
            </span>
          </div>
        </div>

        <div className="flex md:hidden items-center justify-between w-full">
          <a href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity cursor-pointer">
            <img src="/carlos.jpeg" alt="carlos filipe" className="w-10 h-10 rounded-full object-cover" />
            <div className="font-bold text-[16px] tracking-[-0.16px] whitespace-nowrap leading-[1.1] flex flex-col justify-center">
              <span>carlos</span>
              <span>filipe</span>
            </div>
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="text-[16px] leading-[1.5] hover:opacity-70 transition-opacity">work</a>
            <span className="text-[16px] leading-[1.5] hover:opacity-70 transition-opacity cursor-pointer">about me</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center text-[#111] bg-[#fafafa]">
          <div className="w-full max-w-[1400px] px-6 pb-20">

            {/* Case Header */}
            <header className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] items-center gap-8 pt-[96px] pb-[48px]">
              <h1 className="min-w-0 text-left font-semibold text-[clamp(44px,7.5vw,56px)] leading-[1.14] tracking-[-0.02em] lowercase">
                Premmia App
              </h1>
              <div className="flex flex-wrap gap-x-[46px] gap-y-5 justify-start lg:justify-end lowercase">
                <div className="flex min-w-[112px] flex-col gap-1">
                  <span className="text-[14px] leading-[1.5] text-[#737882]">company</span>
                  <span className="text-[18px] leading-[1.5]">Petrobras / BR</span>
                </div>
                <div className="flex min-w-[112px] flex-col gap-1">
                  <span className="text-[14px] leading-[1.5] text-[#737882]">role</span>
                  <span className="text-[18px] leading-[1.5]">Senior Product Designer</span>
                </div>
                <div className="flex min-w-[112px] flex-col gap-1">
                  <span className="text-[14px] leading-[1.5] text-[#737882]">year</span>
                  <span className="text-[18px] leading-[1.5]">2023 — 2024</span>
                </div>
              </div>
            </header>

            <div className="w-full border-y border-[#eceef4] py-6 flex flex-col gap-6">

              {/* Hero image — full width */}
              <div className="w-full py-4">
                <div className="w-full rounded-[20px] overflow-hidden bg-[#006633]">
                  <img
                    src="/premmia/KVIO9Gcs8hyaggyu.webp"
                    alt="Premmia App — Home screen"
                    className="w-full max-h-[640px] object-cover object-top block"
                  />
                </div>
              </div>

              {/* Context */}
              <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-12 items-start">
                <h2 className="text-[24px] leading-[1.44] lowercase">Context</h2>
                <div className="flex flex-col gap-4 text-[18px] leading-[1.5]">
                  <p>Premmia is Petrobras's loyalty app for service stations in Brazil — customers earn points when they fuel up or shop at BR Mania and Lubrax+, and redeem them for partner rewards.</p>
                  <p>Beyond rewards, the app also lets users pay directly at participating stations. This project was a full UI redesign focused on elevating the user experience and engagement.</p>
                </div>
              </section>

              {/* Mobile screens — 2 col grid */}
              <div className="w-full py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-[20px] overflow-hidden bg-[#f0f0f0] flex items-center justify-center">
                  <img
                    src="/premmia/KKbvpgLhq5lSsrzM.webp"
                    alt="Premmia — Perfil e Clube Premmia"
                    className="w-full object-contain max-h-[600px]"
                  />
                </div>
                <div className="rounded-[20px] overflow-hidden bg-[#f0f0f0] flex items-center justify-center">
                  <img
                    src="/premmia/Qw7wVL48pJ4IEmzN.webp"
                    alt="Premmia — Troca de pontos"
                    className="w-full object-contain max-h-[600px]"
                  />
                </div>
              </div>

              {/* My Role */}
              <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-12 items-start">
                <h2 className="text-[24px] leading-[1.44] lowercase">My Role</h2>
                <div className="flex flex-col gap-4 text-[18px] leading-[1.5]">
                  <p>This project was a UI redesign, built on personas, pain points, and strategy already mapped by the client's Research team. I owned the end-to-end UI as a <strong>Senior Product Designer</strong>, leading 2 mid-level UI Designers.</p>
                  <div className="flex flex-col gap-3 mt-2">
                    {[
                      { num: '1', label: 'Design library & assets' },
                      { num: '2', label: 'Low-fidelity wireframes (flow validation)' },
                      { num: '3', label: 'High-fidelity UI' },
                      { num: '4', label: 'Handoff' },
                    ].map(({ num, label }) => (
                      <div key={num} className="flex items-center gap-4">
                        <span className="text-[13px] text-[#999] w-5 shrink-0">{num}</span>
                        <span className="text-[18px]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Design Library */}
              <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-12 items-start">
                <h2 className="text-[24px] leading-[1.44] lowercase">Design Library & Assets</h2>
                <div className="flex flex-col gap-4 text-[18px] leading-[1.5]">
                  <p>I started with a quick UI audit and set up the foundations: color and type scales, spacing tokens, grid, and an updated icon set.</p>
                  <p>I built the core components (buttons, inputs, cards, nav, banners) with variants and states, documented usage, and ensured contrast and touch-target compliance. Everything was structured in Figma with consistent naming, Auto Layout, and constraints for easy reuse.</p>
                </div>
              </section>

              {/* More screens */}
              <div className="w-full py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-[20px] overflow-hidden bg-[#006633] flex items-center justify-center">
                  <img
                    src="/premmia/QnBUaa6iuTtX7QiN.webp"
                    alt="Premmia — Cupons"
                    className="w-full object-contain max-h-[600px]"
                  />
                </div>
                <div className="rounded-[20px] overflow-hidden bg-[#006633] flex items-center justify-center">
                  <img
                    src="/premmia/ZCXQfULmwRbUUtJH.webp"
                    alt="Premmia — Detalhe de cupom"
                    className="w-full object-contain max-h-[600px]"
                  />
                </div>
              </div>

              {/* Wireframes */}
              <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-12 items-start">
                <h2 className="text-[24px] leading-[1.44] lowercase">Low-fidelity Wireframes</h2>
                <div className="flex flex-col gap-4 text-[18px] leading-[1.5]">
                  <p>I mapped the critical journeys — onboarding/login, points accrual, payment at the station, rewards discovery/redemption, and campaign entry points.</p>
                  <p>Then I produced low-fi wireframes and a clickable prototype to validate IA, copy, and step count with Product and Research. Feedback led to fewer steps, clearer "Points balance + primary CTA" placement, and a simplified tab structure.</p>
                </div>
              </section>

              {/* High-fidelity UI */}
              <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-12 items-start">
                <h2 className="text-[24px] leading-[1.44] lowercase">High-fidelity UI</h2>
                <div className="flex flex-col gap-4 text-[18px] leading-[1.5]">
                  <p>With flows locked, I translated them into pixel-perfect screens using the new component system and brand guidelines. I designed empty, loading, and error states; added subtle motion guidelines for key interactions; and checked accessibility (contrast, hierarchy, target sizes).</p>
                </div>
              </section>

              {/* Handoff */}
              <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-12 items-start">
                <h2 className="text-[24px] leading-[1.44] lowercase">Handoff</h2>
                <div className="flex flex-col gap-4 text-[18px] leading-[1.5]">
                  <p>I organized Figma pages by flow, linked components, and provided specs via Inspect with redlines and spacing rules. I exported necessary assets (SVG/PNG), attached motion notes, and documented tokens and component props to mirror in code.</p>
                  <p>Finally, I ran a dev walkthrough, tracked open questions, and supported QA with quick UI fixes where needed.</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1400px] mx-auto px-6 py-10 mt-auto bg-[#fafafa]">
        <div className="border-t border-[#eceef4] pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav className="flex items-center gap-6 text-[18px]">
            <a href="/" className="hover:opacity-70 transition-opacity cursor-pointer">home</a>
            <a href="/" className="hover:opacity-70 transition-opacity cursor-pointer">work</a>
            <span className="hover:opacity-70 transition-opacity cursor-pointer">about</span>
          </nav>
          <p className="text-[18px] text-[#111] opacity-80">© 2026 carlos filipe. all rights reserved</p>
        </div>
      </footer>

      {/* Floating Button */}
      <div className="fixed bottom-8 right-8 z-[100] animate-[bounce_2s_infinite]">
        <a
          href="https://uxfol.io/p/carlosfilipe/cdb29fd4"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-6 py-3.5 bg-[#006633] text-white rounded-full shadow-2xl hover:bg-[#005229] hover:-translate-y-1 transition-all duration-300 font-semibold text-[15px] group"
        >
          <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
          View Case Study
        </a>
      </div>
    </div>
  );
}
