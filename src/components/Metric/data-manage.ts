import { IMetricChartData } from "@/types";

function generateMetricDataOnce(number: number): IMetricChartData {
  const data = Array(number)
    .fill(0)
    .map((_, id) => {
      const y =
        id === 0 || id === number - 1
          ? 40 + Math.random() * 20
          : Math.random() * 70 + 20;
      return {
        x: id,
        y,
      };
    });

  return data;
}

function generateMetricData(number: number): IMetricChartData[] {
  return [generateMetricDataOnce(number), generateMetricDataOnce(number)];
}

export { generateMetricData, generateMetricDataOnce };
