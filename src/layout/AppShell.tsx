import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Search, Plus, ChevronDown, ChevronRight, Settings, LayoutGrid, Bot, Play, GitBranch, MessageSquare, FileText, Cloud, Database, Lock, HelpCircle } from 'lucide-react';
import { activeBg, pill } from '@/components/Design';

export const AppShell = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const SidebarSection = ({ title, items, isExpanded = true }: { 
    title: string; 
    items: { name: string; path: string; icon: React.ReactNode }[]; 
    isExpanded?: boolean 
  }) => {
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
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 text-sm rounded-md cursor-pointer transition-all duration-200 group ${
                    isActive ? activeBg : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`
                }
              >
                <div className="w-5 h-5 mr-3 flex items-center justify-center text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground">
                  {item.icon}
                </div>
                <span className="text-sm">{item.name}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  };

  const mainNavItems = [
    { name: 'Overview', path: '/', icon: <LayoutGrid className="w-4 h-4" /> },
    { name: 'My Agents', path: '/my-agents', icon: <Bot className="w-4 h-4" /> },
    { name: 'Playground', path: '/playground', icon: <Play className="w-4 h-4" /> },
    { name: 'Dev Playground', path: '/playground-dev', icon: <Settings className="w-4 h-4" /> },
    { name: 'Agents Flow Builder', path: '/flow', icon: <GitBranch className="w-4 h-4" /> },
    { name: 'Web Chatbot Creator', path: '/chatbot', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const toolsItems = [
    { name: 'Bring Your Own', path: '/tools/byo', icon: <FileText className="w-4 h-4" /> },
    { name: 'Serverless Applications', path: '/tools/serverless', icon: <Cloud className="w-4 h-4" /> },
    { name: 'Cloud Services', path: '/tools/cloud', icon: <Cloud className="w-4 h-4" /> },
    { name: 'API Keys Management', path: '/tools/keys', icon: <Lock className="w-4 h-4" /> },
    { name: 'Storage', path: '/tools/storage', icon: <Database className="w-4 h-4" /> },
  ];

  const insightsItems = [
    { name: 'Insights & Help', path: '/insights', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 h-screen bg-sidebar border-r border-sidebar-border flex flex-col relative">
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
          <NavLink
            to="/marketplace"
            className={`w-full bg-sidebar-primary text-sidebar-primary-foreground text-sm py-2.5 px-4 rounded-md hover:bg-sidebar-primary/90 transition-colors font-medium shadow-sm flex items-center justify-center ${pill}`}
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            Go to Agent Marketplace
          </NavLink>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="mb-4">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 text-sm rounded-md cursor-pointer transition-all duration-200 group ${
                      isActive ? activeBg : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`
                  }
                >
                  <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-sm">{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
          
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
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center w-full px-3 py-2.5 text-sm rounded-md transition-colors group ${
                isActive ? activeBg : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`
            }
          >
            <Settings className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-medium">Settings</span>
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-white/10 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left side */}
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <h1 className="text-lg font-semibold text-foreground">Agent Marketplace</h1>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  How to use
                </a>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Explore the platform..."
                    className="w-80 pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center shadow-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Agent
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
