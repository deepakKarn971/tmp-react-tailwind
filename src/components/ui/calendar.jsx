
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { 
  format, 
  isEqual, 
  isToday, 
  startOfMonth, 
  startOfWeek, 
  addMonths, 
  subMonths, 
  eachDayOfInterval, 
  endOfMonth, 
  endOfWeek, 
  isSameMonth, 
  isWithinInterval,
  addYears,
  subYears
} from "date-fns";
import { cn } from "../../lib/utils";

const Calendar = ({ 
  className, 
  mode = "single", 
  selected, 
  onSelect, 
  disabled, 
  fromDate,
  toDate,
  ...props 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);
  
  // Month and year navigation
  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handlePreviousYear = () => setCurrentMonth(subYears(currentMonth, 1));
  const handleNextYear = () => setCurrentMonth(addYears(currentMonth, 1));

  const renderHeader = () => {
    const currentMonthName = format(currentMonth, "MMMM");
    const currentYear = format(currentMonth, "yyyy");

    return (
      <div className="flex justify-between items-center px-2 py-3">
        <button
          type="button"
          onClick={handlePreviousMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </button>
        
        <div className="flex space-x-2">
          <div className="relative">
            <button 
              onClick={() => setShowMonthSelector(!showMonthSelector)}
              className="flex items-center font-medium text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
            >
              {currentMonthName}
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            {showMonthSelector && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 w-36 p-2 grid grid-cols-3 gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <button
                    key={i}
                    className={cn(
                      "text-sm p-1 rounded hover:bg-blue-100",
                      format(new Date(2023, i, 1), "MMM") === format(currentMonth, "MMM") && "bg-blue-500 text-white"
                    )}
                    onClick={() => {
                      setCurrentMonth(new Date(currentMonth.getFullYear(), i, 1));
                      setShowMonthSelector(false);
                    }}
                  >
                    {format(new Date(2023, i, 1), "MMM")}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowYearSelector(!showYearSelector)}
              className="flex items-center font-medium text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
            >
              {currentYear}
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            {showYearSelector && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 w-36 p-2 grid grid-cols-3 gap-1 max-h-48 overflow-y-auto">
                {Array.from({ length: 20 }).map((_, i) => {
                  const year = currentMonth.getFullYear() - 10 + i;
                  return (
                    <button
                      key={i}
                      className={cn(
                        "text-sm p-1 rounded hover:bg-blue-100",
                        year === currentMonth.getFullYear() && "bg-blue-500 text-white"
                      )}
                      onClick={() => {
                        setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
                        setShowYearSelector(false);
                      }}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 gap-1 text-center border-b pb-2 mb-2">
        {days.map((day) => (
          <div key={day} className="p-1 text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateRange = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    const isRangeSelected = mode === "range" && fromDate && toDate;
    const isStartDateSelected = mode === "range" && fromDate && !toDate;

    return (
      <div className="grid grid-cols-7 gap-1">
        {dateRange.map((date, i) => {
          const isOutsideMonth = !isSameMonth(date, currentMonth);
          const isDisabled = disabled?.(date) || false;
          const isSelectedDate = mode === "single" && selected && isEqual(date, selected);
          
          // For range selection
          const isInRange = isRangeSelected && isWithinInterval(date, { start: fromDate, end: toDate });
          const isRangeStart = isRangeSelected && isEqual(date, fromDate);
          const isRangeEnd = isRangeSelected && isEqual(date, toDate);
          const isStartDate = isStartDateSelected && isEqual(date, fromDate);
          
          return (
            <div
              key={i}
              className={cn(
                "relative flex items-center justify-center h-10 w-full",
                isOutsideMonth && "text-gray-300",
                !isOutsideMonth && !isDisabled && "hover:bg-blue-50 cursor-pointer",
                isSelectedDate && "bg-blue-500 text-white hover:bg-blue-600 rounded-full",
                isInRange && "bg-blue-100",
                (isRangeStart || isRangeEnd) && "bg-blue-500 text-white z-10 rounded-full",
                isStartDate && "bg-blue-500 text-white hover:bg-blue-600 rounded-full",
                isToday(date) && !isSelectedDate && !isRangeStart && !isRangeEnd && "font-bold",
                isDisabled && "text-gray-300 cursor-not-allowed"
              )}
              onClick={() => {
                if (isDisabled || isOutsideMonth) return;
                
                if (mode === "single") {
                  onSelect?.(date);
                } else if (mode === "range") {
                  if (!fromDate || (fromDate && toDate)) {
                    onSelect?.({ from: date, to: undefined });
                  } else {
                    const newTo = date < fromDate ? fromDate : date;
                    const newFrom = date < fromDate ? date : fromDate;
                    onSelect?.({ from: newFrom, to: newTo });
                  }
                }
              }}
            >
              <span className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full",
                isRangeStart && "bg-blue-500 text-white",
                isRangeEnd && "bg-blue-500 text-white",
              )}>
                {format(date, "d")}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("p-3 pointer-events-auto bg-white rounded-lg shadow-lg", className)} {...props}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

// Helper component for dropdown arrows
const ChevronDown = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

export { Calendar };
