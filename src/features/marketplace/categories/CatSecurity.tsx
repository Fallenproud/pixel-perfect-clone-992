
import React from 'react';
import { AGENTS } from '../data';
import Grid, { EmptyState } from '../Grid';
import AgentCard from '../AgentCard';

const CatSecurity: React.FC = () => {
  const items = AGENTS.filter(a => a.category === 'Security');
  
  if (!items.length) {
    return <EmptyState title="No Security Agents yet" cta="Create Agent" />;
  }

  return (
    <Grid>
      {items.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </Grid>
  );
};

export default CatSecurity;
