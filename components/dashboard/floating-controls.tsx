'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Crown, Calendar, Brain, Users, Search, MessageSquare, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const timeViews = [
  { id: 'daily', label: 'DAILY' },
  { id: 'weekly', label: 'WEEKLY' },
  { id: 'monthly', label: 'MONTHLY' },
  { id: 'total', label: 'TOTAL' },
  { id: 'custom', label: 'CUSTOM' },
];

const models = [
  { id: 'isabella', name: 'Isabella' },
  { id: 'natalie', name: 'Natalie' },
  { id: 'sophia', name: 'Sophia' },
  { id: 'luna', name: 'Luna' },
  { id: 'aria', name: 'Aria' },
];

const operators = [
  { id: 'isabella', name: 'Isabella' },
  { id: 'sophia', name: 'Sophia' },
  { id: 'luna', name: 'Luna' },
  { id: 'sarah', name: 'Sarah' },
  { id: 'emma', name: 'Emma' },
  { id: 'maya', name: 'Maya' },
];

const channels = [
  { id: 'fanvue', name: 'Fanvue', platform: 'Fanvue' },
  { id: 'facebook', name: 'Facebook', platform: 'Facebook' },
  { id: 'whatsapp', name: 'WhatsApp', platform: 'WhatsApp' },
  { id: 'telegram', name: 'Telegram', platform: 'Telegram' },
  { id: 'instagram', name: 'Instagram', platform: 'Instagram' },
  { id: 'tiktok', name: 'TikTok', platform: 'TikTok' },
];

interface FloatingControlsProps {
  currentTimeframe?: string;
  onTimeframeChange?: (timeframe: string) => void;
  selectedModels?: string[];
  onModelsChange?: (models: string[]) => void;
  selectedOperators?: string[];
  onOperatorsChange?: (operators: string[]) => void;
  selectedChannels?: string[];
  onChannelsChange?: (channels: string[]) => void;
  // Legacy single-select props for backward compatibility
  selectedModel?: string;
  onModelChange?: (model: string) => void;
  selectedOperator?: string;
  onOperatorChange?: (operator: string) => void;
  onAskAnalytics?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  enableSearch?: boolean;
}

