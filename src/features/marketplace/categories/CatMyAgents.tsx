
import React from 'react';
import { AGENTS } from '../data';
import Grid, { EmptyState } from '../Grid';
import AgentCard from '../AgentCard';

const CatMyAgents: React.FC = () => {
  const items = AGENTS.filter(a => a.category === 'My Agents');
  
  if (!items.length) {
    return <EmptyState title="No My Agents yet" cta="Create Agent" />;
  }

  return (
    <Grid>
      {items.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </Grid>
  );
};

export default CatMyAgents;
