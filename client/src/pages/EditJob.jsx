import React from "react"
import { useNavigate, useParams } from "react-router-dom"

import JobForm, { EMPTY_JOB } from "../components/JobForm"
import NavigationLink from "../components/NavigationLink"
import { useEditJob, useGetJob } from "../hooks/useJobs"
import LoadingDots from "../components/LoadingDots"
import { toast } from "react-toastify"
const EditJob = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const { data: job, isLoading, error } = useGetJob(id)
  const { mutate: editJob, isPending } = useEditJob()

  const handleUpdateJob = async (formData) => {
    editJob(
      { id, formData },
      {
        onSuccess: () => {
          toast.success("Job updated successfully")
          navigate(`/dashboard/jobs/${id}`)
        },
      }
    )
  }

  if (isLoading) return <LoadingDots />
  return (
    <>
      {error && (
        <p className='text-sm text-red-600'>
          {error?.response?.data?.msg ||
            error?.message ||
            "Failed to create job"}
        </p>
      )}
      <JobForm
        initialValue={job}
        onSubmit={handleUpdateJob}
        submitting={isPending}
        title='Edit Job'
        submitLabel='Update Job'
      />
    </>
  )
}

export default EditJob
