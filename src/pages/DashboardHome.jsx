
import React, { useState } from "react";
import { Calendar, ChevronDown, ArrowUp, Search } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { cn } from "../lib/utils";
import SuccessRateCard from "../components/dashboard/SuccessRateCard";

const DashboardHome = () => {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setIsDateDropdownOpen(false);
  };

  const dateRanges = [
    "Last 30 Days",
    "Last 7 Days",
    "yesterday"
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          {/* Date Range Dropdown */}
          <div className="relative">
            <Popover open={isDateDropdownOpen} onOpenChange={setIsDateDropdownOpen}>
              <PopoverTrigger asChild>
                <button 
                  className="flex items-center justify-between w-full sm:w-64 bg-white border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none"
                  onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                >
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{dateRange}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isDateDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0 bg-white rounded-md shadow-lg z-50">
                <div className="py-2">
                  {dateRanges.map((range) => (
                    <button
                      key={range}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors"
                      onClick={() => handleDateRangeChange(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center justify-between w-full sm:w-64 bg-white border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none">
                <span className="text-gray-500">
                  {selectedDate ? format(selectedDate, "PPP") : "Select Date"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

          {/* Search Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-md transition-colors">
            SEARCH
          </button>
        </div>
      </div>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SuccessRateCard 
          rate="28.35"
          change="7.02"
          isPositive={true}
          period="last month"
        />
        {/* Additional cards would go here */}
      </div>
    </div>
  );
};

export default DashboardHome;
