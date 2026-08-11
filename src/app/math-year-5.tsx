import { year5Topics } from "@/data/math/year5";
import { MathTopicsScreen } from "@/features/learning/math/math-topics-screen";

export default function MathYearFiveRoute() {
  return <MathTopicsScreen topics={year5Topics} year={5} />;
}
