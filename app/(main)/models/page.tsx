'use client';

import { useState, useMemo } from 'react';
import { ModelCard } from '@/components/models/model-card';
import { AddModelModal } from '@/components/models/add-model-modal';
import { WorkTimeTracker } from '@/components/stream/work-time-tracker';
import { 
  Crown, 
  Users,
  Plus,
  Edit3
} from 'lucide-react';

// Mock model data with persona → distribution split (all metrics removed)
const modelsData = [
  {
    id: 1,
    name: 'Isabella',
    assignedOperator: {
      name: 'Sarah Chen',
      avatar: 'SC'
    },
    personalityTags: ['Soft Dom', 'Nurturing', 'Premium'],
    story: 'Isabella is the sophisticated older sister figure who knows exactly what her clients need. She specializes in premium content and high-value interactions, maintaining an air of elegance while being approachable. Her content focuses on luxury lifestyle and intimate conversations that make clients feel valued and understood.',
    todayActivity: 'Recording premium custom content for VIP subscribers and hosting exclusive live session',
    contentLink: 'https://drive.google.com/folder/isabella-content',
    channels: [
      {
        id: 1,
        name: 'Isabella Fanvue',
        platform: 'Fanvue',
        assignedOperator: 'Sarah Chen',
        isActive: true
      },
      {
        id: 2,
        name: 'Isabella FB Page',
        platform: 'Facebook',
        assignedOperator: 'Sarah Chen',
        isActive: true
      },
      {
        id: 3,
        name: 'Isabella WhatsApp',
        platform: 'WhatsApp',
        assignedOperator: 'Sarah Chen',
        isActive: true
      }
    ]
  },
  {
    id: 2,
    name: 'Natalie',
    assignedOperator: {
      name: 'Emma Rodriguez',
      avatar: 'ER'
    },
    personalityTags: ['Brat', 'Playful', 'Teasing'],
    story: 'Natalie embodies the perfect bratty girlfriend experience. She\'s playful, demanding, and knows how to keep her audience on their toes. Her content ranges from cute and innocent to demanding and spoiled, creating an addictive dynamic that keeps clients coming back for more attention and validation.',
    todayActivity: 'Live streaming session and responding to fan messages with bratty energy',
    contentLink: 'https://drive.google.com/folder/natalie-content',
    channels: [
      {
        id: 4,
        name: 'Natalie Fanvue',
        platform: 'Fanvue',
        assignedOperator: 'Emma Rodriguez',
        isActive: true
      },
      {
        id: 5,
        name: 'Natalie Personal FB',
        platform: 'Facebook',
        assignedOperator: 'Emma Rodriguez',
        isActive: true
      },
      {
        id: 6,
        name: 'Natalie Telegram',
        platform: 'Telegram',
        assignedOperator: 'Emma Rodriguez',
        isActive: false
      }
    ]
  },
  {
    id: 3,
    name: 'Sophia',
    assignedOperator: {
      name: 'Luna Park',
      avatar: 'LP'
    },
    personalityTags: ['Mean Bitch', 'Dominant', 'Findom'],
    story: 'Sophia is the ultimate financial dominatrix who doesn\'t take any nonsense. She specializes in financial domination and humiliation content, attracting clients who crave her harsh but addictive treatment. Her content is premium-priced and exclusive, targeting high-value clients who appreciate her dominant personality.',
    todayActivity: 'Creating findom content and managing high-value tributes from devoted subs',
    contentLink: 'https://drive.google.com/folder/sophia-content',
    channels: [
      {
        id: 7,
        name: 'Sophia Fanvue',
        platform: 'Fanvue',
        assignedOperator: 'Luna Park',
        isActive: true
      },
      {
        id: 8,
        name: 'Sophia Private FB',
        platform: 'Facebook',
        assignedOperator: 'Luna Park',
        isActive: true
      }
    ]
  },
  {
    id: 4,
    name: 'Luna',
    assignedOperator: {
      name: 'Alex Kim',
      avatar: 'AK'
    },
    personalityTags: ['Sweet', 'Innocent', 'Girl Next Door'],
    story: 'Luna represents the perfect girl-next-door fantasy. She\'s sweet, innocent, and relatable, making her audience feel like they\'re talking to their dream girlfriend. Her content focuses on everyday life with intimate moments that create a genuine connection with her audience.',
    todayActivity: 'Filming casual day-in-the-life content and chatting with regulars about their day',
    contentLink: 'https://drive.google.com/folder/luna-content',
    channels: [
      {
        id: 9,
        name: 'Luna Fanvue',
        platform: 'Fanvue',
        assignedOperator: 'Alex Kim',
        isActive: true
      },
      {
        id: 10,
        name: 'Luna FB Page',
        platform: 'Facebook',
        assignedOperator: 'Alex Kim',
        isActive: true
      },
      {
        id: 11,
        name: 'Luna Instagram',
        platform: 'Instagram',
        assignedOperator: 'Alex Kim',
        isActive: false
      }
    ]
  },
  {
    id: 5,
    name: 'Aria',
    assignedOperator: {
      name: 'Maya Singh',
      avatar: 'MS'
    },
    personalityTags: ['Mysterious', 'Artistic', 'Intellectual'],
    story: 'Aria is the mysterious artist who captivates through intellect and creativity. She creates thought-provoking content that combines sensuality with artistic expression, attracting clients who appreciate depth and sophistication in their interactions.',
    todayActivity: 'Working on artistic photo series and engaging in philosophical discussions with clients',
    contentLink: 'https://drive.google.com/folder/aria-content',
    channels: [
      {
        id: 12,
        name: 'Aria Fanvue',
        platform: 'Fanvue',
        assignedOperator: 'Maya Singh',
        isActive: true
      },
      {
        id: 13,
        name: 'Aria Private Chat',
        platform: 'WhatsApp',
        assignedOperator: 'Maya Singh',
        isActive: true
      }
    ]
  }
];

