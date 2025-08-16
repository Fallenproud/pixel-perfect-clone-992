
import React from 'react';
import { ChevronDown, ChevronRight, Settings } from 'lucide-react';

const SidebarSection = ({ title, items, isExpanded = true }: { title: string; items: string[]; isExpanded?: boolean }) => {
  const [expanded, setExpanded] = React.useState(isExpanded);

  return (
    <div className="mb-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center w-full px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors group"
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4 mr-2 transition-transform" />
        ) : (
          <ChevronRight className="w-4 h-4 mr-2 transition-transform" />
        )}
        <span className="font-medium">{title}</span>
      </button>
      {expanded && (
        <div className="ml-6 space-y-0.5 mt-1">
          {items.map((item, index) => (
            <div key={item} className="flex items-center px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md cursor-pointer transition-all duration-200 group">
              <div className="w-1.5 h-1.5 rounded-full bg-sidebar-foreground/40 mr-3 group-hover:bg-sidebar-accent-foreground/60 transition-colors"></div>
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = () => {
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
            <p className="text-xs text-sidebar-foreground/60 mt-0.5">How to use</p>
          </div>
        </div>
        <button className="w-full bg-sidebar-primary text-sidebar-primary-foreground text-sm py-2.5 px-4 rounded-md hover:bg-sidebar-primary/90 transition-colors font-medium shadow-sm">
          Go to Agent Marketplace
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 p-3 overflow-y-auto">
        <SidebarSection 
          title="Tools & Deployment" 
          items={['Bring Your Own', 'Serverless Applications', 'Cloud Services', 'API Key Management', 'Storage']}
        />
        <SidebarSection 
          title="Insights & Help" 
          items={['Overview', 'My Agents', 'Playground', 'Agent Flow Builder', 'Web Chatbot Creator']}
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
