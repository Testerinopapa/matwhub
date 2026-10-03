import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeroBanner } from '../components/home/HeroBanner';
import { ImpactStatsBar } from '../components/home/ImpactStatsBar';
import { OperationsHub } from '../components/home/OperationsHub';
import { UpcomingEventsWidget } from '../components/home/UpcomingEventsWidget';
import { QuickToolkitWidget } from '../components/home/QuickToolkitWidget';
import { PostCard } from '../components/feed/PostCard';
import { PostType } from '../types';
import { 
  Sparkles, 
  Plus, 
  Image, 
  Pin, 
  SlidersHorizontal, 
  Flame, 
  Award, 
  CheckCircle2, 
  Search,
  Filter,
  MessageSquare
} from 'lucide-react';

export const Home: React.FC = () => {
  const { posts, currentUser, setIsCreatePostOpen, setIsRecogniseModalOpen, setActiveTab } = useApp();
  const [feedFilter, setFeedFilter] = useState<'all' | 'field' | 'news' | 'polls' | 'recognition'>('all');

  const filteredPosts = posts.filter(post => {
    if (feedFilter === 'field') return post.type === 'impact_story';
    if (feedFilter === 'news') return post.type === 'news' || post.type === 'announcement';
    if (feedFilter === 'polls') return !!post.poll;
    if (feedFilter === 'recognition') return post.type === 'recognition';
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Hero Spotlight & Campaign Banner */}
      <HeroBanner />

      {/* 2. Key Verified Impact Statistics Bar */}
      <ImpactStatsBar />

      {/* 3. Main Multi-Column Experience */}
      <div className="grid min-w-0 grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Internal Social Feed & Composer (7 Cols) */}
        <div className="min-w-0 lg:col-span-7 space-y-6">
          
          {/* Quick Post / Interaction Trigger Card */}
          <div className="page-panel page-panel--controls bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-10 h-10 rounded-full object-cover border border-slate-200" 
              />
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="flex-1 text-left px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/70 text-slate-500 text-xs font-medium transition-colors"
              >
                Assalamu Alaikum {currentUser.name.split(' ')[0]} — share a field update, reflection, or team milestone...
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsCreatePostOpen(true)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors font-medium"
                >
                  <Image className="w-3.5 h-3.5 text-rose-500" />
                  <span>Photo Story</span>
                </button>
                <button
                  onClick={() => setIsCreatePostOpen(true)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                  <span>Team Poll</span>
                </button>
              </div>

              <button
                onClick={() => setIsRecogniseModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors font-bold text-xs"
              >
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Award Kudos</span>
              </button>
            </div>
          </div>

          {/* Social Feed Filter Bar */}
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex items-center space-x-1 overflow-x-auto pb-1 max-w-full sm:space-x-1.5">
              {[
                { id: 'all', label: 'All Team Activity' },
                { id: 'field', label: 'Field Dispatches' },
                { id: 'news', label: 'News & Notices' },
                { id: 'polls', label: 'Team Polls' },
                { id: 'recognition', label: 'Kudos' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFeedFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    feedFilter === tab.id
                      ? 'bg-[#0C2340] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setActiveTab('feed')}
              className="text-xs font-semibold text-sky-700 hover:text-sky-800 whitespace-nowrap ml-2 hidden sm:inline-block"
            >
              Feed settings
            </button>
          </div>

          {/* Post Feed List */}
          <div className="space-y-5">
            {filteredPosts.length === 0 ? (
              <div className="page-panel bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
                <p className="text-sm font-semibold">No posts in this category yet.</p>
                <button
                  onClick={() => setFeedFilter('all')}
                  className="mt-2 text-xs font-bold text-rose-600 hover:underline"
                >
                  Return to all posts
                </button>
              </div>
            ) : (
              filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>

          {/* Load More Button */}
          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('feed')}
              className="px-6 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              View all {posts.length} posts
            </button>
          </div>

        </div>

        {/* Right Column: Unified Operations Command Hub (5 Cols) */}
        <div className="min-w-0 lg:col-span-5 space-y-6">
          <OperationsHub />
          <UpcomingEventsWidget />
          <QuickToolkitWidget />
        </div>

      </div>

    </div>
  );
};
