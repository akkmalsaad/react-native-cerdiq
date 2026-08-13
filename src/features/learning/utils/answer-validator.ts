import type { QuizQuestion } from "@/features/learning/types/quiz";

function stable(value: unknown): string {
  if (Array.isArray(value)) return JSON.stringify(value.map(String));
  if (value && typeof value === "object") {
    return JSON.stringify(Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)));
  }
  return String(value).trim().toLowerCase();
}

export function validateAnswer(question: QuizQuestion, answer: unknown) {
  if (question.type === "match-pairs" && answer && typeof answer === "object" && "pairs" in answer) {
    return stable((answer as { pairs: unknown }).pairs) === stable(question.correctAnswer);
  }
  return stable(answer) === stable(question.correctAnswer);
}

export function hasAnswer(answer: unknown) {
  if (answer === null || answer === undefined || answer === "") return false;
  if (Array.isArray(answer)) return answer.length > 0 && answer.every((item) => item !== null && item !== undefined && item !== "");
  if (typeof answer === "object") {
    if ("pairs" in (answer as object)) return Object.keys((answer as { pairs: object }).pairs).length > 0;
    return Object.keys(answer as object).length > 0;
  }
  return true;
}
