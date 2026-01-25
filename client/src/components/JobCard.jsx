import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Trash } from "lucide-react"
import { useDeleteJob } from "../hooks/useJobs"
import { toast } from "react-toastify"
import { getRelativeTime } from "../utils/textFormatting"

const JobCard = ({ job }) => {
  const navigate = useNavigate()
  const { mutate: deleteJob, isPending } = useDeleteJob()
  const handleDelete = (e) => {
    e.stopPropagation()
    const ok = window.confirm(
      `Delete "${job.position} at ${job.company} " . Are you sure you want to delete this job?`,
    )
    if (!ok) return

    deleteJob(job._id, {
      onSuccess: () => {
        toast.success("Job deleted successfully")
        navigate(`/dashboard/jobs/`)
      },
    })
  }
  return (
    <div className='bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200'>
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h3 className='text-lg font-semibold capitalize'>{job.position}</h3>
          <p className='text-sm text-gray-500'>{job.company}</p>
          <span className='text-sm text-gray-500'>
            {getRelativeTime(job.createdAt)}
          </span>
        </div>
        <button
          type='button'
          onClick={handleDelete}
          disabled={isPending}
          className='p-1 rounded hover:bg-red-50 disabled:opacity-60'
          title='Delete job'
        >
          <Trash
            className='text-red-500 hover:text-red-800 cursor-pointer'
            width={18}
          />
        </button>
      </div>

      <div className='mt-3 flex items-center gap-1 justify-between text-xs text-gray-500'>
        <div className='flex flex-col gap-1'>
          {" "}
          <span>{job.jobLocation}</span>
          <span>{job.jobType}</span>
        </div>
        <div>
          {" "}
          <div className='px-4 py-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold'>
            {job.matchScore != null ? `${job.matchScore}% Match` : "No score"}
          </div>
        </div>
      </div>
      <hr className='mt-3 text-gray-200' />
      <div className='mt-3 flex items-center justify-between text-xs'>
        <span className='px-2 py-1  rounded-full bg-emerald-50 text-emerald-700 capitalize'>
          {job.jobStatus}
        </span>
        <Link
          className='text-blue-600 font-medium'
          to={`/dashboard/jobs/${job._id}`}
        >
          Open
        </Link>
      </div>
    </div>
  )
}

export default JobCard
