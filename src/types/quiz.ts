export type Difficulty = 'Foundation' | 'Intermediate' | 'Advanced';

export interface Question {
  id: string;
  category: string;
  topic: string;
  stem: string;
  codeOrContext?: string | null;
  options: string[];
  correctIndex: number;
  explanation: string;
  keyConcept: string;
  difficulty: Difficulty;
  hint?: string;
}

export type StudyMode = 'practice' | 'exam';

export interface QuizSession {
  id: string;
  title: string;
  category: string;
  topic: string;
  questions: Question[];
  currentIndex: number;
  userAnswers: Record<string, number>; // questionId -> optionIndex
  isSubmitted: Record<string, boolean>; // questionId -> boolean (for practice mode instant reveal)
  flagged: Record<string, boolean>; // questionId -> boolean
  startTime: number;
  questionTimes: Record<string, number>; // questionId -> seconds spent
  streak: number;
  maxStreak: number;
  studyMode: StudyMode;
  isComplete: boolean;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  topic: string;
  difficulty: Difficulty;
  masteryLevel: 'learning' | 'reviewing' | 'mastered';
  reviewCount: number;
  lastReviewed?: number;
}

export interface CategorySummary {
  id: string;
  name: string;
  description: string;
  totalQuestions: number;
  topics: string[];
  color: string;
}
