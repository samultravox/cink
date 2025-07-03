'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useState, useEffect } from 'react';

const generateData = (timeframe: string, cumulative: boolean = false) => {
  let baseData;
  
  switch (timeframe) {
    case 'daily':
      baseData = Array.from({ length: 24 }, (_, i) => ({
        name: `${i.toString().padStart(2, '0')}:00`,
        time: `${i.toString().padStart(2, '0')}:00`,
        revenue: 200 + Math.random() * 800 + i * 50,
        expenses: 80 + Math.random() * 200 + i * 15,
        profit: 0
      }));
      break;
    
    case 'weekly':
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      baseData = days.map((day, i) => ({
        name: day,
        time: day,
        revenue: 3000 + Math.random() * 2000 + i * 200,
        expenses: 1200 + Math.random() * 600 + i * 80,
        profit: 0
      }));
      break;
    
    case 'monthly':
      baseData = Array.from({ length: 4 }, (_, i) => ({
        name: `Week ${i + 1}`,
        time: `Week ${i + 1}`,
        revenue: 15000 + Math.random() * 8000 + i * 1000,
        expenses: 6000 + Math.random() * 2000 + i * 400,
        profit: 0
      }));
      break;
    
    case 'quarterly':
      baseData = Array.from({ length: 3 }, (_, i) => ({
        name: `Q${i + 1}`,
        time: `Q${i + 1}`,
        revenue: 45000 + Math.random() * 15000 + i * 3000,
        expenses: 18000 + Math.random() * 5000 + i * 1200,
        profit: 0
      }));
      break;
    
    default:
      baseData = Array.from({ length: 12 }, (_, i) => ({
        name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        time: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        revenue: 4200 + Math.random() * 5000 + i * 400,
        expenses: 1800 + Math.random() * 1500 + i * 150,
        profit: 0
      }));
  }

  // Calculate profit
  baseData = baseData.map(item => ({ ...item, profit: item.revenue - item.expenses }));

  // Apply cumulative calculation if enabled
  if (cumulative) {
    let totalRevenue = 0;
    let totalExpenses = 0;
    let totalProfit = 0;
    
    return baseData.map(item => {
      totalRevenue += item.revenue;
      totalExpenses += item.expenses;
      totalProfit += item.profit;
      
      return {
        ...item,
        revenue: totalRevenue,
        expenses: totalExpenses,
        profit: totalProfit
      };
    });
  }

  return baseData;
};

interface MultiMetricChartProps {
  timeframe: string;
  cumulative?: boolean;
}

export function MultiMetricChart({ timeframe, cumulative = false }: MultiMetricChartProps) {
  const [data, setData] = useState(generateData(timeframe, cumulative));
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setData(generateData(timeframe, cumulative));
    setAnimationKey(prev => prev + 1);
  }, [timeframe, cumulative]);

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} key={animationKey} margin={{ top: 5, right: 0, left: 5, bottom: 5 }}>
          <defs>
            <filter id="revenueGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="expenseGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="profitGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
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
            domain={['dataMin', 'dataMax']}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
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
              `$${value.toLocaleString()}`,
              cumulative ? `Total ${name.charAt(0).toUpperCase() + name.slice(1)}` : name.charAt(0).toUpperCase() + name.slice(1)
            ]}
            labelFormatter={(label) => `Time: ${label}`}
          />
          {/* Revenue Line - Yellow to match Revenue card */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="rgb(var(--sunset-gold))"
            strokeWidth={4}
            dot={false}
            filter="url(#revenueGlow)"
            animationDuration={1000}
            connectNulls={true}
          />
          {/* Profit Line - Pink to match Profit card */}
          <Line
            type="monotone"
            dataKey="profit"
            stroke="rgb(var(--crimson))"
            strokeWidth={5}
            dot={false}
            filter="url(#profitGlow)"
            animationDuration={800}
            connectNulls={true}
          />
          {/* Expenses Line - Orange secondary color */}
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ff7f50"
            strokeWidth={3}
            dot={false}
            filter="url(#expenseGlow)"
            animationDuration={1200}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}