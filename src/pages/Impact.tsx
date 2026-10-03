import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Globe, 
  Users, 
  Utensils, 
  HeartPulse, 
  Home, 
  Droplet, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Sparkles, 
  MapPin, 
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

export const Impact: React.FC = () => {
  const { impactMetrics, posts, setActiveTab } = useApp();
  const [selectedProgram, setSelectedProgram] = useState<string>('all');

  const PROGRAMS = [
    { id: 'all', title: 'All Programmes', icon: Layers },
    { id: 'water', title: 'Clean Water & Deep Wells', icon: Droplet, count: '3,800+ Wells' },
    { id: 'emergency', title: 'Gaza & Emergency Response', icon: ShieldCheck, count: 'Phase 4 Live' },
    { id: 'orphans', title: 'Orphan Care & Education', icon: HeartPulse, count: '12,500+ Children' },
    { id: 'nutrition', title: 'Food Security & Bread Bakeries', icon: Utensils, count: '22M+ Meals' },
  ];

  const FIELD_STORIES = [
    {
      title: 'Solar-Powered Deep Water Boreholes in Mali & Togo',
      region: 'West Africa',
      impact: '180,000 villagers given permanent access to pure, tested drinking water.',
      image: '/images/matw/admin-image-1732026823446.jpeg',
      quote: '"Water is life. Now our daughters can attend school instead of walking 10km daily."'
    },
    {
      title: 'Winterization Emergency Shelter Reinforcement in Deir al-Balah',
      region: 'Gaza Corridor',
      impact: '28,000 thermal blankets and waterproof family tents erected before flash floods.',
      image: '/images/matw/admin-image-1765282578391.jpeg',
      quote: '"Our teams worked through the rain to ensure no child was sleeping on freezing ground."'
    },
    {
      title: 'Emergency Nutrition and Infant Milk Distribution in Khan Younis',
      region: 'Palestine Frontline',
      impact: 'Over 1,200 children provided emergency fortified porridge and vitamin rations today.',
      image: '/images/matw/admin-image-1732026659242.jpeg',
      quote: '"Every bag carried carries the prayers and trust of thousands of donors worldwide."'
    }
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto animate-in fade-in duration-200">
      
      {/* 1. Dramatic Editorial Hero */}
      <div className="page-hero-panel page-hero-panel--impact relative rounded-3xl overflow-hidden bg-[#0C2340] text-white border border-[#1b3a63] p-8 sm:p-12 shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src="/images/matw/admin-image-1731684275384.jpeg" 
            alt="MATW Total Impact Infographic" 
            className="w-full h-full object-cover opacity-20 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C2340] via-[#0C2340]/95 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-rose-600/90 text-white text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border border-rose-400/40">
            <Globe className="w-3.5 h-3.5" />
            <span>Humanitarian Impact Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            59,449,628 Lives Touched. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-sky-300">
              One Mission. Pure Charity.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            From emergency winter relief in Gaza to solar wells across West Africa, every single metric represents real humans given dignity, nutrition, safety, and hope through our 100% donation commitment.
          </p>

          <div className="pt-2 flex items-center space-x-3 text-xs">
            <span className="bg-sky-500/20 text-sky-300 px-3 py-1.5 rounded-lg border border-sky-400/30 font-semibold">
              ✓ 100% Zakat Certified
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-400/30 font-semibold">
              ✓ 24 Countries Active
            </span>
          </div>
        </div>
      </div>

      {/* Interactive impact atlas */}
      <section className="impact-atlas" aria-labelledby="impact-atlas-title">
        <div className="impact-atlas__copy">
          <span className="impact-atlas__eyebrow">Live footprint / 24 countries</span>
          <h2 id="impact-atlas-title">A connected map of care.</h2>
          <p>Every programme is a point in a larger system: local teams, trusted partners, and donors moving in the same direction.</p>
          <div className="impact-atlas__legend">
            <span><i className="impact-atlas__legend-dot impact-atlas__legend-dot--active" /> Active corridor</span>
            <span><i className="impact-atlas__legend-dot impact-atlas__legend-dot--water" /> Sustainable infrastructure</span>
          </div>
        </div>
        <div className="impact-atlas__orbit" aria-hidden="true">
          <span className="impact-atlas__orbit-line impact-atlas__orbit-line--one" />
          <span className="impact-atlas__orbit-line impact-atlas__orbit-line--two" />
          <span className="impact-atlas__orbit-line impact-atlas__orbit-line--three" />
          <span className="impact-atlas__core"><strong>59.4M</strong><small>lives touched</small></span>
          <span className="impact-atlas__node impact-atlas__node--gaza"><b>Gaza</b><small>28.4k kits</small></span>
          <span className="impact-atlas__node impact-atlas__node--mali"><b>Mali</b><small>180k people</small></span>
          <span className="impact-atlas__node impact-atlas__node--togo"><b>Togo</b><small>3.8k wells</small></span>
        </div>
      </section>

      {/* 2. Impact Counters Grid (Live Relational Records) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              Verified Relief Counters
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Data sourced directly from logistics dispatch & field teams
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {impactMetrics.map(metric => (
            <div 
              key={metric.id}
              className="page-panel page-panel--interactive bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:border-slate-300 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {metric.category}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <div className="mt-3">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight group-hover:text-rose-600 transition-colors">
                  {metric.value}
                </div>
                <h3 className="text-sm font-bold text-slate-800 mt-1">{metric.label}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {metric.period_description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Verified Field Audit</span>
                <span className="font-semibold text-emerald-700">100% Policy Applied</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Program Areas Showcase */}
      <div className="space-y-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
          <span>Core Humanitarian Programmes</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROGRAMS.slice(1).map(prog => {
            const Icon = prog.icon;
            return (
              <div 
                key={prog.id}
                className="page-panel page-panel--interactive bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-sky-300 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {prog.title}
                </h4>
                <p className="text-xs font-bold text-rose-600 mt-1 font-mono">{prog.count}</p>
                <p className="text-[11px] text-slate-500 mt-2 leading-snug">
                  Multi-year sustainable community transformation projects delivering lasting independence.
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Large Photography Field Photo Essays */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Frontline Dispatches & Photo Essays</span>
          </h2>
          <button
            onClick={() => setActiveTab('feed')}
            className="text-xs font-bold text-rose-600 hover:underline"
          >
            View all photo dispatches in Feed →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FIELD_STORIES.map((story, i) => (
            <div key={i} className="page-panel page-panel--interactive bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <MapPin className="w-2.5 h-2.5 text-rose-400" />
                  <span>{story.region}</span>
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {story.impact}
                  </p>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs italic text-amber-950 font-serif">
                  {story.quote}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
