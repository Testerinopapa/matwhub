import React from 'react';
import { useApp } from '../../context/AppContext';
import { STAFF_MEMBERS } from '../../data/mockData';
import { Quote, Sparkles, ArrowRight, Play, Heart } from 'lucide-react';

export const LeadershipWidget: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="bg-gradient-to-br from-[#0C2340] to-[#08182D] rounded-2xl border border-[#1b3a63] text-white p-5 shadow-sm space-y-3.5 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Leadership & Legacy Corner
          </span>
        </div>
        <button
          onClick={() => setActiveTab('leadership')}
          className="text-[11px] font-semibold text-sky-400 hover:text-sky-300"
        >
          All Reflections →
        </button>
      </div>

      {/* Founder Tribute & Video Preview */}
      <div className="relative rounded-xl overflow-hidden border border-slate-700 group cursor-pointer" onClick={() => setActiveTab('leadership')}>
        <img 
          src="/images/matw/admin-image-1764514998420.jpeg" 
          alt="Ali Banat Legacy Reflection" 
          className="w-full h-36 object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                "Gifted With Cancer: The Sacred Trust"
              </p>
              <span className="text-[10px] text-slate-300">Brother Ali Banat • 10M+ Worldwide Views</span>
            </div>
          </div>
        </div>
      </div>

      {/* CEO Quote Excerpt */}
      <div className="bg-slate-800/60 rounded-xl p-3.5 border border-slate-700/60 relative">
        <Quote className="w-4 h-4 text-amber-400 opacity-60 absolute top-2.5 right-2.5" />
        <p className="text-xs italic text-slate-200 leading-relaxed font-sans pr-4">
          "Every single parcel packed and delivered is an act of worship and a trust. As One Team, our 100% Zakat guarantee is not merely a policy—it is our eternal legacy."
        </p>
        <div className="mt-2.5 flex items-center space-x-2 pt-2 border-t border-slate-700/60">
          <img 
            src={STAFF_MEMBERS.ceo.avatar} 
            alt={STAFF_MEMBERS.ceo.name} 
            className="w-6 h-6 rounded-full object-cover border border-amber-400"
          />
          <div className="min-w-0">
            <span className="text-xs font-bold text-white block truncate">{STAFF_MEMBERS.ceo.name}</span>
            <span className="text-[10px] text-slate-400 block truncate">Global Chief Executive Officer</span>
          </div>
        </div>
      </div>

    </div>
  );
};
