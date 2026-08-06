import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ExternalLink, Pencil, Trash2, Copy, LogOut, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import type { Project } from '../data/projects';

export default function Dashboard() {
  const { profile, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    document.title = 'Dashboard — Showfolio';
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase
      .from('projects')
      .select('data, sort_order')
      .eq('user_id', user.id)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setProjects((data ?? []).map(r => r.data as Project));
        setLoading(false);
      });
  }, [user]);

  const portfolioUrl = profile ? `/p/${profile.username}` : '/';
  const isFree = profile?.plan === 'free';
  const canAddMore = !isFree || projects.length < 2;

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    await supabase.from('projects').delete().eq('slug', slug).eq('user_id', user!.id);
    setProjects(ps => ps.filter(p => p.slug !== slug));
    showToast('Project deleted');
  };

  const handleDuplicate = async (p: Project) => {
    if (!canAddMore) {
      showToast('Upgrade to Pro to add more projects');
      return;
    }
    const copy: Project = { ...p, slug: `${p.slug}-copy`, title: `${p.title} (Copy)`, sections: JSON.parse(JSON.stringify(p.sections)) };
    const maxOrder = projects.length;
    await supabase.from('projects').insert({ slug: copy.slug, data: copy, sort_order: maxOrder, user_id: user!.id });
    setProjects(ps => [...ps, copy]);
    showToast('Project duplicated ✓');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111]">
      {/* Header */}
      <header className="border-b border-[#eee] bg-white px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <a href="/" className="font-bold text-[18px] tracking-[-0.02em] text-[#111] hover:opacity-70 transition-opacity">
            showfolio
          </a>
          <div className="flex items-center gap-3">
            {/* Plan badge */}
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${
              isFree ? 'bg-[#f0f0f0] text-[#777]' : 'bg-[#111] text-white'
            }`}>
              {profile?.plan ?? 'free'}
            </span>
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-[13px] border border-[#e0e0e0] rounded-lg hover:border-[#111] transition-colors"
            >
              <ExternalLink size={13} />
              View portfolio
            </a>
            <button
              onClick={handleSignOut}
              className="p-2 text-[#aaa] hover:text-[#111] transition-colors"
              title="Sign out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-[28px] font-semibold tracking-[-0.02em]">
              {profile?.display_name ?? profile?.username ?? 'My Portfolio'}
            </h1>
            <p className="text-[#777] text-[15px] mt-1">
              {portfolioUrl.startsWith('/') ? `showfolio.com${portfolioUrl}` : portfolioUrl}
            </p>
          </div>

          <button
            onClick={() => {
              if (!canAddMore) { showToast('Upgrade to Pro to add more projects'); return; }
              navigate('/admin?new=1');
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#111] text-white rounded-xl text-[14px] font-medium hover:bg-[#333] transition-colors"
          >
            <Plus size={16} />
            New project
          </button>
        </div>

        {/* Plan upgrade banner */}
        {isFree && projects.length >= 2 && (
          <div className="mb-6 flex items-center justify-between bg-[#111] text-white rounded-2xl px-6 py-4">
            <div>
              <p className="font-medium text-[15px]">You've reached the Free plan limit (2 projects)</p>
              <p className="text-[#aaa] text-[13px] mt-0.5">Upgrade to Pro for unlimited projects, analytics and more</p>
            </div>
            <button className="flex-shrink-0 px-4 py-2 bg-white text-[#111] rounded-lg text-[13px] font-semibold hover:bg-[#f0f0f0] transition-colors">
              Upgrade — R$29/mo
            </button>
          </div>
        )}

        {/* Projects grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={24} className="animate-spin text-[#bbb]" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#f0f0f0] flex items-center justify-center">
              <Plus size={24} className="text-[#aaa]" />
            </div>
            <div>
              <p className="font-medium text-[16px]">No projects yet</p>
              <p className="text-[#aaa] text-[14px] mt-1">Create your first case study to get started</p>
            </div>
            <button
              onClick={() => navigate('/admin?new=1')}
              className="px-5 py-2.5 bg-[#111] text-white rounded-xl text-[14px] font-medium hover:bg-[#333] transition-colors"
            >
              Create first project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map(project => (
              <div
                key={project.slug}
                className="bg-white border border-[#eee] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Cover */}
                <a href={`/p/${profile?.username}/${project.slug}`} target="_blank" rel="noopener noreferrer">
                  <div
                    className="w-full aspect-[16/9] overflow-hidden"
                    style={{ background: project.coverBg ?? '#e8eaf0' }}
                  >
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#bbb] text-[13px]">No cover image</div>
                    )}
                  </div>
                </a>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-medium text-[15px] truncate">{project.title}</h3>
                      <p className="text-[13px] text-[#999] mt-0.5">{project.company} · {project.year}</p>
                    </div>
                    {project.isProtected && <Lock size={14} className="text-[#aaa] shrink-0 mt-0.5" />}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#f0f0f0]">
                    <button
                      onClick={() => navigate(`/admin?slug=${project.slug}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] border border-[#e0e0e0] rounded-lg hover:border-[#111] transition-colors"
                    >
                      <Pencil size={13} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDuplicate(project)}
                      className="p-1.5 text-[#aaa] hover:text-[#111] transition-colors"
                      title="Duplicate"
                    >
                      <Copy size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.slug)}
                      className="p-1.5 text-[#aaa] hover:text-red-500 transition-colors ml-auto"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#111] text-white px-5 py-3 rounded-xl text-[14px] shadow-xl animate-fade-in z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
