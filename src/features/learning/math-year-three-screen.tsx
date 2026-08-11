import { year3Topics } from "@/data/math/year3";
import { MathTopicsScreen } from "@/features/learning/math/math-topics-screen";

export function MathYearThreeScreen() {
  return <MathTopicsScreen topics={year3Topics} year={3} />;
}
