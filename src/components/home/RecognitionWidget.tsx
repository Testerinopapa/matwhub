import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Sparkles, Heart, Plus, ArrowRight, ShieldCheck } from 'lucide-react';

export const RecognitionWidget: React.FC = () => {
  const { posts, setActiveTab, setIsRecogniseModalOpen } = useApp();

  const recognitionPosts = posts.filter(p => p.type === 'recognition');
  const latestRecognition = recognitionPosts[0];

  return (
    <div className="bg-gradient-to-br from-amber-50/60 via-white to-rose-50/40 rounded-2xl border border-amber-200/70 p-5 shadow-sm space-y-3.5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-200/50 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-sm">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-950">
              Colleague Recognition & Kudos
            </h3>
            <span className="text-[10px] text-amber-800/80">Celebrating our frontline & back-office heroes</span>
          </div>
        </div>
        <button
          onClick={() => setIsRecogniseModalOpen(true)}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-white px-2.5 py-1 rounded-lg border border-rose-200 shadow-xs flex items-center space-x-1"
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Recognise</span>
        </button>
      </div>

      {/* Latest Spotlight Card */}
      {latestRecognition ? (
        <div 
          onClick={() => setActiveTab('recognition')}
          className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-amber-200/60 hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-start space-x-3">
            <div className="relative">
              <img 
                src={latestRecognition.recognition_details?.recipient.avatar || latestRecognition.author.avatar} 
                alt="" 
                className="w-10 h-10 rounded-full object-cover border-2 border-amber-400"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-0.5">
                <Sparkles className="w-2.5 h-2.5" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors truncate">
                  {latestRecognition.recognition_details?.recipient.name}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 uppercase">
                  {latestRecognition.recognition_details?.badge_title || 'Hero'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium line-clamp-1">
                "{latestRecognition.recognition_details?.achievement}"
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Nominated by {latestRecognition.author.name} • {latestRecognition.published_at}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-xs text-slate-500 bg-white/50 rounded-xl">
          Be the first to recognise a deserving colleague this week!
        </div>
      )}

      {/* View All & Kudos Button */}
      <button
        onClick={() => setActiveTab('recognition')}
        className="w-full py-2 text-center text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100/60 hover:bg-amber-100 rounded-xl transition-colors border border-amber-200/60 flex items-center justify-center space-x-1"
      >
        <span>View Kudos Wall & Leaderboard</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
};
