
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Nasheed {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  url: string;
}

const NASHEEDS: Nasheed[] = [
  {
    id: 1,
    title: "Ahlan Ramadan",
    artist: "Ahmed Alaksary",
    duration: "3:42",
    cover: "https://picsum.photos/seed/ramadan/400/400",
    url: "https://ia801602.us.archive.org/11/items/IslamicNasheeds_201608/01.mp3"
  },
  {
    id: 2,
    title: "Tala' al Badru",
    artist: "Traditional Harmony",
    duration: "4:20",
    cover: "https://picsum.photos/seed/moon/400/400",
    url: "https://ia801602.us.archive.org/11/items/IslamicNasheeds_201608/02.mp3"
  },
  {
    id: 3,
    title: "Ya Nabi Salam 'Alayka",
    artist: "Spiritual Voice",
    duration: "3:45",
    cover: "https://picsum.photos/seed/mercy/400/400",
    url: "https://ia801602.us.archive.org/11/items/IslamicNasheeds_201608/03.mp3"
  },
  {
    id: 4,
    title: "Ramadan is Here",
    artist: "Faith Ensemble",
    duration: "5:12",
    cover: "https://picsum.photos/seed/peace/400/400",
    url: "https://ia801602.us.archive.org/11/items/IslamicNasheeds_201608/04.mp3"
  }
];

const NasheedsSection: React.FC = () => {
  const { theme } = useTheme();
  const [currentNasheed, setCurrentNasheed] = useState<Nasheed>(NASHEEDS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const target = e.currentTarget;
    const errorCode = target.error?.code;
    const errorMessage = target.error?.message;
    
    let errorType = "Unknown error";
    if (errorCode === 1) errorType = "Aborted";
    else if (errorCode === 2) errorType = "Network error";
    else if (errorCode === 3) errorType = "Decoding error";
    else if (errorCode === 4) errorType = "Source not supported";

    const errorText = `Playback failed: ${errorType} ${errorMessage ? `(${errorMessage})` : ""}`;
    console.error("Audio error:", target.error);
    setError(errorText);
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    if (isPlaying && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          if (e.name !== 'AbortError') {
            console.error("Playback failed on canplay:", e.message);
            setIsPlaying(false);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      setError(null);
      setIsLoading(true);
      
      // Reset audio element
      audioRef.current.pause();
      audioRef.current.src = currentNasheed.url;
      audioRef.current.load();
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            if (e.name !== 'AbortError') {
              console.error("Playback failed on source change:", e);
            }
          });
        }
      }
    }
  }, [currentNasheed]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        if (audioRef.current.readyState >= 2) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(e => {
              if (e.name !== 'AbortError') {
                console.error("Playback failed on toggle:", e);
              }
            });
          }
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration && !isNaN(duration)) {
        setProgress((current / duration) * 100);
        
        const mins = Math.floor(current / 60);
        const secs = Math.floor(current % 60);
        setCurrentTime(`${mins}:${secs.toString().padStart(2, '0')}`);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    if (audioRef.current && audioRef.current.duration) {
      const newTime = (seekTo / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(seekTo);
    }
  };

  const handlePlayPause = (nasheed: Nasheed) => {
    if (currentNasheed.id === nasheed.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentNasheed(nasheed);
      setIsPlaying(true);
      setProgress(0);
      setCurrentTime("0:00");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Player Display */}
      <div className="space-y-8">
        <div className={`p-8 rounded-[40px] border transition-all duration-500 ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'
        }`}>
          <div className="relative aspect-square rounded-[32px] overflow-hidden mb-8 group">
            <img 
              src={currentNasheed.cover} 
              alt={currentNasheed.title}
              className={`w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'}`}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
               <button 
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={isLoading}
                className={`w-20 h-20 rounded-full bg-[#D4AF37] text-[#0a1128] flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                 {isLoading ? (
                   <div className="w-8 h-8 border-4 border-[#0a1128]/20 border-t-[#0a1128] rounded-full animate-spin"></div>
                 ) : isPlaying ? (
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                 ) : (
                   <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 )}
               </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              {isLoading && <div className="w-3 h-3 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>}
              <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">
                {isLoading ? 'Buffering...' : isPlaying ? 'Now Playing' : 'Paused'}
              </p>
            </div>
            <h3 className={`font-serif text-3xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{currentNasheed.title}</h3>
            <p className="text-slate-500 text-sm font-light uppercase tracking-widest">{currentNasheed.artist}</p>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 bg-slate-700/20 rounded-full appearance-none cursor-pointer accent-[#D4AF37] hover:h-2 transition-all"
                style={{
                  background: `linear-gradient(to right, #D4AF37 ${progress}%, rgba(51, 65, 85, 0.2) ${progress}%)`
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>{currentTime}</span>
              <span>{currentNasheed.duration}</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center">
              <p className="mb-2">{error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  if (audioRef.current) {
                    audioRef.current.load();
                    setIsPlaying(true);
                  }
                }}
                className="px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          <audio 
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onError={handleAudioError}
            onLoadStart={handleLoadStart}
            onCanPlay={handleCanPlay}
            preload="auto"
          />
        </div>
      </div>

      {/* Playlist */}
      <div className="space-y-4">
        <h4 className={`font-serif text-xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Playlist</h4>
        {NASHEEDS.map((nasheed) => {
          const isCurrent = currentNasheed.id === nasheed.id;
          return (
            <button 
              key={nasheed.id}
              onClick={() => handlePlayPause(nasheed)}
              className={`w-full group flex items-center p-4 rounded-2xl border transition-all duration-500 text-left ${
                isCurrent
                  ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                  : theme === 'dark' 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                  : 'bg-white border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden mr-4 shrink-0 relative">
                <img 
                  src={nasheed.cover} 
                  alt={nasheed.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {isCurrent && isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="flex gap-1 items-end h-4">
                      <div className="w-1 bg-[#D4AF37] animate-music-bar-1"></div>
                      <div className="w-1 bg-[#D4AF37] animate-music-bar-2"></div>
                      <div className="w-1 bg-[#D4AF37] animate-music-bar-3"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-serif text-base truncate ${isCurrent ? 'text-[#D4AF37]' : theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {nasheed.title}
                </h4>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest truncate">{nasheed.artist}</p>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <span className="text-slate-500 text-[10px] font-mono">{nasheed.duration}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCurrent ? 'bg-[#D4AF37] text-[#0a1128]' : 'bg-slate-500/10 text-slate-500 group-hover:bg-[#D4AF37]/20 group-hover:text-[#D4AF37]'
                }`}>
                  {isCurrent && isPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        <style>{`
          @keyframes music-bar-1 { 0%, 100% { height: 4px; } 50% { height: 16px; } }
          @keyframes music-bar-2 { 0%, 100% { height: 12px; } 50% { height: 4px; } }
          @keyframes music-bar-3 { 0%, 100% { height: 8px; } 50% { height: 14px; } }
          .animate-music-bar-1 { animation: music-bar-1 0.8s ease-in-out infinite; }
          .animate-music-bar-2 { animation: music-bar-2 0.8s ease-in-out infinite 0.2s; }
          .animate-music-bar-3 { animation: music-bar-3 0.8s ease-in-out infinite 0.4s; }
        `}</style>
      </div>
    </div>
  );
};

export default NasheedsSection;
