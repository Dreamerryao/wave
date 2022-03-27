import { IMetricChartData, IMetricDataPoint } from "@/types";

const SVG_HEIGHT = 500;

const SVG_WIDTH = 1000;

const CIRCLE_RADIUS = 5;

const GRID_AXIS_X = [0, SVG_WIDTH];

const GRID_AXIS_Y = [CIRCLE_RADIUS, SVG_HEIGHT - 2];

function getAxisLength(axis: number[]): number {
  return axis[1] - axis[0];
}

function mapDataToSvgCoordinatesOnce(
  dataPoints: IMetricChartData
): IMetricDataPoint[] {
  if (!dataPoints.length) return [];
  const xMax = dataPoints.length - 1;
  const xMin = 0;
  const yMax = 100;
  const yMin = 0;

  const xScaleFactor = getAxisLength(GRID_AXIS_X) / (xMax - xMin);
  const yScaleFactor = getAxisLength(GRID_AXIS_Y) / (yMax - yMin);

  const res = dataPoints.map((dataPoint) => {
    const mappedX = (dataPoint.x - xMin) * xScaleFactor;

    const invertedMappedY = dataPoint.y * yScaleFactor;

    const mappedY = GRID_AXIS_Y[1] - invertedMappedY;
    return { x: mappedX, y: mappedY };
  });
  return res;
}

function mapDataToSvgCoordinates(
  data: IMetricChartData[]
): IMetricDataPoint[][] {
  return data.map((d) => mapDataToSvgCoordinatesOnce(d));
}

const graphHelper = {
  SVG_WIDTH,
  SVG_HEIGHT,
  GRID_AXIS_X,
  GRID_AXIS_Y,
  mapDataToSvgCoordinates,
};

export default graphHelper;
