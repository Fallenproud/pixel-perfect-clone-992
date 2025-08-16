
import React, { useState } from 'react';
import { card, pill, accent } from '@/components/Design';
import { Plus, RotateCcw, Trash2, Eye, EyeOff, Copy } from 'lucide-react';

const ApiKeys = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [revealedKeys, setRevealedKeys] = useState<number[]>([]);

  const keys = [
    { name: 'Production API', scope: 'read/write', created: '2024-01-15', lastUsed: '2 hours ago', key: 'ak_prod_1234567890abcdef' },
    { name: 'Development API', scope: 'read', created: '2024-01-10', lastUsed: '1 day ago', key: 'ak_dev_abcdef1234567890' },
    { name: 'Analytics API', scope: 'read', created: '2024-01-05', lastUsed: '3 days ago', key: 'ak_analytics_567890abcdef1234' },
  ];

  const toggleKeyVisibility = (index: number) => {
    setRevealedKeys(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">API Keys Management</h1>
          <p className="text-muted-foreground">Create and manage API keys for secure access to your agents.</p>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90 flex items-center`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Key
        </button>
      </div>

      {/* Keys Table */}
      <div className={card}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Key</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Scope</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Created</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Used</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key, index) => (
                <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-foreground">{key.name}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <code className="text-sm font-mono text-muted-foreground">
                        {revealedKeys.includes(index) ? key.key : '••••••••••••••••••••'}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(index)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        {revealedKeys.includes(index) ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition-colors">
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      key.scope === 'read/write' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                      'bg-green-500/10 text-green-400 border border-green-500/30'
                    }`}>
                      {key.scope}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{key.created}</td>
                  <td className="p-4 text-sm text-muted-foreground">{key.lastUsed}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-white/10 rounded transition-colors">
                        <RotateCcw className="w-4 h-4 text-muted-foreground hover:text-foreground" />
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
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`${card} p-6 w-full max-w-md mx-4`}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Create API Key</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Key Name</label>
                <input
                  type="text"
                  placeholder="e.g., Production API"
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Scope</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm text-foreground">Read agents</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-foreground">Write agents</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-foreground">Deploy agents</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-foreground">Manage billing</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90 flex-1`}>
                Create Key
              </button>
              <button 
                onClick={() => setShowCreateModal(false)}
                className={`${pill} flex-1`}
              >
                Cancel
              </button>
            </div>

            {/* One-time reveal area (mocked) */}
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-xs text-yellow-400 mb-2">⚠️ This key will only be shown once. Copy it now:</p>
              <code className="text-sm font-mono text-foreground bg-black/20 p-2 rounded block">
                ak_new_1234567890abcdef1234567890abcdef
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeys;
