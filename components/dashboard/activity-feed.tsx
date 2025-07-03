'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DollarSign, MessageSquare, Crown } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'payment',
    user: 'Michael_VIP',
    operator: 'Isabella',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    action: 'Paid $450 for premium content',
    time: '1 min ago',
    amount: '$450',
    icon: DollarSign,
    color: 'text-green-400'
  },
  {
    id: 2,
    type: 'payment',
    user: 'David_Elite',
    operator: 'Sophia',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    action: 'Subscription renewal $200',
    time: '3 min ago',
    amount: '$200',
    icon: Crown,
    color: 'text-[rgb(var(--sunset-gold))]'
  },
  {
    id: 3,
    type: 'payment',
    user: 'Alex_Pro',
    operator: 'Luna',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    action: 'Chat session payment $125',
    time: '5 min ago',
    amount: '$125',
    icon: MessageSquare,
    color: 'text-[rgb(var(--neon-orchid))]'
  },
  {
    id: 4,
    type: 'payment',
    user: 'Robert_Gold',
    operator: 'Isabella',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    action: 'Premium unlock $300',
    time: '8 min ago',
    amount: '$300',
    icon: DollarSign,
    color: 'text-green-400'
  },
  {
    id: 5,
    type: 'payment',
    user: 'James_VIP',
    operator: 'Natalie',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    action: 'Custom content order $750',
    time: '12 min ago',
    amount: '$750',
    icon: Crown,
    color: 'text-[rgb(var(--sunset-gold))]'
  }
];

export function ActivityFeed() {
  return (
    <div className="space-y-2 max-h-[200px] overflow-y-auto">
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <div 
            key={activity.id} 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-[rgba(var(--velvet-gray),0.3)] transition-all duration-300 animate-float border border-[rgba(var(--neon-orchid),0.1)]"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8 border-2 border-[rgba(var(--neon-orchid),0.3)] shadow-lg">
                <AvatarImage src={activity.avatar} alt={activity.user} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                  {activity.user.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-[rgb(var(--foreground))] text-sm">
                    {activity.user}
                  </span>
                  <Icon className={`w-3 h-3 ${activity.color}`} />
                </div>
                
                <p className="text-xs text-[rgb(var(--muted-foreground))] opacity-90">
                  {activity.action} • Operator: <span className="text-[rgb(var(--neon-orchid))]">{activity.operator}</span>
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-lg font-bold ${activity.color}`}>
                {activity.amount}
              </div>
              <div className="text-xs text-[rgb(var(--muted-foreground))] opacity-70">
                {activity.time}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}