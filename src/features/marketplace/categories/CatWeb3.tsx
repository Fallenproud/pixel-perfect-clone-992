
import React from 'react';
import { AGENTS } from '../data';
import Grid, { EmptyState } from '../Grid';
import AgentCard from '../AgentCard';

const CatWeb3: React.FC = () => {
  const items = AGENTS.filter(a => a.category === 'Web3');
  
  if (!items.length) {
    return <EmptyState title="No Web3 Agents yet" cta="Create Agent" />;
  }

  return (
    <Grid>
      {items.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </Grid>
  );
};

export default CatWeb3;
