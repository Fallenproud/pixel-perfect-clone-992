
import React, { useState } from 'react';
import { card, pill, accent } from '@/components/Design';
import { Upload, Copy, MessageCircle } from 'lucide-react';

const WebChatbotCreator = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, title: 'Branding', completed: false },
    { id: 2, title: 'Behavior', completed: false },
    { id: 3, title: 'Knowledge', completed: false },
    { id: 4, title: 'Embed', completed: false },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Branding */}
          <div className={`${card} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${activeStep === 1 ? accent : 'text-foreground'}`}>
                1. Branding
              </h2>
              <button
                onClick={() => setActiveStep(1)}
                className={`${pill} ${activeStep === 1 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : ''}`}
              >
                Edit
              </button>
            </div>
            {activeStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Chatbot Name</label>
                  <input
                    type="text"
                    defaultValue="Support Assistant"
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
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Theme Color</label>
                  <input
                    type="color"
                    defaultValue="#10b981"
                    className="w-16 h-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Behavior */}
          <div className={`${card} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${activeStep === 2 ? accent : 'text-foreground'}`}>
                2. Behavior
              </h2>
              <button
                onClick={() => setActiveStep(2)}
                className={`${pill} ${activeStep === 2 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : ''}`}
              >
                Edit
              </button>
            </div>
            {activeStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">System Prompt</label>
                  <textarea
                    defaultValue="You are a helpful customer support assistant. Be friendly, professional, and concise in your responses."
                    className="w-full h-24 px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tone</label>
                  <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Casual</option>
                    <option>Formal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Guardrails</label>
                  <textarea
                    placeholder="Define what the chatbot should not do..."
                    className="w-full h-20 px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Knowledge */}
          <div className={`${card} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${activeStep === 3 ? accent : 'text-foreground'}`}>
                3. Knowledge
              </h2>
              <button
                onClick={() => setActiveStep(3)}
                className={`${pill} ${activeStep === 3 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : ''}`}
              >
                Edit
              </button>
            </div>
            {activeStep === 3 && (
              <div className="space-y-4">
                <button className={`${pill} border-dashed border-2 w-full py-8 flex flex-col items-center justify-center`}>
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Upload knowledge files</span>
                </button>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-sm text-foreground">FAQ.pdf</span>
                    <span className="text-xs text-muted-foreground">2.1 MB</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-sm text-foreground">product-guide.docx</span>
                    <span className="text-xs text-muted-foreground">1.8 MB</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Embed */}
          <div className={`${card} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${activeStep === 4 ? accent : 'text-foreground'}`}>
                4. Embed
              </h2>
              <button
                onClick={() => setActiveStep(4)}
                className={`${pill} ${activeStep === 4 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : ''}`}
              >
                Edit
              </button>
            </div>
            {activeStep === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Embed Code</label>
                  <div className="relative">
                    <pre className="bg-gray-900 p-4 rounded-lg text-xs text-gray-300 overflow-x-auto">
{`<script src="https://cdn.chatbot.com/widget.js"></script>
<script>
  window.ChatBot.init({
    id: 'your-chatbot-id',
    theme: 'dark'
  });
</script>`}
                    </pre>
                    <button className={`${pill} absolute top-2 right-2 flex items-center`}>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:col-span-1">
          <div className={`${card} p-6 sticky top-6`}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Live Preview</h2>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Support Assistant</div>
                  <div className="text-xs text-gray-500">Online</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-900">
                  Hi! How can I help you today?
                </div>
                <div className="bg-emerald-500 text-white rounded-lg p-3 text-sm ml-8">
                  I need help with my account
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-900">
                  I'd be happy to help you with your account. What specific issue are you experiencing?
                </div>
              </div>
              <div className="mt-4 flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  disabled
                />
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-r-lg">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebChatbotCreator;
