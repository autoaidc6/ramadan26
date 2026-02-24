
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Logo: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className="flex items-center gap-4 cursor-pointer group">
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Glow */}
        <div className="absolute inset-0 bg-[#D4AF37]/20 blur-[10px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700"></div>
        
        {/* Crescent Shape */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="absolute inset-0 w-full h-full text-[#D4AF37] transition-all duration-700 group-hover:rotate-[20deg]"
        >
          <path 
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" 
            fill="currentColor"
          />
        </svg>
        
        {/* Center Lantern Icon */}
        <div className="z-10 mt-1 mr-1 transition-transform duration-700 group-hover:scale-110">
          <svg width="12" height="16" viewBox="0 0 14 18" fill="none">
            <path d="M7 2L10 4V12L7 14L4 12V4L7 2Z" fill="white" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="7" cy="8" r="1.5" fill="#facc15" className="animate-pulse" />
          </svg>
        </div>
      </div>
      
      <div className="flex flex-col leading-none">
        <span className={`font-serif text-2xl font-medium tracking-tight group-hover:text-[#D4AF37] transition-colors duration-500 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Ramadan
        </span>
        <span className="text-[8px] text-[#D4AF37] uppercase tracking-[0.5em] font-bold opacity-80 mt-1">
          Lifestyle
        </span>
      </div>
    </div>
  );
};

export default Logo;
