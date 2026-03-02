import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useGamification } from '../contexts/GamificationContext';
import { DailyDeed } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const DEEDS: DailyDeed[] = [
  { id: 'd1', title: "Help with Iftar prep", points: 30, icon: "🥗" },
  { id: 'd2', title: "Tidy up your room", points: 20, icon: "🧹" },
  { id: 'd3', title: "Read one story", points: 40, icon: "📖" },
  { id: 'd4', title: "Say 'JazakAllah Khair'", points: 15, icon: "🗣️" },
  { id: 'd5', title: "Feed a bird or cat", points: 50, icon: "🐦" },
  { id: 'd6', title: "Make Dua for parents", points: 25, icon: "🤲" },
  { id: 'd7', title: "Share a toy/treat", points: 35, icon: "🧸" },
  { id: 'd8', title: "Learn a new word", points: 20, icon: "🎓" },
];

const DailyDeeds: React.FC = () => {
  const { theme } = useTheme();
  const { addPoints } = useGamification();
  const [completedToday, setCompletedToday] = useState<string[]>(() => {
    const saved = localStorage.getItem('noornest_daily_deeds');
    const today = new Date().toDateString();
    const data = saved ? JSON.parse(saved) : null;
    
    if (data && data.date === today) {
      return data.ids;
    }
    return [];
  });

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem('noornest_daily_deeds', JSON.stringify({
      date: today,
      ids: completedToday
    }));
  }, [completedToday]);

  const toggleDeed = (deed: DailyDeed) => {
    if (completedToday.includes(deed.id)) {
      setCompletedToday(prev => prev.filter(id => id !== deed.id));
      addPoints(-deed.points); // Subtract points if unchecked
    } else {
      setCompletedToday(prev => [...prev, deed.id]);
      addPoints(deed.points);
    }
  };

  const progress = (completedToday.length / DEEDS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Progress Bar */}
      <div className={`p-8 rounded-[32px] border ${
        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`font-serif text-2xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Daily Deeds Progress</h3>
          <span className="text-[#D4AF37] font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-slate-700/20 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#D4AF37] shadow-gold-glow"
          />
        </div>
        <p className="mt-4 text-slate-500 text-sm font-light italic">
          Complete your daily deeds to earn XP and level up!
        </p>
      </div>

      {/* Deeds List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {DEEDS.map((deed) => {
          const isDone = completedToday.includes(deed.id);
          return (
            <button
              key={deed.id}
              onClick={() => toggleDeed(deed)}
              className={`p-6 rounded-2xl border flex items-center gap-6 transition-all duration-300 text-left group ${
                isDone
                  ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:border-[#D4AF37]/30'
                  : 'bg-white border-slate-200 hover:border-[#D4AF37]/30'
              }`}
            >
              <div className={`text-3xl transition-transform duration-500 ${isDone ? 'scale-110' : 'group-hover:scale-110'}`}>
                {deed.icon}
              </div>
              <div className="flex-1">
                <p className={`font-medium mb-1 ${isDone ? 'text-[#D4AF37]' : theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {deed.title}
                </p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  +{deed.points} XP
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isDone ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-slate-300 dark:border-slate-700'
              }`}>
                {isDone && (
                  <svg className="w-4 h-4 text-[#0a1128]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DailyDeeds;
