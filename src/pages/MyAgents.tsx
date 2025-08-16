
import React, { useState } from 'react';
import { card, pill, accent } from '@/components/Design';
import { Search, Plus, Edit, Copy, Trash2, Star } from 'lucide-react';

const MyAgents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const agents = [
    { name: 'Customer Support Bot', category: 'Customer Support', lastUpdated: '2 hours ago', stars: 4.8, status: 'Active' },
    { name: 'Data Analyzer', category: 'Data & Analytics', lastUpdated: '1 day ago', stars: 4.5, status: 'Active' },
    { name: 'Lead Generator', category: 'Marketing', lastUpdated: '3 days ago', stars: 4.2, status: 'Draft' },
    { name: 'Content Writer', category: 'General', lastUpdated: '1 week ago', stars: 4.9, status: 'Archived' },
    { name: 'Email Assistant', category: 'General', lastUpdated: '2 weeks ago', stars: 4.3, status: 'Active' },
  ];

  const statusOptions = ['All', 'Draft', 'Active', 'Archived'];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search my agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all w-64"
            />
          </div>
          
          <div className="flex gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`${pill} ${statusFilter === status ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : ''}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90 flex items-center`}>
          <Plus className="w-4 h-4 mr-2" />
          New Agent
        </button>
      </div>

      {/* Table */}
      <div className={card}>
        {filteredAgents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Updated</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Stars</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent, index) => (
                  <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-foreground">{agent.name}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          agent.status === 'Active' ? 'bg-green-500/10 text-green-400' :
                          agent.status === 'Draft' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-gray-500/10 text-gray-400'
                        }`}>
                          {agent.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{agent.category}</td>
                    <td className="p-4 text-sm text-muted-foreground">{agent.lastUpdated}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className={`text-sm ${accent}`}>{agent.stars}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-white/10 rounded transition-colors">
                          <Edit className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </button>
                        <button className="p-1 hover:bg-white/10 rounded transition-colors">
                          <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </button>
                        <button className="p-1 hover:bg-white/10 rounded transition-colors">
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No agents found</h3>
            <p className="text-muted-foreground mb-4">Create your first agent to get started.</p>
            <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90`}>
              <Plus className="w-4 h-4 mr-2" />
              Create Agent
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAgents;
