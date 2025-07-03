'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, Calendar, Target, Lock, Clock, DollarSign } from 'lucide-react';

interface StreamProgressBarProps {
  currentRevenue: number;
  provisionRate: number;
  nextMilestone: number;
  timeBonus: number;
}

export function StreamProgressBar({ 
  currentRevenue, 
  provisionRate, 
  nextMilestone,
  timeBonus
}: StreamProgressBarProps) {
  const milestones = [
    { amount: 125000, commission: 18 },
    { amount: 250000, commission: 20 },
    { amount: 375000, commission: 22 },
    { amount: 500000, commission: 24 },
    { amount: 625000, commission: 26 },
    { amount: 750000, commission: 28 }
  ];
  
  // Fixed scale logic - use 750K as max scale
  const maxScale = 750000;
  const progressPercentage = useMemo(() => {
    return Math.min((currentRevenue / maxScale) * 100, 100);
  }, [currentRevenue, maxScale]);

  // Calculate provisions
  const submissionProvision = Math.round(currentRevenue * (provisionRate / 100));
  const totalProvision = submissionProvision + timeBonus;
  
  // Find current and next milestone
  const currentMilestone = milestones.find(m => currentRevenue < m.amount);
  const nextCommissionRate = currentMilestone ? currentMilestone.commission : 28;
  const amountToNext = currentMilestone ? currentMilestone.amount - currentRevenue : 0;
  const additionalEarnings = Math.round(amountToNext * ((nextCommissionRate - provisionRate) / 100));

  return (
    <div className="space-y-4">
      {/* Main Progress Card - More Compact */}
      <div className="glow-card p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Left: Current Revenue */}
          <div className="text-center">
            <div className="text-3xl font-black text-gradient-gold mb-1">
              {currentRevenue.toLocaleString()} <span className="text-xs opacity-80">CZK</span>
            </div>
            <div className="text-xs text-[rgb(var(--muted-foreground))] font-medium uppercase tracking-wide">
              Dnes jsi přinesl
            </div>
          </div>
          
          {/* Right: Provision with Lock */}
          <div className="text-center relative">
            <div className="text-3xl font-black text-[rgb(var(--neon-orchid))] mb-1">
              {submissionProvision.toLocaleString()} <span className="text-xs opacity-80">CZK</span>
            </div>
            <div className="text-xs text-[rgb(var(--muted-foreground))] font-medium uppercase tracking-wide flex items-center justify-center">
              <span>{provisionRate}% provize</span>
              {currentMilestone && (
                <div className="relative ml-2 group">
                  <Lock className="w-3 h-3 text-[rgb(var(--muted-foreground))]" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-32 p-1 rounded bg-[rgba(var(--charcoal),0.95)] text-xs text-[rgb(var(--foreground))] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {nextCommissionRate}% odemknuto při {currentMilestone.amount.toLocaleString()} CZK
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar - Simplified */}
        <div className="relative mb-6">
          {/* Background Track */}
          <div className="w-full h-2 bg-[rgba(var(--velvet-gray),0.3)] rounded-full overflow-hidden">
            {/* Progress Fill */}
            <div 
              className="h-full bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--sunset-gold))] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Milestone Markers */}
          <div className="absolute top-2 w-full h-2 flex items-center">
            {milestones.map((milestone) => {
              const position = (milestone.amount / maxScale) * 100;
              const isReached = currentRevenue >= milestone.amount;
              const isCurrent = milestone.amount === nextMilestone;
              
              return (
                <div
                  key={milestone.amount}
                  className="absolute transform -translate-x-1/2"
                  style={{ left: `${position}%` }}
                >
                  {/* Milestone Marker */}
                  <div className={cn(
                    'w-1.5 h-1.5 rounded-full border transition-all duration-300',
                    isReached 
                      ? 'bg-[rgb(var(--sunset-gold))] border-white' 
                      : isCurrent
                      ? 'bg-white border-[rgb(var(--neon-orchid))] animate-pulse'
                      : 'bg-[rgba(var(--velvet-gray),0.5)] border-[rgba(var(--muted-foreground),0.5)]'
                  )}></div>
                  
                  {/* Milestone Amount - Only show for current and next */}
                  {(isCurrent || (isReached && position > 80)) && (
                    <div className={cn(
                      'absolute top-3 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap flex items-center',
                      isReached 
                        ? 'text-[rgb(var(--sunset-gold))]' 
                        : 'text-[rgb(var(--neon-orchid))]'
                    )}>
                      {!isReached && <Lock className="w-3 h-3 mr-1" />}
                      {milestone.amount.toLocaleString()} <span className="text-xs opacity-80 ml-1">CZK</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Milestone Info - Compact */}
        {currentMilestone && (
          <div className="text-center text-sm font-medium text-[rgb(var(--foreground))]">
            <span className="text-[rgb(var(--neon-orchid))]">{amountToNext.toLocaleString()} CZK</span> do {currentMilestone.amount.toLocaleString()} CZK a odemkneš <span className="text-[rgb(var(--sunset-gold))]">{nextCommissionRate}%</span> provizi (+{additionalEarnings.toLocaleString()} CZK)
          </div>
        )}
      </div>
    </div>
  );
}