'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

const modelData = [
  { name: 'Isabella', revenue: 28420, change: 12.4 },
  { name: 'Natalie', revenue: 24650, change: 8.7 },
  { name: 'Sophia', revenue: 21890, change: -3.2 },
  { name: 'Luna', revenue: 19240, change: 15.8 },
  { name: 'Aria', revenue: 17780, change: 6.3 },
  { name: 'Maya', revenue: 15320, change: -1.5 },
  { name: 'Zoe', revenue: 12890, change: 9.1 },
  { name: 'Emma', revenue: 11560, change: 4.2 }
];

interface ModelRevenueChartProps {
  selectedModel: string;
}

export function ModelRevenueChart({ selectedModel }: ModelRevenueChartProps) {
  const [data, setData] = useState(modelData);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (selectedModel === 'all') {
      // Show all models sorted by revenue
      const sortedData = [...modelData].sort((a, b) => b.revenue - a.revenue);
      setData(sortedData);
    } else {
      // Show only selected model
      const filteredData = modelData.filter(model => 
        model.name.toLowerCase() === selectedModel.toLowerCase()
      );
      setData(filteredData);
    }
    setAnimationKey(prev => prev + 1);
  }, [selectedModel]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} key={animationKey} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <defs>
          <linearGradient id="modelBarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgb(var(--sunset-gold))" stopOpacity={0.9}/>
            <stop offset="95%" stopColor="rgb(var(--sunset-gold))" stopOpacity={0.6}/>
          </linearGradient>
          <filter id="modelBarGlow">
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
          formatter={(value: number, name: string, props: any) => {
            const change = props.payload?.change || 0;
            const changeColor = change >= 0 ? '#10b981' : '#ef4444';
            const changeSymbol = change >= 0 ? '+' : '';
            return [
              <div key="tooltip">
                <div>${value.toLocaleString()}</div>
                <div style={{ color: changeColor, fontSize: '12px' }}>
                  {changeSymbol}{change}% vs last period
                </div>
              </div>,
              'Revenue'
            ];
          }}
        />
        <Bar
          dataKey="revenue"
          fill="url(#modelBarGradient)"
          radius={[4, 4, 0, 0]}
          filter="url(#modelBarGlow)"
          animationDuration={1200}
          animationBegin={0}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}