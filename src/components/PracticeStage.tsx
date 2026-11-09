import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Code2,
  Check,
} from 'lucide-react';
import { Question, QuizSession } from '../types/quiz';

interface PracticeStageProps {
  session: QuizSession;
  currentQuestion: Question;
  onSelectOption: (optionIndex: number) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onToggleFlag: (questionId: string) => void;
  onSaveToFlashcards: (question: Question) => void;
  isSavedInFlashcards: boolean;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const PracticeStage: React.FC<PracticeStageProps> = ({
  session,
  currentQuestion,
  onSelectOption,
  onSubmitAnswer,
  onNextQuestion,
  onPrevQuestion,
  onToggleFlag,
  onSaveToFlashcards,
  isSavedInFlashcards,
}) => {
  const [showHint, setShowHint] = useState<boolean>(false);
  const selectedIndex = session.userAnswers[currentQuestion.id];
  const isSubmitted = session.isSubmitted[currentQuestion.id] || false;
  const isFlagged = session.flagged[currentQuestion.id] || false;
  const isPracticeMode = session.studyMode === 'practice';
  const isCorrect = isSubmitted && selectedIndex === currentQuestion.correctIndex;

  // Reset hint state on question change
  useEffect(() => {
    setShowHint(false);
  }, [currentQuestion.id]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (!isSubmitted || !isPracticeMode) {
        if (['1', 'a', 'A'].includes(e.key)) onSelectOption(0);
        if (['2', 'b', 'B'].includes(e.key)) onSelectOption(1);
        if (['3', 'c', 'C'].includes(e.key)) onSelectOption(2);
        if (['4', 'd', 'D'].includes(e.key)) onSelectOption(3);
      }

      if (e.key === 'Enter') {
        if (!isSubmitted && selectedIndex !== undefined) {
          onSubmitAnswer();
        } else if (isSubmitted) {
          onNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, isSubmitted, isPracticeMode, onSelectOption, onSubmitAnswer, onNextQuestion]);

  return (
    <div className="flex flex-col gap-5">
      {/* Question Card Frame */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 transition-all">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Topic Badge */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-600/10 text-violet-800 border border-violet-200/50">
              {currentQuestion.category} · {currentQuestion.topic}
            </span>

            {/* Difficulty Badge */}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                currentQuestion.difficulty === 'Advanced'
                  ? 'bg-rose-500/10 text-rose-700 border border-rose-200/60'
                  : currentQuestion.difficulty === 'Intermediate'
                  ? 'bg-blue-500/10 text-blue-700 border border-blue-200/60'
                  : 'bg-emerald-500/10 text-emerald-700 border border-emerald-200/60'
              }`}
            >
              {currentQuestion.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Hint Button */}
            {currentQuestion.hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  showHint
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-white/80 text-slate-600 border border-slate-200 hover:text-blue-600'
                }`}
                title="Toggle helpful hint"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Hint</span>
              </button>
            )}

