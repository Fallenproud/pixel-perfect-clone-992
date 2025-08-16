
import React from 'react';
import { ChevronDown, ChevronRight, Settings } from 'lucide-react';

const SidebarSection = ({ title, items, isExpanded = true }: { title: string; items: string[]; isExpanded?: boolean }) => {
  const [expanded, setExpanded] = React.useState(isExpanded);

  return (
    <div className="mb-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center w-full px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
      >
        {expanded ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
        {title}
      </button>
      {expanded && (
        <div className="ml-6 space-y-1">
          {items.map((item) => (
            <div key={item} className="flex items-center px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md cursor-pointer transition-colors">
              <div className="w-2 h-2 rounded-full bg-sidebar-foreground/40 mr-3"></div>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div className="w-48 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-black text-xs font-bold">T</span>
          </div>
          <div>
            <h1 className="text-sm font-medium text-sidebar-foreground">Agent Marketplace</h1>
            <p className="text-xs text-sidebar-foreground/60">How to use</p>
          </div>
        </div>
        <button className="w-full bg-sidebar-primary text-sidebar-primary-foreground text-sm py-2 px-3 rounded-md hover:bg-sidebar-primary/90 transition-colors">
          Go to Agent Marketplace
        </button>
      </div>

      <div className="flex-1 p-2 overflow-y-auto">
        <SidebarSection 
          title="Tools & Deployment" 
          items={['Bring Your Own', 'Serverless Applications', 'Cloud Services', 'API Key Management', 'Storage']}
        />
        <SidebarSection 
          title="Insights & Help" 
          items={['Overview', 'My Agents', 'Playground', 'Agent Flow Builder', 'Web Chatbot Creator']}
        />
      </div>

      <div className="p-3 border-t border-sidebar-border">
        <button className="flex items-center w-full px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </button>
      </div>
    </div>
  );
};
