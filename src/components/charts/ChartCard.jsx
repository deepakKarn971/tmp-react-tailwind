
import React, { useState } from "react";
import BarChartComponent from "./BarChartComponent";

const ChartCard = ({ 
  title, 
  data = [], 
  timeframes = ["12months", "30days", "7days"], 
  initialTimeframe = "7days",
  onTimeframeChange,
  color = "#FFC107",
  height = 300,
  isLoading = false
}) => {
  const [timeframe, setTimeframe] = useState(initialTimeframe);
  
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    if (onTimeframeChange) {
      onTimeframeChange(newTimeframe);
    }
  };
  
  console.log(`Chart card "${title}" rendering with data:`, data);
  
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="mb-4 flex space-x-2">
        {timeframes.includes("12months") && (
          <button 
            className={`px-3 py-1 rounded ${timeframe === "12months" ? "bg-primary text-white" : "bg-gray-100"}`}
            onClick={() => handleTimeframeChange("12months")}
          >
            12 months
          </button>
        )}
        {timeframes.includes("30days") && (
          <button 
            className={`px-3 py-1 rounded ${timeframe === "30days" ? "bg-primary text-white" : "bg-gray-100"}`}
            onClick={() => handleTimeframeChange("30days")}
          >
            30 days
          </button>
        )}
        {timeframes.includes("7days") && (
          <button 
            className={`px-3 py-1 rounded ${timeframe === "7days" ? "bg-primary text-white" : "bg-gray-100"}`}
            onClick={() => handleTimeframeChange("7days")}
          >
            7 days
          </button>
        )}
      </div>
      <div style={{ height: `${height}px` }}>
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <BarChartComponent data={data} barColor={color} height={height} />
        )}
      </div>
    </div>
  );
};

export default ChartCard;