            {/* Flag for Review */}
            <button
              onClick={() => onToggleFlag(currentQuestion.id)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                isFlagged
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-white/80 text-slate-600 border border-slate-200 hover:text-amber-600'
              }`}
              title="Flag this question to review later"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-600' : ''}`} />
              <span>{isFlagged ? 'Flagged' : 'Flag'}</span>
            </button>

            {/* Question Counter */}
            <span className="text-xs font-semibold text-slate-500 tabular-nums px-2">
              {session.currentIndex + 1} / {session.questions.length}
            </span>
          </div>
        </div>

        {/* Collapsible Hint Drawer */}
        {showHint && currentQuestion.hint && (
          <div className="mb-5 p-3.5 rounded-xl bg-blue-50/90 border border-blue-200/80 text-xs text-blue-900 flex items-start gap-2.5 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-blue-950">Guided Conceptual Hint: </span>
              {currentQuestion.hint}
            </div>
          </div>
        )}

        {/* Question Stem */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-5 font-display">
          {currentQuestion.stem}
        </h2>

        {/* Optional Context/Code/Formula Block */}
        {currentQuestion.codeOrContext && (
          <div className="mb-6 p-4 rounded-xl bg-slate-900/95 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed border border-slate-800 shadow-inner overflow-x-auto">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-2 uppercase tracking-wider font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>Scenario / Premise</span>
            </div>
            <pre className="whitespace-pre-wrap font-mono">{currentQuestion.codeOrContext}</pre>
          </div>
        )}

        {/* 4 Interactive Option Tiles */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const letter = OPTION_LETTERS[index];
            const isSelected = selectedIndex === index;
            const isThisCorrect = isSubmitted && index === currentQuestion.correctIndex;
            const isThisWrongSelected = isSubmitted && isSelected && !isThisCorrect;

            let tileStateClass = 'option-tile';
            if (isSubmitted && isPracticeMode) {
              if (isThisCorrect) {
                tileStateClass = 'option-tile-correct';
              } else if (isThisWrongSelected) {
                tileStateClass = 'option-tile-incorrect';
              } else {
                tileStateClass = 'option-tile opacity-60';
              }
            } else if (isSelected) {
              tileStateClass = 'option-tile-selected';
            }

            return (
              <button
                key={index}
                disabled={isSubmitted && isPracticeMode}
                onClick={() => onSelectOption(index)}
                className={`w-full text-left p-4 rounded-xl flex items-start gap-3.5 cursor-pointer select-none ${tileStateClass}`}
              >
                {/* Option Letter Indicator */}
                <div
                  className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-display font-bold text-sm transition-colors ${
                    isThisCorrect
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30'
                      : isThisWrongSelected
                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-500/30'
                      : isSelected
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {letter}
                </div>

                {/* Option Text */}
                <div className="flex-1 pt-0.5 text-sm sm:text-base font-normal text-slate-800 leading-relaxed">
                  {option}
                </div>

                {/* Status Glyphs on Submission */}
                {isSubmitted && isPracticeMode && (
                  <div className="shrink-0 pt-1">
                    {isThisCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-scaleIn" />
                    )}
                    {isThisWrongSelected && (
                      <XCircle className="w-5 h-5 text-rose-600 animate-scaleIn" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Trays */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200/60">
          <button
            onClick={onPrevQuestion}
            disabled={session.currentIndex === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <button
                disabled={selectedIndex === undefined}
                onClick={onSubmitAnswer}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-hero-gradient shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <span>Submit Answer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {isSubmitted && (
              <button
                onClick={onNextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-hero-gradient shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 active:scale-[0.98] transition-all"
              >
                <span>{session.currentIndex + 1 >= session.questions.length ? 'Review Results' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Instant Deep Rationale Panel (Shown in Practice Mode upon submission) */}
      {isSubmitted && isPracticeMode && (
        <div
          className={`glass-panel-elevated rounded-2xl p-6 sm:p-7 border transition-all ${
            isCorrect
              ? 'border-emerald-300 bg-emerald-50/40 shadow-emerald-500/10'
              : 'border-rose-300 bg-rose-50/40 shadow-rose-500/10'
          }`}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              {isCorrect ? (
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
                  <XCircle className="w-5 h-5" />
                </div>
              )}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                  {isCorrect ? 'Outstanding! Correct Answer' : 'Incorrect Selection'}
                </h3>
                <p className="text-xs text-slate-600">
                  Correct choice: <strong className="text-slate-900 font-semibold">Option {OPTION_LETTERS[currentQuestion.correctIndex]}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => onSaveToFlashcards(currentQuestion)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isSavedInFlashcards
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 shadow-sm'
              }`}
            >
              {isSavedInFlashcards ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved to Deck</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>+ Save Flashcard</span>
                </>
              )}
            </button>
          </div>

          {/* Deep Explanation */}
          <div className="mb-4 text-sm text-slate-700 leading-relaxed bg-white/70 p-4 rounded-xl border border-slate-200/70">
            <span className="font-semibold text-slate-900 block mb-1">Mechanistic Explanation:</span>
            {currentQuestion.explanation}
          </div>

          {/* Key Concept Takeaway */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 flex items-start gap-2.5 text-xs text-blue-950">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-blue-900">Key Takeaway: </strong>
              {currentQuestion.keyConcept}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
