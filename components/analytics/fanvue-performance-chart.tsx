'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useState, useEffect } from 'react';

const generateFanvueData = (timeframe: string, cumulative: boolean) => {
  const baseData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, '0')}:00`,
    newFollowers: Math.floor(Math.random() * 15) + 2,
    newSubs: Math.floor(Math.random() * 5) + 1,
    lostSubs: Math.floor(Math.random() * 3)
  }));

  if (cumulative) {
    let totalFollowers = 0;
    let totalNewSubs = 0;
    let totalLostSubs = 0;
    
    return baseData.map(item => {
      totalFollowers += item.newFollowers;
      totalNewSubs += item.newSubs;
      totalLostSubs += item.lostSubs;
      
      return {
        ...item,
        newFollowers: totalFollowers,
        newSubs: totalNewSubs,
        lostSubs: totalLostSubs
      };
    });
  }

  return baseData;
};

interface FanvuePerformanceChartProps {
  timeframe: string;
  cumulative: boolean;
}

export function FanvuePerformanceChart({ timeframe, cumulative }: FanvuePerformanceChartProps) {
  const [data, setData] = useState(generateFanvueData(timeframe, cumulative));
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setData(generateFanvueData(timeframe, cumulative));
    setAnimationKey(prev => prev + 1);
  }, [timeframe, cumulative]);

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} key={animationKey} margin={{ top: 5, right: 0, left: 5, bottom: 5 }}>
          <defs>
            <filter id="fanvueGlow">
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
            formatter={(value: number, name: string) => {
              const labels = {
                newFollowers: cumulative ? 'Total New Followers' : 'New Followers',
                newSubs: cumulative ? 'Total New Subs' : 'New Subs',
                lostSubs: cumulative ? 'Total Lost Subs' : 'Lost Subs'
              };
              return [value, labels[name as keyof typeof labels] || name];
            }}
            labelFormatter={(label) => `Hour: ${label}`}
          />
          {/* New Followers - Purple */}
          <Line
            type="monotone"
            dataKey="newFollowers"
            stroke="rgb(var(--neon-orchid))"
            strokeWidth={4}
            dot={false}
            filter="url(#fanvueGlow)"
            animationDuration={1000}
            connectNulls={true}
          />
          {/* New Subs - Gold */}
          <Line
            type="monotone"
            dataKey="newSubs"
            stroke="rgb(var(--sunset-gold))"
            strokeWidth={4}
            dot={false}
            filter="url(#fanvueGlow)"
            animationDuration={800}
            connectNulls={true}
          />
          {/* Lost Subs - Red */}
          <Line
            type="monotone"
            dataKey="lostSubs"
            stroke="rgb(var(--crimson))"
            strokeWidth={4}
            dot={false}
            filter="url(#fanvueGlow)"
            animationDuration={1200}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}