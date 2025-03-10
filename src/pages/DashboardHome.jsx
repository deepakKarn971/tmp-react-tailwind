
import React, { useState, useEffect } from "react";
import { Calendar, ChevronDown, Search } from "lucide-react";
import { format, startOfDay, endOfDay, subDays } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { cn } from "../lib/utils";
import SuccessRateCard from "../components/dashboard/SuccessRateCard";
import { fetchDataPoints } from "../utils/api";

const DashboardHome = () => {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [metricsData, setMetricsData] = useState({
    successRate: { value: 0, change: 0 },
    conversionRate: { value: 0, change: 0 },
    averageOrderValue: { value: 0, change: 0 }
  });
  
  // State to track different time ranges for different metrics
  const [timeRanges, setTimeRanges] = useState({
    dataPoints: "last30days",
    transactions: "last7days",
    users: "last7days",
    firstTimeUsers: "last7days",
    repeatUsers: "last7days",
  });

  // Set date range based on selection
  useEffect(() => {
    let from = null;
    let to = null;
    
    switch(dateRange) {
      case "Last 7 Days":
        from = startOfDay(subDays(new Date(), 7));
        to = endOfDay(new Date());
        setTimeRanges(prev => ({ ...prev, dataPoints: "last7days" }));
        break;
      case "Last 30 Days":
        from = startOfDay(subDays(new Date(), 30));
        to = endOfDay(new Date());
        setTimeRanges(prev => ({ ...prev, dataPoints: "last30days" }));
        break;
      case "yesterday":
        from = startOfDay(subDays(new Date(), 1));
        to = endOfDay(subDays(new Date(), 1));
        setTimeRanges(prev => ({ ...prev, dataPoints: "yesterday" }));
        break;
      default:
        // If custom date is selected
        if (selectedDate) {
          from = startOfDay(selectedDate);
          to = endOfDay(selectedDate);
          setTimeRanges(prev => ({ ...prev, dataPoints: "custom" }));
        }
    }
    
    setFromDate(from);
    setToDate(to);
  }, [dateRange, selectedDate]);

  // Fetch data points for all metrics at once
  useEffect(() => {
    const fetchMetricsData = async () => {
      if (!fromDate || !toDate) return;
      
      setLoading(true);
      try {
        const payload = {
          range: timeRanges.dataPoints,
          fromDate: fromDate,
          toDate: toDate,
        };
        
        console.log("Fetching data points with payload:", payload);
        
        const response = await fetchDataPoints(payload);
        
        if (response && response.data) {
          setMetricsData({
            successRate: {
              value: response.data.successRate?.value || 0,
              change: response.data.successRate?.change || 0
            },
            conversionRate: {
              value: response.data.conversionRate?.value || 0,
              change: response.data.conversionRate?.change || 0
            },
            averageOrderValue: {
              value: response.data.averageOrderValue?.value || 0,
              change: response.data.averageOrderValue?.change || 0
            }
          });
        }
      } catch (error) {
        console.error("Error fetching metrics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetricsData();
  }, [fromDate, toDate, timeRanges.dataPoints]);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setIsDateDropdownOpen(false);
  };

  const dateRanges = [
    "Last 30 Days",
    "Last 7 Days",
    "yesterday"
  ];

  const handleSearch = () => {
    console.log("Search with params:", {
      dateRange,
      fromDate,
      toDate,
      timeRanges
    });
  };

  // Format metrics data for card rendering
  const metricsCardsData = [
    {
      title: "Success Rate",
      value: metricsData.successRate.value,
      valuePrefix: "",
      valueSuffix: "%",
      percentageGrowth: metricsData.successRate.change,
      comparisionRange: "vs previous period",
      dataArray: [] // We could populate this with historical data if available
    },
    {
      title: "Conversion Rate",
      value: metricsData.conversionRate.value,
      valuePrefix: "",
      valueSuffix: "%",
      percentageGrowth: metricsData.conversionRate.change,
      comparisionRange: "vs previous period",
      dataArray: []
    },
    {
      title: "Average Order Value",
      value: metricsData.averageOrderValue.value,
      valuePrefix: "₹",
      valueSuffix: "",
      percentageGrowth: metricsData.averageOrderValue.change,
      comparisionRange: "vs previous period",
      dataArray: []
    }
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
                onSelect={(date) => {
                  setSelectedDate(date);
                  setDateRange("Custom Date");
                }}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

          {/* Search Button */}
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-md transition-colors"
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>
      </div>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricsCardsData.map((cardData, index) => (
          <SuccessRateCard 
            key={index}
            loading={loading}
            data={cardData}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
