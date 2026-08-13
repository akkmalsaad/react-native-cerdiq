import type { LearningContentQuestion } from "../../quiz/quiz-content-types";

import {
  generatePlaceValueDragDrop,
  generatePlaceValueMatch,
  generatePlaceValueMultipleChoice,
  getQuestionSignature,
  type GeneratedPlaceValueQuestion,
} from "./generators/place-value-generators";
import { randomInteger, type RandomSource } from "./generators/random";

const MAX_RECENT_SIGNATURES = 30;
let recentQuestionSignatures: string[] = [];

const generators = {
  "match-pairs": generatePlaceValueMatch,
  "drag-drop": generatePlaceValueDragDrop,
} as const;

type PlaceValueQuizType = keyof typeof generators | "multiple-choice";

function buildTypePlan(random: RandomSource): PlaceValueQuizType[] {
  const plan: PlaceValueQuizType[] = ["multiple-choice", "match-pairs", "drag-drop", "multiple-choice", "match-pairs", "drag-drop", "multiple-choice", "match-pairs", "drag-drop", "multiple-choice"];
  const rotation = randomInteger(0, 2, random);
  return [...plan.slice(rotation), ...plan.slice(0, rotation)];
}

export function createYear1PlaceValueSession({ count = 10, random = Math.random }: { count?: number; random?: RandomSource } = {}): readonly LearningContentQuestion[] {
  const session: GeneratedPlaceValueQuestion[] = [];
  const sessionSignatures = new Set<string>();
  const recent = new Set(recentQuestionSignatures);
  const typePlan = buildTypePlan(random).slice(0, count);

  for (const type of typePlan) {
    // The locked learning-screen artwork contains the original 47-block visual.
    // Keep that one visual question exact; all other content is generated on demand.
    let candidate = type === "multiple-choice" ? generatePlaceValueMultipleChoice(random, 47) : generators[type](random);
    let attempts = 0;
    while ((sessionSignatures.has(getQuestionSignature(candidate)) || recent.has(getQuestionSignature(candidate))) && attempts < 120) {
      candidate = type === "multiple-choice" ? generatePlaceValueMultipleChoice(random, 47) : generators[type](random);
      attempts += 1;
    }
    // A locked visual can exhaust its small set of compatible MC variations.
    // In that case prefer an older question over duplicating one in this session.
    attempts = 0;
    while (sessionSignatures.has(getQuestionSignature(candidate)) && attempts < 120) {
      candidate = type === "multiple-choice" ? generatePlaceValueMultipleChoice(random, 47) : generators[type](random);
      attempts += 1;
    }
    if (sessionSignatures.has(getQuestionSignature(candidate))) continue;
    session.push(candidate);
    sessionSignatures.add(getQuestionSignature(candidate));
  }

  recentQuestionSignatures = [...recentQuestionSignatures, ...session.map(getQuestionSignature)].slice(-MAX_RECENT_SIGNATURES);
  return session;
}

export function clearRecentPlaceValueQuestions() {
  recentQuestionSignatures = [];
}

export function getRecentPlaceValueQuestionSignatures() {
  return [...recentQuestionSignatures];
}
