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
  Filter,
  Sparkles,
  CalendarDays
} from 'lucide-react';

export const Events: React.FC = () => {
  const { events, rsvpEvent } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  
  // Calendar navigation state - initialized to October 2026 (matching mock data dates)
  const [calendarDate, setCalendarDate] = useState<Date>(new Date(2026, 9, 1));

  const filteredEvents = events.filter(e => {
    if (selectedCategory !== 'all' && e.category !== selectedCategory) return false;
    return true;
  });

  const CATEGORIES = [
    { id: 'all', label: 'All Events' },
    { id: 'Town Hall', label: 'Town Halls', color: 'bg-rose-500' },
    { id: 'Field Mission', label: 'Field Missions', color: 'bg-emerald-500' },
    { id: 'Campaign Launch', label: 'Campaign Launches', color: 'bg-sky-500' },
    { id: 'Training', label: 'Workshops & Training', color: 'bg-amber-500' },
  ];

  // Calendar calculations
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const monthName = calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday

  const prevMonth = () => {
    setCalendarDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCalendarDate(new Date(year, month + 1, 1));
  };

  const resetToCurrent = () => {
    setCalendarDate(new Date(2026, 9, 1));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      
      {/* Top Banner with MATW Mission Styling */}
      <div className="bg-gradient-to-r from-[#07172B] via-[#0C2340] to-slate-900 rounded-2xl p-6 text-white border border-[#1b3a63] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-sky-300">
              Global Operational Calendar
            </span>
          </div>
          <h1 className="text-2xl font-black mt-1 tracking-tight">MATW Events & Town Halls</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Stay connected across our global offices. RSVP for all-hands briefings, emergency field deployments, campaign previews, and wellbeing workshops.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-700/80 relative z-10 flex-shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              viewMode === 'list' 
                ? 'bg-rose-600 text-white shadow-xs' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>List View</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              viewMode === 'calendar' 
                ? 'bg-rose-600 text-white shadow-xs' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Monthly Grid</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              selectedCategory === c.id
                ? 'bg-[#0C2340] text-white shadow-xs font-bold'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c.color && <span className={`w-2 h-2 rounded-full ${c.color}`} />}
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* View Mode: List View */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredEvents.map(event => {
            const startDate = new Date(event.start_time);
            const monthStr = startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const dayStr = startDate.toLocaleDateString('en-US', { day: 'numeric' });
            const weekday = startDate.toLocaleDateString('en-US', { weekday: 'short' });
            const time = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                {/* Date & Details */}
                <div className="flex items-start space-x-4 min-w-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#0C2340] text-white flex flex-col items-center justify-center flex-shrink-0 shadow-sm border border-slate-700">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">{monthStr}</span>
                    <span className="text-2xl font-black">{dayStr}</span>
                    <span className="text-[9px] text-slate-300 uppercase">{weekday}</span>
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
                      <span className="flex items-center space-x-1 font-medium text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{time}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        {event.location_type === 'virtual' ? (
                          <>
                            <Video className="w-3.5 h-3.5 text-sky-500" />
                            <span className="text-sky-700 font-semibold">Virtual Live Broadcast</span>
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
        /* Calendar Grid View - Fully Dynamic */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          
          {/* Calendar Header with Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <h3 className="font-black text-lg text-slate-900 tracking-tight">{monthName}</h3>
              <button 
                onClick={resetToCurrent}
                className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                Today
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={prevMonth}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-black text-slate-400 py-1 tracking-wider">
            <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
          </div>

          {/* Calendar Days Matrix */}
          <div className="grid grid-cols-7 gap-2 text-xs">
            {/* Blank pad cells for the start of the month */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div key={`blank-${idx}`} className="min-h-[85px] p-2 rounded-xl bg-slate-50/50 border border-slate-100/50 text-slate-300 select-none">
              </div>
            ))}

            {/* Real month days */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const dayEvents = events.filter(e => {
                const d = new Date(e.start_time);
                return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
              });

              const hasEvents = dayEvents.length > 0;

              return (
                <div 
                  key={`day-${day}`}
                  onClick={() => {
                    if (dayEvents.length > 0) {
                      setSelectedEvent(dayEvents[0]);
                    }
                  }}
                  className={`min-h-[85px] p-2 rounded-xl border transition-all text-left flex flex-col justify-between ${
                    hasEvents 
                      ? 'border-sky-300 bg-sky-50/40 hover:bg-sky-50 shadow-xs cursor-pointer' 
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-black ${hasEvents ? 'text-[#0C2340]' : 'text-slate-600'}`}>
                      {day}
                    </span>
                    {hasEvents && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    )}
                  </div>

                  {hasEvents && (
                    <div className="space-y-1 mt-1">
                      {dayEvents.map(e => (
                        <div
                          key={e.id}
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded truncate ${
                            e.category === 'Town Hall' 
                              ? 'bg-rose-600 text-white' 
                              : e.category === 'Field Mission'
                              ? 'bg-emerald-600 text-white'
                              : e.category === 'Campaign Launch'
                              ? 'bg-sky-600 text-white'
                              : 'bg-amber-600 text-white'
                          }`}
                          title={`${e.title} (${new Date(e.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`}
                        >
                          {e.title}
                        </div>
                      ))}
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 bg-gradient-to-r from-slate-900 to-[#0C2340] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 bg-sky-900/60 px-2 py-0.5 rounded border border-sky-700/60">
                  {selectedEvent.category}
                </span>
                <h3 className="font-extrabold text-lg mt-1 text-white">{selectedEvent.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-white p-1 text-lg font-bold"
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
                <div className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>
                    {new Date(selectedEvent.start_time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {new Date(selectedEvent.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500">
                  Host: <strong>{selectedEvent.organizer.name}</strong> ({selectedEvent.organizer.role})
                </span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  {selectedEvent.rsvp_counts.going} Attending
                </span>
              </div>

              {/* Quick RSVP inside modal */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Update your attendance:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => rsvpEvent(selectedEvent.id, 'going')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedEvent.user_rsvp === 'going'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    Going
                  </button>
                  <button
                    onClick={() => rsvpEvent(selectedEvent.id, 'maybe')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedEvent.user_rsvp === 'maybe'
                        ? 'bg-amber-500 text-white'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    }`}
                  >
                    Maybe
                  </button>
                  <button
                    onClick={() => rsvpEvent(selectedEvent.id, 'declined')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedEvent.user_rsvp === 'declined'
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
