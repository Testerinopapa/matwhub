import React, { useState, useEffect } from 'react';
import { ACTIVE_FIELD_DEPLOYMENTS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Globe, ShieldAlert, ArrowRight, Radio, Compass, MapPin } from 'lucide-react';

export const FieldDeploymentsWidget: React.FC = () => {
  const { setActiveTab } = useApp();
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 22) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:shadow-md">
      
      {/* Header with Live Mission Radar styling */}
      <div className="p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-[#0C2340] text-white flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-white">
                Live Field Radar & Missions
              </h3>
            </div>
            <span className="text-[10px] text-emerald-300 font-mono font-medium">
              {utcTime || 'UTC Live'} • 24 Countries Active
            </span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('impact')}
          className="text-xs font-bold text-emerald-300 hover:text-white flex items-center space-x-0.5 group"
        >
          <span>Map</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        {/* Deployment List */}
        <div className="space-y-2">
          {ACTIVE_FIELD_DEPLOYMENTS.slice(0, 4).map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveTab('impact')}
              className="p-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 min-w-0">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.badgeColor} animate-pulse flex-shrink-0`}></span>
                  <span className="text-xs font-extrabold text-slate-800 group-hover:text-emerald-700 transition-colors truncate">
                    {item.country}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-mono flex-shrink-0">
                  {item.teams} Teams
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 pl-4.5">
                <span className="truncate">{item.focus}</span>
                <span className="font-semibold text-emerald-700 font-mono ml-2 whitespace-nowrap bg-emerald-50 px-1.5 py-0.5 rounded">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global mission summary pill */}
        <div className="p-3 bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-200/80 rounded-xl text-xs flex items-center justify-between text-slate-800">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-[11px]">Active Deployments Worldwide:</span>
          </div>
          <span className="font-black text-emerald-700 font-mono text-xs">142 Missions</span>
        </div>
      </div>
    </div>
  );
};
