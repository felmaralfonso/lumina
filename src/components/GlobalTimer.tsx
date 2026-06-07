import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TimerIcon, PlayIcon, PauseIcon, RotateCcwIcon, XIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface GlobalTimerProps {
  isEmbedded?: boolean;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  initialTime: number;
  setInitialTime: React.Dispatch<React.SetStateAction<number>>;
}

export default function GlobalTimer({
  isEmbedded = false,
  timeLeft,
  setTimeLeft,
  isRunning,
  setIsRunning,
  initialTime,
  setInitialTime,
}: GlobalTimerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Position management for floating timer
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('lumina_timer_position');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          x: Math.max(10, Math.min(window.innerWidth - 60, parsed.x)),
          y: Math.max(10, Math.min(window.innerHeight - 60, parsed.y)),
        };
      } catch (e) {}
    }
    return { x: window.innerWidth - 80, y: window.innerHeight - 150 };
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isDragConfirmed, setIsDragConfirmed] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const positionStart = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const currentPos = useRef(position);

  // Sync currentPos ref with state
  useEffect(() => {
    currentPos.current = position;
  }, [position]);

  // Keep floating timer inside viewport on window resize
  useEffect(() => {
    if (isEmbedded) return;
    const handleResize = () => {
      setPosition((prev) => {
        const newX = Math.max(10, Math.min(window.innerWidth - 80, prev.x));
        const newY = Math.max(10, Math.min(window.innerHeight - 60, prev.y));
        if (newX !== prev.x || newY !== prev.y) {
          return { x: newX, y: newY };
        }
        return prev;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isEmbedded]);

  // Handle outside clicks to close the timer panel
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

  // Drag listeners
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEmbedded) return;
    if (isOpen && (e.target as HTMLElement).closest('.focus-panel-content')) {
      return;
    }
    setIsDragging(true);
    setIsDragConfirmed(false);
    hasMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    positionStart.current = { ...position };
    if (!isOpen) {
      e.preventDefault();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isEmbedded) return;
    if (isOpen && (e.target as HTMLElement).closest('.focus-panel-content')) {
      return;
    }
    const touch = e.touches[0];
    setIsDragging(true);
    setIsDragConfirmed(false);
    hasMoved.current = false;
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    positionStart.current = { ...position };
  };

  useEffect(() => {
    if (isEmbedded) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved.current = true;
        setIsDragConfirmed(true);
      }
      const newX = Math.max(10, Math.min(window.innerWidth - 120, positionStart.current.x + dx));
      const newY = Math.max(10, Math.min(window.innerHeight - 60, positionStart.current.y + dy));
      
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      }
      currentPos.current = { x: newX, y: newY };
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setIsDragConfirmed(false);
        setPosition(currentPos.current);
        localStorage.setItem('lumina_timer_position', JSON.stringify(currentPos.current));
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isEmbedded]);

  useEffect(() => {
    if (isEmbedded) return;
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const dx = touch.clientX - dragStart.current.x;
      const dy = touch.clientY - dragStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved.current = true;
        setIsDragConfirmed(true);
      }
      const newX = Math.max(10, Math.min(window.innerWidth - 120, positionStart.current.x + dx));
      const newY = Math.max(10, Math.min(window.innerHeight - 60, positionStart.current.y + dy));
      
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      }
      currentPos.current = { x: newX, y: newY };
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        setIsDragConfirmed(false);
        setPosition(currentPos.current);
        localStorage.setItem('lumina_timer_position', JSON.stringify(currentPos.current));
      }
    };

    if (isDragging) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, isEmbedded]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const adjustTime = (amount: number) => {
    const newTime = Math.max(0, initialTime + amount);
    setInitialTime(newTime);
    if (!isRunning) setTimeLeft(newTime);
  };

  const resetTimer = () => {
    if (confirm('Reset timer to initial state?')) {
      setIsRunning(false);
      setTimeLeft(initialTime);
    }
  };

  const isLeft = position.x <= window.innerWidth / 2;
  const isVisible = isEmbedded || isRunning || isOpen;

  // Don't render floating instances if they are not active/open
  if (!isEmbedded && !isVisible) return null;

  return (
    <>
      {isDragging && isDragConfirmed && !isEmbedded && (
        <div className="fixed inset-0 z-[9998] cursor-grabbing bg-transparent pointer-events-auto" />
      )}
      <div 
        className={cn(
          isEmbedded ? "relative flex flex-row-reverse" : "fixed pointer-events-none z-[9999] flex items-start"
        )}
        style={isEmbedded ? undefined : { 
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          left: 0,
          top: 0,
          flexDirection: isLeft ? 'row' : 'row-reverse'
        }} 
        ref={containerRef}
      >
        <button 
          id={isEmbedded ? undefined : "tour-timer"}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={(e) => {
            if (hasMoved.current) {
              e.preventDefault();
              return;
            }
            setIsOpen(!isOpen);
          }}
          className={cn(
            "bg-bg-secondary text-text-primary border flex items-center justify-center transition-all hover:scale-105 active:scale-95 group overflow-hidden relative pointer-events-auto shrink-0",
            isEmbedded
              ? "w-12 h-12 border-r-0 rounded-l-xl border-border-primary"
              : cn(
                  "h-10 gap-2 rounded-full shadow-lg cursor-grab active:cursor-grabbing px-3.5",
                  isDragging && "cursor-grabbing",
                  isRunning ? "border-accent-primary" : "border-border-primary"
                )
          )}
        >
          <motion.div
             animate={isRunning ? { rotate: 360 } : { rotate: 0 }}
             transition={{ duration: isEmbedded ? 2 : 8, repeat: Infinity, ease: "linear" }}
             className="shrink-0"
          >
            <TimerIcon size={isEmbedded ? 20 : 16} className={isRunning ? "text-accent-primary" : "text-text-primary"} />
          </motion.div>
          
          {!isEmbedded ? (
            <span className={cn(
              "text-xs font-mono font-bold tracking-tight shrink-0 select-none",
              isRunning ? "text-accent-primary" : "text-text-primary"
            )}>
              {formatTime(timeLeft)}
            </span>
          ) : (
            timeLeft > 0 && isRunning && (
               <span className="absolute bottom-1 text-[7px] font-mono font-bold tracking-tighter text-accent-primary select-none">
                 {Math.ceil(timeLeft / 60)}m
               </span>
            )
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, x: isEmbedded || !isLeft ? 10 : -10 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.95, opacity: 0, x: isEmbedded || !isLeft ? 10 : -10 }}
              className="bg-bg-secondary border border-border-primary flex flex-col p-6 rounded-2xl shadow-2xl overflow-hidden focus-panel-content pointer-events-auto text-text-primary"
              style={{
                width: '280px',
                height: '320px',
                position: 'absolute',
                top: isEmbedded ? 'auto' : (position.y + 320 > window.innerHeight ? 'auto' : 0),
                bottom: isEmbedded ? 'auto' : (position.y + 320 > window.innerHeight ? 0 : 'auto'),
                left: isEmbedded ? 'auto' : (isLeft ? '90px' : 'auto'),
                right: isEmbedded ? '56px' : (isLeft ? 'auto' : '90px'),
              }}
            >
              <div className="flex items-center justify-between mb-8 border-b border-border-primary pb-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Focus Engine</h3>
                <button onClick={() => setIsOpen(false)} className="opacity-40 hover:opacity-100">
                  <XIcon size={14} />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative mb-8">
                  {isRunning ? (
                    <motion.div 
                       className="text-5xl font-mono font-bold tracking-tighter text-text-primary"
                       animate={{ opacity: [1, 0.7, 1] }}
                       transition={{ duration: 1, repeat: Infinity }}
                    >
                      {formatTime(timeLeft)}
                    </motion.div>
                  ) : (
                    <div className="flex items-center text-5xl font-mono font-bold tracking-tighter text-text-primary">
                      <input 
                        type="number" 
                        value={Math.floor(initialTime / 60)} 
                        onChange={(e) => {
                          const val = e.target.value;
                          const mins = val === '' ? 0 : parseInt(val);
                          const secs = initialTime % 60;
                          setInitialTime(mins * 60 + secs);
                          setTimeLeft(mins * 60 + secs);
                        }}
                        className="w-20 text-right bg-transparent outline-none hover:bg-hover-bg rounded-lg transition-colors appearance-none"
                        min="0"
                      />
                      <span>:</span>
                      <input 
                        type="number" 
                        value={String(initialTime % 60).padStart(2, '0')} 
                        onChange={(e) => {
                          const val = e.target.value;
                          let secs = val === '' ? 0 : parseInt(val);
                          if (secs > 59) secs = 59;
                          const mins = Math.floor(initialTime / 60);
                          setInitialTime(mins * 60 + secs);
                          setTimeLeft(mins * 60 + secs);
                        }}
                        className="w-20 bg-transparent outline-none hover:bg-hover-bg rounded-lg transition-colors appearance-none"
                        min="0"
                        max="59"
                      />
                    </div>
                  )}
                  
                  {!isRunning && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 w-max">
                      <button onClick={() => adjustTime(-60)} className="text-[10px] font-mono hover:text-accent-primary transition-colors">-1m</button>
                      <button onClick={() => adjustTime(-10)} className="text-[10px] font-mono hover:text-accent-primary transition-colors">-10s</button>
                      <span className="text-[8px] font-bold text-text-secondary uppercase tracking-tighter mx-1">Set</span>
                      <button onClick={() => adjustTime(10)} className="text-[10px] font-mono hover:text-accent-primary transition-colors">+10s</button>
                      <button onClick={() => adjustTime(60)} className="text-[10px] font-mono hover:text-accent-primary transition-colors">+1m</button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-6 mt-4">
                  <button 
                    onClick={resetTimer}
                    className="p-3 border border-border-primary rounded-full hover:bg-hover-bg transition-all text-text-secondary"
                  >
                    <RotateCcwIcon size={18} />
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (!isRunning && timeLeft === 0) {
                        setTimeLeft(initialTime);
                      }
                      setIsRunning(!isRunning);
                    }}
                    className="w-16 h-16 bg-text-primary text-bg-primary rounded-full flex items-center justify-center hover:opacity-90 transition-all"
                  >
                    {isRunning ? <PauseIcon size={24} fill="currentColor" /> : <PlayIcon size={24} fill="currentColor" className="ml-1" />}
                  </button>

                  <div className="w-10" /> {/* Spacer */}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-[8px] font-mono text-[#BCBCB9] opacity-40">
                <span className="uppercase tracking-widest">Temporal Node Alpha</span>
                <span>{Math.round((timeLeft/initialTime)*100)}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
