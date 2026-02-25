
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user, profile, role, signOut, isAuthEnabled } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
  
  const formattedTime = currentTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled 
            ? theme === 'dark' 
              ? 'bg-[#0a1128]/80 backdrop-blur-xl py-4 border-b border-white/5' 
              : 'bg-white/80 backdrop-blur-xl py-4 border-b border-slate-200'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <div className={`hidden xl:flex flex-col border-l pl-8 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formattedDate}</span>
              <span className="text-[8px] text-[#D4AF37] uppercase tracking-[0.3em] font-medium mt-1">{formattedTime}</span>
            </div>
          </div>

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
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-white/5 text-[#D4AF37] hover:bg-white/10' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`text-[9px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-[#0a1128]'}`}>{user.email.split('@')[0]}</p>
                  <p className="text-[7px] text-[#D4AF37] uppercase tracking-widest">{role}</p>
                </div>
                <button 
                  onClick={() => signOut()}
                  className={`px-6 py-2 border text-[9px] font-bold tracking-[0.2em] uppercase transition-all rounded-full ${
                    theme === 'dark' 
                      ? 'border-white/10 text-white hover:bg-white/5' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Sign Out
                </button>
              </div>
            ) : isAuthEnabled ? (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="px-8 py-3 bg-[#D4AF37] text-[#0a1128] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-all duration-500 rounded-full shadow-luxury"
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
