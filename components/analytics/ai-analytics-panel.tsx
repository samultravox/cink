'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, Brain, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIAnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleQuestions = [
  "Who fell off hardest this week?",
  "Any red flags in sub churn?",
  "Which model needs optimization?",
  "Show me conversion bottlenecks"
];

const sampleResponses = {
  "Who fell off hardest this week?": {
    type: 'warning',
    content: "Luna's performance dropped 23% this week. Revenue down from $8.2K to $6.3K. Main issues: 15% decrease in message response rate and 8% drop in conversion. Recommend immediate strategy review.",
    metrics: { change: -23, revenue: 6300, previousRevenue: 8200 }
  },
  "Any red flags in sub churn?": {
    type: 'alert',
    content: "Critical: Subscription churn rate increased to 12.4% (up from 8.1% last month). Isabella's subs showing highest churn at 18%. Pattern suggests pricing sensitivity around $50+ tiers.",
    metrics: { churnRate: 12.4, previousChurn: 8.1, criticalModel: 'Isabella' }
  },
  "Which model needs optimization?": {
    type: 'insight',
    content: "Sophia has highest potential for optimization. Strong message volume (95th percentile) but low conversion (75th percentile). Recommend A/B testing pricing strategy and content personalization.",
    metrics: { messageVolume: 95, conversion: 75, potential: 'High' }
  },
  "Show me conversion bottlenecks": {
    type: 'analysis',
    content: "Primary bottleneck: 34% drop-off between initial message and first payment. Secondary: 28% abandon premium content after preview. Recommend streamlined payment flow and better preview strategy.",
    metrics: { dropOff1: 34, dropOff2: 28, stage: 'Payment Flow' }
  }
};

export function AIAnalyticsPanel({ isOpen, onClose }: AIAnalyticsPanelProps) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{id: number, type: 'user' | 'ai', content: string, timestamp: Date}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = sampleResponses[query as keyof typeof sampleResponses] || {
        type: 'insight',
        content: "I'm analyzing your data... This is a sophisticated query that requires deep analysis of multiple metrics and patterns. Let me process the current performance data and provide strategic insights.",
        metrics: {}
      };

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai' as const,
        content: response.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setQuery(question);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-2xl h-[600px] rounded-xl bg-[rgba(var(--charcoal),0.95)] border border-[rgba(var(--neon-orchid),0.3)] backdrop-blur-sm shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(var(--neon-orchid),0.2)]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[rgb(var(--foreground))]">AI Analytics Assistant</h3>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">Strategic intelligence powered by PINK™</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.5)] transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="text-[rgb(var(--muted-foreground))] mb-4">
                Ask me anything about your analytics data
              </div>
              <div className="grid grid-cols-2 gap-2">
                {sampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="p-3 text-sm text-left rounded-lg bg-[rgba(var(--velvet-gray),0.3)] hover:bg-[rgba(var(--velvet-gray),0.5)] text-[rgb(var(--foreground))] transition-all duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] p-3 rounded-lg',
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white'
                    : 'bg-[rgba(var(--velvet-gray),0.5)] text-[rgb(var(--foreground))]'
                )}
              >
                <div className="text-sm">{message.content}</div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[rgba(var(--velvet-gray),0.5)] p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[rgb(var(--neon-orchid))] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[rgb(var(--neon-orchid))] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[rgb(var(--neon-orchid))] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-[rgba(var(--neon-orchid),0.2)]">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about performance, trends, or optimization..."
              className="flex-1 px-4 py-2 rounded-lg bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)] transition-all duration-200"
            />
            <button
              type="submit"
              disabled={!query.trim() || isTyping}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}