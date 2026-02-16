
import React from 'react';
import { NavItem } from '../types';

interface MobileMenuProps {
  isOpen: boolean;
  items: NavItem[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, items, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <nav className="fixed top-0 right-0 bottom-0 w-72 bg-[#0a192f] border-l border-[#D4AF37]/20 p-8 flex flex-col gap-8 shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="p-2 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg font-medium text-slate-200 hover:text-[#D4AF37] transition-colors flex items-center justify-between group"
              onClick={onClose}
            >
              {item.label}
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        <div className="mt-auto">
          <button className="w-full py-3 bg-[#D4AF37] text-[#0a192f] font-bold rounded hover:bg-[#facc15] transition-colors shadow-lg">
            Join Community
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
