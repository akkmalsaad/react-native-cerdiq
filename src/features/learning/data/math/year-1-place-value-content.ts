import type { LearningContentQuestion } from "@/features/learning/quiz/quiz-content-types";

export const year1PlaceValueContent: readonly LearningContentQuestion[] = [
  {
    id: "math-y1-puluh-mc-01",
    type: "multiple-choice",
    question: "Berapakah nilai nombor ini?",
    awiMessage: "Bolehkah kamu pilih nilai nombor ini?",
    tip: "Kecil ke besar bermaksud nilai nombor semakin bertambah!",
    options: [
      { id: "37", label: "37" },
      { id: "47", label: "47" },
      { id: "57", label: "57" },
      { id: "74", label: "74" },
    ],
    correctOptionId: "47",
  },
  {
    id: "math-y1-puluh-match-01",
    type: "match-pairs",
    question: "Padankan nilai Puluh dengan nombornya.",
    awiMessage: "Cari pasangan yang sepadan!",
    tip: "1 Puluh bersamaan 10. Fikir nilai beberapa Puluh.",
    pairs: [
      { leftId: "4-puluh", leftLabel: "4 puluh", rightId: "40", rightLabel: "40" },
      { leftId: "3-puluh", leftLabel: "3 puluh", rightId: "30", rightLabel: "30" },
      { leftId: "7-puluh", leftLabel: "7 puluh", rightId: "70", rightLabel: "70" },
    ],
  },
  {
    id: "math-y1-puluh-drag-01",
    type: "drag-drop",
    question: "Letakkan digit pada nilai tempat yang betul.",
    awiMessage: "Letakkan semuanya di tempat yang betul!",
    tip: "Digit kiri ialah Puluh dan digit kanan ialah Sa.",
    items: [
      { id: "4", label: "4" },
      { id: "7", label: "7" },
    ],
    targets: [
      { id: "puluh", label: "PULUH" },
      { id: "sa", label: "SA" },
    ],
    correctPlacements: { puluh: "4", sa: "7" },
  },
];
