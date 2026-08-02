import { useState, useEffect } from 'react';
import {
  Plus, Pencil, Trash2, Download, X, Check,
  ChevronUp, ChevronDown, Lock, Eye, EyeOff, Copy, Loader2,
} from 'lucide-react';
import { defaultProjects, type Project, type Section } from '../data/projects';
import {
  fetchProjects, apiCreateProject, apiUpdateProject,
  apiDeleteProject, apiSeedProjects,
} from '../lib/api';

// ─── Admin password ───────────────────────────────────────────────────────────
const ADMIN_CLIENT_PASSWORD = 'admin1234';
const ADMIN_SESSION_KEY = 'portfolio_admin_pw';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function newProject(): Project {
  return {
    slug: '',
    title: '',
    description: '',
    company: '',
    role: '',
    year: new Date().getFullYear().toString(),
    coverImage: '',
    coverBg: '#e8eaf0',
    isProtected: false,
    password: '',
    prototypeUrl: '',
    prototypeLabel: 'View Prototype',
    prototypeBg: '#111111',
    sections: [],
  };
}

function newSection(type: Section['type']): Section {
  switch (type) {
    case 'text': return { type, heading: '', paragraphs: [''] };
    case 'image-full': return { type, src: '', alt: '', bg: '#d9d9d9' };
    case 'image-grid': return { type, images: [{ src: '', alt: '', bg: '#f0f0f0' }, { src: '', alt: '', bg: '#f0f0f0' }] };
    case 'deliverables': return { type, items: [''] };
    case 'promotool-widgets': return { type };
    case 'uikit': return { type };
  }
}

