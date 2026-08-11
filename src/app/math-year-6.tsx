import { year6Topics } from "@/data/math/year6";
import { MathTopicsScreen } from "@/features/learning/math/math-topics-screen";

export default function MathYearSixRoute() {
  return <MathTopicsScreen topics={year6Topics} year={6} />;
}
