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
import { FloatingControls } from '@/components/dashboard/floating-controls';
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

export default function Charts() {
  const [currentTimeframe, setCurrentTimeframe] = useState('daily');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [cumulativeMode, setCumulativeMode] = useState(true);

  return (
    <div className="space-y-3 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-gradient-primary">
            PINK Charts
          </h1>
          <p className="text-[rgb(var(--muted-foreground))] text-lg">
            Visualize empire growth • Strategic performance insights
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

      {/* Top Row - Multi-Metric Line Chart - Full Width */}
      <div className="grid grid-cols-12 gap-3 mb-3">
        <div className="col-span-12">
          <div className="glow-card p-4 flex flex-col h-[348px]">
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
            <div className="flex-1">
              <MultiMetricChart timeframe={currentTimeframe} cumulative={cumulativeMode} />
            </div>
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
            <div className="h-72">
              <NewClientsChart timeframe={currentTimeframe} cumulative={cumulativeMode} />
            </div>
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
            <div className="h-72">
              <FanvuePerformanceChart timeframe={currentTimeframe} cumulative={cumulativeMode} />
            </div>
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
            <div className="h-72">
              <FBAnalyticsChart timeframe={currentTimeframe} cumulative={cumulativeMode} />
            </div>
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
            <div className="h-72">
              <ChatterROIChart timeframe={currentTimeframe} cumulative={cumulativeMode} />
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Row - Productive Hours Heatmap - INCREASED HEIGHT */}
      <div className="grid grid-cols-12 gap-3 mb-3">
        <div className="col-span-12">
          <div className="glow-card p-4 h-[400px]">
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

      {/* Fifth Row - Revenue Channels & Chatter/Model Performance */}
      <div className="grid grid-cols-12 gap-3 mb-3">
        {/* Revenue Channels Chart */}
        <div className="col-span-4">
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
            <div className="h-72">
              <RevenueChannelsChart timeframe={currentTimeframe} cumulative={cumulativeMode} />
            </div>
          </div>
        </div>

        {/* Chatter Performance Chart */}
        <div className="col-span-4">
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
            <div className="h-72">
              <ChatterProfitChart timeframe={currentTimeframe} />
            </div>
          </div>
        </div>

        {/* Model Revenue Performance Chart */}
        <div className="col-span-4">
          <div className="glow-card p-4 h-96">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
                  MODEL REVENUE PERFORMANCE
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] text-sm">
                  AI persona revenue rankings • Revenue optimization
                </p>
              </div>
            </div>
            <div className="h-72">
              <ModelRevenueChart selectedModel={selectedModels.length === 1 ? selectedModels[0] : 'all'} />
            </div>
          </div>
        </div>
      </div>

      {/* AI Analytics Panel */}
      <AIAnalyticsPanel 
        isOpen={showAIPanel}
        onClose={() => setShowAIPanel(false)}
      />

      {/* Dashboard-style Floating Controls - Same as Dashboard */}
      <FloatingControls 
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