'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OperatorSelectorProps {
  currentOperator: { name: string; avatar: string };
  onOperatorChange: (operator: { name: string; avatar: string }) => void;
}

const availableOperators = [
  { name: 'Sarah Chen', avatar: 'SC' },
  { name: 'Emma Rodriguez', avatar: 'ER' },
  { name: 'Luna Park', avatar: 'LP' },
  { name: 'Alex Kim', avatar: 'AK' },
  { name: 'Maya Singh', avatar: 'MS' },
  { name: 'Zoe Williams', avatar: 'ZW' },
];

export function OperatorSelector({ currentOperator, onOperatorChange }: OperatorSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-[rgba(var(--velvet-gray),0.3)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
          {currentOperator.avatar}
        </div>
        <span className="text-sm font-medium">{currentOperator.name}</span>
        <ChevronDown className={cn(
          "w-3 h-3 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl z-10">
          <div className="p-2">
            {availableOperators.map((operator) => (
              <button
                key={operator.name}
                onClick={() => {
                  onOperatorChange(operator);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-all duration-200',
                  currentOperator.name === operator.name
                    ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)]'
                    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                )}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                  {operator.avatar}
                </div>
                <span>{operator.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}