import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostType } from '../../types';
import { 
  X, 
  Image, 
  BarChart2, 
  Pin, 
  Star, 
  ShieldAlert, 
  Sparkles, 
  Send, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export const CreatePostModal: React.FC = () => {
  const { 
    isCreatePostOpen, 
    setIsCreatePostOpen, 
    currentRole, 
    addPost 
  } = useApp();

  const [postType, setPostType] = useState<PostType>('social');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Team Update');
  const [tagsInput, setTagsInput] = useState('OneTeam, FieldImpact');
  const [coverImage, setCoverImage] = useState('/images/matw/admin-image-1765282578391.jpeg');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  
  // Poll state
  const [includePoll, setIncludePoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['Option 1', 'Option 2']);

  if (!isCreatePostOpen) return null;

  const canPublishExecutive = currentRole === 'ADMIN' || currentRole === 'CONTENT_EDITOR';

  const availablePostTypes: { type: PostType; label: string; desc: string; restricted?: boolean }[] = [
    { type: 'social', label: 'Team Social', desc: 'Share everyday achievements, greetings, or reflections' },
    { type: 'impact_story', label: 'Field Impact Dispatch', desc: 'Beneficiary stories and humanitarian distribution updates' },
    { type: 'news', label: 'Company News', desc: 'Operational updates, bureau expansions, and team milestones' },
    { type: 'announcement', label: 'Urgent Announcement', desc: 'Critical alerts and mission-critical broadcasts', restricted: true },
    { type: 'leadership', label: 'Leadership Vision', desc: 'CEO updates, strategic priorities, and Ali Banat reflections', restricted: true },
  ];

  const MATW_PHOTO_PRESETS = [
    { url: '/images/matw/admin-image-1765282578391.jpeg', label: 'Gaza Winter Emergency Convoys' },
    { url: '/images/matw/admin-image-1732026823446.jpeg', label: 'Field Workers in Rubble' },
    { url: '/images/matw/admin-image-1732026659242.jpeg', label: 'Food Relief Package Distribution' },
    { url: '/images/matw/admin-image-1768998270795.jpeg', label: 'Winter Emergency Shelter Campaign' },
    { url: '/images/matw/admin-image-1764514998420.jpeg', label: 'Ali Banat Legacy Tribute' },
    { url: '/images/matw/admin-image-1731684275384.jpeg', label: '59M+ Impact Infographic' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    addPost({
      type: postType,
      title: title.trim(),
      body: body.trim(),
      category,
      tags,
      cover_image: coverImage || undefined,
      pinned: isPinned && canPublishExecutive,
      featured: isFeatured && canPublishExecutive,
      poll: includePoll && pollQuestion.trim() ? {
        id: `poll-${Date.now()}`,
        question: pollQuestion.trim(),
        options: pollOptions.filter(o => o.trim()).map((text, i) => ({
          id: `opt-${i}`,
          text: text.trim(),
          votes: 0
        })),
        total_votes: 0,
        has_voted: false
      } : undefined
    });

    setIsCreatePostOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#0C2340] text-white">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Create New Post / Broadcast</h3>
              <p className="text-[11px] text-slate-300">Publishing to MATW One Team Hub</p>
            </div>
          </div>
          <button 
            onClick={() => setIsCreatePostOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Post Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Select Post Format
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availablePostTypes.map(item => {
                const disabled = item.restricted && !canPublishExecutive;
                const isSelected = postType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    disabled={disabled}
                    onClick={() => setPostType(item.type)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected 
                        ? 'border-rose-600 bg-rose-50/60 ring-2 ring-rose-500/20' 
                        : disabled
                        ? 'border-slate-200 bg-slate-50 opacity-40 cursor-not-allowed'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isSelected ? 'text-rose-700' : 'text-slate-800'}`}>
                        {item.label}
                      </span>
                      {item.restricted && (
                        <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded font-semibold">
                          Staff Admin
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Headline / Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Emergency distribution reached 1,200 families in Deir al-Balah..."
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          {/* Body Content */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Content Story / Body *
            </label>
            <textarea
              required
              rows={4}
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Write your story, update, or field reflection here..."
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="Emergency Operations">Emergency Operations</option>
                <option value="Field Dispatch">Field Dispatch</option>
                <option value="Team Update">Team Update</option>
                <option value="Culture & Pulse">Culture & Pulse</option>
                <option value="Executive Vision">Executive Vision</option>
                <option value="Brand & Creative">Brand & Creative</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="Gaza, Logistics, WinterAppeal"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Image Presets Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Attach Featured Photo
              </label>
              <button
                type="button"
                onClick={() => setShowImagePicker(!showImagePicker)}
                className="text-xs font-semibold text-sky-700 hover:text-sky-800"
              >
                {showImagePicker ? 'Hide Photo Gallery' : 'Choose MATW Photo'}
              </button>
            </div>

            {showImagePicker && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-2">
                {MATW_PHOTO_PRESETS.map((p, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setCoverImage(p.url);
                      setShowImagePicker(false);
                    }}
                    className={`relative rounded-lg overflow-hidden cursor-pointer aspect-video border-2 transition-transform hover:scale-105 ${
                      coverImage === p.url ? 'border-rose-600 ring-2 ring-rose-500/30' : 'border-transparent'
                    }`}
                  >
                    <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                    {coverImage === p.url && (
                      <span className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {coverImage && (
              <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
                <img src={coverImage} alt="Selected" className="w-14 h-10 object-cover rounded-md" />
                <span className="text-xs text-slate-600 truncate flex-1">{coverImage}</span>
                <button
                  type="button"
                  onClick={() => setCoverImage('')}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Optional Poll Accordion */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-bold text-slate-800">Attach Interactive Team Poll</span>
              </div>
              <input
                type="checkbox"
                checked={includePoll}
                onChange={e => setIncludePoll(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
              />
            </div>

            {includePoll && (
              <div className="mt-3 space-y-2 pt-2 border-t border-slate-200">
                <input
                  type="text"
                  value={pollQuestion}
                  onChange={e => setPollQuestion(e.target.value)}
                  placeholder="Poll Question, e.g. Which team initiative should we prioritize?"
                  className="w-full px-3 py-1.5 text-xs rounded border border-slate-300"
                />
                {pollOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={e => {
                        const newOpts = [...pollOptions];
                        newOpts[idx] = e.target.value;
                        setPollOptions(newOpts);
                      }}
                      placeholder={`Option ${idx + 1}`}
                      className="w-full px-3 py-1 text-xs rounded border border-slate-300"
                    />
                  </div>
                ))}
                {pollOptions.length < 4 && (
                  <button
                    type="button"
                    onClick={() => setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`])}
                    className="text-[11px] text-sky-700 hover:underline font-semibold"
                  >
                    + Add Option
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Admin Controls: Pinned & Featured */}
          {canPublishExecutive && (
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Pin className="w-4 h-4 text-amber-700" />
                <span className="font-semibold text-amber-900">Executive Announcement Controls</span>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={e => setIsPinned(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="font-medium text-slate-800">Pin to Top of Home</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={e => setIsFeatured(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="font-medium text-slate-800">Featured Story</span>
                </label>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreatePostOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish to Hub</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
