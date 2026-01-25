import React, { useState, useMemo, useEffect } from "react"
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react"
import {
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
  createViewMonthAgenda,
} from "@schedule-x/calendar"
import "temporal-polyfill/global"
import "@schedule-x/theme-default/dist/index.css"
import { createEventsServicePlugin } from "@schedule-x/events-service"
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop"
import { Temporal } from "temporal-polyfill"
import InterviewModal from "./InterviewModal"
import { useGetAllInterviews } from "../hooks/useInterview"
import LoadingDots from "./LoadingDots"
import { AlertCircle } from "lucide-react"
import { Calendar } from "lucide-react"
import { Plus } from "lucide-react"

const TZ = "Europe/London"

const toZoned = (isoString) => {
  const instant = Temporal.Instant.from(isoString)
  return instant.toZonedDateTimeISO(TZ)
}

const InterviewCalendar = ({ onEditRequest, onAddInterview }) => {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const { data: interviews = [], isLoading, error } = useGetAllInterviews()
  const [modalOpen, setModalOpen] = useState(false)
  const [activeId, setActiveId] = useState(null)

  const activeInterview = useMemo(
    () => interviews.find((i) => i._id === activeId) || null,
    [activeId, interviews]
  )

  const events = useMemo(() => {
    return interviews.map((i) => {
      const start = toZoned(i.interviewAt)
      const end = start.add({ minutes: i.durationMinutes || 45 })
      return {
        id: i._id,
        title: `${i.position} @ ${i.company}`,
        start: Temporal.ZonedDateTime.from(start),
        end: Temporal.ZonedDateTime.from(end),
        raw: i,
      }
    })
  }, [interviews])

  console.log(
    "events:",
    events.map((e) => ({
      id: e.id,
      title: e.title,
      start: e.start.toString(),
      end: e.end.toString(),
    }))
  )

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events,
    plugins: [eventsService, createDragAndDropPlugin()],
    callbacks: {
      onEventClick: (event) => {
        setActiveId(event.id)
        console.log("Event clicked:", event)
        setModalOpen(true)
      },
    },
  })

  useEffect(() => {
    // this is the key line:
    eventsService.set(events)
  }, [events, eventsService])

  if (isLoading) return <LoadingDots></LoadingDots>

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-96 gap-4'>
        <div className='p-4 rounded-full bg-red-50'>
          <AlertCircle size={32} className='text-red-500' />
        </div>
        <div className='text-center'>
          <h3 className='text-lg font-semibold text-gray-900 mb-1'>
            Failed to Load Calendar
          </h3>
          <p className='text-sm text-gray-600 max-w-md'>
            {error?.response?.data?.msg ||
              error?.message ||
              "An error occurred while loading your interviews"}
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className='px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition-colors'
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!isLoading && interviews.length === 0) {
    return (
      <div className='h-96 flex flex-col items-center justify-center gap-6 text-center px-4'>
        <div className='p-6 rounded-full bg-blue-50'>
          <Calendar size={48} className='text-blue-500' />
        </div>
        <div className='text-center max-w-md'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            No interviews yet
          </h2>
          <p className='text-base text-gray-600 leading-relaxed'>
            Get started by scheduling your first interview. All your upcoming
            interviews will appear on this calendar.
          </p>
        </div>

        <button
          onClick={onAddInterview}
          className='flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm hover:shadow-md'
        >
          <Plus size={18} />
          Add Your First Interview
        </button>
      </div>
    )
  }
  return (
    <div className='w-full'>
      <div className='flex  sm:flex-row items-center justify-between gap-3 mb-4 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100'>
        <div className='flex items-center gap-2'>
          <div className='p-1.5 rounded-md bg-white/80'>
            <Calendar size={18} className='text-blue-600' />
          </div>
          <span className='text-sm font-semibold text-gray-600'>
            {interviews.length}{" "}
            {interviews.length === 1 ? "interview" : "interview"}
          </span>
        </div>
        <div className='text-xs text-gray-600 sm:text-right'>
          <span className='hidden sm:inline'>
            Click on any event to view Details
          </span>
          <span className='sm:hidden'>Tap events for details</span>
        </div>
      </div>

      {/* {Calendar Container} */}
      {/* <div className=' w-full border border-gray-200 bg-white shadow-lg overflow-auto'>
        <div className='relative sx-react-calendar-wrapper w-full min-w-70 min-h-125 sm:min-h-150 lg:min-h-175'>
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div> */}

      <div className='relative w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-auto'>
        <div className='sx-react-calendar-wrapper w-full min-w-70 min-h-125 sm:min-h-150 lg:min-h-175'>
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div>

      <InterviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onEditRequest={onEditRequest}
        interviewDetail={activeInterview}
      ></InterviewModal>
    </div>
  )
}

export default InterviewCalendar
