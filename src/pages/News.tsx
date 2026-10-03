import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Pin, 
  Calendar, 
  User, 
  Tag, 
  Filter, 
  ArrowRight, 
  Bell, 
  FileText, 
  CheckCircle2,
  Clock,
  Radio
} from 'lucide-react';
import { Post } from '../types';

export const News: React.FC = () => {
  const { posts, setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<Post | null>(null);

  // News and announcement posts
  const newsPosts = posts.filter(p => p.type === 'news' || p.type === 'announcement');

  const filteredNews = newsPosts.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q);
    }
    return true;
  });

  const featuredNews = filteredNews.find(p => p.pinned) || filteredNews[0];
  const otherNews = filteredNews.filter(p => p.id !== featuredNews?.id);

  const CATEGORIES = [
    { id: 'all', label: 'All Notices' },
    { id: 'Emergency Operations', label: 'Emergency Operations' },
    { id: 'Brand & Creative', label: 'Brand & Guidelines' },
    { id: 'People & Culture', label: 'HR & People Operations' },
    { id: 'Executive Vision', label: 'Executive Vision' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="page-hero-panel page-hero-panel--news bg-[#0C2340] rounded-2xl p-6 text-white border border-[#1b3a63] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-rose-300">
              Official Bulletins & Notices
            </span>
          </div>
          <h1 className="text-2xl font-black mt-1">MATW Company Newsroom</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Verified organizational announcements, HR policies, and operational dispatch alerts.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search bulletins & notices..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="page-tabs flex items-center space-x-2 overflow-x-auto pb-1">
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

      {/* Newsroom wire */}
      <section className="news-wire" aria-labelledby="news-wire-title">
        <div className="news-wire__masthead">
          <span className="news-wire__live"><Radio className="h-3.5 w-3.5" /> Newsroom wire</span>
          <strong id="news-wire-title">What the organisation is saying now</strong>
          <span className="news-wire__timestamp">Last bulletin synced 04 min ago</span>
        </div>
        <div className="news-wire__track" aria-hidden="true"><span /></div>
        <div className="news-wire__items">
          <div><span className="news-wire__index">01</span><p>Winter corridor phase 4 clears 28,450 thermal kits.</p><small>Emergency operations</small></div>
          <div><span className="news-wire__index">02</span><p>100% donation policy reaffirmed across every field bureau.</p><small>Executive vision</small></div>
          <div><span className="news-wire__index">03</span><p>New brand and safety resources are ready for every team.</p><small>People & culture</small></div>
        </div>
      </section>

      {/* Featured / Pinned Main Story */}
      {featuredNews && (
        <div 
          onClick={() => setActiveArticle(featuredNews)}
          className="page-panel page-panel--interactive bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
        >
          {featuredNews.cover_image && (
            <div className="lg:col-span-5 relative overflow-hidden bg-slate-900 min-h-[220px]">
              <img 
                src={featuredNews.cover_image} 
                alt="" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              {featuredNews.pinned && (
                <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-md">
                  <Pin className="w-3 h-3 fill-current" />
                  <span>Pinned Priority</span>
                </span>
              )}
            </div>
          )}

          <div className={`${featuredNews.cover_image ? 'lg:col-span-7' : 'lg:col-span-12'} p-6 sm:p-8 flex flex-col justify-between space-y-4`}>
            <div>
              <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100">
                  {featuredNews.category}
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{featuredNews.published_at}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight group-hover:text-rose-600 transition-colors">
                {featuredNews.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                {featuredNews.body}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <img 
                  src={featuredNews.author.avatar} 
                  alt="" 
                  className="w-8 h-8 rounded-full object-cover border border-slate-300" 
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">{featuredNews.author.name}</p>
                  <p className="text-[10px] text-slate-500">{featuredNews.author.job_title}</p>
                </div>
              </div>

              <span className="text-xs font-bold text-rose-600 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                <span>Read Full Announcement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Bulletins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherNews.map(item => (
          <div
            key={item.id}
            onClick={() => setActiveArticle(item)}
            className="page-panel page-panel--interactive bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            {item.cover_image && (
              <div className="aspect-video relative overflow-hidden bg-slate-100">
                <img 
                  src={item.cover_image} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
            )}

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                  <span className="font-semibold text-rose-600">{item.category}</span>
                  <span>{item.published_at}</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.excerpt || item.body}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-600 font-medium">{item.author.name}</span>
                <span className="text-sky-700 font-bold text-[11px]">Read Article →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 max-h-[85vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#0C2340] text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                {activeArticle.category}
              </span>
              <button 
                onClick={() => setActiveArticle(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {activeArticle.cover_image && (
                <img 
                  src={activeArticle.cover_image} 
                  alt="" 
                  className="w-full max-h-72 object-cover rounded-xl" 
                />
              )}
              
              <h2 className="text-xl font-black text-slate-900">{activeArticle.title}</h2>
              
              <div className="flex items-center space-x-3 text-xs text-slate-500 border-b border-slate-100 pb-3">
                <span>By {activeArticle.author.name} ({activeArticle.author.job_title})</span>
                <span>•</span>
                <span>{activeArticle.published_at}</span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {activeArticle.body}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
              >
                Close Bulletin
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
