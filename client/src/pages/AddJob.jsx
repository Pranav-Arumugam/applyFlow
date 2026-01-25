import React from "react"
import { useNavigate } from "react-router-dom"
import { getEmptyJob } from "../utils/formData"
import JobForm from "../components/JobForm"
import NavigationLink from "../components/NavigationLink"
import { useCreateJob } from "../hooks/useJobs"
import { toast } from "react-toastify"

const AddJob = () => {
  const navigate = useNavigate()

  const { mutate: createJob, isPending, error } = useCreateJob()

  const handleCreateJob = async (formData) => {
    createJob(formData, {
      onSuccess: () => {
        toast.success("Job created successfully")
        navigate("/dashboard/jobs")
      },
    })
  }
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
        initialValue={getEmptyJob()}
        onSubmit={handleCreateJob}
        submitting={isPending}
        title='Add Job'
        submitLabel='Add Job'
      />
    </>
  )
}

export default AddJob
