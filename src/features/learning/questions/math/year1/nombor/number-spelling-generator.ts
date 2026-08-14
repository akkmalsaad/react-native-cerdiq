import { baseQuestion, randomInteger, sample, shuffle, type RandomSource } from "./helpers";
import { numberToMalayWords } from "./number-to-malay-words";
import type { MathQuestion, MathQuestionDifficulty } from "./types";

const INSTRUCTIONS = [
  "Eja nombor ini.",
  "Apakah ejaan bagi nombor ini?",
  "Pilih ejaan yang betul.",
  "Yang manakah ejaan bagi nombor ini?",
  "Bagaimanakah nombor ini dieja?",
];

/** Believable wrong answers: digit reversal, near neighbours, belas/puluh mix-ups, single-digit slips. */
function candidateDistractors(value: number, random: RandomSource): number[] {
  const tens = Math.floor(value / 10);
  const ones = value % 10;
  const candidates = new Set<number>();

  if (value < 100 && tens !== ones) candidates.add(ones * 10 + tens);
  candidates.add(value - 1);
  candidates.add(value + 1);
  candidates.add(value - 10);
  candidates.add(value + 10);
  if (value >= 12 && value <= 19) candidates.add((value - 10) * 10);
  if (value >= 20 && value <= 29) candidates.add(value - 20 + 10);

  if (value < 100) {
    let newOnes = randomInteger(0, 9, random);
    if (newOnes === ones) newOnes = (newOnes + 1) % 10;
    candidates.add(tens * 10 + newOnes);
  }
  if (value < 100 && tens >= 1) {
    let newTens = randomInteger(1, 9, random);
    if (newTens === tens) newTens = (newTens % 9) + 1;
    candidates.add(newTens * 10 + ones);
  }

  return [...candidates].filter((candidate) => candidate >= 0 && candidate <= 100 && candidate !== value);
}

export function generateNumberSpelling(difficulty: MathQuestionDifficulty = 1, random: RandomSource = Math.random): MathQuestion {
  const value = randomInteger(0, 100, random);
  const correct = numberToMalayWords(value);

  const distractorValues: number[] = [];
  for (const candidate of shuffle(candidateDistractors(value, random), random)) {
    if (distractorValues.length >= 3) break;
    if (!distractorValues.includes(candidate)) distractorValues.push(candidate);
  }
  let guard = 0;
  while (distractorValues.length < 3 && guard < 200) {
    const fallback = randomInteger(0, 100, random);
    if (fallback !== value && !distractorValues.includes(fallback)) distractorValues.push(fallback);
    guard += 1;
  }

  const options = shuffle([correct, ...distractorValues.map(numberToMalayWords)], random);
  const instruction = sample(INSTRUCTIONS, random);

  return {
    ...baseQuestion,
    id: `number-spelling-${value}`,
    signature: `number-spelling-${value}`,
    type: "number_spelling",
    difficulty,
    prompt: instruction,
    answer: correct,
    options,
    visualData: { number: value },
    awiMessage: "Bolehkah kamu eja nombor ini?",
    tip: "Perhatikan nilai puluh dan sa sebelum memilih ejaan nombor.",
    retryTip: "Pecahkan nombor kepada puluh dan sa, kemudian eja setiap bahagian.",
    explanation: `${value} dieja sebagai "${correct}".`,
  };
}
