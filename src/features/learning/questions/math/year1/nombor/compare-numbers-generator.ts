import { baseQuestion, randomInteger, sample, type RandomSource } from "./helpers";
import type { MathQuestion, MathQuestionDifficulty } from "./types";

export function generateCompareNumbers(difficulty: MathQuestionDifficulty = 1, random: RandomSource = Math.random): MathQuestion {
  const max = difficulty === 1 ? 10 : difficulty === 2 ? 20 : 100;
  const first = randomInteger(1, max, random);
  let second = randomInteger(1, max, random);
  if (second === first) second = first === max ? first - 1 : first + 1;
  const compareMode = sample(["larger", "smaller"] as const, random);
  const answer = compareMode === "larger" ? Math.max(first, second) : Math.min(first, second);
  const word = compareMode === "larger" ? "lebih besar" : "lebih kecil";
  return { ...baseQuestion, id: `compare-${first}-${second}-${compareMode}`, signature: `compare-${first}-${second}-${compareMode}`, type: "compare_numbers", difficulty, prompt: `Nombor manakah ${word}?`, answer, options: [first, second], visualData: { numbers: [first, second], compareMode }, awiMessage: `Nombor manakah ${word}?`, tip: "Bandingkan nilai kedua-dua nombor.", retryTip: max > 20 ? "Bandingkan digit Puluh dahulu." : "Bayangkan kedudukan nombor pada garis nombor.", explanation: `${answer} ialah nombor yang ${word}.` };
}
