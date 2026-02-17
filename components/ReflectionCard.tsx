
import React, { useState } from 'react';
import { Reflection } from '../types';

interface ReflectionCardProps {
  reflection: Reflection;
}

const ReflectionCard: React.FC<ReflectionCardProps> = ({ reflection }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="relative group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-700 flex flex-col h-full hover:-translate-y-2">
      <div className="absolute top-0 right-0 p-8">
        <div className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center text-[#D4AF37] font-serif text-xl group-hover:bg-[#D4AF37] group-hover:text-white group-hover:border-[#D4AF37] transition-all duration-500">
          {reflection.day}
        </div>
      </div>

      <div className="p-10 pt-12 flex flex-col flex-grow">
        <div className="mb-8">
          <span className="text-[9px] font-bold tracking-[0.4em] text-[#D4AF37] uppercase block mb-4">Daily Verse</span>
          <h3 className="font-serif text-2xl text-[#050a14] italic leading-relaxed tracking-tight">
            "{reflection.ayah}"
          </h3>
        </div>

        <div className="text-slate-500 font-light leading-relaxed mb-10 flex-grow text-sm">
          <p className="whitespace-pre-line">
            {reflection.reflectionText}
          </p>
        </div>

        <div className="bg-slate-50/50 p-6 rounded-2xl mb-8 border border-slate-100/50">
          <span className="font-bold text-[#D4AF37] block mb-3 text-[9px] uppercase tracking-[0.3em]">Contemplation</span>
          <p className="text-[#050a14] italic text-sm font-light leading-relaxed">
            {reflection.journalQuestion}
          </p>
        </div>

        <div className="border-t border-slate-100 pt-8 mt-auto">
          <div className="flex items-center justify-between">
            <div className="max-w-[80%]">
              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest block mb-1">Supplication</span>
              <p className="text-[#050a14] font-medium text-xs truncate italic">
                {reflection.dua}
              </p>
            </div>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-3 rounded-full transition-all duration-500 ${
                isBookmarked 
                  ? 'bg-[#D4AF37] text-white shadow-gold-glow' 
                  : 'bg-slate-50 text-slate-300 hover:text-[#D4AF37]'
              }`}
            >
              <svg className={`w-5 h-5 ${isBookmarked ? 'fill-current' : 'fill-none'}`} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflectionCard;
