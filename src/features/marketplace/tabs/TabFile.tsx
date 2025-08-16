
import React from 'react';
import { AGENTS } from '../data';
import Grid, { EmptyState } from '../Grid';
import AgentCard from '../AgentCard';

const TabFile: React.FC = () => {
  const items = AGENTS.filter(a => a.kind === 'file');
  
  if (!items.length) {
    return <EmptyState title="No File Agents yet" cta="Create Agent" />;
  }

  return (
    <Grid>
      {items.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </Grid>
  );
};

export default TabFile;
