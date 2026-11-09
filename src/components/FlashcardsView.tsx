import React, { useState } from 'react';
import {
  Sparkles,
  RotateCw,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Layers,
} from 'lucide-react';
import { Flashcard } from '../types/quiz';

interface FlashcardsViewProps {
  cards: Flashcard[];
  onToggleMastery: (id: string) => void;
  onRemoveCard: (id: string) => void;
  onStartPractice: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  cards,
  onToggleMastery,
  onRemoveCard,
  onStartPractice,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filter, setFilter] = useState<'all' | 'learning' | 'mastered'>('all');

  const filteredCards = cards.filter((card) => {
    if (filter === 'all') return true;
    return card.masteryLevel === filter;
  });

  const activeCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  if (cards.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-10 text-center max-w-xl mx-auto my-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 font-display mb-2">
          Your Flashcard Deck is Empty
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          While practicing, click "+ Save Flashcard" on any question rationale to automatically extract
          its core takeaways into your active recall spaced repetition deck.
        </p>
        <button
          onClick={onStartPractice}
          className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-hero-gradient shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
        >
          Return to Practice Stage
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      {/* View Header & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            Active Recall Flashcards
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Spaced repetition mastery deck generated from question rationales ({cards.length} cards saved)
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/60 border border-slate-300/40 text-xs">
          <button
            onClick={() => {
              setFilter('all');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({cards.length})
          </button>
          <button
            onClick={() => {
              setFilter('learning');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filter === 'learning'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Learning ({cards.filter((c) => c.masteryLevel === 'learning').length})
          </button>
          <button
            onClick={() => {
              setFilter('mastered');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filter === 'mastered'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mastered ({cards.filter((c) => c.masteryLevel === 'mastered').length})
          </button>
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="glass-panel rounded-2xl p-8 text-center text-slate-500 text-sm">
          No cards found for this filter.
        </div>
      ) : (
        activeCard && (
          <div className="flex flex-col items-center">
            {/* Flip Card Container */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full min-h-[340px] cursor-pointer perspective-1000 select-none group"
            >
              <div
                className={`relative w-full min-h-[340px] rounded-2xl p-8 glass-panel-elevated transition-all duration-300 border flex flex-col justify-between shadow-xl ${
                  isFlipped
                    ? 'border-violet-300 bg-violet-50/40 shadow-violet-500/10'
                    : 'border-slate-200/90 hover:border-blue-300'
                }`}
              >
                {/* Card Meta Top */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/60">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700">
                    {activeCard.category} · {activeCard.topic}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400 tabular-nums">
                      {currentIndex + 1} of {filteredCards.length}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveCard(activeCard.id);
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                      title="Delete card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="my-6">
                  {!isFlipped ? (
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Prompt / Question Premise
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed font-display">
                        {activeCard.front}
                      </h3>
                      <div className="mt-6 flex items-center gap-2 text-xs text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Click card to reveal deep takeaway</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 block mb-2">
                        Core Takeaway & Mechanics
                      </span>
                      <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                        {activeCard.back}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium ${
                        activeCard.masteryLevel === 'mastered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {activeCard.masteryLevel === 'mastered' ? 'Mastered' : 'Needs Review'}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleMastery(activeCard.id);
                    }}
                    className="flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-900"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {activeCard.masteryLevel === 'mastered'
                        ? 'Mark for Review'
                        : 'Mark as Mastered'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl glass-panel hover:bg-white text-slate-700 border border-slate-200 shadow-xs hover:shadow transition-all"
                title="Previous card"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-800 glass-panel hover:bg-white border border-slate-200 shadow-xs"
              >
                <RotateCw className="w-4 h-4 text-blue-600" />
                <span>Flip Card (Spacebar)</span>
              </button>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl glass-panel hover:bg-white text-slate-700 border border-slate-200 shadow-xs hover:shadow transition-all"
                title="Next card"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};
