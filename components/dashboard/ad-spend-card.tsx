'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock ad spend data per model
const adSpendData = [
  { model: 'Isabella', amount: 350, trend: 'up' },
  { model: 'Sophia', amount: 270, trend: 'down' },
  { model: 'Luna', amount: 420, trend: 'up' },
  { model: 'Natalie', amount: 180, trend: 'stable' },
  { model: 'Aria', amount: 95, trend: 'up' }
];

export function AdSpendCard() {
  const totalSpend = adSpendData.reduce((sum, item) => sum + item.amount, 0);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-red-400" />;
      case 'down':
        return <TrendingUp className="w-3 h-3 text-green-400 rotate-180" />;
      default:
        return <div className="w-3 h-3 rounded-full bg-yellow-400"></div>;
    }
  };

  return (
    <div className="glow-card p-4 relative overflow-hidden min-h-[160px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Total Amount */}
      <div className="text-center mb-4">
        <div className="text-4xl font-black text-red-400 mb-2">
          {totalSpend} CZK
        </div>
        <div className="text-sm text-[rgb(var(--muted-foreground))] font-medium uppercase tracking-wide">
          Ad Spend Today
        </div>
      </div>

      {/* Scrollable Model List */}
      <div className="max-h-20 overflow-y-auto space-y-1">
        {adSpendData.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-1 px-2 rounded bg-[rgba(var(--velvet-gray),0.2)]">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                {item.model.charAt(0)}
              </div>
              <span className="text-xs font-medium text-[rgb(var(--foreground))]">{item.model}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs font-bold text-red-400">{item.amount} CZK</span>
              {getTrendIcon(item.trend)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}