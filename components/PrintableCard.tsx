
import React from 'react';
import { Printable } from '../types';

interface PrintableCardProps {
  item: Printable;
}

const PrintableCard: React.FC<PrintableCardProps> = ({ item }) => {
  const handleDownload = () => {
    if (item.fileUrl) {
      const link = document.createElement('a');
      link.href = item.fileUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      // If it's a Supabase URL, we can try to force download
      if (item.fileUrl.includes('supabase.co')) {
        link.download = `${item.title.replace(/\s+/g, '_')}.pdf`;
      }
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("This resource is being prepared for download.");
    }
  };

  return (
    <div className="group relative bg-[#fdfcf0] rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full border border-[#D4AF37]/10 hover:border-[#D4AF37]/40">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={item.thumbnailUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[#0a192f]/20 group-hover:bg-transparent transition-colors duration-500" />
        
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-[#D4AF37]/20 shadow-sm">
          <span className="text-[10px] font-bold text-[#0a192f] uppercase tracking-wider">{item.category}</span>
        </div>

        {item.isPremium && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37] text-[#0a192f] rounded-full shadow-lg animate-pulse">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 11-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-tight">Premium</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-xl text-[#0a192f] mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed">
          {item.description}
        </p>
        
        <button 
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#D4AF37] hover:text-white transition-all duration-300 group/btn"
        >
          <svg className="w-4 h-4 transition-transform group-hover/btn:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PrintableCard;
