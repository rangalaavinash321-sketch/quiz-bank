import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PracticeStage } from './components/PracticeStage';
import { TelemetrySidebar } from './components/TelemetrySidebar';
import { QuestionBankDrawer } from './components/QuestionBankDrawer';
import { FlashcardsView } from './components/FlashcardsView';
import { AnalyticsView } from './components/AnalyticsView';
import { INITIAL_QUESTIONS } from './data/questionBanks';
import { Flashcard, Question, QuizSession, StudyMode } from './types/quiz';

export default function App() {
  const [activeView, setActiveView] = useState<'practice' | 'bank' | 'flashcards' | 'analytics'>('practice');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Initialize initial study session
  const [session, setSession] = useState<QuizSession>(() => ({
    id: 'session-init',
    title: 'Cognitive Neuroscience & Algorithms Foundation',
    category: 'Multi-Discipline Core',
    topic: 'Synaptic Plasticity & Distributed Consensus',
    questions: INITIAL_QUESTIONS.slice(0, 6),
    currentIndex: 0,
    userAnswers: {},
    isSubmitted: {},
    flagged: {},
    startTime: Date.now(),
    questionTimes: {},
    streak: 0,
    maxStreak: 0,
    studyMode: 'practice',
    isComplete: false,
  }));

  // Initialize Flashcards with key takeaways from initial bank
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() =>
    INITIAL_QUESTIONS.slice(0, 4).map((q) => ({
      id: `card-${q.id}`,
      front: q.stem,
      back: `${q.keyConcept}\n\nMechanistic Context: ${q.explanation}`,
      category: q.category,
      topic: q.topic,
      difficulty: q.difficulty,
      masteryLevel: 'learning',
      reviewCount: 0,
    }))
  );

  // Timer loop when on practice view and session is ongoing
  useEffect(() => {
    if (session.isComplete) return;

    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [session.isComplete]);

  // Handle option selection
  const handleSelectOption = (optionIndex: number) => {
    const currentQ = session.questions[session.currentIndex];
    if (session.isSubmitted[currentQ.id] && session.studyMode === 'practice') return;

    setSession((prev) => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [currentQ.id]: optionIndex,
      },
    }));
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    const currentQ = session.questions[session.currentIndex];
    const userChoice = session.userAnswers[currentQ.id];
    if (userChoice === undefined) return;

    const isCorrect = userChoice === currentQ.correctIndex;
    const newStreak = isCorrect ? session.streak + 1 : 0;
    const newMaxStreak = Math.max(session.maxStreak, newStreak);

    setSession((prev) => ({
      ...prev,
      isSubmitted: {
        ...prev.isSubmitted,
        [currentQ.id]: true,
      },
      streak: newStreak,
      maxStreak: newMaxStreak,
    }));
  };

  // Navigation handlers
  const handleNextQuestion = () => {
    if (session.currentIndex + 1 < session.questions.length) {
      setSession((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
      }));
    } else {
      // Finished all questions!
      setSession((prev) => ({
        ...prev,
        isComplete: true,
      }));
      setActiveView('analytics');
    }
  };

  const handlePrevQuestion = () => {
    if (session.currentIndex > 0) {
      setSession((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
      }));
    }
  };

  const handleJumpToQuestion = (index: number) => {
    if (index >= 0 && index < session.questions.length) {
      setSession((prev) => ({
        ...prev,
        currentIndex: index,
      }));
      if (activeView !== 'practice') {
        setActiveView('practice');
      }
    }
  };

  const handleToggleFlag = (questionId: string) => {
    setSession((prev) => ({
      ...prev,
      flagged: {
        ...prev.flagged,
        [questionId]: !prev.flagged[questionId],
      },
    }));
  };

  const handleToggleStudyMode = (mode: StudyMode) => {
    setSession((prev) => ({
      ...prev,
      studyMode: mode,
    }));
  };

  // Start new practice session
  const handleStartSession = (
    title: string,
    category: string,
    topic: string,
    questions: Question[]
  ) => {
    setSession({
      id: `session-${Date.now()}`,
      title,
      category,
      topic,
      questions,
      currentIndex: 0,
      userAnswers: {},
      isSubmitted: {},
      flagged: {},
      startTime: Date.now(),
      questionTimes: {},
      streak: 0,
      maxStreak: 0,
      studyMode: 'practice',
      isComplete: false,
    });
    setSecondsElapsed(0);
    setActiveView('practice');
  };

  // Retry missed questions
  const handleRetryMissed = (missedQuestions: Question[]) => {
    if (missedQuestions.length === 0) return;
    handleStartSession(
      `Targeted Mastery Drill (${missedQuestions.length} Questions)`,
      session.category,
      'Missed Concept Remediation',
      missedQuestions
    );
  };

  // Save question key concept as flashcard
  const handleSaveToFlashcards = (question: Question) => {
    const cardId = `card-${question.id}`;
    if (flashcards.some((c) => c.id === cardId)) return;

    const newCard: Flashcard = {
      id: cardId,
      front: question.stem,
      back: `${question.keyConcept}\n\nMechanistic Breakdown: ${question.explanation}`,
      category: question.category,
      topic: question.topic,
      difficulty: question.difficulty,
      masteryLevel: 'learning',
      reviewCount: 0,
      lastReviewed: Date.now(),
    };

    setFlashcards((prev) => [newCard, ...prev]);
  };

  const handleToggleMastery = (id: string) => {
    setFlashcards((prev) =>
      prev.map((card) =>
        card.id === id
          ? {
              ...card,
              masteryLevel: card.masteryLevel === 'mastered' ? 'learning' : 'mastered',
            }
          : card
      )
    );
  };

  const handleRemoveCard = (id: string) => {
    setFlashcards((prev) => prev.filter((c) => c.id !== id));
  };

  const currentQ = session.questions[session.currentIndex] || session.questions[0];
  const isCurrentSaved = flashcards.some((c) => c.id === `card-${currentQ.id}`);

  return (
    <div className="min-h-screen relative flex flex-col selection:bg-blue-500/20 selection:text-blue-900">
      {/* Ambient background glowing orbs as specified in design system */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none -translate-x-1/3 -translate-y-1/3 z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[140px] pointer-events-none translate-x-1/4 translate-y-1/4 z-0" />

      {/* Top Bar Navigation */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenCreateModal={() => setIsDrawerOpen(true)}
        streak={session.streak}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
        {/* Practice Stage View (8:4 Asymmetric Split) */}
        {activeView === 'practice' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* 8-Column Practice Arena */}
            <div className="lg:col-span-8">
              <PracticeStage
                session={session}
                currentQuestion={currentQ}
                onSelectOption={handleSelectOption}
                onSubmitAnswer={handleSubmitAnswer}
                onNextQuestion={handleNextQuestion}
                onPrevQuestion={handlePrevQuestion}
                onToggleFlag={handleToggleFlag}
                onSaveToFlashcards={handleSaveToFlashcards}
                isSavedInFlashcards={isCurrentSaved}
              />
            </div>

            {/* 4-Column Real-Time Telemetry Cockpit */}
            <div className="lg:col-span-4">
              <TelemetrySidebar
                session={session}
                onJumpToQuestion={handleJumpToQuestion}
                onToggleStudyMode={handleToggleStudyMode}
                onFinishSession={() => {
                  setSession((prev) => ({ ...prev, isComplete: true }));
                  setActiveView('analytics');
                }}
                secondsElapsed={secondsElapsed}
              />
            </div>
          </div>
        )}

        {/* Question Bank Explorer View */}
        {activeView === 'bank' && (
          <div className="py-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  Question Bank & Curricula Repository
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Explore thousands of concept questions across scientific & engineering disciplines
                </p>
              </div>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-hero-gradient rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
              >
                + AI Practice Generator
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INITIAL_QUESTIONS.map((q, idx) => (
                <div
                  key={q.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between hover:border-blue-400/80 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-700">
                        {q.category} · {q.topic}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {q.difficulty}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 font-display">
                      {q.stem}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {q.explanation}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
                    <span className="text-[11px] text-slate-400">
                      Takeaway: {q.keyConcept.slice(0, 50)}...
                    </span>
                    <button
                      onClick={() => {
                        handleStartSession(
                          `${q.topic} Quick Drill`,
                          q.category,
                          q.topic,
                          INITIAL_QUESTIONS.filter((item) => item.category === q.category)
                        );
                      }}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Practice Topic →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Flashcards View */}
        {activeView === 'flashcards' && (
          <FlashcardsView
            cards={flashcards}
            onToggleMastery={handleToggleMastery}
            onRemoveCard={handleRemoveCard}
            onStartPractice={() => setActiveView('practice')}
          />
        )}

        {/* Analytics View */}
        {activeView === 'analytics' && (
          <AnalyticsView
            session={session}
            onRetryMissed={handleRetryMissed}
            onNewSession={() => setIsDrawerOpen(true)}
            secondsElapsed={secondsElapsed}
          />
        )}
      </main>

      {/* Slide-over Question Bank & AI Practice Generator Drawer */}
      <QuestionBankDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onStartSession={handleStartSession}
      />
    </div>
  );
}
