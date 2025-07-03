'use client';

import { useState } from 'react';
import { UserManagementTable } from '@/components/admin/user-management-table';
import { RevenueSettingsTable } from '@/components/admin/revenue-settings-table';
import { PerformanceGoalsWidget } from '@/components/admin/performance-goals-widget';
import { CreateUserModal } from '@/components/admin/create-user-modal';
import { 
  Settings,
  Users,
  DollarSign,
  Plus,
  Shield,
  Target
} from 'lucide-react';

// Mock user data with avatar field added
const usersData = [
  {
    id: 1,
    username: 'sarah.chen',
    role: 'Admin',
    viewOnlyAssignedData: false,
    accessToPages: ['Dashboard', 'Analytics', 'Cashflow', 'Clients', 'Models', 'Admin'],
    abilities: ['Edit Models', 'View Revenue', 'Manage Users', 'Export Data', 'System Settings'],
    lastLogin: '2024-01-15 14:23',
    isActive: true,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: 2,
    username: 'isabella.operator',
    role: 'Setter',
    viewOnlyAssignedData: true,
    accessToPages: ['Dashboard', 'Stream', 'Clients', 'Models'],
    abilities: ['Edit Models', 'View Revenue', 'Add Transactions'],
    lastLogin: '2024-01-15 13:45',
    isActive: true,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: 3,
    username: 'sophia.operator',
    role: 'Setter',
    viewOnlyAssignedData: true,
    accessToPages: ['Dashboard', 'Stream', 'Clients'],
    abilities: ['View Revenue', 'Add Transactions'],
    lastLogin: '2024-01-15 12:30',
    isActive: true,
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: 4,
    username: 'luna.operator',
    role: 'Setter',
    viewOnlyAssignedData: true,
    accessToPages: ['Dashboard', 'Stream', 'Clients'],
    abilities: ['View Revenue', 'Add Transactions'],
    lastLogin: '2024-01-14 18:20',
    isActive: false,
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: 5,
    username: 'emma.manager',
    role: 'Admin',
    viewOnlyAssignedData: false,
    accessToPages: ['Dashboard', 'Analytics', 'Cashflow', 'Clients', 'Models'],
    abilities: ['Edit Models', 'View Revenue', 'Export Data'],
    lastLogin: '2024-01-15 09:15',
    isActive: true,
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

// Mock revenue settings data
const revenueSettingsData = [
  {
    id: 1,
    user: 'Isabella',
    defaultChatCommission: 20,
    hourlyPay: 120,
    milestoneBonus: {
      '125000': 2,
      '250000': 4,
      '375000': 6,
      '500000': 8
    },
    weekendBonus: 1.5,
    wildcardBonus: 2.0
  },
  {
    id: 2,
    user: 'Sophia',
    defaultChatCommission: 18,
    hourlyPay: 120,
    milestoneBonus: {
      '125000': 2,
      '250000': 4,
      '375000': 6,
      '500000': 8
    },
    weekendBonus: 1.5,
    wildcardBonus: 2.0
  },
  {
    id: 3,
    user: 'Luna',
    defaultChatCommission: 22,
    hourlyPay: 120,
    milestoneBonus: {
      '125000': 2,
      '250000': 4,
      '375000': 6,
      '500000': 8
    },
    weekendBonus: 1.5,
    wildcardBonus: 2.0
  },
  {
    id: 4,
    user: 'Sarah',
    defaultChatCommission: 19,
    hourlyPay: 120,
    milestoneBonus: {
      '125000': 2,
      '250000': 4,
      '375000': 6,
      '500000': 8
    },
    weekendBonus: 1.5,
    wildcardBonus: 2.0
  },
  {
    id: 5,
    user: 'Emma',
    defaultChatCommission: 21,
    hourlyPay: 120,
    milestoneBonus: {
      '125000': 2,
      '250000': 4,
      '375000': 6,
      '500000': 8
    },
    weekendBonus: 1.5,
    wildcardBonus: 2.0
  }
];

// Mock performance goals data
const performanceGoalsData = {
  daily: {
    chattingRevenueGoal: 50000,
    profitGoal: 35000,
    enabled: true
  },
  weekly: {
    chattingRevenueGoal: 350000,
    profitGoal: 245000,
    enabled: true
  },
  monthly: {
    chattingRevenueGoal: 1500000,
    profitGoal: 1050000,
    enabled: false
  }
};

export default function Admin() {
  const [users, setUsers] = useState(usersData);
  const [revenueSettings, setRevenueSettings] = useState(revenueSettingsData);
  const [performanceGoals, setPerformanceGoals] = useState(performanceGoalsData);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  // User Management Functions
  const handleCreateUser = (userData: any) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      lastLogin: 'Never',
      isActive: true
    };
    setUsers(prev => [...prev, newUser]);
  };

  const handleEditUser = (userId: number, updatedData: any) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updatedData } : user
    ));
  };

  const handleResetPassword = (userId: number) => {
    // In a real app, this would trigger a password reset
    console.log('Resetting password for user:', userId);
    alert('Password reset email sent!');
  };

  const handleRemoveUser = (userId: number) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleUpdateAvatar = (userId: number, avatarUrl: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, avatar: avatarUrl } : user
    ));
  };

  // Revenue Settings Functions
  const handleUpdateRevenueSetting = (userId: number, field: string, value: any) => {
    setRevenueSettings(prev => prev.map(setting => 
      setting.id === userId 
        ? { ...setting, [field]: value }
        : setting
    ));
  };

  // Performance Goals Functions
  const handleUpdatePerformanceGoal = (period: string, field: string, value: any) => {
    setPerformanceGoals(prev => ({
      ...prev,
      [period]: {
        ...prev[period as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gradient-primary">
          System Administration
        </h1>
        <p className="text-[rgb(var(--muted-foreground))] text-lg">
          Platform configuration and advanced system controls
        </p>
      </div>

      {/* 1. User Management Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
                USER MANAGEMENT
              </h2>
              <p className="text-[rgb(var(--muted-foreground))] text-sm">
                System access control • Role-based permissions
              </p>
            </div>
          </div>

          {/* Create New User Button */}
          <button
            onClick={() => setShowCreateUserModal(true)}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white font-medium hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Create New User</span>
          </button>
        </div>

        {/* User Management Table */}
        <div className="glow-card p-0 overflow-hidden">
          <UserManagementTable
            users={users}
            onEditUser={handleEditUser}
            onResetPassword={handleResetPassword}
            onRemoveUser={handleRemoveUser}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </div>
      </div>

      {/* 2. Revenue Settings Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
              REVENUE SETTINGS
            </h2>
            <p className="text-[rgb(var(--muted-foreground))] text-sm">
              Commission rates and bonus configuration • Financial optimization
            </p>
          </div>
        </div>

        {/* Revenue Settings Table */}
        <div className="glow-card p-0 overflow-hidden">
          <RevenueSettingsTable
            settings={revenueSettings}
            onUpdateSetting={handleUpdateRevenueSetting}
          />
        </div>
      </div>

      {/* 3. Performance Goals Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
              PERFORMANCE GOALS
            </h2>
            <p className="text-[rgb(var(--muted-foreground))] text-sm">
              Revenue and profit targets • Performance benchmarks
            </p>
          </div>
        </div>

        {/* Performance Goals Widget */}
        <div className="glow-card p-0 overflow-hidden">
          <PerformanceGoalsWidget
            goals={performanceGoals}
            onUpdateGoal={handleUpdatePerformanceGoal}
          />
        </div>
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)}
        onCreateUser={handleCreateUser}
      />
    </div>
  );
}