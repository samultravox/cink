'use client';

import { useState, useEffect } from 'react';
import { MultiMetricChart } from '@/components/analytics/multi-metric-chart';
import { ChatterProfitChart } from '@/components/analytics/chatter-profit-chart';
import { ModelRevenueChart } from '@/components/analytics/model-revenue-chart';
import { NewClientsChart } from '@/components/analytics/new-clients-chart';
import { FanvuePerformanceChart } from '@/components/analytics/fanvue-performance-chart';
import { FBAnalyticsChart } from '@/components/analytics/fb-analytics-chart';
import { ChatterROIChart } from '@/components/analytics/chatter-roi-chart';
import { ProductiveHoursHeatmap } from '@/components/analytics/productive-hours-heatmap';
import { RevenueChannelsChart } from '@/components/analytics/revenue-channels-chart';
import { ChartsFloatingControls } from '@/components/analytics/charts-floating-controls';
import { AIAnalyticsPanel } from '@/components/analytics/ai-analytics-panel';
import { 
  TrendingUp, 
  Users, 
  Crown, 
  Zap,
  Brain,
  Play,
  BarChart3,
  DollarSign,
  UserPlus,
  MessageSquare,
  Target,
  Clock,
  Activity
} from 'lucide-react';

export default function Analytics() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeframe, setCurrentTimeframe] = useState('daily');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [cumulativeMode, setCumulativeMode] = useState(true);

  // Calculate Ad Spend based on timeframe
  const getAdSpend = () => {
    switch (currentTimeframe) {
      case 'daily':
        return '$2,340';
      case 'weekly':
        return '$16,380';
      case 'monthly':
        return '$68,420';
      case 'quarterly':
        return '$205,260';
      default:
        return '$16,380';
    }
  };

  const getAdSpendLabel = () => {
    switch (currentTimeframe) {
      case 'daily':
        return 'Ad Spend Today';
      case 'weekly':
        return 'Ad Spend This Week';
      case 'monthly':
        return 'Ad Spend This Month';
      case 'quarterly':
        return 'Ad Spend This Quarter';
      default:
        return 'Ad Spend This Week';
    }
  };

  return (
    <div className="space-y-3 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-gradient-primary">
            PINK Analytics
          </h1>
          <p className="text-[rgb(var(--muted-foreground))] text-lg">
            Advanced performance intelligence • Strategic decision matrix
          </p>
        </div>

        {/* Cumulative Toggle */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-[rgb(var(--foreground))]">View Mode:</span>
          <button
            onClick={() => setCumulativeMode(!cumulativeMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ${
              cumulativeMode
                ? 'bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))]'
                : 'bg-[rgba(var(--velvet-gray),0.5)]'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                cumulativeMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm font-medium text-[rgb(var(--foreground))]">
            {cumulativeMode ? 'Cumulative' : 'Not-Cumulative'}
          </span>
        </div>
      </div>

      {/* Top Row - Multi-Metric Line Chart */}
      <div className="grid grid-cols-12 gap-3 mb-3">
        <div className="col-span-8">
          <div className="glow-card p-4 h-80">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
                  REVENUE PERFORMANCE
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] text-sm">
                  Multi-metric trend analysis • Real-time financial pulse
                </p>
              </div>
            </div>
            <MultiMetricChart timeframe={currentTimeframe} cumulative={cumulativeMode} />
          </div>
        </div>

        {/* Key Metrics Summary */}
        <div className="col-span-4 space-y-3">
          <div className="glow-card p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-3xl font-black text-gradient-gold">$47.2K</div>
                <div className="text-sm text-[rgb(var(--muted-foreground))]">Weekly Revenue</div>
              </div>
            </div>
            <div className="text-xs text-green-400">↗ +23.4% vs last week</div>
          </div>

          <div className="glow-card p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-3xl font-black text-[rgb(var(--crimson))]">89.2%</div>
                <div className="text-sm text-[rgb(var(--muted-foreground))]">Profit Margin</div>
              </div>
            </div>
            <div className="text-xs text-green-400">↗ +5.1% improvement</div>
          </div>
        </div>
      </div>

      {/* Second Row - New Clients & Fanvue Performance */}
      <div className="grid grid-cols-12 gap-3 mb-3">
        {/* New Clients Chart */}
        <div className="col-span-6">
          <div className="glow-card p-4 h-96">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
                  NEW CLIENTS
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] text-sm">
                  Client acquisition tracking • Growth momentum analysis
                </p>
              </div>
            </div>
            <NewClientsChart timeframe={currentTimeframe} cumulative={cumulativeMode} />
          </div>
        </div>

        {/* Fanvue Performance Chart */}
        <div className="col-span-6">
          <div className="glow-card p-4 h-96">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
                  FANVUE PERFORMANCE
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] text-sm">
                  Followers, subscriptions & churn analysis
                </p>
              </div>
            </div>
            <FanvuePerformanceChart timeframe={currentTimeframe} cumulative={cumulativeMode} />
          </div>
        </div>
      </div>

      {/* Third Row - FB Analytics & Chatter ROI */}
      <div className="grid grid-cols-12 gap-3 mb-3">
        {/* FB Pages Analytics */}
        <div className="col-span-6">
          <div className="glow-card p-4 h-96">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
                  FB PAGES ANALYTICS
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] text-sm">
                  Ad spend, returns & conversion optimization
                </p>
              </div>
            </div>
            <FBAnalyticsChart timeframe={currentTimeframe} cumulative={cumulativeMode} />
          </div>
        </div>

        {/* Chatter ROI Chart */}
        <div className="col-span-6">
          <div className="glow-card p-4 h-96">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
                  CHATTER ROI
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] text-sm">
                  Employee cost vs revenue generation analysis
                </p>
              </div>
            </div>
            <ChatterROIChart timeframe={currentTimeframe} cumulative={cumulativeMode} />
          </div>
        </div>
      </div>

      {/* Fourth Row - Productive Hours Heatmap */}
      <div className="grid grid-cols-12 gap-3 mb-3">
        <div className="col-span-12">
          <div className="glow-card p-4 h-80">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
                  PRODUCTIVE HOURS HEATMAP
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] text-sm">
                  24-hour revenue intensity visualization • Peak performance identification
                </p>
              </div>
            </div>
            <ProductiveHoursHeatmap timeframe={currentTimeframe} />
          </div>
        </div>
      </div>

      {/* Fifth Row - Revenue Channels & Chatter Performance */}
      <div className="grid grid-cols-12 gap-3 mb-3">
        {/* Revenue Channels Chart */}
        <div className="col-span-6">
          <div className="glow-card p-4 h-96">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
                  REVENUE CHANNELS
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] text-sm">
                  Multi-platform revenue distribution analysis
                </p>
              </div>
            </div>
            <RevenueChannelsChart timeframe={currentTimeframe} cumulative={cumulativeMode} />
          </div>
        </div>

        {/* Chatter Performance Chart */}
        <div className="col-span-6">
          <div className="glow-card p-4 h-96">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
                  CHATTER PERFORMANCE
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] text-sm">
                  Human operator profit rankings • Performance leaderboard
                </p>
              </div>
            </div>
            <ChatterProfitChart timeframe={currentTimeframe} />
          </div>
        </div>
      </div>

      {/* AI Analytics Panel */}
      <AIAnalyticsPanel 
        isOpen={showAIPanel}
        onClose={() => setShowAIPanel(false)}
      />

      {/* Charts Floating Controls with Multi-Select Support */}
      <ChartsFloatingControls 
        currentTimeframe={currentTimeframe}
        onTimeframeChange={setCurrentTimeframe}
        selectedModels={selectedModels}
        onModelsChange={setSelectedModels}
        selectedOperators={selectedOperators}
        onOperatorsChange={setSelectedOperators}
        selectedChannels={selectedChannels}
        onChannelsChange={setSelectedChannels}
        onAskAnalytics={() => setShowAIPanel(true)}
      />
    </div>
  );
}