import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, Check, Plus, Video, Users, ArrowRight } from 'lucide-react';
import { RSVPStatus } from '../../types';

export const UpcomingEventsWidget: React.FC = () => {
  const { events, rsvpEvent, setActiveTab } = useApp();

  const handleRsvp = (e: React.MouseEvent, eventId: string, status: RSVPStatus) => {
    e.stopPropagation();
    rsvpEvent(eventId, status);
  };

  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
              Upcoming Events & Town Halls
            </h3>
            <span className="text-[10px] text-slate-400">RSVP & global broadcast links</span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('events')}
          className="text-xs font-bold text-sky-700 hover:text-sky-800"
        >
          View All ({events.length})
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {upcomingEvents.map(event => {
          const startDate = new Date(event.start_time);
          const monthStr = startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
          const dayStr = startDate.toLocaleDateString('en-US', { day: 'numeric' });
          const timeStr = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

          return (
            <div
              key={event.id}
              onClick={() => setActiveTab('events')}
              className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all cursor-pointer group"
            >
              <div className="flex items-start space-x-3">
                
                {/* Date Block */}
                <div className="w-11 h-12 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-[9px] font-bold text-rose-400 tracking-wider leading-none">
                    {monthStr}
                  </span>
                  <span className="text-base font-black leading-tight">
                    {dayStr}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 mb-1">
                    {event.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-1">
                    {event.title}
                  </h4>
                  <div className="mt-1 flex items-center space-x-2 text-[10px] text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{timeStr}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1 truncate">
                      {event.location_type === 'virtual' ? (
                        <>
                          <Video className="w-3 h-3 text-sky-500" />
                          <span>Virtual Broadcast</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3 h-3 text-amber-500" />
                          <span className="truncate">{event.location_name.split('&')[0]}</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

              </div>

              {/* Instant RSVP Bar */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-medium">
                  {event.rsvp_counts.going} team members going
                </span>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => handleRsvp(e, event.id, 'going')}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-all flex items-center space-x-0.5 ${
                      event.user_rsvp === 'going'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700'
                    }`}
                  >
                    {event.user_rsvp === 'going' && <Check className="w-2.5 h-2.5" />}
                    <span>{event.user_rsvp === 'going' ? 'Going' : 'Attend'}</span>
                  </button>

                  <button
                    onClick={(e) => handleRsvp(e, event.id, 'maybe')}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition-all ${
                      event.user_rsvp === 'maybe'
                        ? 'bg-amber-500 text-white font-bold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    Maybe
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      <button
        onClick={() => setActiveTab('events')}
        className="w-full py-2 text-center text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50/50 hover:bg-sky-50 rounded-xl transition-colors border border-sky-100 flex items-center justify-center space-x-1"
      >
        <span>Open Events Calendar</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
};
