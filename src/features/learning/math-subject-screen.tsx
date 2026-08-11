import { year1Topics } from "@/data/math/year1";
import { MathTopicsScreen } from "@/features/learning/math/math-topics-screen";

export function MathSubjectScreen() {
  return <MathTopicsScreen topics={year1Topics} year={1} />;
}
