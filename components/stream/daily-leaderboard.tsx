'use client';

import { useState } from 'react';
import { Trophy, Medal, Award, Calendar, Clock, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  id: number;
  name: string;
  revenue: number;
  avatar: string;
  isCurrentUser?: boolean;
}

interface DailyLeaderboardProps {
  data: LeaderboardEntry[];
}

export function DailyLeaderboard({ data }: DailyLeaderboardProps) {
  const [activeFilter, setActiveFilter] = useState('dnes');

  const filters = [
    { id: 'dnes', label: 'Dnes' },
    { id: 'tyden', label: 'Týden' },
    { id: 'mesic', label: 'Měsíc' }
  ];

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 text-[rgb(var(--sunset-gold))]" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-400" />;
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-[rgba(var(--velvet-gray),0.5)] flex items-center justify-center text-xs font-bold text-[rgb(var(--muted-foreground))]">
            {position}
          </div>
        );
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return 'text-[rgb(var(--sunset-gold))]';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-orange-400';
      default:
        return 'text-[rgb(var(--muted-foreground))]';
    }
  };

  const getBarWidth = (revenue: number, maxRevenue: number) => {
    return Math.max((revenue / maxRevenue) * 100, 5); // Minimum 5% width for visibility
  };

  // Adjust revenue based on filter (mock data adjustment)
  const getAdjustedRevenue = (revenue: number) => {
    switch (activeFilter) {
      case 'dnes':
        return revenue;
      case 'tyden':
        return Math.round(revenue * 4.2); // Weekly multiplier
      case 'mesic':
        return Math.round(revenue * 18.5); // Monthly multiplier
      default:
        return revenue;
    }
  };

  const adjustedData = data.map(entry => ({
    ...entry,
    revenue: getAdjustedRevenue(entry.revenue)
  }));

  const maxRevenue = Math.max(...adjustedData.map(entry => entry.revenue));

  return (
    <div className="glow-card p-4 h-full flex flex-col">
      {/* Filter Buttons - NO HOVER SCALING */}
      <div className="flex space-x-1 mb-4">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              'flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors duration-200',
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white shadow-lg'
                : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)]'
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {adjustedData.map((entry, index) => {
          const position = index + 1;
          const barWidth = getBarWidth(entry.revenue, maxRevenue);
          
          return (
            <div
              key={entry.id}
              className={cn(
                'relative p-3 rounded-lg transition-colors duration-200',
                entry.isCurrentUser
                  ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] border border-[rgba(var(--neon-orchid),0.3)] shadow-lg'
                  : 'bg-[rgba(var(--velvet-gray),0.2)] hover:bg-[rgba(var(--velvet-gray),0.3)]'
              )}
            >
              {/* Background Bar */}
              <div 
                className={cn(
                  'absolute inset-0 rounded-lg opacity-20 transition-all duration-500',
                  position === 1 ? 'bg-gradient-to-r from-[rgb(var(--sunset-gold))] to-[rgb(var(--neon-orchid))]' :
                  position === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                  position === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                  'bg-gradient-to-r from-[rgba(var(--velvet-gray),0.5)] to-[rgba(var(--smoke),0.5)]'
                )}
                style={{ width: `${barWidth}%` }}
              />
              
              {/* Content */}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* Rank Icon */}
                  <div className="flex-shrink-0">
                    {getRankIcon(position)}
                  </div>
                  
                  {/* Avatar */}
                  <div className={cn(
                    'w-6 h-6 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold',
                    entry.isCurrentUser 
                      ? 'from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))]'
                      : 'from-purple-500 to-pink-500'
                  )}>
                    {entry.avatar}
                  </div>
                  
                  {/* Name */}
                  <div className={cn(
                    'font-bold text-sm',
                    entry.isCurrentUser 
                      ? 'text-[rgb(var(--neon-orchid))]' 
                      : 'text-[rgb(var(--foreground))]'
                  )}>
                    {entry.name}
                    {entry.isCurrentUser && (
                      <span className="ml-1 text-xs text-[rgb(var(--muted-foreground))]">(Ty)</span>
                    )}
                  </div>
                </div>
                
                {/* Revenue */}
                <div className={cn(
                  'text-right',
                  entry.isCurrentUser ? 'text-[rgb(var(--neon-orchid))]' : getRankColor(position)
                )}>
                  <div className="font-bold text-sm">
                    {entry.revenue.toLocaleString()} CZK
                  </div>
                  <div className="text-xs text-[rgb(var(--muted-foreground))]">
                    #{position}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}