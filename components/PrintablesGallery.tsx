
import React, { useState, useMemo } from 'react';
import { Printable, PrintableCategory } from '../types';
import PrintableCard from './PrintableCard';

const CATEGORIES: PrintableCategory[] = ['All', 'Planners', 'Kids', 'Trackers', 'Family'];

const PRINTABLES_DATA: Printable[] = [
  {
    id: '1',
    title: '30-Day Spiritual Planner',
    description: 'A comprehensive layout to track your goals, daily ibadah, and gratitude during the holy month.',
    category: 'Planners',
    isPremium: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Ramadan Activity Book for Kids',
    description: 'Filled with coloring pages, simple surahs, and puzzles to keep the little ones engaged.',
    category: 'Kids',
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Daily Meal & Grocery Planner',
    description: 'Plan your Suhoor and Iftar meals efficiently with this elegant weekly template.',
    category: 'Planners',
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Family Deed Tree Tracker',
    description: 'A visual way for the whole family to track shared good deeds and charitable acts.',
    category: 'Trackers',
    isPremium: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Sunnah Habit Checklist',
    description: 'Focus on small Sunnah acts throughout the day with this simple minimalist tracker.',
    category: 'Trackers',
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Ramadan Scavenger Hunt',
    description: 'A fun family game to find Islamic items and learn about traditions at home.',
    category: 'Family',
    isPremium: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2959213?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '7',
    title: 'Surah Memorization Chart',
    description: 'Track progress as you or your children memorize new Surahs this Ramadan.',
    category: 'Kids',
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '8',
    title: 'Gratitude & Dua Journal',
    description: 'Beautifully designed pages for daily journaling and noting down your special supplications.',
    category: 'Planners',
    isPremium: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop'
  }
];

const PrintablesGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PrintableCategory>('All');

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return PRINTABLES_DATA;
    return PRINTABLES_DATA.filter(item => item.category === activeTab);
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border-2 ${
              activeTab === cat
                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0a192f] shadow-lg scale-105'
                : 'bg-white border-slate-100 text-slate-400 hover:border-[#D4AF37]/30 hover:text-[#D4AF37]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PrintableCard item={item} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 font-medium italic">No printables found in this category yet. Check back soon!</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-[#0a192f] to-[#112240] border border-[#D4AF37]/20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h4 className="font-serif text-2xl text-white mb-2">Want Custom Templates?</h4>
          <p className="text-slate-300 text-sm">Join our premium community to access unlimited high-resolution PDF printables.</p>
        </div>
        <button className="px-8 py-4 bg-[#D4AF37] text-[#0a192f] font-bold rounded-xl hover:bg-[#facc15] transition-all duration-300 shadow-xl">
          UNLOCK PREMIUM ACCESS
        </button>
      </div>
    </div>
  );
};

export default PrintablesGallery;
