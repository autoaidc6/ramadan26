import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useGamification } from '../contexts/GamificationContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const TRIVIA_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is the name of the meal eaten before dawn?",
    options: ["Iftar", "Suhoor", "Dinner", "Brunch"],
    correctAnswer: "Suhoor",
    explanation: "Suhoor is the blessed meal Muslims eat before the sun rises and the fast begins."
  },
  {
    id: 2,
    question: "Which month of the Islamic calendar is Ramadan?",
    options: ["1st", "7th", "9th", "12th"],
    correctAnswer: "9th",
    explanation: "Ramadan is the 9th month of the Hijri (Islamic) calendar."
  },
  {
    id: 3,
    question: "What was the first word revealed of the Quran?",
    options: ["Islam", "Allah", "Iqra", "Salam"],
    correctAnswer: "Iqra",
    explanation: "The first word revealed to Prophet Muhammad (SAW) was 'Iqra', which means 'Read'."
  },
  {
    id: 4,
    question: "What is the special night in the last 10 days of Ramadan called?",
    options: ["Eid al-Fitr", "Laylatul Qadr", "Isra Wal Mi'raj", "Ashura"],
    correctAnswer: "Laylatul Qadr",
    explanation: "Laylatul Qadr (The Night of Decree) is better than a thousand months."
  },
  {
    id: 5,
    question: "What is the name of the gate in Paradise for those who fast?",
    options: ["Ar-Rayyan", "Al-Firdous", "Bab as-Salam", "Al-Khuld"],
    correctAnswer: "Ar-Rayyan",
    explanation: "Ar-Rayyan is a special gate in Jannah through which only those who fasted will enter."
  }
];

const TriviaSection: React.FC = () => {
  const { theme } = useTheme();
  const { addPoints } = useGamification();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    const correct = option === TRIVIA_QUESTIONS[currentIdx].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      addPoints(50);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < TRIVIA_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  const resetTrivia = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-2xl mx-auto p-12 rounded-[40px] text-center border ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
        }`}
      >
        <div className="text-6xl mb-8">🎉</div>
        <h3 className={`font-serif text-4xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Trivia Complete!</h3>
        <p className="text-slate-500 text-xl mb-8">You got {score} out of {TRIVIA_QUESTIONS.length} correct!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={resetTrivia}
            className="px-12 py-4 bg-[#D4AF37] text-[#0a1128] rounded-full text-[10px] font-bold tracking-widest uppercase hover:scale-105 transition-transform"
          >
            Play Again
          </button>
          <button 
            onClick={() => window.location.hash = '#kids'}
            className={`px-12 py-4 border rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${
              theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Back to Sanctuary
          </button>
        </div>
      </motion.div>
    );
  }

  const currentQ = TRIVIA_QUESTIONS[currentIdx];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase">Question {currentIdx + 1} of {TRIVIA_QUESTIONS.length}</span>
        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Score: {score}</span>
      </div>

      <motion.div 
        key={currentIdx}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className={`p-12 rounded-[40px] border ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
        }`}
      >
        <h3 className={`font-serif text-3xl mb-12 leading-relaxed ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {currentQ.question}
        </h3>

        <div className="grid gap-4">
          {currentQ.options.map((opt) => (
            <button
              key={opt}
              disabled={!!selectedOption}
              onClick={() => handleOptionSelect(opt)}
              className={`p-6 rounded-2xl text-left transition-all duration-300 border text-lg ${
                selectedOption === opt
                  ? opt === currentQ.correctAnswer
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500'
                    : 'bg-rose-500/20 border-rose-500 text-rose-500'
                  : selectedOption && opt === currentQ.correctAnswer
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-400 hover:border-[#D4AF37]/50'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-[#D4AF37]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                {selectedOption === opt && (
                  <span>{opt === currentQ.correctAnswer ? '✅' : '❌'}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selectedOption && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-8 rounded-3xl bg-[#D4AF37]/5 border border-[#D4AF37]/20"
            >
              <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-2">Did you know?</p>
              <p className={`text-lg font-light leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                {currentQ.explanation}
              </p>
              <button 
                onClick={nextQuestion}
                className="mt-8 w-full py-4 bg-[#D4AF37] text-[#0a1128] rounded-full text-[10px] font-bold tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {currentIdx === TRIVIA_QUESTIONS.length - 1 ? 'Finish Trivia' : 'Next Question'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TriviaSection;
