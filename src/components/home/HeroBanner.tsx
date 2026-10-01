import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Clock,
  Compass,
  AlertCircle
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
    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-800 bg-[#0C2340] text-white">
      {/* Background Graphic / Field Photo with Gradient Overlays */}
      <div className="absolute inset-0">
        <img 
          src="/images/matw/admin-image-1765282578391.jpeg" 
          alt="MATW Gaza Emergency Response" 
          className="w-full h-full object-cover object-top opacity-30 transform scale-105 filter blur-[0.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C2340] via-[#0C2340]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C2340] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Personalized Greeting & Campaign Spotlight */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Top Badges & Greeting */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 bg-rose-600/90 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border border-rose-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                <span>Active Campaign Spotlight</span>
              </span>
              <span className="inline-flex items-center space-x-1 text-sky-300 text-xs font-semibold bg-sky-950/60 border border-sky-500/30 px-2.5 py-1 rounded-full">
                <Calendar className="w-3 h-3 text-sky-400" />
                <span>{todayDate}</span>
              </span>
              <span className="text-amber-300 text-xs font-medium hidden sm:inline-flex items-center space-x-1">
                <span>✦</span>
                <span>"The most beloved people to Allah are those who bring benefit to others."</span>
              </span>
            </div>

            {/* Headline */}
            <div>
              <p className="text-xs text-rose-200 font-semibold uppercase tracking-wider">
                Assalamu Alaikum, {currentUser.name.split(' ')[0]} 👋
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mt-1 leading-tight">
                Winter Won’t Wait in Gaza: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-sky-300 to-amber-200">
                  Phase 4 Corridor Crossing Underway
                </span>
              </h1>
            </div>

            {/* Campaign Summary & Mission Stat */}
            <p className="text-slate-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Our regional emergency dispatch teams in Amman and Rafah have cleared 28,000 thermal blankets, reinforced winter family tents, and essential food parcels into Deir al-Balah. Through your collective daily dedication, our 100% donation guarantee delivers warmth and dignity to families in crisis.
            </p>

            {/* Quick CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('feed')}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-rose-900/30 transition-all flex items-center space-x-2 transform hover:-translate-y-0.5"
              >
                <span>Read Field Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={() => setActiveTab('impact')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/20 transition-all flex items-center space-x-2"
              >
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>Explore Global Impact Hub</span>
              </button>

              <button
                onClick={() => setIsRecogniseModalOpen(true)}
                className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-amber-400/30 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Give Team Kudos</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Real-Time Metric Glass Card */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/75 backdrop-blur-md rounded-2xl p-5 border border-slate-700/70 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Live Relief Corridor
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">ONLINE 24/7</span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400">Phase 4 Target Progress</span>
                  <div className="flex items-end justify-between mt-1">
                    <span className="text-2xl font-black text-white font-mono">28,450 / 35,000</span>
                    <span className="text-xs font-bold text-sky-400">81% Complete</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-400 via-rose-500 to-amber-400 rounded-full" style={{ width: '81%' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="bg-slate-800/60 p-2.5 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Active Convoys</span>
                    <span className="font-extrabold text-white text-base">42 Trucks</span>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Volunteers on Ground</span>
                    <span className="font-extrabold text-emerald-400 text-base">310+ Staff</span>
                  </div>
                </div>

                <div className="p-2.5 bg-rose-950/40 border border-rose-900/60 rounded-xl flex items-center space-x-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <p className="text-[11px] text-rose-200 leading-snug">
                    Weather alert: Temperatures dropping to 4°C tonight across Northern Gaza shelters.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
