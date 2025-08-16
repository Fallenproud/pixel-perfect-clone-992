
import React, { useState } from 'react';
import { card, pill } from '@/components/Design';
import { Check, Settings } from 'lucide-react';

const BringYourOwn = () => {
  const [connectedProviders, setConnectedProviders] = useState<string[]>(['OpenAI']);

  const providers = [
    { name: 'OpenAI', logo: '🤖', description: 'GPT-4, GPT-3.5, and other OpenAI models' },
    { name: 'Anthropic', logo: '🧠', description: 'Claude family of models' },
    { name: 'Google', logo: '🔍', description: 'PaLM, Gemini, and Bard models' },
    { name: 'Azure', logo: '☁️', description: 'Azure OpenAI Service' },
    { name: 'Ollama', logo: '🦙', description: 'Local model deployment' },
    { name: 'Custom', logo: '⚙️', description: 'Connect your own API endpoint' },
  ];

  const toggleConnection = (providerName: string) => {
    setConnectedProviders(prev => 
      prev.includes(providerName)
        ? prev.filter(p => p !== providerName)
        : [...prev, providerName]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Bring Your Own Models</h1>
        <p className="text-muted-foreground">Connect your own AI model providers and API endpoints.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => {
          const isConnected = connectedProviders.includes(provider.name);
          
          return (
            <div key={provider.name} className={`${card} p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{provider.logo}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{provider.name}</h3>
                    {isConnected && (
                      <div className="flex items-center text-emerald-400 text-xs">
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </div>
                    )}
                  </div>
                </div>
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{provider.description}</p>
              
              <button
                onClick={() => toggleConnection(provider.name)}
                className={`${pill} w-full ${
                  isConnected 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {isConnected ? 'Configure' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Configuration Panel */}
      {connectedProviders.length > 0 && (
        <div className={`${card} p-6`}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Configuration</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">API Key</label>
                <input
                  type="password"
                  placeholder="sk-..."
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Region</label>
                <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                  <option>us-east-1</option>
                  <option>us-west-2</option>
                  <option>eu-west-1</option>
                  <option>ap-southeast-1</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Organization ID (Optional)</label>
              <input
                type="text"
                placeholder="org-..."
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex gap-2">
              <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90`}>
                Test & Save
              </button>
              <button className={`${pill}`}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BringYourOwn;
