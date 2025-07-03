'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Payment {
  amount: number;
  model: string;
  channel: string;
  operator: string;
}

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment;
}

export function Notification({ isOpen, onClose, payment }: NotificationProps) {
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    if (isOpen) {
      setProgress(100);
      
      // Auto-dismiss after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      // Progress bar animation
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 30);
      
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Get model avatar (in a real app, this would come from a database)
  const getModelAvatar = (modelName: string) => {
    const avatars: Record<string, string> = {
      'Isabella': 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      'Natalie': 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      'Sophia': 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      'Luna': 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      'Emma': 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    };
    
    return avatars[modelName] || '';
  };
  
  // Get channel color
  const getChannelColor = (channel: string) => {
    if (channel.includes('Fanvue')) return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    if (channel.includes('FB') || channel === 'Facebook') return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (channel.includes('WhatsApp')) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (channel.includes('Telegram')) return 'bg-blue-400/20 text-blue-300 border-blue-400/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };
  
  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in-50 duration-300">
      <div className="relative w-80 rounded-2xl backdrop-blur-md bg-[rgba(var(--charcoal),0.85)] border border-[rgba(var(--neon-orchid),0.3)] shadow-2xl overflow-hidden">
        {/* Progress bar */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--sunset-gold))]"
          style={{ width: `${progress}%`, transition: 'width 30ms linear' }}
        />
        
        <div className="p-4">
          {/* Header with close button */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-[rgb(var(--muted-foreground))]">Nová platba</span>
            </div>
            <button
              onClick={onClose}
              className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <Avatar className="w-12 h-12 border-2 border-[rgba(var(--neon-orchid),0.3)]">
              <AvatarImage src={getModelAvatar(payment.model)} alt={payment.model} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-bold">
                {payment.model.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              {/* Amount */}
              <div className="text-2xl font-black text-gradient-gold mb-1">
                {payment.amount.toLocaleString()} <span className="text-xs opacity-80">CZK</span>
              </div>
              
              {/* Details */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[rgb(var(--foreground))]">{payment.model}</span>
                <span className={cn(
                  'inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium border',
                  getChannelColor(payment.channel)
                )}>
                  {payment.channel}
                </span>
              </div>
              
              <div className="text-xs text-[rgb(var(--muted-foreground))]">
                Operator: <span className="text-[rgb(var(--neon-orchid))]">{payment.operator}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}