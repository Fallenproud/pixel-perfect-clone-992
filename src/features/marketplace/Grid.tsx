
import React from 'react';

interface GridProps {
  children: React.ReactNode;
}

interface EmptyStateProps {
  title: string;
  cta: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, cta }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-16">
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-12 text-center max-w-md">
      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl text-emerald-400">+</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">Get started by creating your first agent.</p>
      <button className="px-3.5 py-1.5 rounded-full border border-white/10 bg-emerald-500 text-white hover:bg-emerald-600 text-sm transition-colors">
        {cta}
      </button>
    </div>
  </div>
);

const Grid: React.FC<GridProps> = ({ children }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
};

export default Grid;
