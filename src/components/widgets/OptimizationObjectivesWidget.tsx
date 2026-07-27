import { Sparkles, Settings2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/Button';

const pieData = [
  { name: 'Revenue', value: 52, color: '#295BF2' },
  { name: 'Absolute margin', value: 31, color: '#6D99F2' },
  { name: 'Volume', value: 17, color: '#668C3F' },
];

interface Props {
  showButton?: boolean;
}

export default function OptimizationObjectivesWidget({ showButton = true }: Props) {
  return (
    <div className="bg-white/80 rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-sm shadow-slate-200/50 backdrop-blur-md relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="w-full border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-2 text-brand-navy/60 font-semibold text-sm">
          <Sparkles size={16} />
          <span>Optimization Objectives</span>
        </div>
      </div>

      {/* Values / Legends */}
      <div className="grid grid-cols-3 gap-x-2 w-full text-start pb-4 border-b border-slate-100">
        {pieData.map((item) => (
          <div key={item.name} className="border-s-2 ps-3" style={{ borderColor: item.color }}>
            <span className="block text-[10px] font-semibold text-brand-navy/60 truncate uppercase tracking-wider">
              {item.name === 'Absolute margin' ? 'Margin' : item.name}
            </span>
            <span className="block text-lg font-black text-brand-navy mt-0.5">{item.value}%</span>
          </div>
        ))}
      </div>

      {/* Donut Chart */}
      <div className="w-full h-32 relative flex items-end justify-center overflow-hidden mt-4">
        <ResponsiveContainer width="100%" height="150%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={pieData}
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={3} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute bottom-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-2xl font-black text-brand-navy leading-none">100%</span>
          <span className="text-[9px] text-brand-navy/60 font-bold uppercase tracking-wider mt-1">Balanced Goal</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <p className="text-[11px] text-brand-navy/70 text-center leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
          The AI will prioritize increasing <strong>Revenue (52%)</strong> and <strong>Margin (31%)</strong> respecting all commercial constraints.
        </p>
        {showButton && (
          <Button variant="primary" fullWidth size="md">
            <Settings2 size={14} />
            Set Objectives and Constraints
          </Button>
        )}
      </div>
    </div>
  );
}
