'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useState, useEffect } from 'react';

const generateChatterROIData = (timeframe: string, cumulative: boolean) => {
  const baseData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, '0')}:00`,
    employeeCost: Math.floor(Math.random() * 2000) + 500,
    revenueGenerated: Math.floor(Math.random() * 8000) + 2000
  }));

  if (cumulative) {
    let totalCost = 0;
    let totalRevenue = 0;
    
    return baseData.map(item => {
      totalCost += item.employeeCost;
      totalRevenue += item.revenueGenerated;
      
      return {
        ...item,
        employeeCost: totalCost,
        revenueGenerated: totalRevenue
      };
    });
  }

  return baseData;
};

interface ChatterROIChartProps {
  timeframe: string;
  cumulative: boolean;
}

export function ChatterROIChart({ timeframe, cumulative }: ChatterROIChartProps) {
  const [data, setData] = useState(generateChatterROIData(timeframe, cumulative));
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setData(generateChatterROIData(timeframe, cumulative));
    setAnimationKey(prev => prev + 1);
  }, [timeframe, cumulative]);

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} key={animationKey} margin={{ top: 5, right: 0, left: 5, bottom: 5 }}>
          <defs>
            <filter id="roiGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <XAxis 
            dataKey="hour"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
            domain={['dataMin', 'dataMax']}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k CZK`}
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
              `${value.toLocaleString()} CZK`,
              name === 'employeeCost' ? 'Employee Cost' : 'Revenue Generated'
            ]}
            labelFormatter={(label) => `Hour: ${label}`}
          />
          {/* Employee Cost - Red */}
          <Line
            type="monotone"
            dataKey="employeeCost"
            stroke="rgb(var(--crimson))"
            strokeWidth={4}
            dot={false}
            filter="url(#roiGlow)"
            animationDuration={1000}
            connectNulls={true}
          />
          {/* Revenue Generated - Green */}
          <Line
            type="monotone"
            dataKey="revenueGenerated"
            stroke="#10b981"
            strokeWidth={4}
            dot={false}
            filter="url(#roiGlow)"
            animationDuration={800}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}