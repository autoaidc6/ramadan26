
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { PrintableCategory } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'printables' | 'traditions'>('printables');
  const [loading, setLoading] = useState(false);
  
  // Printable Form State
  const [pTitle, setPTitle] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pCat, setPCat] = useState<PrintableCategory>('Planners');
  const [pPremium, setPPremium] = useState(false);
  const [pThumb, setPThumb] = useState('');

  // Tradition Form State
  const [tTitle, setTTitle] = useState('');
  const [tDesc, setTDesc] = useState('');
  const [tIcon, setTIcon] = useState('✨');

  const handleAddPrintable = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('printables').insert([{
        title: pTitle,
        description: pDesc,
        category: pCat,
        is_premium: pPremium,
        thumbnail_url: pThumb
      }]);
      if (error) throw error;
      alert("Printable Resource Added.");
      setPTitle(''); setPDesc(''); setPThumb('');
    } catch (err: any) { alert(err.message); }
    finally { setLoading(false); }
  };

  const handleAddTradition = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('traditions').insert([{
        title: tTitle,
        description: tDesc,
        icon: tIcon
      }]);
      if (error) throw error;
      alert("Sacred Tradition Added.");
      setTTitle(''); setTDesc('');
    } catch (err: any) { alert(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a101f] rounded-[2.5rem] p-12 border border-[#D4AF37]/20 shadow-luxury relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <h3 className="font-serif text-4xl text-white mb-2 tracking-tight">Command Center</h3>
            <p className="text-slate-500 font-light">Curate the NoorNest experience and manage sacred assets.</p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button 
              onClick={() => setActiveTab('printables')}
              className={`px-8 py-3 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${activeTab === 'printables' ? 'bg-[#D4AF37] text-[#050a14]' : 'text-slate-400 hover:text-white'}`}
            >
              Printables
            </button>
            <button 
              onClick={() => setActiveTab('traditions')}
              className={`px-8 py-3 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${activeTab === 'traditions' ? 'bg-[#D4AF37] text-[#050a14]' : 'text-slate-400 hover:text-white'}`}
            >
              Traditions
            </button>
          </div>
        </div>

        {activeTab === 'printables' ? (
          <form onSubmit={handleAddPrintable} className="grid md:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-8">
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Resource Title</label>
                <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4AF37] transition-all" value={pTitle} onChange={e => setPTitle(e.target.value)} placeholder="e.g. 30-Day Spiritual Planner" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Description</label>
                <textarea required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4AF37] transition-all h-40 resize-none" value={pDesc} onChange={e => setPDesc(e.target.value)} placeholder="Describe the soul of this resource..." />
              </div>
            </div>
            <div className="space-y-8">
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Category</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4AF37] transition-all appearance-none cursor-pointer" value={pCat} onChange={e => setPCat(e.target.value as PrintableCategory)}>
                  <option value="Planners" className="bg-[#0a101f]">Planners</option>
                  <option value="Kids" className="bg-[#0a101f]">Kids</option>
                  <option value="Trackers" className="bg-[#0a101f]">Trackers</option>
                  <option value="Family" className="bg-[#0a101f]">Family</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Imagery URL</label>
                <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4AF37] transition-all" value={pThumb} onChange={e => setPThumb(e.target.value)} placeholder="Unsplash or direct image link" />
              </div>
              <label className="flex items-center gap-4 cursor-pointer p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-all">
                <input type="checkbox" checked={pPremium} onChange={e => setPPremium(e.target.checked)} className="w-5 h-5 rounded border-white/10 accent-[#D4AF37]" />
                <span className="text-slate-400 text-sm font-light">Enable Premium Sanctuary Access</span>
              </label>
            </div>
            <div className="md:col-span-2 pt-6">
              <button disabled={loading} className="w-full py-5 bg-[#D4AF37] text-[#050a14] font-bold tracking-[0.4em] uppercase text-xs rounded-2xl hover:shadow-luxury hover:-translate-y-1 transition-all duration-500 disabled:opacity-50">
                {loading ? 'Publishing...' : 'Publish Sacred Resource'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAddTradition} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Tradition Title</label>
                <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4AF37] transition-all" value={tTitle} onChange={e => setTTitle(e.target.value)} placeholder="e.g. Spirit of Unity" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Icon Glyph</label>
                <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4AF37] transition-all" value={tIcon} onChange={e => setTIcon(e.target.value)} placeholder="🕌, ✨, 🌙, 🤝" />
              </div>
            </div>
            <div className="group">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Sacred Wisdom</label>
              <textarea required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4AF37] transition-all h-32 resize-none" value={tDesc} onChange={e => setTDesc(e.target.value)} placeholder="Share the essence of this tradition..." />
            </div>
            <button disabled={loading} className="w-full py-5 bg-white text-[#050a14] font-bold tracking-[0.4em] uppercase text-xs rounded-2xl hover:shadow-luxury hover:bg-[#D4AF37] transition-all duration-500 disabled:opacity-50">
              {loading ? 'Committing...' : 'Commit Sacred Tradition'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
