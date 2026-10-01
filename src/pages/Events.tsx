import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventItem, RSVPStatus } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  Check, 
  Plus, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Filter
} from 'lucide-react';

export const Events: React.FC = () => {
  const { events, rsvpEvent } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const filteredEvents = events.filter(e => {
    if (selectedCategory !== 'all' && e.category !== selectedCategory) return false;
    return true;
  });

  const CATEGORIES = [
    { id: 'all', label: 'All Events' },
    { id: 'Town Hall', label: 'Town Halls' },
    { id: 'Field Mission', label: 'Field Missions' },
    { id: 'Campaign Launch', label: 'Campaign Launches' },
    { id: 'Training', label: 'Workshops & Training' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-[#0C2340] rounded-2xl p-6 text-white border border-[#1b3a63] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-sky-300">
              Global Organisational Calendar
            </span>
          </div>
          <h1 className="text-2xl font-black mt-1">MATW Events & Town Halls</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            RSVP for global town halls, field logistics briefings, campaign rollouts, and employee wellbeing sessions.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'list' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Upcoming List
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'calendar' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Calendar Grid
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === c.id
                ? 'bg-rose-600 text-white shadow-xs font-bold'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* List View */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredEvents.map(event => {
            const startDate = new Date(event.start_time);
            const month = startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const day = startDate.toLocaleDateString('en-US', { day: 'numeric' });
            const weekday = startDate.toLocaleDateString('en-US', { weekday: 'short' });
            const time = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                {/* Date & Details */}
                <div className="flex items-start space-x-4 min-w-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#0C2340] text-white flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">{month}</span>
                    <span className="text-2xl font-black">{day}</span>
                    <span className="text-[9px] text-slate-400">{weekday}</span>
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-100">
                        {event.category}
                      </span>
                      {event.featured && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          ⭐ Mandatory All-Hands
                        </span>
                      )}
                    </div>

                    <h3 
                      onClick={() => setSelectedEvent(event)}
                      className="text-base font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      {event.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 max-w-2xl leading-relaxed">
                      {event.description}
                    </p>

                    <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{time}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        {event.location_type === 'virtual' ? (
                          <>
                            <Video className="w-3.5 h-3.5 text-sky-500" />
                            <span>Virtual Live Broadcast</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3.5 h-3.5 text-rose-500" />
                            <span>{event.location_name}</span>
                          </>
                        )}
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-700">{event.rsvp_counts.going} attending</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* RSVP Status Buttons */}
                <div className="flex items-center space-x-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 flex-shrink-0">
                  <button
                    onClick={() => rsvpEvent(event.id, 'going')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                      event.user_rsvp === 'going'
                        ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/20'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700'
                    }`}
                  >
                    {event.user_rsvp === 'going' && <Check className="w-3.5 h-3.5" />}
                    <span>{event.user_rsvp === 'going' ? 'Attending' : 'Attend'}</span>
                  </button>

                  <button
                    onClick={() => rsvpEvent(event.id, 'maybe')}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      event.user_rsvp === 'maybe'
                        ? 'bg-amber-500 text-white font-bold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Maybe
                  </button>

                  <button
                    onClick={() => rsvpEvent(event.id, 'declined')}
                    className={`px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      event.user_rsvp === 'declined'
                        ? 'bg-slate-800 text-white font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-400'
                    }`}
                  >
                    Decline
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Calendar Grid View */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-base text-slate-900">October 2026</h3>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Town Hall</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span>Campaign</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Training</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 py-1">
            <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs">
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
              const hasEvents = day === 4 || day === 8 || day === 14 || day === 18;
              return (
                <div 
                  key={day}
                  className={`min-h-[70px] p-1.5 rounded-xl border transition-all text-left flex flex-col justify-between ${
                    hasEvents 
                      ? 'border-sky-300 bg-sky-50/40 shadow-xs' 
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <span className={`font-mono text-[11px] font-bold ${hasEvents ? 'text-rose-600' : 'text-slate-500'}`}>
                    {day}
                  </span>
                  {hasEvents && (
                    <div className="space-y-0.5">
                      <span className="block text-[9px] font-bold bg-rose-600 text-white px-1 rounded truncate">
                        {day === 8 ? 'Town Hall' : day === 4 ? 'Gaza Briefing' : 'Workshop'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 bg-[#0C2340] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 bg-sky-900/60 px-2 py-0.5 rounded">
                  {selectedEvent.category}
                </span>
                <h3 className="font-extrabold text-base mt-1 text-white">{selectedEvent.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-slate-600 text-sm leading-relaxed">{selectedEvent.description}</p>
              
              <div className="space-y-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span className="font-semibold text-slate-800">{selectedEvent.location_name}</span>
                </div>
                {selectedEvent.meeting_url && (
                  <div className="flex items-center space-x-2">
                    <Video className="w-4 h-4 text-sky-500" />
                    <a href={selectedEvent.meeting_url} target="_blank" rel="noreferrer" className="text-sky-700 font-bold hover:underline">
                      Join Live Broadcast Stream ({selectedEvent.meeting_url})
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500">
                  Organized by: <strong>{selectedEvent.organizer.name}</strong>
                </span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {selectedEvent.rsvp_counts.going} Attending
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