export default function Models() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandChannels, setExpandChannels] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [models, setModels] = useState(modelsData);
  const [timeBonus, setTimeBonus] = useState(288); // 144 minutes * 2 CZK = 288 CZK

  // Update model story
  const updateModelStory = (modelId: number, newStory: string) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, story: newStory }
        : model
    ));
  };

  // Update today activity
  const updateTodayActivity = (modelId: number, newActivity: string) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, todayActivity: newActivity }
        : model
    ));
  };

  // Update personality tags
  const updatePersonalityTags = (modelId: number, newTags: string[]) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, personalityTags: newTags }
        : model
    ));
  };

  // Update content link
  const updateContentLink = (modelId: number, newLink: string) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, contentLink: newLink }
        : model
    ));
  };

  // Update assigned operator
  const updateAssignedOperator = (modelId: number, newOperator: { name: string; avatar: string }) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, assignedOperator: newOperator }
        : model
    ));
  };

  // Toggle channel active status
  const toggleChannelStatus = (modelId: number, channelId: number) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? {
            ...model,
            channels: model.channels.map(channel =>
              channel.id === channelId
                ? { ...channel, isActive: !channel.isActive }
                : channel
            )
          }
        : model
    ));
  };

  // Add new channel
  const addChannel = (modelId: number, newChannel: any) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? {
            ...model,
            channels: [...model.channels, { ...newChannel, id: Date.now() }]
          }
        : model
    ));
  };

  // Remove channel
  const removeChannel = (modelId: number, channelId: number) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? {
            ...model,
            channels: model.channels.filter(channel => channel.id !== channelId)
          }
        : model
    ));
  };

  // Add new model
  const addModel = (newModel: any) => {
    const model = {
      ...newModel,
      id: Date.now(),
      channels: newModel.channels.map((channel: any, index: number) => ({
        ...channel,
        id: Date.now() + index
      }))
    };
    setModels(prev => [...prev, model]);
  };

  // Delete model
  const deleteModel = (modelId: number) => {
    setModels(prev => prev.filter(model => model.id !== modelId));
  };

  const handleTimeUpdate = (totalMinutes: number, bonusAmount: number) => {
    setTimeBonus(bonusAmount);
  };

  // Simple search filter (no sorting by metrics)
  const filteredModels = useMemo(() => {
    let filtered = [...models];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(model =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.personalityTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        model.channels.some(channel => channel.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort alphabetically by default
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  }, [searchQuery, models]);

  // Calculate basic stats (non-monetary)
  const totalModels = models.length;
  const totalChannels = models.reduce((sum, model) => sum + model.channels.length, 0);
  const activeChannels = models.reduce((sum, model) => sum + model.channels.filter(c => c.isActive).length, 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Header - Enhanced with Edit Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-gradient-primary">
            Elite Model Directory
          </h1>
          <p className="text-[rgb(var(--muted-foreground))] text-lg">
            AI persona management and content creation • Strategic command matrix
          </p>
        </div>
        
        {/* Stats and Controls */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[rgb(var(--foreground))]">{totalModels}</div>
              <div className="text-xs text-[rgb(var(--muted-foreground))]">Models</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{activeChannels}/{totalChannels}</div>
              <div className="text-xs text-[rgb(var(--muted-foreground))]">Active Channels</div>
            </div>
          </div>

          {/* Edit Mode Toggle */}
          <button
            onClick={() => setEditMode(!editMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              editMode
                ? 'bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white shadow-lg'
                : 'bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] hover:bg-[rgba(var(--velvet-gray),0.7)]'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>{editMode ? 'Exit Edit Mode' : 'Edit Mode'}</span>
          </button>
        </div>
      </div>

      {/* Search and Add Model */}
      <div className="flex items-center justify-between mb-6">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-3 rounded-lg bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)] focus:bg-[rgba(var(--velvet-gray),0.7)] transition-all duration-200"
          />
        </div>

        {/* Add Model Button - Only show in edit mode */}
        {editMode && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white font-medium hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Model</span>
          </button>
        )}
      </div>

      {/* Models Grid - Clean Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            expandChannels={expandChannels}
            editMode={editMode}
            onUpdateStory={updateModelStory}
            onUpdateTodayActivity={updateTodayActivity}
            onUpdatePersonalityTags={updatePersonalityTags}
            onUpdateContentLink={updateContentLink}
            onUpdateAssignedOperator={updateAssignedOperator}
            onToggleChannelStatus={toggleChannelStatus}
            onAddChannel={addChannel}
            onRemoveChannel={removeChannel}
            onDeleteModel={deleteModel}
          />
        ))}
      </div>
      
      {/* Empty State */}
      {filteredModels.length === 0 && (
        <div className="text-center py-12">
          <Crown className="w-16 h-16 text-[rgb(var(--muted-foreground))] mx-auto mb-4 opacity-50" />
          <div className="text-[rgb(var(--muted-foreground))] text-lg mb-2">No models found</div>
          <div className="text-[rgb(var(--muted-foreground))] text-sm">Try adjusting your search</div>
        </div>
      )}

      {/* Add Model Modal */}
      <AddModelModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddModel={addModel}
      />

      {/* Controls - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        {/* Channel Expansion Toggle */}
        <button
          onClick={() => setExpandChannels(!expandChannels)}
          className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[rgba(var(--neon-orchid),0.2)] to-[rgba(var(--crimson),0.2)] border border-[rgba(var(--neon-orchid),0.3)] text-[rgb(var(--foreground))] hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">
            {expandChannels ? 'Hide Channels' : 'Show Channels'}
          </span>
        </button>
      </div>

      {/* Fixed Timer in Bottom Right */}
      <WorkTimeTracker 
        onTimeUpdate={handleTimeUpdate} 
        showInline={false} 
      />
    </div>
  );
}