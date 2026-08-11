export type MathQuestionType =
  | "number_bond"
  | "multiple_choice"
  | "visual_count"
  | "compare_numbers"
  | "missing_number"
  | "ordering";

export type MathQuestionDifficulty = 1 | 2 | 3;

export type MathQuestion = {
  id: string;
  subject: "math";
  year: 1;
  topic: "nombor";
  type: MathQuestionType;
  difficulty: MathQuestionDifficulty;
  prompt: string;
  answer: number | string | number[];
  options?: Array<number | string>;
  visualData?: {
    total?: number;
    knownPart?: number;
    missingPosition?: "left" | "right";
    count?: number;
    compareMode?: "larger" | "smaller";
    numbers?: number[];
    missingIndex?: number;
  };
  awiMessage: string;
  tip: string;
  retryTip: string;
  explanation: string;
  signature: string;
};

export type NomborGenerator = (
  difficulty?: MathQuestionDifficulty,
  random?: () => number,
) => MathQuestion;
