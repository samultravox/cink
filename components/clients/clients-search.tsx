'use client';

import { Search } from 'lucide-react';

interface ClientsSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ClientsSearch({ searchQuery, onSearchChange }: ClientsSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(var(--muted-foreground))]" />
      <input
        type="text"
        placeholder="Search by name, email, or tags..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)] focus:bg-[rgba(var(--velvet-gray),0.7)] transition-all duration-200"
      />
    </div>
  );
}