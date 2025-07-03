'use client';

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, operators: 12 },
  { name: 'Feb', revenue: 3000, operators: 15 },
  { name: 'Mar', revenue: 5000, operators: 18 },
  { name: 'Apr', revenue: 4500, operators: 20 },
  { name: 'May', revenue: 6000, operators: 22 },
  { name: 'Jun', revenue: 7500, operators: 25 },
  { name: 'Jul', revenue: 8200, operators: 28 },
];

export function RevenueChart() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(var(--neon-orchid))" stopOpacity={0.4}/>
              <stop offset="50%" stopColor="rgb(var(--neon-orchid))" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="rgb(var(--neon-orchid))" stopOpacity={0}/>
            </linearGradient>
            <filter id="glow">
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
            tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
            tickFormatter={(value) => `$${value / 1000}k`}
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
            formatter={(value: number, name: string) => [
              name === 'revenue' ? `$${value.toLocaleString()}` : value,
              name === 'revenue' ? 'Revenue' : 'Operators'
            ]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="rgb(var(--neon-orchid))"
            strokeWidth={3}
            fill="url(#revenueGradient)"
            filter="url(#glow)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}