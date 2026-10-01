import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STAFF_MEMBERS } from '../data/mockData';
import { 
  Award, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Star, 
  Users, 
  Plus, 
  ThumbsUp, 
  Send,
  Trophy
} from 'lucide-react';
import { PostCard } from '../components/feed/PostCard';

export const Recognition: React.FC = () => {
  const { posts, setIsRecogniseModalOpen } = useApp();

  // Filter posts that are recognitions
  const recognitionPosts = posts.filter(p => p.type === 'recognition');

  const LEADERBOARD = [
    { staff: STAFF_MEMBERS.tariq, kudos: 35, title: 'Frontline Anchor' },
    { staff: STAFF_MEMBERS.ceo, kudos: 28, title: 'Servant Leader' },
    { staff: STAFF_MEMBERS.zayd, kudos: 22, title: 'Logistics Pillar' },
    { staff: STAFF_MEMBERS.fatima, kudos: 19, title: 'Creative Champion' },
    { staff: STAFF_MEMBERS.maryam, kudos: 16, title: 'People & Culture Heart' },
    { staff: STAFF_MEMBERS.sarah, kudos: 14, title: 'Voice of MATW' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-[#0C2340] rounded-2xl p-6 sm:p-8 text-white border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300"></span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-200">
              One Team • Celebration & Culture
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Colleague Recognition & Kudos Wall</h1>
          <p className="text-xs sm:text-sm text-amber-100">
            A dedicated space celebrating the remarkable people who bring Ali Banat’s vision to life every day.
          </p>
        </div>

        <button
          onClick={() => setIsRecogniseModalOpen(true)}
          className="bg-white hover:bg-amber-50 text-rose-700 font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center space-x-2 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Recognise a Colleague</span>
        </button>
      </div>

      {/* Grid: Recognition Feed (Left) & Kudos Leaderboard (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recognition Wall Posts (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
              <span>Recent Team Kudos & Spotlights ({recognitionPosts.length})</span>
            </h2>
            <span className="text-xs text-slate-500">Live across Hub Home and Feed</span>
          </div>

          {recognitionPosts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <Award className="w-12 h-12 text-amber-400 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-800">No Kudos Awarded Yet</h3>
              <p className="text-xs text-slate-500 mt-1">
                Be the first to celebrate a colleague today!
              </p>
              <button
                onClick={() => setIsRecogniseModalOpen(true)}
                className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold"
              >
                + Give Kudos
              </button>
            </div>
          ) : (
            recognitionPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>

        {/* Kudos Leaderboard & Badges (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recognition Badges Library */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>MATW Recognition Badges</span>
            </h3>
            <p className="text-[11px] text-slate-500 leading-snug">
              Special emblems awarded to employees for demonstrating exceptional values:
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 flex items-center space-x-3">
                <Heart className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <div>
                  <span className="font-bold text-rose-950 block">Compassion In Action</span>
                  <span className="text-[10px] text-rose-800">Empathy on frontline corridors</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-sky-600 flex-shrink-0" />
                <div>
                  <span className="font-bold text-sky-950 block">Frontline Hero</span>
                  <span className="text-[10px] text-sky-800">Courage under high crisis pressure</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center space-x-3">
                <Users className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="font-bold text-emerald-950 block">Teamwork Anchor</span>
                  <span className="text-[10px] text-emerald-800">Unsung pillar supporting all departments</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 flex items-center space-x-3">
                <Star className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <span className="font-bold text-amber-950 block">Sincerity & Legacy</span>
                  <span className="text-[10px] text-amber-800">Living Ali Banat’s sacred trust</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quarterly Leaderboard */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Kudos Leaderboard (Q4)
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">All-Time</span>
            </div>

            <div className="space-y-2.5">
              {LEADERBOARD.map((item, index) => (
                <div key={item.staff.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <span className={`w-5 text-center font-mono font-bold text-xs ${
                      index === 0 ? 'text-amber-500' : index === 1 ? 'text-slate-400' : 'text-slate-300'
                    }`}>
                      #{index + 1}
                    </span>
                    <img 
                      src={item.staff.avatar} 
                      alt="" 
                      className="w-7 h-7 rounded-full object-cover border border-slate-200" 
                    />
                    <div>
                      <p className="font-bold text-slate-900">{item.staff.name}</p>
                      <p className="text-[10px] text-slate-400">{item.title}</p>
                    </div>
                  </div>

                  <span className="font-black text-rose-600 font-mono bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                    {item.kudos} Kudos
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
