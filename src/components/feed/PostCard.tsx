import React, { useState } from 'react';
import { Post, UserProfile } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Pin, 
  Sparkles, 
  Award, 
  CheckCircle, 
  Globe, 
  Clock, 
  Send, 
  Tag, 
  ShieldCheck,
  Flame,
  ThumbsUp,
  HandHeart,
  MoreHorizontal
} from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { toggleReaction, addComment, votePoll, currentUser } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const handleReaction = (type: 'heart' | 'clap' | 'prayer' | 'fire') => {
    toggleReaction(post.id, type);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(post.id, commentInput.trim());
    setCommentInput('');
  };

  const getTypeBadge = () => {
    switch (post.type) {
      case 'announcement':
        return { label: 'Important Notice', bg: 'bg-rose-100 text-rose-800 border-rose-200' };
      case 'leadership':
        return { label: 'Leadership Vision', bg: 'bg-indigo-100 text-indigo-900 border-indigo-200' };
      case 'impact_story':
        return { label: 'Impact Dispatch', bg: 'bg-sky-100 text-sky-900 border-sky-200' };
      case 'recognition':
        return { label: 'Colleague Kudos', bg: 'bg-amber-100 text-amber-900 border-amber-200' };
      case 'news':
        return { label: 'Company News', bg: 'bg-emerald-100 text-emerald-900 border-emerald-200' };
      default:
        return { label: 'Team Update', bg: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  const badge = getTypeBadge();

  return (
    <article className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden ${
      post.pinned ? 'border-rose-300 ring-1 ring-rose-200/60' : 'border-slate-200/80'
    }`}>
      {/* Pinned Announcement Bar */}
      {post.pinned && (
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-1 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Pin className="w-3.5 h-3.5 fill-current" />
            <span className="uppercase tracking-wider text-[11px]">Pinned Executive Notice</span>
          </div>
          <span className="text-[10px] text-rose-100">Visible to All Global Staff</span>
        </div>
      )}

      <div className="p-5">
        
        {/* Post Author & Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-slate-900">{post.author.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                  {badge.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {post.author.job_title} • {post.author.department}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-slate-400 text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.published_at}</span>
          </div>
        </div>

        {/* Post Title */}
        <h3 className="text-base font-extrabold text-slate-900 mt-3.5 mb-2 leading-snug hover:text-rose-600 transition-colors">
          {post.title}
        </h3>

        {/* Recognition Spotlight Banner (If recognition post) */}
        {post.type === 'recognition' && post.recognition_details && (
          <div className="my-3 p-3.5 bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 rounded-xl border border-amber-200/80 flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-md flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                  Kudos Recipient
                </span>
                <span className="font-bold text-xs text-slate-800">
                  {post.recognition_details.recipient.name}
                </span>
              </div>
              <p className="text-xs font-bold text-amber-900 mt-0.5">
                Badge: {post.recognition_details.badge_title}
              </p>
              <p className="text-[11px] text-slate-600">
                "{post.recognition_details.achievement}"
              </p>
            </div>
          </div>
        )}

        {/* Post Body Text */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {post.body}
        </p>

        {/* Field Impact Badge / Details */}
        {post.impact_details && (
          <div className="mt-3 inline-flex items-center space-x-2 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-lg text-xs text-sky-900 font-semibold">
            <Globe className="w-4 h-4 text-sky-600" />
            <span>Verified Impact: <strong>{post.impact_details.metric_value}</strong> {post.impact_details.metric_label} ({post.impact_details.location})</span>
          </div>
        )}

        {/* Media Attachments Carousel / Photo */}
        {post.media_urls && post.media_urls.length > 0 && (
          <div className="mt-3.5 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 relative">
            <img 
              src={post.media_urls[activeMediaIndex] || post.media_urls[0]} 
              alt={post.title} 
              className="w-full max-h-96 object-cover"
            />
            {post.media_urls.length > 1 && (
              <div className="absolute bottom-2 right-2 flex space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                {post.media_urls.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeMediaIndex === idx ? 'bg-rose-500 w-4' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Poll Component */}
        {post.poll && (
          <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Team Pulse Poll</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {post.poll.total_votes} votes total
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-800">{post.poll.question}</p>
            
            <div className="space-y-2 pt-1">
              {post.poll.options.map(opt => {
                const percent = post.poll!.total_votes > 0 
                  ? Math.round((opt.votes / post.poll!.total_votes) * 100) 
                  : 0;
                return (
                  <div
                    key={opt.id}
                    onClick={() => !post.poll!.has_voted && votePoll(post.id, opt.id)}
                    className={`relative overflow-hidden p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      opt.voted_by_user 
                        ? 'border-rose-500 bg-rose-50 font-bold' 
                        : post.poll!.has_voted
                        ? 'border-slate-200 bg-white cursor-default'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div 
                      className={`absolute top-0 bottom-0 left-0 transition-all duration-500 opacity-20 ${
                        opt.voted_by_user ? 'bg-rose-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                    <div className="relative flex items-center justify-between">
                      <span className="text-slate-800">{opt.text}</span>
                      <span className="font-mono text-slate-600 font-semibold">{percent}% ({opt.votes})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map(t => (
              <span key={t} className="text-[10px] text-slate-500 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md font-medium">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Reaction Bar & Stats */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center space-x-1 sm:space-x-2">
            
            {/* Heart */}
            <button
              onClick={() => handleReaction('heart')}
              className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors ${
                post.reactions.user_reaction === 'heart'
                  ? 'bg-rose-50 text-rose-600 font-bold'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Heart"
            >
              <Heart className={`w-3.5 h-3.5 ${post.reactions.user_reaction === 'heart' ? 'fill-current text-rose-600' : ''}`} />
              <span>{post.reactions.heart}</span>
            </button>

            {/* Dua / Prayer Hands */}
            <button
              onClick={() => handleReaction('prayer')}
              className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors ${
                post.reactions.user_reaction === 'prayer'
                  ? 'bg-sky-50 text-sky-700 font-bold'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Dua / Ameen"
            >
              <HandHeart className={`w-3.5 h-3.5 ${post.reactions.user_reaction === 'prayer' ? 'text-sky-600' : ''}`} />
              <span>{post.reactions.prayer}</span>
            </button>

            {/* Clap */}
            <button
              onClick={() => handleReaction('clap')}
              className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors ${
                post.reactions.user_reaction === 'clap'
                  ? 'bg-amber-50 text-amber-700 font-bold'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Applause"
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${post.reactions.user_reaction === 'clap' ? 'text-amber-600' : ''}`} />
              <span>{post.reactions.clap}</span>
            </button>

            {/* Fire */}
            <button
              onClick={() => handleReaction('fire')}
              className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors ${
                post.reactions.user_reaction === 'fire'
                  ? 'bg-orange-50 text-orange-600 font-bold'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Inspiring"
            >
              <Flame className={`w-3.5 h-3.5 ${post.reactions.user_reaction === 'fire' ? 'fill-current text-orange-600' : ''}`} />
              <span>{post.reactions.fire}</span>
            </button>

          </div>

          {/* Comments Toggle */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-600 font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-slate-500" />
            <span>{post.comments_count || 0} comments</span>
          </button>
        </div>

        {/* Comments Section Drawer */}
        {showComments && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
            {/* Existing comments */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map(c => (
                  <div key={c.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <img src={c.author.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-bold text-slate-900">{c.author.name}</span>
                        <span className="text-[10px] text-slate-400">({c.author.job_title})</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{c.created_at}</span>
                    </div>
                    <p className="text-slate-700 pl-7">{c.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-400 text-xs py-2">
                  No comments yet. Start the conversation with your colleagues!
                </p>
              )}
            </div>

            {/* Add comment form */}
            <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 pt-1">
              <img 
                src={currentUser.avatar} 
                alt="" 
                className="w-7 h-7 rounded-full object-cover border border-slate-300" 
              />
              <input
                type="text"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Write an encouraging comment or question..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="bg-rose-600 disabled:opacity-40 text-white p-1.5 rounded-lg hover:bg-rose-500 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

      </div>
    </article>
  );
};
