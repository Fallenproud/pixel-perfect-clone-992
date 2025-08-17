
import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useWorkflowStore, WorkflowNode } from '../../stores/workflowStore';

interface NodeConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NodeConfigDrawer({ isOpen, onClose }: NodeConfigDrawerProps) {
  const { selectedNode, updateNodeConfig } = useWorkflowStore();
  const [config, setConfig] = useState<Record<string, any>>({});

  useEffect(() => {
    if (selectedNode?.data.config) {
      setConfig(selectedNode.data.config);
    }
  }, [selectedNode]);

  if (!isOpen || !selectedNode) return null;

  const handleSave = () => {
    updateNodeConfig(selectedNode.id, config);
    onClose();
  };

  const renderConfigFields = () => {
    switch (selectedNode.type) {
      case 'agent':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-white mb-2">System Prompt</label>
              <textarea
                value={config.systemPrompt || ''}
                onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
                className="w-full h-32 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white resize-none"
                placeholder="Enter system prompt..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Model</label>
              <select
                value={config.model || 'gpt-3.5-turbo'}
                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
                <option value="claude-3">Claude 3</option>
              </select>
            </div>
          </>
        );
      
      case 'api':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Endpoint URL</label>
              <input
                type="url"
                value={config.url || ''}
                onChange={(e) => setConfig({ ...config, url: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                placeholder="https://api.example.com/endpoint"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Method</label>
              <select
                value={config.method || 'GET'}
                onChange={(e) => setConfig({ ...config, method: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Headers (JSON)</label>
              <textarea
                value={config.headers || ''}
                onChange={(e) => setConfig({ ...config, headers: e.target.value })}
                className="w-full h-24 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white resize-none font-mono"
                placeholder='{"Content-Type": "application/json"}'
              />
            </div>
          </>
        );
      
      case 'condition':
        return (
          <div>
            <label className="block text-sm font-medium text-white mb-2">Condition Expression</label>
            <input
              type="text"
              value={config.expression || ''}
              onChange={(e) => setConfig({ ...config, expression: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white font-mono"
              placeholder="status === 200"
            />
          </div>
        );
      
      case 'timer':
        return (
          <div>
            <label className="block text-sm font-medium text-white mb-2">Delay (seconds)</label>
            <input
              type="number"
              value={config.delay || 1}
              onChange={(e) => setConfig({ ...config, delay: parseInt(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              min="1"
            />
          </div>
        );
      
      case 'output':
        return (
          <div>
            <label className="block text-sm font-medium text-white mb-2">Output Format</label>
            <select
              value={config.format || 'json'}
              onChange={(e) => setConfig({ ...config, format: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
            >
              <option value="json">JSON</option>
              <option value="text">Text</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        );
      
      default:
        return <div className="text-gray-400">No configuration available</div>;
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-gray-900 border-l border-gray-700 transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Configure {selectedNode.data.label}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Node Name</label>
            <input
              type="text"
              value={config.label || selectedNode.data.label}
              onChange={(e) => setConfig({ ...config, label: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
            />
          </div>
          
          {renderConfigFields()}
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Configuration</span>
        </button>
      </div>
    </div>
  );
}
