'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

const chatterData = [
  { name: 'Tysa', revenue: 8420 },
  { name: 'Maty', revenue: 7650 },
  { name: 'Sarah', revenue: 6890 },
  { name: 'Alex', revenue: 6240 },
  { name: 'Luna', revenue: 5780 },
  { name: 'Emma', revenue: 5320 },
  { name: 'Zoe', revenue: 4890 },
  { name: 'Maya', revenue: 4560 }
];

interface ChatterProfitChartProps {
  timeframe: string;
}

export function ChatterProfitChart({ timeframe }: ChatterProfitChartProps) {
  const [data, setData] = useState(chatterData);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Adjust revenue based on timeframe
    const multiplier = timeframe === 'daily' ? 0.3 : timeframe === 'weekly' ? 1 : timeframe === 'monthly' ? 3.2 : 12;
    const adjustedData = [...chatterData]
      .map(item => ({ ...item, revenue: Math.round(item.revenue * multiplier) }))
      .sort((a, b) => b.revenue - a.revenue);
    setData(adjustedData);
    setAnimationKey(prev => prev + 1);
  }, [timeframe]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} key={animationKey} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <defs>
          <linearGradient id="chatterBarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgb(var(--neon-orchid))" stopOpacity={0.9}/>
            <stop offset="95%" stopColor="rgb(var(--neon-orchid))" stopOpacity={0.6}/>
          </linearGradient>
          <filter id="chatterBarGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <XAxis 
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'rgb(var(--foreground))', fontSize: 12, fontWeight: 600 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 10 }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(var(--charcoal), 0.95)',
            border: '1px solid rgba(var(--neon-orchid), 0.3)',
            borderRadius: '12px',
            color: 'rgb(var(--foreground))',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(var(--neon-orchid), 0.2)'
          }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
        />
        <Bar
          dataKey="revenue"
          fill="url(#chatterBarGradient)"
          radius={[4, 4, 0, 0]}
          filter="url(#chatterBarGlow)"
          animationDuration={1200}
          animationBegin={0}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}