
import React from 'react';
import { AGENTS } from '../data';
import Grid, { EmptyState } from '../Grid';
import AgentCard from '../AgentCard';

const CatCustomerSupport: React.FC = () => {
  const items = AGENTS.filter(a => a.category === 'Customer Support');
  
  if (!items.length) {
    return <EmptyState title="No Customer Support Agents yet" cta="Create Agent" />;
  }

  return (
    <Grid>
      {items.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </Grid>
  );
};

export default CatCustomerSupport;
