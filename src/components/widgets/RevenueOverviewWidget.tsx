import { TrendingUp, SlidersHorizontal, BarChart3 } from 'lucide-react';
import { ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const forecastChartData = [
  { cycle: '202308', Baseline: 25.79, Incremental: 30.81 },
  { cycle: '202309', Baseline: 7.3, Incremental: 21.55 },
  { cycle: '202310', Baseline: 2.3, Incremental: 7.3 },
];

interface Props {
  onFiltersClick?: () => void;
  showFiltersButton?: boolean;
}

export default function RevenueOverviewWidget({ onFiltersClick, showFiltersButton = true }: Props) {
  return (
    <div className="bg-white/90 rounded-2xl border border-slate-200 p-8 shadow-xl h-full flex flex-col">
      {/* Chart Header (Reference Style) */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-navy/60 font-semibold text-sm">
            <BarChart3 size={16} />
            <span>Revenue Overview</span>
          </div>
          <div className="text-4xl font-black text-brand-navy tracking-tight">R$ 106.48M</div>
          <div className="flex items-center gap-x-2 text-xs">
            <span className="inline-flex items-center gap-x-1 py-0.5 px-1.5 rounded-md bg-emerald-100 text-emerald-700 font-bold">
              <TrendingUp size={12} strokeWidth={3} /> 15.8%
            </span>
            <span className="text-brand-navy/60 font-medium">+ $ 14.35M incremental</span>
          </div>
        </div>

        {showFiltersButton && (
          <div className="flex items-center gap-x-2">
            <button 
              onClick={onFiltersClick}
              className="hidden sm:inline-flex items-center gap-x-2 py-2 px-4 rounded-full text-[13px] font-medium bg-white border border-slate-300 text-slate-700 hover:border-slate-800 transition-colors shadow-sm"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-[300px] w-full mt-4 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart layout="vertical" data={forecastChartData} margin={{ top: 20, right: 20, left: 20, bottom: 0 }} barSize={60}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="cycle" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
              itemStyle={{ fontSize: '12px', fontWeight: 600, color: '#ffffff' }}
              labelStyle={{ color: '#ffffff', fontWeight: 700, marginBottom: '4px' }}
            />
            {/* Background Areas to connect the bars visually */}
            <Area type="linear" dataKey="Baseline" stackId="bg" fill="#022840" stroke="none" fillOpacity={0.06} />
            <Area type="linear" dataKey="Incremental" stackId="bg" fill="#295BF2" stroke="none" fillOpacity={0.06} />

            {/* Foreground Bars (Rounded Pills) */}
            <Bar dataKey="Baseline" stackId="fg" fill="#022840" stroke="#ffffff" strokeWidth={4} radius={[6, 6, 6, 6]} />
            <Bar dataKey="Incremental" stackId="fg" fill="#295BF2" stroke="#ffffff" strokeWidth={4} radius={[6, 6, 6, 6]} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 pt-4">
        {[
          { name: 'Baseline', color: '#022840' },
          { name: 'Incremental', color: '#295BF2' },
        ].map(item => (
          <div key={item.name} className="flex items-center gap-x-2">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></span>
            <span className="text-xs font-bold text-brand-navy/60">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
