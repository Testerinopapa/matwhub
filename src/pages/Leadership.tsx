import React from 'react';
import { useApp } from '../context/AppContext';
import { STAFF_MEMBERS } from '../data/mockData';
import { PostCard } from '../components/feed/PostCard';
import { 
  Quote, 
  Play, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Compass, 
  Award,
  Video,
  FileText
} from 'lucide-react';

export const Leadership: React.FC = () => {
  const { posts } = useApp();

  const leadershipPosts = posts.filter(p => p.type === 'leadership');

  const STRATEGIC_PRIORITIES = [
    {
      num: '01',
      title: 'Uncompromised 100% Zakat Integrity',
      desc: 'Ensuring zero administrative dilution on Zakat funds, tracked down to the individual family receipt.',
      tag: 'Sacred Covenant'
    },
    {
      num: '02',
      title: 'Rapid Emergency Deployment Corridors',
      desc: 'Strengthening permanent air and land transit corridors across Jordan, Egypt, and Lebanon to respond in under 24 hours.',
      tag: 'Crisis Preparedness'
    },
    {
      num: '03',
      title: 'Sustainable Water & Infrastructure',
      desc: 'Transitioning from short-term water trucking to solar-powered deep aquifer boreholes serving entire districts for decades.',
      tag: 'Generational Impact'
    },
    {
      num: '04',
      title: 'One Team Staff Wellbeing & Field Safety',
      desc: 'Providing specialized clinical trauma counselling, competitive hardship benefits, and top-tier security for all deployed personnel.',
      tag: 'People First'
    }
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto animate-in fade-in duration-200">
      
      {/* Top Banner with Ali Banat Tribute */}
      <div className="page-hero-panel page-hero-panel--leadership relative rounded-3xl overflow-hidden bg-[#0C2340] text-white border border-[#1b3a63] p-8 sm:p-12 shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src="/images/matw/admin-image-1764514998420.jpeg" 
            alt="Ali Banat Legacy" 
            className="w-full h-full object-cover object-top opacity-30 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C2340] via-[#0C2340]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border border-amber-400/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Executive & Legacy Corner</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            "Gifted With A Purpose" <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-sky-300">
              Guiding Our One Team Every Day
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Direct communication, strategic reflections, and mission priorities from CEO Dr. Mahmoud Al-Husseini and global bureau executives.
          </p>

          <div className="pt-2 flex items-center space-x-3 text-xs">
            <span className="bg-sky-500/20 text-sky-300 px-3 py-1.5 rounded-lg border border-sky-400/30 font-semibold">
              ✦ Ali Banat Legacy Trust
            </span>
            <span className="bg-rose-500/20 text-rose-300 px-3 py-1.5 rounded-lg border border-rose-400/30 font-semibold">
              ✦ Executive Transparency
            </span>
          </div>
        </div>
      </div>

      {/* Strategy compass */}
      <section className="leadership-compass" aria-labelledby="leadership-compass-title">
        <div className="leadership-compass__copy">
          <span className="leadership-compass__eyebrow">The 2026 compass</span>
          <h2 id="leadership-compass-title">A mission with four directions.</h2>
          <p>Leadership is not a distant broadcast. It is the shared orientation behind every decision made in the field.</p>
        </div>
        <div className="leadership-compass__diagram" aria-hidden="true">
          <span className="leadership-compass__cross leadership-compass__cross--horizontal" />
          <span className="leadership-compass__cross leadership-compass__cross--vertical" />
          <span className="leadership-compass__point leadership-compass__point--north">INTEGRITY<small>100% Zakat</small></span>
          <span className="leadership-compass__point leadership-compass__point--east">SPEED<small>Under 24 hours</small></span>
          <span className="leadership-compass__point leadership-compass__point--south">LEGACY<small>For decades</small></span>
          <span className="leadership-compass__point leadership-compass__point--west">PEOPLE<small>Field safety</small></span>
          <span className="leadership-compass__needle"><Compass className="h-5 w-5" /><strong>ONE TEAM</strong></span>
        </div>
      </section>

      {/* 2026 Strategic Priorities Grid */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
            2026 Strategic Mission Priorities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STRATEGIC_PRIORITIES.map((p, i) => (
            <div 
              key={i}
              className="page-panel page-panel--interactive bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-2xl font-black text-slate-300">{p.num}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100">
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{p.title}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{p.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Executive Metric</span>
                <span className="font-semibold text-emerald-600">Active Priority</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Dispatches & Video Messages */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span>Executive Reflections & CEO Updates ({leadershipPosts.length})</span>
          </h2>
        </div>

        <div className="space-y-5">
          {leadershipPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

    </div>
  );
};
