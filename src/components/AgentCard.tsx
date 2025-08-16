
import React from 'react';
import { Star, MessageSquare, Plus, X } from 'lucide-react';

interface AgentCardProps {
  title: string;
  creator: string;
  category: string;
  rating: number;
  iconBg: string;
  iconColor: string;
  icon: string;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  title,
  creator,
  category,
  rating,
  iconBg,
  iconColor,
  icon
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-8 h-8 rounded-md ${iconBg} flex items-center justify-center`}>
          <span className={`text-sm font-medium ${iconColor}`}>{icon}</span>
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-muted rounded">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-muted rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="font-medium text-card-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground mb-2">By {creator}</p>
      <p className="text-xs text-muted-foreground mb-3">Category: {category}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
        <div className="flex space-x-1">
          <button className="p-1.5 border border-border rounded hover:bg-muted transition-colors">
            <MessageSquare className="w-3 h-3" />
          </button>
          <button className="p-1.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
