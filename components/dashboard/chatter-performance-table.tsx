'use client';

import { useState } from 'react';
import { Users, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock chatter performance data with new columns
const chatterData = [
  {
    id: 1,
    name: 'Isabella',
    status: 'active',
    madeToday: 61250,
    hoursWorked: 7.5,
    madePerHour: 8167,
    totalCost: 22500,
    ourProfit: 38750,
    avatar: 'I'
  },
  {
    id: 2,
    name: 'Sophia',
    status: 'active',
    madeToday: 52500,
    hoursWorked: 6.8,
    madePerHour: 7721,
    totalCost: 20400,
    ourProfit: 32100,
    avatar: 'S'
  },
  {
    id: 3,
    name: 'Luna',
    status: 'active',
    madeToday: 47250,
    hoursWorked: 6.2,
    madePerHour: 7621,
    totalCost: 18600,
    ourProfit: 28650,
    avatar: 'L'
  },
  {
    id: 4,
    name: 'Sarah',
    status: 'offline',
    madeToday: 41250,
    hoursWorked: 5.5,
    madePerHour: 7500,
    totalCost: 16500,
    ourProfit: 24750,
    avatar: 'S'
  },
  {
    id: 5,
    name: 'Emma',
    status: 'offline',
    madeToday: 35500,
    hoursWorked: 4.8,
    madePerHour: 7396,
    totalCost: 14400,
    ourProfit: 21100,
    avatar: 'E'
  }
];

export function ChatterPerformanceTable() {
  const [sortBy, setSortBy] = useState('madeToday');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Calculate summary stats
  const onlineCount = chatterData.filter(c => c.status === 'active').length;
  const totalCount = chatterData.length;
  const avgMade = Math.round(chatterData.reduce((sum, c) => sum + c.madeToday, 0) / chatterData.length);
  const avgPerHour = Math.round(chatterData.reduce((sum, c) => sum + c.madePerHour, 0) / chatterData.length);
  const totalCost = chatterData.reduce((sum, c) => sum + c.totalCost, 0);
  const avgTimeWorked = (chatterData.reduce((sum, c) => sum + c.hoursWorked, 0) / chatterData.length).toFixed(1);
  const totalProfit = chatterData.reduce((sum, c) => sum + c.ourProfit, 0);

  const sortedData = [...chatterData].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a] as number;
    const bValue = b[sortBy as keyof typeof b] as number;
    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-400' : 'bg-gray-400';
  };

  return (
    <div className="glow-card p-4">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
            CHATTER PERFORMANCE
          </h3>
          <p className="text-[rgb(var(--muted-foreground))] text-sm">
            Real-time operator metrics • Revenue efficiency tracking
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-[rgba(var(--neon-orchid),0.2)]">
        <table className="w-full">
          <thead className="bg-[rgba(var(--velvet-gray),0.3)]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                Chatter Name
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                Status
              </th>
              <th 
                className="px-4 py-3 text-right text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider cursor-pointer hover:text-[rgb(var(--neon-orchid))]"
                onClick={() => handleSort('madeToday')}
              >
                Made Today
              </th>
              <th 
                className="px-4 py-3 text-right text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider cursor-pointer hover:text-[rgb(var(--neon-orchid))]"
                onClick={() => handleSort('hoursWorked')}
              >
                Time Worked Today
              </th>
              <th 
                className="px-4 py-3 text-right text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider cursor-pointer hover:text-[rgb(var(--neon-orchid))]"
                onClick={() => handleSort('madePerHour')}
              >
                Made per Hour
              </th>
              <th 
                className="px-4 py-3 text-right text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider cursor-pointer hover:text-[rgb(var(--neon-orchid))]"
                onClick={() => handleSort('totalCost')}
              >
                Total Cost
              </th>
              <th 
                className="px-4 py-3 text-right text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider cursor-pointer hover:text-[rgb(var(--neon-orchid))]"
                onClick={() => handleSort('ourProfit')}
              >
                Our Profit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(var(--neon-orchid),0.1)]">
            {sortedData.map((chatter) => (
              <tr key={chatter.id} className="hover:bg-[rgba(var(--neon-orchid),0.05)] transition-colors duration-200">
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                      {chatter.avatar}
                    </div>
                    <span className="text-sm font-medium text-[rgb(var(--foreground))]">{chatter.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center">
                    <div className={cn('w-3 h-3 rounded-full', getStatusColor(chatter.status))}></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-bold text-green-400">{chatter.madeToday.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-bold text-[rgb(var(--foreground))]">{chatter.hoursWorked}h</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-bold text-[rgb(var(--foreground))]">{chatter.madePerHour.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-bold text-red-400">{chatter.totalCost.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-bold text-gradient-gold">{chatter.ourProfit.toLocaleString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Row */}
      <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-[rgba(var(--neon-orchid),0.1)] to-[rgba(var(--sunset-gold),0.1)] border border-[rgba(var(--neon-orchid),0.2)]">
        <div className="grid grid-cols-7 gap-4 text-sm">
          <div className="text-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="font-medium text-[rgb(var(--foreground))]">{onlineCount}/{totalCount}</span>
            </div>
            <div className="text-xs text-[rgb(var(--muted-foreground))]">Online</div>
          </div>
          <div className="text-center">
            <span className="font-medium text-[rgb(var(--foreground))]">{avgMade.toLocaleString()}</span>
            <div className="text-xs text-[rgb(var(--muted-foreground))]">Avg Revenue</div>
          </div>
          <div className="text-center">
            <span className="font-medium text-[rgb(var(--foreground))]">{avgTimeWorked}h</span>
            <div className="text-xs text-[rgb(var(--muted-foreground))]">Avg Time</div>
          </div>
          <div className="text-center">
            <span className="font-medium text-[rgb(var(--foreground))]">{avgPerHour.toLocaleString()}</span>
            <div className="text-xs text-[rgb(var(--muted-foreground))]">Avg/Hour</div>
          </div>
          <div className="text-center">
            <span className="font-medium text-red-400">{totalCost.toLocaleString()}</span>
            <div className="text-xs text-[rgb(var(--muted-foreground))]">Total Cost</div>
          </div>
          <div className="text-center">
            <span className="font-medium text-gradient-gold">{totalProfit.toLocaleString()}</span>
            <div className="text-xs text-[rgb(var(--muted-foreground))]">Total Profit</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}