'use client';

import { ReactNode, useState, useEffect } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { RevenueSparkline } from './revenue-sparkline';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: typeof LucideIcon;
  variant?: 'primary' | 'gold' | 'crimson';
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  isHero?: boolean;
  isLive?: boolean;
  hasProgressBar?: boolean;
  progressValue?: number;
  hasSparkline?: boolean;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  variant = 'primary',
  subtitle,
  children,
  className,
  isHero = false,
  isLive = false,
  hasProgressBar = false,
  progressValue = 0,
  hasSparkline = false
}: StatsCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  // Only animate when live data updates occur
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 600);
    }, Math.random() * 12000 + 8000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'gold':
        return 'stats-card-gold';
      case 'crimson':
        return 'stats-card-crimson';
      default:
        return 'stats-card-primary';
    }
  };

  const getIconGradient = () => {
    switch (variant) {
      case 'gold':
        return 'bg-gradient-to-br from-yellow-400 to-orange-500';
      case 'crimson':
        return 'bg-gradient-to-br from-pink-500 to-red-500';
      default:
        return 'bg-gradient-to-br from-purple-500 to-pink-500';
    }
  };

  // Bigger and Bolder Numbers
  const getValueSize = () => {
    if (isHero) return 'text-7xl lg:text-8xl font-black';
    return 'text-5xl lg:text-6xl font-black';
  };

  const getCardHeight = () => {
    if (isHero) return 'min-h-[280px]';
    return 'min-h-[160px]';
  };

  const getValueColor = () => {
    switch (variant) {
      case 'gold':
        return 'text-gradient-gold stat-glow';
      case 'crimson':
        return 'text-[rgb(var(--crimson))] stat-glow';
      default:
        return 'text-gradient-primary stat-glow';
    }
  };

  const getProgressBarColor = () => {
    switch (variant) {
      case 'gold':
        return 'from-[rgb(var(--sunset-gold))] to-[rgb(var(--neon-orchid))]';
      case 'crimson':
        return 'from-[rgb(var(--crimson))] to-[rgb(var(--sunset-gold))]';
      default:
        return 'from-[rgb(var(--neon-orchid))] to-[rgb(var(--sunset-gold))]';
    }
  };

  return (
    <div className={cn(
      getVariantClasses(), 
      getCardHeight(),
      'p-4 relative group transition-all duration-300 overflow-hidden',
      className
    )}>
      {/* Background Sparkline Chart */}
      {hasSparkline && (
        <RevenueSparkline variant={variant} />
      )}

      {/* Top Row: Icon and Progress Bar (for KPI cards) */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className={cn(
          'rounded-xl shadow-lg flex items-center justify-center flex-shrink-0',
          getIconGradient(),
          isHero ? 'w-16 h-16' : 'w-12 h-12'
        )}>
          <Icon className={cn(
            'text-white',
            isHero ? 'w-8 h-8' : 'w-6 h-6'
          )} />
        </div>
        
        {/* Progress Bar Next to Icon */}
        {hasProgressBar && (
          <div className="flex-1 ml-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[rgb(var(--muted-foreground))]">Daily Goal</span>
              <span className="text-[rgb(var(--foreground))]">{progressValue}%</span>
            </div>
            <div className="w-full bg-[rgba(var(--velvet-gray),0.5)] rounded-full h-2">
              <div 
                className={cn('bg-gradient-to-r h-2 rounded-full transition-all duration-500', getProgressBarColor())} 
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Center Content Area - Perfectly Centered */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 relative z-10">
        {/* Main Value - Bigger and Bolder */}
        <div className={cn(
          'transition-all duration-300 leading-none',
          getValueSize(),
          getValueColor(),
          isUpdating && 'animate-data-update'
        )}>
          {value}
        </div>
        
        {/* Title - Centered Below Value with Better Spacing */}
        <h3 className={cn(
          'font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider leading-tight',
          isHero ? 'text-lg lg:text-xl' : 'text-sm lg:text-base'
        )}>
          {title}
        </h3>
        
        {/* Subtitle - Centered Below Title with Adjusted Spacing */}
        {subtitle && (
          <p className={cn(
            'text-[rgb(var(--muted-foreground))] opacity-80 leading-tight',
            isHero ? 'text-base' : 'text-xs'
          )}>
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Additional content at bottom */}
      {children && (
        <div className="mt-3 pt-3 border-t border-[rgba(var(--border),0.3)] relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}