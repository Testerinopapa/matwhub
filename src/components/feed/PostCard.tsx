import React, { useState } from 'react';
import { Post, UserProfile } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  MessageCircle, 
  Pin, 
  Award, 
  Globe, 
  Clock, 
  Send, 
  Flame, 
  ThumbsUp, 
  HandHeart 
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
        return { label: 'Field notice', bg: 'bg-rose-50 text-rose-800 border-rose-200' };
      case 'leadership':
        return { label: 'Leadership reflection', bg: 'bg-indigo-50 text-indigo-900 border-indigo-200' };
      case 'impact_story':
        return { label: 'Field dispatch', bg: 'bg-sky-50 text-sky-900 border-sky-200' };
      case 'recognition':
        return { label: 'Colleague kudos', bg: 'bg-amber-50 text-amber-900 border-amber-200' };
      case 'news':
        return { label: 'Organisation news', bg: 'bg-emerald-50 text-emerald-900 border-emerald-200' };
      default:
        return { label: 'Team update', bg: 'bg-slate-50 text-slate-800 border-slate-200' };
    }
  };

  const badge = getTypeBadge();

  return (
    <article className={`bg-white rounded-2xl border transition-all duration-200 shadow-2xs hover:border-slate-300 overflow-hidden ${
      post.pinned ? 'border-rose-300' : 'border-slate-200/90'
    }`}>
      {/* Pinned Announcement Bar */}
      {post.pinned && (
        <div className="bg-rose-600 text-white px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Pin className="w-3.5 h-3.5 fill-current" />
            <span>Pinned operational notice</span>
          </div>
          <span className="text-[11px] text-rose-100">Global all-staff priority</span>
        </div>
      )}

      <div className="p-5 sm:p-6 space-y-4">
        
        {/* Post Author Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-slate-900">{post.author.name}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${badge.bg}`}>
                  {badge.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {post.author.job_title} ({post.author.location})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-slate-400 text-xs">
            <Clock className="w-3 h-3" />
            <span>{post.published_at}</span>
          </div>
        </div>

        {/* Post Title */}
        <h3 className="text-base font-bold text-slate-900 leading-snug">
          {post.title}
        </h3>

        {/* Recognition Spotlight Banner */}
        {post.type === 'recognition' && post.recognition_details && (
          <div className="p-3.5 bg-[#FFFDF9] rounded-xl border border-amber-200 flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                  Honoring
                </span>
                <span className="font-bold text-xs text-slate-900 truncate">
                  {post.recognition_details.recipient.name}
                </span>
              </div>
              <p className="text-xs text-amber-950 mt-0.5 font-medium">
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
          <div className="inline-flex items-center space-x-2 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-lg text-xs text-sky-900 font-medium">
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            <span>Verified delivery: <strong>{post.impact_details.metric_value}</strong> {post.impact_details.metric_label} ({post.impact_details.location})</span>
          </div>
        )}

        {/* Media Attachments Carousel / Photo */}
        {post.media_urls && post.media_urls.length > 0 && (
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 relative">
            <img 
              src={post.media_urls[activeMediaIndex] || post.media_urls[0]} 
              alt={post.title} 
              className="w-full max-h-96 object-cover"
            />
            {post.media_urls.length > 1 && (
              <div className="absolute bottom-2 right-2 flex space-x-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {post.media_urls.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeMediaIndex === idx ? 'bg-rose-500 w-3.5' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Poll Component */}
        {post.poll && (
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Team pulse poll</span>
              <span className="text-slate-500">
                {post.poll.total_votes} votes total
              </span>
            </div>
            <p className="text-xs text-slate-800 font-medium">{post.poll.question}</p>
            
            <div className="space-y-2 pt-1">
              {post.poll.options.map(opt => {
                const percent = post.poll!.total_votes > 0 
                  ? Math.round((opt.votes / post.poll!.total_votes) * 100) 
                  : 0;
                return (
                  <div
                    key={opt.id}
                    onClick={() => !post.poll!.has_voted && votePoll(post.id, opt.id)}
                    className={`relative overflow-hidden p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      opt.voted_by_user 
                        ? 'border-rose-500 bg-rose-50 font-bold' 
                        : post.poll!.has_voted
                        ? 'border-slate-200 bg-white opacity-85'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {post.poll!.has_voted && (
                      <div 
                        className="absolute inset-y-0 left-0 bg-rose-100/60 transition-all duration-500" 
                        style={{ width: `${percent}%` }}
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-slate-800">{opt.text}</span>
                      {post.poll!.has_voted && (
                        <span className="font-semibold text-slate-600">{percent}% ({opt.votes})</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reaction Bar & Comments Trigger */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => handleReaction('prayer')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                post.reactions.user_reaction === 'prayer'
                  ? 'bg-rose-50 text-rose-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Dua & Prayer"
            >
              <HandHeart className="w-3.5 h-3.5 text-rose-500" />
              <span>Dua ({post.reactions.prayer})</span>
            </button>

            <button
              onClick={() => handleReaction('heart')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                post.reactions.user_reaction === 'heart'
                  ? 'bg-rose-50 text-rose-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Love ({post.reactions.heart})</span>
            </button>

            <button
              onClick={() => handleReaction('clap')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                post.reactions.user_reaction === 'clap'
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5 text-amber-500" />
              <span>Applaud ({post.reactions.clap})</span>
            </button>
          </div>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{post.comments_count || 0} comments</span>
          </button>
        </div>

        {/* Comment Thread */}
        {showComments && (
          <div className="pt-3 border-t border-slate-100 space-y-3">
            {post.comments && post.comments.length > 0 && (
              <div className="space-y-2">
                {post.comments.map(c => (
                  <div key={c.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{c.author.name}</span>
                      <span className="text-[10px] text-slate-400">{c.created_at}</span>
                    </div>
                    <p className="text-slate-600">{c.content}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
              <input
                type="text"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Write a reflection or message to the team..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-rose-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="p-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 transition-colors"
                title="Send reply"
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
