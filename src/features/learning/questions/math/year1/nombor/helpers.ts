export type RandomSource = () => number;

export const randomInteger = (min: number, max: number, random: RandomSource = Math.random) =>
  Math.floor(random() * (max - min + 1)) + min;

export function sample<T>(items: readonly T[], random: RandomSource = Math.random): T {
  return items[randomInteger(0, items.length - 1, random)];
}

export function shuffle<T>(items: readonly T[], random: RandomSource = Math.random): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInteger(0, index, random);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function uniqueOptions(answer: number, candidates: number[], random: RandomSource) {
  const values = [...new Set(candidates)].filter((value) => value >= 0 && value <= 100 && value !== answer);
  for (let delta = 1; values.length < 3; delta += 1) {
    for (const value of [answer - delta, answer + delta]) {
      if (value >= 0 && value <= 100 && value !== answer && !values.includes(value)) values.push(value);
    }
  }
  return shuffle([answer, ...values.slice(0, 3)], random);
}

export const baseQuestion = {
  subject: "math" as const,
  year: 1 as const,
  topic: "nombor" as const,
};
