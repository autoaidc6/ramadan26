
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { PrintableCategory } from '../types';
import { useTheme } from '../contexts/ThemeContext';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'printables' | 'traditions'>('printables');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  
  // Printable Form State
  const [pTitle, setPTitle] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pCat, setPCat] = useState<PrintableCategory>('Planners');
  const [pPremium, setPPremium] = useState(false);
  const [pThumb, setPThumb] = useState('');
  const [pFile, setPFile] = useState('');
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // Tradition Form State
  const [tTitle, setTTitle] = useState('');
  const [tDesc, setTDesc] = useState('');
  const [tIcon, setTIcon] = useState('✨');

  const uploadFile = async (file: File, bucket: string) => {
    if (!supabase) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleAddPrintable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    try {
      let finalThumbUrl = pThumb;
      let finalFileUrl = pFile;

      if (thumbFile) {
        const uploadedUrl = await uploadFile(thumbFile, 'printables');
        if (uploadedUrl) finalThumbUrl = uploadedUrl;
      }

      if (pdfFile) {
        const uploadedUrl = await uploadFile(pdfFile, 'printables');
        if (uploadedUrl) finalFileUrl = uploadedUrl;
      }

      const { error } = await supabase.from('printables').insert([{
        title: pTitle,
        description: pDesc,
        category: pCat,
        is_premium: pPremium,
        thumbnail_url: finalThumbUrl,
        file_url: finalFileUrl
      }]);
      if (error) throw error;
      alert("Sacred Resource Published Successfully.");
      setPTitle(''); setPDesc(''); setPThumb(''); setPFile('');
      setThumbFile(null); setPdfFile(null);
    } catch (err: any) { alert(err.message); }
    finally { setLoading(false); }
  };

  const handleAddTradition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('traditions').insert([{
        title: tTitle,
        description: tDesc,
        icon: tIcon
      }]);
      if (error) throw error;
      alert("Sacred Tradition Added to Library.");
      setTTitle(''); setTDesc('');
    } catch (err: any) { alert(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className={`rounded-[2.5rem] p-12 border shadow-luxury relative overflow-hidden transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#0a101f] border-[#D4AF37]/20' : 'bg-white border-slate-200'
    }`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <h3 className={`font-serif text-4xl mb-2 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Command Center</h3>
            <p className="text-slate-500 font-light">Curate the NoorNest experience and manage sacred assets.</p>
          </div>
          
          <div className={`flex p-1 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
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
                <input required className={`w-full border rounded-2xl px-6 py-4 outline-none focus:border-[#D4AF37] transition-all ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`} value={pTitle} onChange={e => setPTitle(e.target.value)} placeholder="e.g. 30-Day Spiritual Planner" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Description</label>
                <textarea required className={`w-full border rounded-2xl px-6 py-4 outline-none focus:border-[#D4AF37] transition-all h-40 resize-none ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`} value={pDesc} onChange={e => setPDesc(e.target.value)} placeholder="Describe the soul of this resource..." />
              </div>
            </div>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Category</label>
                  <select className={`w-full border rounded-2xl px-6 py-4 outline-none focus:border-[#D4AF37] transition-all appearance-none cursor-pointer ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`} value={pCat} onChange={e => setPCat(e.target.value as PrintableCategory)}>
                    <option value="Planners" className={theme === 'dark' ? 'bg-[#0a101f]' : 'bg-white'}>Planners</option>
                    <option value="Kids" className={theme === 'dark' ? 'bg-[#0a101f]' : 'bg-white'}>Kids</option>
                    <option value="Trackers" className={theme === 'dark' ? 'bg-[#0a101f]' : 'bg-white'}>Trackers</option>
                    <option value="Family" className={theme === 'dark' ? 'bg-[#0a101f]' : 'bg-white'}>Family</option>
                  </select>
                </div>
                <div className="group">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Premium</label>
                  <label className={`flex items-center h-[58px] border rounded-2xl px-6 cursor-pointer transition-all ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}>
                    <input type="checkbox" checked={pPremium} onChange={e => setPPremium(e.target.checked)} className="w-5 h-5 rounded border-white/10 accent-[#D4AF37]" />
                    <span className="text-slate-400 text-[10px] font-bold uppercase ml-3">Premium</span>
                  </label>
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Thumbnail (Upload or URL)</label>
                <div className="flex flex-col gap-4">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => setThumbFile(e.target.files?.[0] || null)}
                    className="text-[10px] text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-[#D4AF37]/10 file:text-[#D4AF37] hover:file:bg-[#D4AF37]/20 cursor-pointer"
                  />
                  <input className={`w-full border rounded-2xl px-6 py-4 outline-none focus:border-[#D4AF37] transition-all ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`} value={pThumb} onChange={e => setPThumb(e.target.value)} placeholder="Or enter direct image link..." />
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Resource File (Upload or URL)</label>
                <div className="flex flex-col gap-4">
                  <input 
                    type="file" 
                    accept=".pdf,.zip,.jpg,.png"
                    onChange={e => setPdfFile(e.target.files?.[0] || null)}
                    className="text-[10px] text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-[#D4AF37]/10 file:text-[#D4AF37] hover:file:bg-[#D4AF37]/20 cursor-pointer"
                  />
                  <input className={`w-full border rounded-2xl px-6 py-4 outline-none focus:border-[#D4AF37] transition-all ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`} value={pFile} onChange={e => setPFile(e.target.value)} placeholder="Or enter direct file link..." />
                </div>
              </div>
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
                <input required className={`w-full border rounded-2xl px-6 py-4 outline-none focus:border-[#D4AF37] transition-all ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`} value={tTitle} onChange={e => setTTitle(e.target.value)} placeholder="e.g. Spirit of Unity" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Icon Glyph</label>
                <input required className={`w-full border rounded-2xl px-6 py-4 outline-none focus:border-[#D4AF37] transition-all ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`} value={tIcon} onChange={e => setTIcon(e.target.value)} placeholder="🕌, ✨, 🌙, 🤝" />
              </div>
            </div>
            <div className="group">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 group-focus-within:text-[#D4AF37] transition-colors">Sacred Wisdom</label>
              <textarea required className={`w-full border rounded-2xl px-6 py-4 outline-none focus:border-[#D4AF37] transition-all h-32 resize-none ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`} value={tDesc} onChange={e => setTDesc(e.target.value)} placeholder="Share the essence of this tradition..." />
            </div>
            <button disabled={loading} className={`w-full py-5 font-bold tracking-[0.4em] uppercase text-xs rounded-2xl hover:shadow-luxury transition-all duration-500 disabled:opacity-50 ${
              theme === 'dark' ? 'bg-white text-[#050a14] hover:bg-[#D4AF37]' : 'bg-[#050a14] text-white hover:bg-[#D4AF37] hover:text-[#050a14]'
            }`}>
              {loading ? 'Committing...' : 'Commit Sacred Tradition'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
