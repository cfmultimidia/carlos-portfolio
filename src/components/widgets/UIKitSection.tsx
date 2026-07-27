import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Search, CheckCircle2, Play, Settings2 } from 'lucide-react';

const miniChartData = [
  { v: 62 }, { v: 68 }, { v: 66 }, { v: 72 }, { v: 74 }, { v: 80 },
  { v: 82 }, { v: 88 }, { v: 91 }, { v: 96 }, { v: 101 }, { v: 106 },
];

const colors = [
  { name: 'Navy', hex: '#022840', label: 'Text / Dark BG' },
  { name: 'Blue', hex: '#295BF2', label: 'Primary Action' },
  { name: 'Blue Light', hex: '#6D99F2', label: 'Secondary / Chart' },
  { name: 'Green', hex: '#668C3F', label: 'Volume / Accent' },
  { name: 'Emerald', hex: '#10b981', label: 'Positive Delta' },
  { name: 'Slate 100', hex: '#f1f5f9', label: 'Surface BG', border: true },
  { name: 'Slate 200', hex: '#e2e8f0', label: 'Border', border: true },
  { name: 'White', hex: '#ffffff', label: 'Card BG', border: true },
];

const radiusTokens = [
  { label: 'rounded-xl', px: '12px', use: 'Inner cards', style: 'rounded-xl' },
  { label: 'rounded-2xl', px: '16px', use: 'Main cards', style: 'rounded-2xl' },
  { label: 'rounded-3xl', px: '24px', use: 'BG sections', style: 'rounded-3xl' },
  { label: 'rounded-full', px: '999px', use: 'Pills / Avatars', style: 'rounded-full' },
];

