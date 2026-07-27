import { useEffect } from 'react';
import { Play } from 'lucide-react';
import OptimizationObjectivesWidget from '../components/widgets/OptimizationObjectivesWidget';
import RevenueComparisonWidget from '../components/widgets/RevenueComparisonWidget';
import SelectionSummaryWidget from '../components/widgets/SelectionSummaryWidget';
import RevenueOverviewWidget from '../components/widgets/RevenueOverviewWidget';
import UIKitSection from '../components/widgets/UIKitSection';

export default function PromotoolCase() {
  useEffect(() => {
    document.title = "Promotool App — Carlos Filipe";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col font-sans text-[#111]">
      <header className="flex items-center px-6 py-4 max-w-[1400px] w-full mx-auto relative">
        <div className="hidden md:flex flex-[1_0_0] items-center justify-between min-w-px relative w-full">
          <a href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity cursor-pointer">
            <img src="/carlos.jpeg" alt="carlos filipe" className="w-12 h-12 rounded-full object-cover" />
            <div className="font-bold text-[18px] tracking-[-0.18px] whitespace-nowrap leading-[1.1] flex flex-col justify-center">
              <span>carlos</span>
              <span>filipe</span>
            </div>
          </a>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-[8px] rounded-[12px]">
            <a href="/" className="text-[18px] leading-[1.5] hover:opacity-70 transition-opacity whitespace-nowrap">
              work
            </a>
          </div>
          <div className="flex items-center justify-center p-[8px] rounded-[12px]">
            <span className="text-[18px] leading-[1.5] hover:opacity-70 transition-opacity whitespace-nowrap cursor-pointer">
              about me
            </span>
          </div>
        </div>

        <div className="flex md:hidden items-center justify-between w-full">
          <a href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity cursor-pointer">
            <img src="/carlos.jpeg" alt="carlos filipe" className="w-12 h-12 rounded-full object-cover" />
            <div className="font-bold text-[18px] tracking-[-0.18px] whitespace-nowrap leading-[1.1] flex flex-col justify-center">
              <span>carlos</span>
              <span>filipe</span>
            </div>
          </a>
          <div className="flex items-center gap-[8px]">
            <div className="flex items-center justify-center p-[8px] rounded-[12px]">
              <a href="/" className="text-[18px] leading-[1.5] hover:opacity-70 transition-opacity whitespace-nowrap">
                work
              </a>
            </div>
            <div className="flex items-center justify-center p-[8px] rounded-[12px]">
              <span className="text-[18px] leading-[1.5] hover:opacity-70 transition-opacity whitespace-nowrap cursor-pointer">
                about me
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center text-[#111] bg-[#fafafa]">
          <div className="w-full max-w-[1400px] px-6 pb-20">
            <header className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] items-center gap-8 px-[0px] pt-[96px] pb-[48px]">
              <h1 className="min-w-0 text-left font-semibold text-[clamp(44px,7.5vw,56px)] leading-[1.14] tracking-[-0.02em] lowercase">
                Promotool AI
              </h1>
              <div className="flex flex-wrap gap-x-[46px] gap-y-5 justify-start lg:justify-end lowercase">
                <div className="flex min-w-[112px] flex-col gap-1">
                  <span className="text-[14px] leading-[1.5] text-[#737882]">company</span>
                  <span className="text-[18px] leading-[1.5]">O Boticário</span>
                </div>
                <div className="flex min-w-[112px] flex-col gap-1">
                  <span className="text-[14px] leading-[1.5] text-[#737882]">role</span>
                  <span className="text-[18px] leading-[1.5]">UX/UI Designer</span>
                </div>
              </div>
            </header>

            <div className="w-full border-y border-[#eceef4] py-6 flex flex-col gap-6">
              <div className="w-full py-4">
                <div className="w-full aspect-[400/280] rounded-[16px] bg-[#d9d9d9] overflow-hidden border border-[#eceef4]">
                  <img src="/portfolio-1.png" alt="Promotool Dashboard Overview" className="w-full h-full object-cover block bg-slate-200" />
                </div>
              </div>

              <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-12 items-start">
                <h2 className="text-[24px] leading-[1.44] lowercase">Context</h2>
                <div className="flex flex-col gap-2 text-[18px] leading-[1.5]">
                  <p>Promotool AI began with a clear product challenge: integrate artificial intelligence to make a complex, important workflow feel simple, trustworthy and easy to use.</p>
                  <p>I worked across product definition, UX and interface design to translate early requirements into a coherent AI-driven product experience.</p>
                </div>
              </section>

              <div className="w-full py-4">
                <div className="w-full aspect-[400/280] rounded-[16px] bg-[#d9d9d9] overflow-hidden border border-[#eceef4]">
                  <img src="/portfolio-2.png" alt="Promotool Interface 2" className="w-full h-full object-cover block bg-slate-200" />
                </div>
              </div>

              <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-12 items-start">
                <h2 className="text-[24px] leading-[1.44] lowercase">Opportunity</h2>
                <div className="flex flex-col gap-2 text-[18px] leading-[1.5]">
                  <p>The opportunity was to reduce friction without flattening the nuance of the product. Businesses needed a single place to manage promotional plans, historical context, and financial forecasts, leveraging AI for intelligent insights.</p>
                  <p>The design needed to feel calm and direct while giving users enough structure to act confidently on AI recommendations.</p>
                </div>
              </section>

              <div className="w-full py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="min-h-[400px]">
                  <OptimizationObjectivesWidget showButton={false} />
                </div>
                <div className="min-h-[400px]">
                  <RevenueComparisonWidget />
                </div>
              </div>

              <div className="w-full py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="min-h-[400px]">
                  <SelectionSummaryWidget showButton={false} />
                </div>
                <div className="min-h-[400px]">
                  <RevenueOverviewWidget showFiltersButton={false} />
                </div>
              </div>

              <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-12 items-start">
                <h2 className="text-[24px] leading-[1.44] lowercase">Shaping the Product</h2>
                <div className="flex flex-col gap-2 text-[18px] leading-[1.5]">
                  <p>I mapped core journeys, clarified feature priorities and developed flows that connected business goals with user needs.</p>
                  <p>This helped turn a broad product direction into a practical system of screens, states and reusable patterns.</p>
                </div>
              </section>

              <div className="w-full py-4">
                <UIKitSection />
              </div>
            </div>
          </div>
        </div>
      </main>

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

      {/* Floating Action Button to Live Prototype */}
      <div className="fixed bottom-8 right-8 z-[100] animate-[bounce_2s_infinite]">
        <a
          href="https://promotool.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-6 py-3.5 bg-[#295BF2] text-white rounded-full shadow-2xl hover:shadow-[#295BF2]/40 hover:-translate-y-1 transition-all duration-300 font-semibold text-[15px] group"
        >
          <Play size={18} className="fill-white group-hover:scale-110 transition-transform" />
          View Live Prototype
        </a>
      </div>
    </div>
  );
}
