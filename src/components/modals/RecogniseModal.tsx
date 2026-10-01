import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STAFF_MEMBERS } from '../../data/mockData';
import { X, Award, Sparkles, Heart, ShieldCheck, Star, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RecogniseModal: React.FC = () => {
  const { 
    isRecogniseModalOpen, 
    setIsRecogniseModalOpen, 
    recogniseColleague, 
    currentUser 
  } = useApp();

  const [selectedRecipientId, setSelectedRecipientId] = useState(STAFF_MEMBERS.tariq.id);
  const [selectedBadge, setSelectedBadge] = useState('Compassion In Action');
  const [achievement, setAchievement] = useState('Exemplary field response under severe pressure');
  const [message, setMessage] = useState('');

  if (!isRecogniseModalOpen) return null;

  const BADGES = [
    { title: 'Compassion In Action', icon: Heart, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { title: 'Frontline Hero', icon: ShieldCheck, color: 'text-sky-600 bg-sky-50 border-sky-200' },
    { title: 'Teamwork Anchor', icon: Users, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { title: 'Sincerity & Legacy', icon: Star, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    recogniseColleague(selectedRecipientId, message.trim(), selectedBadge, achievement.trim());

    // Celebrate with confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsRecogniseModalOpen(false);
  };

  const eligibleColleagues = Object.values(STAFF_MEMBERS).filter(s => s.id !== currentUser.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-[#0C2340] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-amber-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">Recognise a Colleague</h3>
              <p className="text-xs text-rose-100">Celebrate dedication, teamwork, and mission impact</p>
            </div>
          </div>
          <button 
            onClick={() => setIsRecogniseModalOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Select Colleague */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              1. Choose Colleague to Celebrate
            </label>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {eligibleColleagues.map(colleague => (
                <div
                  key={colleague.id}
                  onClick={() => setSelectedRecipientId(colleague.id)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    selectedRecipientId === colleague.id 
                      ? 'border-rose-600 bg-rose-50/70 ring-1 ring-rose-500' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={colleague.avatar} 
                      alt="" 
                      className="w-8 h-8 rounded-full object-cover border border-slate-300" 
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{colleague.name}</p>
                      <p className="text-[11px] text-slate-500">{colleague.job_title} • {colleague.department}</p>
                    </div>
                  </div>
                  {selectedRecipientId === colleague.id && (
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Badge Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              2. Select Recognition Badge
            </label>
            <div className="grid grid-cols-2 gap-2">
              {BADGES.map(b => {
                const Icon = b.icon;
                const isSelected = selectedBadge === b.title;
                return (
                  <button
                    key={b.title}
                    type="button"
                    onClick={() => setSelectedBadge(b.title)}
                    className={`p-2 rounded-xl border text-left flex items-center space-x-2 transition-all ${
                      isSelected 
                        ? 'border-rose-600 bg-rose-50 ring-1 ring-rose-500 font-bold' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-rose-600' : 'text-slate-500'}`} />
                    <span className="text-xs text-slate-800">{b.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Achievement Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              3. Specific Contribution / Achievement
            </label>
            <input
              type="text"
              required
              value={achievement}
              onChange={e => setAchievement(e.target.value)}
              placeholder="e.g., Coordinating the urgent night shipments to Rafah"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              4. Appreciation Message *
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write a message celebrating what makes this colleague special to the team..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsRecogniseModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-lg shadow-md flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Celebrate & Post Kudos</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
