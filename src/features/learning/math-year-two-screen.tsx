import { year2Topics } from "@/data/math/year2";
import { MathTopicsScreen } from "@/features/learning/math/math-topics-screen";

export function MathYearTwoScreen() {
  return <MathTopicsScreen topics={year2Topics} year={2} />;
}
