import { baseQuestion, randomInteger, sample, type RandomSource } from "./helpers";
import { COMPARE_ICON_TYPES, type MathQuestion, type MathQuestionDifficulty } from "./types";

const MORE_INSTRUCTIONS = [
  "Yang manakah lebih banyak?",
  "Kumpulan mana mempunyai lebih banyak objek?",
  "Pilih kumpulan yang lebih banyak.",
];
const LESS_INSTRUCTIONS = [
  "Yang manakah lebih sedikit?",
  "Kumpulan mana mempunyai lebih sedikit objek?",
  "Pilih kumpulan yang lebih sedikit.",
];

export function generateCompareIcons(difficulty: MathQuestionDifficulty = 1, random: RandomSource = Math.random): MathQuestion {
  const left = randomInteger(1, 10, random);
  let right = randomInteger(1, 10, random);
  while (right === left) right = randomInteger(1, 10, random);

  const comparison = sample(["more", "less"] as const, random);
  const iconType = sample(COMPARE_ICON_TYPES, random);
  const answerSide: "left" | "right" = comparison === "more" ? (left > right ? "left" : "right") : (left < right ? "left" : "right");
  const answer = answerSide === "left" ? "Kiri" : "Kanan";
  const instruction = sample(comparison === "more" ? MORE_INSTRUCTIONS : LESS_INSTRUCTIONS, random);
  const answerCount = answerSide === "left" ? left : right;
  const otherCount = answerSide === "left" ? right : left;

  return {
    ...baseQuestion,
    id: `compare-icons-${left}-${right}-${comparison}-${iconType}`,
    signature: `compare-icons-${left}-${right}-${comparison}-${iconType}`,
    type: "compare_icons",
    difficulty,
    prompt: instruction,
    answer,
    options: ["Kiri", "Kanan"],
    visualData: { comparison, iconType, leftCount: left, rightCount: right },
    awiMessage: "Bandingkan kedua-dua kumpulan ini.",
    tip: "Kira objek di kedua-dua kumpulan dahulu, kemudian bandingkan.",
    retryTip: "Kira semula setiap kumpulan satu demi satu sebelum memilih.",
    explanation: `Kumpulan ${answer} mempunyai ${answerCount} objek, ${comparison === "more" ? "lebih banyak" : "lebih sedikit"} daripada ${otherCount}.`,
  };
}
