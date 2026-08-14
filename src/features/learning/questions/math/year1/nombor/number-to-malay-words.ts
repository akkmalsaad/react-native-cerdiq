const ONES = ["sifar", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "lapan", "sembilan"];

export function numberToMalayWords(value: number): string {
  if (value === 100) return "seratus";
  if (value < 10) return ONES[value];
  if (value === 10) return "sepuluh";
  if (value === 11) return "sebelas";
  if (value < 20) return `${ONES[value - 10]} belas`;
  const tens = Math.floor(value / 10);
  const ones = value % 10;
  const tensWord = `${ONES[tens]} puluh`;
  return ones === 0 ? tensWord : `${tensWord} ${ONES[ones]}`;
}
