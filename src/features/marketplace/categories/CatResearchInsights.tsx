
import React from 'react';
import { AGENTS } from '../data';
import Grid, { EmptyState } from '../Grid';
import AgentCard from '../AgentCard';

const CatResearchInsights: React.FC = () => {
  const items = AGENTS.filter(a => a.category === 'Research & Insights');
  
  if (!items.length) {
    return <EmptyState title="No Research & Insights Agents yet" cta="Create Agent" />;
  }

  return (
    <Grid>
      {items.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </Grid>
  );
};

export default CatResearchInsights;
