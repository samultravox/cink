'use client';

import { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { RevenueSparkline } from './revenue-sparkline';
import { cn } from '@/lib/utils';

interface CollapsibleStatsCardProps {
  title: string;
  value: string | number;
  icon: any;
  variant?: 'primary' | 'gold' | 'crimson';
  subtitle?: string;
  hasSparkline?: boolean;
  currency?: string;
  tableData?: any[];
  tableColumns?: string[];
  renderTableRow?: (item: any, index: number) => ReactNode;
  valueClassName?: string;
  // Goal progress props
  goalProgress?: {
    current: number;
    target: number;
    timeframe: 'daily' | 'weekly' | 'monthly';
    enabled: boolean;
  };
}

export function CollapsibleStatsCard({
  title,
  value,
  icon: Icon,
  variant = 'primary',
  subtitle,
  hasSparkline = false,
  currency,
  tableData = [],
  tableColumns = [],
  renderTableRow,
  valueClassName,
  goalProgress
}: CollapsibleStatsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case 'gold':
        return 'stats-card-gold';
      case 'crimson':
        return 'stats-card-crimson';
      default:
        return 'stats-card-primary';
    }
  };

  const getIconGradient = () => {
    switch (variant) {
      case 'gold':
        return 'bg-gradient-to-br from-yellow-400 to-orange-500';
      case 'crimson':
        return 'bg-gradient-to-br from-pink-500 to-red-500';
      default:
        return 'bg-gradient-to-br from-purple-500 to-pink-500';
    }
  };

  const getValueColor = () => {
    switch (variant) {
      case 'gold':
        return 'text-gradient-gold stat-glow';
      case 'crimson':
        return 'text-[rgb(var(--crimson))] stat-glow';
      default:
        return 'text-gradient-primary stat-glow';
    }
  };

  const getProgressBarColor = () => {
    switch (variant) {
      case 'gold':
        return 'from-[rgb(var(--sunset-gold))] to-[rgb(var(--neon-orchid))]';
      case 'crimson':
        return 'from-[rgb(var(--crimson))] to-[rgb(var(--sunset-gold))]';
      default:
        return 'from-[rgb(var(--neon-orchid))] to-[rgb(var(--sunset-gold))]';
    }
  };

  const defaultValueClassName = 'text-5xl font-black leading-tight transition-all duration-300';
  const finalValueClassName = valueClassName || defaultValueClassName;

  // Calculate progress percentage
  const progressPercentage = goalProgress && goalProgress.enabled && goalProgress.target > 0 
    ? Math.min((goalProgress.current / goalProgress.target) * 100, 100) 
    : 0;

  const getTimeframeLabel = () => {
    if (!goalProgress) return '';
    switch (goalProgress.timeframe) {
      case 'daily':
        return 'Daily Goal';
      case 'weekly':
        return 'Weekly Goal';
      case 'monthly':
        return 'Monthly Goal';
      default:
        return 'Goal';
    }
  };

  return (
    <div className={cn(getVariantClasses(), 'p-3 relative group transition-all duration-300 overflow-hidden min-h-[140px]')}>
      {/* Background Sparkline Chart */}
      {hasSparkline && <RevenueSparkline variant={variant} />}

      {/* Clickable Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
      >
        {/* Top Row: Icon and Progress Bar (for goal-enabled cards) */}
        <div className="flex items-center justify-between mb-2 relative z-10">
          <div className={cn(
            'rounded-xl shadow-lg flex items-center justify-center flex-shrink-0 w-12 h-12',
            getIconGradient()
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          {/* Progress Bar Next to Icon - Only show if goal is enabled */}
          {goalProgress && goalProgress.enabled && (
            <div className="flex-1 ml-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[rgb(var(--muted-foreground))]">{getTimeframeLabel()}</span>
                <span className="text-[rgb(var(--foreground))]">{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[rgba(var(--velvet-gray),0.5)] rounded-full h-2">
                <div 
                  className={cn('bg-gradient-to-r h-2 rounded-full transition-all duration-500', getProgressBarColor())} 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              {/* Goal target info */}
              <div className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
                {goalProgress.current.toLocaleString()} / {goalProgress.target.toLocaleString()} {currency}
              </div>
            </div>
          )}
          
          {/* Expand/Collapse indicator - Only show if there's table data */}
          {tableData.length > 0 && (
            <div className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors ml-2">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          )}
        </div>

        {/* Center Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 relative z-10">
          {/* Main Value with Currency - Fixed Layout */}
          <div className="flex items-baseline justify-center space-x-2">
            <div className={cn(finalValueClassName, getValueColor())}>
              {value}
            </div>
            {currency && (
              <span className="text-xs text-[rgb(var(--foreground))] opacity-80 font-medium">
                {currency}
              </span>
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-sm font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider leading-tight">
            {title}
          </h3>
          
          {/* Subtitle */}
          {subtitle && (
            <p className="text-xs text-[rgb(var(--muted-foreground))] opacity-80 leading-tight">
              {subtitle}
            </p>
          )}
        </div>
      </button>

      {/* Collapsible Table with Smooth Animation */}
      <div className={cn(
        'collapsible-content transition-all duration-250 ease-in-out overflow-hidden',
        isExpanded ? 'expanded' : 'collapsed'
      )} style={{ 
        maxHeight: isExpanded ? '400px' : '0px'
      }}>
        {tableData.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[rgba(var(--border),0.3)] relative z-10">
            <div className={cn(
              'card-expansion-content transition-all duration-200 ease-in-out',
              isExpanded ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-2'
            )}>
              <div className="overflow-hidden rounded-lg border border-[rgba(var(--neon-orchid),0.2)]">
                <table className="w-full text-xs">
                  <thead className="bg-[rgba(var(--velvet-gray),0.3)]">
                    <tr>
                      {tableColumns.map((column, index) => (
                        <th key={index} className="px-2 py-2 text-left font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(var(--neon-orchid),0.1)]">
                    {tableData.map((item, index) => (
                      <tr key={index} className="hover:bg-[rgba(var(--neon-orchid),0.05)] transition-colors duration-200">
                        {renderTableRow ? renderTableRow(item, index) : (
                          <td className="px-2 py-2 text-[rgb(var(--foreground))]">
                            {JSON.stringify(item)}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}