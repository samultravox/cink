'use client';

import { useState, useEffect } from 'react';
import { CollapsibleStatsCard } from '@/components/dashboard/collapsible-stats-card';
import { EnhancedActivityFeed } from '@/components/dashboard/enhanced-activity-feed';
import { ChatterPerformanceTable } from '@/components/dashboard/chatter-performance-table';
import { ModelRevenueBreakdown } from '@/components/dashboard/model-revenue-breakdown';
import { FloatingControls } from '@/components/dashboard/floating-controls';
import { AIAnalyticsPanel } from '@/components/analytics/ai-analytics-panel';
import { Notification } from '@/components/ui/notification';
import { cn } from '@/lib/utils';
import { 
  Wallet, 
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  Download,
  DollarSign,
  CreditCard,
  Banknote,
  Users,
  Calculator,
  Plus,
  RefreshCw,
  Crown,
  Zap,
  BarChart3,
  Clock,
  MessageSquare,
  Target,
  MessageCircle,
  MinusIcon
} from 'lucide-react';

// Mock data for collapsible tables
const subscriptionData = [
  { model: 'Isabella', amount: 11250 },
  { model: 'Sophia', amount: 8000 },
  { model: 'Luna', amount: 7000 },
  { model: 'Natalie', amount: 4925 }
];

// Updated profit breakdown data with Income/Expense types and sorted by amount
const profitData = [
  { category: 'Chatting', type: 'Income', amount: 94800 },
  { category: 'Subs', type: 'Income', amount: 31175 },
  { category: 'Chatters\' Share', type: 'Expense', amount: 28440 },
  { category: 'Ad Spent', type: 'Expense', amount: 15680 },
  { category: 'Hourly Wake', type: 'Expense', amount: 9655 }
].sort((a, b) => b.amount - a.amount); // Sort by amount descending

const last60MinutesData = [
  { operator: 'Isabella', amount: 3000 },
  { operator: 'Sophia', amount: 2125 },
  { operator: 'Luna', amount: 1050 }
];

const topTransactionData = [
  { client: 'Michael_VIP', operator: 'Isabella', amount: 25000, channel: 'Fanvue' }
];

const dailyCustomersData = [
  { client: 'Michael_VIP', totalToday: 36250, operator: 'Isabella', model: 'Isabella' },
  { client: 'David_Elite', totalToday: 22250, operator: 'Sophia', model: 'Natalie' },
  { client: 'James_VIP', totalToday: 18750, operator: 'Luna', model: 'Sophia' },
  { client: 'Peter_Premium', totalToday: 10500, operator: 'Sarah', model: 'Luna' }
];

const newSubscribersData = [
  { model: 'Isabella', subscribers: 8 },
  { model: 'Sophia', subscribers: 5 },
  { model: 'Luna', subscribers: 3 },
  { model: 'Natalie', subscribers: 2 }
];

const lostSubscribersData = [
  { model: 'Sophia', subscribers: 2 },
  { model: 'Luna', subscribers: 1 },
  { model: 'Aria', subscribers: 1 }
];

// Table data for Total Chat Revenue Today collapsible table
const chatRevenueTableData = [
  { chatter: 'Isabella', amountToday: 28420, timeWorked: 7.5 },
  { chatter: 'Sophia', amountToday: 24650, timeWorked: 6.8 },
  { chatter: 'Luna', amountToday: 21890, timeWorked: 6.2 },
  { chatter: 'Sarah', amountToday: 19240, timeWorked: 5.5 }
];

// FB Analytics table data
const responseTimeData = [
  { model: 'Isabella', responseTime: 0.8 },
  { model: 'Sophia', responseTime: 1.2 },
  { model: 'Luna', responseTime: 1.5 },
  { model: 'Natalie', responseTime: 2.1 },
  { model: 'Aria', responseTime: 1.8 }
];

const newChatsData = [
  { model: 'Isabella', newChats: 15 },
  { model: 'Sophia', newChats: 12 },
  { model: 'Luna', newChats: 8 },
  { model: 'Natalie', newChats: 7 },
  { model: 'Aria', newChats: 5 }
];

const conversionRateData = [
  { model: 'Isabella', conversionRate: 28.5 },
  { model: 'Sophia', conversionRate: 25.2 },
  { model: 'Luna', conversionRate: 22.8 },
  { model: 'Natalie', conversionRate: 19.4 },
  { model: 'Aria', conversionRate: 15.7 }
];

