import type { QuizQuestion, QuizType } from "@/features/learning/types/quiz";

const base = (id: string, type: QuizType, question: string, correctAnswer: unknown, extra: Partial<QuizQuestion> = {}): QuizQuestion => ({
  id, type, question, correctAnswer, subject: "math", year: 1, topic: "Nombor hingga 100", difficulty: "easy",
  awiMessage: type === "sort-order" ? "Boleh kamu susunkan untuk Awi?" : type === "match-pairs" ? "Cari pasangan yang sepadan!" : type === "build-answer" ? "Jom bina jawapannya!" : type === "number-line" ? "Cuba tunjukkan Awi tempat nombor ini." : type === "drag-drop" ? "Jom bantu Awi letakkan semuanya di tempat yang betul!" : "Awi ingin tahu, bolehkah kamu cari jawapannya?",
  explanation: "Bagus mencuba! Lihat nilai Puluh dan Sa untuk memahami nombor.", tipConcept: "nilai tempat puluh dan sa", ...extra,
});

const opts = (...values: number[]) => values.map((value) => ({ id: String(value), label: String(value), value }));
const zones = [{ id: "tens", label: "PULUH" }, { id: "ones", label: "SA" }];

export const year1NumberQuestions: readonly QuizQuestion[] = [
  base("n100-mc-47", "multiple-choice", "Berapakah nilai nombor ini?", 47, { options: opts(37, 47, 57, 74), visualData: { tens: 4, ones: 7 }, tip: "1 batang Puluh ada 10 blok. Kira Puluh dahulu, kemudian tambah blok Sa." }),
  base("n100-mc-32", "multiple-choice", "Apakah nombor bagi 3 puluh dan 2 sa?", 32, { options: opts(23, 30, 32, 42) }),
  base("n100-mc-68", "multiple-choice", "Pilih nombor yang ditunjukkan.", 68, { options: opts(86, 58, 68, 78), visualData: { tens: 6, ones: 8 }, difficulty: "medium" }),
  base("n100-dd-47", "drag-drop", "Seret nombor ke tempat yang betul.", { ones: "7", tens: "4" }, { options: opts(4, 7), visualData: { zones }, instruction: "Letakkan digit mengikut nilai tempat." }),
  base("n100-dd-25", "drag-drop", "Bina nombor 25 mengikut nilai tempat.", { ones: "5", tens: "2" }, { options: opts(2, 5), visualData: { zones } }),
  base("n100-dd-91", "drag-drop", "Letakkan digit 91 di ruang yang betul.", { ones: "1", tens: "9" }, { options: opts(9, 1), visualData: { zones }, difficulty: "medium" }),
  base("n100-sort-up", "sort-order", "Susun nombor daripada kecil ke besar.", ["18", "30", "45", "62"], { options: opts(62, 18, 45, 30), tip: "Bandingkan digit Puluh dahulu. Jika sama, bandingkan digit Sa." }),
  base("n100-sort-down", "sort-order", "Susun nombor daripada besar ke kecil.", ["83", "56", "29", "14"], { options: opts(29, 83, 14, 56), difficulty: "medium" }),
  base("n100-match-tens", "match-pairs", "Padankan nilai Puluh dengan nombornya.", { "3 puluh": "30", "4 puluh": "40", "7 puluh": "70" }, { visualData: { pairs: [{ left: "4 puluh", right: "40" }, { left: "3 puluh", right: "30" }, { left: "7 puluh", right: "70" }] } }),
  base("n100-match-words", "match-pairs", "Padankan perkataan dengan nombor.", { "dua puluh": "20", "lima puluh": "50", "lapan puluh": "80" }, { visualData: { pairs: [{ left: "dua puluh", right: "20" }, { left: "lima puluh", right: "50" }, { left: "lapan puluh", right: "80" }] }, difficulty: "medium" }),
  base("n100-build-47", "build-answer", "Bina nombor empat puluh tujuh.", "47", { visualData: { slots: 2 } }),
  base("n100-build-83", "build-answer", "Bina nombor lapan puluh tiga.", "83", { visualData: { slots: 2 }, difficulty: "medium" }),
  base("n100-line-47", "number-line", "Di manakah nombor 47?", 47, { visualData: { min: 40, max: 50, step: 1 }, tip: "47 berada selepas 46 dan sebelum 48." }),
  base("n100-line-65", "number-line", "Pilih kedudukan nombor 65.", 65, { visualData: { min: 60, max: 70, step: 1 }, difficulty: "medium" }),
  base("n100-tap-36", "tap-object", "Pilih kumpulan yang mempunyai 36 blok.", 36, { options: [{ id: "26", label: "26", value: 26, quantity: 26 }, { id: "36", label: "36", value: 36, quantity: 36 }, { id: "43", label: "43", value: 43, quantity: 43 }] }),
  base("n100-tap-52", "tap-object", "Pilih kumpulan yang mempunyai 52 blok.", 52, { options: [{ id: "25", label: "25", value: 25, quantity: 25 }, { id: "42", label: "42", value: 42, quantity: 42 }, { id: "52", label: "52", value: 52, quantity: 52 }], difficulty: "medium" }),
  base("n100-tf-47", "true-false", "47 mempunyai 4 puluh dan 7 sa.", true, { tip: "Digit kiri menunjukkan Puluh dan digit kanan menunjukkan Sa." }),
  base("n100-tf-63", "true-false", "63 mempunyai 6 sa dan 3 puluh.", false, { difficulty: "medium", tip: "Baca nilai tempat dari kiri: Puluh, kemudian Sa." }),
];
