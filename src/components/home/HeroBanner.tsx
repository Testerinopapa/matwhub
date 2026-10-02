import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Sparkles, 
  Calendar, 
  Clock,
  Compass,
  CheckCircle2,
  Truck
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { currentUser, setActiveTab, setIsCreatePostOpen, setIsRecogniseModalOpen } = useApp();

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#1b3a63] bg-[#07172B] text-white shadow-xl">
      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Mission Narrative & Plain Voice */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Context line */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center space-x-1.5 bg-[#D9222A] text-white text-xs font-bold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Urgent winter appeal</span>
              </span>
              <span className="text-slate-300 text-xs font-medium">
                {todayDate}
              </span>
              <span className="text-slate-400 text-xs">
                Assalamu Alaikum, {currentUser.name.split(' ')[0]}
              </span>
            </div>

            {/* Editorial Headline: Confident, solid white type without gradient gimmicks */}
            <div>
              <p className="text-sm font-semibold tracking-wide text-rose-300 uppercase mb-1">
                Logistics corridor phase 4
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                28,450 thermal kits crossing into Khan Younis and Deir al-Balah
              </h1>
            </div>

            {/* Direct, human narrative */}
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              Heavy waterproof family tents, thermal blankets, and high-nutrition baby parcels have crossed the regional transit hub into southern Gaza. Through our team's ground coordination, your collective work delivers real shelter before sub-zero winter storms peak.
            </p>

            {/* Active Voice Action Buttons (No trailing arrows) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('feed')}
                className="bg-[#D9222A] hover:bg-rose-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-colors"
              >
                Read field dispatch
              </button>
              
              <button
                onClick={() => setActiveTab('impact')}
                className="bg-white/10 hover:bg-white/15 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-white/15 transition-colors flex items-center space-x-2"
              >
                <Compass className="w-3.5 h-3.5 text-sky-300" />
                <span>View impact map</span>
              </button>

              <button
                onClick={() => setIsRecogniseModalOpen(true)}
                className="bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 font-semibold text-xs px-4 py-2.5 rounded-xl border border-amber-400/25 transition-colors flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Give kudos to frontline</span>
              </button>
            </div>

          </div>

          {/* Right Column: Authentic High-Res Field Photography Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900 group">
              <img 
                src="/images/matw/admin-image-1765282578391.jpeg" 
                alt="MATW emergency relief deployment team in Gaza corridor" 
                className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                
                {/* Location stamp */}
                <div className="flex items-center space-x-1.5 text-xs text-slate-300 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span className="font-semibold text-white">Deir al-Balah, Gaza</span>
                  <span className="text-slate-400">Dispatch convoy 14</span>
                </div>

                <p className="text-xs text-slate-200 line-clamp-2">
                  "Every tent pitched protects a family from the elements. We pack each kit as a trust."
                </p>

                {/* Ground Delivery Progress */}
                <div className="mt-3 pt-3 border-t border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>Emergency phase 4 progress</span>
                    <span className="text-white font-bold">28,450 of 35,000 kits</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full w-[81%]" />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
