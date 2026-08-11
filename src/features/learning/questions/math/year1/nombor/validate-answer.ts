import type { MathQuestion } from "./types";

export function validateAnswer(question: MathQuestion, userAnswer: unknown) {
  const correct = Array.isArray(question.answer)
    ? Array.isArray(userAnswer) && question.answer.length === userAnswer.length && question.answer.every((value, index) => value === userAnswer[index])
    : String(question.answer) === String(userAnswer);
  return { correct, correctAnswer: question.answer, explanation: question.explanation };
}
