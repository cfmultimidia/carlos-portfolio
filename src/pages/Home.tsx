import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { loadProjects, type Project } from '../data/projects';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <>
      {index > 0 && <div className="w-full h-px bg-[#e8e8e8] my-6" />}
      <a href={`/${project.slug}`} className="group block w-full py-6">
        <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${!isEven ? 'md:direction-rtl' : ''}`}>
          {/* Text */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-[22px] md:text-[26px] font-medium leading-[1.2] lowercase group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h2>
                <ArrowUpRight
                  size={22}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0 -translate-y-1 group-hover:translate-y-0"
                />
              </div>
              <p className="text-[16px] md:text-[18px] leading-[1.55] text-[#444] max-w-[420px]">
                {project.description}
              </p>
            </div>
            <div className="flex gap-8 mt-2">
              {project.company && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] leading-[1.5] text-[#999] lowercase">company</span>
                  <span className="text-[16px] leading-[1.5] lowercase">{project.company}</span>
                </div>
              )}
              {project.role && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] leading-[1.5] text-[#999] lowercase">role</span>
                  <span className="text-[16px] leading-[1.5] lowercase">{project.role}</span>
                </div>
              )}
              {project.year && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] leading-[1.5] text-[#999] lowercase">year</span>
                  <span className="text-[16px] leading-[1.5] lowercase">{project.year}</span>
                </div>
              )}
            </div>
          </div>
          {/* Cover image */}
          <div
            className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#eceef4] group-hover:scale-[1.01] transition-transform duration-500"
            style={{ background: project.coverBg ?? '#e8eaf0' }}
          >
            <img
              src={project.coverImage}
              alt={`${project.title} interface`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </a>
    </>
  );
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    document.title = 'Carlos Filipe — UX/UI Designer';
    setProjects(loadProjects());
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col font-sans text-[#111]">
      {/* Header */}
      <header className="flex items-center px-6 py-5 max-w-[1400px] w-full mx-auto relative">
        <div className="hidden md:flex flex-[1_0_0] items-center justify-between min-w-px relative w-full">
          <div className="flex items-center gap-3">
            <img src="/carlos.jpeg" alt="carlos filipe" className="w-12 h-12 rounded-full object-cover" />
            <div className="font-bold text-[18px] tracking-[-0.18px] whitespace-nowrap leading-[1.1] flex flex-col justify-center">
              <span>carlos</span>
              <span>filipe</span>
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="#work" className="text-[18px] leading-[1.5] hover:opacity-70 transition-opacity whitespace-nowrap">
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
          <div className="flex items-center gap-3">
            <img src="/carlos.jpeg" alt="carlos filipe" className="w-10 h-10 rounded-full object-cover" />
            <div className="font-bold text-[16px] tracking-[-0.16px] whitespace-nowrap leading-[1.1] flex flex-col justify-center">
              <span>carlos</span>
              <span>filipe</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#work" className="text-[16px] hover:opacity-70 transition-opacity">work</a>
            <span className="text-[16px] hover:opacity-70 transition-opacity cursor-pointer">about me</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          {/* Hero */}
          <div className="pt-10 pb-8 md:pt-16 md:pb-10">
            <h1 className="text-[clamp(52px,10vw,120px)] font-semibold leading-[0.92] tracking-[-0.03em] lowercase text-[#111]">
              selected work
            </h1>
          </div>

          <div className="w-full h-px bg-[#e0e0e0]" />

          {/* Projects */}
          <section id="work" className="w-full py-12 md:py-16">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1400px] mx-auto px-6 py-10 mt-auto">
        <div className="border-t border-[#eceef4] pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav className="flex items-center gap-6 text-[18px]">
            <a href="#work" className="hover:opacity-70 transition-opacity cursor-pointer">work</a>
            <span className="hover:opacity-70 transition-opacity cursor-pointer">about</span>
          </nav>
          <p className="text-[18px] text-[#111] opacity-80">© 2026 carlos filipe. all rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
