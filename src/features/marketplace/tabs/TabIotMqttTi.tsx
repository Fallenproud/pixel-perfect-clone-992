
import React from 'react';
import { AGENTS } from '../data';
import Grid, { EmptyState } from '../Grid';
import AgentCard from '../AgentCard';

const TabIotMqttTi: React.FC = () => {
  const items = AGENTS.filter(a => a.kind === 'iot-mqtt-ti');
  
  if (!items.length) {
    return <EmptyState title="No IoT/MQTT/TI Agents yet" cta="Create Agent" />;
  }

  return (
    <Grid>
      {items.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </Grid>
  );
};

export default TabIotMqttTi;
