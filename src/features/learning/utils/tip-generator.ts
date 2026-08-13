import type { QuizQuestion } from "@/features/learning/types/quiz";

export function getQuestionTip(question: QuizQuestion) {
  if (question.tip) return question.tip;
  const concept = `${question.tipConcept ?? ""} ${question.topic} ${question.subtopic ?? ""}`.toLowerCase();
  if (concept.includes("puluh") || concept.includes("nombor")) return "Bandingkan digit Puluh dahulu, kemudian lihat digit Sa.";
  if (concept.includes("tolak")) return "Mulakan dengan nombor yang lebih besar, kemudian tolak.";
  if (concept.includes("wang")) return "Ingat, 100 sen bersamaan RM1.";
  if (concept.includes("masa")) return "Jarum pendek menunjukkan jam, jarum panjang menunjukkan minit.";
  if (concept.includes("pecahan")) return "Penyebut menunjukkan jumlah bahagian yang sama besar.";
  if (question.subject === "science") return "Perhatikan ciri pada gambar sebelum memilih jawapan.";
  if (question.subject === "english") return "Read the whole sentence and choose the word that fits best.";
  if (question.subject === "bm") return "Baca ayat penuh dahulu dan cari perkataan yang paling sesuai.";
  return "Baca soalan perlahan-lahan dan perhatikan setiap petunjuk.";
}
