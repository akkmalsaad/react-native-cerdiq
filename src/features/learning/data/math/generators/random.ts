export type RandomSource = () => number;

export function randomInteger(min: number, max: number, random: RandomSource = Math.random) {
  return Math.floor(random() * (max - min + 1)) + min;
}

export function shuffle<T>(values: readonly T[], random: RandomSource = Math.random): T[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function sample<T>(values: readonly T[], random: RandomSource = Math.random): T {
  return values[randomInteger(0, values.length - 1, random)];
}
