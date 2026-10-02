import React from 'react';
import { useApp } from '../../context/AppContext';
import { STAFF_MEMBERS } from '../../data/mockData';
import { Quote, Play, ShieldCheck } from 'lucide-react';

export const LeadershipWidget: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="bg-[#08182D] rounded-2xl border border-slate-800 text-white p-5 shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h3 className="font-bold text-xs text-white">
            Founder legacy & leadership
          </h3>
        </div>
        <button
          onClick={() => setActiveTab('leadership')}
          className="text-xs font-semibold text-sky-300 hover:text-white transition-colors"
        >
          Read reflections
        </button>
      </div>

      {/* Founder Tribute & Video Preview Card */}
      <div 
        onClick={() => setActiveTab('leadership')}
        className="relative rounded-xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-all cursor-pointer group"
      >
        <img 
          src="/images/matw/admin-image-1764514998420.jpeg" 
          alt="Brother Ali Banat legacy reflection" 
          className="w-full h-36 object-cover object-center group-hover:scale-102 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-3.5">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-[#D9222A] text-white flex items-center justify-center shadow-md group-hover:bg-rose-500 transition-colors flex-shrink-0">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-amber-300 block">
                Historical archive
              </span>
              <p className="text-xs font-bold text-white leading-tight truncate">
                Gifted with Cancer: The Sacred Trust
              </p>
              <span className="text-[11px] text-slate-300">Brother Ali Banat</span>
            </div>
          </div>
        </div>
      </div>

      {/* CEO Quote & 100% Policy Guarantee */}
      <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 relative">
        <Quote className="w-4 h-4 text-slate-500 absolute top-3 right-3" />
        <p className="text-xs text-slate-200 leading-relaxed pr-4">
          "Every single parcel packed is an act of worship and an uncompromising trust. As One Team, our 100% Zakat guarantee is not merely a policy — it is our eternal legacy."
        </p>
        
        <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-800">
          <div className="flex items-center space-x-2">
            <img 
              src={STAFF_MEMBERS.ceo.avatar} 
              alt={STAFF_MEMBERS.ceo.name} 
              className="w-7 h-7 rounded-full object-cover border border-slate-600"
            />
            <div className="min-w-0">
              <span className="text-xs font-bold text-white block leading-tight truncate">{STAFF_MEMBERS.ceo.name}</span>
              <span className="text-[10px] text-slate-400 block leading-none">Global Chief Executive Officer</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-medium flex-shrink-0">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>100% policy</span>
          </div>
        </div>
      </div>

    </div>
  );
};
