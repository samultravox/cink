'use client';

import { useState } from 'react';
import { ChevronDown, Search, Calendar, Users, Tag, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

const timeframes = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
  { id: 'total', label: 'Total' },
  { id: 'custom', label: 'Custom Range' },
];

const operators = [
  { id: 'all', name: 'All Operators' },
  { id: 'Isabella', name: 'Isabella' },
  { id: 'Sophia', name: 'Sophia' },
  { id: 'Luna', name: 'Luna' },
  { id: 'Sarah', name: 'Sarah' },
  { id: 'Admin', name: 'Admin' },
];

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'Premium Video', name: 'Premium Video' },
  { id: 'Chat Session', name: 'Chat Session' },
  { id: 'Live Call', name: 'Live Call' },
  { id: 'Software', name: 'Software' },
  { id: 'Rent', name: 'Rent' },
  { id: 'Advertising', name: 'Advertising' },
];

const models = [
  { id: 'all', name: 'All Models' },
  { id: 'Isabella', name: 'Isabella' },
  { id: 'Natalie', name: 'Natalie' },
  { id: 'Sophia', name: 'Sophia' },
  { id: 'Luna', name: 'Luna' },
];

interface CashflowFloatingControlsProps {
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedOperator: string;
  onOperatorChange: (operator: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function CashflowFloatingControls({
  timeframe,
  onTimeframeChange,
  searchQuery,
  onSearchChange,
  selectedOperator,
  onOperatorChange,
  selectedCategory,
  onCategoryChange,
  selectedModel,
  onModelChange
}: CashflowFloatingControlsProps) {
  const [isOperatorOpen, setIsOperatorOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const activeOperatorName = operators.find(o => o.id === selectedOperator)?.name || 'All Operators';
  const activeCategoryName = categories.find(c => c.id === selectedCategory)?.name || 'All Categories';
  const activeModelName = models.find(m => m.id === selectedModel)?.name || 'All Models';

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-3 px-6 py-3 rounded-full backdrop-blur-md bg-[rgba(var(--charcoal),0.85)] border border-[rgba(var(--neon-orchid),0.3)] shadow-2xl">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[rgb(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-48 pl-8 pr-3 py-1.5 rounded-lg bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] text-sm focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)] focus:bg-[rgba(var(--velvet-gray),0.7)] transition-all duration-200"
          />
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-[rgba(var(--neon-orchid),0.3)]"></div>

        {/* Timeframe Toggle - Updated with Total */}
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
          {timeframes.map((tf) => (
            <button
              key={tf.id}
              onClick={() => onTimeframeChange(tf.id)}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap',
                timeframe === tf.id
                  ? 'bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white shadow-lg'
                  : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)]'
              )}
            >
              {tf.label}
            </button>
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-[rgba(var(--neon-orchid),0.3)]"></div>

        {/* Operator Filter */}
        <div className="relative">
          <button
            onClick={() => setIsOperatorOpen(!isOperatorOpen)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200 whitespace-nowrap min-w-[120px] border border-[rgba(var(--neon-orchid),0.2)]"
          >
            <Users className="w-3 h-3 text-[rgb(var(--sunset-gold))]" />
            <span className="text-xs font-medium">{activeOperatorName}</span>
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              isOperatorOpen && "rotate-180"
            )} />
          </button>

          {isOperatorOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-40 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl">
              <div className="p-2">
                {operators.map((operator) => (
                  <button
                    key={operator.id}
                    onClick={() => {
                      onOperatorChange(operator.id);
                      setIsOperatorOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200',
                      selectedOperator === operator.id
                        ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)]'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                    )}
                  >
                    {operator.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200 whitespace-nowrap min-w-[120px] border border-[rgba(var(--neon-orchid),0.2)]"
          >
            <Tag className="w-3 h-3 text-[rgb(var(--sunset-gold))]" />
            <span className="text-xs font-medium">{activeCategoryName}</span>
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              isCategoryOpen && "rotate-180"
            )} />
          </button>

          {isCategoryOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-48 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl">
              <div className="p-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onCategoryChange(category.id);
                      setIsCategoryOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200',
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)]'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Model Filter */}
        <div className="relative">
          <button
            onClick={() => setIsModelOpen(!isModelOpen)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200 whitespace-nowrap min-w-[120px] border border-[rgba(var(--neon-orchid),0.2)]"
          >
            <Crown className="w-3 h-3 text-[rgb(var(--sunset-gold))]" />
            <span className="text-xs font-medium">{activeModelName}</span>
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              isModelOpen && "rotate-180"
            )} />
          </button>

          {isModelOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-40 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl">
              <div className="p-2">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      onModelChange(model.id);
                      setIsModelOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200',
                      selectedModel === model.id
                        ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)]'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                    )}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}