import React, { useEffect } from "react";
import { useSpring, animated, easings } from "react-spring";

type IMetricChartAnimatedLineProps = {
  path: string;
  newPath: string;
  timing: number;
  lineColor: string;
};

const MetricChartAnimatedLine: React.FunctionComponent<
  IMetricChartAnimatedLineProps
> = ({ path, newPath, timing, lineColor }) => {
  const [spring, set] = useSpring(() => ({
    config: { duration: timing, easing: easings.easeInOutSine },
    d: path,
  }));

  useEffect(() => {
    set({
      config: { duration: timing, easing: easings.easeInOutSine },
      to: { d: newPath },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPath]);
  return (
    <>
      <animated.path
        fill={lineColor}
        stroke={lineColor}
        strokeWidth="2"
        d={spring.d}
        style={{
          transform: "translate3d(0, 0, 0)",
        }}
      />
    </>
  );
};

export default MetricChartAnimatedLine;
