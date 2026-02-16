
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Crescent Shape */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="absolute inset-0 w-full h-full text-[#D4AF37] transition-transform duration-500 group-hover:rotate-12"
        >
          <path 
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" 
            fill="currentColor"
            stroke="currentColor" 
            strokeWidth="1"
            strokeLinejoin="round" 
          />
        </svg>
        
        {/* Lantern Detail */}
        <div className="z-10 mt-1 mr-1">
          <svg 
            width="14" 
            height="18" 
            viewBox="0 0 14 18" 
            fill="none" 
            className="text-[#0a192f]"
          >
            <path d="M7 2L10 4V12L7 14L4 12V4L7 2Z" fill="#FFFBEB" stroke="#D4AF37" strokeWidth="0.5" />
            <rect x="6" y="5" width="2" height="6" fill="#D4AF37" opacity="0.8" />
            <circle cx="7" cy="8" r="1.5" fill="#facc15" className="animate-pulse" />
          </svg>
        </div>
      </div>
      
      <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors duration-300">
        Ramadan<span className="text-[#D4AF37]">Kareem</span>
      </span>
    </div>
  );
};

export default Logo;
