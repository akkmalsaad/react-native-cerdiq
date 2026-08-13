import type { QuizDifficulty, QuizQuestion } from "@/features/learning/types/quiz";

const targetDifficulty: QuizDifficulty[] = ["easy", "easy", "easy", "medium", "easy", "medium", "medium", "medium", "medium", "medium"];

export function buildQuizSession(pool: readonly QuizQuestion[], count = 10, recentQuestionIds: readonly string[] = []) {
  const recent = new Set(recentQuestionIds);
  const shuffled = [...pool].filter((q) => !recent.has(q.id)).sort(() => Math.random() - 0.5);
  const result: QuizQuestion[] = [];
  for (let index = 0; index < count && shuffled.length; index += 1) {
    const desired = targetDifficulty[index] ?? "medium";
    const lastType = result.at(-1)?.type;
    let pick = shuffled.findIndex((q) => q.difficulty === desired && q.type !== lastType);
    if (pick < 0) pick = shuffled.findIndex((q) => q.type !== lastType);
    result.push(shuffled.splice(Math.max(0, pick), 1)[0]);
  }
  return result;
}
