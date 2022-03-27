export type IMetricDataPoint = {
  x: number;
  y: number;
}

export type ISetPlayAnimation = {
  (play: boolean): void;
}

export type IMetricOppositeLine = {
  length: number;
  angle: number;
}

export type IMetricChartData = IMetricDataPoint[];
