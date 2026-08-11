import { baseQuestion, randomInteger, sample, type RandomSource } from "./helpers";
import type { MathQuestion, MathQuestionDifficulty } from "./types";

export function generateNumberBond(difficulty: MathQuestionDifficulty = 1, random: RandomSource = Math.random): MathQuestion {
  const total = randomInteger(5, difficulty === 1 ? 10 : difficulty === 2 ? 20 : 100, random);
  const knownPart = randomInteger(total === 5 ? 1 : 0, total, random);
  const missingPosition = sample(["left", "right"] as const, random);
  const answer = total - knownPart;
  const prompt = sample([
    "Lengkapkan ayat nombor.",
    missingPosition === "right" ? `${total} ialah ${knownPart} dan __.` : `${total} ialah __ dan ${knownPart}.`,
    `${knownPart} dan __ menjadi ${total}.`,
  ], random);
  return { ...baseQuestion, id: `number-bond-${total}-${knownPart}-${missingPosition}`, signature: `number-bond-${total}-${knownPart}-${missingPosition}`, type: "number_bond", difficulty, prompt, answer, options: undefined, visualData: { total, knownPart, missingPosition }, awiMessage: "Bolehkah kamu lengkapkan nombor ini?", tip: "Dua bahagian mesti menjadi jumlah yang sama.", retryTip: `Kira dari ${knownPart} sehingga ${total}.`, explanation: `${knownPart} dan ${answer} menjadi ${total}.` };
}
