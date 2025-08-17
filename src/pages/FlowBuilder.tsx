
import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { card, pill } from '@/components/Design';
import { Play, Plus, Save, Trash2, Bot, Globe, GitBranch, Clock, FileText } from 'lucide-react';
import { useWorkflowStore } from '../stores/workflowStore';
import WorkflowNode from '../components/workflow/WorkflowNode';
import NodeConfigDrawer from '../components/workflow/NodeConfigDrawer';

const nodeTypes = {
  agent: WorkflowNode,
  api: WorkflowNode,
  condition: WorkflowNode,
  timer: WorkflowNode,
  output: WorkflowNode,
};

const FlowBuilder = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectedNode,
    setSelectedNode,
    isRunning,
    currentStep,
    logs,
    runWorkflow,
    addNode,
    clearLogs,
  } = useWorkflowStore();

  const [showConfigDrawer, setShowConfigDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState<'logs' | 'step' | 'json'>('logs');

  const nodeTypeOptions = [
    { type: 'agent', label: 'Agent', icon: Bot, color: 'text-blue-400' },
    { type: 'api', label: 'API Call', icon: Globe, color: 'text-purple-400' },
    { type: 'condition', label: 'Condition', icon: GitBranch, color: 'text-amber-400' },
    { type: 'timer', label: 'Timer', icon: Clock, color: 'text-teal-400' },
    { type: 'output', label: 'Output', icon: FileText, color: 'text-emerald-400' },
  ];

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as any);
    setShowConfigDrawer(true);
  }, [setSelectedNode]);

  const handleAddNode = (type: any) => {
    const centerPosition = { 
      x: Math.random() * 300 + 200, 
      y: Math.random() * 200 + 100 
    };
    addNode(type, centerPosition);
  };

  const onConnectHandler = useCallback((params: Connection) => {
    const edge = {
      ...params,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
      },
      style: { stroke: '#64748b', strokeWidth: 2 },
    };
    onConnect(edge);
  }, [onConnect]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'logs':
        return (
          <div className="space-y-2 h-full overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-gray-500 text-center py-8">No logs yet. Run the workflow to see execution logs.</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className={`p-2 rounded text-xs border-l-2 ${
                  log.type === 'success' ? 'bg-green-900/20 border-green-500' :
                  log.type === 'error' ? 'bg-red-900/20 border-red-500' :
                  'bg-blue-900/20 border-blue-500'
                }`}>
                  <div className="text-gray-400">{log.timestamp}</div>
                  <div className="text-white">{log.message}</div>
                </div>
              ))
            )}
          </div>
        );
      
      case 'step':
        return (
          <div className="text-center py-8">
            {currentStep ? (
              <div>
                <div className="text-blue-400 mb-2">Currently Executing:</div>
                <div className="text-white font-medium">
                  {nodes.find(n => n.id === currentStep)?.data.label || 'Unknown Step'}
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No step currently executing</div>
            )}
          </div>
        );
      
      case 'json':
        return (
          <pre className="text-xs text-gray-300 bg-gray-800 p-4 rounded overflow-auto h-full">
            {JSON.stringify({ nodes, edges }, null, 2)}
          </pre>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-gray-900/50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Workflow Runner</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => clearLogs()}
              className={`${pill} hover:bg-white/10 flex items-center space-x-2`}
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
            <button className={`${pill} hover:bg-white/10 flex items-center space-x-2`}>
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={runWorkflow}
              disabled={isRunning || nodes.length === 0}
              className={`${pill} bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
            >
              <Play className="w-4 h-4" />
              <span>{isRunning ? 'Running...' : 'Run'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnectHandler}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-950"
          >
            <Background color="#374151" size={1} />
            <Controls className="bg-gray-800 border-gray-600" />
            <MiniMap
              className="bg-gray-800 border border-gray-600"
              nodeColor="#6b7280"
              maskColor="rgba(0, 0, 0, 0.2)"
            />
          </ReactFlow>

          {/* Node Palette */}
          <div className="absolute top-4 left-4 space-y-2">
            <div className={`${card} p-3`}>
              <div className="text-sm font-medium text-white mb-3">Add Nodes</div>
              <div className="space-y-2">
                {nodeTypeOptions.map(({ type, label, icon: Icon, color }) => (
                  <button
                    key={type}
                    onClick={() => handleAddNode(type)}
                    className={`${pill} hover:bg-white/10 flex items-center space-x-2 w-full text-left`}
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 border-l border-white/10 bg-gray-900/50">
          <div className="p-4">
            <div className="flex space-x-1 mb-4">
              {[
                { id: 'logs', label: 'Logs' },
                { id: 'step', label: 'Current Step' },
                { id: 'json', label: 'Workflow JSON' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="h-96">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Node Configuration Drawer */}
      <NodeConfigDrawer
        isOpen={showConfigDrawer}
        onClose={() => setShowConfigDrawer(false)}
      />
    </div>
  );
};

export default FlowBuilder;
