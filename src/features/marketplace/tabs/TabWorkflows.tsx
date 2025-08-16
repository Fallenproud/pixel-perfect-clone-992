
import React from 'react';
import { AGENTS } from '../data';
import Grid, { EmptyState } from '../Grid';
import AgentCard from '../AgentCard';

const TabWorkflows: React.FC = () => {
  const items = AGENTS.filter(a => a.kind === 'workflow');
  
  if (!items.length) {
    return <EmptyState title="No Workflows yet" cta="Create Agent" />;
  }

  return (
    <Grid>
      {items.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </Grid>
  );
};

export default TabWorkflows;
