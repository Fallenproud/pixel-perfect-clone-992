
import React from 'react';
import { ChevronDown, ChevronRight, Settings, LayoutGrid, Bot, Play, GitBranch, MessageSquare, FileText, Cloud, Database, Lock, HelpCircle } from 'lucide-react';

const SidebarSection = ({ title, items, isExpanded = true }: { title: string; items: { name: string; icon: React.ReactNode }[]; isExpanded?: boolean }) => {
  const [expanded, setExpanded] = React.useState(isExpanded);

  return (
    <div className="mb-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center w-full px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors group"
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4 mr-2 transition-transform text-sidebar-primary" />
        ) : (
          <ChevronRight className="w-4 h-4 mr-2 transition-transform text-sidebar-primary" />
        )}
        <span className="font-medium text-sidebar-primary">{title}</span>
      </button>
      {expanded && (
        <div className="ml-2 space-y-1 mt-1">
          {items.map((item) => (
            <div key={item.name} className="flex items-center px-3 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md cursor-pointer transition-all duration-200 group">
              <div className="w-5 h-5 mr-3 flex items-center justify-center text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground">
                {item.icon}
              </div>
              <span className="text-sm">{item.name}</span>
              {(item.name === 'Bring Your Own' || item.name === 'Serverless Applications' || item.name === 'Cloud Services' || item.name === 'API Keys Management') && (
                <ChevronDown className="w-4 h-4 ml-auto text-sidebar-foreground/50" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MainNavSection = ({ items }: { items: { name: string; icon: React.ReactNode }[] }) => {
  return (
    <div className="mb-4">
      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.name} className={`flex items-center px-3 py-2.5 text-sm rounded-md cursor-pointer transition-all duration-200 group ${
            item.name === 'Overview' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          }`}>
            <div className="w-5 h-5 mr-3 flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const mainNavItems = [
    { name: 'Overview', icon: <LayoutGrid className="w-4 h-4" /> },
    { name: 'My Agents', icon: <Bot className="w-4 h-4" /> },
    { name: 'Playground', icon: <Play className="w-4 h-4" /> },
    { name: 'Agents Flow Builder', icon: <GitBranch className="w-4 h-4" /> },
    { name: 'Web Chatbot Creator', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const toolsItems = [
    { name: 'Bring Your Own', icon: <FileText className="w-4 h-4" /> },
    { name: 'Serverless Applications', icon: <Cloud className="w-4 h-4" /> },
    { name: 'Cloud Services', icon: <Cloud className="w-4 h-4" /> },
    { name: 'API Keys Management', icon: <Lock className="w-4 h-4" /> },
    { name: 'Storage', icon: <Database className="w-4 h-4" /> },
  ];

  const insightsItems = [
    { name: 'Insights & Help', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col relative">
      {/* Header Section */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="text-black text-sm font-bold">T</span>
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-semibold text-sidebar-foreground leading-tight">Agent Marketplace</h1>
            <p className="text-xs text-sidebar-foreground/60 mt-0.5 flex items-center">
              <Play className="w-3 h-3 mr-1" />
              How to use
            </p>
          </div>
        </div>
        <button className="w-full bg-sidebar-primary text-sidebar-primary-foreground text-sm py-2.5 px-4 rounded-md hover:bg-sidebar-primary/90 transition-colors font-medium shadow-sm flex items-center justify-center">
          <LayoutGrid className="w-4 h-4 mr-2" />
          Go to Agent Marketplace
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 p-3 overflow-y-auto">
        <MainNavSection items={mainNavItems} />
        <SidebarSection 
          title="Tools & Deployment" 
          items={toolsItems}
        />
        <SidebarSection 
          title="Insights & Help" 
          items={insightsItems}
          isExpanded={false}
        />
      </div>

      {/* Settings Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <button className="flex items-center w-full px-3 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors group">
          <Settings className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};
