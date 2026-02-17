
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled 
            ? 'bg-[#050a14]/80 backdrop-blur-xl py-4 border-b border-white/5' 
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-12">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative group text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300 text-slate-400 hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#D4AF37] transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-8">
            <button className="text-[10px] font-bold tracking-[0.2em] uppercase text-white hover:text-[#D4AF37] transition-colors">
              Community
            </button>
            <button className="px-8 py-3 bg-white/5 border border-white/10 text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-[#050a14] hover:border-[#D4AF37] transition-all duration-500 rounded-full">
              Contribute
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-[#D4AF37] transition-transform hover:scale-110"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        items={NAV_ITEMS} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

export default Navbar;
