import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import CalendarManager from '../components/calendar/CalendarManager'
import client from '../api/client'

export default function RVCalendarSettings() {
  const { id: rvId } = useParams()
  const queryClient = useQueryClient()

  const { data: calendarData, isLoading } = useQuery(
    ['rv-calendars', rvId],
    () => client.get(`/rvs/${rvId}/calendars`).then(res => res.data)
  )

  const addCalendarMutation = useMutation(
    ({ rvId, url }) => client.post(`/rvs/${rvId}/calendars`, { url }),
    {
      onSuccess: () => queryClient.invalidateQueries(['rv-calendars', rvId])
    }
  )

  const removeCalendarMutation = useMutation(
    ({ rvId, calendarId }) => client.delete(`/rvs/${rvId}/calendars/${calendarId}`),
    {
      onSuccess: () => queryClient.invalidateQueries(['rv-calendars', rvId])
    }
  )

  const blockDatesMutation = useMutation(
    ({ rvId, start, end }) => client.post(`/rvs/${rvId}/blocked-dates`, { start, end }),
    {
      onSuccess: () => queryClient.invalidateQueries(['rv-calendars', rvId])
    }
  )

  const handleAddCalendar = (rvId, url) => {
    addCalendarMutation.mutate({ rvId, url })
  }

  const handleRemoveCalendar = (rvId, calendarId) => {
    removeCalendarMutation.mutate({ rvId, calendarId })
  }

  const handleBlockDates = (rvId, start, end) => {
    blockDatesMutation.mutate({ rvId, start, end })
  }

  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Calendar Settings</h1>
      <CalendarManager
        rvId={rvId}
        calendars={calendarData?.calendars || []}
        onAddCalendar={handleAddCalendar}
        onRemoveCalendar={handleRemoveCalendar}
        onBlockDates={handleBlockDates}
      />
    </div>
  )
}
