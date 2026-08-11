import type { ImageSourcePropType } from "react-native";

export type MathTopic = {
  id: string;
  title: string;
  description: string;
  icon: MathTopicIcon;
  completedLessons: number;
  totalLessons: number;
  locked?: boolean;
};

export type MathTopicIcon = {
  crop: { height: number; width: number; x: number; y: number };
  source: ImageSourcePropType;
};