// Ad Spend data
const adSpendData = [
  { model: 'Isabella', adSpend: 4200, return: 28420 },
  { model: 'Sophia', adSpend: 3800, return: 24650 },
  { model: 'Luna', adSpend: 3200, return: 21890 },
  { model: 'Natalie', adSpend: 2480, return: 19240 },
  { model: 'Aria', adSpend: 2000, return: 15680 }
];

// Made Back data (ROI calculation)
const madeBackData = adSpendData.map(item => ({
  model: item.model,
  revenue: item.return,
  roi: Math.round((item.return / item.adSpend) * 100)
}));

// New Followers data for Fanvue Analytics
const newFollowersData = [
  { model: 'Isabella', followerGain: 45 },
  { model: 'Sophia', followerGain: 38 },
  { model: 'Luna', followerGain: 32 },
  { model: 'Natalie', followerGain: 28 },
  { model: 'Aria', followerGain: 22 }
];

// Mock performance goals data (this would come from admin settings)
const performanceGoals = {
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
    enabled: true // CHANGED: Enable monthly goals
  }
};

// Sample payment data for notification
const samplePayments = [
  {
    amount: 25000,
    model: 'Isabella',
    channel: 'Fanvue',
    operator: 'Sarah'
  },
  {
    amount: 12500,
    model: 'Natalie',
    channel: 'WhatsApp',
    operator: 'Emma'
  },
  {
    amount: 18750,
    model: 'Sophia',
    channel: 'Facebook',
    operator: 'Luna'
  },
  {
    amount: 7500,
    model: 'Luna',
    channel: 'Telegram',
    operator: 'Alex'
  }
];

