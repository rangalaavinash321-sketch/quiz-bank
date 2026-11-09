import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  RotateCcw,
  PlusCircle,
  Bookmark,
  Share2,
  BarChart3,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Question, QuizSession } from '../types/quiz';

interface AnalyticsViewProps {
  session: QuizSession;
  onRetryMissed: (missedQuestions: Question[]) => void;
  onNewSession: () => void;
  secondsElapsed: number;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  session,
  onRetryMissed,
  onNewSession,
  secondsElapsed,
}) => {
  const [filterReview, setFilterReview] = useState<'all' | 'missed' | 'flagged'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Compute statistics
  let correctCount = 0;
  let answeredCount = 0;
  const missedQuestions: Question[] = [];

  session.questions.forEach((q) => {
    const ans = session.userAnswers[q.id];
    if (ans !== undefined) {
      answeredCount++;
      if (ans === q.correctIndex) {
        correctCount++;
      } else {
        missedQuestions.push(q);
      }
    } else {
      missedQuestions.push(q);
    }
  });

  const accuracy =
    answeredCount > 0 ? Math.round((correctCount / session.questions.length) * 100) : 0;
  const avgTimePerQuestion =
    answeredCount > 0 ? Math.round(secondsElapsed / session.questions.length) : 0;

  const mins = Math.floor(secondsElapsed / 60);
  const secs = secondsElapsed % 60;

  // Filter reviewed questions
  const displayedQuestions = session.questions.filter((q) => {
    const ans = session.userAnswers[q.id];
    const isMissed = ans !== q.correctIndex;
    const isFlagged = session.flagged[q.id];

    if (filterReview === 'missed') return isMissed;
    if (filterReview === 'flagged') return isFlagged;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 animate-fadeIn">
      {/* Hero Performance Banner */}
      <div className="glass-panel-elevated rounded-3xl p-8 sm:p-10 border border-slate-200/90 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
                Session Performance Diagnostics
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {session.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Completed {session.questions.length} questions in {session.category}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {missedQuestions.length > 0 && (
                <button
                  onClick={() => onRetryMissed(missedQuestions)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Drill Missed ({missedQuestions.length})</span>
                </button>
              )}

              <button
                onClick={onNewSession}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-hero-gradient shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Practice Set</span>
              </button>
            </div>
          </div>

          {/* KPI Dashboard Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200/70">
            {/* Accuracy */}
            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/80">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Accuracy Rate</span>
                <Award className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tabular-nums font-display">
                {accuracy}%
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {correctCount} / {session.questions.length} correct
              </span>
            </div>

            {/* Streak */}
            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/80">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Max Streak</span>
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tabular-nums font-display">
                {session.maxStreak}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Consecutive correct</span>
            </div>

            {/* Total Time */}
            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/80">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Total Time</span>
                <Clock className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tabular-nums font-display">
                {mins}m {secs}s
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Total session duration</span>
            </div>

            {/* Avg Pace */}
            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/80">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Average Pace</span>
                <BarChart3 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tabular-nums font-display">
                {avgTimePerQuestion}s
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Per question stem</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Review Section */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/70">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Item-by-Item Review
            </h3>
            <p className="text-xs text-slate-500">
              Inspect questions, your selections, and deep explanations.
            </p>
          </div>

          {/* Filter review pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            <button
              onClick={() => setFilterReview('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterReview === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({session.questions.length})
            </button>
            <button
              onClick={() => setFilterReview('missed')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterReview === 'missed'
                  ? 'bg-white text-rose-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Missed ({missedQuestions.length})
            </button>
            <button
              onClick={() => setFilterReview('flagged')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterReview === 'flagged'
                  ? 'bg-white text-amber-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Flagged ({Object.values(session.flagged).filter(Boolean).length})
            </button>
          </div>
        </div>

        {/* Question Review List */}
        <div className="space-y-4">
          {displayedQuestions.map((q, idx) => {
            const userAns = session.userAnswers[q.id];
            const isCorrect = userAns === q.correctIndex;
            const isExpanded = expandedId === q.id;
            const isFlagged = session.flagged[q.id];

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all ${
                  isCorrect
                    ? 'border-emerald-200/80 bg-emerald-50/20'
                    : 'border-rose-200/80 bg-rose-50/20'
                }`}
              >
                {/* Header row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="p-5 cursor-pointer flex items-start justify-between gap-4 select-none"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-700 tabular-nums">
                          Question {idx + 1}
                        </span>
                        <span className="text-[11px] text-slate-400">·</span>
                        <span className="text-[11px] font-medium text-slate-500">
                          {q.category} · {q.topic}
                        </span>
                        {isFlagged && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-700 px-1.5 py-0.2 rounded bg-amber-100">
                            <Bookmark className="w-2.5 h-2.5 fill-amber-700" /> Flagged
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 leading-snug">
                        {q.stem}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Missed'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-200/60 space-y-4">
                    {/* User Selection vs Correct */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white/80 border border-slate-200">
                        <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                          Your Answer:
                        </span>
                        <span
                          className={`font-semibold ${
                            isCorrect ? 'text-emerald-700' : 'text-rose-700'
                          }`}
                        >
                          {userAns !== undefined
                            ? `${String.fromCharCode(65 + userAns)}) ${q.options[userAns]}`
                            : 'Unanswered'}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-white/80 border border-slate-200">
                        <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                          Correct Answer:
                        </span>
                        <span className="font-semibold text-emerald-700">
                          {String.fromCharCode(65 + q.correctIndex)}) {q.options[q.correctIndex]}
                        </span>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-4 rounded-xl bg-white/80 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <span className="font-bold text-slate-900 block mb-1">Explanation:</span>
                      {q.explanation}
                    </div>

                    {/* Key takeaway */}
                    <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900">
                      <span className="font-bold text-blue-950">Key Concept: </span>
                      {q.keyConcept}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {displayedQuestions.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-400">
              No questions matched the selected review filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
