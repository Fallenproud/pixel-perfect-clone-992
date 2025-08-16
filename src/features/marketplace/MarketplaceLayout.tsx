
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const MarketplaceLayout: React.FC = () => {
  const location = useLocation();

  const topTabs = [
    { name: 'All', path: '/marketplace/all' },
    { name: 'Chat Agents', path: '/marketplace/chat' },
    { name: 'File Agents', path: '/marketplace/file' },
    { name: 'Knowledge Based Agents', path: '/marketplace/knowledge' },
    { name: 'IoT/MQTT/TI Agents', path: '/marketplace/iot-mqtt-ti' },
    { name: 'Presets', path: '/marketplace/presets' },
    { name: 'Workflows', path: '/marketplace/workflows' }
  ];

  const categories = [
    { name: 'My Agents', path: '/marketplace/cat/my-agents' },
    { name: 'General', path: '/marketplace/cat/general' },
    { name: 'Collaboration', path: '/marketplace/cat/collaboration' },
    { name: 'Data & Analytics', path: '/marketplace/cat/data-analytics' },
    { name: 'Customer Support', path: '/marketplace/cat/customer-support' },
    { name: 'IoT & Automation', path: '/marketplace/cat/iot-automation' },
    { name: 'Research & Insights', path: '/marketplace/cat/research-insights' },
    { name: 'Finance', path: '/marketplace/cat/finance' },
    { name: 'HR', path: '/marketplace/cat/hr' },
    { name: 'Marketing', path: '/marketplace/cat/marketing' },
    { name: 'Health', path: '/marketplace/cat/health' },
    { name: 'Web3', path: '/marketplace/cat/web3' },
    { name: 'Supply Chain', path: '/marketplace/cat/supply-chain' },
    { name: 'Security', path: '/marketplace/cat/security' },
    { name: 'Religious', path: '/marketplace/cat/religious' }
  ];

  const isActiveTab = (path: string) => location.pathname === path;
  const isActiveCategory = (path: string) => location.pathname === path;

  return (
    <div className="p-6 space-y-6">
      {/* Intro text */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Agent Marketplace</h1>
        <p className="text-muted-foreground">
          Discover and create custom versions of OnDemand AI agents tailored to your specific needs.
        </p>
      </div>

      {/* Top filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {topTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`px-3.5 py-1.5 rounded-full border border-white/10 text-sm transition-colors ${
              isActiveTab(tab.path)
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-white/5 hover:bg-white/10 text-foreground'
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Left category list */}
        <div className="w-64 flex-shrink-0">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Categories</h3>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isActiveCategory(category.path)
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceLayout;
