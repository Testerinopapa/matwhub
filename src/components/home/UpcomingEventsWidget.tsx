import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  Video, 
  Users, 
  Radio 
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

  const getDaysUntil = (dateStr: string) => {
    const diffTime = new Date(dateStr).getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      
      {/* Widget Header */}
      <div className="p-4 bg-[#0C2340] text-white flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-rose-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-white">
              Town halls & field briefings
            </h3>
            <span className="text-[11px] text-slate-300">All-hands and mission rollouts</span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('events')}
          className="text-xs font-semibold text-sky-300 hover:text-white transition-colors"
        >
          View all ({events.length})
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Spotlight Next Immediate Event */}
        {nextEvent && (
          <div 
            onClick={() => setActiveTab('events')}
            className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200 hover:border-slate-300 cursor-pointer transition-all space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                <span>Next up: {getDaysUntil(nextEvent.start_time)}</span>
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {nextEvent.rsvp_counts.going} attending
              </span>
            </div>

            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
              {nextEvent.title}
            </h4>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="font-medium text-slate-700">
                {new Date(nextEvent.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {new Date(nextEvent.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </span>
              <span>
                {nextEvent.location_type === 'virtual' ? 'Virtual live stream' : nextEvent.location_name}
              </span>
            </div>

            {/* Quick RSVP CTA within card */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                Your response: <strong className="text-slate-800 capitalize">{nextEvent.user_rsvp || 'Not yet responded'}</strong>
              </span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={(e) => handleRsvp(e, nextEvent.id, 'going')}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors flex items-center space-x-1 ${
                    nextEvent.user_rsvp === 'going'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {nextEvent.user_rsvp === 'going' && <Check className="w-3 h-3" />}
                  <span>{nextEvent.user_rsvp === 'going' ? 'Attending' : 'Attend'}</span>
                </button>
                <button
                  onClick={(e) => handleRsvp(e, nextEvent.id, 'maybe')}
                  className={`text-xs px-2 py-1 rounded-lg font-medium transition-colors ${
                    nextEvent.user_rsvp === 'maybe'
                      ? 'bg-amber-500 text-white font-semibold'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Maybe
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Other Upcoming Events */}
        <div className="space-y-2">
          {otherUpcomingEvents.map(event => {
            const startDate = new Date(event.start_time);
            const monthStr = startDate.toLocaleDateString('en-US', { month: 'short' });
            const dayStr = startDate.toLocaleDateString('en-US', { day: 'numeric' });
            const timeStr = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

            return (
              <div
                key={event.id}
                onClick={() => setActiveTab('events')}
                className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between space-x-3"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-rose-600 uppercase leading-none">
                      {monthStr}
                    </span>
                    <span className="text-xs font-extrabold leading-tight">
                      {dayStr}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 truncate">
                      {event.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 truncate">
                      {timeStr} • {event.category}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => handleRsvp(e, event.id, event.user_rsvp === 'going' ? 'declined' : 'going')}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors flex-shrink-0 ${
                    event.user_rsvp === 'going'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100 bg-slate-50 border border-slate-200'
                  }`}
                >
                  {event.user_rsvp === 'going' ? 'Attending' : 'RSVP'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Action Link (Clean, active voice, no trailing arrows) */}
        <button
          onClick={() => setActiveTab('events')}
          className="w-full py-2 text-center text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors"
        >
          Open monthly events calendar
        </button>

      </div>
    </div>
  );
};
