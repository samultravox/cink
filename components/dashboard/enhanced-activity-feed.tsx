'use client';

import { useState, useMemo } from 'react';
import { 
  ChevronUp, 
  ChevronDown,
  Eye,
  Upload,
  Edit3,
  Trash2,
  Check,
  X,
  Filter,
  File
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock enhanced activity data - converted to CZK with more entries
const activityData = [
  {
    id: 1,
    dateTime: '2024-01-15 14:23',
    amount: 11250,
    operator: 'Isabella',
    model: 'Isabella',
    client: 'Michael_VIP',
    channel: 'Fanvue',
    category: 'Premium Video',
    toAccount: 'Wise USD',
    notes: 'Custom content request',
    screenshot: 'screenshot1.jpg',
    approved: true,
    delivered: true
  },
  {
    id: 2,
    dateTime: '2024-01-15 13:45',
    amount: 5000,
    operator: 'Sophia',
    model: 'Natalie',
    client: 'David_Elite',
    channel: 'Facebook',
    category: 'Chat Session',
    toAccount: 'Crypto Wallet',
    notes: 'Extended conversation',
    screenshot: null,
    approved: true,
    delivered: false
  },
  {
    id: 3,
    dateTime: '2024-01-15 12:30',
    amount: 18750,
    operator: 'Luna',
    model: 'Sophia',
    client: 'James_VIP',
    channel: 'WhatsApp',
    category: 'Live Call',
    toAccount: 'Wise USD',
    notes: 'Private session',
    screenshot: 'screenshot2.jpg',
    approved: false,
    delivered: false
  },
  {
    id: 4,
    dateTime: '2024-01-15 11:15',
    amount: 7500,
    operator: 'Sarah',
    model: 'Luna',
    client: 'Peter_Premium',
    channel: 'Fanvue',
    category: 'Tips',
    toAccount: 'Revolut',
    notes: 'Appreciation tip',
    screenshot: null,
    approved: true,
    delivered: true
  },
  {
    id: 5,
    dateTime: '2024-01-15 10:45',
    amount: 25000,
    operator: 'Isabella',
    model: 'Isabella',
    client: 'Robert_Gold',
    channel: 'Fanvue',
    category: 'Custom Content',
    toAccount: 'Paysafe',
    notes: 'Special request content',
    screenshot: 'screenshot3.jpg',
    approved: true,
    delivered: true
  },
  {
    id: 6,
    dateTime: '2024-01-15 09:30',
    amount: 3750,
    operator: 'Emma',
    model: 'Aria',
    client: 'Alex_Pro',
    channel: 'WhatsApp',
    category: 'Chat Session',
    toAccount: 'Wise USD',
    notes: 'Morning chat',
    screenshot: null,
    approved: false,
    delivered: false
  },
  {
    id: 7,
    dateTime: '2024-01-15 08:20',
    amount: 12500,
    operator: 'Sophia',
    model: 'Sophia',
    client: 'Martin_Whale',
    channel: 'Fanvue',
    category: 'Subscription',
    toAccount: 'Crypto Wallet',
    notes: 'Monthly subscription',
    screenshot: null,
    approved: true,
    delivered: true
  },
  {
    id: 8,
    dateTime: '2024-01-15 07:45',
    amount: 6250,
    operator: 'Luna',
    model: 'Luna',
    client: 'Thomas_Standard',
    channel: 'Facebook',
    category: 'Premium Video',
    toAccount: 'Wise USD',
    notes: 'Morning content',
    screenshot: 'screenshot4.jpg',
    approved: true,
    delivered: true
  },
  {
    id: 9,
    dateTime: '2024-01-15 06:30',
    amount: 15000,
    operator: 'Isabella',
    model: 'Isabella',
    client: 'Richard_VIP',
    channel: 'WhatsApp',
    category: 'Live Call',
    toAccount: 'Revolut',
    notes: 'Early morning session',
    screenshot: null,
    approved: true,
    delivered: true
  },
  {
    id: 10,
    dateTime: '2024-01-15 05:15',
    amount: 8750,
    operator: 'Sophia',
    model: 'Natalie',
    client: 'Paul_Elite',
    channel: 'Telegram',
    category: 'Chat Session',
    toAccount: 'Crypto Wallet',
    notes: 'Late night chat',
    screenshot: null,
    approved: false,
    delivered: false
  }
];

interface EnhancedActivityFeedProps {
  currentTimeframe?: string;
  selectedOperator?: string;
  enableCheckboxes?: boolean;
}

export function EnhancedActivityFeed({ 
  currentTimeframe = 'daily', 
  selectedOperator = 'all',
  enableCheckboxes = false 
}: EnhancedActivityFeedProps) {
  const [sortBy, setSortBy] = useState('dateTime');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [localData, setLocalData] = useState(activityData);

  // Filter data based on timeframe and operator
  const filteredData = useMemo(() => {
    let filtered = [...localData];
    
    // Filter by operator
    if (selectedOperator !== 'all') {
      filtered = filtered.filter(item => 
        item.operator.toLowerCase() === selectedOperator.toLowerCase()
      );
    }
    
    // Filter by timeframe (for now, return all data regardless of timeframe)
    // In a real app, this would filter based on the timeframe
    
    return filtered;
  }, [localData, currentTimeframe, selectedOperator]);

  // Sort data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a];
      let bValue: any = b[sortBy as keyof typeof b];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredData, sortBy, sortOrder]);

  const handleApprovalToggle = (id: number) => {
    if (!enableCheckboxes) return;
    
    setLocalData(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, approved: !item.approved }
          : item
      )
    );
  };

  const handleDeliveredToggle = (id: number) => {
    if (!enableCheckboxes) return;
    
    setLocalData(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, delivered: !item.delivered }
          : item
      )
    );
  };

  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button
      onClick={() => {
        if (sortBy === field) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortBy(field);
          setSortOrder('desc');
        }
      }}
      className="flex items-center space-x-1 text-left hover:text-[rgb(var(--neon-orchid))] transition-colors duration-200"
    >
      <span>{children}</span>
      {sortBy === field && (
        sortOrder === 'asc' ? 
        <ChevronUp className="w-3 h-3" /> : 
        <ChevronDown className="w-3 h-3" />
      )}
    </button>
  );

  const getChannelColor = (channel: string) => {
    if (channel.includes('Fanvue')) return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    if (channel.includes('Facebook')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (channel.includes('WhatsApp')) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (channel.includes('Telegram')) return 'bg-blue-400/20 text-blue-300 border-blue-400/30';
    if (channel.includes('Instagram')) return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-full overflow-y-auto">
        <table className="w-full table-fixed border-separate border-spacing-0">
          {/* Frozen Header */}
          <thead className="bg-[rgba(var(--velvet-gray),0.3)] border-b border-[rgba(var(--neon-orchid),0.2)] sticky top-0 z-10">
            <tr>
              <th className="w-[100px] px-2 py-2 text-left text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                <SortButton field="dateTime">Date & Time</SortButton>
              </th>
              <th className="w-[80px] px-2 py-2 text-left text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                <SortButton field="amount">Amount</SortButton>
              </th>
              <th className="w-[80px] px-2 py-2 text-left text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                <SortButton field="operator">Operator</SortButton>
              </th>
              <th className="w-[80px] px-2 py-2 text-left text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                <SortButton field="model">Model</SortButton>
              </th>
              <th className="w-[100px] px-2 py-2 text-left text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                <SortButton field="client">Client</SortButton>
              </th>
              <th className="w-[80px] px-2 py-2 text-left text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                <SortButton field="channel">Channel</SortButton>
              </th>
              <th className="w-[100px] px-2 py-2 text-left text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                <SortButton field="category">Category</SortButton>
              </th>
              <th className="w-[100px] px-2 py-2 text-left text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                <SortButton field="toAccount">To Account</SortButton>
              </th>
              <th className="w-[120px] px-2 py-2 text-left text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                Notes
              </th>
              <th className="w-[60px] px-2 py-2 text-center text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                <File className="w-4 h-4 mx-auto" />
              </th>
              <th className="w-[60px] px-2 py-2 text-center text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                Cinklo
              </th>
              <th className="w-[60px] px-2 py-2 text-center text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                Hotovo
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr
                key={item.id}
                className={cn(
                  'h-10 border-b border-[rgba(var(--neon-orchid),0.1)] cursor-pointer transition-colors duration-200',
                  hoveredRow === index 
                    ? 'bg-[rgba(var(--neon-orchid),0.08)]' 
                    : 'hover:bg-[rgba(var(--neon-orchid),0.05)]'
                )}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Date & Time */}
                <td className="px-2 py-2 h-10">
                  <div className="flex items-center h-full">
                    <div className="text-xs text-[rgb(var(--foreground))]">
                      {item.dateTime.split(' ')[0]}
                      <br />
                      <span className="text-[rgb(var(--muted-foreground))]">
                        {item.dateTime.split(' ')[1]}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-2 py-2 h-10">
                  <div className="flex items-center h-full">
                    <div className="text-sm font-bold text-green-400">
                      {item.amount.toLocaleString()} <span className="text-xs opacity-80">CZK</span>
                    </div>
                  </div>
                </td>

                {/* Operator */}
                <td className="px-2 py-2 h-10">
                  <div className="flex items-center space-x-1 h-full">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {item.operator.charAt(0)}
                    </div>
                    <span className="text-xs text-[rgb(var(--foreground))] truncate">{item.operator}</span>
                  </div>
                </td>

                {/* Model */}
                <td className="px-2 py-2 h-10">
                  <div className="flex items-center space-x-1 h-full">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                      {item.model.charAt(0)}
                    </div>
                    <span className="text-xs text-[rgb(var(--foreground))] truncate">{item.model}</span>
                  </div>
                </td>

                {/* Client */}
                <td className="px-2 py-2 h-10">
                  <div className="flex items-center h-full">
                    <span className="text-xs text-[rgb(var(--foreground))] truncate">{item.client}</span>
                  </div>
                </td>

                {/* Channel */}
                <td className="px-2 py-2 h-10">
                  <div className="flex items-center h-full">
                    <span className={cn(
                      'inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium border truncate',
                      getChannelColor(item.channel)
                    )}>
                      {item.channel}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="px-2 py-2 h-10">
                  <div className="flex items-center h-full">
                    <span className="text-xs text-[rgb(var(--foreground))] truncate">{item.category}</span>
                  </div>
                </td>

                {/* To Account */}
                <td className="px-2 py-2 h-10">
                  <div className="flex items-center h-full">
                    <span className="text-xs text-[rgb(var(--foreground))] truncate">{item.toAccount}</span>
                  </div>
                </td>

                {/* Notes */}
                <td className="px-2 py-2 h-10">
                  <div className="flex items-center h-full">
                    <span className="text-xs text-[rgb(var(--muted-foreground))] truncate">{item.notes}</span>
                  </div>
                </td>

                {/* Screenshot - File Icon */}
                <td className="px-2 py-2 h-10">
                  <div className="flex items-center justify-center h-full">
                    {item.screenshot ? (
                      <button className="p-1 text-[rgb(var(--neon-orchid))] hover:text-[rgb(var(--foreground))] transition-colors">
                        <File className="w-3 h-3" />
                      </button>
                    ) : (
                      <div className="w-3 h-3 bg-[rgba(var(--velvet-gray),0.3)] rounded"></div>
                    )}
                  </div>
                </td>

                {/* Cinklo (Green Checkbox) */}
                <td className="px-2 py-2 h-10">
                  <div className="flex items-center justify-center h-full">
                    <button
                      onClick={() => handleApprovalToggle(item.id)}
                      className={cn(
                        'w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200',
                        item.approved
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-[rgb(var(--muted-foreground))] hover:border-green-500',
                        'cursor-pointer'
                      )}
                    >
                      {item.approved && <Check className="w-3 h-3" />}
                    </button>
                  </div>
                </td>

                {/* Hotovo (Blue Checkbox) */}
                <td className="px-2 py-2 h-10">
                  <div className="flex items-center justify-center h-full">
                    <button
                      onClick={() => handleDeliveredToggle(item.id)}
                      className={cn(
                        'w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200',
                        item.delivered
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'border-[rgb(var(--muted-foreground))] hover:border-blue-500',
                        'cursor-pointer'
                      )}
                    >
                      {item.delivered && <Check className="w-3 h-3" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {sortedData.length === 0 && (
          <div className="text-center py-8">
            <div className="text-[rgb(var(--muted-foreground))] text-lg mb-2">No transactions found</div>
            <div className="text-[rgb(var(--muted-foreground))] text-sm">
              {selectedOperator !== 'all' 
                ? `No activity for ${selectedOperator} in the selected timeframe`
                : 'No activity recorded for the selected timeframe'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}