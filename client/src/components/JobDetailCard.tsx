import React from "react"
import { Job } from "../types/index"

interface DetailRowProps {
  label: string
  value: string
}

const JobDetailCard = ({ job }: { job: Job }) => {
  return (
    <div className='rounded-2xl bg-white border p-4 border-gray-100 shadow-sm space-y-2'>
      <h2 className='text-sm md:text-lg font-semibold'>Job Details</h2>
      <div className='mt-2 space-y-1 text-sm capitalize'>
        <DetailRow label='Status' value={job.jobStatus} />
        <DetailRow label='Job type' value={job.jobType} />
        <DetailRow label='Location' value={job.jobLocation} />
      </div>
    </div>
  )
}

export default JobDetailCard

const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <div className='flex justify-between text-xs text-gray-500'>
      <span>{label}</span>
      <span className='font-medium text-gray-800'>{value}</span>
    </div>
  )
}
