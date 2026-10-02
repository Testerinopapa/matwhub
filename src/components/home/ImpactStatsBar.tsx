import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Utensils, HeartPulse, Home, ArrowUpRight, ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';

export const ImpactStatsBar: React.FC = () => {
  const { impactMetrics, setActiveTab } = useApp();

  const totalMetric = impactMetrics.find(m => m.key === 'total_impact') || impactMetrics[0];
  const foodMetric = impactMetrics.find(m => m.key === 'food_water');
  const healthMetric = impactMetrics.find(m => m.key === 'health_hygiene');
  const shelterMetric = impactMetrics.find(m => m.key === 'shelter_clothing');

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-600"></div>
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-800">
            Verified Global Humanitarian Footprint
          </h2>
          <span className="hidden sm:inline-block text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full border border-slate-200">
            Field Audit • Q4 2026
          </span>
        </div>
        <button
          onClick={() => setActiveTab('impact')}
          className="text-xs font-extrabold text-rose-600 hover:text-rose-700 flex items-center space-x-1 group"
        >
          <span>Explore All 24 Countries</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Asymmetric Hero + Pillar Impact Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Main Hero Metric Card (5 cols): 59,449,628 */}
        <div 
          onClick={() => setActiveTab('impact')}
          className="lg:col-span-5 bg-gradient-to-br from-[#0C2340] via-[#0E2849] to-[#123158] text-white rounded-2xl p-6 border border-[#1b3a63] shadow-md hover:shadow-xl transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
                Primary Humanitarian Milestone
              </span>
              <span className="flex items-center space-x-1 text-emerald-400 text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Audited 100% Policy</span>
              </span>
            </div>

            <div className="mt-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-white group-hover:text-rose-400 transition-colors">
                {totalMetric.value}
              </div>
              <h3 className="text-sm font-extrabold text-slate-100 mt-1">
                {totalMetric.label}
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Cumulative verified individuals provided food, water, medical treatment, or emergency shelter since October 9th, 2023.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-300">
            <span className="text-[11px] font-medium text-amber-300">Across 24 Global Countries</span>
            <span className="text-xs font-bold text-sky-300 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
              <span>View Breakdown</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* 3 Secondary Metric Pillars (7 cols): Nutrition, Medical, Shelter */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Food & Water */}
          {foodMetric && (
            <div 
              onClick={() => setActiveTab('impact')}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nutrition & Water</span>
                  <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 group-hover:scale-110 transition-transform">
                    <Utensils className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-slate-900 group-hover:text-sky-600 transition-colors">
                  {foodMetric.value}
                </div>
                <h4 className="text-xs font-bold text-slate-800 mt-1">{foodMetric.label}</h4>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-snug">
                Hot meals, bakeries, food parcels, and deep clean water wells.
              </p>
            </div>
          )}

          {/* Health & Hygiene */}
          {healthMetric && (
            <div 
              onClick={() => setActiveTab('impact')}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Medical Support</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:scale-110 transition-transform">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {healthMetric.value}
                </div>
                <h4 className="text-xs font-bold text-slate-800 mt-1">{healthMetric.label}</h4>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-snug">
                Emergency clinic kits, trauma supplies, and sanitation family kits.
              </p>
            </div>
          )}

          {/* Shelter & Clothing */}
          {shelterMetric && (
            <div 
              onClick={() => setActiveTab('impact')}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Emergency Shelter</span>
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 group-hover:scale-110 transition-transform">
                    <Home className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-slate-900 group-hover:text-amber-600 transition-colors">
                  {shelterMetric.value}
                </div>
                <h4 className="text-xs font-bold text-slate-800 mt-1">{shelterMetric.label}</h4>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-snug">
                Waterproof winterized tents, thermal blankets, and child coats.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
