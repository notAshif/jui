import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CalendarProps } from "@/components/ui/calendar";
import { PixelChevronLeftIcon, PixelChevronRightIcon } from "@/components/pixel/icons";

export const PixelCalendar = ({ selected, onSelect, minDate, maxDate, className }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSelected = (date: Date) => {
    return selected && 
           date.getDate() === selected.getDate() &&
           date.getMonth() === selected.getMonth() &&
           date.getFullYear() === selected.getFullYear();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      onSelect?.(date);
    }
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const disabled = isDateDisabled(date);
      const selected = isSelected(date);
      const today = isToday(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          disabled={disabled}
          className={cn(
            "p-2 text-xs transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-(--ring)",
            "min-w-[32px] min-h-[32px]",
            "tracking-wider",
            disabled && "opacity-50 cursor-not-allowed",
            !disabled && "cursor-pointer",
            selected
              ? "bg-(--caramel) text-(--cream) font-semibold"
              : today
              ? "bg-(--surface-muted) text-(--foreground) font-semibold"
              : "hover:bg-(--surface-muted)"
          )}
          aria-label={`${date.toDateString()}`}
          aria-pressed={selected}
          aria-disabled={disabled}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={cn("w-full font-pixel", className)}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          className={cn(
            "p-2",
            "hover:bg-(--surface-muted)",
            "focus:outline-none focus:ring-2 focus:ring-(--ring)",
            "min-w-[32px] min-h-[32px]"
          )}
          aria-label="Previous month"
        >
          <PixelChevronLeftIcon className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold tracking-wider">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <button
            onClick={goToToday}
            className="text-xs text-(--caramel) hover:underline focus:outline-none focus:ring-2 focus:ring-(--ring)"
          >
            Today
          </button>
        </div>

        <button
          onClick={nextMonth}
          className={cn(
            "p-2",
            "hover:bg-(--surface-muted)",
            "focus:outline-none focus:ring-2 focus:ring-(--ring)",
            "min-w-[32px] min-h-[32px]"
          )}
          aria-label="Next month"
        >
          <PixelChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-(--foreground/60) py-2 tracking-wide"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
};

PixelCalendar.displayName = "PixelCalendar";