import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationTab, UserRole } from '../../types';
import { 
  Search, 
  Bell, 
  Menu, 
  X, 
  Plus, 
  Award, 
  ShieldCheck, 
  Heart, 
  Check, 
  ChevronDown, 
  ExternalLink,
  Sparkles,
  MapPin,
  Briefcase
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    setCurrentRole, 
    activeTab, 
    setActiveTab,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setIsSearchOpen,
    setIsCreatePostOpen,
    setIsRecogniseModalOpen
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'feed', label: 'Feed' },
    { id: 'impact', label: 'Impact', badge: '59M+' },
    { id: 'news', label: 'News' },
    { id: 'events', label: 'Events' },
    { id: 'resources', label: 'Resources' },
    { id: 'recognition', label: 'Recognition' },
    { id: 'leadership', label: 'Leadership' },
  ];

  if (currentRole === 'ADMIN' || currentRole === 'CONTENT_EDITOR') {
    navItems.push({ id: 'admin', label: 'Admin CMS', badge: currentRole });
  }

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0C2340] border-b border-[#1b3a63] text-white shadow-lg">
      {/* Top emergency mission ticker */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-[#0C2340] px-4 py-1.5 text-xs text-rose-100 flex items-center justify-between border-b border-rose-950/40">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="font-semibold uppercase tracking-wider text-[11px] text-white">Emergency Response Active:</span>
            <span className="truncate max-w-md hidden sm:inline text-rose-200">
              Winter Won’t Wait Gaza Corridor Phase 4 — Air & land shipments currently crossing.
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="hidden md:inline-flex items-center text-amber-300 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5"></span>
              100% Zakat & 100% Donation Policy Certified
            </span>
            <span className="text-slate-300">Global Bureaus: Sydney • London • Amman • Dubai • Rafah</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="relative">
              <img 
                src="/matw-logo-badge.svg" 
                alt="MATW Project" 
                className="w-10 h-10 rounded-full border-2 border-sky-400 shadow-md transform hover:scale-105 transition-transform" 
              />
              <span className="absolute -bottom-1 -right-1 bg-rose-600 text-[9px] font-bold px-1 rounded-full text-white uppercase tracking-tighter">
                HUB
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white">MATW</span>
                <span className="text-xs bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-semibold border border-sky-400/30">
                  ONE TEAM
                </span>
              </div>
              <p className="text-[10px] text-slate-300 tracking-wider uppercase font-medium">
                One Team • One Mission • One Legacy
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center space-x-1.5 ${
                    isActive 
                      ? 'bg-white/15 text-white shadow-inner font-bold border-b-2 border-rose-500' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                      isActive ? 'bg-rose-500 text-white' : 'bg-slate-700/80 text-sky-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons & Controls */}
          <div className="flex items-center space-x-2">
            
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs transition-colors"
              title="Search Portal (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-slate-400">Search portal...</span>
              <kbd className="hidden md:inline-block bg-slate-900/80 text-slate-400 border border-slate-700 rounded px-1.5 text-[10px]">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              <Search className="w-4 h-4 text-sky-400" />
            </button>

            {/* Quick Action: New Post or Recognise */}
            <div className="hidden md:flex items-center space-x-1.5">
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors flex items-center space-x-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
              <button
                onClick={() => setIsRecogniseModalOpen(true)}
                className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors flex items-center space-x-1 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Kudos</span>
              </button>
            </div>

            {/* Notification Centre Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileMenuOpen(false);
                }}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg relative transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-[#0C2340]">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Notifications</h4>
                      <p className="text-[11px] text-slate-500">{unreadNotificationsCount} unread announcements & activity</p>
                    </div>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[11px] text-rose-600 hover:text-rose-700 font-semibold"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500">
                        No notifications right now
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.action_url) {
                              const tab = n.action_url.replace('/', '') as NavigationTab;
                              handleNavClick(tab);
                            }
                            setIsNotificationsOpen(false);
                          }}
                          className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors flex items-start space-x-3 ${
                            !n.is_read ? 'bg-rose-50/50' : ''
                          }`}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {n.actor?.avatar ? (
                              <img src={n.actor.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-[10px]">
                                MATW
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-slate-900 truncate">{n.title}</p>
                              <span className="text-[10px] text-slate-400">{n.time_ago}</span>
                            </div>
                            <p className="text-slate-600 text-[11px] line-clamp-2 mt-0.5">{n.message}</p>
                          </div>
                          {!n.is_read && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 rounded-b-xl text-center">
                    <button 
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        handleNavClick('feed');
                      }}
                      className="text-xs font-semibold text-sky-700 hover:text-sky-800"
                    >
                      View All Team Activity →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Role Demo Switcher (Crucial for testing Employee / Content Editor / Admin) */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="hidden xl:flex items-center space-x-1.5 bg-slate-800/80 border border-slate-700/80 text-[11px] font-semibold px-2 py-1 rounded-md text-amber-300 hover:bg-slate-700 transition-colors"
                title="Switch role preview"
              >
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>{currentRole}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 py-1 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Switch Active Role
                  </div>
                  {(['EMPLOYEE', 'CONTENT_EDITOR', 'ADMIN'] as UserRole[]).map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        setCurrentRole(role);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                        currentRole === role ? 'font-bold text-rose-600 bg-rose-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{role}</span>
                      {currentRole === role && <Check className="w-3.5 h-3.5 text-rose-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Avatar Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center space-x-2 p-1 rounded-full hover:ring-2 hover:ring-sky-400 transition-all focus:outline-none"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-sky-400 shadow-sm"
                />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 py-3 z-50">
                  <div className="px-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-3">
                      <img
                        src={currentUser.avatar}
                        alt=""
                        className="w-11 h-11 rounded-full object-cover border-2 border-slate-200"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.job_title}</p>
                        <span className="inline-block mt-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 uppercase">
                          {currentRole}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{currentUser.location}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <div className="px-4 py-2 text-xs text-slate-600 flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>Status</span>
                      </span>
                      <span className="font-semibold text-emerald-700 text-[11px]">Available / Online</span>
                    </div>

                    <button
                      onClick={() => {
                        handleNavClick('recognition');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span className="flex items-center space-x-2">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>Kudos Received</span>
                      </span>
                      <span className="font-bold text-slate-900 bg-amber-50 px-1.5 py-0.5 rounded text-[11px] border border-amber-200">
                        {currentUser.recognition_received_count || 14}
                      </span>
                    </button>

                    {(currentRole === 'ADMIN' || currentRole === 'CONTENT_EDITOR') && (
                      <button
                        onClick={() => {
                          handleNavClick('admin');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                        <span>Admin & Content CMS</span>
                      </button>
                    )}
                  </div>

                  <div className="pt-2 px-3 border-t border-slate-100">
                    <div className="text-[10px] text-slate-400 mb-1.5 uppercase font-bold tracking-wider">
                      Role Preview Mode:
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {(['EMPLOYEE', 'CONTENT_EDITOR', 'ADMIN'] as UserRole[]).map(r => (
                        <button
                          key={r}
                          onClick={() => {
                            setCurrentRole(r);
                          }}
                          className={`text-[10px] py-1 px-1 rounded font-semibold transition-colors text-center ${
                            currentRole === r 
                              ? 'bg-rose-600 text-white font-bold' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {r.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1D34] border-t border-slate-800 px-4 pt-2 pb-4 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
            <button
              onClick={() => {
                setIsCreatePostOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 bg-rose-600 text-white text-xs font-semibold py-2 rounded-lg text-center"
            >
              + Create Post
            </button>
            <button
              onClick={() => {
                setIsRecogniseModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 bg-sky-600 text-white text-xs font-semibold py-2 rounded-lg text-center flex items-center justify-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Give Kudos</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg text-left flex items-center justify-between ${
                    isActive 
                      ? 'bg-rose-600 text-white font-bold' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Role Switcher */}
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            <span className="block mb-1 font-semibold uppercase text-[10px]">Active Permission Role:</span>
            <div className="flex space-x-1">
              {(['EMPLOYEE', 'CONTENT_EDITOR', 'ADMIN'] as UserRole[]).map(r => (
                <button
                  key={r}
                  onClick={() => setCurrentRole(r)}
                  className={`flex-1 py-1 text-[10px] rounded font-semibold ${
                    currentRole === r ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
