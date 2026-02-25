
import React, { useState, useEffect, useMemo } from 'react';
import { DayData, HabitStatus } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { RAMADAN_2026 } from '../constants';

const HABITS: { key: keyof HabitStatus; label: string; icon: string }[] = [
  { key: 'fasting', label: 'Fasting', icon: '🌙' },
  { key: 'prayers', label: '5 Prayers', icon: '🕌' },
  { key: 'taraweeh', label: 'Taraweeh', icon: '✨' },
  { key: 'quran', label: 'Quran', icon: '📖' },
  { key: 'dhikr', label: 'Dhikr', icon: '📿' },
  { key: 'charity', label: 'Charity', icon: '🤝' },
];

const RamadanTracker: React.FC = () => {
  const [data, setData] = useState<DayData[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem('ramadan_tracker_v1');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        setData(generateInitialData());
      }
    } else {
      setData(generateInitialData());
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('ramadan_tracker_v1', JSON.stringify(data));
    }
  }, [data, isInitialized]);

  const generateInitialData = (): DayData[] => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      habits: {
        fasting: false,
        prayers: false,
        taraweeh: false,
        quran: false,
        dhikr: false,
        charity: false,
      },
    }));
  };

  const toggleHabit = (dayNum: number, habit: keyof HabitStatus) => {
    setData((prev) =>
      prev.map((d) => {
        if (d.day === dayNum) {
          const newHabits = { ...d.habits, [habit]: !d.habits[habit] };
          const allCompleted = Object.values(newHabits).every(v => v === true);
          if (allCompleted && !Object.values(d.habits).every(v => v === true)) {
            triggerConfetti();
          }
          return { ...d, habits: newHabits };
        }
        return d;
      })
    );
  };

  const triggerConfetti = async () => {
    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#F1D279', '#050a14']
      });
    } catch (e) {
      console.error("Confetti failed to load");
    }
  };

  const stats = useMemo(() => {
    let totalPossible = 30 * HABITS.length;
    let totalCompleted = 0;
    data.forEach(d => Object.values(d.habits).forEach(v => { if (v) totalCompleted++; }));
    return {
      overallProgress: (totalCompleted / totalPossible) * 100,
      totalCompleted,
      daysCompleted: data.filter(d => Object.values(d.habits).every(v => v === true)).length
    };
  }, [data]);

  const currentRamadanDay = (() => {
    const now = new Date();
    const start = RAMADAN_2026.startDate;
    const diffTime = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    if (now < start) return 0;
    return Math.min(30, diffDays);
  })();

  if (!isInitialized) return null;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Board */}
      <div className={`rounded-3xl p-10 mb-20 border shadow-luxury relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#0a1128] border-white/5' : 'bg-white border-slate-200'
      }`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[80px] -mr-32 -mt-32"></div>
        
        <div className="relative z-10">
          <h3 className={`font-serif text-3xl mb-2 tracking-tight ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-[#0a1128]'}`}>Personal Evolution</h3>
          <p className="text-slate-500 font-light">Consistency creates transformation.</p>
        </div>

        <div className="relative flex flex-col items-center">
           <svg className="w-40 h-40 -rotate-90">
             <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="2" fill="transparent" className={theme === 'dark' ? 'text-white/5' : 'text-slate-100'} />
             <circle 
                cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="3" fill="transparent" 
                strokeDasharray={465}
                strokeDashoffset={465 - (465 * stats.overallProgress) / 100}
                className="text-[#D4AF37] transition-all duration-1000 ease-in-out" 
                strokeLinecap="round"
             />
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-light ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-[#0a1128]'}`}>{Math.round(stats.overallProgress)}%</span>
              <span className="text-[8px] text-[#D4AF37] uppercase tracking-[0.2em]">Completion</span>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-10 relative z-10">
          <div className="text-center md:text-left">
            <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] mb-1">Total Acts</p>
            <p className={`text-4xl font-light ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-[#0a1128]'}`}>{stats.totalCompleted}</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] mb-1">Perfect Days</p>
            <p className={`text-4xl font-light ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-[#0a1128]'}`}>{stats.daysCompleted}</p>
          </div>
        </div>
      </div>

      {/* Grid of Days */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {data.map((dayData) => {
          const completedCount = Object.values(dayData.habits).filter(v => v).length;
          const dayProgress = (completedCount / HABITS.length) * 100;
          const isDayComplete = completedCount === HABITS.length;

          return (
            <div 
              key={dayData.day}
              className={`group relative border rounded-2xl p-6 transition-all duration-500 hover:shadow-luxury ${
                theme === 'dark' ? 'bg-[#0a101f]' : 'bg-white'
              } ${
                dayData.day === currentRamadanDay 
                  ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/30 shadow-gold-glow' 
                  : isDayComplete ? 'border-[#D4AF37]' : theme === 'dark' ? 'border-white/5' : 'border-slate-100'
              }`}
            >
              {dayData.day === currentRamadanDay && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#D4AF37] text-[#0a1128] text-[8px] font-bold uppercase tracking-widest rounded-full shadow-lg z-10">
                  Today
                </div>
              )}
              <div className="flex items-center justify-between mb-8">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">Day</span>
                <span className={`text-3xl font-serif ${isDayComplete ? 'text-[#D4AF37]' : theme === 'dark' ? 'text-[#f1f5f9]' : 'text-[#0a1128]'}`}>
                  {dayData.day.toString().padStart(2, '0')}
                </span>
              </div>

              <div className="space-y-4">
                {HABITS.map((habit) => (
                  <button
                    key={habit.key}
                    onClick={() => toggleHabit(dayData.day, habit.key)}
                    className="w-full flex items-center justify-between group/btn text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-base grayscale group-hover/btn:grayscale-0 transition-all opacity-40 group-hover/btn:opacity-100">
                        {habit.icon}
                      </span>
                      <span className={`text-[11px] font-medium tracking-wide transition-colors ${
                        dayData.habits[habit.key] 
                          ? theme === 'dark' ? 'text-[#f1f5f9]' : 'text-[#0a1128]' 
                          : 'text-slate-400'
                      }`}>
                        {habit.label}
                      </span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border transition-all flex items-center justify-center ${
                      dayData.habits[habit.key] 
                        ? 'bg-[#D4AF37] border-[#D4AF37]' 
                        : theme === 'dark' ? 'border-white/10 group-hover/btn:border-[#D4AF37]/50' : 'border-slate-200 group-hover/btn:border-[#D4AF37]/50'
                    }`}>
                      {dayData.habits[habit.key] && (
                        <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className={`mt-8 pt-6 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-50'}`}>
                <div className={`h-1 w-full rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <div 
                    className="h-full bg-[#D4AF37] transition-all duration-700 ease-out" 
                    style={{ width: `${dayProgress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RamadanTracker;