export function FloatingControls({ 
  currentTimeframe = 'daily', 
  onTimeframeChange = () => {},
  selectedModels = [],
  onModelsChange = () => {},
  selectedOperators = [],
  onOperatorsChange = () => {},
  selectedChannels = [],
  onChannelsChange = () => {},
  // Legacy props
  selectedModel = 'all',
  onModelChange = () => {},
  selectedOperator = 'all',
  onOperatorChange = () => {},
  onAskAnalytics = () => {},
  searchQuery = '',
  onSearchChange = () => {},
  enableSearch = false
}: FloatingControlsProps) {
  const [isModelsOpen, setIsModelsOpen] = useState(false);
  const [isOperatorsOpen, setIsOperatorsOpen] = useState(false);
  const [isChannelsOpen, setIsChannelsOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const datePickerRef = useRef<HTMLDivElement>(null);
  const customButtonRef = useRef<HTMLButtonElement>(null);
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [selectionMode, setSelectionMode] = useState<'start' | 'end'>('start');

  // Close date picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        datePickerRef.current && 
        !datePickerRef.current.contains(event.target as Node) &&
        customButtonRef.current && 
        !customButtonRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Multi-select handlers
  const toggleModel = (modelId: string) => {
    const newSelection = selectedModels.includes(modelId)
      ? selectedModels.filter(id => id !== modelId)
      : [...selectedModels, modelId];
    onModelsChange(newSelection);
    
    // Legacy support
    if (newSelection.length === 1) {
      onModelChange(newSelection[0]);
    } else if (newSelection.length === 0) {
      onModelChange('all');
    }
  };

  const toggleOperator = (operatorId: string) => {
    const newSelection = selectedOperators.includes(operatorId)
      ? selectedOperators.filter(id => id !== operatorId)
      : [...selectedOperators, operatorId];
    onOperatorsChange(newSelection);
    
    // Legacy support
    if (newSelection.length === 1) {
      onOperatorChange(newSelection[0]);
    } else if (newSelection.length === 0) {
      onOperatorChange('all');
    }
  };

  const toggleChannel = (channelId: string) => {
    const newSelection = selectedChannels.includes(channelId)
      ? selectedChannels.filter(id => id !== channelId)
      : [...selectedChannels, channelId];
    onChannelsChange(newSelection);
  };

  const clearAllModels = () => {
    onModelsChange([]);
    onModelChange('all');
  };

  const clearAllOperators = () => {
    onOperatorsChange([]);
    onOperatorChange('all');
  };

  const clearAllChannels = () => {
    onChannelsChange([]);
  };

  const getModelsDisplayText = () => {
    if (selectedModels.length === 0) return 'All Models';
    if (selectedModels.length === 1) {
      const model = models.find(m => m.id === selectedModels[0]);
      return model?.name || 'All Models';
    }
    return `${selectedModels.length} Models`;
  };

  const getOperatorsDisplayText = () => {
    if (selectedOperators.length === 0) return 'All Operators';
    if (selectedOperators.length === 1) {
      const operator = operators.find(o => o.id === selectedOperators[0]);
      return operator?.name || 'All Operators';
    }
    return `${selectedOperators.length} Operators`;
  };

  const getChannelsDisplayText = () => {
    if (selectedChannels.length === 0) return 'All Channels';
    if (selectedChannels.length === 1) {
      const channel = channels.find(c => c.id === selectedChannels[0]);
      return channel?.name || 'All Channels';
    }
    return `${selectedChannels.length} Channels`;
  };

  const getChannelIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'fanvue':
        return '👑';
      case 'facebook':
        return '📘';
      case 'whatsapp':
        return '💬';
      case 'telegram':
        return '✈️';
      case 'instagram':
        return '📷';
      case 'tiktok':
        return '🎵';
      default:
        return '📱';
    }
  };

  const handleTimeframeClick = (timeframeId: string) => {
    if (timeframeId === 'custom') {
      setIsDatePickerOpen(!isDatePickerOpen);
    } else {
      onTimeframeChange(timeframeId);
      setIsDatePickerOpen(false);
    }
  };

  // Calendar functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };

  const handleDateClick = (date: Date) => {
    if (selectionMode === 'start') {
      setSelectedStartDate(date);
      setSelectionMode('end');
      setSelectedEndDate(null);
    } else {
      // Ensure end date is after start date
      if (selectedStartDate && date < selectedStartDate) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      } else {
        setSelectedEndDate(date);
      }
      setSelectionMode('start');
    }
  };

  const handleDateRangeApply = () => {
    if (selectedStartDate && selectedEndDate) {
      setStartDate(selectedStartDate.toISOString().split('T')[0]);
      setEndDate(selectedEndDate.toISOString().split('T')[0]);
      onTimeframeChange('custom');
      setIsDatePickerOpen(false);
    }
  };

  const handleClearDates = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectionMode('start');
  };

  // Format dates for display
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Get custom date range label
  const getCustomDateLabel = () => {
    if (selectedStartDate && selectedEndDate) {
      return `${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`;
    }
    return 'CUSTOM';
  };

  // Generate calendar days
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = new Date().toDateString() === date.toDateString();
      const isStartDate = selectedStartDate && selectedStartDate.toDateString() === date.toDateString();
      const isEndDate = selectedEndDate && selectedEndDate.toDateString() === date.toDateString();
      const isInRange = selectedStartDate && selectedEndDate && 
                        date > selectedStartDate && date < selectedEndDate;
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-200',
            isToday && !isStartDate && !isEndDate && !isInRange && 'border border-[rgba(var(--neon-orchid),0.5)]',
            isStartDate && 'bg-[rgb(var(--neon-orchid))] text-white',
            isEndDate && 'bg-[rgb(var(--sunset-gold))] text-white',
            isInRange && 'bg-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))]',
            !isToday && !isStartDate && !isEndDate && !isInRange && 'hover:bg-[rgba(var(--velvet-gray),0.5)]'
          )}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md bg-[rgba(var(--charcoal),0.85)] border border-[rgba(var(--neon-orchid),0.3)] shadow-2xl">
        {/* Search Bar - Only show if enabled */}
        {enableSearch && (
          <>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[rgb(var(--muted-foreground))]" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-40 pl-6 pr-3 py-1 rounded-lg bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] text-xs focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)] focus:bg-[rgba(var(--velvet-gray),0.7)] transition-all duration-200"
              />
            </div>
            
            {/* Separator */}
            <div className="w-px h-4 bg-[rgba(var(--neon-orchid),0.3)]"></div>
          </>
        )}

        {/* Time Filter Toggle - Compact */}
        <div className="flex items-center space-x-1 relative">
          <Calendar className="w-3 h-3 text-[rgb(var(--muted-foreground))]" />
          {timeViews.map((view) => (
            <button
              key={view.id}
              ref={view.id === 'custom' ? customButtonRef : null}
              onClick={() => handleTimeframeClick(view.id)}
              className={cn(
                'px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap',
                currentTimeframe === view.id
                  ? 'bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white shadow-lg'
                  : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)]'
              )}
            >
              {view.id === 'custom' && currentTimeframe === 'custom' && selectedStartDate && selectedEndDate 
                ? getCustomDateLabel() 
                : view.label}
            </button>
          ))}

          {/* Custom Date Picker */}
          {isDatePickerOpen && (
            <div 
              ref={datePickerRef}
              className="absolute bottom-full left-0 mb-2 p-4 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl z-10 w-72 animate-in fade-in-50 slide-in-from-top-5 duration-200"
            >
              <div className="space-y-4">
                {/* Calendar Header */}
                <div className="flex items-center justify-between">
                  <button 
                    onClick={handlePrevMonth}
                    className="p-1 rounded-full hover:bg-[rgba(var(--velvet-gray),0.5)]"
                  >
                    <ChevronLeft className="w-4 h-4 text-[rgb(var(--foreground))]" />
                  </button>
                  <div className="text-sm font-medium text-[rgb(var(--foreground))]">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                  <button 
                    onClick={handleNextMonth}
                    className="p-1 rounded-full hover:bg-[rgba(var(--velvet-gray),0.5)]"
                  >
                    <ChevronRight className="w-4 h-4 text-[rgb(var(--foreground))]" />
                  </button>
                </div>
                
                {/* Calendar Days */}
                <div>
                  {/* Day names */}
                  <div className="grid grid-cols-7 mb-1">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="w-8 h-8 flex items-center justify-center text-xs text-[rgb(var(--muted-foreground))]">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar()}
                  </div>
                </div>
                
                {/* Selected Range Display */}
                <div className="flex items-center justify-between text-xs text-[rgb(var(--foreground))]">
                  <div>
                    <span className="text-[rgb(var(--muted-foreground))]">Start: </span>
                    <span className="font-medium">{formatDate(selectedStartDate) || 'Not set'}</span>
                  </div>
                  <div>
                    <span className="text-[rgb(var(--muted-foreground))]">End: </span>
                    <span className="font-medium">{formatDate(selectedEndDate) || 'Not set'}</span>
                  </div>
                </div>
                
                {/* Selection Mode Indicator */}
                <div className="text-xs text-center text-[rgb(var(--muted-foreground))]">
                  {selectionMode === 'start' ? 'Select start date' : 'Select end date'}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleClearDates}
                    className="px-3 py-1 text-xs text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
                  >
                    Clear
                  </button>
                  <div className="space-x-2">
                    <button
                      onClick={() => setIsDatePickerOpen(false)}
                      className="px-3 py-1 text-xs text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDateRangeApply}
                      className="px-3 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white"
                      disabled={!selectedStartDate || !selectedEndDate}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="w-px h-4 bg-[rgba(var(--neon-orchid),0.3)]"></div>

        {/* Models Multi-Select Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsModelsOpen(!isModelsOpen)}
            className="flex items-center space-x-1 px-2 py-1 rounded-md text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200 border border-[rgba(var(--neon-orchid),0.2)]"
          >
            <Crown className="w-3 h-3 text-[rgb(var(--sunset-gold))]" />
            <span className="text-xs font-medium whitespace-nowrap">{getModelsDisplayText()}</span>
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              isModelsOpen && "rotate-180"
            )} />
          </button>

          {isModelsOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-48 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl">
              <div className="p-2">
                {/* Clear All Button */}
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[rgba(var(--neon-orchid),0.1)]">
                  <span className="text-xs text-[rgb(var(--muted-foreground))]">Models</span>
                  <button
                    onClick={clearAllModels}
                    className="text-xs text-[rgb(var(--crimson))] hover:text-[rgb(var(--foreground))] transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => toggleModel(model.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200',
                      selectedModels.includes(model.id)
                        ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)]'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                    )}
                  >
                    <span>{model.name}</span>
                    {selectedModels.includes(model.id) && (
                      <Check className="w-3 h-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Operators Multi-Select Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOperatorsOpen(!isOperatorsOpen)}
            className="flex items-center space-x-1 px-2 py-1 rounded-md text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200 border border-[rgba(var(--neon-orchid),0.2)]"
          >
            <Users className="w-3 h-3 text-[rgb(var(--neon-orchid))]" />
            <span className="text-xs font-medium whitespace-nowrap">{getOperatorsDisplayText()}</span>
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              isOperatorsOpen && "rotate-180"
            )} />
          </button>

          {isOperatorsOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-48 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl">
              <div className="p-2">
                {/* Clear All Button */}
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[rgba(var(--neon-orchid),0.1)]">
                  <span className="text-xs text-[rgb(var(--muted-foreground))]">Operators</span>
                  <button
                    onClick={clearAllOperators}
                    className="text-xs text-[rgb(var(--crimson))] hover:text-[rgb(var(--foreground))] transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                
                {operators.map((operator) => (
                  <button
                    key={operator.id}
                    onClick={() => toggleOperator(operator.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200',
                      selectedOperators.includes(operator.id)
                        ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)]'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                    )}
                  >
                    <span>{operator.name}</span>
                    {selectedOperators.includes(operator.id) && (
                      <Check className="w-3 h-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Channels Multi-Select Dropdown - NEW */}
        <div className="relative">
          <button
            onClick={() => setIsChannelsOpen(!isChannelsOpen)}
            className="flex items-center space-x-1 px-2 py-1 rounded-md text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200 border border-[rgba(var(--neon-orchid),0.2)]"
          >
            <MessageSquare className="w-3 h-3 text-[rgb(var(--sunset-gold))]" />
            <span className="text-xs font-medium whitespace-nowrap">{getChannelsDisplayText()}</span>
            <ChevronDown className={cn(
              "w-3 h-3 transition-transform duration-200",
              isChannelsOpen && "rotate-180"
            )} />
          </button>

          {isChannelsOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-48 rounded-lg bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.2)] backdrop-blur-sm shadow-xl">
              <div className="p-2">
                {/* Clear All Button */}
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[rgba(var(--neon-orchid),0.1)]">
                  <span className="text-xs text-[rgb(var(--muted-foreground))]">Channels</span>
                  <button
                    onClick={clearAllChannels}
                    className="text-xs text-[rgb(var(--crimson))] hover:text-[rgb(var(--foreground))] transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => toggleChannel(channel.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200',
                      selectedChannels.includes(channel.id)
                        ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)]'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.3)]'
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">{getChannelIcon(channel.platform)}</span>
                      <span>{channel.name}</span>
                    </div>
                    {selectedChannels.includes(channel.id) && (
                      <Check className="w-3 h-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ask Analytics Button - Compact */}
        <button
          onClick={onAskAnalytics}
          className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] border border-[rgba(var(--neon-orchid),0.3)] text-[rgb(var(--foreground))] hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <Brain className="w-3 h-3" />
          <span className="text-xs font-medium whitespace-nowrap">Ask Analytics</span>
        </button>
      </div>
    </div>
  );
}