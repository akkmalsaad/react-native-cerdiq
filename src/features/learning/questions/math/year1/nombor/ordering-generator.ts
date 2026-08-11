import { baseQuestion, randomInteger, sample, shuffle, type RandomSource } from "./helpers";
import type { MathQuestion, MathQuestionDifficulty } from "./types";

export function generateOrdering(difficulty: MathQuestionDifficulty = 1, random: RandomSource = Math.random): MathQuestion {
  const max = difficulty === 1 ? 10 : difficulty === 2 ? 20 : 100;
  const values = new Set<number>();
  while (values.size < 4) values.add(randomInteger(1, max, random));
  const numbers = [...values];
  const direction = sample(["ascending", "descending"] as const, random);
  const answer = [...numbers].sort((a, b) => direction === "ascending" ? a - b : b - a);
  const phrase = direction === "ascending" ? "kecil ke besar" : "besar ke kecil";
  return { ...baseQuestion, id: `ordering-${direction}-${[...numbers].sort((a, b) => a - b).join("-")}`, signature: `ordering-${direction}-${[...numbers].sort((a, b) => a - b).join("-")}`, type: "ordering", difficulty, prompt: `Susun nombor daripada ${phrase}.`, answer, options: shuffle(numbers, random), visualData: { numbers }, awiMessage: "Bolehkah kamu susun nombor ini?", tip: `Mulakan dengan nombor yang paling ${direction === "ascending" ? "kecil" : "besar"}.`, retryTip: max > 20 ? "Bandingkan digit Puluh dahulu, kemudian digit Sa." : "Cari nombor pertama, kemudian pilih nombor terdekat seterusnya.", explanation: `Susunan yang betul ialah ${answer.join(", ")}.` };
}
