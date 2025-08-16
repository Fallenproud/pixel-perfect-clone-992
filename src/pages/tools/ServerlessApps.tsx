
import React from 'react';
import { card, pill, accent } from '@/components/Design';
import { Plus, Eye, Settings, Globe, Activity } from 'lucide-react';

const ServerlessApps = () => {
  const functions = [
    { name: 'user-authentication', runtime: 'Node.js 18', lastDeploy: '2 hours ago', status: 'OK' },
    { name: 'data-processor', runtime: 'Python 3.9', lastDeploy: '1 day ago', status: 'OK' },
    { name: 'email-sender', runtime: 'Node.js 18', lastDeploy: '3 days ago', status: 'Warning' },
    { name: 'image-optimizer', runtime: 'Go 1.19', lastDeploy: '1 week ago', status: 'OK' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Serverless Applications</h1>
          <p className="text-muted-foreground">Deploy and manage your serverless functions.</p>
        </div>
        
        <div className="flex gap-2">
          <button className={`${pill} flex items-center`}>
            <Plus className="w-4 h-4 mr-2" />
            Create Function
          </button>
          <button className={`${pill} flex items-center`}>
            <Eye className="w-4 h-4 mr-2" />
            View Logs
          </button>
          <button className={`${pill} flex items-center`}>
            <Settings className="w-4 h-4 mr-2" />
            Set Env Vars
          </button>
          <button className={`${pill} flex items-center`}>
            <Globe className="w-4 h-4 mr-2" />
            Domains
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Functions Table */}
        <div className="lg:col-span-2">
          <div className={card}>
            <div className="p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-foreground">Functions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Runtime</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Deploy</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {functions.map((func, index) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-foreground">{func.name}</div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{func.runtime}</td>
                      <td className="p-4 text-sm text-muted-foreground">{func.lastDeploy}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          func.status === 'OK' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                          func.status === 'Warning' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                          'bg-red-500/10 text-red-400 border border-red-500/30'
                        }`}>
                          {func.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Logs Stream */}
        <div className="lg:col-span-1">
          <div className={`${card} h-96`}>
            <div className="p-4 border-b border-white/10 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-emerald-400" />
              <h2 className="text-lg font-semibold text-foreground">Live Logs</h2>
            </div>
            <div className="p-4 h-full overflow-y-auto">
              <div className="space-y-2 text-xs font-mono">
                <div className="text-muted-foreground">
                  <span className="text-emerald-400">[INFO]</span> Function deployed successfully
                </div>
                <div className="text-muted-foreground">
                  <span className="text-blue-400">[DEBUG]</span> Processing request: POST /api/users
                </div>
                <div className="text-muted-foreground">
                  <span className="text-emerald-400">[INFO]</span> Response sent: 200 OK
                </div>
                <div className="text-muted-foreground">
                  <span className="text-yellow-400">[WARN]</span> Rate limit approaching
                </div>
                <div className="text-muted-foreground">
                  <span className="text-emerald-400">[INFO]</span> Cold start: 120ms
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerlessApps;
