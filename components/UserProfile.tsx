
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useGamification } from '../contexts/GamificationContext';

const UserProfile: React.FC = () => {
  const { user, role } = useAuth();
  const { theme } = useTheme();
  const { stats } = useGamification();

  if (!user) return null;

  const nextLevelPoints = stats.level * 1000;
  const levelProgress = (stats.points % 1000) / 10;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Info */}
        <div className={`lg:col-span-1 p-10 rounded-[2.5rem] border transition-all duration-500 ${
          theme === 'dark' ? 'bg-[#0a101f] border-white/5' : 'bg-white border-slate-100'
        }`}>
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F1D279] p-1">
                <div className={`w-full h-full rounded-full flex items-center justify-center text-4xl font-serif ${
                  theme === 'dark' ? 'bg-[#0a101f] text-[#D4AF37]' : 'bg-white text-[#0a1128]'
                }`}>
                  {user.email[0].toUpperCase()}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] text-[#0a1128] w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-[#0a101f]">
                {stats.level}
              </div>
            </div>
            
            <h3 className={`font-serif text-3xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0a1128]'}`}>
              {user.email.split('@')[0]}
            </h3>
            <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-8">{role}</p>
            
            <div className="w-full space-y-6">
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                  <span className="text-slate-500">Level {stats.level}</span>
                  <span className="text-[#D4AF37]">{stats.points % 1000} / 1000 XP</span>
                </div>
                <div className="w-full h-2 bg-slate-800/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-1000"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                  <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-1">Total Points</p>
                  <p className={`text-xl font-serif ${theme === 'dark' ? 'text-white' : 'text-[#0a1128]'}`}>{stats.points}</p>
                </div>
                <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                  <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-1">Streak</p>
                  <p className={`text-xl font-serif ${theme === 'dark' ? 'text-white' : 'text-[#0a1128]'}`}>{stats.streak} Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className={`lg:col-span-2 p-10 rounded-[2.5rem] border transition-all duration-500 ${
          theme === 'dark' ? 'bg-[#0a101f] border-white/5' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center justify-between mb-10">
            <h3 className={`font-serif text-3xl ${theme === 'dark' ? 'text-white' : 'text-[#0a1128]'}`}>Achievements</h3>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em]">{stats.badges.length} Unlocked</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {stats.badges.length > 0 ? (
              stats.badges.map(badge => (
                <div key={badge.id} className={`p-6 rounded-3xl border text-center group transition-all duration-500 hover:border-[#D4AF37]/50 ${
                  theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-500">{badge.icon}</div>
                  <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0a1128]'}`}>{badge.name}</h4>
                  <p className="text-[9px] text-slate-500 leading-relaxed">{badge.description}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-500 italic font-light">Your journey is just beginning. Complete habits and read Quran to unlock badges.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
