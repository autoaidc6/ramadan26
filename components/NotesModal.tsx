
import React, { useState } from 'react';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (notes: string) => void;
  initialValue: string;
  juzNumber: number;
}

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, onSave, initialValue, juzNumber }) => {
  const [notes, setNotes] = useState(initialValue);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-[#fdfcf0] rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-[#D4AF37]/20 flex justify-between items-center bg-[#0a192f]">
          <h3 className="font-serif text-2xl text-[#D4AF37]">Juz {juzNumber} Reflections</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <label className="block text-sm font-bold text-slate-600 uppercase tracking-widest mb-3">Your Notes</label>
          <textarea
            className="w-full h-48 p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all outline-none text-slate-800 placeholder:text-slate-300"
            placeholder="Write your reflections or key takeaways from this Juz..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={() => {
              onSave(notes);
              onClose();
            }}
            className="flex-1 py-3 bg-[#D4AF37] text-[#0a192f] font-bold rounded-xl hover:bg-[#facc15] transition-colors shadow-lg"
          >
            SAVE NOTES
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-colors"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;
