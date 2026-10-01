import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Download, FileText, ArrowRight, ShieldAlert, Award } from 'lucide-react';

export const QuickToolkitWidget: React.FC = () => {
  const { resources, setActiveTab } = useApp();

  const featuredResources = resources.filter(r => r.is_featured).slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3.5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
              Essential Toolkit & Resources
            </h3>
            <span className="text-[10px] text-slate-400">Brand guidelines & HR documentation</span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('resources')}
          className="text-xs font-bold text-sky-700 hover:text-sky-800"
        >
          All Files →
        </button>
      </div>

      {/* Resource Quick Download Cards */}
      <div className="space-y-2">
        {featuredResources.map(res => (
          <div
            key={res.id}
            onClick={() => setActiveTab('resources')}
            className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold uppercase flex-shrink-0 ${
                res.category === 'brand' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {res.file_type}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors truncate">
                  {res.title}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {res.subcategory} • {res.version} • {res.file_size}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                alert(`Downloading ${res.file_name} from MATW Lovable Cloud storage...`);
              }}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-2 flex-shrink-0"
              title="Download File"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Quick dual switcher */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
        <button
          onClick={() => setActiveTab('resources')}
          className="p-2 rounded-lg bg-slate-50 hover:bg-amber-50 text-[11px] font-bold text-slate-700 hover:text-amber-800 text-center border border-slate-200/60 transition-colors"
        >
          🎨 Brand Centre
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className="p-2 rounded-lg bg-slate-50 hover:bg-rose-50 text-[11px] font-bold text-slate-700 hover:text-rose-800 text-center border border-slate-200/60 transition-colors"
        >
          📋 Employee Policies
        </button>
      </div>

    </div>
  );
};
