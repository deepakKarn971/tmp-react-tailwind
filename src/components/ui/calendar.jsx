
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, format, getMonth, getYear, isEqual, isToday, startOfMonth, startOfWeek, addMonths, subMonths, eachDayOfInterval, endOfMonth, endOfWeek } from "date-fns";
import { cn } from "../../lib/utils";

const Calendar = ({ className, mode = "single", selected, onSelect, disabled, ...props }) => {
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

    return (
      <div className="grid grid-cols-7 gap-1">
        {dateRange.map((date, i) => {
          const isOutsideMonth = getMonth(date) !== getMonth(currentMonth);
          const isDisabled = disabled?.(date) || false;
          const isSelectedDate = selected && isEqual(date, selected);
          
          return (
            <div
              key={i}
              className={cn(
                "relative p-1 text-center text-sm",
                isOutsideMonth && "text-gray-300",
                !isOutsideMonth && !isDisabled && "hover:bg-gray-100 cursor-pointer",
                isSelectedDate && "bg-primary text-white hover:bg-primary",
                isToday(date) && "border border-primary font-semibold",
                isDisabled && "text-gray-300 cursor-not-allowed"
              )}
              onClick={() => {
                if (isDisabled || isOutsideMonth) return;
                onSelect?.(date);
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
    <div className={cn("p-3", className)} {...props}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export { Calendar };
