import { baseQuestion, randomInteger, sample, type RandomSource } from "./helpers";
import type { MathQuestion, MathQuestionDifficulty } from "./types";

export function generateMissingNumber(difficulty: MathQuestionDifficulty = 1, random: RandomSource = Math.random): MathQuestion {
  const step = difficulty === 3 ? sample([1, 2] as const, random) : 1;
  const length = difficulty === 1 ? 5 : 4;
  const max = difficulty === 1 ? 10 : difficulty === 2 ? 20 : 100;
  const start = randomInteger(1, max - step * (length - 1), random);
  const numbers = Array.from({ length }, (_, index) => start + index * step);
  const missingIndex = randomInteger(1, length - 2, random);
  const answer = numbers[missingIndex];
  return { ...baseQuestion, id: `missing-${numbers.join("-")}-${missingIndex}`, signature: `missing-${numbers.join("-")}-${missingIndex}`, type: "missing_number", difficulty, prompt: "Apakah nombor yang hilang?", answer, options: undefined, visualData: { numbers, missingIndex }, awiMessage: "Bolehkah kamu cari nombor yang hilang?", tip: "Lihat nombor sebelum dan selepas ruang kosong.", retryTip: `Kira ${step === 1 ? "satu demi satu" : "dua-dua"} dari ${numbers[0]}.`, explanation: `Urutannya ialah ${numbers.join(", ")}.` };
}
