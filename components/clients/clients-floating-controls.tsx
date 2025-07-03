'use client';

import { useState } from 'react';
import { ChevronDown, Crown, Calendar, ArrowUpDown, Filter, Search, Star, Tag, Plus, X, MessageSquare, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const smartFilters = [
  { id: 'top-spenders', label: 'Top Spenders' },
  { id: 'momentum', label: 'Biggest Momentum' },
  { id: 'paid-today', label: 'Paid Today' },
];

const sortOptions = [
  { id: 'totalCollected', label: 'Total Collected' },
  { id: 'past7Days', label: 'Past 7 Days' },
  { id: 'lastPayment', label: 'Last Payment' },
  { id: 'avgPayment', label: 'Avg Payment' },
];

const models = [
  { id: 'all', name: 'All Models' },
  { id: 'isabella', name: 'Isabella' },
  { id: 'natalie', name: 'Natalie' },
  { id: 'sophia', name: 'Sophia' },
  { id: 'luna', name: 'Luna' },
  { id: 'sarah', name: 'Sarah' },
  { id: 'emma', name: 'Emma' },
];

const operators = [
  { id: 'all', name: 'All Operators' },
  { id: 'isabella', name: 'Isabella' },
  { id: 'sophia', name: 'Sophia' },
  { id: 'luna', name: 'Luna' },
  { id: 'sarah', name: 'Sarah' },
  { id: 'emma', name: 'Emma' },
  { id: 'natalie', name: 'Natalie' },
];

const channels = [
  { id: 'all', name: 'All Channels' },
  { id: 'fb', name: 'Facebook' },
  { id: 'fanvue', name: 'Fanvue' },
  { id: 'whatsapp', name: 'WhatsApp' },
  { id: 'telegram', name: 'Telegram' },
  { id: 'instagram', name: 'Instagram' },
];

const vipOptions = [
  { id: 'all', label: 'All' },
  { id: 'vip-only', label: 'VIP Only' },
  { id: 'non-vip', label: 'Non-VIP' },
];

interface ClientsFloatingControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilters: string[];
  onFiltersChange: (filters: string[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  vipFilter: string;
  onVipFilterChange: (filter: string) => void;
  allTags: string[];
}

export function ClientsFloatingControls({ 
  searchQuery,
  onSearchChange,
  activeFilters, 
  onFiltersChange, 
  sortBy,
  onSortChange,
  selectedModel,
  onModelChange,
  selectedTags,
  onTagsChange,
  vipFilter,
  onVipFilterChange,
  allTags
}: ClientsFloatingControlsProps) {
  const [isSmartFilterOpen, setIsSmartFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isOperatorOpen, setIsOperatorOpen] = useState(false);
  const [isChannelOpen, setIsChannelOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isVipOpen, setIsVipOpen] = useState(false);
  const [isPaydayOpen, setIsPaydayOpen] = useState(false);
  const [selectedPayday, setSelectedPayday] = useState<number | null>(null);

  const activeSortName = sortOptions.find(s => s.id === sortBy)?.label || 'Total Collected';
  const activeModelName = models.find(m => m.id === selectedModel)?.name || 'All Models';
  const activeOperatorName = operators.find(o => o.id === selectedModel)?.name || 'All Operators';
  const activeChannelName = channels.find(c => c.id === selectedModel)?.name || 'All Channels';
  const activeVipName = vipOptions.find(v => v.id === vipFilter)?.label || 'All';

  // Get today's date for highlighting
  const today = new Date();
  const todayDay = today.getDate();

  const toggleSmartFilter = (filterId: string) => {
    if (activeFilters.includes(filterId)) {
      onFiltersChange(activeFilters.filter(f => f !== filterId));
    } else {
      onFiltersChange([...activeFilters, filterId]);
    }
    setIsSmartFilterOpen(false);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const selectPayday = (day: number) => {
    setSelectedPayday(day);
    // Here you would implement the actual filtering logic
    // For now, we'll just close the dropdown
    setIsPaydayOpen(false);
  };

  const clearPayday = () => {
    setSelectedPayday(null);
    setIsPaydayOpen(false);
  };

  // Generate days 1-31 for the payday selector
  const paydayDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md bg-[rgba(var(--charcoal),0.85)] border border-[rgba(var(--neon-orchid),0.3)] shadow-2xl">
        {/* Search Bar - Moved from Top */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[rgb(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-36 pl-6 pr-2 py-1 rounded-lg bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] text-xs focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)] focus:bg-[rgba(var(--velvet-gray),0.7)] transition-all duration-200"
          />
        </div>

        {/* Smart Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSmartFilterOpen(!isSmartFilterOpen)}
            className={cn(
              'flex items-center space-x-1 px-2 py-1 rounded-md text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200 whitespace-nowrap border border-[rgba(var(--neon-orchid),0.2)]',
              activeFilters.length > 0 && 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border-[rgba(var(--neon-orchid),0.3)]'
            )}
          >
            <Filter className="w-3 h-3" />
            <span className="text-xs font-medium">
              {activeFilters.length > 0 ? `Smart Filters (${activeFilters.length})` : 'Smart Filters'}
            </span>
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              isSmartFilterOpen && "rotate-180"
            )} />
          </button>

          {isSmartFilterOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-40 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl">
              <div className="p-2">
                {smartFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleSmartFilter(filter.id)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200',
                      activeFilters.includes(filter.id)
                        ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)]'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Model Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsModelOpen(!isModelOpen)}
            className="flex items-center space-x-1 px-2 py-1 rounded-md text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200 border border-[rgba(var(--neon-orchid),0.2)]"
          >
            <Crown className="w-3 h-3 text-[rgb(var(--sunset-gold))]" />
            <span className="text-xs font-medium whitespace-nowrap">{activeModelName}</span>
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

        {/* Operator Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOperatorOpen(!isOperatorOpen)}
            className="flex items-center space-x-1 px-2 py-1 rounded-md text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200 whitespace-nowrap border border-[rgba(var(--neon-orchid),0.2)]"
          >
            <Users className="w-3 h-3 text-[rgb(var(--neon-orchid))]" />
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
                      onModelChange(operator.id);
                      setIsOperatorOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200',
                      selectedModel === operator.id
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

        {/* Channel Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsChannelOpen(!isChannelOpen)}
            className="flex items-center space-x-1 px-2 py-1 rounded-md text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200 whitespace-nowrap border border-[rgba(var(--neon-orchid),0.2)]"
          >
            <MessageSquare className="w-3 h-3 text-[rgb(var(--sunset-gold))]" />
            <span className="text-xs font-medium">{activeChannelName}</span>
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              isChannelOpen && "rotate-180"
            )} />
          </button>

          {isChannelOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-40 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl">
              <div className="p-2">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => {
                      onModelChange(channel.id);
                      setIsChannelOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200',
                      selectedModel === channel.id
                        ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)]'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                    )}
                  >
                    {channel.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Payday Day Filter */}
        <div className="relative">
          <button
            onClick={() => setIsPaydayOpen(!isPaydayOpen)}
            className={cn(
              'flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-200 whitespace-nowrap border',
              selectedPayday !== null
                ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border-[rgba(var(--neon-orchid),0.3)]'
                : 'text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] border-[rgba(var(--neon-orchid),0.2)]'
            )}
          >
            <Calendar className="w-3 h-3" />
            <span className="text-xs font-medium">
              {selectedPayday !== null ? `Day ${selectedPayday}` : 'Payday'}
            </span>
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              isPaydayOpen && "rotate-180"
            )} />
          </button>

          {isPaydayOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl">
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-[rgb(var(--muted-foreground))]">Select Payday:</div>
                  {selectedPayday !== null && (
                    <button
                      onClick={clearPayday}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                {/* Number Pad Style Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {paydayDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => selectPayday(day)}
                      className={cn(
                        'w-7 h-7 rounded text-xs font-medium transition-all duration-200 flex items-center justify-center',
                        selectedPayday === day
                          ? 'bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white shadow-lg'
                          : day === todayDay
                          ? 'bg-[rgba(var(--sunset-gold),0.3)] text-[rgb(var(--sunset-gold))] border border-[rgba(var(--sunset-gold),0.5)]'
                          : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                      )}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tag Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsTagOpen(!isTagOpen)}
            className={cn(
              'flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-200 whitespace-nowrap border',
              selectedTags.length > 0
                ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border-[rgba(var(--neon-orchid),0.3)]'
                : 'text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] border-[rgba(var(--neon-orchid),0.2)]'
            )}
          >
            <Tag className="w-3 h-3" />
            <span className="text-xs font-medium">
              {selectedTags.length > 0 ? `Tags (${selectedTags.length})` : 'Tags'}
            </span>
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              isTagOpen && "rotate-180"
            )} />
          </button>

          {isTagOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl">
              <div className="p-3">
                <div className="text-xs text-[rgb(var(--muted-foreground))] mb-2">Select Tags:</div>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        'w-full text-left px-2 py-1 rounded-md text-xs transition-all duration-200 flex items-center justify-between',
                        selectedTags.includes(tag)
                          ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)]'
                          : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                      )}
                    >
                      <span>{tag}</span>
                      {selectedTags.includes(tag) && <X className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* VIP Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsVipOpen(!isVipOpen)}
            className={cn(
              'flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-200 whitespace-nowrap border',
              vipFilter !== 'all'
                ? 'bg-gradient-to-r from-[rgba(var(--sunset-gold),0.2)] to-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--sunset-gold))] border-[rgba(var(--sunset-gold),0.3)]'
                : 'text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] border-[rgba(var(--neon-orchid),0.2)]'
            )}
          >
            <Star className="w-3 h-3" />
            <span className="text-xs font-medium">{activeVipName}</span>
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              isVipOpen && "rotate-180"
            )} />
          </button>

          {isVipOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-32 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl">
              <div className="p-2">
                {vipOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      onVipFilterChange(option.id);
                      setIsVipOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200',
                      vipFilter === option.id
                        ? 'bg-gradient-to-r from-[rgba(var(--sunset-gold),0.2)] to-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--sunset-gold))] border border-[rgba(var(--sunset-gold),0.3)]'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center space-x-1 px-2 py-1 rounded-md text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200 whitespace-nowrap border border-[rgba(var(--neon-orchid),0.2)]"
          >
            <ArrowUpDown className="w-3 h-3 text-[rgb(var(--sunset-gold))]" />
            <span className="text-xs font-medium">Sort: {activeSortName}</span>
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              isSortOpen && "rotate-180"
            )} />
          </button>

          {isSortOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-48 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl">
              <div className="p-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      onSortChange(option.id);
                      setIsSortOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200',
                      sortBy === option.id
                        ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)]'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                    )}
                  >
                    {option.label}
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