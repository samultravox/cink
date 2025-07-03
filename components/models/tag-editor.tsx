'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagEditorProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  getTagColor: (tag: string) => string;
}

const commonTags = [
  'Soft Dom', 'Dominant', 'Brat', 'Playful', 'Sweet', 'Innocent',
  'Mean Bitch', 'Findom', 'Mysterious', 'Artistic', 'Premium',
  'Luxury', 'Girl Next Door', 'Teasing', 'Nurturing', 'Intellectual'
];

export function TagEditor({ tags, onTagsChange, getTagColor }: TagEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTag, setNewTag] = useState('');

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const addNewTag = () => {
    if (newTag.trim()) {
      addTag(newTag.trim());
      setNewTag('');
    }
  };

  if (!isEditing) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
                getTagColor(tag)
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 rounded-md bg-[rgba(var(--velvet-gray),0.3)] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
          title="Edit tags"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-3 rounded-lg bg-[rgba(var(--velvet-gray),0.2)] border border-[rgba(var(--neon-orchid),0.1)]">
      {/* Current Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              'inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border',
              getTagColor(tag)
            )}
          >
            <span>{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="hover:text-red-400"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      {/* Quick Add Common Tags */}
      <div>
        <div className="text-xs text-[rgb(var(--muted-foreground))] mb-2">Quick Add:</div>
        <div className="flex flex-wrap gap-1">
          {commonTags.filter(tag => !tags.includes(tag)).map((tag) => (
            <button
              key={tag}
              onClick={() => addTag(tag)}
              className="px-2 py-1 rounded-full text-xs font-medium bg-[rgba(var(--velvet-gray),0.3)] text-[rgb(var(--muted-foreground))] border border-[rgba(var(--velvet-gray),0.5)] hover:bg-[rgba(var(--neon-orchid),0.2)] hover:text-[rgb(var(--neon-orchid))] hover:border-[rgba(var(--neon-orchid),0.3)] transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Tag Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Create custom tag..."
          className="flex-1 px-3 py-1 rounded-lg bg-[rgba(var(--velvet-gray),0.5)] border border-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--foreground))] text-sm focus:outline-none focus:border-[rgba(var(--neon-orchid),0.5)]"
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNewTag())}
        />
        <button
          onClick={addNewTag}
          className="px-2 py-1 rounded-lg bg-[rgba(var(--neon-orchid),0.2)] text-[rgb(var(--neon-orchid))] border border-[rgba(var(--neon-orchid),0.3)] hover:bg-[rgba(var(--neon-orchid),0.3)] transition-all duration-200"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Done Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsEditing(false)}
          className="px-3 py-1 rounded-lg bg-gradient-to-r from-[rgb(var(--neon-orchid))] to-[rgb(var(--crimson))] text-white text-sm font-medium hover:scale-105 transition-all duration-200"
        >
          Done
        </button>
      </div>
    </div>
  );
}