const shadowTokens = [
  { label: 'shadow-sm', use: 'Subtle cards', class: 'shadow-sm' },
  { label: 'shadow-xl', use: 'Modals / Dropdowns', class: 'shadow-xl' },
  { label: 'shadow-2xl', use: 'Floating CTA', class: 'shadow-2xl' },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{children}</span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

export default function UIKitSection() {
  return (
    <div className="w-full rounded-[16px] border border-[#eceef4] bg-white overflow-hidden">
      <div className="p-8 md:p-12 space-y-12">

        {/* ── 1. Color Palette ── */}
        <div>
          <SectionLabel>Color Palette</SectionLabel>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {colors.map((c) => (
              <div key={c.hex} className="flex flex-col gap-2">
                <div
                  className={`w-full aspect-square rounded-xl ${c.border ? 'border border-slate-200' : ''}`}
                  style={{ backgroundColor: c.hex }}
                />
                <div>
                  <p className="text-[10px] font-bold text-slate-500 leading-tight">{c.name}</p>
                  <p className="text-[10px] font-mono text-slate-400 leading-tight">{c.hex}</p>
                  <p className="text-[9px] text-slate-300 leading-tight mt-0.5">{c.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. Typography ── */}
        <div>
          <SectionLabel>Typography — Inter</SectionLabel>
          <div className="space-y-4 overflow-hidden">
            <div className="flex items-baseline gap-4 border-b border-slate-50 pb-4">
              <span className="w-20 text-[10px] text-slate-300 font-mono shrink-0">Display</span>
              <span className="text-4xl font-black text-[#022840] tracking-tight leading-none truncate">R$ 106.48M</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-slate-50 pb-4">
              <span className="w-20 text-[10px] text-slate-300 font-mono shrink-0">Heading</span>
              <span className="text-2xl font-bold text-[#022840] leading-none truncate">Promotool App</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-slate-50 pb-4">
              <span className="w-20 text-[10px] text-slate-300 font-mono shrink-0">Label</span>
              <span className="text-sm font-bold uppercase tracking-widest text-[#022840]/60">TOTAL REVENUE</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-slate-50 pb-4">
              <span className="w-20 text-[10px] text-slate-300 font-mono shrink-0">Body</span>
              <span className="text-sm font-medium text-[#022840]/80">Intelligent optimization for every promotional cycle.</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-20 text-[10px] text-slate-300 font-mono shrink-0">Caption</span>
              <span className="text-xs text-slate-400">Based on stock and list price · previous period</span>
            </div>
          </div>
        </div>

        {/* ── 3. Components ── */}
        <div>
          <SectionLabel>UI Components</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Buttons */}
            <div className="space-y-2">
              <p className="text-[10px] text-slate-300 font-mono mb-3">Buttons</p>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#295BF2] text-white rounded-xl text-sm font-bold hover:bg-[#295BF2]/90 transition-all active:scale-[0.98] w-full justify-center">
                <Play size={16} className="fill-white" /> Primary Button
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-[#295BF2] text-[#295BF2] rounded-xl text-sm font-bold hover:bg-[#295BF2]/5 transition-all active:scale-[0.98] w-full justify-center">
                <Settings2 size={16} /> Secondary Button
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-transparent text-[#022840] hover:bg-slate-100 rounded-xl text-sm font-bold transition-all active:scale-[0.98] w-full justify-center">
                Ghost Button
              </button>
            </div>

            {/* Badges & Tags */}
            <div className="space-y-2">
              <p className="text-[10px] text-slate-300 font-mono mb-3">Badges & Tags</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700">
                  <CheckCircle2 size={11} /> Active
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-red-50 text-red-600">
                  Inactive
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-[#295BF2]/10 text-[#295BF2]">
                  AI Plan
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-amber-50 text-amber-600">
                  Draft
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200/60 bg-emerald-50 text-emerald-700">
                  +15.8%
                </span>
              </div>

              <p className="text-[10px] text-slate-300 font-mono mt-4 mb-3">Avatar</p>
              <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="avatar" className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30 shadow" />
                <div className="w-10 h-10 rounded-full bg-[#295BF2] flex items-center justify-center text-white text-sm font-bold shadow">CS</div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-bold shadow-sm border border-slate-200">+4</div>
              </div>
            </div>

            {/* Input */}
            <div className="space-y-2">
              <p className="text-[10px] text-slate-300 font-mono mb-3">Inputs & Controls</p>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  readOnly
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-500 bg-white focus:outline-none focus:ring-2 focus:ring-[#295BF2]/30"
                />
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 border border-slate-200 rounded-xl bg-white">
                <span className="text-sm text-slate-500">Select cycle</span>
                <span className="text-slate-300 text-xs">▼</span>
              </div>
              {/* Toggle */}
              <div className="flex items-center gap-3 mt-2">
                <div className="w-11 h-6 bg-[#295BF2] rounded-full relative cursor-pointer shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow" />
                </div>
                <span className="text-sm text-slate-500 font-medium">With AI</span>
                <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-pointer ml-2">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow" />
                </div>
                <span className="text-sm text-slate-400 font-medium">Manual</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. Radius & Shadow Tokens ── */}
        <div>
          <SectionLabel>Border Radius & Shadows</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Radius */}
            <div>
              <p className="text-[10px] text-slate-300 font-mono mb-4">Border Radius</p>
              <div className="flex items-end gap-5 flex-wrap">
                {radiusTokens.map((r) => (
                  <div key={r.label} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-14 h-14 bg-[#295BF2]/15 border-2 border-[#295BF2]/30 ${r.style}`}
                    />
                    <div className="text-center">
                      <p className="text-[10px] font-mono font-bold text-slate-500">{r.px}</p>
                      <p className="text-[9px] text-slate-300">{r.use}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Shadows */}
            <div>
              <p className="text-[10px] text-slate-300 font-mono mb-4">Shadows</p>
              <div className="flex flex-col gap-3">
                {shadowTokens.map((s) => (
                  <div key={s.label} className="flex items-center gap-4">
                    <div className={`w-14 h-10 bg-white rounded-xl ${s.class} border border-slate-100 shrink-0`} />
                    <div>
                      <p className="text-[11px] font-mono font-bold text-slate-500">{s.label}</p>
                      <p className="text-[10px] text-slate-300">{s.use}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 5. Mini Chart Preview ── */}
        <div>
          <SectionLabel>Data Visualization</SectionLabel>
          <div className="bg-slate-50/80 rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Revenue · With AI vs Without AI</p>
                <p className="text-2xl font-black text-[#022840] mt-1 tracking-tight">R$ 106.48M</p>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-0.5 rounded bg-[#022840]/30 inline-block" />
                  <span className="text-slate-400 font-medium">Without AI</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-0.5 rounded bg-[#295BF2] inline-block" />
                  <span className="text-slate-500 font-medium">With AI</span>
                </div>
              </div>
            </div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={miniChartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                  <defs>
                    <linearGradient id="uikit-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#295BF2" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#295BF2" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#295BF2" strokeWidth={2} fill="url(#uikit-grad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
