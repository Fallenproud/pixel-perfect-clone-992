
export interface Agent {
  id: string;
  name: string;
  by: string;
  category: string;
  kind: 'chat' | 'file' | 'knowledge' | 'iot-mqtt-ti' | 'preset' | 'workflow';
  stars: number;
  actions: ('Chat' | 'File' | '+')[];
}

export const AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Internet Agent',
    by: 'OnDemand',
    category: 'General',
    kind: 'chat',
    stars: 4.8,
    actions: ['Chat', '+']
  },
  {
    id: '2',
    name: 'Customer Support Bot',
    by: 'AIREV',
    category: 'Customer Support',
    kind: 'chat',
    stars: 4.9,
    actions: ['Chat', '+']
  },
  {
    id: '3',
    name: 'Document Analyzer',
    by: 'Personal',
    category: 'Data & Analytics',
    kind: 'file',
    stars: 4.5,
    actions: ['File', '+']
  },
  {
    id: '4',
    name: 'Knowledge Base Assistant',
    by: 'NIT Jalandhar',
    category: 'Research & Insights',
    kind: 'knowledge',
    stars: 4.7,
    actions: ['Chat', '+']
  },
  {
    id: '5',
    name: 'IoT Device Controller',
    by: 'Avengers',
    category: 'IoT & Automation',
    kind: 'iot-mqtt-ti',
    stars: 4.3,
    actions: ['Chat', '+']
  },
  {
    id: '6',
    name: 'Marketing Campaign Generator',
    by: 'OnDemand',
    category: 'Marketing',
    kind: 'preset',
    stars: 4.6,
    actions: ['Chat', '+']
  },
  {
    id: '7',
    name: 'Financial Advisor',
    by: 'AIREV',
    category: 'Finance',
    kind: 'chat',
    stars: 4.8,
    actions: ['Chat', '+']
  },
  {
    id: '8',
    name: 'HR Recruitment Assistant',
    by: 'Personal',
    category: 'HR',
    kind: 'workflow',
    stars: 4.4,
    actions: ['Chat', '+']
  },
  {
    id: '9',
    name: 'Health Symptom Checker',
    by: 'NIT Jalandhar',
    category: 'Health',
    kind: 'chat',
    stars: 4.9,
    actions: ['Chat', '+']
  },
  {
    id: '10',
    name: 'Blockchain Analytics',
    by: 'Avengers',
    category: 'Web3',
    kind: 'knowledge',
    stars: 4.2,
    actions: ['Chat', '+']
  },
  {
    id: '11',
    name: 'Supply Chain Optimizer',
    by: 'OnDemand',
    category: 'Supply Chain',
    kind: 'workflow',
    stars: 4.5,
    actions: ['Chat', '+']
  },
  {
    id: '12',
    name: 'Security Audit Bot',
    by: 'AIREV',
    category: 'Security',
    kind: 'chat',
    stars: 4.7,
    actions: ['Chat', '+']
  },
  {
    id: '13',
    name: 'Prayer Time Assistant',
    by: 'Personal',
    category: 'Religious',
    kind: 'chat',
    stars: 4.6,
    actions: ['Chat', '+']
  },
  {
    id: '14',
    name: 'Collaboration Hub',
    by: 'NIT Jalandhar',
    category: 'Collaboration',
    kind: 'workflow',
    stars: 4.3,
    actions: ['Chat', '+']
  },
  {
    id: '15',
    name: 'Data Visualization Tool',
    by: 'Avengers',
    category: 'Data & Analytics',
    kind: 'file',
    stars: 4.8,
    actions: ['File', '+']
  },
  {
    id: '16',
    name: 'Personal Assistant',
    by: 'OnDemand',
    category: 'My Agents',
    kind: 'chat',
    stars: 5.0,
    actions: ['Chat', '+']
  },
  {
    id: '17',
    name: 'Code Review Assistant',
    by: 'AIREV',
    category: 'General',
    kind: 'file',
    stars: 4.4,
    actions: ['File', '+']
  },
  {
    id: '18',
    name: 'Meeting Scheduler',
    by: 'Personal',
    category: 'Collaboration',
    kind: 'preset',
    stars: 4.5,
    actions: ['Chat', '+']
  },
  {
    id: '19',
    name: 'Smart Home Controller',
    by: 'NIT Jalandhar',
    category: 'IoT & Automation',
    kind: 'iot-mqtt-ti',
    stars: 4.6,
    actions: ['Chat', '+']
  },
  {
    id: '20',
    name: 'Research Paper Analyzer',
    by: 'Avengers',
    category: 'Research & Insights',
    kind: 'knowledge',
    stars: 4.7,
    actions: ['Chat', '+']
  }
];
