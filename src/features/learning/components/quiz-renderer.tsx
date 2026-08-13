import type { QuizProps } from "@/features/learning/types/quiz";
import { BuildAnswerQuiz } from "./quiz-types/build-answer-quiz";
import { DragDropQuiz } from "./quiz-types/drag-drop-quiz";
import { MatchPairsQuiz } from "./quiz-types/match-pairs-quiz";
import { MultipleChoiceQuiz } from "./quiz-types/multiple-choice-quiz";
import { NumberLineQuiz } from "./quiz-types/number-line-quiz";
import { SortOrderQuiz } from "./quiz-types/sort-order-quiz";
import { TapObjectQuiz } from "./quiz-types/tap-object-quiz";
import { TrueFalseQuiz } from "./quiz-types/true-false-quiz";

export function QuizRenderer(props: QuizProps) {
  switch (props.question.type) {
    case "multiple-choice": return <MultipleChoiceQuiz {...props} />;
    case "drag-drop": return <DragDropQuiz {...props} />;
    case "sort-order": return <SortOrderQuiz {...props} />;
    case "match-pairs": return <MatchPairsQuiz {...props} />;
    case "build-answer": return <BuildAnswerQuiz {...props} />;
    case "number-line": return <NumberLineQuiz {...props} />;
    case "tap-object": return <TapObjectQuiz {...props} />;
    case "true-false": return <TrueFalseQuiz {...props} />;
  }
}
