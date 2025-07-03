'use client';

import { useState } from 'react';
import { TransactionTable } from './transaction-table';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowLeftRight,
  Plus,
  Banknote,
  Users,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionTabsProps {
  incomeData: any[];
  expenseData: any[];
  transferData: any[];
  payoutData: any[];
  wagesData: any[]; // NEW: Wages data
  searchQuery: string;
  selectedOperator: string;
  selectedCategory: string;
  selectedModel: string;
  onAddTransaction: (type: 'income' | 'expense' | 'transfer' | 'payout') => void;
}

export function TransactionTabs({ 
  incomeData, 
  expenseData, 
  transferData,
  payoutData,
  wagesData, // NEW: Wages data
  searchQuery,
  selectedOperator,
  selectedCategory,
  selectedModel,
  onAddTransaction
}: TransactionTabsProps) {
  const [activeTab, setActiveTab] = useState<'income' | 'expense' | 'transfer' | 'payout' | 'wages'>('income');
  const [previousTab, setPreviousTab] = useState<'income' | 'expense' | 'transfer' | 'payout' | 'wages'>('income');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabs = [
    {
      id: 'income' as const,
      label: 'Income',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'from-green-500 to-emerald-500',
      count: incomeData.length
    },
    {
      id: 'expense' as const,
      label: 'Expenses',
      icon: TrendingDown,
      color: 'text-red-400',
      bgColor: 'from-red-500 to-pink-500',
      count: expenseData.length
    },
    {
      id: 'transfer' as const,
      label: 'Transfers',
      icon: ArrowLeftRight,
      color: 'text-blue-400',
      bgColor: 'from-blue-500 to-purple-500',
      count: transferData.length
    },
    {
      id: 'payout' as const,
      label: 'Payouts',
      icon: Banknote,
      color: 'text-orange-400',
      bgColor: 'from-orange-500 to-red-500',
      count: payoutData.length
    },
    {
      id: 'wages' as const, // NEW: Wages tab
      label: 'Výplaty',
      icon: Users,
      color: 'text-yellow-400',
      bgColor: 'from-yellow-400 to-orange-500',
      count: wagesData.length
    }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'income':
        return incomeData;
      case 'expense':
        return expenseData;
      case 'transfer':
        return transferData;
      case 'payout':
        return payoutData;
      case 'wages':
        return wagesData;
      default:
        return [];
    }
  };

  const getTableType = () => {
    return activeTab;
  };

  const getAddButtonLabel = () => {
    switch (activeTab) {
      case 'income':
        return 'Add Income';
      case 'expense':
        return 'Add Expense';
      case 'transfer':
        return 'Add Transfer';
      case 'payout':
        return 'Add Payout';
      case 'wages':
        return 'Add Wage Payment';
      default:
        return 'Add Transaction';
    }
  };

  // NEW: Handle sending payout for wages
  const handleSendPayout = () => {
    // This would open a modal or navigate to send payout functionality
    console.log('Opening send payout modal...');
    // For now, we'll just log - in a real app this would trigger a modal or action
  };

  // Smooth tab transition handler
  const handleTabChange = (tabId: 'income' | 'expense' | 'transfer' | 'payout' | 'wages') => {
    if (activeTab === tabId) return;
    
    setPreviousTab(activeTab);
    setIsTransitioning(true);
    
    // Delay the actual tab change for smooth transition
    setTimeout(() => {
      setActiveTab(tabId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <ArrowLeftRight className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
              TRANSACTION MANAGEMENT
            </h2>
            <p className="text-[rgb(var(--muted-foreground))] text-sm">
              Financial flow tracking • Revenue & expense analysis
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)]'
                  : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--velvet-gray),0.3)]'
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center',
                isActive ? tab.bgColor : 'from-gray-500 to-gray-600'
              )}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">{tab.label}</div>
                <div className="text-xs opacity-70">{tab.count} records</div>
              </div>
            </button>
          );
        })}

        {/* Action Buttons - Different for Wages vs Other Tabs */}
        {activeTab === 'wages' ? (
          // Show "Poslat Výplatu" button for wages tab
          <button
            onClick={handleSendPayout}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[rgb(var(--sunset-gold))] to-[rgb(var(--neon-orchid))] text-white font-medium hover:scale-105 transition-all duration-200 ml-4 animate-in fade-in-50 duration-300"
          >
            <Send className="w-4 h-4" />
            <span className="text-sm">Poslat Výplatu</span>
          </button>
        ) : (
          // Show regular "Add Transaction" button for other tabs
          <button
            onClick={() => onAddTransaction(activeTab)}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white font-medium hover:scale-105 transition-all duration-200 ml-4 animate-in fade-in-50 duration-300"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">{getAddButtonLabel()}</span>
          </button>
        )}
      </div>

      {/* Table Content with Smooth Transitions */}
      <div className="glow-card p-0 overflow-hidden">
        <div className={cn(
          "transition-opacity duration-200 ease-in-out",
          isTransitioning ? "opacity-0" : "opacity-100"
        )}>
          <TransactionTable
            data={getCurrentData()}
            type={getTableType()}
            searchQuery={searchQuery}
            selectedOperator={selectedOperator}
            selectedCategory={selectedCategory}
            selectedModel={selectedModel}
          />
        </div>
      </div>
    </div>
  );
}