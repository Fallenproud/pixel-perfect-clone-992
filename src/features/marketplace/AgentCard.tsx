
import React, { useState } from 'react';
import { Star, MessageSquare, File, Plus } from 'lucide-react';
import { Agent } from './data';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddAgent = () => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Chat':
        return <MessageSquare className="w-3.5 h-3.5" />;
      case 'File':
        return <File className="w-3.5 h-3.5" />;
      case '+':
        return <Plus className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm hover:shadow-emerald-500/10 transition-shadow p-5 group cursor-pointer transform hover:-translate-y-1">
        <div className="mb-4">
          <h3 className="font-semibold text-foreground mb-2 text-sm leading-tight group-hover:text-emerald-400 transition-colors">
            {agent.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-1">By {agent.by}</p>
          <p className="text-xs text-muted-foreground">Category: {agent.category}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-emerald-400">{agent.stars}</span>
          </div>
          <div className="flex space-x-2">
            {agent.actions.map((action, index) => (
              <button
                key={index}
                onClick={action === '+' ? handleAddAgent : undefined}
                className={`p-2 rounded-lg transition-all duration-200 group/btn ${
                  action === '+'
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105 shadow-sm'
                    : 'border border-border hover:bg-muted hover:border-emerald-500/50'
                }`}
              >
                {getActionIcon(action)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center">
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">Agent Added!</h3>
            <p className="text-muted-foreground">"{agent.name}" has been added to your workspace.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentCard;
