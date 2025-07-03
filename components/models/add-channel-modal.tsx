'use client';

import { useState } from 'react';
import { X, Save } from 'lucide-react';

interface AddChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChannel: (channel: any) => void;
}

const availablePlatforms = [
  'Fanvue',
  'Facebook',
  'WhatsApp',
  'Telegram',
  'Instagram',
  'TikTok',
  'OnlyFans',
  'Twitter'
];

const availableOperators = [
  'Sarah Chen',
  'Emma Rodriguez',
  'Luna Park',
  'Alex Kim',
  'Maya Singh',
  'Zoe Williams'
];

export function AddChannelModal({ isOpen, onClose, onAddChannel }: AddChannelModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    platform: availablePlatforms[0],
    assignedOperator: availableOperators[0],
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a channel name');
      return;
    }

    onAddChannel(formData);
    
    // Reset form
    setFormData({
      name: '',
      platform: availablePlatforms[0],
      assignedOperator: availableOperators[0],
      isActive: true
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.3)] backdrop-blur-sm shadow-2xl">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[rgb(var(--foreground))]">Add Distribution Channel</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Channel Name */}
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                Channel Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)]"
                placeholder="e.g., Isabella Fanvue"
                required
              />
            </div>

            {/* Platform */}
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)]"
              >
                {availablePlatforms.map((platform) => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>

            {/* Assigned Operator */}
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                Assigned Operator
              </label>
              <select
                value={formData.assignedOperator}
                onChange={(e) => setFormData(prev => ({ ...prev, assignedOperator: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)]"
              >
                {availableOperators.map((operator) => (
                  <option key={operator} value={operator}>{operator}</option>
                ))}
              </select>
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
                Channel is active
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white font-medium hover:scale-105 transition-all duration-200"
            >
              <Save className="w-4 h-4" />
              <span>Add Channel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}