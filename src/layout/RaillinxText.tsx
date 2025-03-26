import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function RaillinxText() {
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialize the chart
    const chartInstance = echarts.init(chartRef.current);

    // Chart options
    const option = {
      graphic: {
        elements: [
          {
            type: "text",
            left: "15%",
            top: "center",

            style: {
              text: "RAIL",
              fontSize: 30,
              fontWeight: "bold",
              lineDash: [50, 100],
              lineDashOffset: 0,
              fill: "transparent",
              stroke: "white",
              lineWidth: 1,
            },
            keyframeAnimation: {
              duration: 6000,
              loop: true,
              keyframes: [
                {
                  percent: 0.3,
                  style: {
                    fill: "transparent",
                    lineDashOffset: 200,
                    lineDash: [200, 0],
                  },
                },
                {
                  // Stop for a while
                  percent: 0.3,
                  style: {
                    fill: "transparent",
                  },
                },
                {
                  percent: 0.4,
                  style: {
                    fill: "white",
                  },
                },
              ],
            },
          },
          {
            type: "text",
            left: "60%",
            top: "center",

            style: {
              text: "LINX",
              fontSize: 30,
              fontWeight: "bold",
              lineDash: [50, 100],
              lineDashOffset: 0,
              fill: "transparent",
              stroke: "black",
              lineWidth: 1,
            },
            keyframeAnimation: {
              duration: 6000,
              loop: true,
              keyframes: [
                {
                  percent: 0.3,
                  style: {
                    fill: "transparent",
                    lineDashOffset: 200,
                    lineDash: [200, 0],
                  },
                },
                {
                  // Stop for a while
                  percent: 0.3,
                  style: {
                    fill: "transparent",
                  },
                },
                {
                  percent: 0.4,
                  style: {
                    fill: "black",
                  },
                },
              ],
            },
          },
        ],
      },
    };

    // Set chart options
    chartInstance.setOption(option);

    // Cleanup on component unmount
    return () => {
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "170px", height: "38px" }}></div>;
}
