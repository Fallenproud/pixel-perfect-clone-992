
import { create } from 'zustand';
import { Node, Edge, addEdge, Connection, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from '@xyflow/react';

export interface WorkflowNode extends Node {
  type: 'agent' | 'api' | 'condition' | 'timer' | 'output';
  data: {
    label: string;
    config?: Record<string, any>;
    status?: 'idle' | 'running' | 'success' | 'error';
  };
}

export interface LogEntry {
  id: string;
  timestamp: string;
  nodeId: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

interface WorkflowStore {
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNode: WorkflowNode | null;
  isRunning: boolean;
  currentStep: string | null;
  logs: LogEntry[];
  
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  setSelectedNode: (node: WorkflowNode | null) => void;
  updateNodeConfig: (nodeId: string, config: Record<string, any>) => void;
  addLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  runWorkflow: () => Promise<void>;
  addNode: (type: WorkflowNode['type'], position: { x: number; y: number }) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  isRunning: false,
  currentStep: null,
  logs: [],

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as WorkflowNode[],
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  setSelectedNode: (node) => set({ selectedNode: node }),

  updateNodeConfig: (nodeId, config) => {
    const { nodes } = get();
    const updatedNodes = nodes.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, config: { ...node.data.config, ...config } } }
        : node
    );
    set({ nodes: updatedNodes });
  },

  addLog: (entry) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      ...entry,
    };
    set(state => ({ logs: [...state.logs, newLog] }));
  },

  clearLogs: () => set({ logs: [] }),

  addNode: (type, position) => {
    const { nodes } = get();
    const nodeLabels = {
      agent: 'Agent',
      api: 'API Call',
      condition: 'Condition',
      timer: 'Timer',
      output: 'Output'
    };

    const newNode: WorkflowNode = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: {
        label: nodeLabels[type],
        config: {},
        status: 'idle'
      },
    };

    set({ nodes: [...nodes, newNode] });
  },

  runWorkflow: async () => {
    const { nodes, addLog, clearLogs } = get();
    
    set({ isRunning: true });
    clearLogs();
    
    // Simple execution simulation
    for (const node of nodes) {
      set({ currentStep: node.id });
      
      // Update node status
      const updatedNodes = get().nodes.map(n => 
        n.id === node.id 
          ? { ...n, data: { ...n.data, status: 'running' as const } }
          : n
      );
      set({ nodes: updatedNodes });

      addLog({
        nodeId: node.id,
        message: `Executing ${node.data.label}...`,
        type: 'info'
      });

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock success/failure
      const success = Math.random() > 0.2; // 80% success rate
      const finalNodes = get().nodes.map(n => 
        n.id === node.id 
          ? { ...n, data: { ...n.data, status: success ? 'success' as const : 'error' as const } }
          : n
      );
      set({ nodes: finalNodes });

      addLog({
        nodeId: node.id,
        message: success ? `${node.data.label} completed successfully` : `${node.data.label} failed`,
        type: success ? 'success' : 'error'
      });

      if (!success) break;
    }

    set({ isRunning: false, currentStep: null });
  },
}));
