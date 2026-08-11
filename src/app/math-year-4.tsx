import { year4Topics } from "@/data/math/year4";
import { MathTopicsScreen } from "@/features/learning/math/math-topics-screen";

export default function MathYearFourRoute() {
  return <MathTopicsScreen topics={year4Topics} year={4} />;
}
