import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  Video, 
  Users, 
  ArrowRight, 
  Bell, 
  Radio, 
  Sparkles 
} from 'lucide-react';
import { RSVPStatus } from '../../types';

export const UpcomingEventsWidget: React.FC = () => {
  const { events, rsvpEvent, setActiveTab } = useApp();

  const handleRsvp = (e: React.MouseEvent, eventId: string, status: RSVPStatus) => {
    e.stopPropagation();
    rsvpEvent(eventId, status);
  };

  const nextEvent = events[0];
  const otherUpcomingEvents = events.slice(1, 3);

  // Calculate days until next event
  const getDaysUntil = (dateStr: string) => {
    const diffTime = new Date(dateStr).getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:shadow-md">
      
      {/* Widget Header with MATW Brand Identity */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-[#0C2340] to-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-white">
              Town Halls & Field Briefings
            </h3>
            <span className="text-[10px] text-sky-200 font-medium">All-Hands & Mission Rollouts</span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('events')}
          className="text-xs font-bold text-sky-300 hover:text-white flex items-center space-x-1 group"
        >
          <span>All ({events.length})</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Next Immediate Happening - Spotlight Card */}
        {nextEvent && (
          <div 
            onClick={() => setActiveTab('events')}
            className="relative bg-gradient-to-br from-rose-50/70 via-white to-amber-50/40 rounded-xl p-3.5 border-2 border-rose-200/80 shadow-xs hover:border-rose-300 cursor-pointer group transition-all"
          >
            {/* Top row: urgency countdown pill */}
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                <span>Next Up • {getDaysUntil(nextEvent.start_time)}</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 flex items-center space-x-1">
                <Users className="w-3 h-3 text-rose-500" />
                <span>{nextEvent.rsvp_counts.going} attending</span>
              </span>
            </div>

            {/* Title & timing */}
            <h4 className="text-xs font-black text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-1">
              {nextEvent.title}
            </h4>

            <div className="mt-1.5 flex items-center space-x-3 text-[10px] text-slate-500">
              <span className="flex items-center space-x-1 font-semibold text-slate-700">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>
                  {new Date(nextEvent.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {new Date(nextEvent.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                </span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 truncate font-medium">
                {nextEvent.location_type === 'virtual' ? (
                  <>
                    <Video className="w-3 h-3 text-sky-600" />
                    <span className="text-sky-700 font-semibold">Virtual Live Stream</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-3 h-3 text-amber-600" />
                    <span className="truncate">{nextEvent.location_name}</span>
                  </>
                )}
              </span>
            </div>

            {/* Quick RSVP CTA within card */}
            <div className="mt-3 pt-2.5 border-t border-rose-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-medium">
                Your Status: <strong className="text-slate-800 uppercase">{nextEvent.user_rsvp || 'Unconfirmed'}</strong>
              </span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={(e) => handleRsvp(e, nextEvent.id, 'going')}
                  className={`text-[10px] px-2.5 py-1 rounded-lg font-bold transition-all flex items-center space-x-1 ${
                    nextEvent.user_rsvp === 'going'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <Check className="w-2.5 h-2.5" />
                  <span>{nextEvent.user_rsvp === 'going' ? 'Attending' : 'I will attend'}</span>
                </button>
                <button
                  onClick={(e) => handleRsvp(e, nextEvent.id, 'maybe')}
                  className={`text-[10px] px-2 py-1 rounded-lg font-medium transition-all ${
                    nextEvent.user_rsvp === 'maybe'
                      ? 'bg-amber-500 text-white font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  Maybe
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Other Upcoming Events - Compact Clean Stream */}
        <div className="space-y-2">
          {otherUpcomingEvents.map(event => {
            const startDate = new Date(event.start_time);
            const monthStr = startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const dayStr = startDate.toLocaleDateString('en-US', { day: 'numeric' });
            const timeStr = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

            return (
              <div
                key={event.id}
                onClick={() => setActiveTab('events')}
                className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all cursor-pointer group flex items-center justify-between space-x-3"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  {/* Compact date block */}
                  <div className="w-9 h-10 rounded-lg bg-slate-100 group-hover:bg-[#0C2340] group-hover:text-white text-slate-700 flex flex-col items-center justify-center flex-shrink-0 transition-colors">
                    <span className="text-[8px] font-bold text-rose-500 group-hover:text-rose-400 uppercase leading-none">
                      {monthStr}
                    </span>
                    <span className="text-xs font-black leading-tight">
                      {dayStr}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors truncate">
                      {event.title}
                    </h5>
                    <p className="text-[10px] text-slate-400 flex items-center space-x-1.5 truncate">
                      <span>{timeStr}</span>
                      <span>•</span>
                      <span>{event.category}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => handleRsvp(e, event.id, event.user_rsvp === 'going' ? 'declined' : 'going')}
                  className={`text-[10px] px-2 py-1 rounded-md font-bold transition-all flex-shrink-0 ${
                    event.user_rsvp === 'going'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 bg-slate-50'
                  }`}
                >
                  {event.user_rsvp === 'going' ? '✓ Going' : '+ RSVP'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Action link */}
        <button
          onClick={() => setActiveTab('events')}
          className="w-full py-2 text-center text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50/60 hover:bg-sky-50 rounded-xl transition-colors border border-sky-100 flex items-center justify-center space-x-1"
        >
          <span>Open Full Interactive Calendar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
