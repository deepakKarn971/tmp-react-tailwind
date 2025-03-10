
import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const LineChartComponent = ({ 
  data = [], 
  lineColor = "#f87171", 
  dataKey = "value",
  height = "100%",
  emptyMessage = "No data available for selected period"
}) => {
  if (data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={lineColor}
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
