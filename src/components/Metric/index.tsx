import { IMetricChartData } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { generateMetricData, generateMetricDataOnce } from "./data-manage";
import graphHelper from "./metric-chart-graph-helper";
import MetricChartAnimatedLine from "./MetricChartAnimatedLine";
import calculatePathSmooth from "./smooth-path";

const Metric = ({
  number,
  timing,
  color,
}: {
  number: number;
  timing: number;
  color: string;
}) => {
  // current and next
  const data = useRef<IMetricChartData[]>(generateMetricData(number));
  const [paths, setPaths] = useState<string[]>(
    calculatePathSmooth(graphHelper.mapDataToSvgCoordinates(data.current))
  );

  const setNewData = useCallback(() => {
    const newData = [data.current[1], generateMetricDataOnce(number)];
    data.current = newData;
    setPaths(calculatePathSmooth(graphHelper.mapDataToSvgCoordinates(newData)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const signal = setInterval(() => {
      setNewData();
    }, timing);
    return () => clearInterval(signal);
  }, [setNewData, timing]);
  return (
    <svg
      style={{ width: "100%", position: "absolute" }}
      viewBox={`0 0 ${graphHelper.SVG_WIDTH} ${graphHelper.SVG_HEIGHT}`}
    >
      {
        <MetricChartAnimatedLine
          path={paths[0]}
          newPath={paths[1]}
          timing={timing}
          lineColor={color}
        />
      }
    </svg>
  );
};
export default Metric;
