import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ResourceCategory, ResourceItem } from '../types';
import { 
  Search, 
  Download, 
  Upload, 
  FileText, 
  BookOpen, 
  Image, 
  ShieldCheck, 
  Tag, 
  Clock, 
  CheckCircle2, 
  Plus,
  Sparkles,
  Filter
} from 'lucide-react';

export const Resources: React.FC = () => {
  const { resources, addResource, currentUser, currentRole } = useApp();
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('brand');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // New resource upload state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSubcat, setNewSubcat] = useState('Brand Guidelines');
  const [newFileType, setNewFileType] = useState('pdf');
  const [newVersion, setNewVersion] = useState('v1.0');

  const filteredResources = resources.filter(res => {
    if (res.category !== activeCategory) return false;
    if (selectedSubcategory !== 'all' && res.subcategory !== selectedSubcategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = res.title.toLowerCase().includes(q);
      const matchDesc = res.description.toLowerCase().includes(q);
      const matchTags = res.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTags) return false;
    }
    return true;
  });

  const BRAND_SUBCATS = ['all', 'Brand Guidelines', 'Logos & Badges', 'Photography Treatment', 'Campaign Assets'];
  const EMPLOYEE_SUBCATS = ['all', 'HR Policies', 'Field Safety & SOPs', 'Forms & Templates', 'Benefits & Health'];

  const subcategories = activeCategory === 'brand' ? BRAND_SUBCATS : EMPLOYEE_SUBCATS;

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addResource({
      title: newTitle.trim(),
      description: newDesc.trim(),
      category: activeCategory,
      subcategory: newSubcat,
      file_name: `${newTitle.toLowerCase().replace(/\s+/g, '_')}.${newFileType}`,
      file_size: '2.4 MB',
      file_type: newFileType,
      version: newVersion,
      tags: [activeCategory, newSubcat.split(' ')[0]]
    });

    setIsUploadModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="page-hero-panel page-hero-panel--resources bg-[#0C2340] rounded-2xl p-6 text-white border border-[#1b3a63] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
              Internal Knowledge & Asset Library
            </span>
          </div>
          <h1 className="text-2xl font-black mt-1">MATW Resource Hub</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Central repository for brand identity kits, vector logos, HR policies, and emergency safety SOPs.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Asset constellation */}
      <section className="resource-constellation" aria-labelledby="resource-constellation-title">
        <div className="resource-constellation__copy">
          <span className="resource-constellation__eyebrow">Library signal / curated for you</span>
          <h2 id="resource-constellation-title">Everything the team needs, in orbit.</h2>
          <p>Move from brand idea to field-ready delivery with the files, standards, and safety knowledge behind every mission.</p>
          <div className="resource-constellation__tags">
            <span>Brand</span><span>Safety</span><span>People</span><span>Field</span>
          </div>
        </div>
        <div className="resource-constellation__stage" aria-hidden="true">
          <span className="resource-constellation__halo resource-constellation__halo--one" />
          <span className="resource-constellation__halo resource-constellation__halo--two" />
          <span className="resource-constellation__core"><strong>{resources.length}</strong><small>verified assets</small></span>
          <span className="resource-constellation__file resource-constellation__file--one">SVG / Logos</span>
          <span className="resource-constellation__file resource-constellation__file--two">PDF / Policies</span>
          <span className="resource-constellation__file resource-constellation__file--three">ZIP / Campaign kit</span>
        </div>
      </section>

      {/* Main Dual Category Tabs */}
      <div className="page-tabs flex items-center space-x-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => {
            setActiveCategory('brand');
            setSelectedSubcategory('all');
          }}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'brand'
              ? 'bg-[#0C2340] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Brand Resource Centre</span>
        </button>

        <button
          onClick={() => {
            setActiveCategory('employee');
            setSelectedSubcategory('all');
          }}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'employee'
              ? 'bg-[#0C2340] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4 text-rose-400" />
          <span>Employee Resource Centre</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="page-panel page-panel--controls bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Subcategory Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSubcategory === sub
                    ? 'bg-rose-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub === 'all' ? 'All Files' : sub}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword or tag..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map(res => (
          <div
            key={res.id}
            className="page-panel page-panel--interactive bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold uppercase shadow-xs ${
                  res.category === 'brand' ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-rose-100 text-rose-900 border border-rose-200'
                }`}>
                  {res.file_type}
                </span>

                <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {res.version}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 mt-3 group-hover:text-rose-600 transition-colors leading-snug">
                {res.title}
              </h3>

              <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                {res.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {res.tags.map(t => (
                  <span key={t} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">
                {res.file_size} • Updated {res.updated_at}
              </span>

              <button
                onClick={() => alert(`Downloading verified asset ${res.file_name} from Lovable Cloud storage...`)}
                className="bg-slate-900 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 bg-[#0C2340] text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-sky-400" />
                <h3 className="font-extrabold text-sm">Upload New Portal Resource</h3>
              </div>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g., MATW Ramadan Social Media Graphics Kit 2026"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Brief summary of file contents and intended audience..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Section
                  </label>
                  <select
                    value={activeCategory}
                    onChange={e => setActiveCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="brand">Brand Resource Centre</option>
                    <option value="employee">Employee Resource Centre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={newSubcat}
                    onChange={e => setNewSubcat(e.target.value)}
                    placeholder="e.g. Logos & Guidelines"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    File Type
                  </label>
                  <select
                    value={newFileType}
                    onChange={e => setNewFileType(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="zip">ZIP Archive</option>
                    <option value="docx">Word Document</option>
                    <option value="xlsx">Excel Sheet</option>
                    <option value="png">PNG Image</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Version Number
                  </label>
                  <input
                    type="text"
                    value={newVersion}
                    onChange={e => setNewVersion(e.target.value)}
                    placeholder="v1.0"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="p-3 border-2 border-dashed border-slate-300 rounded-xl text-center text-xs text-slate-500 hover:bg-slate-50 cursor-pointer">
                <span>Click to select file from disk (Max 100MB)</span>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg"
                >
                  Upload & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
