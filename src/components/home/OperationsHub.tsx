import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ACTIVE_FIELD_DEPLOYMENTS, STAFF_MEMBERS } from '../../data/mockData';
import { RSVPStatus } from '../../types';
import { 
  Globe, 
  Radio, 
  Calendar, 
  Clock, 
  Award, 
  Sparkles, 
  BookOpen, 
  Download, 
  Check, 
  Play, 
  Quote, 
  ShieldCheck, 
  FolderArchive,
  Star,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OperationsHub: React.FC = () => {
  const { 
    events, 
    rsvpEvent, 
    posts, 
    resources, 
    setActiveTab, 
    setIsRecogniseModalOpen 
  } = useApp();

  const [activeSegment, setActiveSegment] = useState<'radar' | 'events' | 'kudos' | 'toolkit'>('radar');
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 22) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const nextEvent = events[0];
  const recognitionPosts = posts.filter(p => p.type === 'recognition');
  const latestRecognition = recognitionPosts[0];
  const featuredResources = resources.filter(r => r.is_featured).slice(0, 3);

  const handleCelebrate = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleRsvp = (e: React.MouseEvent, eventId: string, status: RSVPStatus) => {
    e.stopPropagation();
    rsvpEvent(eventId, status);
  };

  const getDaysUntil = (dateStr: string) => {
    const diffTime = new Date(dateStr).getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  return (
    <div className="space-y-5">
      
      {/* 1. Integrated Operations Command Center */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        
        {/* Hub Header & Segmented Controller */}
        <div className="p-4 bg-[#0C2340] text-white border-b border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                Operations Command Hub
              </h3>
            </div>
            <span className="text-[11px] text-slate-300 font-medium">
              {utcTime || 'Live UTC'}
            </span>
          </div>

          {/* Segment Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-700/60 text-xs">
            <button
              onClick={() => setActiveSegment('radar')}
              className={`py-1.5 px-2 rounded-lg font-semibold transition-all text-center truncate ${
                activeSegment === 'radar'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Field radar
            </button>
            <button
              onClick={() => setActiveSegment('events')}
              className={`py-1.5 px-2 rounded-lg font-semibold transition-all text-center truncate ${
                activeSegment === 'events'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Town halls
            </button>
            <button
              onClick={() => setActiveSegment('kudos')}
              className={`py-1.5 px-2 rounded-lg font-semibold transition-all text-center truncate ${
                activeSegment === 'kudos'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Kudos
            </button>
            <button
              onClick={() => setActiveSegment('toolkit')}
              className={`py-1.5 px-2 rounded-lg font-semibold transition-all text-center truncate ${
                activeSegment === 'toolkit'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Toolkits
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="p-4">
          
          {/* Panel 1: Field Radar */}
          {activeSegment === 'radar' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                <span>Active frontline bureaus</span>
                <button 
                  onClick={() => setActiveTab('impact')}
                  className="font-semibold text-rose-600 hover:underline"
                >
                  View full world map
                </button>
              </div>

              <div className="space-y-2">
                {ACTIVE_FIELD_DEPLOYMENTS.slice(0, 4).map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveTab('impact')}
                    className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${item.badgeColor}`} />
                        <span className="text-xs font-bold text-slate-800 truncate">
                          {item.country}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {item.teams} teams
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate pl-4 mt-0.5">
                        {item.focus}
                      </p>
                    </div>

                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex-shrink-0 ml-2">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>Total humanitarian missions:</span>
                </span>
                <span className="font-bold text-slate-900">142 ongoing</span>
              </div>
            </div>
          )}

          {/* Panel 2: Upcoming Town Halls & Briefings */}
          {activeSegment === 'events' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              {nextEvent ? (
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                      Next up: {getDaysUntil(nextEvent.start_time)}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {nextEvent.rsvp_counts.going} attending
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {nextEvent.title}
                  </h4>

                  <div className="text-xs text-slate-500 space-y-1">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {new Date(nextEvent.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {new Date(nextEvent.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                      </span>
                    </div>
                    <div>
                      {nextEvent.location_type === 'virtual' ? 'Virtual broadcast' : nextEvent.location_name}
                    </div>
                  </div>

                  {/* Attendance Controls */}
                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Response: <strong className="text-slate-800 capitalize">{nextEvent.user_rsvp || 'Unconfirmed'}</strong>
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => handleRsvp(e, nextEvent.id, 'going')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-colors flex items-center space-x-1 ${
                          nextEvent.user_rsvp === 'going'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {nextEvent.user_rsvp === 'going' && <Check className="w-3 h-3" />}
                        <span>Attend</span>
                      </button>
                      <button
                        onClick={(e) => handleRsvp(e, nextEvent.id, 'maybe')}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                          nextEvent.user_rsvp === 'maybe'
                            ? 'bg-amber-500 text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        Maybe
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              <button
                onClick={() => setActiveTab('events')}
                className="w-full py-2 text-center text-xs font-semibold text-sky-700 hover:text-sky-800 bg-sky-50 rounded-xl transition-colors"
              >
                Open full events calendar ({events.length} scheduled)
              </button>
            </div>
          )}

          {/* Panel 3: Colleague Recognition & Kudos */}
          {activeSegment === 'kudos' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Recent honor</span>
                <button
                  onClick={() => setIsRecogniseModalOpen(true)}
                  className="text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-lg transition-colors flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  <span>+ Give kudos</span>
                </button>
              </div>

              {latestRecognition && (
                <div className="bg-[#FFFDF9] p-3.5 rounded-xl border border-amber-200/80 space-y-2.5">
                  <div className="flex items-center space-x-2.5">
                    <img 
                      src={latestRecognition.recognition_details?.recipient.avatar || latestRecognition.author.avatar} 
                      alt="" 
                      className="w-9 h-9 rounded-full object-cover border border-amber-300"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {latestRecognition.recognition_details?.recipient.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {latestRecognition.recognition_details?.recipient.job_title}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-amber-950 bg-amber-50/60 p-2.5 rounded-lg border border-amber-100 leading-relaxed">
                    "{latestRecognition.recognition_details?.achievement}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-amber-900">
                    <span>From {latestRecognition.author.name}</span>
                    <button
                      onClick={handleCelebrate}
                      className="px-2 py-0.5 bg-white hover:bg-amber-100 rounded text-xs font-semibold border border-amber-200 transition-colors"
                    >
                      🎉 Celebrate
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={() => setActiveTab('recognition')}
                className="w-full py-2 text-center text-xs font-semibold text-amber-900 bg-amber-50 rounded-xl transition-colors"
              >
                View recognition wall
              </button>
            </div>
          )}

          {/* Panel 4: Toolkits & Brand Assets */}
          {activeSegment === 'toolkit' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div 
                onClick={() => setActiveTab('resources')}
                className="bg-[#0C2340] rounded-xl p-3 text-white flex items-center justify-between cursor-pointer hover:bg-[#0e294b] transition-all"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-rose-400 flex-shrink-0">
                    <FolderArchive className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">
                      Brand & Media Kit 2026
                    </h5>
                    <span className="text-[11px] text-slate-300">SVG logos, vectors & guidelines (145 MB)</span>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-300 ml-2 flex-shrink-0" />
              </div>

              <div className="space-y-1.5">
                {featuredResources.map(res => (
                  <div
                    key={res.id}
                    onClick={() => setActiveTab('resources')}
                    className="p-2 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center space-x-2 min-w-0">
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {res.file_type}
                      </span>
                      <span className="text-xs font-medium text-slate-800 truncate">
                        {res.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 ml-2 flex-shrink-0">
                      {res.file_size}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab('resources')}
                className="w-full py-2 text-center text-xs font-semibold text-sky-700 bg-sky-50 rounded-xl transition-colors"
              >
                Browse complete resource library
              </button>
            </div>
          )}

        </div>

      </div>

      {/* 2. Reverent Ali Banat Founder Legacy Card */}
      <div className="bg-[#08182D] rounded-2xl border border-slate-800 text-white p-5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-bold text-xs text-white">
              Founder legacy & trust
            </span>
          </div>
          <button
            onClick={() => setActiveTab('leadership')}
            className="text-xs font-semibold text-sky-300 hover:text-white transition-colors"
          >
            Reflections
          </button>
        </div>

        <div 
          onClick={() => setActiveTab('leadership')}
          className="relative rounded-xl overflow-hidden border border-slate-700 group cursor-pointer"
        >
          <img 
            src="/images/matw/admin-image-1764514998420.jpeg" 
            alt="Brother Ali Banat" 
            className="w-full h-32 object-cover object-center group-hover:scale-102 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D9222A] text-white flex items-center justify-center flex-shrink-0">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  "Gifted with Cancer: The Sacred Trust"
                </p>
                <span className="text-[11px] text-slate-300">Brother Ali Banat • 10M+ views</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <p className="italic">
            "Every single parcel packed is an act of worship and a trust. As One Team, our 100% Zakat guarantee is not merely a policy — it is our eternal legacy."
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-white">Dr. Mahmoud Al-Husseini, CEO</span>
            <span className="text-emerald-400 font-medium flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>100% policy</span>
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
