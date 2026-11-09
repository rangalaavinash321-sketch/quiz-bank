import React from 'react';
import {
  Flame,
  Clock,
  Target,
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Award,
} from 'lucide-react';
import { QuizSession, StudyMode } from '../types/quiz';

interface TelemetrySidebarProps {
  session: QuizSession;
  onJumpToQuestion: (index: number) => void;
  onToggleStudyMode: (mode: StudyMode) => void;
  onFinishSession: () => void;
  secondsElapsed: number;
}

export const TelemetrySidebar: React.FC<TelemetrySidebarProps> = ({
  session,
  onJumpToQuestion,
  onToggleStudyMode,
  onFinishSession,
  secondsElapsed,
}) => {
  const totalQuestions = session.questions.length;
  const answeredCount = Object.keys(session.userAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Calculate live accuracy
  let correctCount = 0;
  let evaluatedCount = 0;
  session.questions.forEach((q) => {
    const ans = session.userAnswers[q.id];
    const sub = session.isSubmitted[q.id];
    if (ans !== undefined && (session.studyMode === 'practice' ? sub : true)) {
      evaluatedCount++;
      if (ans === q.correctIndex) correctCount++;
    }
  });

  const accuracyPercent =
    evaluatedCount > 0 ? Math.round((correctCount / evaluatedCount) * 100) : 100;

  // Format timer MM:SS
  const mins = Math.floor(secondsElapsed / 60)
    .toString()
    .padStart(2, '0');
  const secs = (secondsElapsed % 60).toString().padStart(2, '0');

  return (
    <aside className="flex flex-col gap-5">
      {/* Telemetry Dashboard Card */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 transition-all">
        {/* Header Title */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
              Real-Time Telemetry
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500 tabular-nums">
            {answeredCount} of {totalQuestions} Answered
          </span>
        </div>

        {/* 8px Dual Gradient Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1.5">
            <span>Session Progress</span>
            <span className="font-semibold text-slate-900 tabular-nums">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200/70 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-hero-gradient transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Dynamic Metric Grid: Streak, Timer, Accuracy */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Streak Counter Card */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-500/10 via-violet-500/5 to-transparent border border-amber-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-amber-800 font-medium mb-1">
              <span>Active Streak</span>
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums font-display">
                {session.streak}
              </span>
              {session.streak >= 3 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-white shadow-xs">
                  {session.streak >= 5 ? '2.0x' : '1.5x'}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 mt-0.5">
              Best: {session.maxStreak} streak
            </span>
          </div>

          {/* Speed Timer Card */}
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-blue-800 font-medium mb-1">
              <span>Session Timer</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums font-display">
              {mins}:{secs}
            </div>
            <span className="text-[11px] text-slate-500 mt-0.5">Continuous pace</span>
          </div>
        </div>

        {/* Accuracy Meter Strip */}
        <div className="p-3.5 rounded-xl bg-white/70 border border-slate-200/80 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold text-xs">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900">Current Accuracy</div>
              <div className="text-[11px] text-slate-500">
                {correctCount} correct of {evaluatedCount} evaluated
              </div>
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 tabular-nums font-display">
            {evaluatedCount > 0 ? `${accuracyPercent}%` : '--'}
          </div>
        </div>

        {/* Quick-Jump Question Matrix */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2.5">
            <span>Question Navigator</span>
            <span className="text-[11px] text-slate-500">Click to jump</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {session.questions.map((q, idx) => {
              const isCurrent = session.currentIndex === idx;
              const ans = session.userAnswers[q.id];
              const isSub = session.isSubmitted[q.id];
              const isFlagged = session.flagged[q.id];

              let boxStyle = 'bg-white/80 border-slate-200 text-slate-700 hover:border-blue-400';

              if (session.studyMode === 'practice' && isSub) {
                if (ans === q.correctIndex) {
                  boxStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-xs shadow-emerald-500/20';
                } else {
                  boxStyle = 'bg-rose-500 text-white border-rose-600 shadow-xs shadow-rose-500/20';
                }
              } else if (ans !== undefined) {
                boxStyle = 'bg-blue-600 text-white border-blue-700 shadow-xs';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => onJumpToQuestion(idx)}
                  className={`relative h-9 rounded-lg font-semibold text-xs transition-all flex items-center justify-center border ${boxStyle} ${
                    isCurrent
                      ? 'ring-2 ring-blue-600 ring-offset-2 ring-offset-white font-bold scale-105 z-10'
                      : ''
                  }`}
                >
                  <span className="tabular-nums">{idx + 1}</span>
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-1 ring-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-200/60 text-[10px] text-slate-500 flex-wrap">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-600" /> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Correct
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Missed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Flagged
            </span>
          </div>
        </div>

        {/* Study Mode Selector */}
        <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200/80 mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-800">Study Engine Mode</span>
            <button
              onClick={() =>
                onToggleStudyMode(session.studyMode === 'practice' ? 'exam' : 'practice')
              }
              className="flex items-center gap-1 text-xs text-blue-700 font-semibold hover:text-blue-900 transition-colors"
            >
              {session.studyMode === 'practice' ? (
                <>
                  <span>Practice</span>
                  <ToggleLeft className="w-5 h-5 text-blue-600" />
                </>
              ) : (
                <>
                  <span>Exam</span>
                  <ToggleRight className="w-5 h-5 text-violet-600" />
                </>
              )}
            </button>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            {session.studyMode === 'practice'
              ? 'Instant rationale feedback & concept flashcards after each submit.'
              : 'Exam simulation: answer all items first, review detailed results at the end.'}
          </p>
        </div>

        {/* Finish Session CTA */}
        <button
          onClick={onFinishSession}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white/90 hover:bg-white border border-slate-200/90 shadow-sm transition-all text-center block"
        >
          Finish & View Full Diagnostics
        </button>
      </div>
    </aside>
  );
};
