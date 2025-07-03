'use client';

import { useState } from 'react';
import { 
  MessageSquare,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Channel {
  id: number;
  name: string;
  platform: string;
  assignedOperator: string;
  isActive: boolean;
}

interface ChannelCardProps {
  channel: Channel;
  editMode: boolean;
  onToggleStatus: () => void;
  onRemove: () => void;
}

export function ChannelCard({ channel, editMode, onToggleStatus, onRemove }: ChannelCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getPlatformIcon = () => {
    switch (channel.platform.toLowerCase()) {
      case 'fanvue':
        return <Crown className="w-4 h-4" />;
      case 'facebook':
        return <MessageSquare className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      case 'telegram':
        return <MessageSquare className="w-4 h-4" />;
      case 'instagram':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getPlatformColor = () => {
    switch (channel.platform.toLowerCase()) {
      case 'fanvue':
        return 'from-purple-500 to-pink-500';
      case 'facebook':
        return 'from-blue-500 to-blue-600';
      case 'whatsapp':
        return 'from-green-500 to-green-600';
      case 'telegram':
        return 'from-blue-400 to-blue-500';
      case 'instagram':
        return 'from-pink-500 to-purple-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const Crown = ({ className }: { className: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm2.7-2h8.6l.9-4.4L14 12l-2-4-2 4-3.2-2.4L7.7 14z"/>
    </svg>
  );

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to remove ${channel.name}?`)) {
      onRemove();
    }
  };

  return (
    <div 
      className={cn(
        'glow-card p-3 transition-all duration-300 cursor-pointer relative overflow-hidden',
        !channel.isActive && 'opacity-60',
        isHovered && 'transform scale-102 shadow-lg',
        editMode && 'border border-[rgba(var(--neon-orchid),0.3)]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggleStatus}
    >
      {/* Remove Button - Only in Edit Mode */}
      {editMode && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
          className="absolute top-2 right-2 p-1 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-200"
          title="Remove Channel"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={cn(
            'w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shadow-lg',
            getPlatformColor()
          )}>
            {getPlatformIcon()}
          </div>
          <div>
            <h4 className="text-sm font-bold text-[rgb(var(--foreground))]">
              {channel.name}
            </h4>
            <div className="text-xs text-[rgb(var(--muted-foreground))]">
              {channel.platform}
            </div>
          </div>
        </div>
        
        {/* Operator Avatar */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            {channel.assignedOperator.charAt(0)}
          </div>
          <span className="text-xs text-[rgb(var(--muted-foreground))]">
            {channel.assignedOperator}
          </span>
        </div>
      </div>

      {/* Status Indicator */}
      <div className={cn(
        'absolute top-2 right-2 w-2 h-2 rounded-full',
        editMode ? 'top-8 right-2' : 'top-2 right-2', // Adjust position when remove button is present
        channel.isActive ? 'bg-green-400' : 'bg-red-400'
      )}></div>

      {/* Hover Effect Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--neon-orchid),0.05)] to-[rgba(var(--sunset-gold),0.05)] pointer-events-none" />
      )}
    </div>
  );
}