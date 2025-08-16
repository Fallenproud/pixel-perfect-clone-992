
import React, { useState } from 'react';
import { card, pill, accent } from '@/components/Design';
import { Book, Video, FileText, MessageCircle, ExternalLink } from 'lucide-react';

const Insights = () => {
  const [activeTab, setActiveTab] = useState('docs');

  const tabs = [
    { id: 'docs', label: 'Docs', icon: <Book className="w-4 h-4" /> },
    { id: 'tutorials', label: 'Tutorials', icon: <Video className="w-4 h-4" /> },
    { id: 'releases', label: 'Release Notes', icon: <FileText className="w-4 h-4" /> },
    { id: 'community', label: 'Community', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const featuredContent = [
    {
      title: 'Getting Started with Agents',
      description: 'Learn how to create your first AI agent in under 10 minutes.',
      type: 'Tutorial',
      category: 'docs'
    },
    {
      title: 'Advanced Flow Building',
      description: 'Master complex workflows and decision trees.',
      type: 'Guide',
      category: 'docs'
    },
    {
      title: 'API Integration Best Practices',
      description: 'Connect your agents with external services efficiently.',
      type: 'Documentation',
      category: 'docs'
    },
    {
      title: 'Building a Customer Support Bot',
      description: 'Step-by-step video tutorial for creating support agents.',
      type: 'Video',
      category: 'tutorials'
    },
    {
      title: 'Version 2.1 Release',
      description: 'New features: improved workflows, better API integration.',
      type: 'Release',
      category: 'releases'
    },
    {
      title: 'Community Showcase',
      description: 'Amazing agents built by our community members.',
      type: 'Community',
      category: 'community'
    },
  ];

  const filteredContent = featuredContent.filter(item => 
    activeTab === 'docs' && ['Tutorial', 'Guide', 'Documentation'].includes(item.type) ||
    activeTab === 'tutorials' && item.type === 'Video' ||
    activeTab === 'releases' && item.type === 'Release' ||
    activeTab === 'community' && item.type === 'Community'
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Insights & Help</h1>
        <p className="text-muted-foreground">Documentation, tutorials, and community resources.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            {tab.icon}
            <span className="ml-2">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Featured Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item, index) => (
          <div key={index} className={`${card} p-6 cursor-pointer group`}>
            <div className="flex items-start justify-between mb-3">
              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                item.type === 'Tutorial' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                item.type === 'Guide' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                item.type === 'Documentation' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                item.type === 'Video' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                item.type === 'Release' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              }`}>
                {item.type}
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-emerald-300 transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Contact Support CTA */}
      <div className={`${card} p-8 text-center`}>
        <h2 className="text-xl font-semibold text-foreground mb-2">Need More Help?</h2>
        <p className="text-muted-foreground mb-6">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90 text-base px-6 py-3`}>
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Insights;
