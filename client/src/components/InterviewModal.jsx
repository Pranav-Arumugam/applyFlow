import React from "react"
import { timeFormatter } from "../utils/timeFormater"
import {
  BriefcaseBusiness,
  Timer,
  CalendarFold,
  NotepadText,
  MapPin,
  X,
  Trash,
} from "lucide-react"
import { useDeleteInterview } from "../hooks/useInterview"
import { toast } from "react-toastify"
import { Sparkles } from "lucide-react"

const InterviewModal = ({
  open,
  onClose,
  interviewDetail,
  children,
  onEditRequest,
}) => {
  const { mutate: deleteInterview, isPending } = useDeleteInterview()
  if (!open || !interviewDetail) return null
  const { date, time } = timeFormatter(interviewDetail.interviewAt)

  const handleDelete = () => {
    const ok = window.confirm(
      `Delete "${interviewDetail.position} at ${interviewDetail.company}". Are you sure you want to delete this interview?`,
    )
    if (!ok) return
    deleteInterview(interviewDetail._id, {
      onSuccess: () => {
        toast.success("Interview deleted successfully")
        onClose?.()
      },
    })
  }

  const isUpcoming = interviewDetail.status === "upcoming"

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop with animation */}
      <button
        type='button'
        className='absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity'
        onClick={onClose}
        aria-label='Close modal'
      />

      {/* Modal */}
      <div className='relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl transform transition-all'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-5 border-b border-gray-200'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Interview Details
          </h2>
          <button
            onClick={onClose}
            className='p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700'
            aria-label='Close'
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className='px-6 py-6 space-y-6'>
          {/* Company and Position */}
          <div className='space-y-3'>
            <div className='flex items-center gap-3'>
              <div className='p-2.5 rounded-lg bg-blue-50 text-blue-600'>
                <BriefcaseBusiness size={22} />
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {interviewDetail.company}
                </h3>
                <p className='text-sm text-gray-600 mt-0.5'>
                  {interviewDetail.position}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {/* Date */}
            <div className='flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors'>
              <div className='p-2 rounded-md bg-white text-gray-700'>
                <CalendarFold size={18} />
              </div>
              <div>
                <p className='text-xs font-medium text-gray-500 uppercase tracking-wide'>
                  Date
                </p>
                <p className='text-sm font-medium text-gray-900'>{date}</p>
              </div>
            </div>

            {/* Time */}
            <div className='flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors'>
              <div className='p-2 rounded-md bg-white text-gray-700'>
                <Timer size={18} />
              </div>
              <div>
                <p className='text-xs font-medium text-gray-500 uppercase tracking-wide'>
                  Time
                </p>
                <p className='text-sm font-medium text-gray-900'>{time}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className='flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors'>
            <div className='p-2 rounded-md bg-white text-gray-700'>
              <MapPin size={18} />
            </div>
            <div className='flex-1'>
              <p className='text-xs font-medium text-gray-500 uppercase tracking-wide mb-1'>
                Location
              </p>
              <p className='text-sm font-medium text-gray-900'>
                {interviewDetail.location}
              </p>
            </div>
          </div>

          {/* Notes */}
          {interviewDetail.notes && (
            <div className='p-4 rounded-lg bg-amber-50 border border-amber-100'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-md bg-white text-amber-600'>
                  <NotepadText size={18} />
                </div>
                <div className='flex-1'>
                  <p className='text-xs font-medium text-amber-700 uppercase tracking-wide mb-1'>
                    Notes
                  </p>
                  <p className='text-sm text-gray-700 leading-relaxed'>
                    {interviewDetail.notes}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Message for Upcoming interviews */}

          {isUpcoming && (
            <div className='p-4 rounded-lg bg-linear-to-r from-green-50 to-emerald-50 border border-green-200'>
              <div className='flex items-start gap-3'>
                <div className='text-2xl'>
                  <Sparkles size={18} className='text-yellow-500' />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-semibold text-green-800 mb-1'>
                    You've got this!
                  </p>
                  <p className='text-xs text-green-700 leading-relaxed'>
                    Remember to research the company, prepare your questions,
                    and showcase your unique strengths. Good luck!
                  </p>
                </div>
              </div>
            </div>
          )}
          {children}
        </div>

        {/* Footer Actions */}
        <div className='flex items-center justify-between gap-3 px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200'>
          <button
            type='button'
            onClick={handleDelete}
            disabled={isPending}
            className='flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm'
          >
            <Trash size={16} />
            Delete
          </button>

          <button
            type='button'
            onClick={() => {
              onEditRequest?.(interviewDetail)
              onClose?.()
            }}
            className='px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium text-sm shadow-sm hover:shadow-md'
          >
            Edit Interview
          </button>
        </div>
      </div>
    </div>
  )
}

export default InterviewModal
