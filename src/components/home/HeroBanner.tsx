import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Calendar, 
  AlertCircle,
  Clock,
  Compass,
  CheckCircle2,
  TrendingUp,
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
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0C2340] text-white">
      {/* Background subtle radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Mission Narrative & Personalized Action */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Greeting & Date Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border border-rose-400/40">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                <span>Urgent Winter Appeal</span>
              </span>
              <span className="inline-flex items-center space-x-1 text-sky-200 text-xs font-semibold bg-sky-950/60 border border-sky-500/30 px-2.5 py-1 rounded-full">
                <Calendar className="w-3 h-3 text-sky-400" />
                <span>{todayDate}</span>
              </span>
              <span className="text-amber-300 text-xs font-medium hidden sm:inline">
                Assalamu Alaikum, {currentUser.name.split(' ')[0]} 👋
              </span>
            </div>

            {/* Editorial Headline with Handwritten Accent */}
            <div>
              <p className="font-handwritten text-2xl text-rose-300 font-bold leading-none -rotate-1 mb-1">
                Winter Won't Wait in Gaza
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                Logistics Corridor Phase 4: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-sky-300 to-amber-200">
                  28,450 Thermal Kits Crossing Live
                </span>
              </h1>
            </div>

            {/* Body */}
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-xl">
              Heavy waterproof family tents, thermal blankets, and high-nutrition baby parcels have crossed the regional transit hub into Khan Younis and Deir al-Balah. Through your collective dedication, our 100% donation covenant delivers immediate shelter before sub-zero winter storms peak.
            </p>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setActiveTab('feed')}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-rose-900/40 transition-all flex items-center space-x-2 transform hover:-translate-y-0.5"
              >
                <span>Read Field Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={() => setActiveTab('impact')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/20 transition-all flex items-center space-x-2"
              >
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>Impact Map</span>
              </button>

              <button
                onClick={() => setIsRecogniseModalOpen(true)}
                className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-amber-400/30 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Kudos Frontline Team</span>
              </button>
            </div>

          </div>

          {/* Right Column: Prominent High-Res Authentic Field Photography + Live Stats Card */}
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl relative group">
              <img 
                src="/images/matw/admin-image-1732026823446.jpeg" 
                alt="MATW Gaza Aid Workers Delivering Relief" 
                className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="bg-rose-600/90 text-white font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>Deir al-Balah Sector</span>
                  </span>
                  <span className="text-emerald-400 font-mono font-bold text-[10px] flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Verified Real-Time Dispatch</span>
                  </span>
                </div>
                <p className="text-xs text-white font-bold leading-snug">
                  Field workers in MATW vests delivering emergency food & shelter parcels through disaster routes.
                </p>
              </div>
            </div>

            {/* Live Progress Bar Pill */}
            <div className="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center space-x-1.5">
                  <Truck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Phase 4 Winter Target: <strong>28,450 / 35,000</strong></span>
                </span>
                <span className="text-amber-400 font-mono font-black text-xs">81% Complete</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-sky-400 via-rose-500 to-amber-400 rounded-full transition-all duration-700" 
                  style={{ width: '81%' }} 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
