import React from "react"
import { useNavigate } from "react-router-dom"
import { Trash } from "lucide-react"
import { useDeleteJob } from "../hooks/useJobs"
import { toast } from "react-toastify"
import { formatDate } from "../utils/textFormatting"
const JobRow = ({ job }) => {
  const navigate = useNavigate()
  const { mutate: deleteJob, isPending } = useDeleteJob()

  const handleRowClick = () => {
    navigate(`/dashboard/jobs/${job._id}`)
  }

  const handleDelete = (e) => {
    e.stopPropagation()

    const ok = window.confirm(
      `Delete "${job.position} at ${job.company}" . Are you sure you want to delete this job?`,
    )
    if (!ok) return
    deleteJob(job._id, {
      onSuccess: () => {
        toast.success("Job deleted successfully")
        navigate(`/dashboard/jobs/}`)
      },
    })
  }
  return (
    <tr className='hover:bg-gray-50 cursor-pointer' onClick={handleRowClick}>
      <td className='px-4 py-3'>
        <div>
          <p className='text-sm font-medium'>{job.position}</p>
        </div>
      </td>
      <td className='px-4 py-3 text-sm text-gray-600'>{job.company}</td>
      <td className='px-4 py-3'>
        <span className='px-2 py-1 rounded-full capitalize bg-emerald-50 text-emerald-700 text-xs'>
          {job.jobStatus}
        </span>
      </td>
      <td className='px-4 py-3 text-sm'>
        <span className='px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold'>
          {job.matchScore}% Match
        </span>
      </td>
      <td className='px-4 py-3 text-sm text-gray-600'>{job.jobLocation}</td>
      <td className='px-4 py-3 text-sm text-gray-400'>
        {formatDate(job.createdAt)}
      </td>
      <td className='px-4 py-3 text-sm text-gray-600'>
        <button
          type='button'
          onClick={handleDelete}
          disabled={isPending}
          title='Delete Job'
          className='p-1 rounded hover:bg-red-50 disabled:opacity-60'
        >
          <Trash height={15} className='text-red-500 hover:text-red-800' />
        </button>
      </td>
    </tr>
  )
}

export default JobRow
