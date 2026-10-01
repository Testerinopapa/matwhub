import React from 'react';
import { ACTIVE_FIELD_DEPLOYMENTS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Globe, ShieldAlert, ArrowUpRight, Compass } from 'lucide-react';

export const FieldDeploymentsWidget: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
              Active Field Stations
            </h3>
            <span className="text-[10px] text-slate-400">Live operational status across 24 countries</span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('impact')}
          className="text-xs font-bold text-sky-700 hover:text-sky-800"
        >
          View Map →
        </button>
      </div>

      {/* Deployment List */}
      <div className="space-y-2.5">
        {ACTIVE_FIELD_DEPLOYMENTS.slice(0, 4).map((item, idx) => (
          <div 
            key={idx}
            onClick={() => setActiveTab('impact')}
            className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${item.badgeColor} animate-pulse`}></span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors">
                  {item.country}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {item.teams} Teams Deployed
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 pl-4">
              <span className="truncate">{item.focus}</span>
              <span className="font-medium text-emerald-700 font-mono ml-2 whitespace-nowrap">{item.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl text-[11px] text-emerald-900 flex items-center justify-between">
        <span className="font-medium">Total Active Humanitarian Missions:</span>
        <span className="font-black text-emerald-800 font-mono">142 Projects</span>
      </div>
    </div>
  );
};
