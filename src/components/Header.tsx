
import React from 'react';
import { Search, Plus } from 'lucide-react';

export const Header = () => {
  const tabs = [
    'All', 'Chat Agents', 'File Agents', 'Knowledge Based Agents', 
    'IoT/MQTT/TI Agents', 'Presets', 'Workflows'
  ];

  const filters = [
    'My Agents', 'General', 'Collaboration', 'Data & Analytics', 
    'Customer Support', 'IoT & Automation', 'Research & Insights', 
    'Finance', 'HR', 'Marketing', 'Health', 'Web3', 'Supply Chain', 
    'Security', 'Religious'
  ];

  return (
    <div className="bg-background border-b border-border">
      <div className="px-6 py-6">
        {/* Search and Create Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Explore the platform..."
                className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>
          <button className="ml-6 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Agent
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-4xl">
          Discover and create custom versions of OnDemand that combine instructions, extra knowledge, and any combination of skills.
        </p>

        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`text-sm font-medium pb-3 border-b-2 transition-all duration-200 whitespace-nowrap ${
                index === 0 
                  ? 'text-primary border-primary' 
                  : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={`text-xs px-3 py-2 rounded-lg border transition-all duration-200 hover:scale-105 ${
                index === 0
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-muted text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground hover:border-accent'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-end mt-6">
          <button className="text-sm text-primary hover:text-primary/80 hover:underline transition-all font-medium">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
