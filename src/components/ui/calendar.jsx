
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, isEqual, isToday, startOfMonth, startOfWeek, addMonths, subMonths, eachDayOfInterval, endOfMonth, endOfWeek, isSameMonth, isWithinInterval } from "date-fns";
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
  
  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center px-2 py-1">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </div>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return (
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mt-2 mb-1">
        {days.map((day) => (
          <div key={day} className="p-1">
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
                "relative p-1 text-center text-sm",
                isOutsideMonth && "text-gray-300",
                !isOutsideMonth && !isDisabled && "hover:bg-gray-100 cursor-pointer",
                isSelectedDate && "bg-primary text-white hover:bg-primary",
                (isRangeStart || isRangeEnd) && "bg-primary text-white hover:bg-primary",
                isInRange && !isRangeStart && !isRangeEnd && "bg-primary/10",
                isStartDate && "bg-primary text-white hover:bg-primary",
                isToday(date) && !isSelectedDate && !isInRange && !isRangeStart && !isRangeEnd && !isStartDate && "border border-primary font-semibold",
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
              {format(date, "d")}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("p-3 pointer-events-auto", className)} {...props}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export { Calendar };
