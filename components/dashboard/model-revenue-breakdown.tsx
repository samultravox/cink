'use client';

import { useState } from 'react';
import { Crown, ChevronDown, ChevronRight, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock model revenue data with channel breakdown - converted to CZK
const modelRevenueData = [
  {
    id: 1,
    name: 'Sophia',
    totalToday: 105000,
    channels: [
      { name: 'Fanvue', amount: 50000 },
      { name: 'Live Call', amount: 27500 },
      { name: 'Insta', amount: 27500 }
    ]
  },
  {
    id: 2,
    name: 'Isabella',
    totalToday: 95000,
    channels: [
      { name: 'Fanvue', amount: 55000 },
      { name: 'WhatsApp', amount: 22500 },
      { name: 'FB Page', amount: 17500 }
    ]
  },
  {
    id: 3,
    name: 'Natalie',
    totalToday: 80000,
    channels: [
      { name: 'Fanvue', amount: 45000 },
      { name: 'Personal FB', amount: 20000 },
      { name: 'Telegram', amount: 15000 }
    ]
  },
  {
    id: 4,
    name: 'Luna',
    totalToday: 72500,
    channels: [
      { name: 'Fanvue', amount: 40000 },
      { name: 'FB Page', amount: 18750 },
      { name: 'Instagram', amount: 13750 }
    ]
  },
  {
    id: 5,
    name: 'Aria',
    totalToday: 52500,
    channels: [
      { name: 'Fanvue', amount: 30000 },
      { name: 'Private Chat', amount: 22500 }
    ]
  }
];

export function ModelRevenueBreakdown() {
  const [expandedModels, setExpandedModels] = useState<number[]>([]);

  const toggleModel = (modelId: number) => {
    setExpandedModels(prev => {
      const isCurrentlyExpanded = prev.includes(modelId);
      
      if (isCurrentlyExpanded) {
        // Remove from expanded
        return prev.filter(id => id !== modelId);
      } else {
        // Add to expanded
        return [...prev, modelId];
      }
    });
  };

  const getChannelColor = (channelName: string) => {
    if (channelName.includes('Fanvue')) return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    if (channelName.includes('FB') || channelName.includes('Facebook')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (channelName.includes('WhatsApp')) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (channelName.includes('Telegram')) return 'bg-blue-400/20 text-blue-300 border-blue-400/30';
    if (channelName.includes('Instagram') || channelName.includes('Insta')) return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
    if (channelName.includes('Call') || channelName.includes('Live')) return 'bg-red-500/20 text-red-400 border-red-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="glow-card p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[rgb(var(--foreground))] uppercase tracking-wider select-none">
            MODEL REVENUE
          </h3>
          <p className="text-[rgb(var(--muted-foreground))] text-xs select-none">
            Channel distribution • Revenue optimization
          </p>
        </div>
      </div>

      {/* Accordion List - Scrollable */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {modelRevenueData.map((model) => {
          const isExpanded = expandedModels.includes(model.id);
          
          return (
            <div key={model.id} className="border border-[rgba(var(--neon-orchid),0.2)] rounded-lg overflow-hidden">
              {/* Parent Row - Model Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleModel(model.id);
                }}
                className="w-full flex items-center justify-between p-3 bg-[rgba(var(--velvet-gray),0.2)] hover:bg-[rgba(var(--velvet-gray),0.3)] transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[rgba(var(--neon-orchid),0.5)] focus:ring-inset"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[rgb(var(--neon-orchid))] flex-shrink-0 transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[rgb(var(--muted-foreground))] flex-shrink-0 transition-transform duration-200" />
                    )}
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {model.name.charAt(0)}
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[rgb(var(--foreground))] select-none">{model.name}</span>
                </div>
                <div className="text-sm font-black text-gradient-gold select-none">
                  {model.totalToday.toLocaleString()}
                </div>
              </button>

              {/* Child Rows - Channels with Smooth Animation */}
              <div className={cn(
                'bg-[rgba(var(--obsidian),0.3)] border-t border-[rgba(var(--neon-orchid),0.1)] overflow-hidden transition-all duration-250 ease-in-out',
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}>
                <div className={cn(
                  'card-expansion-content transition-all duration-200 ease-in-out delay-50',
                  isExpanded ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-2'
                )}>
                  {model.channels.map((channel, index) => (
                    <div 
                      key={`${model.id}-${index}`} 
                      className="flex items-center justify-between px-4 py-3 border-b border-[rgba(var(--neon-orchid),0.05)] last:border-b-0 hover:bg-[rgba(var(--neon-orchid),0.03)] transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-3 h-3 text-[rgb(var(--muted-foreground))] flex-shrink-0" />
                        <span className={cn(
                          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
                          getChannelColor(channel.name)
                        )}>
                          {channel.name}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-green-400">
                        {channel.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Summary */}
      <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-[rgba(var(--neon-orchid),0.1)] to-[rgba(var(--sunset-gold),0.1)] border border-[rgba(var(--neon-orchid),0.2)]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[rgb(var(--foreground))] select-none">Total Today:</span>
          <span className="text-lg font-black text-gradient-gold select-none">
            {modelRevenueData.reduce((sum, model) => sum + model.totalToday, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}