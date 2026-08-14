import { generateCompareIcons } from "./compare-icons-generator";
import { generateCompareNumbers } from "./compare-numbers-generator";
import { sample, type RandomSource } from "./helpers";
import { generateMissingNumber } from "./missing-number-generator";
import { generateMultipleChoice } from "./multiple-choice-generator";
import { generateNumberBond } from "./number-bond-generator";
import { generateNumberSpelling } from "./number-spelling-generator";
import { generateOrdering } from "./ordering-generator";
import type { MathQuestionDifficulty, MathQuestionType, NomborGenerator } from "./types";
import { generateVisualCount } from "./visual-count-generator";

export const nomborGenerators: Record<MathQuestionType, NomborGenerator> = {
  number_bond: generateNumberBond,
  visual_count: generateVisualCount,
  multiple_choice: generateMultipleChoice,
  compare_numbers: generateCompareNumbers,
  missing_number: generateMissingNumber,
  ordering: generateOrdering,
  number_spelling: generateNumberSpelling,
  compare_icons: generateCompareIcons,
};

export function generateNomborQuestion({ difficulty = 1, random = Math.random, type }: { difficulty?: MathQuestionDifficulty; random?: RandomSource; type?: MathQuestionType } = {}) {
  const selectedType = type ?? sample(Object.keys(nomborGenerators) as MathQuestionType[], random);
  return nomborGenerators[selectedType](difficulty, random);
}
