
import React from 'react';
import { AGENTS } from '../data';
import Grid, { EmptyState } from '../Grid';
import AgentCard from '../AgentCard';

const CatIotAutomation: React.FC = () => {
  const items = AGENTS.filter(a => a.category === 'IoT & Automation');
  
  if (!items.length) {
    return <EmptyState title="No IoT & Automation Agents yet" cta="Create Agent" />;
  }

  return (
    <Grid>
      {items.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </Grid>
  );
};

export default CatIotAutomation;
