
import React from 'react';
import { AGENTS } from '../data';
import Grid, { EmptyState } from '../Grid';
import AgentCard from '../AgentCard';

const TabAll: React.FC = () => {
  if (!AGENTS.length) {
    return <EmptyState title="No Agents yet" cta="Create Agent" />;
  }

  return (
    <Grid>
      {AGENTS.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </Grid>
  );
};

export default TabAll;
