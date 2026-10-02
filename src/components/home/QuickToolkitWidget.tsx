import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Download, FolderArchive } from 'lucide-react';

export const QuickToolkitWidget: React.FC = () => {
  const { resources, setActiveTab } = useApp();

  const featuredResources = resources.filter(r => r.is_featured).slice(0, 3);

  const handleDownload = (e: React.MouseEvent, title: string, fileName: string) => {
    e.stopPropagation();
    alert(`Downloading "${fileName}" (${title}) from MATW storage...`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-slate-900">
              Essential toolkit & assets
            </h3>
            <span className="text-[11px] text-slate-400">Brand standards and policies</span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('resources')}
          className="text-xs font-semibold text-sky-700 hover:text-sky-800 transition-colors"
        >
          View all
        </button>
      </div>

      {/* Featured Master Download Box */}
      <div 
        onClick={() => setActiveTab('resources')}
        className="bg-[#0C2340] rounded-xl p-3.5 text-white flex items-center justify-between cursor-pointer group shadow-2xs hover:bg-[#0e294b] transition-all"
      >
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-rose-400 flex-shrink-0">
            <FolderArchive className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-semibold text-rose-300 block">
              Official asset pack
            </span>
            <h4 className="text-xs font-bold text-white truncate">
              MATW Brand & Media Kit 2026
            </h4>
            <span className="text-[11px] text-slate-300">Vectors, typography, and badges (145 MB)</span>
          </div>
        </div>

        <button
          onClick={(e) => handleDownload(e, 'MATW Brand & Media Kit 2026', 'MATW_Brand_Media_Kit_2026.zip')}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-2 flex-shrink-0"
          title="Download master pack"
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
            className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase flex-shrink-0 ${
                res.category === 'brand' 
                  ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {res.file_type}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {res.title}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {res.subcategory} • {res.file_size}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => handleDownload(e, res.title, res.file_name)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors ml-2 flex-shrink-0"
              title="Download file"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Quick hub buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
        <button
          onClick={() => setActiveTab('resources')}
          className="p-2 rounded-lg bg-slate-50 hover:bg-amber-50 text-xs font-semibold text-slate-700 hover:text-amber-800 text-center border border-slate-200/80 transition-colors"
        >
          Brand resource hub
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className="p-2 rounded-lg bg-slate-50 hover:bg-rose-50 text-xs font-semibold text-slate-700 hover:text-rose-800 text-center border border-slate-200/80 transition-colors"
        >
          Employee policies
        </button>
      </div>

    </div>
  );
};
