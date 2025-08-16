
import React from 'react';
import { card, accent } from '@/components/Design';
import { TrendingUp, Users, Star, Zap } from 'lucide-react';

const Overview = () => {
  const kpis = [
    { title: 'Total Agents', value: '247', change: '+12%', icon: <Users className="w-5 h-5" /> },
    { title: 'Active Workflows', value: '89', change: '+5%', icon: <Zap className="w-5 h-5" /> },
    { title: 'Avg Rating', value: '4.8', change: '+0.2', icon: <Star className="w-5 h-5" /> },
    { title: 'Deployments', value: '1,429', change: '+23%', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  const recentActivity = [
    { action: 'Agent "Customer Support Bot" deployed', time: '2 minutes ago' },
    { action: 'New workflow "Lead Generation" created', time: '1 hour ago' },
    { action: 'Agent "Data Analyzer" updated', time: '3 hours ago' },
    { action: 'User "john@company.com" invited', time: '1 day ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className={`${card} p-6`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-emerald-500/10 ${accent}`}>
                {kpi.icon}
              </div>
              <span className={`text-sm font-medium ${accent}`}>{kpi.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{kpi.value}</h3>
            <p className="text-sm text-muted-foreground">{kpi.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className={`${card} p-6`}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-start">
                <p className="text-sm text-foreground flex-1">{activity.action}</p>
                <span className="text-xs text-muted-foreground ml-4">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className={`${card} p-6`}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Insights</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <h3 className={`font-medium mb-2 ${accent}`}>Getting Started</h3>
              <p className="text-sm text-muted-foreground">Create your first agent in the playground to get started with the platform.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="font-medium mb-2 text-foreground">New Release</h3>
              <p className="text-sm text-muted-foreground">Version 2.1 includes improved workflow automation and better API integration.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
