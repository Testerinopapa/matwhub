import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STAFF_MEMBERS } from '../data/mockData';
import { UserRole } from '../types';
import { 
  ShieldCheck, 
  BarChart2, 
  FileText, 
  Calendar, 
  BookOpen, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Pin, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Activity
} from 'lucide-react';

export const Admin: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole,
    impactMetrics, 
    updateImpactMetric, 
    posts, 
    deletePost, 
    events, 
    resources,
    setIsCreatePostOpen 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'metrics' | 'posts' | 'events' | 'users'>('metrics');
  const [editingMetricId, setEditingMetricId] = useState<string | null>(null);
  const [metricValueInput, setMetricValueInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Permission guard
  if (currentRole === 'EMPLOYEE') {
    return (
      <div className="page-panel page-panel--restricted max-w-2xl mx-auto p-12 bg-white rounded-3xl border border-rose-200 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900">Restricted Administration Access</h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
          Your active profile is currently set to <strong>EMPLOYEE</strong>. Portal CMS capabilities are restricted to <strong>CONTENT_EDITOR</strong> and <strong>ADMIN</strong> roles.
        </p>
        <div className="pt-2">
          <p className="text-xs text-slate-400 mb-2">Switch role preview to test CMS capabilities:</p>
          <div className="inline-flex space-x-2">
            <button
              onClick={() => setCurrentRole('CONTENT_EDITOR')}
              className="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-700"
            >
              Test as CONTENT_EDITOR
            </button>
            <button
              onClick={() => setCurrentRole('ADMIN')}
              className="px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-500"
            >
              Test as ADMIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleStartEditMetric = (id: string, currentValue: string) => {
    setEditingMetricId(id);
    setMetricValueInput(currentValue);
  };

  const handleSaveMetric = (id: string) => {
    const rawNumber = parseInt(metricValueInput.replace(/[^0-9]/g, '')) || 0;
    updateImpactMetric(id, metricValueInput, rawNumber);
    setEditingMetricId(null);
    setStatusMessage('Impact metric updated successfully.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="page-hero-panel page-hero-panel--admin bg-[#0C2340] rounded-2xl p-6 text-white border border-[#1b3a63] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
              Content Management & Platform Administration
            </span>
          </div>
          <h1 className="text-2xl font-black mt-1">MATW Operations Control CMS</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Manage live relief statistics, broadcast announcements, event RSVPs, and user access levels.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsCreatePostOpen(true)}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Broadcast</span>
          </button>
        </div>
      </div>

      {/* Control room overview */}
      <section className="admin-control-room" aria-labelledby="admin-control-title">
        <div className="admin-control-room__heading">
          <span className="admin-control-room__eyebrow"><Activity className="h-3.5 w-3.5" /> Control room / live</span>
          <h2 id="admin-control-title">The platform is moving with the mission.</h2>
          <p>Operational signals from the content, impact, and access layers.</p>
        </div>
        <div className="admin-control-room__status">
          <div className="admin-control-room__status-visual" aria-hidden="true">
            <span className="admin-control-room__status-orbit admin-control-room__status-orbit--one" />
            <span className="admin-control-room__status-orbit admin-control-room__status-orbit--two" />
            <span className="admin-control-room__status-beam" />
            <i className="admin-control-room__status-core" />
            <div className="admin-control-room__status-readout">
              <small>Network health</small>
              <strong>92%</strong>
              <span>5 hubs online</span>
            </div>
          </div>
          <div className="admin-control-room__status-line"><span className="admin-control-room__status-dot" /><strong>All systems nominal</strong><small>Last sync 22:14 UTC</small></div>
          <div className="admin-control-room__bar"><span style={{ width: '92%' }} /><small>92%</small></div>
        </div>
        <div className="admin-control-room__metrics">
          <span><small>Impact data</small><strong>Synced</strong><i /></span>
          <span><small>Broadcast queue</small><strong>3 ready</strong><i /></span>
          <span><small>Access layer</small><strong>Protected</strong><i /></span>
        </div>
      </section>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="page-tabs flex items-center space-x-2 border-b border-slate-200 pb-2">
        {[
          { id: 'metrics', label: 'Live Impact Metrics', icon: BarChart2 },
          { id: 'posts', label: `Content & Posts (${posts.length})`, icon: FileText },
          { id: 'events', label: `Events & RSVPs (${events.length})`, icon: Calendar },
          { id: 'users', label: 'Staff Roles & Permissions', icon: Users },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive 
                  ? 'bg-rose-600 text-white shadow-xs' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Impact Metrics CMS */}
      {activeAdminTab === 'metrics' && (
        <div className="page-panel page-panel--admin bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Manage Production Impact Metrics</h3>
              <p className="text-xs text-slate-500">Live values displayed on Home and the Global Impact Hub.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              PostgreSQL Relational Sync Ready
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {impactMetrics.map(metric => {
              const isEditing = editingMetricId === metric.id;
              return (
                <div key={metric.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                      {metric.category}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-800">{metric.label}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{metric.period_description}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={metricValueInput}
                          onChange={e => setMetricValueInput(e.target.value)}
                          className="px-3 py-1.5 text-sm font-mono font-bold rounded-lg border border-rose-500 w-36"
                        />
                        <button
                          onClick={() => handleSaveMetric(metric.id)}
                          className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs"
                          title="Save Value"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingMetricId(null)}
                          className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-4">
                        <span className="text-xl font-black font-mono text-slate-900">
                          {metric.value}
                        </span>
                        <button
                          onClick={() => handleStartEditMetric(metric.id, metric.value)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center space-x-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Content & Posts Manager */}
      {activeAdminTab === 'posts' && (
        <div className="page-panel page-panel--admin bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">All Published Content & Broadcasts</h3>
              <p className="text-xs text-slate-500">Edit, pin, feature, or remove company posts.</p>
            </div>
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-500"
            >
              + New Post
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {posts.map(post => (
              <div key={post.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                      {post.type}
                    </span>
                    {post.pinned && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 flex items-center space-x-0.5">
                        <Pin className="w-2.5 h-2.5 fill-current" />
                        <span>Pinned</span>
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">{post.published_at}</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-800 truncate mt-1">{post.title}</h4>
                  <p className="text-xs text-slate-500">Author: {post.author.name} • {post.category}</p>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-xs text-slate-500 mr-2">
                    ❤️ {post.reactions.heart} • 💬 {post.comments_count}
                  </span>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Events & RSVPs */}
      {activeAdminTab === 'events' && (
        <div className="page-panel page-panel--admin bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Event Participation & Attendance</h3>
              <p className="text-xs text-slate-500">Real-time RSVP headcount across all global stations.</p>
            </div>
          </div>

          <div className="space-y-4">
            {events.map(ev => (
              <div key={ev.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                    {ev.category}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900 mt-1">{ev.title}</h4>
                  <p className="text-xs text-slate-500">{ev.location_name}</p>
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono">
                  <div className="text-center">
                    <span className="font-bold text-emerald-700 text-sm">{ev.rsvp_counts.going}</span>
                    <span className="text-[10px] text-slate-400 block font-sans">Going</span>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-amber-700 text-sm">{ev.rsvp_counts.maybe}</span>
                    <span className="text-[10px] text-slate-400 block font-sans">Maybe</span>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-rose-700 text-sm">{ev.rsvp_counts.declined}</span>
                    <span className="text-[10px] text-slate-400 block font-sans">Declined</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Staff Roles & Permissions */}
      {activeAdminTab === 'users' && (
        <div className="page-panel page-panel--admin bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Staff Access & Security Permissions</h3>
              <p className="text-xs text-slate-500">Configured with Lovable Cloud Authentication & Relational Roles.</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {Object.values(STAFF_MEMBERS).map(member => (
              <div key={member.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={member.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                  <div>
                    <p className="font-bold text-xs text-slate-900">{member.name}</p>
                    <p className="text-[11px] text-slate-500">{member.job_title} • {member.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase ${
                    member.role === 'ADMIN' 
                      ? 'bg-rose-100 text-rose-800' 
                      : member.role === 'CONTENT_EDITOR'
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
