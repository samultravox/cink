'use client';

import { Area, AreaChart, ResponsiveContainer } from 'recharts';

// Sample revenue data for sparkline (last 7 days)
const sparklineData = [
  { day: 1, value: 120 },
  { day: 2, value: 85 },
  { day: 3, value: 95 },
  { day: 4, value: 110 },
  { day: 5, value: 140 },
  { day: 6, value: 180 },
  { day: 7, value: 220 }
];

interface RevenueSparklineProps {
  variant?: 'primary' | 'gold' | 'crimson' | 'green' | 'blue';
  data?: Array<{ day: number; value: number }>;
}

export function RevenueSparkline({ variant = 'gold', data = sparklineData }: RevenueSparklineProps) {
  const getGradientColors = () => {
    switch (variant) {
      case 'gold':
        return {
          stroke: 'rgb(var(--sunset-gold))',
          gradientStart: 'rgba(var(--sunset-gold), 0.3)',
          gradientEnd: 'rgba(var(--sunset-gold), 0.05)'
        };
      case 'crimson':
        return {
          stroke: 'rgb(var(--crimson))',
          gradientStart: 'rgba(var(--crimson), 0.3)',
          gradientEnd: 'rgba(var(--crimson), 0.05)'
        };
      case 'green':
        return {
          stroke: '#10b981',
          gradientStart: 'rgba(16, 185, 129, 0.3)',
          gradientEnd: 'rgba(16, 185, 129, 0.05)'
        };
      case 'blue':
        return {
          stroke: '#3b82f6',
          gradientStart: 'rgba(59, 130, 246, 0.3)',
          gradientEnd: 'rgba(59, 130, 246, 0.05)'
        };
      default:
        return {
          stroke: 'rgb(var(--neon-orchid))',
          gradientStart: 'rgba(var(--neon-orchid), 0.3)',
          gradientEnd: 'rgba(var(--neon-orchid), 0.05)'
        };
    }
  };

  const colors = getGradientColors();

  return (
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`sparklineGradient-${variant}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.gradientStart} />
              <stop offset="95%" stopColor={colors.gradientEnd} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={colors.stroke}
            strokeWidth={1.5}
            fill={`url(#sparklineGradient-${variant})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}