import React from 'react';
import { useApp } from '../../context/AppContext';
import { STAFF_MEMBERS } from '../../data/mockData';
import { Quote, Sparkles, ArrowRight, Play, Heart, ShieldCheck } from 'lucide-react';

export const LeadershipWidget: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="bg-gradient-to-br from-[#07172B] via-[#0C2340] to-[#0A1A2F] rounded-2xl border-2 border-amber-500/30 text-white p-5 shadow-md space-y-4 relative overflow-hidden group">
      
      {/* Decorative Gold Ambient Radial Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-300">
              Founder Legacy & Leadership
            </h3>
            <span className="text-[10px] text-slate-300 font-medium">Brother Ali Banat's Sacred Trust</span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('leadership')}
          className="text-xs font-bold text-sky-300 hover:text-white flex items-center space-x-0.5 group"
        >
          <span>Reflections</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Founder Tribute & Video Preview Card */}
      <div 
        onClick={() => setActiveTab('leadership')}
        className="relative rounded-xl overflow-hidden border border-amber-400/30 group-hover:border-amber-400/60 transition-all cursor-pointer shadow-sm"
      >
        <img 
          src="/images/matw/admin-image-1764514998420.jpeg" 
          alt="Ali Banat Legacy Reflection" 
          className="w-full h-36 object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-3.5">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-rose-500 transition-all flex-shrink-0">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 block">
                Official Archive Video
              </span>
              <p className="text-xs font-extrabold text-white leading-tight truncate">
                "Gifted With Cancer: The Sacred Trust"
              </p>
              <span className="text-[10px] text-slate-300">Ali Banat • Watched by 10M+ Worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* CEO Quote & 100% Policy Guarantee */}
      <div className="bg-slate-900/80 backdrop-blur-xs rounded-xl p-3.5 border border-slate-700/80 relative">
        <Quote className="w-5 h-5 text-amber-400/40 absolute top-2.5 right-3" />
        <p className="text-xs italic text-slate-200 leading-relaxed font-sans pr-4">
          "Every single parcel packed is an act of worship and an uncompromising trust. As One Team, our 100% Zakat guarantee is not merely a policy—it is our eternal legacy."
        </p>
        
        <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-800">
          <div className="flex items-center space-x-2">
            <img 
              src={STAFF_MEMBERS.ceo.avatar} 
              alt={STAFF_MEMBERS.ceo.name} 
              className="w-7 h-7 rounded-full object-cover border-2 border-amber-400"
            />
            <div className="min-w-0">
              <span className="text-xs font-bold text-white block leading-tight truncate">{STAFF_MEMBERS.ceo.name}</span>
              <span className="text-[10px] text-slate-400 block leading-none">Global Chief Executive Officer</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-black uppercase tracking-wider flex-shrink-0">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>100% Policy</span>
          </div>
        </div>
      </div>

    </div>
  );
};
