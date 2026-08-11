import { images } from "@/lib/images";

import type { MathTopic, MathTopicIcon } from "./types";

export type MathTopicId =
  | "nombor"
  | "tambah"
  | "tolak"
  | "pecahan"
  | "wang"
  | "masa"
  | "ukuran"
  | "ruang"
  | "data"
  | "darab"
  | "bahagi"
  | "perpuluhan"
  | "peratus"
  | "koordinat"
  | "nisbah"
  | "kepadanan";

const icon = (x: number, y: number, width: number, height: number): MathTopicIcon => ({
  crop: { height, width, x, y },
  source: images.mathTopicSheet,
});

export const mathTopics: Record<MathTopicId, Pick<MathTopic, "description" | "icon" | "id" | "title">> = {
  nombor: { id: "nombor", title: "Nombor", description: "Kenali nombor, susun dan nilai tempat.", icon: icon(40, 29, 255, 286) },
  tambah: { id: "tambah", title: "Tambah", description: "Kuasai operasi tambah.", icon: icon(314, 29, 245, 286) },
  tolak: { id: "tolak", title: "Tolak", description: "Kuasai operasi tolak.", icon: icon(577, 29, 240, 286) },
  pecahan: { id: "pecahan", title: "Pecahan", description: "Kenali dan selesaikan pecahan.", icon: icon(833, 29, 240, 286) },
  wang: { id: "wang", title: "Wang", description: "Kenali dan gunakan wang Malaysia.", icon: icon(1090, 29, 239, 286) },
  masa: { id: "masa", title: "Masa dan Waktu", description: "Kenal waktu dan baca jam.", icon: icon(1346, 29, 232, 286) },
  ukuran: { id: "ukuran", title: "Ukuran dan Sukatan", description: "Ukur panjang, jisim dan isipadu.", icon: icon(40, 343, 288, 274) },
  ruang: { id: "ruang", title: "Ruang", description: "Kenali bentuk, ruang dan kedudukan.", icon: icon(354, 343, 283, 274) },
  data: { id: "data", title: "Data", description: "Kumpul, baca dan tafsir data.", icon: icon(661, 343, 298, 274) },
  darab: { id: "darab", title: "Darab", description: "Kuasai sifir dan operasi darab.", icon: icon(985, 343, 266, 274) },
  bahagi: { id: "bahagi", title: "Bahagi", description: "Fahami operasi bahagi sama rata.", icon: icon(1276, 343, 300, 274) },
  perpuluhan: { id: "perpuluhan", title: "Perpuluhan", description: "Kenali dan banding nilai perpuluhan.", icon: icon(40, 643, 288, 263) },
  peratus: { id: "peratus", title: "Peratus", description: "Kenali nilai dan pengiraan peratus.", icon: icon(353, 643, 284, 263) },
  koordinat: { id: "koordinat", title: "Koordinat", description: "Kenali kedudukan pada satah koordinat.", icon: icon(659, 643, 300, 263) },
  nisbah: { id: "nisbah", title: "Nisbah", description: "Banding kuantiti menggunakan nisbah.", icon: icon(981, 643, 275, 263) },
  kepadanan: { id: "kepadanan", title: "Kepadanan", description: "Padankan objek dan nilai yang berkaitan.", icon: icon(1275, 643, 302, 263) },
};

export const mathTopicsByYear = {
  1: ["nombor", "tambah", "tolak", "pecahan", "wang", "masa", "ukuran", "ruang", "kepadanan"],
  2: ["nombor", "tambah", "tolak", "darab", "bahagi", "pecahan", "wang", "masa", "ukuran", "ruang", "data"],
  3: ["nombor", "tambah", "tolak", "darab", "bahagi", "pecahan", "perpuluhan", "wang", "masa", "ukuran", "ruang", "koordinat", "data"],
  4: ["nombor", "tambah", "tolak", "darab", "bahagi", "pecahan", "perpuluhan", "wang", "masa", "ukuran", "ruang", "koordinat", "data"],
  5: ["nombor", "tambah", "tolak", "darab", "bahagi", "pecahan", "perpuluhan", "peratus", "wang", "masa", "ukuran", "ruang", "data", "nisbah"],
  6: ["nombor", "tambah", "tolak", "darab", "bahagi", "pecahan", "perpuluhan", "peratus", "nisbah", "masa", "ukuran", "ruang", "koordinat", "data"],
} as const satisfies Record<number, readonly MathTopicId[]>;

const completedByYear: Record<number, readonly [number, number]> = {
  1: [12, 8],
  2: [10, 6],
  3: [9, 5],
  4: [8, 4],
  5: [7, 3],
  6: [6, 2],
};

export function getMathTopicsForYear(year: keyof typeof mathTopicsByYear): readonly MathTopic[] {
  return mathTopicsByYear[year].map((topicId, index) => ({
    ...mathTopics[topicId],
    completedLessons: index < 2 ? completedByYear[year][index] : 0,
    locked: index >= 2,
    totalLessons: index < 2 ? 15 : 10,
  }));
}
