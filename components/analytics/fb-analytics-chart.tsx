'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useState, useEffect } from 'react';

const generateFBData = (timeframe: string, cumulative: boolean) => {
  const baseData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, '0')}:00`,
    adSpend: Math.floor(Math.random() * 500) + 100,
    moneyMadeBack: Math.floor(Math.random() * 1200) + 300,
    conversionRate: Math.floor(Math.random() * 15) + 10
  }));

  if (cumulative) {
    let totalAdSpend = 0;
    let totalMoneyBack = 0;
    
    return baseData.map(item => {
      totalAdSpend += item.adSpend;
      totalMoneyBack += item.moneyMadeBack;
      
      return {
        ...item,
        adSpend: totalAdSpend,
        moneyMadeBack: totalMoneyBack,
        conversionRate: totalMoneyBack > 0 ? Math.round((totalMoneyBack / totalAdSpend) * 100) : 0
      };
    });
  }

  return baseData;
};

interface FBAnalyticsChartProps {
  timeframe: string;
  cumulative: boolean;
}

export function FBAnalyticsChart({ timeframe, cumulative }: FBAnalyticsChartProps) {
  const [data, setData] = useState(generateFBData(timeframe, cumulative));
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setData(generateFBData(timeframe, cumulative));
    setAnimationKey(prev => prev + 1);
  }, [timeframe, cumulative]);

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} key={animationKey} margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
          <defs>
            <filter id="fbGlow">
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
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
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
              if (name === 'conversionRate') {
                return [`${value}%`, 'Conversion Rate'];
              }
              return [`${value.toLocaleString()} CZK`, name === 'adSpend' ? 'Ad Spend' : 'Money Made Back'];
            }}
            labelFormatter={(label) => `Hour: ${label}`}
          />
          {/* Ad Spend - Red */}
          <Line
            type="monotone"
            dataKey="adSpend"
            stroke="rgb(var(--crimson))"
            strokeWidth={4}
            dot={false}
            filter="url(#fbGlow)"
            animationDuration={1000}
            connectNulls={true}
          />
          {/* Money Made Back - Green */}
          <Line
            type="monotone"
            dataKey="moneyMadeBack"
            stroke="#10b981"
            strokeWidth={4}
            dot={false}
            filter="url(#fbGlow)"
            animationDuration={800}
            connectNulls={true}
          />
          {/* Conversion Rate - Gold (scaled for visibility) */}
          <Line
            type="monotone"
            dataKey="conversionRate"
            stroke="rgb(var(--sunset-gold))"
            strokeWidth={4}
            dot={false}
            filter="url(#fbGlow)"
            animationDuration={1200}
            connectNulls={true}
            yAxisId="right"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}