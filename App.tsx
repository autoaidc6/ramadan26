
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import ReflectionCard from './components/ReflectionCard';
import RamadanTracker from './components/RamadanTracker';
import QuranTracker from './components/QuranTracker';
import PrintablesGallery from './components/PrintablesGallery';
import AdminDashboard from './components/AdminDashboard';
import TraditionsSection from './components/TraditionsSection';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Reflection } from './types';

const REFLECTIONS: Reflection[] = [
  {
    id: '1',
    day: 1,
    ayah: "O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteousness.",
    reflectionText: "Ramadan is not merely a test of physical endurance, but a deliberate spiritual redirection. By stepping away from the habitual intake of nourishment, we create a vacuum that can only be filled with spiritual light.",
    journalQuestion: "What is one specific spiritual 'habit' you want to intentionally cultivate during these first ten days of Mercy?",
    dua: "Allahumma laka sumtu wa bika amantu wa 'ala rizqika aftartu."
  },
  {
    id: '2',
    day: 2,
    ayah: "The month of Ramadhan [is that] in which was revealed the Qur'an, a guidance for the people and clear proofs of guidance.",
    reflectionText: "The heartbeat of Ramadan is the Quran. It was in this month that the heavens spoke to the earth, delivering a message of timeless wisdom.",
    journalQuestion: "Which verse from the Quran has resonated most with your current life situation lately? Why?",
    dua: "Allahumma ij'alil-Qur'ana rabi'a qulubina."
  }
];

const MainContent: React.FC = () => {
  const { role } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-[#D4AF37] selection:text-[#050a14] overflow-x-hidden ${
      theme === 'dark' 
        ? 'bg-[#050a14] text-slate-200' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      <Navbar />
      
      {/* Background Floating Element */}
      <div className="fixed top-[15%] -right-[10%] w-[600px] h-[600px] opacity-[0.03] pointer-events-none animate-slow-spin select-none">
        <svg viewBox="0 0 24 24" fill="#D4AF37">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="relative z-10 container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center pt-20">
          <div className="text-center lg:text-left reveal">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
              <span className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase">NoorNest Premium Experience</span>
            </div>
            <h1 className={`font-serif text-6xl md:text-8xl font-medium mb-8 leading-[1.05] tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Elevate Your <br /><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F1D279] to-[#D4AF37] bg-[length:200%_auto] animate-shimmer">Spirit</span></h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-12 font-light leading-relaxed">A curated digital sanctuary for the modern believer. Experience a month of growth, reflection, and sacred traditions.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <a href="#tracker" className="group relative w-full sm:w-auto px-12 py-5 bg-[#D4AF37] text-[#050a14] font-bold tracking-widest rounded-full overflow-hidden transition-all duration-500 hover:shadow-luxury hover:-translate-y-1 text-center text-xs uppercase">Begin Experience</a>
              <a href="#calendar" className={`w-full sm:w-auto px-12 py-5 border font-bold tracking-widest rounded-full transition-all duration-300 text-center text-xs uppercase ${
                theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}>Daily Reflections</a>
            </div>
          </div>
          <div className="relative flex justify-center items-center reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="relative animate-float-luxury">
              <div className="absolute inset-0 bg-[#D4AF37]/20 blur-[80px] rounded-full animate-glow-pulse"></div>
              <svg width="320" height="440" viewBox="0 0 280 400" fill="none" className="drop-shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                <path d="M140 20L185 65H95L140 20Z" fill="#D4AF37" />
                <rect x="60" y="105" width="160" height="210" fill={theme === 'dark' ? '#050a14' : '#f8fafc'} stroke="#D4AF37" strokeWidth="3" />
                <circle cx="140" cy="210" r="55" fill="url(#luxuryGlow)" />
                <defs><radialGradient id="luxuryGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(140 210) rotate(90) scale(90)"><stop stopColor="#facc15" stopOpacity="0.7" /><stop offset="1" stopColor="#D4AF37" stopOpacity="0" /></radialGradient></defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Section (Conditional) */}
      {role === 'admin' && (
        <section id="admin" className={`py-32 border-y scroll-mt-20 ${theme === 'dark' ? 'bg-[#050a14] border-white/5' : 'bg-white border-slate-100'}`}>
          <div className="container mx-auto px-6 max-w-6xl">
            <AdminDashboard />
          </div>
        </section>
      )}

      {/* Tracker Section */}
      <section id="tracker" className={`py-32 relative overflow-hidden ${theme === 'dark' ? 'bg-white text-[#050a14]' : 'bg-slate-100 text-slate-900'}`}>
        <div className="container mx-auto px-6 reveal">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Discipline & Grace</span>
             <h2 className="font-serif text-5xl md:text-6xl mb-6">Ramadan Journey</h2>
          </div>
          <RamadanTracker />
        </div>
      </section>

      {/* Quran Section */}
      <section id="quran" className={`py-32 relative overflow-hidden ${theme === 'dark' ? 'bg-[#050a14]' : 'bg-white'}`}>
        <div className="container mx-auto px-6 reveal">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Divine Revelation</span>
             <h2 className={`font-serif text-5xl md:text-6xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Quran Sanctuary</h2>
          </div>
          <QuranTracker />
        </div>
      </section>

      {/* Printables Section */}
      <section id="printables" className={`py-32 relative ${theme === 'dark' ? 'bg-slate-50 text-[#050a14]' : 'bg-slate-200 text-slate-900'}`}>
        <div className="container mx-auto px-6 reveal">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Physical Tools</span>
             <h2 className="font-serif text-5xl md:text-6xl mb-6">Sacred Resources</h2>
          </div>
          <PrintablesGallery />
        </div>
      </section>

      {/* Reflections Section */}
      <section id="calendar" className={`py-32 ${theme === 'dark' ? 'bg-white text-[#050a14]' : 'bg-white text-slate-900'}`}>
        <div className="container mx-auto px-6 md:px-12 reveal">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Daily Wisdom</span>
             <h2 className="font-serif text-5xl md:text-6xl mb-6">Meditations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {REFLECTIONS.map((reflection, idx) => (
              <div key={reflection.id} className="reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <ReflectionCard reflection={reflection} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditions Section */}
      <section id="traditions" className="py-32 px-6 max-w-7xl mx-auto text-center relative z-10 reveal">
        <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Sacred Legacy</span>
        <h2 className="font-serif text-5xl md:text-6xl text-[#D4AF37] mb-20">Ancient Roots</h2>
        <TraditionsSection />
      </section>

      <footer className={`py-24 border-t text-center ${theme === 'dark' ? 'bg-[#050a14] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
        <p className={`font-serif text-xl mb-4 tracking-wide ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>NoorNest</p>
        <p className="text-slate-500 text-[10px] tracking-[0.5em] uppercase">&copy; 1445 AH • Premium Spiritual Lifestyle</p>
      </footer>

      <style>{`
        @keyframes slow-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-slow-spin { animation: slow-spin 120s linear infinite; }
        @keyframes float-luxury { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(1deg); } }
        .animate-float-luxury { animation: float-luxury 8s ease-in-out infinite; }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .animate-shimmer { animation: shimmer 4s linear infinite; background-size: 200% 200%; }
        @keyframes glow-pulse { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.3; transform: scale(1.05); } }
        .animate-glow-pulse { animation: glow-pulse 5s ease-in-out infinite; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  </AuthProvider>
);

export default App;
