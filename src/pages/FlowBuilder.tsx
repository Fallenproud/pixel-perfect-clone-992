
import React, { useState } from 'react';
import { card, pill, accent } from '@/components/Design';
import { Save } from 'lucide-react';

const FlowBuilder = () => {
  const [selectedNode, setSelectedNode] = useState('Chat Agent');

  const nodeTypes = [
    'Chat Agent', 'File Agent', 'Knowledge Base', 'Tool Call', 
    'Webhook', 'LangChain', 'Decision', 'Output'
  ];

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Node Palette */}
        <div className="col-span-2">
          <div className={`${card} p-4 h-full`}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Node Palette</h2>
            <div className="space-y-2">
              {nodeTypes.map((nodeType) => (
                <div
                  key={nodeType}
                  className={`${pill} cursor-pointer ${selectedNode === nodeType ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : ''}`}
                  onClick={() => setSelectedNode(nodeType)}
                >
                  {nodeType}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="col-span-7">
          <div className={`${card} h-full p-4`}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Flow Canvas</h2>
            <div className="relative h-full bg-gradient-to-br from-gray-900/20 to-gray-800/20 rounded-lg border border-white/10 overflow-hidden">
              {/* Grid background */}
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}></div>

              {/* Sample Flow */}
              <div className="absolute inset-4 flex items-center justify-center">
                <div className="flex items-center space-x-8">
                  <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 text-center">
                    <div className="text-sm font-medium text-blue-300">Input</div>
                  </div>
                  <div className="w-8 h-px bg-white/30"></div>
                  <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-4 text-center">
                    <div className="text-sm font-medium text-emerald-300">Chat Agent</div>
                  </div>
                  <div className="w-8 h-px bg-white/30"></div>
                  <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4 text-center">
                    <div className="text-sm font-medium text-purple-300">Tool Call</div>
                  </div>
                  <div className="w-8 h-px bg-white/30"></div>
                  <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-4 text-center">
                    <div className="text-sm font-medium text-orange-300">Output</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Node Editor */}
        <div className="col-span-3">
          <div className={`${card} p-4 h-full`}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Node Editor</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Node Name</label>
                <input
                  type="text"
                  value={selectedNode}
                  onChange={(e) => setSelectedNode(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Parameters</label>
                <textarea
                  placeholder="Node configuration..."
                  className="w-full h-32 px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                />
              </div>

              <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90 w-full flex items-center justify-center`}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowBuilder;
