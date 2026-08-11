import { generateNomborQuestion } from "./generate-nombor-question";
import { clearRecentNomborQuestions, generateNomborLesson } from "./generate-nombor-lesson";
import type { MathQuestion } from "./types";

function assert(condition: boolean, message: string): asserts condition { if (!condition) throw new Error(message); }

export function validateNomborQuestion(question: MathQuestion) {
  assert(Boolean(question.id && question.signature && question.prompt && question.tip && question.explanation), "Required question data is missing");
  if (question.options) {
    assert(new Set(question.options.map(String)).size === question.options.length, "Options must be unique");
    assert(question.options.map(String).filter((value) => value === String(question.answer)).length === 1 || question.type === "ordering", "The answer must appear exactly once");
  }
  if (question.type === "number_bond") assert((question.visualData?.knownPart ?? -1) + Number(question.answer) === question.visualData?.total, "Invalid number bond");
  if (question.type === "visual_count") assert(question.visualData?.count === question.answer, "Visual count does not match answer");
  if (question.type === "missing_number") assert(question.visualData?.numbers?.[question.visualData.missingIndex ?? -1] === question.answer, "Invalid sequence answer");
  if (question.type === "ordering") {
    const expected = [...(question.options as number[])].sort((a, b) => (question.answer as number[])[0] < (question.answer as number[]).at(-1)! ? a - b : b - a);
    assert(expected.every((value, index) => value === (question.answer as number[])[index]), "Invalid ordering answer");
  }
}

export function validateNomborGenerators(iterations = 100) {
  for (let index = 0; index < iterations; index += 1) validateNomborQuestion(generateNomborQuestion({ difficulty: ((index % 3) + 1) as 1 | 2 | 3 }));
  clearRecentNomborQuestions();
  for (let index = 0; index < 20; index += 1) {
    const lesson = generateNomborLesson({ difficulty: ((index % 3) + 1) as 1 | 2 | 3 });
    assert(lesson.length === 10, "Lesson must contain 10 questions");
    assert(new Set(lesson.map((question) => question.signature)).size === lesson.length, "Lesson contains duplicate questions");
    lesson.forEach(validateNomborQuestion);
    for (let questionIndex = 2; questionIndex < lesson.length; questionIndex += 1) assert(!(lesson[questionIndex].type === lesson[questionIndex - 1].type && lesson[questionIndex].type === lesson[questionIndex - 2].type), "Question type repeated more than twice");
  }
  return iterations;
}
