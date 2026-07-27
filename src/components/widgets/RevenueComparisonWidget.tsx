import { BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueComparisonData = [
  { month: 'Jan', semIA: 62, comIA: 62 },
  { month: 'Feb', semIA: 65, comIA: 68 },
  { month: 'Mar', semIA: 59, comIA: 66 },
  { month: 'Apr', semIA: 63, comIA: 72 },
  { month: 'May', semIA: 61, comIA: 74 },
  { month: 'Jun', semIA: 67, comIA: 80 },
  { month: 'Jul', semIA: 64, comIA: 82 },
  { month: 'Aug', semIA: 68, comIA: 88 },
  { month: 'Sep', semIA: 66, comIA: 91 },
  { month: 'Oct', semIA: 70, comIA: 96 },
  { month: 'Nov', semIA: 72, comIA: 101 },
  { month: 'Dec', semIA: 74, comIA: 106 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#020617] border border-slate-700 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs font-bold text-white mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-300">{entry.name}:</span>
          <span className="text-white font-bold">R$ {entry.value}M</span>
        </div>
      ))}
    </div>
  );
};

export default function RevenueComparisonWidget() {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-sm shadow-slate-200/50 h-full flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <h3 className="flex items-center gap-2 text-brand-navy/60 font-semibold text-sm">
          <BarChart3 size={16} />
          <span>Revenue Comparison</span>
        </h3>
        <div className="flex items-center gap-4 text-[11px] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-brand-navy/30" />
            <span className="text-brand-navy/50">Without AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-brand-blue" />
            <span className="text-brand-navy/70">With AI</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueComparisonData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradSemIA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#022840" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#022840" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="gradComIA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#295BF2" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#295BF2" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={8} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}M`} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="semIA"
              name="Without AI"
              stroke="#022840"
              strokeWidth={2}
              strokeOpacity={0.3}
              fill="url(#gradSemIA)"
              strokeDasharray="6 4"
            />
            <Area
              type="monotone"
              dataKey="comIA"
              name="With AI"
              stroke="#295BF2"
              strokeWidth={2.5}
              fill="url(#gradComIA)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
