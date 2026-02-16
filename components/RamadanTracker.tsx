
import React, { useState, useEffect, useMemo } from 'react';
import { DayData, HabitStatus } from '../types';

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

  // Initialize data
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

  // Save data
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
          
          // Trigger confetti if all completed
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
      const confetti = (await import('https://esm.sh/canvas-confetti')).default;
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#facc15', '#ffffff']
      });
    } catch (e) {
      console.error("Confetti failed to load");
    }
  };

  const stats = useMemo(() => {
    let totalPossible = 30 * HABITS.length;
    let totalCompleted = 0;
    
    data.forEach(d => {
      Object.values(d.habits).forEach(v => {
        if (v) totalCompleted++;
      });
    });

    const overallProgress = (totalCompleted / totalPossible) * 100;
    
    return {
      overallProgress,
      totalCompleted,
      daysCompleted: data.filter(d => Object.values(d.habits).every(v => v === true)).length
    };
  }, [data]);

  if (!isInitialized) return null;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      {/* Header Stats */}
      <div className="bg-[#0a192f] border border-[#D4AF37]/20 rounded-2xl p-8 mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
           <svg width="200" height="200" viewBox="0 0 24 24" fill="#D4AF37"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
        </div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl text-white mb-2">Ramadan Journey</h2>
            <p className="text-slate-400">Track your spiritual progress through the holy month.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
               <svg className="w-full h-full -rotate-90">
                 <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                 <circle 
                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * stats.overallProgress) / 100}
                    className="text-[#D4AF37] transition-all duration-1000 ease-out" 
                    strokeLinecap="round"
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">{Math.round(stats.overallProgress)}%</span>
                  <span className="text-[10px] text-[#D4AF37] uppercase tracking-tighter">Total Progress</span>
               </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{stats.totalCompleted}</div>
              <div className="text-xs text-[#D4AF37] uppercase tracking-widest">Acts Done</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{stats.daysCompleted}</div>
              <div className="text-xs text-[#D4AF37] uppercase tracking-widest">Full Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Days */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {data.map((dayData) => {
          const completedCount = Object.values(dayData.habits).filter(v => v).length;
          const dayProgress = (completedCount / HABITS.length) * 100;
          const isDayComplete = completedCount === HABITS.length;

          return (
            <div 
              key={dayData.day}
              className={`group bg-white rounded-xl p-5 border-t-4 transition-all duration-300 hover:shadow-xl ${
                isDayComplete ? 'border-[#D4AF37]' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Day</span>
                <span className={`text-2xl font-serif font-bold ${isDayComplete ? 'text-[#D4AF37]' : 'text-[#0a192f]'}`}>
                  {dayData.day < 10 ? `0${dayData.day}` : dayData.day}
                </span>
              </div>

              <div className="space-y-3">
                {HABITS.map((habit) => (
                  <button
                    key={habit.key}
                    onClick={() => toggleHabit(dayData.day, habit.key)}
                    className="w-full flex items-center justify-between group/btn"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg grayscale group-hover/btn:grayscale-0 transition-all">{habit.icon}</span>
                      <span className={`text-xs font-medium transition-colors ${
                        dayData.habits[habit.key] ? 'text-[#0a192f]' : 'text-slate-400'
                      }`}>
                        {habit.label}
                      </span>
                    </div>
                    <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                      dayData.habits[habit.key] 
                        ? 'bg-[#D4AF37] border-[#D4AF37]' 
                        : 'border-slate-300 group-hover/btn:border-[#D4AF37]'
                    }`}>
                      {dayData.habits[habit.key] && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Day Progress Bar */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Progress</span>
                  <span className="text-[10px] font-bold text-[#D4AF37]">{Math.round(dayProgress)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#D4AF37] transition-all duration-500 ease-out" 
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
