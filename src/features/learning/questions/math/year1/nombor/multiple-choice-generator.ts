import { baseQuestion, randomInteger, sample, uniqueOptions, type RandomSource } from "./helpers";
import type { MathQuestion, MathQuestionDifficulty } from "./types";

export function generateMultipleChoice(difficulty: MathQuestionDifficulty = 1, random: RandomSource = Math.random): MathQuestion {
  const max = difficulty === 1 ? 10 : difficulty === 2 ? 20 : 99;
  const direction = sample(["before", "after"] as const, random);
  const number = randomInteger(direction === "before" ? 2 : 1, direction === "after" ? max - 1 : max, random);
  const answer = direction === "after" ? number + 1 : number - 1;
  const word = direction === "after" ? "selepas" : "sebelum";
  return { ...baseQuestion, id: `${direction}-number-${number}`, signature: `${direction}-number-${number}`, type: "multiple_choice", difficulty, prompt: `Apakah nombor ${word} ${number}?`, answer, options: uniqueOptions(answer, [number, answer - 1, answer + 1, number + (direction === "after" ? 2 : -2)], random), awiMessage: "Bolehkah kamu cari nombor yang betul?", tip: direction === "after" ? "Nombor selepas ialah satu lebih." : "Nombor sebelum ialah satu kurang.", retryTip: direction === "after" ? `Mula pada ${number}, kemudian kira satu langkah ke hadapan.` : `Mula pada ${number}, kemudian kira satu langkah ke belakang.`, explanation: `${answer} ialah nombor ${word} ${number}.` };
}
