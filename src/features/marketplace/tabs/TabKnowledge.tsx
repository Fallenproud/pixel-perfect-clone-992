
import React from 'react';
import { AGENTS } from '../data';
import Grid, { EmptyState } from '../Grid';
import AgentCard from '../AgentCard';

const TabKnowledge: React.FC = () => {
  const items = AGENTS.filter(a => a.kind === 'knowledge');
  
  if (!items.length) {
    return <EmptyState title="No Knowledge Based Agents yet" cta="Create Agent" />;
  }

  return (
    <Grid>
      {items.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </Grid>
  );
};

export default TabKnowledge;
