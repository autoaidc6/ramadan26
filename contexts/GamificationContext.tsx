
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Badge, UserStats } from '../types';

interface GamificationContextType {
  stats: UserStats;
  addPoints: (amount: number) => void;
  unlockBadge: (badgeId: string) => void;
  updateStats: (updates: Partial<UserStats>) => void;
}

const ALL_BADGES: Badge[] = [
  { id: 'first_fast', name: 'First Fast', description: 'Completed your first fast of Ramadan', icon: '🌙', category: 'Habits' },
  { id: 'quran_seeker', name: 'Quran Seeker', description: 'Completed 5 Juz of the Quran', icon: '📖', category: 'Quran' },
  { id: 'streak_7', name: 'Consistent Soul', description: 'Maintained a 7-day habit streak', icon: '🔥', category: 'Habits' },
  { id: 'charity_star', name: 'Generous Heart', description: 'Logged 10 acts of charity', icon: '🤝', category: 'Social' },
  { id: 'ramadan_pro', name: 'Ramadan Luminary', description: 'Reached Level 10', icon: '✨', category: 'Special' },
];

const INITIAL_STATS: UserStats = {
  points: 0,
  level: 1,
  streak: 0,
  badges: [],
  totalHabitsCompleted: 0,
  totalJuzCompleted: 0,
};

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('noornest_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  useEffect(() => {
    localStorage.setItem('noornest_stats', JSON.stringify(stats));
  }, [stats]);

  const addPoints = (amount: number) => {
    setStats(prev => {
      const newPoints = prev.points + amount;
      const newLevel = Math.floor(newPoints / 1000) + 1;
      
      // Check for level up badge
      let newBadges = [...prev.badges];
      if (newLevel >= 10 && !newBadges.find(b => b.id === 'ramadan_pro')) {
        const badge = ALL_BADGES.find(b => b.id === 'ramadan_pro')!;
        newBadges.push({ ...badge, unlockedAt: new Date().toISOString() });
      }

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        badges: newBadges
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setStats(prev => {
      if (prev.badges.find(b => b.id === badgeId)) return prev;
      const badge = ALL_BADGES.find(b => b.id === badgeId);
      if (!badge) return prev;
      
      return {
        ...prev,
        badges: [...prev.badges, { ...badge, unlockedAt: new Date().toISOString() }]
      };
    });
  };

  const updateStats = (updates: Partial<UserStats>) => {
    setStats(prev => ({ ...prev, ...updates }));
  };

  return (
    <GamificationContext.Provider value={{ stats, addPoints, unlockBadge, updateStats }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
