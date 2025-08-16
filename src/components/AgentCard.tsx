
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
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group cursor-pointer transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          <span className={`text-lg ${iconColor}`}>{icon}</span>
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
            <Plus className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button>
          <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-card-foreground mb-2 text-sm leading-tight group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-xs text-muted-foreground mb-1">By {creator}</p>
      <p className="text-xs text-muted-foreground mb-4">Category: {category}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-foreground">{rating}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 border border-border rounded-lg hover:bg-muted hover:border-primary/50 transition-all duration-200 group/btn">
            <MessageSquare className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-primary" />
          </button>
          <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-sm">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
