import React from "react"
export const OverviewCard = ({ job }) => {
  return (
    <div className='rounded-2xl bg-white p-4 shadow-sm border border-gray-100 space-y-3'>
      <p className='text-sm text-gray-500 flex items-center gap-2'>
        <span className='text-lg'>📍</span>
        {job.jobLocation}
      </p>

      <div className='flex flex-wrap items-center gap-3'>
        <a
          href={job.jobUrl}
          target='_blank'
          rel='noreferrer'
          className='rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700'
        >
          Visit job post
        </a>
        <button></button>
      </div>
    </div>
  )
}
