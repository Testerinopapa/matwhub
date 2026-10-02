import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Sparkles, Heart, Plus, ArrowRight, Flame, Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RecognitionWidget: React.FC = () => {
  const { posts, setActiveTab, setIsRecogniseModalOpen } = useApp();

  const recognitionPosts = posts.filter(p => p.type === 'recognition');
  const latestRecognition = recognitionPosts[0];

  const handleCelebrate = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-amber-50/40 to-rose-50/40 rounded-2xl border-2 border-amber-300/80 p-5 shadow-xs relative overflow-hidden group">
      
      {/* Subtle background medal watermark */}
      <Trophy className="absolute -bottom-4 -right-4 w-32 h-32 text-amber-500/5 rotate-12 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center shadow-xs">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-950">
              Colleague Kudos & Recognition
            </h3>
            <span className="text-[10px] text-amber-800/80 font-medium">Honouring our frontline heroes</span>
          </div>
        </div>
        <button
          onClick={() => setIsRecogniseModalOpen(true)}
          className="text-xs font-bold text-amber-900 bg-amber-200/70 hover:bg-amber-300/80 px-2.5 py-1 rounded-lg shadow-xs flex items-center space-x-1 transition-all"
        >
          <Sparkles className="w-3 h-3 text-amber-700" />
          <span>+ Give Kudos</span>
        </button>
      </div>

      {/* Latest Spotlight Card */}
      {latestRecognition ? (
        <div 
          onClick={() => setActiveTab('recognition')}
          className="mt-3.5 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-amber-200/80 hover:border-amber-300 shadow-xs transition-all cursor-pointer space-y-2.5"
        >
          <div className="flex items-start space-x-3">
            <div className="relative flex-shrink-0">
              <img 
                src={latestRecognition.recognition_details?.recipient.avatar || latestRecognition.author.avatar} 
                alt="" 
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-400 shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-0.5 shadow-xs">
                <Star className="w-2.5 h-2.5 fill-current" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900 group-hover:text-amber-800 transition-colors truncate">
                  {latestRecognition.recognition_details?.recipient.name}
                </h4>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wider">
                  {latestRecognition.recognition_details?.badge_title || 'Hero'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate font-medium">
                {latestRecognition.recognition_details?.recipient.job_title} • {latestRecognition.recognition_details?.recipient.location || 'Global Field'}
              </p>
            </div>
          </div>

          <div className="bg-amber-50/70 rounded-lg p-2.5 border border-amber-100/80">
            <p className="text-xs text-amber-950 font-medium italic leading-relaxed">
              "{latestRecognition.recognition_details?.achievement}"
            </p>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-amber-800/80">
              <span>Nominated by <strong>{latestRecognition.author.name}</strong></span>
              <button
                onClick={handleCelebrate}
                className="px-2 py-0.5 bg-white hover:bg-amber-100 rounded text-[10px] font-bold text-amber-900 border border-amber-200 flex items-center space-x-1 shadow-2xs transition-all active:scale-95"
              >
                <span>🎉 Celebrate</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 p-4 text-center text-xs text-slate-500 bg-white/60 rounded-xl">
          Be the first to recognise a colleague this week!
        </div>
      )}

      {/* Recognition Catalog Quick Showcase */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-amber-900 font-semibold px-1">
        <span className="flex items-center space-x-1">
          <Trophy className="w-3 h-3 text-amber-600" />
          <span>2026 MATW Honour Roll</span>
        </span>
        <button
          onClick={() => setActiveTab('recognition')}
          className="font-bold text-amber-800 hover:text-amber-950 hover:underline flex items-center space-x-0.5"
        >
          <span>View Wall & Badges</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
};
