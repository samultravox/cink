'use client';

import { useState, useEffect } from 'react';
import { X, Save, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  id: number;
  username: string;
  role: string;
  viewOnlyAssignedData: boolean;
  accessToPages: string[];
  abilities: string[];
  lastLogin: string;
  isActive: boolean;
  avatar?: string;
}

interface EditUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: any) => void;
}

const availablePages = [
  'Dashboard',
  'Analytics', 
  'Cashflow',
  'Clients',
  'Models',
  'Stream',
  'Admin'
];

const availableAbilities = [
  'Edit Models',
  'View Revenue',
  'Manage Users',
  'Export Data',
  'System Settings',
  'Add Transactions',
  'Reset Passwords',
  'View Analytics',
  'Manage Payouts'
];

export function EditUserModal({ user, isOpen, onClose, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    role: 'Setter',
    viewOnlyAssignedData: true,
    accessToPages: [] as string[],
    abilities: [] as string[],
    isActive: true,
    avatar: ''
  });
  const [newAvatar, setNewAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        role: user.role,
        viewOnlyAssignedData: user.viewOnlyAssignedData,
        accessToPages: [...user.accessToPages],
        abilities: [...user.abilities],
        isActive: user.isActive,
        avatar: user.avatar || ''
      });
      setNewAvatar(user.avatar || null);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      avatar: newAvatar || formData.avatar
    });
  };

  const togglePageAccess = (page: string) => {
    setFormData(prev => ({
      ...prev,
      accessToPages: prev.accessToPages.includes(page)
        ? prev.accessToPages.filter(p => p !== page)
        : [...prev.accessToPages, page]
    }));
  };

  const toggleAbility = (ability: string) => {
    setFormData(prev => ({
      ...prev,
      abilities: prev.abilities.includes(ability)
        ? prev.abilities.filter(a => a !== ability)
        : [...prev.abilities, ability]
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, this would upload to a server and get a URL back
    // For this demo, we'll use a local URL
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setNewAvatar(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.3)] backdrop-blur-sm shadow-2xl">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-[rgb(var(--foreground))]">Edit User: {user.username}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[rgb(var(--foreground))]">Basic Information</h4>
              
              {/* Avatar Upload */}
              <div className="flex flex-col items-center space-y-3 p-4 border border-[rgba(var(--neon-orchid),0.2)] rounded-lg">
                <Avatar className="w-24 h-24 border-2 border-[rgba(var(--neon-orchid),0.3)]">
                  {newAvatar ? (
                    <AvatarImage src={newAvatar} alt={formData.username} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold">
                      {formData.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    id="avatar-upload"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] border border-[rgba(var(--neon-orchid),0.3)] text-[rgb(var(--foreground))] hover:bg-[rgba(var(--neon-orchid),0.3)] transition-all duration-200 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Change Avatar</span>
                  </label>
                </div>
              </div>
              
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)]"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)]"
                >
                  <option value="Setter">Setter</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* View Only Assigned Data */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="viewOnlyAssignedData"
                  checked={formData.viewOnlyAssignedData}
                  onChange={(e) => setFormData(prev => ({ ...prev, viewOnlyAssignedData: e.target.checked }))}
                  className="w-4 h-4 rounded border-[rgba(var(--neon-orchid),0.3)] bg-[rgba(var(--velvet-gray),0.5)] text-[rgb(var(--neon-orchid))] focus:ring-[rgba(var(--neon-orchid),0.5)]"
                />
                <label htmlFor="viewOnlyAssignedData" className="text-sm font-medium text-[rgb(var(--foreground))]">
                  View Only Assigned Data
                </label>
              </div>

              {/* Active Status */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 rounded border-[rgba(var(--neon-orchid),0.3)] bg-[rgba(var(--velvet-gray),0.5)] text-[rgb(var(--neon-orchid))] focus:ring-[rgba(var(--neon-orchid),0.5)]"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-[rgb(var(--foreground))]">
                  User is Active
                </label>
              </div>

              {/* Last Login Info */}
              <div className="p-3 rounded-lg bg-[rgba(var(--velvet-gray),0.2)] border border-[rgba(var(--neon-orchid),0.1)]">
                <div className="text-sm text-[rgb(var(--muted-foreground))]">Last Login:</div>
                <div className="text-sm font-medium text-[rgb(var(--foreground))]">{user.lastLogin}</div>
              </div>
            </div>

            {/* Right Column - Permissions */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[rgb(var(--foreground))]">Permissions</h4>
              
              {/* Access to Pages */}
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                  Access to Pages
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto p-2 rounded-lg bg-[rgba(var(--velvet-gray),0.2)] border border-[rgba(var(--neon-orchid),0.1)]">
                  {availablePages.map((page) => (
                    <label key={page} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.accessToPages.includes(page)}
                        onChange={() => togglePageAccess(page)}
                        className="w-4 h-4 rounded border-[rgba(var(--neon-orchid),0.3)] bg-[rgba(var(--velvet-gray),0.5)] text-[rgb(var(--neon-orchid))] focus:ring-[rgba(var(--neon-orchid),0.5)]"
                      />
                      <span className="text-sm text-[rgb(var(--foreground))]">{page}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Abilities */}
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                  Abilities
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto p-2 rounded-lg bg-[rgba(var(--velvet-gray),0.2)] border border-[rgba(var(--neon-orchid),0.1)]">
                  {availableAbilities.map((ability) => (
                    <label key={ability} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.abilities.includes(ability)}
                        onChange={() => toggleAbility(ability)}
                        className="w-4 h-4 rounded border-[rgba(var(--neon-orchid),0.3)] bg-[rgba(var(--velvet-gray),0.5)] text-[rgb(var(--neon-orchid))] focus:ring-[rgba(var(--neon-orchid),0.5)]"
                      />
                      <span className="text-sm text-[rgb(var(--foreground))]">{ability}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-[rgba(var(--neon-orchid),0.2)]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white font-medium hover:scale-105 transition-all duration-200"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}