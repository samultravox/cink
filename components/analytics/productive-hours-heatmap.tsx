'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    revenue: Math.floor(Math.random() * 15000) + 1000,
    label: `${i.toString().padStart(2, '0')}:00`
  }));
};

interface ProductiveHoursHeatmapProps {
  timeframe: string;
}

export function ProductiveHoursHeatmap({ timeframe }: ProductiveHoursHeatmapProps) {
  const [data, setData] = useState(generateHourlyData());
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  useEffect(() => {
    setData(generateHourlyData());
  }, [timeframe]);

  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const minRevenue = Math.min(...data.map(d => d.revenue));

  const getIntensity = (revenue: number) => {
    return (revenue - minRevenue) / (maxRevenue - minRevenue);
  };

  const getHeatmapColor = (intensity: number) => {
    // Create a gradient from dark to bright using neon-orchid
    const opacity = Math.max(0.2, intensity);
    return `rgba(var(--neon-orchid), ${opacity})`;
  };

  const firstRow = data.slice(0, 12);
  const secondRow = data.slice(12, 24);

  return (
    <div className="h-full w-full p-4">
      <div className="space-y-4">
        {/* First Row: 00:00 - 11:00 */}
        <div className="grid grid-cols-12 gap-2">
          {firstRow.map((hourData) => {
            const intensity = getIntensity(hourData.revenue);
            const isHovered = hoveredHour === hourData.hour;
            
            return (
              <div
                key={hourData.hour}
                className={cn(
                  'relative aspect-square rounded-lg border border-[rgba(var(--neon-orchid),0.3)] cursor-pointer transition-all duration-200',
                  isHovered && 'scale-110 z-10'
                )}
                style={{ backgroundColor: getHeatmapColor(intensity) }}
                onMouseEnter={() => setHoveredHour(hourData.hour)}
                onMouseLeave={() => setHoveredHour(null)}
              >
                {/* Hour Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold">
                  <div className="text-xs">{hourData.label}</div>
                  <div className="text-xs opacity-80">{(intensity * 100).toFixed(0)}%</div>
                </div>
                
                {/* Hover Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.3)] backdrop-blur-sm shadow-xl z-20 whitespace-nowrap">
                    <div className="text-sm font-bold text-[rgb(var(--foreground))]">
                      {hourData.label}
                    </div>
                    <div className="text-sm text-[rgb(var(--sunset-gold))]">
                      {hourData.revenue.toLocaleString()} CZK
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Second Row: 12:00 - 23:00 */}
        <div className="grid grid-cols-12 gap-2">
          {secondRow.map((hourData) => {
            const intensity = getIntensity(hourData.revenue);
            const isHovered = hoveredHour === hourData.hour;
            
            return (
              <div
                key={hourData.hour}
                className={cn(
                  'relative aspect-square rounded-lg border border-[rgba(var(--neon-orchid),0.3)] cursor-pointer transition-all duration-200',
                  isHovered && 'scale-110 z-10'
                )}
                style={{ backgroundColor: getHeatmapColor(intensity) }}
                onMouseEnter={() => setHoveredHour(hourData.hour)}
                onMouseLeave={() => setHoveredHour(null)}
              >
                {/* Hour Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold">
                  <div className="text-xs">{hourData.label}</div>
                  <div className="text-xs opacity-80">{(intensity * 100).toFixed(0)}%</div>
                </div>
                
                {/* Hover Tooltip */}
                {isHovered && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.3)] backdrop-blur-sm shadow-xl z-20 whitespace-nowrap">
                    <div className="text-sm font-bold text-[rgb(var(--foreground))]">
                      {hourData.label}
                    </div>
                    <div className="text-sm text-[rgb(var(--sunset-gold))]">
                      {hourData.revenue.toLocaleString()} CZK
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-4 mt-4">
          <span className="text-sm text-[rgb(var(--muted-foreground))]">Low Revenue</span>
          <div className="flex space-x-1">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded"
                style={{ backgroundColor: getHeatmapColor(i / 9) }}
              />
            ))}
          </div>
          <span className="text-sm text-[rgb(var(--muted-foreground))]">High Revenue</span>
        </div>
      </div>
    </div>
  );
}