'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useState, useEffect } from 'react';

const generateNewClientsData = (timeframe: string, cumulative: boolean) => {
  const baseData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, '0')}:00`,
    newClients: Math.floor(Math.random() * 8) + 1
  }));

  if (cumulative) {
    let total = 0;
    return baseData.map(item => {
      total += item.newClients;
      return { ...item, newClients: total };
    });
  }

  return baseData;
};

interface NewClientsChartProps {
  timeframe: string;
  cumulative: boolean;
}

export function NewClientsChart({ timeframe, cumulative }: NewClientsChartProps) {
  const [data, setData] = useState(generateNewClientsData(timeframe, cumulative));
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setData(generateNewClientsData(timeframe, cumulative));
    setAnimationKey(prev => prev + 1);
  }, [timeframe, cumulative]);

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} key={animationKey} margin={{ top: 5, right: 0, left: 5, bottom: 5 }}>
          <defs>
            <filter id="newClientsGlow">
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
            tickFormatter={(value) => cumulative ? value.toString() : value.toString()}
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
            formatter={(value: number) => [
              cumulative ? `${value} total clients` : `${value} new clients`,
              cumulative ? 'Total New Clients' : 'New Clients'
            ]}
            labelFormatter={(label) => `Hour: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="newClients"
            stroke="rgb(var(--neon-orchid))"
            strokeWidth={4}
            dot={false}
            filter="url(#newClientsGlow)"
            animationDuration={1000}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}