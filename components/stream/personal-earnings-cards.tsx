'use client';

import { RevenueSparkline } from '@/components/dashboard/revenue-sparkline';
import { 
  Calendar,
  TrendingUp,
  Wallet,
  CreditCard,
  DollarSign,
  Banknote
} from 'lucide-react';

interface PersonalEarningsCardsProps {
  earnings: {
    today: number;
    last7Days: number;
    last14Days: number;
    last30Days: number;
    availableForPayout: number;
    totalPaidOut: number;
  };
}

export function PersonalEarningsCards({ earnings }: PersonalEarningsCardsProps) {
  // Calculate averages
  const avgLast7Days = Math.round(earnings.last7Days / 7);
  const avgLast14Days = Math.round(earnings.last14Days / 14);
  const avgLast30Days = Math.round(earnings.last30Days / 30);

  const cards = [
    {
      title: 'DNES',
      value: earnings.today,
      icon: Calendar,
      variant: 'gold' as const,
      bgColor: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'POSLEDNÍCH 7 DNÍ',
      value: earnings.last7Days,
      average: avgLast7Days,
      icon: TrendingUp,
      variant: 'primary' as const,
      bgColor: 'from-purple-500 to-pink-500'
    },
    {
      title: 'POSLEDNÍCH 14 DNÍ',
      value: earnings.last14Days,
      average: avgLast14Days,
      icon: Wallet,
      variant: 'blue' as const,
      bgColor: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'POSLEDNÍCH 30 DNÍ',
      value: earnings.last30Days,
      average: avgLast30Days,
      icon: CreditCard,
      variant: 'green' as const,
      bgColor: 'from-green-500 to-emerald-500'
    },
    {
      title: 'K DISPOZICI K VÝPLATĚ',
      value: earnings.availableForPayout,
      icon: DollarSign,
      variant: 'crimson' as const,
      bgColor: 'from-pink-500 to-red-500'
    },
    {
      title: 'CELKEM VYPLACENO',
      value: earnings.totalPaidOut,
      icon: Banknote,
      variant: 'gold' as const,
      bgColor: 'from-orange-500 to-yellow-500'
    }
  ];

  const getValueColor = (variant: string) => {
    switch (variant) {
      case 'gold':
        return 'text-gradient-gold';
      case 'crimson':
        return 'text-[rgb(var(--crimson))]';
      case 'blue':
        return 'text-blue-400';
      case 'green':
        return 'text-green-400';
      default:
        return 'text-gradient-primary';
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <div key={index} className="glow-card p-4 relative overflow-hidden min-h-[120px]">
            {/* Icon */}
            <div className="flex justify-center mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.bgColor} flex items-center justify-center shadow-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Value */}
            <div className="text-center">
              <div className={`text-2xl font-black mb-1 ${getValueColor(card.variant)}`}>
                {card.value.toLocaleString()} <span className="text-xs opacity-80">CZK</span>
              </div>
              <div className="text-xs text-[rgb(var(--muted-foreground))] font-medium uppercase tracking-wide">
                {card.title}
              </div>
              
              {/* Average - Only for cards with average */}
              {card.average && (
                <div className="text-xs text-[rgb(var(--sunset-gold))] font-medium mt-1">
                  Průměr: {card.average.toLocaleString()} CZK/den
                </div>
              )}
            </div>
            
            {/* Sparkline */}
            <RevenueSparkline variant={card.variant} />
          </div>
        );
      })}
    </div>
  );
}