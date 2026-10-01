import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Heart, Globe, Phone, Mail, Award, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-[#0C2340] border-t border-[#1b3a63] text-slate-300 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Col 1: Identity & Legacy */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <img src="/matw-logo-badge.svg" alt="MATW Project" className="w-8 h-8 rounded-full border border-sky-400" />
              <div>
                <span className="font-extrabold text-white text-sm tracking-tight">MATW ONE TEAM HUB</span>
                <p className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider">Internal Employee Portal</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Founded on the inspiring legacy of brother Ali Banat (Rahimahullah). Serving our global teams across 24 countries with unified compassion, transparency, and operational excellence.
            </p>
            <div className="inline-flex items-center space-x-2 bg-slate-800/80 px-2.5 py-1 rounded-full text-[10px] text-amber-300 border border-amber-400/20">
              <Award className="w-3 h-3 text-amber-400" />
              <span>100% Donation & 100% Zakat Certified</span>
            </div>
          </div>

          {/* Col 2: One Team Navigation */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Portal Navigation</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => { setActiveTab('feed'); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">
                  Company Social Feed & Polls
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('impact'); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">
                  Global Impact Statistics & Map
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('events'); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">
                  All-Hands & Events Calendar
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('resources'); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">
                  Brand & Employee Resource Centre
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('recognition'); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">
                  Colleague Recognition Kudos Wall
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('leadership'); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">
                  Executive Vision & Reflections
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Employee Support & Crisis Hub */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Emergency & Employee Support</h4>
            <div className="space-y-2 text-[11px]">
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-[10px] font-bold text-rose-400 uppercase block">24/7 Field Safety Hotline</span>
                <span className="font-mono text-white text-xs">+61 452 375 738 (SatPhone / WhatsApp)</span>
              </div>
              <div className="text-slate-400">
                <span className="font-semibold text-slate-300">People & Culture HR Desk:</span>
                <p>hr@matwproject.org</p>
              </div>
              <div className="text-slate-400">
                <span className="font-semibold text-slate-300">IT & Portal Support:</span>
                <p>hub-support@matwproject.org</p>
              </div>
            </div>
          </div>

          {/* Col 4: Global Bureaus & Values */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Global Headquarters</h4>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <p><strong className="text-slate-200">Sydney Global HQ:</strong> Level 2, 47 Rickard Rd, Bankstown NSW 2200</p>
              <p><strong className="text-slate-200">London Bureau:</strong> 3 Waterhouse Square, London EC1N 2SW</p>
              <p><strong className="text-slate-200">Levant Hub:</strong> Amman & Cairo Logistics Corridors</p>
              <p><strong className="text-slate-200">Field Stations:</strong> Gaza, Lebanon, Yemen, Bangladesh</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright and motto */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} MATW Project International Ltd. Private Internal Portal for Authorised Staff Only.</p>
          <p className="mt-2 sm:mt-0 font-medium text-sky-300 flex items-center space-x-1">
            <span>One Team</span>
            <span>•</span>
            <span>One Mission</span>
            <span>•</span>
            <span>One Legacy</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
