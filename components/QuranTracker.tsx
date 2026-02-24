
import React, { useState, useEffect, useMemo } from 'react';
import { JuzData } from '../types';
import NotesModal from './NotesModal';
import { useTheme } from '../contexts/ThemeContext';

const QuranTracker: React.FC = () => {
  const [juzList, setJuzList] = useState<JuzData[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem('quran_tracker_v1');
    if (saved) {
      try {
        setJuzList(JSON.parse(saved));
      } catch (e) {
        setJuzList(generateInitialJuz());
      }
    } else {
      setJuzList(generateInitialJuz());
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('quran_tracker_v1', JSON.stringify(juzList));
    }
  }, [juzList, isInitialized]);

  const generateInitialJuz = (): JuzData[] => {
    return Array.from({ length: 30 }, (_, i) => ({
      number: i + 1,
      completed: false,
      notes: '',
    }));
  };

  const toggleJuz = (num: number) => {
    setJuzList(prev => prev.map(j => {
      if (j.number === num) {
        const newState = !j.completed;
        if (newState) triggerConfetti();
        return { ...j, completed: newState };
      }
      return j;
    }));
  };

  const updateNotes = (num: number, notes: string) => {
    setJuzList(prev => prev.map(j => j.number === num ? { ...j, notes } : j));
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all Quran progress?')) {
      setJuzList(generateInitialJuz());
    }
  };

  const triggerConfetti = async () => {
    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#D4AF37', '#facc15', '#ffffff']
      });
    } catch (e) {
      console.error("Confetti failed to load");
    }
  };

  const completionStats = useMemo(() => {
    const completed = juzList.filter(j => j.completed).length;
    const progress = (completed / 30) * 100;
    return { completed, progress };
  }, [juzList]);

  if (!isInitialized) return null;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      {/* Stats Summary */}
      <div className={`mb-12 flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl shadow-xl border transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#0a101f] border-white/5' : 'bg-white border-[#D4AF37]/10'
      }`}>
        <div className="flex-1 w-full">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className={`font-serif text-3xl ${theme === 'dark' ? 'text-white' : 'text-[#0a192f]'}`}>Quran Completion</h3>
              <p className="text-slate-500">Track your journey through the 30 Juz.</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-serif font-bold text-[#D4AF37]">{completionStats.completed}</span>
              <span className="text-slate-400 font-bold ml-1">/ 30</span>
            </div>
          </div>
          <div className={`h-4 w-full rounded-full overflow-hidden border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
            <div 
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#facc15] transition-all duration-1000 ease-out"
              style={{ width: `${completionStats.progress}%` }}
            />
          </div>
        </div>
        
        <button 
          onClick={resetProgress}
          className={`px-6 py-2 text-xs font-bold tracking-widest uppercase border rounded-lg transition-all ${
            theme === 'dark' ? 'text-slate-400 border-white/10 hover:border-red-400/50 hover:text-red-400' : 'text-slate-400 border-slate-200 hover:border-red-400 hover:text-red-500'
          }`}
        >
          Reset Progress
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {juzList.map((juz) => (
          <div 
            key={juz.number}
            className={`relative group h-44 rounded-2xl border-2 transition-all duration-500 flex flex-col overflow-hidden ${
              juz.completed 
                ? 'bg-[#D4AF37] border-[#D4AF37] shadow-lg scale-[1.02]' 
                : theme === 'dark' ? 'bg-[#0a101f] border-white/5 hover:border-[#D4AF37]/50 hover:shadow-md' : 'bg-white border-slate-100 hover:border-[#D4AF37]/50 hover:shadow-md'
            }`}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0l7.5 7.5-7.5 7.5-7.5-7.5z' fill='${theme === 'dark' ? 'white' : 'black'}'/%3E%3C/svg%3E")` }} />

            <div className="relative z-10 p-5 flex-grow flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className={`font-serif text-3xl font-bold ${juz.completed ? 'text-[#0a192f]' : theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`}>
                  {juz.number}
                </span>
                <button 
                  onClick={() => setSelectedJuz(juz.number)}
                  className={`p-2 rounded-full transition-colors ${
                    juz.completed 
                      ? 'bg-white/20 hover:bg-white/40 text-[#0a192f]' 
                      : theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-[#D4AF37]' : 'bg-slate-50 hover:bg-slate-100 text-[#D4AF37]'
                  }`}
                  title="View Notes"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => toggleJuz(juz.number)}
                  className={`w-full py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all ${
                    juz.completed 
                      ? 'bg-[#0a192f] text-[#D4AF37]' 
                      : 'bg-[#D4AF37] text-white hover:bg-[#facc15]'
                  }`}
                >
                  {juz.completed ? 'Completed' : 'Mark Done'}
                </button>
                {juz.notes && (
                   <div className={`text-[8px] truncate italic ${juz.completed ? 'text-[#0a192f]/60' : 'text-slate-400'}`}>
                     Reflected: {juz.notes}
                   </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedJuz !== null && (
        <NotesModal 
          isOpen={selectedJuz !== null}
          onClose={() => setSelectedJuz(null)}
          onSave={(notes) => updateNotes(selectedJuz, notes)}
          initialValue={juzList.find(j => j.number === selectedJuz)?.notes || ''}
          juzNumber={selectedJuz}
        />
      )}
    </div>
  );
};

export default QuranTracker;
