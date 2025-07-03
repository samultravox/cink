'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useState, useEffect } from 'react';

const generateChannelData = (timeframe: string, cumulative: boolean) => {
  const baseData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, '0')}:00`,
    fanvue: Math.floor(Math.random() * 3000) + 500,
    whatsapp: Math.floor(Math.random() * 2000) + 300,
    telegram: Math.floor(Math.random() * 1500) + 200,
    facebook: Math.floor(Math.random() * 2500) + 400,
    instagram: Math.floor(Math.random() * 1000) + 100
  }));

  if (cumulative) {
    let totalFanvue = 0;
    let totalWhatsapp = 0;
    let totalTelegram = 0;
    let totalFacebook = 0;
    let totalInstagram = 0;
    
    return baseData.map(item => {
      totalFanvue += item.fanvue;
      totalWhatsapp += item.whatsapp;
      totalTelegram += item.telegram;
      totalFacebook += item.facebook;
      totalInstagram += item.instagram;
      
      return {
        ...item,
        fanvue: totalFanvue,
        whatsapp: totalWhatsapp,
        telegram: totalTelegram,
        facebook: totalFacebook,
        instagram: totalInstagram
      };
    });
  }

  return baseData;
};

interface RevenueChannelsChartProps {
  timeframe: string;
  cumulative: boolean;
}

export function RevenueChannelsChart({ timeframe, cumulative }: RevenueChannelsChartProps) {
  const [data, setData] = useState(generateChannelData(timeframe, cumulative));
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setData(generateChannelData(timeframe, cumulative));
    setAnimationKey(prev => prev + 1);
  }, [timeframe, cumulative]);

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} key={animationKey} margin={{ top: 5, right: 0, left: 5, bottom: 5 }}>
          <defs>
            <filter id="channelsGlow">
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
              name.charAt(0).toUpperCase() + name.slice(1)
            ]}
            labelFormatter={(label) => `Hour: ${label}`}
          />
          {/* Fanvue - Purple */}
          <Line
            type="monotone"
            dataKey="fanvue"
            stroke="rgb(var(--neon-orchid))"
            strokeWidth={4}
            dot={false}
            filter="url(#channelsGlow)"
            animationDuration={1000}
            connectNulls={true}
          />
          {/* WhatsApp - Green */}
          <Line
            type="monotone"
            dataKey="whatsapp"
            stroke="#10b981"
            strokeWidth={4}
            dot={false}
            filter="url(#channelsGlow)"
            animationDuration={800}
            connectNulls={true}
          />
          {/* Telegram - Blue */}
          <Line
            type="monotone"
            dataKey="telegram"
            stroke="#3b82f6"
            strokeWidth={4}
            dot={false}
            filter="url(#channelsGlow)"
            animationDuration={1200}
            connectNulls={true}
          />
          {/* Facebook - Blue Dark */}
          <Line
            type="monotone"
            dataKey="facebook"
            stroke="#1e40af"
            strokeWidth={4}
            dot={false}
            filter="url(#channelsGlow)"
            animationDuration={900}
            connectNulls={true}
          />
          {/* Instagram - Pink */}
          <Line
            type="monotone"
            dataKey="instagram"
            stroke="#ec4899"
            strokeWidth={4}
            dot={false}
            filter="url(#channelsGlow)"
            animationDuration={1100}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}