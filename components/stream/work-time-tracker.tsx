'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Clock, DollarSign, Move } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkTimeTrackerProps {
  onTimeUpdate: (totalMinutes: number, bonusAmount: number) => void;
  showInline?: boolean;
}

export function WorkTimeTracker({ onTimeUpdate, showInline = true }: WorkTimeTrackerProps) {
  const [isActive, setIsActive] = useState(false);
  const [totalMinutes, setTotalMinutes] = useState(144); // 2h 24m as shown in requirements
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  
  // Draggable state
  const [position, setPosition] = useState({ x: -1, y: -1 });
  const [isDragging, setIsDragging] = useState(false);
  const [showMoveIcon, setShowMoveIcon] = useState(false);
  const timerRef = useRef<HTMLDivElement>(null);

  // Load saved time from localStorage on component mount
  useEffect(() => {
    const savedTime = localStorage.getItem('workTimeToday');
    const savedDate = localStorage.getItem('workTimeDate');
    const today = new Date().toDateString();
    
    if (savedDate === today && savedTime) {
      setTotalMinutes(parseInt(savedTime));
    } else {
      // Reset if it's a new day
      localStorage.setItem('workTimeDate', today);
      localStorage.setItem('workTimeToday', '144'); // Default to 2h 24m
      setTotalMinutes(144);
    }
    
    // Load saved position
    const savedPosition = localStorage.getItem('workTimePosition');
    if (savedPosition) {
      try {
        setPosition(JSON.parse(savedPosition));
      } catch (e) {
        // If parsing fails, use default position
        setPosition({ x: -1, y: -1 });
      }
    }
  }, []);

  // Update parent component when time changes
  useEffect(() => {
    const bonusAmount = totalMinutes * 2; // 2 CZK per minute
    onTimeUpdate(totalMinutes, bonusAmount);
  }, [totalMinutes, onTimeUpdate]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && sessionStart) {
      interval = setInterval(() => {
        const now = new Date();
        const sessionMinutes = Math.floor((now.getTime() - sessionStart.getTime()) / (1000 * 60));
        const newTotalMinutes = totalMinutes + sessionMinutes;
        
        // Save to localStorage
        localStorage.setItem('workTimeToday', newTotalMinutes.toString());
        
        // Update state every minute
        if (sessionMinutes > 0) {
          setTotalMinutes(newTotalMinutes);
          setSessionStart(now); // Reset session start to avoid double counting
        }
      }, 60000); // Check every minute
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, sessionStart, totalMinutes]);

  // Dragging functionality
  useEffect(() => {
    if (!timerRef.current || showInline) return;
    
    const handleMouseDown = (e: MouseEvent) => {
      if (e.target instanceof Element && timerRef.current?.contains(e.target)) {
        setIsDragging(true);
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // Calculate new position based on mouse movement
        const newX = Math.max(0, Math.min(window.innerWidth - (timerRef.current?.offsetWidth || 0), e.clientX));
        const newY = Math.max(0, Math.min(window.innerHeight - (timerRef.current?.offsetHeight || 0), e.clientY));
        
        setPosition({ x: newX, y: newY });
      }
    };
    
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        // Save position to localStorage
        localStorage.setItem('workTimePosition', JSON.stringify(position));
      }
    };
    
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position, showInline]);

  const handleToggle = () => {
    if (isActive) {
      // Stopping - calculate final session time
      if (sessionStart) {
        const now = new Date();
        const sessionMinutes = Math.floor((now.getTime() - sessionStart.getTime()) / (1000 * 60));
        const newTotalMinutes = totalMinutes + sessionMinutes;
        
        setTotalMinutes(newTotalMinutes);
        localStorage.setItem('workTimeToday', newTotalMinutes.toString());
      }
      setSessionStart(null);
    } else {
      // Starting
      setSessionStart(new Date());
    }
    setIsActive(!isActive);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m`;
  };

  // Calculate bonus amount
  const bonusAmount = totalMinutes * 2; // 2 CZK per minute

  if (showInline) {
    return (
      <div className="flex items-center space-x-4 px-4 py-2 rounded-lg bg-[rgba(var(--velvet-gray),0.3)] border border-[rgba(var(--neon-orchid),0.2)]">
        <div className="text-center">
          <div className="text-lg font-bold text-[rgb(var(--foreground))]">
            {formatTime(totalMinutes)}
          </div>
          <div className="text-xs text-[rgb(var(--muted-foreground))]">
            Pracovní čas
          </div>
        </div>
        
        {/* Button - NO HOVER SCALING */}
        <button
          onClick={handleToggle}
          className={cn(
            'px-3 py-1.5 rounded-md font-medium text-sm transition-colors duration-200',
            isActive
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
          )}
        >
          {isActive ? 'Zastavit' : 'Pokračovat'}
        </button>
      </div>
    );
  }

  // Fixed draggable timer
  return (
    <div 
      ref={timerRef}
      className={cn(
        "fixed z-50 cursor-move",
        isDragging ? "opacity-80" : "opacity-100"
      )}
      style={{
        bottom: position.y === -1 ? '1.5rem' : 'auto',
        right: position.x === -1 ? '1.5rem' : 'auto',
        top: position.y !== -1 ? `${position.y}px` : 'auto',
        left: position.x !== -1 ? `${position.x}px` : 'auto',
        transition: isDragging ? 'none' : 'opacity 0.2s ease-in-out'
      }}
      onMouseEnter={() => setShowMoveIcon(true)}
      onMouseLeave={() => setShowMoveIcon(false)}
    >
      <div className="flex items-center space-x-2 glow-card p-2 bg-[rgba(var(--charcoal),0.9)] backdrop-blur-md shadow-xl rounded-lg">
        {/* Move Icon - Only visible on hover */}
        {showMoveIcon && (
          <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[rgba(var(--neon-orchid),0.8)] flex items-center justify-center text-white">
            <Move className="w-3 h-3" />
          </div>
        )}
        
        {/* Time Card */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[rgba(var(--velvet-gray),0.3)] border border-[rgba(var(--neon-orchid),0.2)]">
          <Clock className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
          <div className="text-sm font-bold text-[rgb(var(--foreground))]">
            {formatTime(totalMinutes)}
          </div>
        </div>
        
        {/* Bonus Card */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[rgba(var(--velvet-gray),0.3)] border border-[rgba(var(--neon-orchid),0.2)]">
          <DollarSign className="w-4 h-4 text-[rgb(var(--sunset-gold))]" />
          <div className="text-sm font-bold text-gradient-gold">
            {bonusAmount.toLocaleString()} <span className="text-xs opacity-80">CZK</span>
          </div>
        </div>
        
        {/* Play/Pause Button - ICON ONLY */}
        <button
          onClick={handleToggle}
          className={cn(
            'p-2 rounded-lg transition-colors duration-200',
            isActive
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
          )}
          title={isActive ? "Zastavit" : "Pokračovat"}
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}