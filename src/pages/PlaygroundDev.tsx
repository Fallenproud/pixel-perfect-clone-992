
import React, { useState, useRef, useEffect } from 'react';
import { card, pill, accent } from '@/components/Design';
import { 
  Send, 
  Save, 
  Download, 
  Settings, 
  Bot,
  User,
  Circle,
  Copy,
  Play,
  RotateCcw,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'error' | 'warning';
  message: string;
}

interface RequestHistory {
  id: string;
  timestamp: Date;
  request: any;
  response: any;
  latency: number;
  status: 'success' | 'error';
}

const PlaygroundDev = () => {
  const [requestJson, setRequestJson] = useState(`{
  "input": "Hello agent, how can you help me today?",
  "parameters": {
    "temperature": 0.7,
    "max_tokens": 1000,
    "stream": true
  },
  "context": {
    "user_id": "dev_user_123",
    "session_id": "session_abc"
  }
}`);

  const [responseData, setResponseData] = useState<any>(null);
  const [responseFormat, setResponseFormat] = useState<'json' | 'pretty' | 'table'>('json');
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 30000),
      level: 'info',
      message: 'Agent initialized successfully'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 15000),
      level: 'info',
      message: 'Connection established to GPT-4 model'
    }
  ]);
  const [activeLogTab, setActiveLogTab] = useState<'logs' | 'events' | 'errors'>('logs');
  const [history, setHistory] = useState<RequestHistory[]>([]);
  const [selectedPreset, setSelectedPreset] = useState('chat');
  const [codeFormat, setCodeFormat] = useState<'curl' | 'nodejs' | 'python'>('curl');
  const [latency, setLatency] = useState(245);
  const [tokensUsed, setTokensUsed] = useState(156);

  const logsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const presets = {
    chat: {
      name: 'Chat Agent',
      payload: `{
  "input": "Hello agent, how can you help me today?",
  "parameters": {
    "temperature": 0.7,
    "max_tokens": 1000,
    "stream": true
  }
}`
    },
    file: {
      name: 'File Processing',
      payload: `{
  "input": "Analyze this document",
  "file": {
    "name": "document.pdf",
    "type": "application/pdf",
    "size": 2048576
  },
  "parameters": {
    "analysis_type": "summary"
  }
}`
    },
    workflow: {
      name: 'Workflow Execution',
      payload: `{
  "workflow_id": "wf_123",
  "input": {
    "data": "Process this information",
    "steps": ["validate", "process", "output"]
  },
  "parameters": {
    "async": true
  }
}`
    }
  };

  const handleSendRequest = async () => {
    setIsLoading(true);
    
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      level: 'info',
      message: 'Sending request to agent...'
    };
    setLogs(prev => [...prev, newLog]);

    // Simulate API call
    setTimeout(() => {
      const mockResponse = {
        success: true,
        data: {
          response: "Hello! I'm an AI assistant ready to help you with various tasks. I can help with coding, writing, analysis, and much more. What would you like to work on today?",
          tokens_used: Math.floor(Math.random() * 200) + 50,
          model: "gpt-4",
          latency_ms: Math.floor(Math.random() * 500) + 100
        },
        metadata: {
          request_id: "req_" + Date.now(),
          timestamp: new Date().toISOString(),
          agent_id: "agent_gpt4_001"
        }
      };

      setResponseData(mockResponse);
      setLatency(mockResponse.data.latency_ms);
      setTokensUsed(mockResponse.data.tokens_used);
      
      const historyEntry: RequestHistory = {
        id: Date.now().toString(),
        timestamp: new Date(),
        request: JSON.parse(requestJson),
        response: mockResponse,
        latency: mockResponse.data.latency_ms,
        status: 'success'
      };
      setHistory(prev => [historyEntry, ...prev]);

      const successLog: LogEntry = {
        id: (Date.now() + 1).toString(),
        timestamp: new Date(),
        level: 'info',
        message: `Request completed successfully in ${mockResponse.data.latency_ms}ms`
      };
      setLogs(prev => [...prev, successLog]);
      
      setIsLoading(false);
    }, 1500);
  };

  const loadPreset = (presetKey: string) => {
    setSelectedPreset(presetKey);
    setRequestJson(presets[presetKey as keyof typeof presets].payload);
  };

  const generateCodeSnippet = () => {
    const parsedRequest = JSON.parse(requestJson);
    
    switch (codeFormat) {
      case 'curl':
        return `curl -X POST "https://api.agent-platform.com/v1/chat" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '${JSON.stringify(parsedRequest, null, 2)}'`;
      
      case 'nodejs':
        return `const response = await fetch('https://api.agent-platform.com/v1/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify(${JSON.stringify(parsedRequest, null, 2)})
});

const data = await response.json();
console.log(data);`;
      
      case 'python':
        return `import requests
import json

url = "https://api.agent-platform.com/v1/chat"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}

payload = ${JSON.stringify(parsedRequest, null, 2)}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(data)`;
      
      default:
        return '';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    const copyLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      level: 'info',
      message: 'Code snippet copied to clipboard'
    };
    setLogs(prev => [...prev, copyLog]);
  };

  const formatResponse = (data: any) => {
    switch (responseFormat) {
      case 'json':
        return <pre className="text-sm text-foreground overflow-auto">{JSON.stringify(data, null, 2)}</pre>;
      case 'pretty':
        return (
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-emerald-400 font-medium">Response:</span>
              <p className="mt-1 text-foreground">{data?.data?.response}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10">
              <div>
                <span className="text-muted-foreground">Tokens:</span>
                <span className="ml-2 text-foreground">{data?.data?.tokens_used}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Model:</span>
                <span className="ml-2 text-foreground">{data?.data?.model}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Latency:</span>
                <span className="ml-2 text-foreground">{data?.data?.latency_ms}ms</span>
              </div>
              <div>
                <span className="text-muted-foreground">Request ID:</span>
                <span className="ml-2 text-foreground font-mono text-xs">{data?.metadata?.request_id}</span>
              </div>
            </div>
          </div>
        );
      case 'table':
        return (
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-2 text-muted-foreground">Property</th>
                  <th className="text-left p-2 text-muted-foreground">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="p-2 text-emerald-400">response</td>
                  <td className="p-2 text-foreground">{data?.data?.response}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-2 text-emerald-400">tokens_used</td>
                  <td className="p-2 text-foreground">{data?.data?.tokens_used}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-2 text-emerald-400">model</td>
                  <td className="p-2 text-foreground">{data?.data?.model}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-2 text-emerald-400">latency_ms</td>
                  <td className="p-2 text-foreground">{data?.data?.latency_ms}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Bar */}
      <div className={`${card} m-6 mb-0 p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Developer Playground</h1>
              <p className="text-sm text-muted-foreground">Test and debug agent interactions</p>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-2 h-2 text-emerald-400 fill-current" />
              <span className="text-sm text-emerald-400">Online</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className={`${pill} flex items-center`}>
              <RotateCcw className="w-4 h-4 mr-2" />
              New Session
            </button>
            <button className={`${pill} flex items-center`}>
              <Save className="w-4 h-4 mr-2" />
              Save Config
            </button>
            <button className={`${pill} flex items-center`}>
              <Download className="w-4 h-4 mr-2" />
              Export to Code
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex gap-6 p-6 pt-4 min-h-0">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Request Editor Panel */}
          <ResizablePanel defaultSize={30} minSize={25}>
            <div className={`${card} h-full flex flex-col`}>
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-foreground">Request Editor</h3>
                  <select
                    value={selectedPreset}
                    onChange={(e) => loadPreset(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded px-3 py-1 text-sm text-foreground"
                  >
                    <option value="chat">Chat Agent</option>
                    <option value="file">File Processing</option>
                    <option value="workflow">Workflow</option>
                  </select>
                </div>
              </div>
              
              <div className="flex-1 p-4">
                <textarea
                  value={requestJson}
                  onChange={(e) => setRequestJson(e.target.value)}
                  className="w-full h-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-foreground font-mono resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder="Enter JSON request..."
                />
              </div>
              
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleSendRequest}
                  disabled={isLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-colors"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Request
                    </>
                  )}
                </button>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Response Viewer Panel */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className={`${card} h-full flex flex-col`}>
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground">Response Viewer</h3>
                  <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
                    {(['json', 'pretty', 'table'] as const).map((format) => (
                      <button
                        key={format}
                        onClick={() => setResponseFormat(format)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors capitalize ${
                          responseFormat === format
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-auto">
                {responseData ? (
                  formatResponse(responseData)
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No response yet</p>
                      <p className="text-xs mt-1">Send a request to see the response</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Code Generator */}
              {responseData && (
                <div className="border-t border-white/10 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Code Export</span>
                    <div className="flex space-x-1">
                      {(['curl', 'nodejs', 'python'] as const).map((format) => (
                        <button
                          key={format}
                          onClick={() => setCodeFormat(format)}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            codeFormat === format
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {format === 'nodejs' ? 'Node.js' : format.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <pre className="bg-black/20 border border-white/10 rounded p-3 text-xs text-foreground overflow-auto max-h-32 font-mono">
                      {generateCodeSnippet()}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(generateCodeSnippet())}
                      className="absolute top-2 right-2 p-1 bg-white/10 hover:bg-white/20 rounded text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Logs & Tools Panel */}
          <ResizablePanel defaultSize={30} minSize={25}>
            <div className={`${card} h-full flex flex-col`}>
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-foreground">Logs & Debug</h3>
                  <button className={`${pill} flex items-center text-xs`}>
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </button>
                </div>
                <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
                  {(['logs', 'events', 'errors'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveLogTab(tab)}
                      className={`flex-1 py-1 px-2 rounded text-sm font-medium transition-colors capitalize ${
                        activeLogTab === tab
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-auto">
                <div className="space-y-2">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start space-x-2 text-xs">
                      <div className="text-muted-foreground mt-0.5">
                        {log.level === 'info' && <Circle className="w-2 h-2 text-blue-400 fill-current" />}
                        {log.level === 'error' && <AlertCircle className="w-2 h-2 text-red-400 fill-current" />}
                        {log.level === 'warning' && <AlertCircle className="w-2 h-2 text-yellow-400 fill-current" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">
                            {log.timestamp.toLocaleTimeString()}
                          </span>
                          <span className={`px-1 rounded text-xs ${
                            log.level === 'info' ? 'bg-blue-500/20 text-blue-300' :
                            log.level === 'error' ? 'bg-red-500/20 text-red-300' :
                            'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {log.level.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-foreground mt-1">{log.message}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              </div>

              {/* Request History */}
              {history.length > 0 && (
                <div className="border-t border-white/10 p-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Recent Requests</h4>
                  <div className="space-y-1 max-h-32 overflow-auto">
                    {history.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 bg-white/5 rounded text-xs cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => setRequestJson(JSON.stringify(item.request, null, 2))}
                      >
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span className="text-foreground">
                            {item.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <span className="text-muted-foreground">{item.latency}ms</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <div className="border-t border-white/10 bg-black/20 px-6 py-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Agent ID: agent_gpt4_001</span>
            <span>Status: Ready</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Latency: {latency}ms</span>
            <span>Tokens Used: {tokensUsed}</span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundDev;
