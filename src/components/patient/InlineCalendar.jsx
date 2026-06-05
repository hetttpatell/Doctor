import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function InlineCalendar({ selectedDate, onSelectDate }) {
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Calculate grid of days in the month
  const calendarData = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    // Pad previous month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }

    // Current month days
    for (let i = 1; i <= lastDayOfMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    // Pad next month days to complete a 6-week grid (42 cells)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  }, [year, month]);

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Disable past dates and today (min date is tomorrow)
    return date <= today;
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    const sDate = new Date(selectedDate);
    return (
      date.getDate() === sDate.getDate() &&
      date.getMonth() === sDate.getMonth() &&
      date.getFullYear() === sDate.getFullYear()
    );
  };

  const handleDateClick = (date) => {
    if (isDateDisabled(date)) return;
    const formattedDate = date.toISOString().split("T")[0];
    onSelectDate(formattedDate);
  };

  return (
    <div className="w-full bg-color-surface border border-color-border rounded-xl p-4 shadow-sm select-none">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-serif text-base font-semibold text-color-text-primary">
          {monthNames[month]} {year}
        </h4>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg border border-color-border text-color-text-secondary hover:bg-color-accent-light hover:text-color-accent cursor-pointer focus:outline-none"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg border border-color-border text-color-text-secondary hover:bg-color-accent-light hover:text-color-accent cursor-pointer focus:outline-none"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week Days Headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {daysOfWeek.map((day) => (
          <span key={day} className="text-caption font-semibold text-color-text-secondary">
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {calendarData.map((cell, idx) => {
          const disabled = isDateDisabled(cell.date);
          const selected = isDateSelected(cell.date);
          
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleDateClick(cell.date)}
              disabled={disabled}
              className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center text-body-sm transition-all focus:outline-none ${
                !cell.isCurrentMonth
                  ? "text-color-text-muted opacity-40"
                  : "text-color-text-primary"
              } ${
                disabled
                  ? "opacity-30 cursor-not-allowed hover:bg-transparent"
                  : "cursor-pointer hover:bg-color-accent-light hover:text-color-accent"
              } ${
                selected
                  ? "bg-color-accent text-white hover:bg-color-accent hover:text-white"
                  : ""
              }`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