// ─── Section editor ───────────────────────────────────────────────────────────
function SectionEditor({ section, idx, total, onChange, onRemove, onMove }: {
  section: Section; idx: number; total: number;
  onChange: (s: Section) => void; onRemove: () => void; onMove: (dir: -1 | 1) => void;
}) {
  const inputCls = 'w-full border border-[#ddd] rounded-lg px-3 py-2 text-[14px] outline-none focus:border-[#111] bg-white';
  const labelCls = 'text-[12px] text-[#777] mb-1 block';

  const header = (
    <div className="flex items-center justify-between mb-3">
      <span className="text-[12px] font-medium text-[#444] uppercase tracking-wide">{section.type}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => onMove(-1)} disabled={idx === 0} className="p-1 text-[#aaa] hover:text-[#111] disabled:opacity-30 transition-colors">
          <ChevronUp size={14} />
        </button>
        <button onClick={() => onMove(1)} disabled={idx === total - 1} className="p-1 text-[#aaa] hover:text-[#111] disabled:opacity-30 transition-colors">
          <ChevronDown size={14} />
        </button>
        <button onClick={onRemove} className="p-1 text-red-400 hover:text-red-600 transition-colors ml-1">
          <X size={14} />
        </button>
      </div>
    </div>
  );

  if (section.type === 'promotool-widgets' || section.type === 'uikit') {
    return (
      <div className="border border-[#eee] rounded-xl p-4 bg-white">
        {header}
        <p className="text-[13px] text-[#999]">Special section — no editable fields.</p>
      </div>
    );
  }

  if (section.type === 'text') {
    return (
      <div className="border border-[#eee] rounded-xl p-4 bg-white flex flex-col gap-3">
        {header}
        <div>
          <label className={labelCls}>Heading</label>
          <input className={inputCls} value={section.heading} onChange={e => onChange({ ...section, heading: e.target.value })} />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelCls}>Paragraphs</label>
          {section.paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2">
              <textarea className={`${inputCls} resize-none`} rows={3} value={p}
                onChange={e => { const ps = [...section.paragraphs]; ps[i] = e.target.value; onChange({ ...section, paragraphs: ps }); }}
              />
              <button onClick={() => onChange({ ...section, paragraphs: section.paragraphs.filter((_, j) => j !== i) })}
                className="text-red-400 hover:text-red-600 shrink-0 self-start pt-2">
                <X size={14} />
              </button>
            </div>
          ))}
          <button onClick={() => onChange({ ...section, paragraphs: [...section.paragraphs, ''] })}
            className="text-[13px] text-[#999] hover:text-[#111] text-left transition-colors">
            + Add paragraph
          </button>
        </div>
      </div>
    );
  }

  if (section.type === 'image-full') {
    return (
      <div className="border border-[#eee] rounded-xl p-4 bg-white flex flex-col gap-3">
        {header}
        <div><label className={labelCls}>Image path (e.g. /premmia/capa.png)</label>
          <input className={inputCls} value={section.src} onChange={e => onChange({ ...section, src: e.target.value })} />
        </div>
        <div><label className={labelCls}>Alt text</label>
          <input className={inputCls} value={section.alt} onChange={e => onChange({ ...section, alt: e.target.value })} />
        </div>
        <div><label className={labelCls}>Background color</label>
          <div className="flex items-center gap-2">
            <input type="color" value={section.bg ?? '#d9d9d9'} onChange={e => onChange({ ...section, bg: e.target.value })} className="w-8 h-8 rounded cursor-pointer border border-[#ddd]" />
            <input className={`${inputCls} flex-1`} value={section.bg ?? '#d9d9d9'} onChange={e => onChange({ ...section, bg: e.target.value })} />
          </div>
        </div>
        {section.src && <img src={section.src} alt={section.alt} className="w-full max-h-[160px] object-cover rounded-lg mt-1" />}
      </div>
    );
  }

  if (section.type === 'image-grid') {
    return (
      <div className="border border-[#eee] rounded-xl p-4 bg-white flex flex-col gap-3">
        {header}
        {section.images.map((img, i) => (
          <div key={i} className="flex flex-col gap-2 border border-[#f0f0f0] rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#999]">Image {i + 1}</span>
              {section.images.length > 1 && (
                <button onClick={() => onChange({ ...section, images: section.images.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600">
                  <X size={12} />
                </button>
              )}
            </div>
            <input className={inputCls} placeholder="Path (e.g. /premmia/img.webp)" value={img.src} onChange={e => {
              const imgs = [...section.images]; imgs[i] = { ...imgs[i], src: e.target.value };
              onChange({ ...section, images: imgs });
            }} />
            <input className={inputCls} placeholder="Alt text" value={img.alt} onChange={e => {
              const imgs = [...section.images]; imgs[i] = { ...imgs[i], alt: e.target.value };
              onChange({ ...section, images: imgs });
            }} />
            <div className="flex items-center gap-2">
              <input type="color" value={img.bg ?? '#f0f0f0'} onChange={e => {
                const imgs = [...section.images]; imgs[i] = { ...imgs[i], bg: e.target.value };
                onChange({ ...section, images: imgs });
              }} className="w-8 h-8 rounded cursor-pointer border border-[#ddd]" />
              <span className="text-[12px] text-[#999]">Background</span>
            </div>
          </div>
        ))}
        <button onClick={() => onChange({ ...section, images: [...section.images, { src: '', alt: '', bg: '#f0f0f0' }] })}
          className="text-[13px] text-[#999] hover:text-[#111] text-left transition-colors">
          + Add image
        </button>
      </div>
    );
  }

  if (section.type === 'deliverables') {
    return (
      <div className="border border-[#eee] rounded-xl p-4 bg-white flex flex-col gap-3">
        {header}
        {section.items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-[12px] text-[#999] w-4 shrink-0">{i + 1}</span>
            <input className={`${inputCls} flex-1`} value={item} onChange={e => {
              const items = [...section.items]; items[i] = e.target.value;
              onChange({ ...section, items });
            }} />
            <button onClick={() => onChange({ ...section, items: section.items.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600 shrink-0">
              <X size={14} />
            </button>
          </div>
        ))}
        <button onClick={() => onChange({ ...section, items: [...section.items, ''] })}
          className="text-[13px] text-[#999] hover:text-[#111] text-left transition-colors">
          + Add item
        </button>
      </div>
    );
  }

  return null;
}

// ─── Project Editor ────────────────────────────────────────────────────────────
function ProjectEditor({ project, onSave, onCancel, saving }: {
  project: Project; onSave: (p: Project) => void; onCancel: () => void; saving: boolean;
}) {
  const [draft, setDraft] = useState<Project>(project);
  const inputCls = 'w-full border border-[#ddd] rounded-lg px-3 py-2 text-[14px] outline-none focus:border-[#111] bg-white';
  const labelCls = 'text-[12px] text-[#777] mb-1 block';
  const set = (partial: Partial<Project>) => setDraft(d => ({ ...d, ...partial }));

  const addSection = (type: Section['type']) => setDraft(d => ({ ...d, sections: [...d.sections, newSection(type)] }));
  const updateSection = (i: number, s: Section) => setDraft(d => { const ss = [...d.sections]; ss[i] = s; return { ...d, sections: ss }; });
  const removeSection = (i: number) => setDraft(d => ({ ...d, sections: d.sections.filter((_, j) => j !== i) }));
  const moveSection = (i: number, dir: -1 | 1) => setDraft(d => {
    const ss = [...d.sections]; const j = i + dir;
    if (j < 0 || j >= ss.length) return d;
    [ss[i], ss[j]] = [ss[j], ss[i]];
    return { ...d, sections: ss };
  });

  const sectionTypes: Section['type'][] = ['text', 'image-full', 'image-grid', 'deliverables', 'promotool-widgets', 'uikit'];

  return (
    <div className="fixed inset-0 bg-[#fafafa] z-50 overflow-y-auto">
      <div className="max-w-[720px] mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[20px] font-semibold text-[#111]">{draft.title || 'New Project'}</h2>
          <div className="flex items-center gap-3">
            <button onClick={onCancel} disabled={saving} className="px-4 py-2 text-[14px] text-[#777] hover:text-[#111] transition-colors disabled:opacity-50">Cancel</button>
            <button onClick={() => onSave(draft)} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#111] text-white text-[14px] rounded-lg hover:bg-[#333] transition-colors disabled:opacity-60">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>

        {/* Core fields */}
        <div className="bg-white border border-[#eee] rounded-xl p-5 flex flex-col gap-4 mb-6">
          <h3 className="text-[13px] font-medium text-[#444] uppercase tracking-wide">Project Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Title</label>
              <input className={inputCls} value={draft.title} onChange={e => set({ title: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Slug (URL path)</label>
              <input className={inputCls} value={draft.slug} placeholder="e.g. my-project"
                onChange={e => set({ slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} />
            </div>
            <div>
              <label className={labelCls}>Year</label>
              <input className={inputCls} value={draft.year} onChange={e => set({ year: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Company</label>
              <input className={inputCls} value={draft.company} onChange={e => set({ company: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Role</label>
              <input className={inputCls} value={draft.role} onChange={e => set({ role: e.target.value })} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Description (shown on home card)</label>
              <textarea className={`${inputCls} resize-none`} rows={3} value={draft.description}
                onChange={e => set({ description: e.target.value })} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Cover image path (e.g. /portfolio-1.png)</label>
              <input className={inputCls} value={draft.coverImage} onChange={e => set({ coverImage: e.target.value })} />
              {draft.coverImage && <img src={draft.coverImage} className="w-full h-24 object-cover rounded-lg mt-2" />}
            </div>
            <div>
              <label className={labelCls}>Cover background color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={draft.coverBg ?? '#e8eaf0'} onChange={e => set({ coverBg: e.target.value })} className="w-8 h-8 rounded cursor-pointer border border-[#ddd]" />
                <input className={`${inputCls} flex-1`} value={draft.coverBg ?? ''} onChange={e => set({ coverBg: e.target.value })} />
              </div>
            </div>
          </div>
        </div>

        {/* Prototype button */}
        <div className="bg-white border border-[#eee] rounded-xl p-5 flex flex-col gap-4 mb-6">
          <h3 className="text-[13px] font-medium text-[#444] uppercase tracking-wide">Prototype Button (floating)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>URL (leave empty to hide button)</label>
              <input className={inputCls} value={draft.prototypeUrl ?? ''} onChange={e => set({ prototypeUrl: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Button label</label>
              <input className={inputCls} value={draft.prototypeLabel ?? ''} onChange={e => set({ prototypeLabel: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Button color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={draft.prototypeBg ?? '#111111'} onChange={e => set({ prototypeBg: e.target.value })} className="w-8 h-8 rounded cursor-pointer border border-[#ddd]" />
                <input className={`${inputCls} flex-1`} value={draft.prototypeBg ?? ''} onChange={e => set({ prototypeBg: e.target.value })} />
              </div>
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="bg-white border border-[#eee] rounded-xl p-5 flex flex-col gap-4 mb-6">
          <h3 className="text-[13px] font-medium text-[#444] uppercase tracking-wide">Access</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => set({ isProtected: !draft.isProtected })}
              className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${draft.isProtected ? 'bg-[#111]' : 'bg-[#ccc]'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${draft.isProtected ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <span className="text-[14px] text-[#444]">Password protected</span>
          </label>
          {draft.isProtected && (
            <div>
              <label className={labelCls}>Password</label>
              <input className={inputCls} value={draft.password ?? ''} onChange={e => set({ password: e.target.value })} />
            </div>
          )}
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-4 mb-6">
          <h3 className="text-[13px] font-medium text-[#444] uppercase tracking-wide">Sections</h3>
          {draft.sections.length === 0 && <p className="text-[14px] text-[#999]">No sections yet. Add one below.</p>}
          {draft.sections.map((s, i) => (
            <SectionEditor key={i} section={s} idx={i} total={draft.sections.length}
              onChange={ns => updateSection(i, ns)} onRemove={() => removeSection(i)} onMove={dir => moveSection(i, dir)} />
          ))}
          <div className="flex flex-wrap gap-2">
            {sectionTypes.map(t => (
              <button key={t} onClick={() => addSection(t)}
                className="px-3 py-1.5 border border-[#ddd] rounded-lg text-[13px] text-[#555] hover:border-[#111] hover:text-[#111] transition-colors">
                + {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin login ──────────────────────────────────────────────────────────────
function AdminLogin({ onUnlock }: { onUnlock: (pw: string) => void }) {
  const [input, setInput] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ADMIN_CLIENT_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, input);
      onUnlock(input);
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 2000);
    }
  };

  const inputCls = `w-full px-4 py-3.5 pr-12 rounded-xl border text-[16px] outline-none transition-all bg-white ${error ? 'border-red-400 text-red-500' : 'border-[#ddd] focus:border-[#111]'}`;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-6">
      <div className="absolute top-6 left-6">
        <a href="/" className="text-[16px] text-[#737882] hover:text-[#111] transition-colors">← back</a>
      </div>
      <div className="w-full max-w-[360px] flex flex-col items-center gap-8">
        <div className="w-14 h-14 rounded-2xl bg-[#111] flex items-center justify-center">
          <Lock size={22} className="text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-[22px] font-semibold text-[#111]">Admin Panel</h1>
          <p className="text-[15px] text-[#737882] mt-1">Enter your admin password</p>
        </div>
        <form onSubmit={submit} className="w-full flex flex-col gap-3">
          <div className="relative">
            <input type={show ? 'text' : 'password'} value={input} onChange={e => { setInput(e.target.value); setError(false); }}
              className={inputCls} placeholder="Admin password" autoFocus />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#555]">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className="text-[14px] text-red-500 text-center">Incorrect password.</p>}
          <button type="submit" className="w-full py-3.5 bg-[#111] text-white rounded-xl text-[16px] font-medium hover:bg-[#333] transition-colors">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [adminPw, setAdminPw] = useState<string | null>(() => sessionStorage.getItem(ADMIN_SESSION_KEY));
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [seeding, setSeeding] = useState(false);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const reload = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (e) {
      showToast('Failed to load projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminPw) reload();
  }, [adminPw]);

  const handleSave = async (p: Project) => {
    if (!adminPw) return;
    setSaving(true);
    try {
      if (isNew) {
        await apiCreateProject(p, adminPw);
      } else {
        await apiUpdateProject(editing!.slug, p, adminPw);
      }
      await reload();
      setEditing(null);
      setIsNew(false);
      showToast('Project saved ✓');
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!adminPw) return;
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    try {
      await apiDeleteProject(slug, adminPw);
      await reload();
      showToast('Project deleted');
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'Delete failed', 'error');
    }
  };

  const handleDuplicate = async (projectToCopy: Project) => {
    if (!adminPw) return;
    const duplicated: Project = {
      ...projectToCopy,
      slug: `${projectToCopy.slug}-copy`,
      title: `${projectToCopy.title} (Copy)`,
      sections: JSON.parse(JSON.stringify(projectToCopy.sections)),
    };
    try {
      await apiCreateProject(duplicated, adminPw);
      await reload();
      showToast('Project duplicated ✓');
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'Duplicate failed', 'error');
    }
  };

  const handleSeed = async () => {
    if (!adminPw) return;
    if (!confirm('This will overwrite the database with the default projects. Continue?')) return;
    setSeeding(true);
    try {
      await apiSeedProjects(defaultProjects, adminPw);
      await reload();
      showToast('Database seeded ✓');
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'Seed failed', 'error');
    } finally {
      setSeeding(false);
    }
  };

  if (!adminPw) return <AdminLogin onUnlock={setAdminPw} />;

  if (editing) {
    return (
      <ProjectEditor
        project={editing}
        onSave={handleSave}
        onCancel={() => { setEditing(null); setIsNew(false); }}
        saving={saving}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111]">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl text-[14px] font-medium shadow-lg transition-all
          ${toast.type === 'success' ? 'bg-[#111] text-white' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      <div className="max-w-[720px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <a href="/" className="text-[14px] text-[#999] hover:text-[#111] transition-colors">← portfolio</a>
            <h1 className="text-[24px] font-semibold mt-1">Portfolio Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={reload} disabled={loading}
              className="flex items-center gap-1.5 px-3 py-2 border border-[#ddd] rounded-lg text-[13px] text-[#555] hover:border-[#111] hover:text-[#111] transition-colors disabled:opacity-50">
              {loading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
              {loading ? 'Loading…' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* DB status */}
        {!loading && projects.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-[14px] font-medium text-amber-800">Database is empty</p>
              <p className="text-[13px] text-amber-600">Seed it with the default projects to get started.</p>
            </div>
            <button onClick={handleSeed} disabled={seeding}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 text-white text-[13px] rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50">
              {seeding ? <Loader2 size={13} className="animate-spin" /> : null}
              {seeding ? 'Seeding…' : 'Seed Database'}
            </button>
          </div>
        )}

        {/* Project list */}
        <div className="flex flex-col gap-3 mb-6">
          {loading && projects.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={20} className="animate-spin text-[#999]" />
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.slug} className="flex items-center justify-between bg-white border border-[#eee] rounded-xl px-4 py-3.5">
                <div className="flex items-center gap-3">
                  {project.coverImage && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0" style={{ background: project.coverBg }}>
                      <img src={project.coverImage} className="w-full h-full object-cover" alt="" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[15px]">{project.title}</span>
                      {project.isProtected && <Lock size={11} className="text-[#aaa]" />}
                    </div>
                    <span className="text-[13px] text-[#999]">/{project.slug} · {project.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <a href={`/${project.slug}`} target="_blank" rel="noopener noreferrer" title="Preview"
                    className="p-2 text-[#aaa] hover:text-[#111] transition-colors">
                    <Eye size={15} />
                  </a>
                  <button onClick={() => { setEditing(project); setIsNew(false); }} title="Edit"
                    className="p-2 text-[#aaa] hover:text-[#111] transition-colors">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDuplicate(project)} title="Duplicate"
                    className="p-2 text-[#aaa] hover:text-[#111] transition-colors">
                    <Copy size={15} />
                  </button>
                  <button onClick={() => handleDelete(project.slug)} title="Delete"
                    className="p-2 text-[#aaa] hover:text-red-500 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          onClick={() => { setEditing(newProject()); setIsNew(true); }}
          className="flex items-center gap-2 px-4 py-3 bg-[#111] text-white rounded-xl text-[14px] font-medium hover:bg-[#333] transition-colors w-full justify-center"
        >
          <Plus size={16} /> New Project
        </button>

        <p className="text-[12px] text-[#bbb] text-center mt-8">
          Changes are saved directly to the database and visible to everyone instantly.
        </p>
      </div>
    </div>
  );
}
