import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, FileText, Calendar, Users, Award, BookOpen, ArrowRight, Globe } from 'lucide-react';
import { NavigationTab } from '../../types';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    posts, 
    events, 
    resources, 
    setActiveTab 
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingPosts = trimmed
    ? posts.filter(p => 
        p.title.toLowerCase().includes(trimmed) || 
        p.body.toLowerCase().includes(trimmed) ||
        p.tags.some(t => t.toLowerCase().includes(trimmed))
      )
    : [];

  const matchingEvents = trimmed
    ? events.filter(e => 
        e.title.toLowerCase().includes(trimmed) || 
        e.description.toLowerCase().includes(trimmed) ||
        e.category.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingResources = trimmed
    ? resources.filter(r => 
        r.title.toLowerCase().includes(trimmed) || 
        r.description.toLowerCase().includes(trimmed) ||
        r.subcategory.toLowerCase().includes(trimmed) ||
        r.tags.some(t => t.toLowerCase().includes(trimmed))
      )
    : [];

  const totalResults = matchingPosts.length + matchingEvents.length + matchingResources.length;

  const navigateTo = (tab: NavigationTab) => {
    setActiveTab(tab);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-rose-500 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search posts, events, policies, brand assets, or news..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-200/80 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {!trimmed ? (
            <div className="py-8 text-center text-slate-500 space-y-4">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">Quick Portal Jumps</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg mx-auto">
                <button
                  onClick={() => navigateTo('impact')}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 transition-all text-center group"
                >
                  <Globe className="w-5 h-5 mx-auto text-sky-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-700 block">Impact Stats</span>
                  <span className="text-[10px] text-slate-400">59M+ reached</span>
                </button>
                <button
                  onClick={() => navigateTo('events')}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 transition-all text-center group"
                >
                  <Calendar className="w-5 h-5 mx-auto text-rose-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-700 block">Events</span>
                  <span className="text-[10px] text-slate-400">All-Hands RSVP</span>
                </button>
                <button
                  onClick={() => navigateTo('resources')}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 transition-all text-center group"
                >
                  <BookOpen className="w-5 h-5 mx-auto text-amber-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-700 block">Brand Centre</span>
                  <span className="text-[10px] text-slate-400">Logos & Guides</span>
                </button>
                <button
                  onClick={() => navigateTo('recognition')}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 transition-all text-center group"
                >
                  <Award className="w-5 h-5 mx-auto text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-700 block">Recognition</span>
                  <span className="text-[10px] text-slate-400">Give Kudos</span>
                </button>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for keywords like "Gaza", "Brand", "Town Hall", or "Policy"</p>
            </div>
          ) : (
            <>
              {/* Posts & Announcements */}
              {matchingPosts.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                    <span>Updates & Stories ({matchingPosts.length})</span>
                    <button onClick={() => navigateTo('feed')} className="text-rose-600 hover:underline">View in Feed</button>
                  </h4>
                  <div className="space-y-1.5">
                    {matchingPosts.slice(0, 3).map(p => (
                      <div
                        key={p.id}
                        onClick={() => navigateTo('feed')}
                        className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-start justify-between cursor-pointer group"
                      >
                        <div className="flex items-start space-x-2.5">
                          <FileText className="w-4 h-4 text-sky-600 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors">{p.title}</p>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{p.excerpt || p.body}</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{p.published_at}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Results */}
              {matchingEvents.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                    <span>Events & Town Halls ({matchingEvents.length})</span>
                    <button onClick={() => navigateTo('events')} className="text-rose-600 hover:underline">View in Events</button>
                  </h4>
                  <div className="space-y-1.5">
                    {matchingEvents.map(e => (
                      <div
                        key={e.id}
                        onClick={() => navigateTo('events')}
                        className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center space-x-2.5">
                          <Calendar className="w-4 h-4 text-rose-600" />
                          <div>
                            <p className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors">{e.title}</p>
                            <span className="text-[10px] text-slate-500">{e.location_name}</span>
                          </div>
                        </div>
                        <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-semibold border border-rose-100">
                          RSVP Available
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources Results */}
              {matchingResources.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                    <span>Documents & Brand Assets ({matchingResources.length})</span>
                    <button onClick={() => navigateTo('resources')} className="text-rose-600 hover:underline">View All Resources</button>
                  </h4>
                  <div className="space-y-1.5">
                    {matchingResources.map(r => (
                      <div
                        key={r.id}
                        onClick={() => navigateTo('resources')}
                        className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center space-x-2.5">
                          <BookOpen className="w-4 h-4 text-amber-600" />
                          <div>
                            <p className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors">{r.title}</p>
                            <span className="text-[10px] text-slate-500">{r.subcategory} • {r.file_type.toUpperCase()} ({r.file_size})</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-sky-700 font-semibold flex items-center space-x-1">
                          <span>Open</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>MATW Global Knowledge Engine</span>
          <div className="flex items-center space-x-2">
            <span>Use <kbd className="bg-white px-1 rounded border border-slate-300">↑</kbd> <kbd className="bg-white px-1 rounded border border-slate-300">↓</kbd> to navigate</span>
            <span><kbd className="bg-white px-1 rounded border border-slate-300">ESC</kbd> to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
