import React, { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import JobDesc from "../components/JobDesc"
import SkillsSection from "../components/SkillsSection"
import JobDetailCard from "../components/JobDetailCard"
import MatchScore from "../components/MatchScore"
import { OverviewCard } from "../components/OverviewCard"
import LoadingDots from "../components/LoadingDots"
import { useGetJob, useDeleteJob } from "../hooks/useJobs"
import { Trash2, Edit, Building2, Briefcase } from "lucide-react"

const SingleJobView = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("Jobdescription")

  const { data: job, isLoading, error } = useGetJob(id)
  const { mutate: deleteJob, isPending } = useDeleteJob()

  const tabs = ["Jobdescription", "Overview", "Skills"]

  const handleDelete = () => {
    const ok = window.confirm(
      `Delete "${job.position}" at ${job.company}? This cannot be undone.`,
    )
    if (!ok) return

    deleteJob(job._id, {
      onSuccess: () => {
        navigate("/dashboard/jobs")
      },
    })
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <LoadingDots />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md'>
          <p className='text-red-600 font-medium mb-2'>Failed to load job</p>
          <p className='text-sm text-red-500'>
            {error?.response?.data?.msg || error?.message || "Unknown error"}
          </p>
          <button
            onClick={() => navigate("/dashboard/jobs")}
            className='mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
          >
            Back to Jobs
          </button>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
        <p className='text-gray-600 mb-4'>Job not found</p>
        <button
          onClick={() => navigate("/dashboard/jobs")}
          className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          Back to Jobs
        </button>
      </div>
    )
  }

  return (
    <div className='w-full space-y-6'>
      {/* Header Card */}
      <div className='bg-white shadow-sm rounded-2xl border border-gray-200 p-4 md:p-6'>
        {/* Company Logo / Initial */}
        <div className='flex items-start gap-4 mb-4'>
          <div className='w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shrink-0'>
            {job.company?.charAt(0)?.toUpperCase() || "J"}
          </div>
          <div className='flex-1 min-w-0'>
            <h1 className='text-2xl md:text-3xl font-bold mb-2 text-gray-900 capitalize'>
              {job.position}
            </h1>
            <div className='flex items-center gap-2 text-gray-600 flex-wrap'>
              <Building2 className='w-4 h-4' />
              <span className='font-medium'>{job.company}</span>
              {job.jobLocation && (
                <>
                  <span className='text-gray-400'>•</span>
                  <span>{job.jobLocation}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div className='flex flex-wrap items-center gap-2 mb-4'>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium capitalize ${
              job.jobStatus === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : job.jobStatus === "interview"
                  ? "bg-blue-100 text-blue-700"
                  : job.jobStatus === "accepted"
                    ? "bg-green-100 text-green-700"
                    : job.jobStatus === "declined" ||
                        job.jobStatus === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
            }`}
          >
            {job.jobStatus}
          </span>
          <span className='inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 capitalize'>
            <Briefcase className='w-3 h-3 mr-1' />
            {job.jobType}
          </span>
          {job.matchScore !== undefined && (
            <span className='inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700'>
              {job.matchScore}% Match
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap gap-2'>
          <Link
            to={`/dashboard/jobs/${job._id}/edit`}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-white text-sm font-medium hover:bg-blue-700 transition-colors'
          >
            <Edit className='w-4 h-4' />
            Edit Job
          </Link>
          <button
            type='button'
            onClick={handleDelete}
            disabled={isPending}
            className='flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg text-white text-sm font-medium disabled:opacity-60 hover:bg-red-700 transition-colors'
          >
            <Trash2 className='w-4 h-4' />
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>

        <nav className='border-b border-gray-200 mt-6 -mb-px'>
          <div className='flex gap-2 md:gap-6 overflow-x-auto scrollbar-hide'>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "Jobdescription" ? "Job Description" : tab}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className='space-y-6'>
        {activeTab === "Jobdescription" && (
          <div className='bg-white rounded-2xl border border-gray-200 p-4 md:p-6'>
            <JobDesc job={job} />
          </div>
        )}

        {activeTab === "Overview" && (
          <div className='bg-white rounded-2xl border border-gray-200 p-4 md:p-6'>
            <OverviewCard job={job} />
          </div>
        )}

        {activeTab === "Skills" && (
          <div className='bg-white rounded-2xl border border-gray-200 p-4 md:p-6'>
            <SkillsSection job={job} />
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
        <div className='bg-white rounded-2xl border border-gray-200 p-4 md:p-6'>
          <JobDetailCard job={job} />
        </div>
        <div className='bg-white rounded-2xl border border-gray-200 p-4 md:p-6'>
          <MatchScore matchScore={job.matchScore} />
        </div>
      </div>
    </div>
  )
}

export default SingleJobView
