export type SubjectId = "math" | "science" | "bahasa-melayu" | "english";

export type SubjectSummary = {
  id: SubjectId;
  name: string;
  icon: string;
  backgroundColor: string;
  accentColor: string;
};

export type PopularTopic = {
  id: string;
  title: string;
  exerciseCount: number;
  progress: number;
  icon: string;
  accentColor: string;
  backgroundColor: string;
};

export const subjects: SubjectSummary[] = [
  { id: "math", name: "MATEMATIK", icon: "🧮", backgroundColor: "#88C8FF", accentColor: "#1978DA" },
  { id: "science", name: "SAINS", icon: "🧪", backgroundColor: "#B9F26A", accentColor: "#42A62D" },
  { id: "bahasa-melayu", name: "BAHASA\nMELAYU", icon: "📖", backgroundColor: "#FFD45B", accentColor: "#E86F00" },
  { id: "english", name: "ENGLISH", icon: "🎧", backgroundColor: "#FFA7CD", accentColor: "#34225F" },
];

export const currentLesson = {
  id: "math-numbers-100",
  subject: "Matematik",
  title: "Nombor Hingga 100",
  progress: 60,
  icon: "123",
} as const;

export const popularTopics: PopularTopic[] = [
  { id: "addition-subtraction", title: "Tambah & Tolak", exerciseCount: 32, progress: 75, icon: "🏆", accentColor: "#7034D8", backgroundColor: "#F1E8FF" },
  { id: "time", title: "Masa & Waktu", exerciseCount: 28, progress: 60, icon: "⏰", accentColor: "#57BC3D", backgroundColor: "#E9F9EA" },
  { id: "money", title: "Wang", exerciseCount: 25, progress: 40, icon: "🪙", accentColor: "#F27A12", backgroundColor: "#FFF0E1" },
];

export const todayPlan = {
  title: "Belajar dengan Awi setiap hari!",
  description: "Jawab soalan, kumpul bintang dan buka ganjaran menarik!",
  xp: 1200,
} as const;
