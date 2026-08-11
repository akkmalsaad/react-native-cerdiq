import { baseQuestion, randomInteger, type RandomSource } from "./helpers";
import type { MathQuestion, MathQuestionDifficulty } from "./types";

export function generateVisualCount(difficulty: MathQuestionDifficulty = 1, random: RandomSource = Math.random): MathQuestion {
  const count = randomInteger(1, difficulty === 1 ? 10 : difficulty === 2 ? 20 : 100, random);
  return { ...baseQuestion, id: `visual-count-${count}`, signature: `visual-count-${count}`, type: "visual_count", difficulty, prompt: "Berapakah bilangan objek ini?", answer: count, options: undefined, visualData: { count }, awiMessage: "Berapa banyak objek yang kamu nampak?", tip: count > 20 ? "Kira kumpulan Puluh dahulu, kemudian tambah Sa." : "Kira objek satu demi satu.", retryTip: count > 20 ? "Setiap batang mewakili 10. Tambah blok Sa." : "Sentuh setiap blok semasa mengira supaya tidak tertinggal.", explanation: `Terdapat ${count} objek semuanya.` };
}
