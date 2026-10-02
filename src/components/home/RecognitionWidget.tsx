import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Sparkles, Star } from 'lucide-react';
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
    <div className="bg-[#FFFDF9] rounded-2xl border border-amber-200/80 p-5 shadow-2xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-100 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-amber-950">
              Colleague recognition
            </h3>
            <span className="text-[11px] text-amber-800/80">Celebrating team dedication</span>
          </div>
        </div>
        <button
          onClick={() => setIsRecogniseModalOpen(true)}
          className="text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200/80 px-2.5 py-1 rounded-lg transition-colors flex items-center space-x-1"
        >
          <Sparkles className="w-3 h-3 text-amber-700" />
          <span>Give kudos</span>
        </button>
      </div>

      {/* Latest Spotlight Card */}
      {latestRecognition ? (
        <div 
          onClick={() => setActiveTab('recognition')}
          className="bg-white p-3.5 rounded-xl border border-amber-200 hover:border-amber-300 transition-all cursor-pointer space-y-2.5"
        >
          <div className="flex items-start space-x-3">
            <div className="relative flex-shrink-0">
              <img 
                src={latestRecognition.recognition_details?.recipient.avatar || latestRecognition.author.avatar} 
                alt="" 
                className="w-10 h-10 rounded-full object-cover border border-amber-300"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-0.5">
                <Star className="w-2.5 h-2.5 fill-current" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {latestRecognition.recognition_details?.recipient.name}
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                  {latestRecognition.recognition_details?.badge_title || 'Hero'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                {latestRecognition.recognition_details?.recipient.job_title} ({latestRecognition.recognition_details?.recipient.location})
              </p>
            </div>
          </div>

          <div className="bg-amber-50/60 rounded-lg p-2.5 border border-amber-100">
            <p className="text-xs text-amber-950 leading-relaxed">
              "{latestRecognition.recognition_details?.achievement}"
            </p>
            <div className="mt-2 flex items-center justify-between text-[11px] text-amber-800">
              <span>Nominated by {latestRecognition.author.name}</span>
              <button
                onClick={handleCelebrate}
                className="px-2 py-0.5 bg-white hover:bg-amber-100 rounded text-xs font-semibold text-amber-900 border border-amber-200 transition-colors"
              >
                Celebrate
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-xs text-slate-500 bg-white rounded-xl border border-dashed border-amber-200">
          Recognise a colleague's impact this week.
        </div>
      )}

      {/* Footer Link */}
      <button
        onClick={() => setActiveTab('recognition')}
        className="w-full py-2 text-center text-xs font-semibold text-amber-900 hover:text-amber-950 bg-amber-50 hover:bg-amber-100/80 rounded-xl transition-colors"
      >
        View full kudos wall and leaderboard
      </button>

    </div>
  );
};
