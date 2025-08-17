
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Bot, Globe, GitBranch, Clock, FileText } from 'lucide-react';
import { WorkflowNode } from '../../stores/workflowStore';

const nodeIcons = {
  agent: Bot,
  api: Globe,
  condition: GitBranch,
  timer: Clock,
  output: FileText,
};

const nodeColors = {
  agent: 'bg-blue-500/20 border-blue-500/50',
  api: 'bg-purple-500/20 border-purple-500/50',
  condition: 'bg-amber-500/20 border-amber-500/50',
  timer: 'bg-teal-500/20 border-teal-500/50',
  output: 'bg-emerald-500/20 border-emerald-500/50',
};

const statusColors = {
  idle: '',
  running: 'ring-2 ring-blue-400 ring-opacity-75 animate-pulse',
  success: 'ring-2 ring-green-400 ring-opacity-75',
  error: 'ring-2 ring-red-400 ring-opacity-75',
};

export default function CustomWorkflowNode({ data, type }: NodeProps<WorkflowNode>) {
  const Icon = nodeIcons[type as keyof typeof nodeIcons];
  const colorClass = nodeColors[type as keyof typeof nodeColors];
  const statusClass = statusColors[data.status || 'idle'];

  const isCondition = type === 'condition';

  return (
    <div className={`
      relative rounded-lg border-2 p-4 min-w-[120px] text-center backdrop-blur-sm transition-all
      ${colorClass} ${statusClass}
      ${isCondition ? 'transform rotate-45' : ''}
    `}>
      {!isCondition && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 !bg-white/80 !border-2 !border-gray-400"
        />
      )}
      
      {isCondition && (
        <>
          <Handle
            type="target"
            position={Position.Left}
            className="w-3 h-3 !bg-white/80 !border-2 !border-gray-400"
          />
          <Handle
            id="yes"
            type="source"
            position={Position.Top}
            className="w-3 h-3 !bg-green-400 !border-2 !border-green-600"
          />
          <Handle
            id="no"
            type="source"
            position={Position.Bottom}
            className="w-3 h-3 !bg-red-400 !border-2 !border-red-600"
          />
        </>
      )}

      <div className={`flex flex-col items-center space-y-2 ${isCondition ? 'transform -rotate-45' : ''}`}>
        <Icon className="w-6 h-6" />
        <span className="text-sm font-medium text-white">{data.label}</span>
      </div>

      {!isCondition && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 !bg-white/80 !border-2 !border-gray-400"
        />
      )}
    </div>
  );
}
