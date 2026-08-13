export type QuizContentFeedback = "idle" | "correct" | "wrong";

export type MultipleChoiceContentQuestion = {
  id: string;
  type: "multiple-choice";
  question: string;
  awiMessage: string;
  tip: string;
  options: readonly { id: string; label: string }[];
  correctOptionId: string;
};

export type MatchPairItem = {
  leftId: string;
  leftLabel: string;
  rightId: string;
  rightLabel: string;
};

export type MatchPairsContentQuestion = {
  id: string;
  type: "match-pairs";
  question: string;
  awiMessage: string;
  tip: string;
  pairs: readonly MatchPairItem[];
};

export type DragDropContentQuestion = {
  id: string;
  type: "drag-drop";
  question: string;
  awiMessage: string;
  tip: string;
  items: readonly { id: string; label: string }[];
  targets: readonly { id: string; label: string }[];
  correctPlacements: Readonly<Record<string, string>>;
};

export type LearningContentQuestion =
  | MultipleChoiceContentQuestion
  | MatchPairsContentQuestion
  | DragDropContentQuestion;

export type QuizContentHandle = {
  checkAnswer: () => boolean;
  reset: () => void;
  retry: () => void;
};
