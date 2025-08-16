
import React, { useState } from 'react';
import { card, pill, accent } from '@/components/Design';
import { Database, HardDrive, Server, Zap, Check } from 'lucide-react';

const CloudServices = () => {
  const [connectedServices, setConnectedServices] = useState<string[]>(['Vector DB']);

  const services = [
    {
      name: 'Vector DB',
      icon: <Database className="w-6 h-6" />,
      description: 'High-performance vector database for AI embeddings',
      regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1']
    },
    {
      name: 'Object Storage',
      icon: <HardDrive className="w-6 h-6" />,
      description: 'Scalable cloud storage for files and media',
      regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1']
    },
    {
      name: 'Postgres',
      icon: <Server className="w-6 h-6" />,
      description: 'Managed PostgreSQL database with auto-scaling',
      regions: ['us-east-1', 'us-west-2', 'eu-west-1']
    },
    {
      name: 'Redis',
      icon: <Zap className="w-6 h-6" />,
      description: 'In-memory data store for caching and sessions',
      regions: ['us-east-1', 'us-west-2', 'eu-west-1']
    }
  ];

  const toggleService = (serviceName: string) => {
    setConnectedServices(prev => 
      prev.includes(serviceName)
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Cloud Services</h1>
        <p className="text-muted-foreground">Provision and manage cloud infrastructure services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const isConnected = connectedServices.includes(service.name);
          
          return (
            <div key={service.name} className={`${card} p-6`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mr-3`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                    {isConnected && (
                      <div className="flex items-center text-emerald-400 text-xs mt-1">
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Region</label>
                  <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                    {service.regions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={() => toggleService(service.name)}
                  className={`${pill} w-full ${
                    isConnected 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {isConnected ? 'Configure' : 'Provision'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connected Services */}
      {connectedServices.length > 0 && (
        <div className={`${card} p-6`}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Connected Services</h2>
          <div className="space-y-3">
            {connectedServices.map((serviceName) => {
              const service = services.find(s => s.name === serviceName);
              return (
                <div key={serviceName} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mr-3">
                      {service?.icon}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{serviceName}</div>
                      <div className="text-xs text-muted-foreground">us-east-1 • Running</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mr-2`}>
                      Active
                    </span>
                    <button className={`${pill} text-xs`}>
                      Manage
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudServices;
