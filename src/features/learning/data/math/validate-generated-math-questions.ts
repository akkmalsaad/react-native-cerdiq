import {
  generatePlaceValueDragDrop,
  generatePlaceValueMatch,
  generatePlaceValueMultipleChoice,
  type GeneratedPlaceValueQuestion,
} from "./generators/place-value-generators";
import { clearRecentPlaceValueQuestions, createYear1PlaceValueSession } from "./year-1-place-value-session";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export function validateGeneratedPlaceValueQuestion(question: GeneratedPlaceValueQuestion) {
  assert(Boolean(question.id), "Question ID is required");
  assert(Boolean(question.signature), "Question signature is required");
  assert(Boolean(question.tip), "Tip Awi is required");

  if (question.type === "multiple-choice") {
    const values = question.options.map((option) => option.id);
    const number = question.visualData.tens * 10 + question.visualData.ones;
    const answer = question.skill === "place-value" ? number : question.skill === "tens-value" ? question.visualData.tens * 10 : question.skill === "tens-digit" ? question.visualData.tens : question.visualData.ones;
    assert(number >= 10 && number <= 99, "Place-value number is outside the topic range");
    assert(question.correctOptionId === String(answer), "Visual data does not match the correct answer");
    assert(new Set(values).size === values.length, "Multiple-choice options contain duplicates");
    assert(values.filter((value) => value === question.correctOptionId).length === 1, "Correct answer must appear exactly once");
  } else if (question.type === "match-pairs") {
    const leftIds = question.pairs.map((pair) => pair.leftId);
    const rightIds = question.pairs.map((pair) => pair.rightId);
    assert(new Set(leftIds).size === leftIds.length, "Matching left IDs must be unique");
    assert(new Set(rightIds).size === rightIds.length, "Matching right IDs must be unique");
    assert(question.pairs.every((pair) => Number(pair.leftId.split("-")[0]) * 10 === Number(pair.rightId)), "Matching relationship is invalid");
  } else {
    const itemIds = question.items.map((item) => item.id);
    assert(new Set(itemIds).size === itemIds.length, "Drag/drop items must be unique");
    assert(question.targets.every((target) => itemIds.includes(question.correctPlacements[target.id])), "Drag/drop placement is invalid");
  }
}

export function validatePlaceValueGenerators(iterations = 100) {
  for (let index = 0; index < iterations; index += 1) {
    validateGeneratedPlaceValueQuestion(generatePlaceValueMultipleChoice());
    validateGeneratedPlaceValueQuestion(generatePlaceValueMatch());
    validateGeneratedPlaceValueQuestion(generatePlaceValueDragDrop());
  }
  return iterations * 3;
}

export function validatePlaceValueSessions(iterations = 20) {
  clearRecentPlaceValueQuestions();
  let previousIds = new Set<string>();
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const session = createYear1PlaceValueSession();
    const ids = session.map((question) => question.id);
    assert(session.length === 10, "A lesson session must contain 10 questions");
    assert(new Set(ids).size === ids.length, "A lesson session contains duplicate questions");
    for (let index = 2; index < session.length; index += 1) {
      assert(!(session[index].type === session[index - 1].type && session[index].type === session[index - 2].type), "A quiz type appears more than twice consecutively");
    }
    const repeatedGeneratedInteractions = session.filter((question) => question.type !== "multiple-choice" && previousIds.has(question.id));
    assert(repeatedGeneratedInteractions.length <= 1, "Too many generated interactions repeated from the previous session");
    previousIds = new Set(ids);
  }
  return iterations;
}
