
import React, { useState } from 'react';
import { card, pill, accent } from '@/components/Design';
import { Send, Play, Save, RotateCcw, Settings } from 'lucide-react';

const Playground = () => {
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [showJson, setShowJson] = useState(false);

  const messages = [
    { role: 'user', content: 'How can I create a customer support agent?' },
    { role: 'assistant', content: 'To create a customer support agent, you can start by defining the key tasks it should handle: answering FAQs, routing tickets, and escalating complex issues. Would you like me to help you set up the initial prompt?' },
    { role: 'user', content: 'Yes, please help me with the initial prompt structure.' },
  ];

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
        {/* Left Panel - Chat Console */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          {/* Chat Messages */}
          <div className={`${card} flex-1 p-4 overflow-y-auto`}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Chat Console</h2>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-emerald-500/10 border border-emerald-500/30 ml-4' 
                    : 'bg-white/5 border border-white/10 mr-4'
                }`}>
                  <p className="text-sm text-foreground">{message.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div className={`${card} p-4`}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="w-full h-24 bg-transparent border border-white/10 rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            />
            <div className="flex gap-2 mt-3">
              <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90 flex items-center`}>
                <Send className="w-4 h-4 mr-2" />
                Send
              </button>
            </div>
          </div>

          {/* Parameters */}
          <div className={`${card} p-4`}>
            <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Parameters
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Temperature: {temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Max Tokens: {maxTokens}
                </label>
                <input
                  type="range"
                  min="100"
                  max="4000"
                  step="100"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90 flex items-center`}>
              <Play className="w-4 h-4 mr-2" />
              Run
            </button>
            <button className={`${pill} flex items-center`}>
              <Save className="w-4 h-4 mr-2" />
              Save as Agent
            </button>
            <button className={`${pill} flex items-center`}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </button>
          </div>
        </div>

        {/* Right Panel - Output */}
        <div className="lg:col-span-3 flex flex-col">
          <div className={`${card} flex-1 p-4`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Live Preview / Output</h2>
              <button
                onClick={() => setShowJson(!showJson)}
                className={`${pill} ${showJson ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : ''}`}
              >
                JSON
              </button>
            </div>

            <div className="h-full">
              {showJson ? (
                <pre className="text-sm text-muted-foreground overflow-auto">
{`{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user", 
      "content": "How can I create a customer support agent?"
    }
  ],
  "temperature": ${temperature},
  "max_tokens": ${maxTokens}
}`}
                </pre>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <h3 className={accent}>Agent Response Preview</h3>
                  <p className="text-foreground">
                    To create a customer support agent, you can start by defining the key tasks it should handle: 
                    answering FAQs, routing tickets, and escalating complex issues.
                  </p>
                  <p className="text-muted-foreground">
                    The agent will be trained on your knowledge base and can integrate with your existing support tools.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
