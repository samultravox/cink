'use client';

import { useState } from 'react';
import { Edit3, Save, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RevenueSetting {
  id: number;
  user: string;
  defaultChatCommission: number;
  hourlyPay: number;
  milestoneBonus: Record<string, number>;
  weekendBonus: number;
  wildcardBonus: number;
}

interface RevenueSettingsTableProps {
  settings: RevenueSetting[];
  onUpdateSetting: (userId: number, field: string, value: any) => void;
}

export function RevenueSettingsTable({ settings, onUpdateSetting }: RevenueSettingsTableProps) {
  const [editingCell, setEditingCell] = useState<{ userId: number; field: string } | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const startEdit = (userId: number, field: string, currentValue: any) => {
    setEditingCell({ userId, field });
    setEditValue(currentValue.toString());
  };

  const saveEdit = () => {
    if (!editingCell) return;
    
    let value: any = editValue;
    
    // Convert to appropriate type
    if (editingCell.field === 'defaultChatCommission' || 
        editingCell.field === 'hourlyPay' || 
        editingCell.field === 'weekendBonus' ||
        editingCell.field === 'wildcardBonus') {
      value = parseFloat(editValue);
    }
    
    onUpdateSetting(editingCell.userId, editingCell.field, value);
    setEditingCell(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const isEditing = (userId: number, field: string) => {
    return editingCell?.userId === userId && editingCell?.field === field;
  };

  const renderEditableCell = (userId: number, field: string, value: any, suffix?: string) => {
    if (isEditing(userId, field)) {
      return (
        <div className="flex items-center space-x-2">
          <input
            type="number"
            step="0.1"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-20 px-2 py-1 rounded bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] text-sm focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)]"
            autoFocus
            onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
          />
          <button
            onClick={saveEdit}
            className="p-1 text-green-400 hover:text-green-300"
          >
            <Save className="w-3 h-3" />
          </button>
          <button
            onClick={cancelEdit}
            className="p-1 text-red-400 hover:text-red-300"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => startEdit(userId, field, value)}
        className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-[rgba(var(--velvet-gray),0.3)] transition-colors group"
      >
        <span className="text-sm font-bold text-[rgb(var(--foreground))]">
          {value}{suffix}
        </span>
        <Edit3 className="w-3 h-3 text-[rgb(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    );
  };

  const renderMilestoneBonuses = (userId: number, milestoneBonus: Record<string, number>) => {
    return (
      <div className="space-y-1">
        {Object.entries(milestoneBonus).map(([milestone, bonus]) => (
          <div key={milestone} className="flex items-center justify-between text-xs">
            <span className="text-[rgb(var(--muted-foreground))]">
              {parseInt(milestone).toLocaleString()} CZK:
            </span>
            <span className="text-[rgb(var(--foreground))] font-medium">
              +{bonus}%
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[rgba(var(--velvet-gray),0.3)] border-b border-[rgba(var(--neon-orchid),0.2)]">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
              User
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
              Default Chat Commission
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
              Hourly Pay
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
              Milestone Bonuses
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
              Weekend Bonus
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
              Wildcard Bonus
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(var(--neon-orchid),0.1)]">
          {settings.map((setting) => (
            <tr key={setting.id} className="hover:bg-[rgba(var(--neon-orchid),0.05)] transition-colors duration-200">
              {/* User */}
              <td className="px-4 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                    {setting.user.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-[rgb(var(--foreground))]">
                    {setting.user}
                  </span>
                </div>
              </td>

              {/* Default Chat Commission */}
              <td className="px-4 py-4 text-center">
                {renderEditableCell(setting.id, 'defaultChatCommission', setting.defaultChatCommission, '%')}
              </td>

              {/* Hourly Pay */}
              <td className="px-4 py-4 text-center">
                {renderEditableCell(setting.id, 'hourlyPay', setting.hourlyPay, ' CZK/hod')}
              </td>

              {/* Milestone Bonuses */}
              <td className="px-4 py-4">
                <div className="flex justify-center">
                  <div className="p-2 rounded-lg bg-[rgba(var(--velvet-gray),0.2)] border border-[rgba(var(--neon-orchid),0.1)]">
                    {renderMilestoneBonuses(setting.id, setting.milestoneBonus)}
                  </div>
                </div>
              </td>

              {/* Weekend Bonus */}
              <td className="px-4 py-4 text-center">
                {renderEditableCell(setting.id, 'weekendBonus', setting.weekendBonus, 'x')}
              </td>

              {/* Wildcard Bonus */}
              <td className="px-4 py-4 text-center">
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-[rgb(var(--sunset-gold))]" />
                    {renderEditableCell(setting.id, 'wildcardBonus', setting.wildcardBonus, 'x')}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Row */}
      <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-[rgba(var(--neon-orchid),0.1)] to-[rgba(var(--sunset-gold),0.1)] border border-[rgba(var(--neon-orchid),0.2)]">
        <div className="grid grid-cols-6 gap-4 text-sm">
          <div className="text-center">
            <div className="font-medium text-[rgb(var(--foreground))]">Average Commission</div>
            <div className="text-[rgb(var(--sunset-gold))] font-bold">
              {(settings.reduce((sum, s) => sum + s.defaultChatCommission, 0) / settings.length).toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-[rgb(var(--foreground))]">Standard Hourly</div>
            <div className="text-[rgb(var(--sunset-gold))] font-bold">
              {settings[0]?.hourlyPay || 120} CZK/hod
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-[rgb(var(--foreground))]">Milestone System</div>
            <div className="text-[rgb(var(--sunset-gold))] font-bold">
              4 Tiers Active
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-[rgb(var(--foreground))]">Weekend Multiplier</div>
            <div className="text-[rgb(var(--sunset-gold))] font-bold">
              {settings[0]?.weekendBonus || 1.5}x
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-[rgb(var(--foreground))]">Wildcard Multiplier</div>
            <div className="text-[rgb(var(--sunset-gold))] font-bold">
              {settings[0]?.wildcardBonus || 2.0}x
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-[rgb(var(--foreground))]">Total Users</div>
            <div className="text-[rgb(var(--sunset-gold))] font-bold">
              {settings.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}