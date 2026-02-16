
import React from 'react';
import Navbar from './components/Navbar';
import ReflectionCard from './components/ReflectionCard';
import RamadanTracker from './components/RamadanTracker';
import QuranTracker from './components/QuranTracker';
import PrintablesGallery from './components/PrintablesGallery';
import { Reflection } from './types';

const REFLECTIONS: Reflection[] = [
  {
    id: '1',
    day: 1,
    ayah: "O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteousness.",
    reflectionText: "Ramadan is not merely a test of physical endurance, but a deliberate spiritual redirection. By stepping away from the habitual intake of nourishment, we create a vacuum that can only be filled with spiritual light. It is a month where we recalibrate our internal compass toward God, remembering that our true sustenance is found in His presence. \n\nAs we begin this journey, let us focus not on what we are losing (food/drink), but on the immense spiritual clarity we are gaining. Each moment of hunger is a reminder of our dependence on the Divine and a call to empathize with those whose hunger is not a choice.",
    journalQuestion: "What is one specific spiritual 'habit' you want to intentionally cultivate during these first ten days of Mercy?",
    dua: "Allahumma laka sumtu wa bika amantu wa 'ala rizqika aftartu (O Allah! I fasted for You and I believe in You and I break my fast with Your sustenance)."
  },
  {
    id: '2',
    day: 2,
    ayah: "The month of Ramadhan [is that] in which was revealed the Qur'an, a guidance for the people and clear proofs of guidance and criterion.",
    reflectionText: "The heartbeat of Ramadan is the Quran. It was in this month that the heavens spoke to the earth, delivering a message of timeless wisdom. When we fast, our hearts become more receptive to these divine words. \n\nReflect on the power of revelation—how a single verse has the capacity to transform a life, mend a broken spirit, or provide the 'criterion' (Furqan) to distinguish between truth and falsehood. This month is an invitation to re-engage with the Book of Allah, not just in recitation, but in deep, transformative contemplation.",
    journalQuestion: "Which verse from the Quran has resonated most with your current life situation lately? Why?",
    dua: "Allahumma ij'alil-Qur'ana rabi'a qulubina (O Allah, make the Quran the spring of our hearts)."
  },
  {
    id: '3',
    day: 3,
    ayah: "And when My servants ask you, [O Muhammad], concerning Me - indeed I am near.",
    reflectionText: "The promise of Divine Proximity is perhaps the most comforting aspect of Ramadan. In a month where we feel physically distant from the world's distractions, we find ourselves remarkably close to our Creator. \n\nThis 'nearness' is an open invitation for Dua. It suggests an intimacy that transcends our flaws and shortcomings. Allah is not a distant observer; He is closer to us than our jugular vein, listening to the silent whispers of our hearts even when our tongues find no words. Use this day to communicate with Him directly, with raw honesty and full certainty of being heard.",
    journalQuestion: "If you could whisper one secret hope or fear to the Divine today, knowing you are heard with infinite mercy, what would it be?",
    dua: "Ya Hayyu Ya Qayyum, bi rahmatika astagheeth (O Ever Living One, O Self-Sustaining One, in Your mercy I seek relief)."
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0e17] selection:bg-[#D4AF37] selection:text-[#0a192f] overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a192f] via-[#0f172a] to-[#020617]">
        
        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 15-15 15-15-15zM0 30l15 15-15 15-15-15zM60 30l15 15-15 15-15-15zM30 60l15 15-15 15-15-15z' fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>

        {/* Animated Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: 0.3 + Math.random() * 0.7
              }}
            />
          ))}
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center pt-20">
          
          {/* Text Side */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-ping"></span>
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">
                Ramadan Mubarak 1445
              </span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1]">
              Grow Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#facc15] to-[#D4AF37] animate-gradient-x">Light</span> <br className="hidden md:block" />
              This Ramadan
            </h1>
            
            <p className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 font-light leading-relaxed">
              Unlock a deeper connection this holy month. Access premium resources, spiritual planners, and community traditions designed to illuminate your path.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#tracker" className="group relative w-full sm:w-auto px-10 py-4 bg-[#D4AF37] text-[#0a192f] font-bold tracking-wider rounded-sm overflow-hidden transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)] text-center">
                <span className="relative z-10 uppercase">START JOURNEY</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
              <button className="w-full sm:w-auto px-10 py-4 border border-[#D4AF37]/30 text-white font-bold tracking-wider rounded-sm hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                DOWNLOAD PLANNER
              </button>
            </div>
          </div>

          {/* Visual Side (Lantern) */}
          <div className="relative flex justify-center items-center order-1 lg:order-2 py-10 lg:py-0">
            {/* Background Glow */}
            <div className="absolute w-[300px] h-[300px] bg-[#D4AF37]/20 rounded-full blur-[100px] animate-pulse"></div>
            
            {/* The Lantern */}
            <div className="relative animate-float">
              <svg width="280" height="400" viewBox="0 0 280 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                {/* Lantern Body */}
                <path d="M140 20L180 60H100L140 20Z" fill="#D4AF37" />
                <path d="M60 60H220V100L140 120L60 100V60Z" fill="#0f172a" stroke="#D4AF37" strokeWidth="2" />
                <rect x="60" y="100" width="160" height="220" fill="#0a192f" stroke="#D4AF37" strokeWidth="4" />
                
                {/* Glow/Light Source */}
                <circle cx="140" cy="210" r="50" fill="url(#lanternGlow)" />
                
                {/* Intricate Patterns */}
                <path d="M60 140H220M60 180H220M60 220H220M60 260H220" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
                <path d="M100 100V320M140 100V320M180 100V320" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
                
                {/* Windows/Glass Details */}
                <rect x="80" y="120" width="120" height="180" rx="4" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                
                {/* Base */}
                <path d="M60 320L140 340L220 320V360H60V320Z" fill="#0f172a" stroke="#D4AF37" strokeWidth="2" />
                <path d="M100 360H180L140 390L100 360Z" fill="#D4AF37" />

                <defs>
                  <radialGradient id="lanternGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(140 210) rotate(90) scale(80)">
                    <stop stopColor="#facc15" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Decorative Floating Crescents */}
              <div className="absolute -top-10 -right-10 animate-float" style={{ animationDuration: '4s' }}>
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="#D4AF37" opacity="0.6">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                 </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0e17] to-transparent"></div>
      </section>

      {/* Tracker Section */}
      <section id="tracker" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l10 10-10 10-10-10z' fill='%230a192f' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>
        <div className="relative z-10">
          <div className="text-center mb-4 px-6">
             <h2 className="font-serif text-4xl md:text-5xl text-[#0a192f] mb-4">Ramadan Tracker</h2>
             <p className="text-slate-600 max-w-2xl mx-auto">Build consistency in your worship. Tick off your daily acts and watch your light grow.</p>
          </div>
          <RamadanTracker />
        </div>
      </section>

      {/* Quran Section */}
      <section id="quran" className="py-24 bg-[#0a192f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 15-15 15-15-15z' fill='%23D4AF37'/%3E%3C/svg%3E")` }}></div>
        <div className="relative z-10">
          <div className="text-center mb-4 px-6">
             <h2 className="font-serif text-4xl md:text-5xl text-[#D4AF37] mb-4">Quran Tracker</h2>
             <p className="text-slate-300 max-w-2xl mx-auto">Mark your progress through each Juz and save your reflections along the way.</p>
          </div>
          <QuranTracker />
        </div>
      </section>

      {/* Printables Section */}
      <section id="printables" className="py-24 bg-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-center mb-4 px-6">
             <h2 className="font-serif text-4xl md:text-5xl text-[#0a192f] mb-4">Ramadan Printables</h2>
             <p className="text-slate-600 max-w-2xl mx-auto">Enhance your month with our beautiful collection of planners, activities, and trackers.</p>
          </div>
          <PrintablesGallery />
        </div>
      </section>

      {/* Reflections Section */}
      <section id="calendar" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#0a192f] mb-4">Daily Reflections</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A curated spiritual journey through the 30 days of Ramadan. Deepen your understanding and track your personal growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {REFLECTIONS.map((reflection) => (
              <ReflectionCard key={reflection.id} reflection={reflection} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="px-8 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-bold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-white transition-all duration-300 rounded-sm">
              View All 30 Days
            </button>
          </div>
        </div>
      </section>

      {/* Traditions Section */}
      <section id="traditions" className="py-32 px-6 max-w-7xl mx-auto text-center relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl text-[#D4AF37] mb-12">Sacred Moments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Spirit of Unity", desc: "Join thousands in daily collective reflections and prayers from around the globe." },
            { title: "Meaningful Fasting", desc: "Expert nutritional and spiritual guidance to make your fast truly transformative." },
            { title: "Generous Giving", desc: "Streamlined Zakat and Sadaqah tools to help your impact reach further." }
          ].map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg bg-[#112240] p-8 border border-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all duration-500">
              <div className="mb-6 inline-block p-4 bg-[#D4AF37]/10 rounded-full text-[#D4AF37]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white mb-4 uppercase tracking-wider">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 bg-[#020617] px-6 text-center border-y border-white/5">
        <p className="text-slate-500 font-serif italic text-2xl max-w-3xl mx-auto leading-relaxed">
          "Fasting is a shield with which a servant protects himself from the Fire."
        </p>
      </section>
      
      <footer className="py-16 bg-[#0a192f] text-center">
        <div className="mb-8 flex justify-center items-center gap-2">
           <div className="w-8 h-[1px] bg-[#D4AF37]/30"></div>
           <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4AF37">
             <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
           </svg>
           <div className="w-8 h-[1px] bg-[#D4AF37]/30"></div>
        </div>
        <p className="text-slate-500 text-xs tracking-[0.4em] uppercase">
          &copy; 2024 Premium Ramadan Kareem experience
        </p>
      </footer>

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
