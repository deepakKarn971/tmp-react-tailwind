
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Calendar, ChevronDown } from "lucide-react";
import { format, isAfter, isBefore, isEqual } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const Dashboard = () => {
  const [transactionTimeframe, setTransactionTimeframe] = useState("7days");
  const [usersTimeframe, setUsersTimeframe] = useState("7days");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState("Last 30 Days");
  const [dateRange, setDateRange] = useState({ from: null, to: null });

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
    "Yesterday"
  ];

  const handleDateFilterChange = (option) => {
    setSelectedDateFilter(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header with title and date filter */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          {/* Custom dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white text-gray-800 border border-gray-200 rounded h-10"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Calendar size={16} className="text-gray-500" />
              <span>{selectedDateFilter}</span>
              <ChevronDown size={16} className="text-gray-500" />
            </Button>
            
            {isDropdownOpen && (
              <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded shadow-lg z-50 w-48">
                <ul className="py-1">
                  {dateFilterOptions.map((option) => (
                    <li 
                      key={option} 
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleDateFilterChange(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-white border border-gray-200 rounded text-gray-600 h-10 min-w-[200px] justify-between"
              >
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM dd, yyyy")} - {format(dateRange.to, "MMM dd, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM dd, yyyy")
                  )
                ) : (
                  "Select Date"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="end">
              <div className="p-3 border-b border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Start Date</label>
                    <div className="border rounded p-2 text-sm">
                      {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "Select"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">End Date</label>
                    <div className="border rounded p-2 text-sm">
                      {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : "Select"}
                    </div>
                  </div>
                </div>
              </div>
              <CalendarComponent
                mode="range"
                fromDate={dateRange.from}
                toDate={dateRange.to}
                onSelect={setDateRange}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          
          <Button variant="default" className="bg-blue-600 text-white h-10 px-8" size="default">
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
