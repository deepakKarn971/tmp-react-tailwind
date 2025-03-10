
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const SuccessRateCard = ({ rate, change, isPositive, period }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Success Rate</h3>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">{rate}</span>
            <span className="text-2xl font-medium ml-1">%</span>
          </div>
          
          <div className="flex items-center mt-2">
            {isPositive ? (
              <ArrowUp className="h-5 w-5 text-green-500 mr-1" />
            ) : (
              <ArrowDown className="h-5 w-5 text-red-500 mr-1" />
            )}
            <span className={`font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change}%
            </span>
            <span className="text-gray-500 ml-1">{period}</span>
          </div>
        </div>
        
        {/* Simple SVG line chart visualization */}
        <div className="w-24 h-16 relative">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 0, 0, 0.2)" />
                <stop offset="100%" stopColor="rgba(255, 0, 0, 0)" />
              </linearGradient>
            </defs>
            
            {/* Background area fill */}
            <path 
              d="M0,50 L0,20 C10,15 20,25 30,20 C40,15 50,10 60,25 C70,40 80,30 90,10 L100,5 L100,50 Z" 
              fill="url(#gradient)"
            />
            
            {/* Line */}
            <path 
              d="M0,20 C10,15 20,25 30,20 C40,15 50,10 60,25 C70,40 80,30 90,10 L100,5" 
              fill="none"
              stroke="red"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SuccessRateCard;
