
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { AgentCard } from '@/components/AgentCard';

const agents = [
  { title: 'Internet Agent', creator: 'OnDemand', category: 'Data & Analytics', rating: 5.0, iconBg: 'bg-blue-500', iconColor: 'text-white', icon: '🌐' },
  { title: 'Audio Agent', creator: 'OnDemand', category: 'Data & Analytics', rating: 4.7, iconBg: 'bg-green-500', iconColor: 'text-white', icon: '🎵' },
  { title: 'Images Agent', creator: 'OnDemand', category: 'General', rating: 4.3, iconBg: 'bg-purple-500', iconColor: 'text-white', icon: '🖼️' },
  { title: 'Video Agent', creator: 'OnDemand', category: 'General', rating: 3.7, iconBg: 'bg-red-500', iconColor: 'text-white', icon: '🎥' },
  { title: 'Email Agent', creator: 'AIEQ', category: 'General', rating: 4.5, iconBg: 'bg-orange-500', iconColor: 'text-white', icon: '✉️' },
  { title: 'Youtube Agent', creator: 'OnDemand', category: 'General', rating: 3.3, iconBg: 'bg-red-600', iconColor: 'text-white', icon: '📺' },
  { title: 'Image Search agent', creator: 'Personal', category: 'General', rating: 10, iconBg: 'bg-indigo-500', iconColor: 'text-white', icon: '🔍' },
  { title: 'Water Quality Management', creator: 'PT Plaskom', category: 'Research & Insights', rating: 5.0, iconBg: 'bg-cyan-500', iconColor: 'text-white', icon: '💧' },
  { title: 'US Mutual Fund Fundamentals Agent', creator: 'AIEQ', category: 'Finance', rating: 5.0, iconBg: 'bg-green-600', iconColor: 'text-white', icon: '💰' },
  { title: 'HTTP Cat', creator: 'AIEQ', category: 'Web3', rating: 3.0, iconBg: 'bg-gray-500', iconColor: 'text-white', icon: '🐱' },
  { title: 'Salyan AI', creator: 'Personal', category: 'General', rating: 0.0, iconBg: 'bg-teal-500', iconColor: 'text-white', icon: '🤖' },
  { title: 'LinkedIn Post Agent', creator: 'Personal', category: 'Marketing', rating: 4.0, iconBg: 'bg-blue-600', iconColor: 'text-white', icon: '💼' },
  { title: 'Quran', creator: 'MT Jahanara', category: 'Religious', rating: 4.0, iconBg: 'bg-emerald-500', iconColor: 'text-white', icon: '📖' },
  { title: 'Bhagavad Gita', creator: 'MT Jahanara', category: 'Religious', rating: 4.9, iconBg: 'bg-amber-500', iconColor: 'text-white', icon: '🕉️' },
  { title: 'Stock Market News Agent', creator: 'AIEQ', category: 'Finance', rating: 5.0, iconBg: 'bg-red-500', iconColor: 'text-white', icon: '📈' },
  { title: 'Taxi Services', creator: 'Personal', category: 'General', rating: 4.5, iconBg: 'bg-yellow-500', iconColor: 'text-white', icon: '🚕' },
  { title: 'Holy Bible', creator: 'MT Jahanara', category: 'Religious', rating: 5.0, iconBg: 'bg-blue-700', iconColor: 'text-white', icon: '✝️' },
  { title: 'Coinmarketcap Agent', creator: 'AIEQ', category: 'Web3', rating: 4.0, iconBg: 'bg-orange-600', iconColor: 'text-white', icon: '₿' },
  { title: 'Spotify API agent', creator: 'Personal', category: 'Data & Analytics', rating: 5.0, iconBg: 'bg-green-500', iconColor: 'text-white', icon: '🎧' },
  { title: 'HTML Page Generator', creator: 'AIEQ', category: 'Marketing', rating: 5.0, iconBg: 'bg-purple-600', iconColor: 'text-white', icon: '🌐' }
];

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-5 gap-4">
            {agents.map((agent, index) => (
              <AgentCard key={index} {...agent} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
