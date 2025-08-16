
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
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Explore the platform..."
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <button className="ml-4 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create Agent
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Discover and create custom versions of OnDemand that combine instructions, extra knowledge, and any combination of skills.
        </p>

        <div className="flex space-x-6 mb-4">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                index === 0 
                  ? 'text-primary border-primary' 
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                index === 0
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-right">
            <button className="text-sm text-primary hover:underline">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};
