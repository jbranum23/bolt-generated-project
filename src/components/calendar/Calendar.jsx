import React from 'react'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns'

export default function Calendar({ 
  selectedDates,
  onDateSelect,
  blockedDates = [],
  currentDate,
  onMonthChange
}) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  })

  const isDateBlocked = (date) => {
    return blockedDates.some(blockedDate => 
      isSameDay(new Date(blockedDate), date)
    )
  }

  const isDateSelected = (date) => {
    if (!selectedDates.start || !selectedDates.end) return false
    const checkDate = new Date(date)
    return checkDate >= selectedDates.start && checkDate <= selectedDates.end
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => onMonthChange(subMonths(currentDate, 1))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => onMonthChange(addMonths(currentDate, 1))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center font-semibold p-2"
          >
            {day}
          </div>
        ))}

        {days.map((day, idx) => (
          <div
            key={idx}
            onClick={() => !isDateBlocked(day) && onDateSelect(day)}
            className={`
              p-2 text-center cursor-pointer border
              ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''}
              ${isDateBlocked(day) ? 'bg-red-100 cursor-not-allowed' : 'hover:bg-blue-50'}
              ${isDateSelected(day) ? 'bg-blue-100' : ''}
            `}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  )
}
