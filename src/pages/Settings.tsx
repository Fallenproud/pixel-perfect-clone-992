
import React, { useState } from 'react';
import { card, pill, accent } from '@/components/Design';
import { User, Building, CreditCard, Settings as SettingsIcon, Plus, Trash2 } from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [telemetryEnabled, setTelemetryEnabled] = useState(false);

  const sections = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'organization', label: 'Organization', icon: <Building className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'preferences', label: 'Preferences', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  const members = [
    { name: 'John Doe', email: 'john@company.com', role: 'Owner', avatar: 'JD' },
    { name: 'Jane Smith', email: 'jane@company.com', role: 'Admin', avatar: 'JS' },
    { name: 'Mike Johnson', email: 'mike@company.com', role: 'Member', avatar: 'MJ' },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className={`${card} p-4`}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Settings</h2>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === section.id
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {section.icon}
                  <span className="ml-3">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile */}
          {activeSection === 'profile' && (
            <div className={`${card} p-6`}>
              <h2 className="text-lg font-semibold text-foreground mb-6">Profile Settings</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john@company.com"
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Avatar URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90`}>
                    Save Changes
                  </button>
                  <button className={pill}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Organization */}
          {activeSection === 'organization' && (
            <div className="space-y-6">
              <div className={`${card} p-6`}>
                <h2 className="text-lg font-semibold text-foreground mb-6">Invite Members</h2>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="user@company.com"
                    className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90 flex items-center`}>
                    <Plus className="w-4 h-4 mr-2" />
                    Invite
                  </button>
                </div>
              </div>

              <div className={`${card} p-6`}>
                <h2 className="text-lg font-semibold text-foreground mb-6">Team Members</h2>
                <div className="space-y-3">
                  {members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          member.role === 'Owner' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                          member.role === 'Admin' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                          'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                        }`}>
                          {member.role}
                        </span>
                        {member.role !== 'Owner' && (
                          <button className="p-1 hover:bg-white/10 rounded transition-colors">
                            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-400" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Billing */}
          {activeSection === 'billing' && (
            <div className={`${card} p-6`}>
              <h2 className="text-lg font-semibold text-foreground mb-6">Billing & Usage</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Current Plan</h3>
                    <p className={`text-xl font-bold ${accent} mb-1`}>Pro Plan</p>
                    <p className="text-sm text-muted-foreground">$29/month</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Next Invoice</h3>
                    <p className={`text-xl font-bold ${accent} mb-1`}>$29.00</p>
                    <p className="text-sm text-muted-foreground">Due Feb 15, 2024</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Usage This Month</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Agent Executions</span>
                      <span className="text-sm text-foreground">2,847 / 10,000</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90`}>
                    Upgrade Plan
                  </button>
                  <button className={pill}>
                    View Invoices
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeSection === 'preferences' && (
            <div className={`${card} p-6`}>
              <h2 className="text-lg font-semibold text-foreground mb-6">Preferences</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Dark Mode</h3>
                    <p className="text-sm text-muted-foreground">Use dark theme across the platform</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDarkMode}
                      onChange={(e) => setIsDarkMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Analytics & Telemetry</h3>
                    <p className="text-sm text-muted-foreground">Help improve the platform by sharing usage data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={telemetryEnabled}
                      onChange={(e) => setTelemetryEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div className="pt-4">
                  <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90`}>
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
