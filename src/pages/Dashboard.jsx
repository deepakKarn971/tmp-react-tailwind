
import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Calendar as CalendarIcon, ChevronDown, X } from "lucide-react";
import { format, isAfter, isBefore, isEqual, addDays, subDays } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { Button } from "../components/ui/button";
import { cn, formatDateRange } from "../lib/utils";

const Dashboard = () => {
  const [transactionTimeframe, setTransactionTimeframe] = useState("7days");
  const [usersTimeframe, setUsersTimeframe] = useState("7days");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState("Last 30 Days");
  const [dateRange, setDateRange] = useState({ 
    from: subDays(new Date(), 30),
    to: new Date()
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);
  
  useEffect(() => {
    // Set initial date range based on selected filter
    if (selectedDateFilter === "Last 30 Days") {
      setDateRange({
        from: subDays(new Date(), 30),
        to: new Date()
      });
    } else if (selectedDateFilter === "Last 7 Days") {
      setDateRange({
        from: subDays(new Date(), 7),
        to: new Date()
      });
    } else if (selectedDateFilter === "Yesterday") {
      const yesterday = subDays(new Date(), 1);
      setDateRange({
        from: yesterday,
        to: yesterday
      });
    }
  }, [selectedDateFilter]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.date-filter-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Mock transaction data
  const transactionData = {
    "7days": [
      { name: "Mon", value: 18885 },
      { name: "Tue", value: 31888 },
      { name: "Wed", value: 327023 },
      { name: "Thu", value: 1159839 },
    ],
    "30days": [
      { name: "Week 1", value: 245000 },
      { name: "Week 2", value: 320000 },
      { name: "Week 3", value: 480000 },
      { name: "Week 4", value: 560000 },
    ],
    "12months": [
      { name: "Jan", value: 1200000 },
      { name: "Feb", value: 1350000 },
      { name: "Mar", value: 1100000 },
      { name: "Apr", value: 1450000 },
      { name: "May", value: 1600000 },
      { name: "Jun", value: 1750000 },
    ],
  };

  // Mock user data
  const userData = {
    "7days": [
      { name: "Mon", value: 28276 },
      { name: "Tue", value: 225498 },
      { name: "Wed", value: 693058 },
    ],
    "30days": [
      { name: "Week 1", value: 190000 },
      { name: "Week 2", value: 230000 },
      { name: "Week 3", value: 310000 },
      { name: "Week 4", value: 380000 },
    ],
    "12months": [
      { name: "Jan", value: 850000 },
      { name: "Feb", value: 920000 },
      { name: "Mar", value: 880000 },
      { name: "Apr", value: 980000 },
      { name: "May", value: 1050000 },
      { name: "Jun", value: 1150000 },
    ],
  };

  const dateFilterOptions = [
    "Last 30 Days",
    "Last 7 Days",
    "Yesterday",
    "Custom Range"
  ];

  const handleDateFilterChange = (option) => {
    setSelectedDateFilter(option);
    setIsDropdownOpen(false);
    
    if (option === "Custom Range") {
      setIsCalendarOpen(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with title and date filter */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center">
          {/* Date Filter Section */}
          <div className="flex bg-white shadow rounded-lg overflow-hidden">
            {/* Custom dropdown */}
            <div className="relative date-filter-dropdown border-r">
              <Button
                variant="ghost"
                className="flex items-center gap-2 bg-white text-gray-700 h-12 px-4 py-3 rounded-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <CalendarIcon size={20} className="text-gray-500" />
                <span className="text-gray-700 font-normal">{selectedDateFilter}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </Button>
              
              {isDropdownOpen && (
                <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded shadow-lg z-50 w-48">
                  <ul className="py-1">
                    {dateFilterOptions.map((option) => (
                      <li 
                        key={option} 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                        onClick={() => handleDateFilterChange(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Date Range Display */}
            <div className="px-4 flex items-center min-w-[260px] h-12">
              <button 
                className="text-gray-700 font-normal"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                {formatDateRange(dateRange.from, dateRange.to)}
              </button>
              
              {/* Clear date button */}
              {dateRange.from && (
                <button 
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setDateRange({ from: null, to: null })}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Calendar Popover */}
          <div ref={calendarRef} className="relative">
            {isCalendarOpen && (
              <div className="absolute top-2 right-0 z-50">
                <div className="bg-white rounded-lg shadow-lg p-4 border">
                  <div className="flex justify-between mb-4">
                    <h3 className="font-medium">Select Date Range</h3>
                    <button 
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => setIsCalendarOpen(false)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="p-2 border rounded-md bg-gray-50">
                      <label className="text-xs text-gray-500 block mb-1">Start Date</label>
                      <div className="text-sm font-medium">
                        {dateRange.from ? format(dateRange.from, "MMM d, yyyy") : "Select date"}
                      </div>
                    </div>
                    <div className="p-2 border rounded-md bg-gray-50">
                      <label className="text-xs text-gray-500 block mb-1">End Date</label>
                      <div className="text-sm font-medium">
                        {dateRange.to ? format(dateRange.to, "MMM d, yyyy") : "Select date"}
                      </div>
                    </div>
                  </div>
                  
                  <Calendar
                    mode="range"
                    fromDate={dateRange.from}
                    toDate={dateRange.to}
                    onSelect={(range) => {
                      setDateRange(range);
                      if (range.from && range.to) {
                        setSelectedDateFilter("Custom Range");
                      }
                    }}
                    initialFocus
                    className="border-t pt-4"
                  />
                  
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsCalendarOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => setIsCalendarOpen(false)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Button variant="default" className="bg-blue-600 text-white h-12 px-8 ml-4 rounded-lg text-base font-medium">
            SEARCH
          </Button>
        </div>
      </div>

      {/* Success Rate Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Success Rate</h2>
          <div className="flex items-end gap-2">
            <div className="text-4xl font-bold">28.35<span className="text-2xl">%</span></div>
          </div>
          <div className="flex items-center text-green-500 mt-2">
            <TrendingUp size={16} className="mr-1" />
            <span className="font-medium">7.02%</span>
            <span className="text-gray-600 ml-1">last month</span>
          </div>
          <div className="mt-4 h-20">
            <ResponsiveContainer width="100%" height="100%">
              <svg viewBox="0 0 500 100" width="100%" height="100%">
                <path
                  d="M0,50 C50,30 100,70 150,50 C200,30 250,60 300,40 C350,20 400,80 450,10 C480,90 500,50 500,50"
                  fill="none"
                  stroke="#f87171"
                  strokeWidth="2"
                />
                <path
                  d="M0,50 C50,30 100,70 150,50 C200,30 250,60 300,40 C350,20 400,80 450,10 C480,90 500,50 500,50"
                  fill="rgba(248, 113, 113, 0.1)"
                  strokeWidth="0"
                  d="M0,100 L0,50 C50,30 100,70 150,50 C200,30 250,60 300,40 C350,20 400,80 450,10 C480,90 500,50 500,50 L500,100 Z"
                />
              </svg>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transactions Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Transactions Aggregated</h2>
          <div className="mb-4 flex space-x-2">
            <button 
              className={`px-3 py-1 rounded ${transactionTimeframe === "12months" ? "bg-primary text-white" : "bg-gray-100"}`}
              onClick={() => setTransactionTimeframe("12months")}
            >
              12 months
            </button>
            <button 
              className={`px-3 py-1 rounded ${transactionTimeframe === "30days" ? "bg-primary text-white" : "bg-gray-100"}`}
              onClick={() => setTransactionTimeframe("30days")}
            >
              30 days
            </button>
            <button 
              className={`px-3 py-1 rounded ${transactionTimeframe === "7days" ? "bg-primary text-white" : "bg-gray-100"}`}
              onClick={() => setTransactionTimeframe("7days")}
            >
              7 days
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transactionData[transactionTimeframe]}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#FFC107" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Users Aggregated</h2>
          <div className="mb-4 flex space-x-2">
            <button 
              className={`px-3 py-1 rounded ${usersTimeframe === "12months" ? "bg-primary text-white" : "bg-gray-100"}`}
              onClick={() => setUsersTimeframe("12months")}
            >
              12 months
            </button>
            <button 
              className={`px-3 py-1 rounded ${usersTimeframe === "30days" ? "bg-primary text-white" : "bg-gray-100"}`}
              onClick={() => setUsersTimeframe("30days")}
            >
              30 days
            </button>
            <button 
              className={`px-3 py-1 rounded ${usersTimeframe === "7days" ? "bg-primary text-white" : "bg-gray-100"}`}
              onClick={() => setUsersTimeframe("7days")}
            >
              7 days
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userData[usersTimeframe]}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#F472B6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* First Time Users Card */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">First Time Users</h2>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-500">First time users data will appear here</p>
          </div>
        </div>

        {/* Repeat Users Card */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Repeat Users</h2>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-500">Repeat users data will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
