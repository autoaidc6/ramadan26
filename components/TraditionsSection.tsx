
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Tradition } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const DEFAULT_TRADITIONS: Tradition[] = [
  {
    id: 'def-1',
    title: 'The Pre-Dawn Meal',
    description: 'Suhoor is more than sustenance; it is a blessed time of quietude and preparation for the day\'s spiritual journey.',
    icon: '🌙'
  },
  {
    id: 'def-2',
    title: 'The Breaking of Fast',
    description: 'Iftar is a moment of profound gratitude, often shared with family and community, celebrating the gift of sustenance.',
    icon: '🕌'
  },
  {
    id: 'def-3',
    title: 'Nightly Vigils',
    description: 'Taraweeh prayers offer a rhythmic connection to the Divine, as the Quran is recited in the stillness of the night.',
    icon: '✨'
  }
];

const TraditionsSection: React.FC = () => {
  const [traditions, setTraditions] = useState<Tradition[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (!supabase) {
      setTraditions(DEFAULT_TRADITIONS);
      setLoading(false);
      return;
    }

    fetchTraditions();
    
    const channel = supabase
      .channel('traditions-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'traditions' }, () => {
        fetchTraditions();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchTraditions() {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('traditions')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        if (error.code === 'PGRST204' || error.code === 'PGRST205') {
          console.warn("Traditions table not found. Using defaults.");
          setTraditions(DEFAULT_TRADITIONS);
        } else {
          throw error;
        }
      } else {
        const result = data || [];
        setTraditions(result.length > 0 ? result : DEFAULT_TRADITIONS);
      }
    } catch (e) {
      console.error("Error fetching traditions:", e);
      setTraditions(DEFAULT_TRADITIONS);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm("Remove this tradition from the sanctuary?")) return;
    await supabase.from('traditions').delete().eq('id', id);
  };

  if (loading) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {traditions.length > 0 ? (
        traditions.map((item, i) => (
          <div key={item.id} className={`group relative overflow-hidden rounded-[2rem] p-10 border transition-all duration-700 hover:shadow-luxury hover:-translate-y-2 ${
            theme === 'dark' ? 'bg-[#0a101f] border-white/5 hover:border-[#D4AF37]/30' : 'bg-white border-slate-100 hover:border-[#D4AF37]/30'
          }`}>
            <div className="mb-8 inline-block p-5 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#050a14] transition-all duration-500 transform group-hover:rotate-[10deg]">
              <span className="text-3xl">{item.icon}</span>
            </div>
            <h3 className={`font-serif text-2xl mb-4 tracking-wide group-hover:text-[#D4AF37] transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              {item.description}
            </p>
            
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            
            {role === 'admin' && (
              <button 
                onClick={() => handleDelete(item.id)}
                className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-500 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all z-20"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))
      ) : (
        <div className="md:col-span-3 py-12 text-center">
          <p className="text-slate-500 italic font-light">
            {!supabase ? "Awaiting connection to ancient roots..." : "Seeking sacred moments..."}
          </p>
        </div>
      )}
    </div>
  );
};

export default TraditionsSection;
