
import React, { useState, useRef, useEffect } from 'react';
import { card, pill, accent } from '@/components/Design';
import { 
  Send, 
  Plus, 
  Save, 
  Download, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  Paperclip,
  RotateCcw,
  Bot,
  User,
  Circle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

const Playground = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('default');
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful AI assistant.');
  const [variables, setVariables] = useState([
    { key: 'temperature', value: '0.7' },
    { key: 'max_tokens', value: '1000' }
  ]);
  const [activeMode, setActiveMode] = useState<'chat' | 'file' | 'workflow'>('chat');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateStreaming = (content: string) => {
    const messageId = Date.now().toString();
    const words = content.split(' ');
    let currentContent = '';
    
    // Add initial empty message
    const newMessage: Message = {
      id: messageId,
      type: 'agent',
      content: '',
      timestamp: new Date(),
      isStreaming: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsStreaming(true);

    // Simulate typing effect
    words.forEach((word, index) => {
      setTimeout(() => {
        currentContent += (index === 0 ? '' : ' ') + word;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, content: currentContent, isStreaming: index < words.length - 1 }
              : msg
          )
        );
        
        if (index === words.length - 1) {
          setIsStreaming(false);
        }
      }, index * 100);
    });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate agent response
    setTimeout(() => {
      simulateStreaming(
        'That\'s a great question! Let me help you with that. Here\'s a comprehensive response that demonstrates the streaming effect and shows how longer messages would appear in the chat interface.'
      );
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 'welcome',
      type: 'agent',
      content: 'Chat cleared. How can I help you?',
      timestamp: new Date()
    }]);
  };

  const formatMessageContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1 rounded text-emerald-300">$1</code>');
  };

  const addVariable = () => {
    setVariables(prev => [...prev, { key: '', value: '' }]);
  };

  const updateVariable = (index: number, field: 'key' | 'value', value: string) => {
    setVariables(prev => 
      prev.map((variable, i) => 
        i === index ? { ...variable, [field]: value } : variable
      )
    );
  };

  const removeVariable = (index: number) => {
    setVariables(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Bar */}
      <div className={`${card} m-6 mb-0 p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">GPT-4 Assistant</h1>
              <p className="text-sm text-muted-foreground">Advanced conversational AI agent</p>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-2 h-2 text-emerald-400 fill-current" />
              <span className="text-sm text-emerald-400">Online</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className={`${pill} flex items-center`}>
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </button>
            <button className={`${pill} flex items-center`}>
              <Save className="w-4 h-4 mr-2" />
              Save Preset
            </button>
            <button className={`${pill} flex items-center`}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex gap-6 p-6 pt-4 min-h-0">
        {/* Chat Panel */}
        <div className={`flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'flex-1' : 'flex-1 lg:flex-[2]'
        }`}>
          <div className={`${card} flex-1 flex flex-col min-h-0`}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[70%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-emerald-500' 
                        : 'bg-gradient-to-br from-purple-400 to-blue-500'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-emerald-500/20 border border-emerald-500/30'
                        : 'bg-white/5 border border-white/10'
                    }`}>
                      <div 
                        className="text-sm text-foreground"
                        dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                      />
                      {message.isStreaming && (
                        <div className="flex items-center mt-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-150"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-4">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none min-h-[44px] max-h-32"
                    rows={1}
                    disabled={isStreaming}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <Paperclip className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-foreground">
                        <option>Insert Preset</option>
                        <option>Customer Support</option>
                        <option>Code Review</option>
                        <option>Creative Writing</option>
                      </select>
                    </div>
                    <button
                      onClick={clearChat}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Clear
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isStreaming}
                  className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`transition-all duration-300 ${
          sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-80 flex-shrink-0'
        }`}>
          <div className={`${card} h-full p-4 flex flex-col`}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Configuration
              </h3>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Mode Tabs */}
            <div className="flex space-x-1 mb-4 bg-white/5 rounded-lg p-1">
              {(['chat', 'file', 'workflow'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors capitalize ${
                    activeMode === mode
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Chat Mode Content */}
            {activeMode === 'chat' && (
              <div className="space-y-4 flex-1 overflow-y-auto">
                {/* Preset Selector */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preset
                  </label>
                  <select
                    value={selectedPreset}
                    onChange={(e) => setSelectedPreset(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground"
                  >
                    <option value="default">Default Assistant</option>
                    <option value="support">Customer Support</option>
                    <option value="code">Code Assistant</option>
                    <option value="creative">Creative Writer</option>
                  </select>
                </div>

                {/* System Prompt */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    System Prompt
                  </label>
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none"
                    rows={4}
                    placeholder="Enter system prompt..."
                  />
                  <button className={`${pill} mt-2 text-xs`}>
                    <Save className="w-3 h-3 mr-1" />
                    Save
                  </button>
                </div>

                {/* Variables */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">
                      Variables
                    </label>
                    <button
                      onClick={addVariable}
                      className="text-xs text-emerald-400 hover:text-emerald-300"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {variables.map((variable, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={variable.key}
                          onChange={(e) => updateVariable(index, 'key', e.target.value)}
                          placeholder="Key"
                          className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                        />
                        <input
                          type="text"
                          value={variable.value}
                          onChange={(e) => updateVariable(index, 'value', e.target.value)}
                          placeholder="Value"
                          className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                        />
                        <button
                          onClick={() => removeVariable(index)}
                          className="text-xs text-red-400 hover:text-red-300 px-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* File Mode Placeholder */}
            {activeMode === 'file' && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Paperclip className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">File upload mode</p>
                  <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
                </div>
              </div>
            )}

            {/* Workflow Mode Placeholder */}
            {activeMode === 'workflow' && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Workflow runner</p>
                  <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Collapsed Sidebar Toggle */}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="fixed right-6 top-1/2 transform -translate-y-1/2 bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-lg transition-colors z-10"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Playground;
