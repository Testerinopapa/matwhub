import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Download, FileText, ArrowRight, ShieldCheck, FolderArchive, ExternalLink } from 'lucide-react';

export const QuickToolkitWidget: React.FC = () => {
  const { resources, setActiveTab } = useApp();

  const featuredResources = resources.filter(r => r.is_featured).slice(0, 3);

  const handleDownload = (e: React.MouseEvent, title: string, fileName: string) => {
    e.stopPropagation();
    alert(`Downloading "${fileName}" (${title}) from MATW Lovable Cloud Secure Storage...`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4 transition-all hover:shadow-md">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
              Essential Toolkit & Assets
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">Brand standards, HR policies & forms</span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('resources')}
          className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center space-x-0.5 group"
        >
          <span>All Files</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Featured Master Download Box */}
      <div 
        onClick={() => setActiveTab('resources')}
        className="bg-gradient-to-r from-slate-900 to-[#0C2340] rounded-xl p-3.5 text-white flex items-center justify-between cursor-pointer group shadow-xs hover:border-sky-500 transition-all border border-slate-800"
      >
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-400 flex-shrink-0">
            <FolderArchive className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-black uppercase tracking-wider text-rose-400 block">
              Official Master Asset Pack
            </span>
            <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors truncate">
              MATW Brand & Media Kit 2026
            </h4>
            <span className="text-[10px] text-slate-300">Vector SVG, Typography & Video Lower Thirds (145 MB)</span>
          </div>
        </div>

        <button
          onClick={(e) => handleDownload(e, 'MATW Brand & Media Kit 2026', 'MATW_Brand_Media_Kit_2026.zip')}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all ml-2 flex-shrink-0"
          title="Download Master Pack"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Download Items */}
      <div className="space-y-2">
        {featuredResources.map(res => (
          <div
            key={res.id}
            onClick={() => setActiveTab('resources')}
            className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black uppercase flex-shrink-0 ${
                res.category === 'brand' 
                  ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                  : 'bg-rose-100 text-rose-800 border border-rose-200'
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
              onClick={(e) => handleDownload(e, res.title, res.file_name)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-2 flex-shrink-0"
              title="Download File"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Quick dual switcher */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
        <button
          onClick={() => setActiveTab('resources')}
          className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-xs font-bold text-slate-700 hover:text-amber-800 text-center border border-slate-200/70 transition-colors flex items-center justify-center space-x-1"
        >
          <span>🎨 Brand Hub</span>
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-xs font-bold text-slate-700 hover:text-rose-800 text-center border border-slate-200/70 transition-colors flex items-center justify-center space-x-1"
        >
          <span>📋 HR Policies</span>
        </button>
      </div>

    </div>
  );
};
