import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, ExternalLink } from 'lucide-react';
import { loadProjects, type Project } from '../data/projects';
import PasswordGate from '../components/PasswordGate';
import OptimizationObjectivesWidget from '../components/widgets/OptimizationObjectivesWidget';
import RevenueComparisonWidget from '../components/widgets/RevenueComparisonWidget';
import SelectionSummaryWidget from '../components/widgets/SelectionSummaryWidget';
import RevenueOverviewWidget from '../components/widgets/RevenueOverviewWidget';
import UIKitSection from '../components/widgets/UIKitSection';

// ─── Section renderers ────────────────────────────────────────────────────────

function SectionRenderer({ section }: { section: Project['sections'][number] }) {
  switch (section.type) {
    case 'image-full':
      return (
        <div className="w-full py-4">
          <div
            className="w-full rounded-[20px] overflow-hidden"
            style={{ background: section.bg ?? '#d9d9d9' }}
          >
            <img
              src={section.src}
              alt={section.alt}
              className="w-full max-h-[640px] object-cover object-top block"
            />
          </div>
        </div>
      );

    case 'image-grid':
      return (
        <div className="w-full py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          {section.images.map((img, i) => (
            <div
              key={i}
              className="rounded-[20px] overflow-hidden flex items-center justify-center"
              style={{ background: img.bg ?? '#f0f0f0' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-contain max-h-[600px]"
              />
            </div>
          ))}
        </div>
      );

    case 'text':
      return (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-12 items-start">
          <h2 className="text-[24px] leading-[1.44] lowercase">{section.heading}</h2>
          <div className="flex flex-col gap-4 text-[18px] leading-[1.5]">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      );

    case 'deliverables':
      return (
        <div className="w-full py-4 md:pl-[calc(50%+20px)]">
          {section.intro && <p className="text-[18px] leading-[1.5] mb-4">{section.intro}</p>}
          <div className="flex flex-col gap-3">
            {section.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-[13px] text-[#999] w-5 shrink-0">{i + 1}</span>
                <span className="text-[18px]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'promotool-widgets':
      return (
        <>
          <div className="w-full py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="min-h-[400px]"><OptimizationObjectivesWidget showButton={false} /></div>
            <div className="min-h-[400px]"><RevenueComparisonWidget /></div>
          </div>
          <div className="w-full py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="min-h-[400px]"><SelectionSummaryWidget showButton={false} /></div>
            <div className="min-h-[400px]"><RevenueOverviewWidget showFiltersButton={false} /></div>
          </div>
        </>
      );

    case 'uikit':
      return (
        <div className="w-full py-4">
          <UIKitSection />
        </div>
      );

    default:
      return null;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function CasePageContent({ project }: { project: Project }) {
  useEffect(() => {
    document.title = `${project.title} — Carlos Filipe`;
    window.scrollTo(0, 0);
  }, [project.title]);

  const hasPrototype = !!project.prototypeUrl;
  const isBlue = project.prototypeBg === '#295BF2';

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col font-sans text-[#111]">
      {/* Header */}
      <header className="flex items-center px-6 py-4 max-w-[1400px] w-full mx-auto relative">
        <div className="hidden md:flex flex-[1_0_0] items-center justify-between min-w-px relative w-full">
          <a href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <img src="/carlos.jpeg" alt="carlos filipe" className="w-12 h-12 rounded-full object-cover" />
            <div className="font-bold text-[18px] tracking-[-0.18px] whitespace-nowrap leading-[1.1] flex flex-col">
              <span>carlos</span><span>filipe</span>
            </div>
          </a>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="/" className="text-[18px] hover:opacity-70 transition-opacity">work</a>
          </div>
          <span className="text-[18px] hover:opacity-70 transition-opacity cursor-pointer">about me</span>
        </div>
        <div className="flex md:hidden items-center justify-between w-full">
          <a href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <img src="/carlos.jpeg" alt="carlos filipe" className="w-10 h-10 rounded-full object-cover" />
            <div className="font-bold text-[16px] whitespace-nowrap leading-[1.1] flex flex-col">
              <span>carlos</span><span>filipe</span>
            </div>
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="text-[16px] hover:opacity-70 transition-opacity">work</a>
            <span className="text-[16px] hover:opacity-70 transition-opacity cursor-pointer">about me</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center text-[#111] bg-[#fafafa]">
          <div className="w-full max-w-[1400px] px-6 pb-20">
            {/* Case header */}
            <header className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] items-center gap-8 pt-[96px] pb-[48px]">
              <h1 className="text-[clamp(44px,7.5vw,56px)] font-semibold leading-[1.14] tracking-[-0.02em] lowercase">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-x-[46px] gap-y-5 justify-start lg:justify-end lowercase">
                <div className="flex min-w-[112px] flex-col gap-1">
                  <span className="text-[14px] text-[#737882]">company</span>
                  <span className="text-[18px]">{project.company}</span>
                </div>
                <div className="flex min-w-[112px] flex-col gap-1">
                  <span className="text-[14px] text-[#737882]">role</span>
                  <span className="text-[18px]">{project.role}</span>
                </div>
                {project.year && (
                  <div className="flex min-w-[112px] flex-col gap-1">
                    <span className="text-[14px] text-[#737882]">year</span>
                    <span className="text-[18px]">{project.year}</span>
                  </div>
                )}
              </div>
            </header>

            {/* Sections */}
            <div className="w-full border-y border-[#eceef4] py-6 flex flex-col gap-6">
              {project.sections.map((section, i) => (
                <SectionRenderer key={i} section={section} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1400px] mx-auto px-6 py-10 mt-auto">
        <div className="border-t border-[#eceef4] pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav className="flex items-center gap-6 text-[18px]">
            <a href="/" className="hover:opacity-70 transition-opacity">home</a>
            <a href="/" className="hover:opacity-70 transition-opacity">work</a>
            <span className="hover:opacity-70 transition-opacity cursor-pointer">about</span>
          </nav>
          <p className="text-[18px] opacity-80">© 2026 carlos filipe. all rights reserved</p>
        </div>
      </footer>

      {/* Floating prototype button */}
      {hasPrototype && (
        <div className="fixed bottom-8 right-8 z-[100] animate-[bounce_2s_infinite]">
          <a
            href={project.prototypeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3.5 text-white rounded-full shadow-2xl hover:-translate-y-1 transition-all duration-300 font-semibold text-[15px] group"
            style={{ background: project.prototypeBg ?? '#111' }}
          >
            {isBlue
              ? <Play size={18} className="fill-white group-hover:scale-110 transition-transform" />
              : <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
            }
            {project.prototypeLabel ?? 'View Prototype'}
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Route wrapper (with optional password gate) ──────────────────────────────

export default function CasePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [projects] = useState(() => loadProjects());

  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    if (!project) navigate('/', { replace: true });
  }, [project, navigate]);

  if (!project) return null;

  if (project.isProtected && project.password) {
    return (
      <PasswordGate password={project.password}>
        <CasePageContent project={project} />
      </PasswordGate>
    );
  }

  return <CasePageContent project={project} />;
}
