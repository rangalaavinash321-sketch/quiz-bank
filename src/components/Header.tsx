import React from 'react';
import { Sparkles, Layers, BookOpen, BarChart3, PlusCircle } from 'lucide-react';

interface HeaderProps {
  activeView: 'practice' | 'bank' | 'flashcards' | 'analytics';
  setActiveView: (view: 'practice' | 'bank' | 'flashcards' | 'analytics') => void;
  onOpenCreateModal: () => void;
  streak: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onOpenCreateModal,
  streak,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 px-6 py-3.5 transition-all">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <button
            onClick={() => setActiveView('practice')}
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity font-display"
          >
            Luminous Study
          </button>
          {streak > 0 && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-300/60 tabular-nums">
              <span className="text-amber-500">🔥</span> {streak} Streak
            </span>
          )}
        </div>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveView('practice')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeView === 'practice'
                ? 'text-blue-600 border-blue-600 font-semibold'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            Practice Stage
          </button>

          <button
            onClick={() => setActiveView('bank')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeView === 'bank'
                ? 'text-blue-600 border-blue-600 font-semibold'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Question Bank
          </button>

          <button
            onClick={() => setActiveView('flashcards')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeView === 'flashcards'
                ? 'text-blue-600 border-blue-600 font-semibold'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Flashcards
          </button>

          <button
            onClick={() => setActiveView('analytics')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeView === 'analytics'
                ? 'text-blue-600 border-blue-600 font-semibold'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Performance
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-hero-gradient rounded-lg shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Practice Set</span>
          </button>
        </div>
      </div>
    </header>
  );
};
