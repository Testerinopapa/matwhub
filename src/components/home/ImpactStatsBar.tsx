import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Utensils, HeartPulse, Home, ArrowUpRight, ShieldCheck, Globe } from 'lucide-react';

export const ImpactStatsBar: React.FC = () => {
  const { impactMetrics, setActiveTab } = useApp();

  const getMetricIcon = (key: string) => {
    switch (key) {
      case 'total_impact':
        return <Users className="w-5 h-5 text-rose-600" />;
      case 'food_water':
        return <Utensils className="w-5 h-5 text-sky-600" />;
      case 'health_hygiene':
        return <HeartPulse className="w-5 h-5 text-emerald-600" />;
      case 'shelter_clothing':
        return <Home className="w-5 h-5 text-amber-600" />;
      default:
        return <Globe className="w-5 h-5 text-indigo-600" />;
    }
  };

  const primaryMetrics = impactMetrics.filter(m => m.is_primary).slice(0, 4);

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-600"></div>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
            Verified Global Impact Overview
          </h2>
          <span className="text-[10px] bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded-full border border-slate-200">
            Audited October 2026
          </span>
        </div>
        <button
          onClick={() => setActiveTab('impact')}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1 group"
        >
          <span>Explore All 24 Countries</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Metrics 4-Card Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {primaryMetrics.map(m => (
          <div
            key={m.id}
            onClick={() => setActiveTab('impact')}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{m.category}</span>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                {getMetricIcon(m.key)}
              </div>
            </div>

            <div className="mt-2.5">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight group-hover:text-rose-600 transition-colors">
                {m.value}
              </div>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{m.label}</p>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 leading-snug">
                {m.period_description}
              </p>
            </div>

            {/* Subtle bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};
