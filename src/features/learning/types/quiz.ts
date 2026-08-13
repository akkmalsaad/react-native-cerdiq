export type QuizType =
  | "multiple-choice"
  | "drag-drop"
  | "sort-order"
  | "match-pairs"
  | "build-answer"
  | "number-line"
  | "tap-object"
  | "true-false";

export type QuizSubject = "math" | "science" | "bm" | "english";
export type QuizDifficulty = "easy" | "medium" | "hard";

export type QuizOption = {
  id: string;
  label: string;
  value: string | number | boolean;
  quantity?: number;
};

export type MatchPair = { left: string; right: string };
export type DropZone = { id: string; label: string };

export interface QuizQuestion {
  id: string;
  subject: QuizSubject;
  year: 1 | 2 | 3 | 4 | 5 | 6;
  topic: string;
  subtopic?: string;
  type: QuizType;
  difficulty: QuizDifficulty;
  question: string;
  awiMessage?: string;
  instruction?: string;
  options?: QuizOption[];
  correctAnswer: unknown;
  visualData?: {
    tens?: number;
    ones?: number;
    min?: number;
    max?: number;
    step?: number;
    slots?: number;
    pairs?: MatchPair[];
    zones?: DropZone[];
  };
  explanation?: string;
  tip?: string;
  tipConcept?: string;
  audioText?: string;
}

export type QuizAnswer = unknown;

export type QuizProps = {
  question: QuizQuestion;
  answer: QuizAnswer;
  disabled?: boolean;
  feedback?: "idle" | "correct" | "wrong";
  onChange: (answer: QuizAnswer) => void;
};
