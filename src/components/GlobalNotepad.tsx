import { useState, useEffect, useRef } from 'react';
import { StickyNoteIcon, ChevronRightIcon, ChevronLeftIcon, Trash2Icon } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function GlobalNotepad() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  const [allNotes, setAllNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('lumina_global_notes_v2');
    return saved ? JSON.parse(saved) : {};
  });

  const notes = allNotes[selectedDate] || '';

  useEffect(() => {
    localStorage.setItem('lumina_global_notes_v2', JSON.stringify(allNotes));
  }, [allNotes]);

  const updateNotes = (val: string) => {
    setAllNotes(prev => ({ ...prev, [selectedDate]: val }));
  };

  const changeDate = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-text-primary text-bg-primary flex items-center justify-center rounded-l-2xl hover:translate-x-[-4px] transition-transform border border-border-primary border-r-0"
      >
        {isOpen ? <ChevronRightIcon size={20} /> : <StickyNoteIcon size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-[500px] bg-bg-secondary text-text-primary border border-border-primary flex flex-col p-6 rounded-l-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Daily Journal</h3>
              <div className="flex items-center gap-1">
                <button onClick={() => changeDate(-1)} className="p-1 hover:bg-hover-bg rounded transition-colors text-text-primary"><ChevronLeftIcon size={12}/></button>
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-[10px] font-mono font-bold bg-bg-primary px-2 py-0.5 rounded outline-none cursor-pointer text-text-primary hover:bg-hover-bg transition-colors border border-border-primary/50"
                />
                <button onClick={() => changeDate(1)} className="p-1 hover:bg-hover-bg rounded transition-colors text-text-primary"><ChevronRightIcon size={12}/></button>
              </div>
            </div>
            
            <textarea
              value={notes}
              onChange={(e) => updateNotes(e.target.value)}
              placeholder={`Reflections for ${selectedDate}...`}
              className="flex-1 bg-transparent border-none outline-none resize-none font-serif text-sm leading-relaxed text-text-secondary mt-4 placeholder:text-text-secondary/50"
            />
            
            <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-text-secondary border-t border-border-primary pt-4">
              <span>{notes.length} characters</span>
              <button 
                onClick={() => updateNotes('')}
                className="opacity-40 hover:opacity-100 hover:text-accent-primary transition-all flex items-center gap-1"
              >
                <Trash2Icon size={10} /> Wipe Entry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
