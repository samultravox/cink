'use client';

import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  AlertTriangle, 
  Crown, 
  Calendar,
  Users
} from 'lucide-react';

const filters = [
  { id: 'all', label: 'All Clients', icon: Users },
  { id: 'top-spenders', label: 'Top Spenders', icon: Crown },
  { id: 'momentum', label: 'Biggest Momentum', icon: TrendingUp },
  { id: 'risk', label: 'Risk Clients', icon: AlertTriangle },
  { id: 'vyplaty-dnes', label: 'Vyplaty Dnes', icon: Calendar },
];

interface ClientsFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ClientsFilters({ activeFilter, onFilterChange }: ClientsFiltersProps) {
  return (
    <div className="flex items-center space-x-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white shadow-lg'
                : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)]'
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}