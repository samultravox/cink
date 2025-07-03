'use client';

import { useState, useMemo } from 'react';
import { ClientsTable } from '@/components/clients/clients-table';
import { ClientsFloatingControls } from '@/components/clients/clients-floating-controls';
import { WorkTimeTracker } from '@/components/stream/work-time-tracker';

// Mock client data with Past 7 Days column and updated payday indicators
const clientsData = [
  {
    id: 1,
    name: 'Michael_VIP',
    email: 'michael.vip@email.com',
    phone: '+420 777 123 456',
    assignedOperator: 'Isabella',
    channel: 'FB',
    summary: 'High-value client, prefers premium content, responsive to upsells',
    paydayIndicator: '1st of month',
    totalCollected: 12450,
    past7Days: 890,
    lastPayment: '2 days ago',
    avgPayment: 285,
    isVIP: true,
    tags: ['VIP', '🔥 High Value'],
    status: 'active',
    riskLevel: 'low'
  },
  {
    id: 2,
    name: 'David_Elite',
    email: 'david.elite@email.com',
    phone: '+420 777 234 567',
    assignedOperator: 'Sophia',
    channel: 'Fanvue',
    summary: 'Regular subscriber, consistent payments, good engagement',
    paydayIndicator: '15th of month',
    totalCollected: 8920,
    past7Days: 420,
    lastPayment: '1 day ago',
    avgPayment: 195,
    isVIP: false,
    tags: ['Regular', 'Consistent'],
    status: 'active',
    riskLevel: 'low'
  },
  {
    id: 3,
    name: 'Alex_Pro',
    email: 'alex.pro@email.com',
    phone: '+420 777 345 678',
    assignedOperator: 'Luna',
    channel: 'FB',
    summary: 'Chat-focused client, prefers conversation over content',
    paydayIndicator: '7th of month',
    totalCollected: 6780,
    past7Days: 680,
    lastPayment: '5 days ago',
    avgPayment: 125,
    isVIP: false,
    tags: ['Chat Heavy', 'Weekly'],
    status: 'active',
    riskLevel: 'medium'
  },
  {
    id: 4,
    name: 'Robert_Gold',
    email: 'robert.gold@email.com',
    phone: '+420 777 456 789',
    assignedOperator: 'Isabella',
    channel: 'Fanvue',
    summary: 'Premium content buyer, irregular payment schedule',
    paydayIndicator: 'Irregular',
    totalCollected: 15680,
    past7Days: 0,
    lastPayment: '12 days ago',
    avgPayment: 420,
    isVIP: true,
    tags: ['VIP', 'Irregular', '🔥 risk'],
    status: 'warning',
    riskLevel: 'high'
  },
  {
    id: 5,
    name: 'James_VIP',
    email: 'james.vip@email.com',
    phone: '+420 777 567 890',
    assignedOperator: 'Natalie',
    channel: 'FB',
    summary: 'Custom content specialist, high-value transactions',
    paydayIndicator: '1st of month',
    totalCollected: 22340,
    past7Days: 1250,
    lastPayment: '1 day ago',
    avgPayment: 750,
    isVIP: true,
    tags: ['VIP', 'Custom Content', 'Vyplaty Dnes'],
    status: 'active',
    riskLevel: 'low'
  },
  {
    id: 6,
    name: 'Thomas_Standard',
    email: 'thomas.std@email.com',
    phone: '+420 777 678 901',
    assignedOperator: 'Sarah',
    channel: 'Fanvue',
    summary: 'Standard subscriber, declining engagement recently',
    paydayIndicator: '15th of month',
    totalCollected: 3420,
    past7Days: 0,
    lastPayment: '18 days ago',
    avgPayment: 85,
    isVIP: false,
    tags: ['Standard', 'Ghosts Fast', '🔥 risk'],
    status: 'risk',
    riskLevel: 'high'
  },
  {
    id: 7,
    name: 'Peter_Premium',
    email: 'peter.premium@email.com',
    phone: '+420 777 789 012',
    assignedOperator: 'Emma',
    channel: 'FB',
    summary: 'Weekend spender, high momentum last 7 days',
    paydayIndicator: '28th of month',
    totalCollected: 5890,
    past7Days: 1120,
    lastPayment: '3 hours ago',
    avgPayment: 165,
    isVIP: false,
    tags: ['Weekend Spender', 'Momentum'],
    status: 'active',
    riskLevel: 'low'
  },
  {
    id: 8,
    name: 'Martin_Whale',
    email: 'martin.whale@email.com',
    phone: '+420 777 890 123',
    assignedOperator: 'Isabella',
    channel: 'Fanvue',
    summary: 'Top spender, exclusive content access, VIP treatment',
    paydayIndicator: '30th of month',
    totalCollected: 45680,
    past7Days: 2340,
    lastPayment: '6 hours ago',
    avgPayment: 1250,
    isVIP: true,
    tags: ['VIP', 'Whale', 'Top Spender', 'Vyplaty Dnes'],
    status: 'active',
    riskLevel: 'low'
  },
  {
    id: 9,
    name: 'John_Regular',
    email: 'john.regular@email.com',
    phone: '+420 777 901 234',
    assignedOperator: 'Luna',
    channel: 'FB',
    summary: 'Regular client with consistent spending patterns',
    paydayIndicator: '5th of month',
    totalCollected: 7850,
    past7Days: 450,
    lastPayment: '4 days ago',
    avgPayment: 175,
    isVIP: false,
    tags: ['Regular', 'Consistent'],
    status: 'active',
    riskLevel: 'low'
  },
  {
    id: 10,
    name: 'William_New',
    email: 'william.new@email.com',
    phone: '+420 777 012 345',
    assignedOperator: 'Sophia',
    channel: 'Fanvue',
    summary: 'New client with high potential, responsive to premium offers',
    paydayIndicator: '10th of month',
    totalCollected: 3200,
    past7Days: 3200,
    lastPayment: '1 day ago',
    avgPayment: 320,
    isVIP: false,
    tags: ['New', 'Momentum'],
    status: 'active',
    riskLevel: 'low'
  }
];

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('totalCollected');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [vipFilter, setVipFilter] = useState('all'); // 'all', 'vip-only', 'non-vip'
  const [clients, setClients] = useState(clientsData);
  const [timeBonus, setTimeBonus] = useState(288); // 144 minutes * 2 CZK = 288 CZK

  // Get all unique tags from clients
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    clients.forEach(client => {
      client.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [clients]);

  // Toggle VIP status for a client
  const toggleVIPStatus = (clientId: number) => {
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, isVIP: !client.isVIP }
        : client
    ));
  };

  // Update client tags
  const updateClientTags = (clientId: number, newTags: string[]) => {
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, tags: newTags }
        : client
    ));
  };

  // Update client summary
  const updateClientSummary = (clientId: number, newSummary: string) => {
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, summary: newSummary }
        : client
    ));
  };

  const handleTimeUpdate = (totalMinutes: number, bonusAmount: number) => {
    setTimeBonus(bonusAmount);
  };

  // Filter and search logic
  const filteredClients = useMemo(() => {
    let filtered = [...clients];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply VIP filter
    if (vipFilter === 'vip-only') {
      filtered = filtered.filter(client => client.isVIP);
    } else if (vipFilter === 'non-vip') {
      filtered = filtered.filter(client => !client.isVIP);
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter(client =>
        selectedTags.some(tag => client.tags.includes(tag))
      );
    }

    // Apply active filters
    activeFilters.forEach(filter => {
      switch (filter) {
        case 'top-spenders':
          filtered = filtered.filter(client => client.totalCollected > 10000);
          break;
        case 'momentum':
          filtered = filtered.filter(client => 
            client.tags.includes('Momentum') || 
            client.past7Days > 500
          );
          break;
        case 'paid-today':
          filtered = filtered.filter(client => 
            client.lastPayment.includes('hour') || 
            client.lastPayment === '1 day ago'
          );
          break;
      }
    });

    // Apply model filter
    if (selectedModel !== 'all') {
      filtered = filtered.filter(client => 
        client.assignedOperator.toLowerCase() === selectedModel.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
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

    return filtered;
  }, [searchQuery, activeFilters, sortBy, sortOrder, selectedModel, selectedTags, vipFilter, clients]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Clients Table - Fixed Height Container with Scrolling */}
      <div className="glow-card p-0 overflow-hidden flex-1 mb-16">
        <ClientsTable 
          clients={filteredClients}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={(field) => {
            if (sortBy === field) {
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            } else {
              setSortBy(field);
              setSortOrder('desc');
            }
          }}
          onToggleVIP={toggleVIPStatus}
          onUpdateTags={updateClientTags}
          onUpdateSummary={updateClientSummary}
          allTags={allTags}
        />
      </div>

      {/* Floating Controls - Bottom with Search Moved Here */}
      <ClientsFloatingControls 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilters={activeFilters}
        onFiltersChange={setActiveFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        vipFilter={vipFilter}
        onVipFilterChange={setVipFilter}
        allTags={allTags}
      />

      {/* Fixed Timer in Bottom Right */}
      <WorkTimeTracker 
        onTimeUpdate={handleTimeUpdate} 
        showInline={false} 
      />
    </div>
  );
}