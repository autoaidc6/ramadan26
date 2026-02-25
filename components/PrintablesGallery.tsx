
import React, { useState, useEffect, useMemo } from 'react';
import { Printable, PrintableCategory } from '../types';
import PrintableCard from './PrintableCard';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const CATEGORIES: PrintableCategory[] = ['All', 'Planners', 'Kids', 'Trackers', 'Family'];

const DEFAULT_PRINTABLES: Printable[] = [
  {
    id: 'p-1',
    title: '30-Day Spiritual Planner',
    description: 'A comprehensive guide to track your prayers, Quran reading, and daily goals.',
    category: 'Planners',
    isPremium: false,
    thumbnailUrl: 'https://picsum.photos/seed/planner/400/600',
    fileUrl: '#'
  },
  {
    id: 'p-2',
    title: 'Ramadan Activity Book for Kids',
    description: 'Engaging puzzles and stories to teach children about the values of fasting.',
    category: 'Kids',
    isPremium: true,
    thumbnailUrl: 'https://picsum.photos/seed/kids/400/600',
    fileUrl: '#'
  },
  {
    id: 'p-3',
    title: 'Daily Gratitude Tracker',
    description: 'Focus on the blessings of each day with this elegant gratitude journal page.',
    category: 'Trackers',
    isPremium: false,
    thumbnailUrl: 'https://picsum.photos/seed/tracker/400/600',
    fileUrl: '#'
  }
];

const PrintablesGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PrintableCategory>('All');
  const [printables, setPrintables] = useState<Printable[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (!supabase) {
      setPrintables(DEFAULT_PRINTABLES);
      setLoading(false);
      return;
    }

    fetchPrintables();
    
    // Subscribe to changes
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'printables' }, () => {
        fetchPrintables();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchPrintables() {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('printables')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === 'PGRST204' || error.code === 'PGRST205') {
          console.warn("Printables table not found. Using defaults.");
          setPrintables(DEFAULT_PRINTABLES);
        } else {
          throw error;
        }
      } else {
        const result = data || [];
        if (result.length === 0) {
          setPrintables(DEFAULT_PRINTABLES);
        } else {
          const mappedData = result.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            isPremium: item.is_premium,
            thumbnailUrl: item.thumbnail_url,
            fileUrl: item.file_url
          }));
          setPrintables(mappedData);
        }
      }
    } catch (e) {
      console.error("Error fetching printables:", e);
      setPrintables(DEFAULT_PRINTABLES);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm("Are you sure you want to delete this resource?")) return;
    try {
      const { error } = await supabase.from('printables').delete().eq('id', id);
      if (error) throw error;
    } catch (e: any) {
      alert(e.message);
    }
  };

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return printables;
    return printables.filter(item => item.category === activeTab);
  }, [activeTab, printables]);

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 border ${
              activeTab === cat
                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#050a14] shadow-luxury scale-105'
                : theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400 hover:border-[#D4AF37]/30 hover:text-[#D4AF37]' : 'bg-white border-slate-100 text-slate-400 hover:border-[#D4AF37]/30 hover:text-[#D4AF37]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredItems.map((item) => (
            <div key={item.id} className="relative group animate-in fade-in slide-in-from-bottom-6 duration-700">
              <PrintableCard item={item} />
              {role === 'admin' && (
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && filteredItems.length === 0 && (
        <div className={`text-center py-20 rounded-3xl border border-dashed transition-colors duration-500 ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50/50 border-slate-200'
        }`}>
          <p className="text-slate-400 font-light italic">
            {!supabase ? "Syncing with cloud sanctuary..." : "The gallery is currently being curated. Check back for new inspirations."}
          </p>
        </div>
      )}
    </div>
  );
};

export default PrintablesGallery;
