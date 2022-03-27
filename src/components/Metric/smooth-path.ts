import {
  IMetricChartData,
  IMetricDataPoint,
  IMetricOppositeLine,
} from "@/types";

function computeOppositeLine(
  pointA: IMetricDataPoint,
  pointB: IMetricDataPoint
): IMetricOppositeLine {
  const lengthX = pointB.x - pointA.x;
  const lengthY = pointB.y - pointA.y;
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
}

function computeControlPoint(
  current: IMetricDataPoint,
  previous: IMetricDataPoint,
  next: IMetricDataPoint,
  reverse: boolean
): number[] {
  const p = previous || current;
  const n = next || current; // The smoothing ratio
  const smoothing = 0.2; // Properties of the opposed-line
  const o = computeOppositeLine(p, n); // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing; // The control point position is relative to the current point
  const x = current.x + Math.cos(angle) * length;
  const y = current.y + Math.sin(angle) * length;
  return [x, y];
}

function computeBezierCommand(
  point: IMetricDataPoint,
  i: number,
  a: IMetricDataPoint[]
): string {
  // start control point
  const [cpsX, cpsY] = computeControlPoint(a[i - 1], a[i - 2], point, false); // end control point
  const [cpeX, cpeY] = computeControlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cpsX} ${cpsY}, ${cpeX} ${cpeY}, ${point.x} ${point.y}`;
}

function calculatePathSmoothOnce(dataPoints: IMetricDataPoint[]): string {
  if (!dataPoints.length) return "";
  const res = dataPoints.reduce<string>((generated, dataPoint, i) => {
    if (i === 0) return generated;

    const bezier = computeBezierCommand(dataPoint, i, dataPoints);
    return `${generated} ${bezier}`;
  }, `M 0,500 L 0,${500 - dataPoints[0].y}`);

  return `${res} L ${dataPoints[dataPoints.length - 1].x},500 L 0,500 Z`;
}

function calculatePathSmooth(data: IMetricChartData[]): string[] {
  return data.map((d) => calculatePathSmoothOnce(d));
}

export default calculatePathSmooth;
