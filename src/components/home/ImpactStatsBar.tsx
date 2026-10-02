import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Utensils, HeartPulse, Home, CheckCircle2 } from 'lucide-react';

export const ImpactStatsBar: React.FC = () => {
  const { impactMetrics, setActiveTab } = useApp();

  const totalMetric = impactMetrics.find(m => m.key === 'total_impact') || impactMetrics[0];
  const foodMetric = impactMetrics.find(m => m.key === 'food_water');
  const healthMetric = impactMetrics.find(m => m.key === 'health_hygiene');
  const shelterMetric = impactMetrics.find(m => m.key === 'shelter_clothing');

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D9222A]" />
          <h2 className="text-sm font-bold text-slate-900">
            Verified humanitarian footprint
          </h2>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
            Field audit 2026
          </span>
        </div>
        <button
          onClick={() => setActiveTab('impact')}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
        >
          Explore 24 active countries
        </button>
      </div>

      {/* Asymmetric Hero + Pillar Impact Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Main Hero Metric Card (5 cols) */}
        <div 
          onClick={() => setActiveTab('impact')}
          className="lg:col-span-5 bg-[#0C2340] text-white rounded-2xl p-6 border border-[#1b3a63] shadow-sm hover:border-slate-500 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-300">
                Total lives supported
              </span>
              <span className="flex items-center space-x-1 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Audited 100% policy</span>
              </span>
            </div>

            <div className="mt-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                {totalMetric.value}
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Cumulative verified individuals provided food, clean water, medical treatment, or emergency shelter since October 2023.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-300">
            <span className="text-slate-400">Deployed across 24 countries</span>
            <span className="text-xs font-bold text-sky-300 hover:text-white">
              View country breakdown
            </span>
          </div>
        </div>

        {/* 3 Secondary Metric Pillars (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Food & Water */}
          {foodMetric && (
            <div 
              onClick={() => setActiveTab('impact')}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">Nutrition & water</span>
                  <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
                    <Utensils className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black tracking-tight text-slate-900">
                  {foodMetric.value}
                </div>
                <h4 className="text-xs font-bold text-slate-800 mt-1">{foodMetric.label}</h4>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-snug">
                Hot meals, bakeries, food parcels, and clean water wells.
              </p>
            </div>
          )}

          {/* Medical & Health */}
          {healthMetric && (
            <div 
              onClick={() => setActiveTab('impact')}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">Healthcare</span>
                  <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black tracking-tight text-slate-900">
                  {healthMetric.value}
                </div>
                <h4 className="text-xs font-bold text-slate-800 mt-1">{healthMetric.label}</h4>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-snug">
                Trauma response, mobile clinics, and family sanitation boxes.
              </p>
            </div>
          )}

          {/* Shelter & Warmth */}
          {shelterMetric && (
            <div 
              onClick={() => setActiveTab('impact')}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">Shelter & warmth</span>
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                    <Home className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black tracking-tight text-slate-900">
                  {shelterMetric.value}
                </div>
                <h4 className="text-xs font-bold text-slate-800 mt-1">{shelterMetric.label}</h4>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-snug">
                Reinforced family tents, thermal blankets, and winter jackets.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
