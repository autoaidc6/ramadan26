
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, profile, role, signOut, isAuthEnabled } = useAuth();

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

          <nav className="hidden lg:flex items-center gap-10">
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
            {role === 'admin' && (
              <a href="#admin" className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] hover:text-white transition-all">
                Admin
              </a>
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-8">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[9px] text-white font-bold uppercase tracking-widest">{profile?.username || user.email.split('@')[0]}</p>
                  <p className="text-[7px] text-[#D4AF37] uppercase tracking-widest">{role}</p>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="px-6 py-2 border border-white/10 text-white text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all rounded-full"
                >
                  Sign Out
                </button>
              </div>
            ) : isAuthEnabled ? (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="px-8 py-3 bg-[#D4AF37] text-[#050a14] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-all duration-500 rounded-full shadow-luxury"
              >
                Sign In
              </button>
            ) : (
              <div 
                title="Supabase keys not found. Running in Local-Only mode."
                className="text-[8px] text-[#D4AF37]/60 cursor-help uppercase tracking-widest border border-[#D4AF37]/20 px-4 py-2 rounded-full backdrop-blur-sm"
              >
                Offline Mode
              </div>
            )}
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
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
