import { Sparkles, TrendingUp, Package, Tag, Eye } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '../ui/Button';

interface Props {
  totalSelected?: number;
  totalAvailable?: number;
  estimatedRevenue?: number;
  perfumariaCount?: number;
  corpoCount?: number;
  showButton?: boolean;
}

export default function SelectionSummaryWidget({
  totalSelected = 5,
  totalAvailable = 7,
  estimatedRevenue = 90100,
  perfumariaCount = 3,
  corpoCount = 2,
  showButton = true,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-sm shadow-slate-200/50 h-full">
      <div className="flex items-center gap-2 text-brand-navy/60 font-semibold text-sm mb-5">
        <Sparkles size={16} />
        <span>Selection Summary</span>
      </div>

      <div className="space-y-5 flex-1">
        {/* Total Selected */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold text-brand-navy/60 uppercase tracking-wider">Selection Progress</span>
            <span className="text-xs font-bold text-brand-blue">{totalSelected} / {totalAvailable} items</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-blue rounded-full transition-all duration-500"
              style={{ width: `${(totalSelected / (totalAvailable || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Estimated Revenue & Average Ticket */}
        <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
          <span className="block text-[10px] font-bold text-brand-navy/60 uppercase tracking-wider mb-1">
            Estimated Base Revenue
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-brand-navy tracking-tight">
              R$ {(estimatedRevenue / 1000).toFixed(1)}k
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              <TrendingUp size={10} /> Ticket R$ {totalSelected > 0 ? (estimatedRevenue / totalSelected).toFixed(0) : '0'}
            </span>
          </div>
          <span className="block text-[10px] text-brand-navy/50 mt-1">
            Based on stock and list price
          </span>
        </div>

        {/* Category Donut Chart */}
        <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200/60">
          <span className="block text-[10px] font-bold text-brand-navy/60 uppercase tracking-wider mb-2">
            Category Distribution
          </span>
          <div className="h-36 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Perfumery', value: perfumariaCount, color: '#295BF2' },
                    { name: 'Body & Bath', value: corpoCount, color: '#818cf8' },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={52}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="#295BF2" />
                  <Cell fill="#818cf8" />
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                  itemStyle={{ color: '#fff', fontWeight: 600 }}
                  formatter={(val: any) => [`R$ ${val}M`, undefined]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-base font-black text-brand-navy leading-none">
                {Math.round((totalSelected / (totalAvailable || 1)) * 100)}%
              </span>
              <span className="text-[8px] font-bold text-brand-navy/50 uppercase mt-0.5">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/60 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />
              <span className="text-brand-navy/70 truncate">Perfumery ({perfumariaCount})</span>
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
              <span className="text-brand-navy/70 truncate">Body/Bath ({corpoCount})</span>
            </div>
          </div>
        </div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
            <div className="flex items-center gap-1 text-[10px] font-bold text-brand-navy/50 uppercase mb-1">
              <Package size={12} className="text-brand-blue" />
              <span>Base Stock</span>
            </div>
            <span className="text-sm font-black text-brand-navy">1.66k un.</span>
          </div>
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
            <div className="flex items-center gap-1 text-[10px] font-bold text-brand-navy/50 uppercase mb-1">
              <Tag size={12} className="text-emerald-600" />
              <span>Average Margin</span>
            </div>
            <span className="text-sm font-black text-emerald-600">48.2%</span>
          </div>
        </div>
      </div>

      {showButton && (
        <div className="pt-4 mt-4 border-t border-slate-100">
          <Button variant="secondary" fullWidth size="md">
            <Eye size={14} />
            Review Full List
          </Button>
        </div>
      )}
    </div>
  );
}
