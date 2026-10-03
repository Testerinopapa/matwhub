import React, { useState, useEffect } from 'react';
import { ACTIVE_FIELD_DEPLOYMENTS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Globe, Radio } from 'lucide-react';

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
    <div className="page-panel page-panel--interactive bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      
      {/* Header */}
      <div className="p-4 bg-[#0C2340] text-white flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-white">
              Active field stations
            </h3>
            <span className="text-[11px] text-slate-300">
              {utcTime || 'UTC live'} Across 24 countries
            </span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('impact')}
          className="text-xs font-semibold text-emerald-300 hover:text-white transition-colors"
        >
          View field map
        </button>
      </div>

      <div className="p-4 space-y-3">
        {/* Deployment List */}
        <div className="space-y-2">
          {ACTIVE_FIELD_DEPLOYMENTS.slice(0, 4).map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveTab('impact')}
              className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${item.badgeColor}`} />
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {item.country}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {item.teams} teams
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate pl-4 mt-0.5">
                  {item.focus}
                </p>
              </div>

              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex-shrink-0 ml-2">
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Global mission summary */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs flex items-center justify-between text-slate-700">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-slate-600">Active missions worldwide:</span>
          </div>
          <span className="font-bold text-slate-900 text-xs">142 projects</span>
        </div>
      </div>
    </div>
  );
};
