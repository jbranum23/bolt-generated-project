import React, { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import "react-big-calendar/lib/css/react-big-calendar.css"

const locales = {
  'en-US': require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function CalendarManager({ rvId, calendars, onAddCalendar, onRemoveCalendar, onBlockDates }) {
  const [newCalendarUrl, setNewCalendarUrl] = useState('')
  const [events, setEvents] = useState([])
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null
  })

  const handleAddCalendar = () => {
    if (newCalendarUrl && calendars.length < 5) {
      onAddCalendar(rvId, newCalendarUrl)
      setNewCalendarUrl('')
    }
  }

  const handleSelectSlot = ({ start, end }) => {
    setSelectedDates({ start, end })
  }

  const handleBlockDates = () => {
    if (selectedDates.start && selectedDates.end) {
      onBlockDates(rvId, selectedDates.start, selectedDates.end)
      setSelectedDates({ start: null, end: null })
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Subscribed Calendars</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="url"
              value={newCalendarUrl}
              onChange={(e) => setNewCalendarUrl(e.target.value)}
              placeholder="Enter iCal URL"
              className="flex-1 border rounded px-3 py-2"
              disabled={calendars.length >= 5}
            />
            <button
              onClick={handleAddCalendar}
              disabled={!newCalendarUrl || calendars.length >= 5}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Add Calendar
            </button>
          </div>
          
          <div className="space-y-2">
            {calendars.map((calendar, index) => (
              <div key={index} className="flex justify-between items-center border rounded p-2">
                <span className="truncate flex-1">{calendar.url}</span>
                <button
                  onClick={() => onRemoveCalendar(rvId, calendar.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-600">
            {5 - calendars.length} calendar slots remaining
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Availability Calendar</h3>
        <div className="h-[600px]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            className="rounded-lg border"
          />
        </div>
        
        {selectedDates.start && selectedDates.end && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-semibold mb-2">Selected Dates</h4>
            <p>
              From: {format(selectedDates.start, 'PPP')}
              <br />
              To: {format(selectedDates.end, 'PPP')}
            </p>
            <button
              onClick={handleBlockDates}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Block These Dates
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
