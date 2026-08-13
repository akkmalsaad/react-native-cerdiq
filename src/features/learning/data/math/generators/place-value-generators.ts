import type {
  DragDropContentQuestion,
  MatchPairsContentQuestion,
  MultipleChoiceContentQuestion,
} from "../../../quiz/quiz-content-types";

import { randomInteger, sample, shuffle, type RandomSource } from "./random";

export type GeneratedPlaceValueMultipleChoice = MultipleChoiceContentQuestion & {
  difficulty: "easy" | "medium";
  signature: string;
  skill: "place-value" | "ones-digit" | "tens-digit" | "tens-value";
  visualData: { ones: number; tens: number };
};

export type GeneratedPlaceValueMatch = MatchPairsContentQuestion & {
  difficulty: "easy";
  signature: string;
  skill: "tens-value";
};

export type GeneratedPlaceValueDragDrop = DragDropContentQuestion & {
  difficulty: "easy" | "medium";
  signature: string;
  skill: "place-value-digits";
};

export type GeneratedPlaceValueQuestion =
  | GeneratedPlaceValueMultipleChoice
  | GeneratedPlaceValueMatch
  | GeneratedPlaceValueDragDrop;

const multipleChoiceMessages = [
  "Bolehkah kamu cari jawapannya?",
  "Jom cuba soalan ini!",
  "Cuba lihat dengan teliti.",
  "Awi perlukan bantuan kamu!",
] as const;

const matchingMessages = [
  "Cari pasangan yang sepadan!",
  "Jom cari pasangan yang betul!",
  "Boleh kamu padankan semuanya?",
] as const;

const dragDropMessages = [
  "Letakkan semuanya di tempat yang betul!",
  "Jom susun digit ini!",
  "Seret digit ke nilai tempatnya.",
] as const;

export function generatePlaceValueDistractors(correctAnswer: number, random: RandomSource = Math.random) {
  const tens = Math.floor(correctAnswer / 10);
  const ones = correctAnswer % 10;
  const reversed = ones * 10 + tens;
  const candidates = [
    reversed,
    correctAnswer - 10,
    correctAnswer + 10,
    tens * 10 + ((ones + 1) % 10),
    tens * 10 + ((ones + 9) % 10),
    Math.max(10, (tens - 1) * 10 + ones),
    Math.min(99, (tens + 1) * 10 + ones),
  ].filter((value) => value >= 10 && value <= 99 && value !== correctAnswer);

  const uniqueCandidates = [...new Set(candidates)];
  for (let value = 10; uniqueCandidates.length < 3 && value <= 99; value += 1) {
    if (value !== correctAnswer && !uniqueCandidates.includes(value)) uniqueCandidates.push(value);
  }
  return shuffle(uniqueCandidates, random).slice(0, 3);
}

export function generatePlaceValueMultipleChoice(random: RandomSource = Math.random, fixedAnswer?: number): GeneratedPlaceValueMultipleChoice {
  const tens = fixedAnswer === undefined ? randomInteger(1, 9, random) : Math.floor(fixedAnswer / 10);
  const ones = fixedAnswer === undefined ? randomInteger(0, 9, random) : fixedAnswer % 10;
  const number = tens * 10 + ones;
  const skill = fixedAnswer === undefined ? "place-value" : sample(["place-value", "tens-digit", "ones-digit", "tens-value"] as const, random);
  const questionBySkill = {
    "place-value": "Berapakah nilai nombor ini?",
    "tens-digit": `Digit apakah yang berada di tempat Puluh bagi nombor ${number}?`,
    "ones-digit": `Digit apakah yang berada di tempat Sa bagi nombor ${number}?`,
    "tens-value": `Berapakah nilai digit ${tens} dalam nombor ${number}?`,
  } as const;
  const tipBySkill = {
    "place-value": "1 Puluh bersamaan 10. Kira Puluh dahulu, kemudian Sa.",
    "tens-digit": "Digit di sebelah kiri berada di tempat Puluh.",
    "ones-digit": "Digit di sebelah kanan berada di tempat Sa.",
    "tens-value": "Digit di tempat Puluh mempunyai nilai dalam gandaan 10.",
  } as const;
  const correctAnswer = skill === "place-value" ? number : skill === "tens-value" ? tens * 10 : skill === "tens-digit" ? tens : ones;
  const distractorsBySkill = skill === "place-value"
    ? generatePlaceValueDistractors(correctAnswer, random)
    : skill === "tens-value"
      ? [tens, ones, ones * 10]
      : [skill === "tens-digit" ? ones : tens, (correctAnswer + 1) % 10, (correctAnswer + 9) % 10];
  const uniqueDistractors = [...new Set(distractorsBySkill)].filter((value) => value !== correctAnswer);
  for (let value = 0; uniqueDistractors.length < 3 && value <= 99; value += 1) {
    if (value !== correctAnswer && !uniqueDistractors.includes(value)) uniqueDistractors.push(value);
  }
  const optionValues = shuffle([correctAnswer, ...uniqueDistractors.slice(0, 3)], random);
  return {
    id: `math-y1-${skill}-${number}`,
    signature: `${skill}:${number}`,
    type: "multiple-choice",
    skill,
    difficulty: ones === 0 ? "easy" : "medium",
    question: questionBySkill[skill],
    awiMessage: sample(multipleChoiceMessages, random),
    tip: tipBySkill[skill],
    visualData: { tens, ones },
    options: optionValues.map((value) => ({ id: String(value), label: String(value) })),
    correctOptionId: String(correctAnswer),
  };
}

export function generatePlaceValueMatch(random: RandomSource = Math.random): GeneratedPlaceValueMatch {
  const tensValues = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], random).slice(0, 3).sort((a, b) => a - b);
  const signature = `tens-match:${tensValues.join("-")}`;
  return {
    id: `math-y1-${signature}`,
    signature,
    type: "match-pairs",
    skill: "tens-value",
    difficulty: "easy",
    question: "Padankan nilai Puluh dengan nombornya.",
    awiMessage: sample(matchingMessages, random),
    tip: "1 Puluh bersamaan 10. Fikir nilai beberapa Puluh.",
    pairs: tensValues.map((value) => ({
      leftId: `${value}-puluh`,
      leftLabel: `${value} puluh`,
      rightId: String(value * 10),
      rightLabel: String(value * 10),
    })),
  };
}

export function generatePlaceValueDragDrop(random: RandomSource = Math.random): GeneratedPlaceValueDragDrop {
  const tens = randomInteger(1, 9, random);
  let ones = randomInteger(0, 9, random);
  if (ones === tens) ones = (ones + 1) % 10;
  const number = tens * 10 + ones;
  return {
    id: `math-y1-place-value-digits-${number}`,
    signature: `place-value:${number}:digits`,
    type: "drag-drop",
    skill: "place-value-digits",
    difficulty: ones === 0 ? "easy" : "medium",
    question: sample([
      `Letakkan digit nombor ${number} pada nilai tempat yang betul.`,
      `Bina nombor ${number}.`,
      `Lengkapkan nilai tempat bagi ${number}.`,
    ], random),
    awiMessage: sample(dragDropMessages, random),
    tip: "Digit kiri ialah Puluh dan digit kanan ialah Sa.",
    items: shuffle([
      { id: String(tens), label: String(tens) },
      { id: String(ones), label: String(ones) },
    ], random),
    targets: [
      { id: "puluh", label: "PULUH" },
      { id: "sa", label: "SA" },
    ],
    correctPlacements: { puluh: String(tens), sa: String(ones) },
  };
}

export function getQuestionSignature(question: GeneratedPlaceValueQuestion) {
  return question.signature;
}
