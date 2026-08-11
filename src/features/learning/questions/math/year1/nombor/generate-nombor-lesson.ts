import { shuffle, type RandomSource } from "./helpers";
import { generateNomborQuestion, nomborGenerators } from "./generate-nombor-question";
import type { MathQuestion, MathQuestionDifficulty, MathQuestionType } from "./types";

const MAX_RECENT = 40;
let recentSignatures: string[] = [];

function buildTypePlan(count: number, random: RandomSource) {
  const types = Object.keys(nomborGenerators) as MathQuestionType[];
  const plan: MathQuestionType[] = [];
  while (plan.length < count) {
    for (const type of shuffle(types, random)) {
      if (plan.length >= count) break;
      const lastTwo = plan.slice(-2);
      if (lastTwo.length === 2 && lastTwo.every((recent) => recent === type)) continue;
      plan.push(type);
    }
  }
  return plan;
}

export function generateNomborLesson({ questionCount = 10, difficulty = 1, random = Math.random }: { questionCount?: number; difficulty?: MathQuestionDifficulty; random?: RandomSource } = {}): MathQuestion[] {
  const session: MathQuestion[] = [];
  const used = new Set<string>();
  const recent = new Set(recentSignatures);
  for (const type of buildTypePlan(questionCount, random)) {
    let question = generateNomborQuestion({ difficulty, random, type });
    let attempts = 0;
    while ((used.has(question.signature) || recent.has(question.signature)) && attempts < 150) {
      question = generateNomborQuestion({ difficulty, random, type });
      attempts += 1;
    }
    while (used.has(question.signature) && attempts < 300) {
      question = generateNomborQuestion({ difficulty, random, type });
      attempts += 1;
    }
    if (!used.has(question.signature)) {
      used.add(question.signature);
      session.push(question);
    }
  }
  recentSignatures = [...recentSignatures, ...session.map((question) => question.signature)].slice(-MAX_RECENT);
  return session;
}

export const clearRecentNomborQuestions = () => { recentSignatures = []; };
export const getRecentNomborSignatures = () => [...recentSignatures];
