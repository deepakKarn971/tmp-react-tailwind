
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BarChartComponent = ({ 
  data = [], 
  barColor = "#FFC107", 
  height = 300, 
  emptyMessage = "No data available for selected period" 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }
  
  console.log('Bar chart rendering with data:', data);
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip 
          formatter={(value) => new Intl.NumberFormat().format(value)}
          labelFormatter={(label) => `${label}`}
        />
        <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
