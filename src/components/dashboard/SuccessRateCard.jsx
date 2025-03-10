
import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { fetchApi } from "../../utils/api";

const SuccessRateCard = ({ title, timeRange, fromDate, toDate, valueKey }) => {
  const [data, setData] = useState({
    value: 0,
    change: 0,
    isPositive: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const payload = {
          range: timeRange,
          fromDate: fromDate || undefined,
          toDate: toDate || undefined,
        };
        
        console.log("Fetching data points with payload:", payload);
        
        const response = await fetchApi("/dashboard/merchant-dashboard/v1/analytics/data-points", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        
        if (response && response.data) {
          const metricData = response.data[valueKey] || {};
          setData({
            value: metricData.value || 0,
            change: metricData.change || 0,
            isPositive: metricData.change >= 0,
          });
        }
      } catch (err) {
        console.error("Error fetching data points:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange, fromDate, toDate, valueKey]);

  // Custom gradient ID to avoid conflicts when using multiple cards
  const gradientId = `gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;

  // Set color based on positive/negative value
  const color = data.isPositive ? "green" : "red";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      
      {loading ? (
        <div className="flex justify-center items-center h-16">
          <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">Error loading data</div>
      ) : (
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{data.value}</span>
              <span className="text-2xl font-medium ml-1">%</span>
            </div>
            
            <div className="flex items-center mt-2">
              {data.isPositive ? (
                <ArrowUp className={`h-5 w-5 text-${color}-500 mr-1`} />
              ) : (
                <ArrowDown className={`h-5 w-5 text-${color}-500 mr-1`} />
              )}
              <span className={`font-medium text-${color}-500`}>
                {Math.abs(data.change)}%
              </span>
              <span className="text-gray-500 ml-1">vs previous period</span>
            </div>
          </div>
          
          {/* Simple SVG line chart visualization */}
          <div className="w-24 h-16 relative">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={`rgba(${color === 'green' ? '34, 197, 94' : '239, 68, 68'}, 0.2)`} />
                  <stop offset="100%" stopColor={`rgba(${color === 'green' ? '34, 197, 94' : '239, 68, 68'}, 0)`} />
                </linearGradient>
              </defs>
              
              {/* Background area fill */}
              <path 
                d="M0,50 L0,20 C10,15 20,25 30,20 C40,15 50,10 60,25 C70,40 80,30 90,10 L100,5 L100,50 Z" 
                fill={`url(#${gradientId})`}
              />
              
              {/* Line */}
              <path 
                d="M0,20 C10,15 20,25 30,20 C40,15 50,10 60,25 C70,40 80,30 90,10 L100,5" 
                fill="none"
                stroke={color === 'green' ? '#10b981' : '#ef4444'}
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessRateCard;
