
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useGamification } from '../contexts/GamificationContext';
import { Challenge } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const CHALLENGES: Challenge[] = [
  {
    id: 'ch1',
    title: "The Smile Sunnah",
    points: 50,
    description: "Smile at everyone you meet today. It's a simple act of charity.",
    icon: "😊",
    category: 'Daily'
  },
  {
    id: 'ch2',
    title: "Digital Fast",
    points: 100,
    description: "Avoid social media for 4 hours today to focus on reflection.",
    icon: "📱",
    category: 'Daily'
  },
  {
    id: 'ch3',
    title: "Neighbor's Treat",
    points: 150,
    description: "Share a small portion of your Iftar with a neighbor.",
    icon: "🎁",
    category: 'Weekly'
  },
  {
    id: 'ch4',
    title: "Quran Marathon",
    points: 300,
    description: "Read 10 pages of Quran in one sitting.",
    icon: "📖",
    category: 'Weekly'
  },
  {
    id: 'ch5',
    title: "Dua List",
    points: 80,
    description: "Write down 10 specific Duas you want to make this Ramadan.",
    icon: "📝",
    category: 'Daily'
  },
  {
    id: 'ch6',
    title: "Water Only",
    points: 120,
    description: "Drink only water for Suhoor and Iftar today (no sugary drinks).",
    icon: "💧",
    category: 'Daily'
  },
  {
    id: 'ch7',
    title: "Family Circle",
    points: 200,
    description: "Lead a 10-minute family discussion about a Prophet's story.",
    icon: "👨‍👩‍👧‍👦",
    category: 'Weekly'
  },
  {
    id: 'ch8',
    title: "Mosque Cleanup",
    points: 500,
    description: "Help clean up the prayer area or library at your local mosque.",
    icon: "🧹",
    category: 'Special'
  },
  {
    id: 'ch9',
    title: "Iftar for One",
    points: 400,
    description: "Pay for a meal for someone in need.",
    icon: "🍲",
    category: 'Special'
  }
];

const ChallengesSection: React.FC = () => {
  const { theme } = useTheme();
  const { addPoints } = useGamification();
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('noornest_completed_challenges');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeCategory, setActiveCategory] = useState<'All' | 'Daily' | 'Weekly' | 'Special'>('All');

  useEffect(() => {
    localStorage.setItem('noornest_completed_challenges', JSON.stringify(completedIds));
  }, [completedIds]);

  const handleComplete = (challenge: Challenge) => {
    if (completedIds.includes(challenge.id)) return;
    
    setCompletedIds(prev => [...prev, challenge.id]);
    addPoints(challenge.points);
  };

  const filteredChallenges = activeCategory === 'All' 
    ? CHALLENGES 
    : CHALLENGES.filter(c => c.category === activeCategory);

  const categories: ('All' | 'Daily' | 'Weekly' | 'Special')[] = ['All', 'Daily', 'Weekly', 'Special'];

  return (
    <div className="space-y-12">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border ${
              activeCategory === cat
                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0a1128]'
                : theme === 'dark'
                ? 'bg-white/5 border-white/10 text-slate-400 hover:border-[#D4AF37]/50'
                : 'bg-white border-slate-200 text-slate-600 hover:border-[#D4AF37]/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredChallenges.map((challenge) => {
            const isCompleted = completedIds.includes(challenge.id);
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={challenge.id}
                className={`p-8 rounded-[32px] border transition-all duration-500 relative overflow-hidden group ${
                  isCompleted 
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5' 
                    : theme === 'dark' 
                    ? 'bg-white/5 border-white/10 hover:border-[#D4AF37]/30' 
                    : 'bg-white border-slate-200 hover:border-[#D4AF37]/30'
                }`}
              >
                {isCompleted && (
                  <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#0a1128] px-4 py-1 text-[8px] font-bold tracking-tighter uppercase rounded-bl-xl">
                    Completed
                  </div>
                )}
                
                <div className="text-4xl mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 inline-block">
                  {challenge.icon}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-serif text-xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{challenge.title}</h3>
                  <span className={`font-bold ${isCompleted ? 'text-[#D4AF37]' : 'text-slate-400'}`}>
                    +{challenge.points} XP
                  </span>
                </div>
                
                <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 min-h-[60px]">
                  {challenge.description}
                </p>
                
                <button 
                  disabled={isCompleted}
                  onClick={() => handleComplete(challenge)}
                  className={`w-full py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                    isCompleted
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-white/10 dark:text-slate-600'
                      : 'bg-[#D4AF37] text-[#0a1128] hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {isCompleted ? 'Challenge Done' : 'Complete Challenge'}
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChallengesSection;
