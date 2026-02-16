
import React, { useState } from 'react';
import { Reflection } from '../types';

interface ReflectionCardProps {
  reflection: Reflection;
}

const ReflectionCard: React.FC<ReflectionCardProps> = ({ reflection }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="relative group bg-[#fdfcf0] border-l-4 border-[#D4AF37] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      {/* Day Badge */}
      <div className="absolute top-0 right-0 p-4">
        <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0a192f] font-bold shadow-md">
          {reflection.day}
        </div>
      </div>

      <div className="p-8 pt-10 flex flex-col flex-grow">
        {/* Ayah Reference */}
        <div className="mb-6">
          <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase block mb-1">Daily Ayah</span>
          <h3 className="font-serif text-xl md:text-2xl text-[#0a192f] italic font-semibold leading-relaxed">
            "{reflection.ayah}"
          </h3>
        </div>

        {/* Reflection Text */}
        <div className="prose prose-sm text-slate-700 leading-relaxed mb-8 flex-grow">
          <p className="whitespace-pre-line">
            {reflection.reflectionText}
          </p>
        </div>

        {/* Journaling Question */}
        <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/10 p-5 rounded-lg mb-6 italic text-[#0a192f]/80 text-sm">
          <span className="font-bold text-[#D4AF37] not-italic block mb-2 text-xs uppercase tracking-wider">Self-Reflection</span>
          {reflection.journalQuestion}
        </div>

        {/* Dua Section */}
        <div className="border-t border-[#D4AF37]/20 pt-6">
          <h4 className="font-serif text-[#D4AF37] font-bold text-lg mb-2">Dua of the Day</h4>
          <p className="text-[#0a192f] font-medium leading-relaxed italic">
            {reflection.dua}
          </p>
        </div>

        {/* Action Bar */}
        <div className="mt-8 flex items-center justify-between">
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              isBookmarked 
                ? 'bg-[#D4AF37] text-white' 
                : 'bg-slate-200 text-slate-600 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37]'
            }`}
          >
            <svg 
              className={`w-5 h-5 transition-colors ${isBookmarked ? 'fill-current' : 'fill-none'}`} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="text-xs font-bold tracking-widest uppercase">
              {isBookmarked ? 'Saved' : 'Bookmark'}
            </span>
          </button>

          <button className="text-[#0a192f]/40 hover:text-[#D4AF37] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReflectionCard;