export default function Dashboard() {
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [currentTimeframe, setCurrentTimeframe] = useState('daily');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  
  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(samplePayments[0]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Show notification on page load and cycle through sample payments
  useEffect(() => {
    // Show first notification after a short delay
    const initialTimer = setTimeout(() => {
      setShowNotification(true);
    }, 1000);

    // Set up interval to show notifications periodically
    const interval = setInterval(() => {
      const nextIndex = (notificationCount + 1) % samplePayments.length;
      setCurrentPayment(samplePayments[nextIndex]);
      setNotificationCount(nextIndex);
      setShowNotification(true);
    }, 6000); // Show a new notification every 6 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [notificationCount]);

  // Calculate totals
  const totalAdSpend = adSpendData.reduce((sum, item) => sum + item.adSpend, 0);
  const totalRevenue = madeBackData.reduce((sum, item) => sum + item.revenue, 0);
  const totalROI = Math.round((totalRevenue / totalAdSpend) * 100);
  const totalNewFollowers = newFollowersData.reduce((sum, item) => sum + item.followerGain, 0);

  // Get current values based on timeframe
  const getCurrentChatRevenue = () => {
    switch (currentTimeframe) {
      case 'daily':
        return 94800;
      case 'weekly':
        return 94800 * 7; // Approximate weekly
      case 'monthly':
        return 94800 * 30; // Approximate monthly
      default:
        return 94800;
    }
  };

  const getCurrentProfit = () => {
    switch (currentTimeframe) {
      case 'daily':
        return 72250;
      case 'weekly':
        return 72250 * 7; // Approximate weekly
      case 'monthly':
        return 72250 * 30; // Approximate monthly
      default:
        return 72250;
    }
  };

  // Get goal progress for current timeframe
  const getGoalProgress = (type: 'chatting' | 'profit') => {
    const current = type === 'chatting' ? getCurrentChatRevenue() : getCurrentProfit();
    const goalData = performanceGoals[currentTimeframe as keyof typeof performanceGoals];
    
    if (!goalData) return undefined;
    
    const target = type === 'chatting' ? goalData.chattingRevenueGoal : goalData.profitGoal;
    
    return {
      current,
      target,
      timeframe: currentTimeframe as 'daily' | 'weekly' | 'monthly',
      enabled: goalData.enabled
    };
  };

  return (
    <div className="space-y-2 pb-20">
      {/* Header - Updated title */}
      <div className="flex items-center justify-between mb-3">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-gradient-primary">
            Command Center
          </h1>
          <p className="text-[rgb(var(--muted-foreground))] text-lg">
            Daily revenue operations • Real-time monetization intelligence
          </p>
        </div>
      </div>

      {/* PRIMARY BLOCKS - Hero Revenue Metrics */}
      <div className="grid grid-cols-12 gap-2 mb-3">
        {/* Total Chat Revenue Today - Hero Card with Collapsible Table and Goal Progress */}
        <div className="col-span-6">
          <CollapsibleStatsCard
            title="TOTAL CHAT REVENUE TODAY"
            value="94,800"
            subtitle="Celkem za dnešek vypinkáno v chatu"
            icon={DollarSign}
            variant="gold"
            hasSparkline={true}
            currency="CZK"
            tableData={chatRevenueTableData}
            tableColumns={['Chatter', 'Amount Today', 'Time Worked']}
            goalProgress={getGoalProgress('chatting')}
            renderTableRow={(item) => (
              <>
                <td className="px-2 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                      {item.chatter.charAt(0)}
                    </div>
                    <span className="text-[rgb(var(--foreground))]">{item.chatter}</span>
                  </div>
                </td>
                <td className="px-2 py-2 text-green-400 font-bold">{item.amountToday.toLocaleString()} <span className="text-xs opacity-80">CZK</span></td>
                <td className="px-2 py-2 text-[rgb(var(--foreground))] font-bold">{item.timeWorked}h</td>
              </>
            )}
          />
        </div>
        
        {/* Subscription Money Today - With Collapsible Table */}
        <div className="col-span-3">
          <CollapsibleStatsCard
            title="SUBSCRIPTION MONEY TODAY"
            value="31,175"
            subtitle="Fanvue subscriptions only"
            icon={CreditCard}
            variant="primary"
            currency="CZK"
            tableData={subscriptionData}
            tableColumns={['Model', 'Amount']}
            renderTableRow={(item) => (
              <>
                <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.model}</td>
                <td className="px-2 py-2 text-green-400 font-bold">{item.amount.toLocaleString()} <span className="text-xs opacity-80">CZK</span></td>
              </>
            )}
          />
        </div>
        
        {/* Today's Total Profit - With Updated Collapsible Table and Goal Progress */}
        <div className="col-span-3">
          <CollapsibleStatsCard
            title="TODAY'S TOTAL PROFIT"
            value="72,250"
            subtitle="After ad spend + costs"
            icon={TrendingUp}
            variant="crimson"
            currency="CZK"
            tableData={profitData}
            tableColumns={['Category', 'Type', 'Amount (CZK)']}
            goalProgress={getGoalProgress('profit')}
            renderTableRow={(item) => (
              <>
                <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.category}</td>
                <td className="px-2 py-2">
                  <span className={cn(
                    'inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium',
                    item.type === 'Income' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  )}>
                    {item.type}
                  </span>
                </td>
                <td className="px-2 py-2 font-bold">
                  <span className={item.type === 'Income' ? 'text-green-400' : 'text-red-400'}>
                    {item.amount.toLocaleString()} <span className="text-xs opacity-80">CZK</span>
                  </span>
                </td>
              </>
            )}
          />
        </div>
      </div>

      {/* SUPPORTING BLOCKS - Adjusted Widths */}
      <div className="grid grid-cols-12 gap-2 mb-3">
        {/* Last 60 Minutes - With Table */}
        <div className="col-span-3">
          <CollapsibleStatsCard
            title="LAST 60 MINUTES"
            value="6,175"
            subtitle="Revenue generated last hour"
            icon={Zap}
            variant="primary"
            currency="CZK"
            tableData={last60MinutesData}
            tableColumns={['Operator', 'Amount']}
            renderTableRow={(item) => (
              <>
                <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.operator}</td>
                <td className="px-2 py-2 text-green-400 font-bold">{item.amount.toLocaleString()} <span className="text-xs opacity-80">CZK</span></td>
              </>
            )}
          />
        </div>
        
        {/* Top Transaction - With Table */}
        <div className="col-span-3">
          <CollapsibleStatsCard
            title="TOP TRANSACTION"
            value="25,000"
            subtitle="Highest single payment today"
            icon={Crown}
            variant="gold"
            currency="CZK"
            tableData={topTransactionData}
            tableColumns={['Client', 'Operator', 'Amount', 'Channel']}
            renderTableRow={(item) => (
              <>
                <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.client}</td>
                <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.operator}</td>
                <td className="px-2 py-2 text-green-400 font-bold">{item.amount.toLocaleString()} <span className="text-xs opacity-80">CZK</span></td>
                <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.channel}</td>
              </>
            )}
          />
        </div>
        
        {/* Daily Customers - Increased Width */}
        <div className="col-span-4">
          <CollapsibleStatsCard
            title="DNEŠNÍ ZÁKAZNÍCI"
            value="47"
            subtitle="Unique clients who paid today"
            icon={Users}
            variant="primary"
            tableData={dailyCustomersData}
            tableColumns={['Client', 'Total Today', 'Operator', 'Model']}
            renderTableRow={(item) => (
              <>
                <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.client}</td>
                <td className="px-2 py-2 text-green-400 font-bold">{item.totalToday.toLocaleString()} <span className="text-xs opacity-80">CZK</span></td>
                <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.operator}</td>
                <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.model}</td>
              </>
            )}
          />
        </div>
        
        {/* Average Transaction Value - Reduced Width */}
        <div className="col-span-2">
          <CollapsibleStatsCard
            title="AVG. VALUE"
            value="2,025"
            subtitle="today's avg. client's value"
            icon={BarChart3}
            variant="primary"
            currency="CZK"
          />
        </div>
      </div>

      {/* Enhanced Activity Feed Section - Increased Height */}
      <div className="grid grid-cols-12 gap-2 mb-4">
        <div className="col-span-12">
          <div className="glow-card p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[rgb(var(--foreground))] uppercase tracking-wider">
                  ACTIVITY FEED
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] text-sm">
                  Transaction management • Real-time payment stream
                </p>
              </div>
            </div>
            {/* Enhanced table with increased height and frozen header */}
            <div className="h-80 overflow-y-auto">
              <EnhancedActivityFeed 
                currentTimeframe={currentTimeframe}
                selectedOperator={selectedOperators.length > 0 ? selectedOperators[0] : 'all'}
                enableCheckboxes={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chatter Performance and Model Revenue - Same Row */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        {/* Chatter Performance Table - Wider */}
        <div className="col-span-8">
          <ChatterPerformanceTable />
        </div>

        {/* Model Revenue Breakdown - Narrower */}
        <div className="col-span-4">
          <ModelRevenueBreakdown />
        </div>
      </div>

      {/* FB PAGES ANALYTICS Section - ALL CARDS SAME WIDTH (col-span-2.4 = 5 cards) */}
      <div className="space-y-2 mb-4">
        <h2 className="text-xl font-bold text-gradient-primary flex items-center space-x-2">
          <MessageSquare className="w-5 h-5" />
          <span>FB PAGES ANALYTICS</span>
        </h2>
        
        <div className="grid grid-cols-10 gap-2">
          {/* Total Ad Spend - FIRST POSITION - col-span-2 */}
          <div className="col-span-2">
            <CollapsibleStatsCard
              title="TOTAL AD SPEND"
              value={totalAdSpend.toLocaleString()}
              subtitle="Celkové náklady na reklamu dnes"
              icon={DollarSign}
              variant="crimson"
              currency="CZK"
              tableData={adSpendData}
              tableColumns={['Model', 'Ad Spend (CZK)', 'Return (CZK)']}
              renderTableRow={(item) => (
                <>
                  <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.model}</td>
                  <td className="px-2 py-2 text-red-400 font-bold">{item.adSpend.toLocaleString()} <span className="text-xs opacity-80">CZK</span></td>
                  <td className="px-2 py-2 text-green-400 font-bold">{item.return.toLocaleString()} <span className="text-xs opacity-80">CZK</span></td>
                </>
              )}
            />
          </div>

          {/* Average Response Time - col-span-2 */}
          <div className="col-span-2">
            <CollapsibleStatsCard
              title="AVG. RESPONSE TIME"
              value="1.3 min"
              subtitle="Průměrný čas na odpověď (FB)"
              icon={Clock}
              variant="primary"
              tableData={responseTimeData}
              tableColumns={['Model', 'Response Time (min)']}
              renderTableRow={(item) => (
                <>
                  <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.model}</td>
                  <td className="px-2 py-2 text-blue-400 font-bold">{item.responseTime} min</td>
                </>
              )}
            />
          </div>
          
          {/* New Chats - col-span-2 */}
          <div className="col-span-2">
            <CollapsibleStatsCard
              title="NEW CHATS"
              value="47"
              subtitle="Unique chat threads initiated today"
              icon={MessageCircle}
              variant="primary"
              tableData={newChatsData}
              tableColumns={['Model', 'New Chats']}
              renderTableRow={(item) => (
                <>
                  <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.model}</td>
                  <td className="px-2 py-2 text-green-400 font-bold">{item.newChats}</td>
                </>
              )}
            />
          </div>
          
          {/* Chat to Payment Conversion - col-span-2 */}
          <div className="col-span-2">
            <CollapsibleStatsCard
              title="CHAT → PAYMENT RATE"
              value="23.4%"
              subtitle="Dnešní míra konverze z chatu na platbu"
              icon={Target}
              variant="gold"
              tableData={conversionRateData}
              tableColumns={['Model', 'Conversion Rate (%)']}
              renderTableRow={(item) => (
                <>
                  <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.model}</td>
                  <td className="px-2 py-2 text-[rgb(var(--sunset-gold))] font-bold">{item.conversionRate}%</td>
                </>
              )}
            />
          </div>

          {/* Made Back - LAST POSITION - col-span-2 */}
          <div className="col-span-2">
            <CollapsibleStatsCard
              title="MADE BACK"
              value={`${totalROI}%`}
              subtitle="ROI z reklamních výdajů"
              icon={TrendingUp}
              variant="gold"
              tableData={madeBackData}
              tableColumns={['Model', 'Revenue (CZK)', 'ROI (%)']}
              renderTableRow={(item) => (
                <>
                  <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.model}</td>
                  <td className="px-2 py-2 text-green-400 font-bold">{item.revenue.toLocaleString()} <span className="text-xs opacity-80">CZK</span></td>
                  <td className="px-2 py-2 text-[rgb(var(--sunset-gold))] font-bold">{item.roi}%</td>
                </>
              )}
            />
          </div>
        </div>
      </div>

      {/* FANVUE ANALYTICS Section - NEW FOLLOWERS MOVED TO FIRST POSITION */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gradient-primary flex items-center space-x-2">
          <Crown className="w-5 h-5" />
          <span>FANVUE ANALYTICS</span>
        </h2>
        
        <div className="grid grid-cols-12 gap-4">
          {/* NEW FOLLOWERS - MOVED TO FIRST POSITION */}
          <div className="col-span-4">
            <CollapsibleStatsCard
              title="NEW FOLLOWERS"
              value={totalNewFollowers.toString()}
              subtitle="Nový follower gain dnes"
              icon={Users}
              variant="primary"
              tableData={newFollowersData}
              tableColumns={['Model', 'Follower Gain Today']}
              renderTableRow={(item) => (
                <>
                  <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.model}</td>
                  <td className="px-2 py-2 text-blue-400 font-bold">+{item.followerGain}</td>
                </>
              )}
            />
          </div>

          {/* New Subscribers Today - MOVED TO SECOND POSITION */}
          <div className="col-span-4">
            <CollapsibleStatsCard
              title="NEW SUBSCRIBERS TODAY"
              value="18"
              subtitle="Noví subs za dnešek"
              icon={Plus}
              variant="primary"
              tableData={newSubscribersData}
              tableColumns={['Model', '# of New Subscribers']}
              renderTableRow={(item) => (
                <>
                  <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.model}</td>
                  <td className="px-2 py-2 text-green-400 font-bold">{item.subscribers}</td>
                </>
              )}
            />
          </div>
          
          {/* Lost Subscribers Today - MOVED TO THIRD POSITION */}
          <div className="col-span-4">
            <CollapsibleStatsCard
              title="LOST SUBSCRIBERS TODAY"
              value="4"
              subtitle="Kolik lidí jsme dnes ztratili (unsub)"
              icon={MinusIcon}
              variant="crimson"
              tableData={lostSubscribersData}
              tableColumns={['Model', '# of Lost Subscribers']}
              renderTableRow={(item) => (
                <>
                  <td className="px-2 py-2 text-[rgb(var(--foreground))]">{item.model}</td>
                  <td className="px-2 py-2 text-red-400 font-bold">{item.subscribers}</td>
                </>
              )}
            />
          </div>
        </div>
      </div>

      {/* AI Analytics Panel */}
      <AIAnalyticsPanel 
        isOpen={showAIPanel}
        onClose={() => setShowAIPanel(false)}
      />

      {/* Payment Notification */}
      <Notification
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        payment={currentPayment}
      />

      {/* Floating Controls - Bottom Center with Multi-Select Support */}
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